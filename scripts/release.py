"""One guarded release path. Stage immutable content; switch one CDN configuration.

Build/test before invoking. No DNS, application records, identity, or configuration writes.
Recovery files remain in S3 and the evidence directory for at least seven days.
"""
import argparse,copy,hashlib,json,mimetypes,os,re,signal,subprocess,sys,time,uuid
from pathlib import Path
import boto3
from botocore.exceptions import ClientError

ACCOUNT='791860731989';DIST='E2YV5089958YRU';BUCKET='sozorock-meridian-site';PREFIX='meridian/'
ROOT=Path(__file__).resolve().parents[1]
MUTABLE={'applications-config.js','engagement-config.js'}
ASSET=re.compile(r'(?<=[\x22\x27(])/(assets/|media/|corporate\.css|corporate\.js|school\.css|school-nav\.js|applications\.js|admin\.js|contact\.js|favicon\.svg|favicon-48\.png|apple-touch-icon\.png)')

def digest(data):return hashlib.sha256(data).hexdigest()
def save(path,value):path.write_text(json.dumps(value,indent=2,default=str)+'\n',encoding='utf-8')
def guarded(config):
    assert sorted(config['Aliases']['Items'])==['sozorock.com','www.sozorock.com'],'Unexpected domain scope'
    target=config['DefaultCacheBehavior']['TargetOriginId']
    origins=[o for o in config['Origins']['Items'] if o['Id']==target]
    assert len(origins)==1 and origins[0]['DomainName']==BUCKET+'.s3.us-east-1.amazonaws.com' and origins[0]['OriginPath']=='/meridian','Unexpected origin'
    return config
def artifact_bytes(path,sha):
    data=path.read_bytes()
    if path.suffix in ['.html','.css','.js']:
        data=ASSET.sub(lambda m:'/releases/'+sha+'/'+m.group(1),data.decode('utf-8')).encode('utf-8')
    return data
def files_manifest(directory,sha):
    files=[]
    for path in sorted(directory.rglob('*')):
        if not path.is_file():continue
        name=path.relative_to(directory).as_posix()
        if name in MUTABLE:continue
        assert not name.endswith('.map') and '..' not in name.split('/'),'Unexpected artifact'
        content=artifact_bytes(path,sha);files.append({'path':name,'sha256':digest(content),'bytes':len(content)})
    return files
def release_configuration(previous,arn,sha,headers_policy=None):
    config=copy.deepcopy(guarded(previous))
    functions=config['DefaultCacheBehavior']['FunctionAssociations'].get('Items',[])
    items=[x for x in functions if x['EventType']!='viewer-request']+[{'EventType':'viewer-request','FunctionARN':arn}]
    config['DefaultCacheBehavior']['FunctionAssociations']={'Quantity':len(items),'Items':items}
    if headers_policy:config['DefaultCacheBehavior']['ResponseHeadersPolicyId']=headers_policy
    config['CustomErrorResponses']={'Quantity':2,'Items':[{'ErrorCode':c,'ResponsePagePath':'/releases/'+sha+'/404.html','ResponseCode':'404','ErrorCachingMinTTL':0}for c in [403,404]]}
    config['Comment']='SozoRock Technology release '+sha
    return config
def wait_distribution(cf):
    # SDK waiter is bounded; CLI callers can read durable state while this runs.
    cf.get_waiter('distribution_deployed').wait(Id=DIST,WaiterConfig={'Delay':15,'MaxAttempts':80})
def run_acceptance(evidence):
    subprocess.run([sys.executable,str(ROOT/'scripts/acceptance-public-site.py'),'--base-url','https://www.sozorock.com','--output-dir',str(evidence/'school-live')],check=True,cwd=ROOT)
    subprocess.run([sys.executable,str(ROOT/'scripts/acceptance-corporate.py'),'--base-url','https://www.sozorock.com','--output-dir',str(evidence/'corporate-live')],check=True,cwd=ROOT)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--activate',action='store_true');parser.add_argument('--rollback',type=Path)
    parser.add_argument('--evidence-dir',type=Path,required=True);parser.add_argument('--headers-policy')
    args=parser.parse_args();evidence=args.evidence_dir.resolve();evidence.mkdir(parents=True,exist_ok=True)
    session=boto3.Session(region_name='us-east-1');assert session.client('sts').get_caller_identity()['Account']==ACCOUNT,'Wrong AWS account'
    s3=session.client('s3');cf=session.client('cloudfront');current=cf.get_distribution_config(Id=DIST);guarded(current['DistributionConfig'])
    lock_key='deployment-backups/sozorock-com/release.lock';token=str(uuid.uuid4())
    if args.rollback:
        s3.put_object(Bucket=BUCKET,Key=lock_key,Body=json.dumps({'token':token,'operation':'rollback','started':int(time.time())}),IfNoneMatch='*',ExpectedBucketOwner=ACCOUNT)
        try:rollback(s3,cf,args,evidence,current)
        finally:release_lock(s3,lock_key,token)
        return
    deploy(s3,cf,args,evidence,current,lock_key,token)

def release_lock(s3,key,token):
    value=json.loads(s3.get_object(Bucket=BUCKET,Key=key,ExpectedBucketOwner=ACCOUNT)['Body'].read())
    if value['token']==token:s3.delete_object(Bucket=BUCKET,Key=key,ExpectedBucketOwner=ACCOUNT)

def rollback(s3,cf,args,evidence,current):
        current=cf.get_distribution_config(Id=DIST)
        prior=json.loads(args.rollback.read_text())
        assert prior['distributionId']==DIST and prior['account']==ACCOUNT
        expected=prior.get('activatedFunction')
        current_functions=current['DistributionConfig']['DefaultCacheBehavior']['FunctionAssociations'].get('Items',[])
        assert expected and any(x['FunctionARN']==expected for x in current_functions),'Current release changed; refuse to overwrite another release'
        assert current['DistributionConfig']==prior['activatedConfiguration'],'Distribution configuration changed; inspect before rollback'
        cf.update_distribution(Id=DIST,IfMatch=current['ETag'],DistributionConfig=guarded(prior['configuration']))
        wait_distribution(cf);save(evidence/'rollback-result.json',{'restored':True,'recordsOrMutableConfigRestored':False});return
def deploy(s3,cf,args,evidence,current,lock_key,token):
    sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
    assert len(sha)==40
    assert not subprocess.check_output(['git','status','--porcelain'],cwd=ROOT,text=True).strip(),'Commit the candidate before staging'
    artifact=ROOT/'dist/client';files=files_manifest(artifact,sha);assert files
    manifest={'commit':sha,'account':ACCOUNT,'distributionId':DIST,'prefix':PREFIX+'releases/'+sha+'/','files':files,'mutableConfigExcluded':sorted(MUTABLE)}
    manifest_data=(json.dumps(manifest,sort_keys=True,separators=(',',':'))+'\n').encode();manifest_key=manifest['prefix']+'release-manifest.json'
    try:
        previous=s3.get_object(Bucket=BUCKET,Key=manifest_key,ExpectedBucketOwner=ACCOUNT)['Body'].read()
        assert previous==manifest_data,'Commit already staged with different bytes; create a new atomic commit'
    except ClientError as ex:
        if ex.response['Error']['Code'] not in ['NoSuchKey','404']:raise
        for entry in files:
            path=artifact/entry['path'];content=artifact_bytes(path,sha)
            mime=mimetypes.guess_type(path)[0] or 'application/octet-stream'
            if path.suffix=='.js':mime='text/javascript'
            assert digest(content)==entry['sha256'],'Artifact changed while staging'
            # Viewer URLs for many assets are stable across releases. Internal CDN
            # versioning does not invalidate a browser's cache of those URLs.
            cache='public,max-age=0,must-revalidate'
            try:
                s3.put_object(Bucket=BUCKET,Key=manifest['prefix']+entry['path'],Body=content,ContentType=mime,CacheControl=cache,Metadata={'sha256':entry['sha256']},ExpectedBucketOwner=ACCOUNT,IfNoneMatch='*')
            except ClientError as conflict:
                if conflict.response['Error']['Code'] not in ['PreconditionFailed','412']:raise
                stored=s3.get_object(Bucket=BUCKET,Key=manifest['prefix']+entry['path'],ExpectedBucketOwner=ACCOUNT)['Body'].read()
                assert digest(stored)==entry['sha256'],'Immutable object differs; create a new commit'
        # Manifest is the completion marker and is written only after every object is verified.
        for entry in files:
            content=s3.get_object(Bucket=BUCKET,Key=manifest['prefix']+entry['path'],ExpectedBucketOwner=ACCOUNT)['Body'].read()
            assert len(content)==entry['bytes'] and digest(content)==entry['sha256']
        try:
            s3.put_object(Bucket=BUCKET,Key=manifest_key,Body=manifest_data,ContentType='application/json',ExpectedBucketOwner=ACCOUNT,IfNoneMatch='*')
        except ClientError as conflict:
            if conflict.response['Error']['Code'] not in ['PreconditionFailed','412']:raise
            assert s3.get_object(Bucket=BUCKET,Key=manifest_key,ExpectedBucketOwner=ACCOUNT)['Body'].read()==manifest_data
    save(evidence/'release-manifest.json',manifest)
    for entry in files:
        content=s3.get_object(Bucket=BUCKET,Key=manifest['prefix']+entry['path'],ExpectedBucketOwner=ACCOUNT)['Body'].read()
        assert digest(content)==entry['sha256'],'Staged artifact readback failed'
    print('Immutable artifact staged and verified: '+sha,flush=True)
    if not args.activate:return
    # Gate against absent operations evidence; this is separate from build/browser QA.
    gate=json.loads((evidence/'operational-acceptance.json').read_text())
    assert all(gate.get(key) is True for key in ['applications','administratorReadback','contact','claimsConfirmed']),'Operational or claim acceptance is incomplete'
    assert gate.get('account')==ACCOUNT and gate.get('distributionId')==DIST,'Acceptance belongs to another target'
    assert int(time.time()) < gate.get('expiresAt',0),'Operational acceptance expired'
    for filename in MUTABLE:
        observed=s3.get_object(Bucket=BUCKET,Key=PREFIX+filename,ExpectedBucketOwner=ACCOUNT)['Body'].read()
        assert gate.get('configSha256',{}).get(filename)==digest(observed),'Operational configuration changed after acceptance'
    s3.put_object(Bucket=BUCKET,Key=lock_key,Body=json.dumps({'token':token,'commit':sha,'started':int(time.time())}),IfNoneMatch='*',ExpectedBucketOwner=ACCOUNT)
    activation_attempted=False;activated=False
    try:
        current=cf.get_distribution_config(Id=DIST);guarded(current['DistributionConfig'])
        if current['DistributionConfig'].get('Comment')=='SozoRock Technology release '+sha:
            run_acceptance(evidence);save(evidence/'production-result.json',{'verified':True,'commit':sha,'alreadyActive':True});return
        backup={'account':ACCOUNT,'distributionId':DIST,'configuration':current['DistributionConfig'],'etag':current['ETag'],'createdAt':int(time.time()),'retainUntil':int(time.time())+8*86400}
        for name in MUTABLE:
            obj=s3.get_object(Bucket=BUCKET,Key=PREFIX+name,ExpectedBucketOwner=ACCOUNT)
            content=obj['Body'].read();(evidence/('observed-'+name)).write_bytes(content)
            # Recorded for diagnosis only. Rollback never writes these snapshots.
        name='sozorock-com-release-'+sha[:16];routing_path=evidence/'routing.js'
        subprocess.run(['node',str(ROOT/'scripts/build-routing.mjs'),sha,str(routing_path)],cwd=ROOT,check=True)
        code=routing_path.read_bytes();assert len(code)<=10240,'CloudFront function exceeds service limit'
        try:
            created=cf.create_function(Name=name,FunctionConfig={'Comment':'Immutable corporate/School release '+sha,'Runtime':'cloudfront-js-2.0'},FunctionCode=code)
        except cf.exceptions.FunctionAlreadyExists:
            existing=cf.get_function(Name=name,Stage='DEVELOPMENT');assert existing['FunctionCode'].read()==code,'Routing differs for existing release';created=cf.describe_function(Name=name)
        # Execute a real CloudFront development-stage test before activation.
        sample={'version':'1.0','context':{'eventType':'viewer-request'},'viewer':{'ip':'192.0.2.1'},'request':{'method':'GET','uri':'/apply.html','querystring':{'program':{'value':'ai-governance'}},'headers':{'host':{'value':'sozorock.com'}},'cookies':{}}}
        checked=cf.test_function(Name=name,IfMatch=created['ETag'],Stage='DEVELOPMENT',EventObject=json.dumps(sample).encode())
        save(evidence/'cloudfront-function-test.json',checked)
        output=json.loads(checked['TestResult']['FunctionOutput']);assert output['headers']['location']['value']=='https://www.sozorock.com/school/apply?program=ai-governance'
        published=cf.publish_function(Name=name,IfMatch=created['ETag']);arn=published['FunctionSummary']['FunctionMetadata']['FunctionARN'];backup['activatedFunction']=arn
        planned=release_configuration(current['DistributionConfig'],arn,sha,args.headers_policy);save(evidence/'activated-distribution.json',planned)
        backup['activatedConfiguration']=planned
        save(evidence/'previous-distribution.json',backup)
        recovery_key='deployment-backups/sozorock-com/'+sha+'/'+token+'/previous-distribution.json'
        s3.put_object(Bucket=BUCKET,Key=recovery_key,Body=json.dumps(backup).encode(),ContentType='application/json',ExpectedBucketOwner=ACCOUNT,IfNoneMatch='*')
        activation_attempted=True
        cf.update_distribution(Id=DIST,IfMatch=current['ETag'],DistributionConfig=planned);activated=True
        print('Distribution activation requested; recovery retained.',flush=True);wait_distribution(cf)
        run_acceptance(evidence)
        assert cf.get_distribution_config(Id=DIST)['DistributionConfig']==planned,'Active configuration changed during acceptance'
        acceptance={'verified':True,'commit':sha,'recoveryKey':recovery_key,'retainUntil':max(backup['retainUntil'],int(time.time())+7*86400)}
        save(evidence/'production-result.json',acceptance)
        s3.put_object(Bucket=BUCKET,Key=recovery_key.replace('previous-distribution.json','browser-acceptance.json'),Body=json.dumps(acceptance).encode(),ContentType='application/json',ExpectedBucketOwner=ACCOUNT,IfNoneMatch='*')
        print('Production browser acceptance passed.',flush=True)
    except BaseException:
        if activation_attempted:
            now=cf.get_distribution_config(Id=DIST)
            active=now['DistributionConfig']['DefaultCacheBehavior']['FunctionAssociations'].get('Items',[])
            if now['DistributionConfig']==backup.get('activatedConfiguration'):
                cf.update_distribution(Id=DIST,IfMatch=now['ETag'],DistributionConfig=backup['configuration']);wait_distribution(cf)
                save(evidence/'automatic-rollback.json',{'restored':True,'recordsOrMutableConfigRestored':False})
        raise
    finally:
        release_lock(s3,lock_key,token)

if __name__=='__main__':
    if sys.flags.optimize:raise RuntimeError('Optimized Python is prohibited for guarded releases')
    signal.signal(signal.SIGTERM,lambda signum,frame:sys.exit(143))
    main()
