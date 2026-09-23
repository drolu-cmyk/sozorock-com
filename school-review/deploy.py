"""Publish synthetic review files only; no infrastructure, identity, DNS or production-route writes."""
import os,json,hashlib,mimetypes
from pathlib import Path
import boto3
from botocore.exceptions import ClientError
MARKET=os.environ['SCHOOL_MARKET']
assert MARKET in ['us','ca']
VERSION='school-placement-20260923-v8'
TOKEN=hashlib.sha1(VERSION.encode()).hexdigest()
USPATH=f'/releases/{TOKEN}/assets/school/index.html'
CAPATH=f'/learning/{VERSION}/index.html'
links={'us':'https://d14v3l4z5ufdrh.cloudfront.net'+USPATH,'ca':'https://d198odt0kdua97.cloudfront.net'+CAPATH}
if MARKET=='us':links['ca']='https://d198odt0kdua97.cloudfront.net/learning/school-workspace-20260923-v6/index.html'
account,region,bucket=('791860731989','us-east-1','sozorock-meridian-site') if MARKET=='us' else ('891377012881','ca-central-1','sozorock-ca-public-site-891377012881')
session=boto3.Session(region_name=region)
assert session.client('sts').get_caller_identity()['Account']==account
s3=session.client('s3');cf=session.client('cloudfront')
assert (s3.get_bucket_location(Bucket=bucket,ExpectedBucketOwner=account).get('LocationConstraint') or 'us-east-1')==region
if MARKET=='us':dist='E2YV5089958YRU';originprefix='/meridian';path=USPATH
else:
 outputs=session.client('cloudformation').describe_stacks(StackName='sozorock-ca-public-site')['Stacks'][0]['Outputs']
 dist=next(x['OutputValue'] for x in outputs if x['OutputKey']=='PublicSiteDistributionId');originprefix='';path=CAPATH
info=cf.get_distribution(Id=dist)['Distribution'];config=info['DistributionConfig']
origin=next(x for x in config['Origins']['Items'] if x['Id']==config['DefaultCacheBehavior']['TargetOriginId'])
assert origin['DomainName']==f'{bucket}.s3.{region}.amazonaws.com'
assert origin.get('OriginPath','')==originprefix
before=hashlib.sha256(json.dumps(config,sort_keys=True).encode()).hexdigest()
source=Path('school-review/files');manifest=json.loads((source/'manifest.json').read_text())
for name,digest in manifest.items():assert hashlib.sha256((source/name).read_bytes()).hexdigest()==digest
prefix=(originprefix+path.rsplit('/',1)[0]+'/').lstrip('/')
assert '/school/' in prefix if MARKET=='us' else prefix.startswith('learning/'+VERSION+'/')
written=[]
for name in ['settings.js','school.js','index.html','briefing-ai.mp4','briefing-iam.mp4','briefing-grc.mp4','briefing-gov.mp4']:
 data=(source/name).read_bytes()
 if name=='settings.js':data=data.replace(b'window.SCHOOL_REGION_LINKS={};',('window.SCHOOL_REGION_LINKS='+json.dumps(links)+';').encode())
 key=prefix+name
 try:
  s3.put_object(Bucket=bucket,Key=key,Body=data,ExpectedBucketOwner=account,IfNoneMatch='*',ContentType='video/mp4' if name.endswith('.mp4') else 'text/javascript' if name.endswith('.js') else 'text/html; charset=utf-8',CacheControl='no-store',Metadata={'review-only':'synthetic','sha256':hashlib.sha256(data).hexdigest()})
 except ClientError as ex:
  if ex.response['Error']['Code'] not in ['PreconditionFailed','412']:raise
 assert s3.get_object(Bucket=bucket,Key=key,ExpectedBucketOwner=account)['Body'].read()==data,'Review key already contains different bytes; choose a new version'
 written.append(key)
after=cf.get_distribution(Id=dist)['Distribution']['DistributionConfig']
assert hashlib.sha256(json.dumps(after,sort_keys=True).encode()).hexdigest()==before,'CloudFront configuration changed during publication'
url='https://'+info['DomainName']+path
result={'market':MARKET,'region':region,'url':url,'keys':written,'productionConfigurationUnchanged':True,'syntheticOnly':True}
Path('review-deployment.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result))
with open(os.environ['GITHUB_STEP_SUMMARY'],'a') as f:f.write(f'## School review — {MARKET.upper()}\n\n[Open review]({url})\n\nTraining-case workbench. No learner API or production routing changed.\n')
