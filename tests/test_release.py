"""Offline regressions for artifact isolation and rollback scope."""
import importlib.util,json,tempfile,unittest,types,io,copy,time
from unittest.mock import patch
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('release',ROOT/'scripts/release.py');release=importlib.util.module_from_spec(spec)
class CloudError(Exception):
    def __init__(self,code):self.response={'Error':{'Code':code}}
errors=types.ModuleType('botocore.exceptions');errors.ClientError=CloudError
with patch.dict('sys.modules',{'boto3':types.ModuleType('boto3'),'botocore.exceptions':errors}):spec.loader.exec_module(release)

class ReleaseTests(unittest.TestCase):
    def test_failed_browser_acceptance_and_interruption_restore_only_distribution(self):
        for failure in [RuntimeError('Injected browser failure'),KeyboardInterrupt(),RuntimeError('Injected publication failure')]:
            with self.subTest(failure=type(failure).__name__),tempfile.TemporaryDirectory() as directory:
                root=Path(directory);(root/'dist/client').mkdir(parents=True);(root/'dist/client/index.html').write_text('<h1>Candidate</h1>');evidence=root/'evidence';evidence.mkdir()
                objects={'meridian/applications-config.js':b'current applications config','meridian/engagement-config.js':b'current contact config'}
                original= {'Aliases':{'Items':['sozorock.com','www.sozorock.com']},'Origins':{'Items':[{'Id':'site','DomainName':'sozorock-meridian-site.s3.us-east-1.amazonaws.com','OriginPath':'/meridian'}]},'DefaultCacheBehavior':{'TargetOriginId':'site','FunctionAssociations':{'Quantity':1,'Items':[{'EventType':'viewer-request','FunctionARN':'old'}]}},'Comment':'Prior release'}
                class S3:
                    def get_object(self,**kw):
                        if kw['Key'] not in objects:raise CloudError('NoSuchKey')
                        return {'Body':io.BytesIO(objects[kw['Key']])}
                    def put_object(self,**kw):
                        if str(failure)=='Injected publication failure' and kw['Key'].startswith('meridian/releases/'):
                            raise failure
                        if kw.get('IfNoneMatch')=='*' and kw['Key'] in objects:raise CloudError('PreconditionFailed')
                        body=kw['Body'];objects[kw['Key']]=body.encode() if isinstance(body,str) else body
                    def delete_object(self,**kw):del objects[kw['Key']]
                class CF:
                    def __init__(self):self.config=copy.deepcopy(original);self.updates=[]
                    def get_distribution_config(self,**kw):return {'ETag':str(len(self.updates)),'DistributionConfig':copy.deepcopy(self.config)}
                    def create_function(self,**kw):return {'ETag':'function-etag'}
                    def publish_function(self,**kw):return {'FunctionSummary':{'FunctionMetadata':{'FunctionARN':'new'}}}
                    def test_function(self,**kw):return {'TestResult':{'FunctionOutput':json.dumps({'response':{'headers':{'location':{'value':'https://www.sozorock.com/school/apply?program=ai-governance'}}}})}}
                    def update_distribution(self,**kw):self.config=copy.deepcopy(kw['DistributionConfig']);self.updates.append(self.config)
                    def get_waiter(self,name):return types.SimpleNamespace(wait=lambda **kw:None)
                s3=S3();cf=CF();sha='a'*40;lock='deployment-backups/sozorock-com/release.lock'
                gate={key:True for key in ['applications','administratorReadback','contact','claimsConfirmed']};gate.update(account=release.ACCOUNT,distributionId=release.DIST,expiresAt=int(time.time())+60,configSha256={name:release.digest(objects['meridian/'+name]) for name in release.MUTABLE});release.save(evidence/'operational-acceptance.json',gate)
                def fake_run(cmd,**kw):Path(cmd[-1]).write_text('function handler(event){return event.request;}')
                with patch.object(release,'ROOT',root),patch.object(release.subprocess,'check_output',side_effect=lambda cmd,**kw:sha if cmd[1]=='rev-parse' else ''),patch.object(release.subprocess,'run',side_effect=fake_run),patch.object(release,'run_acceptance',side_effect=failure):
                    with self.assertRaises(type(failure)):release.deploy(s3,cf,types.SimpleNamespace(activate=True,headers_policy=None),evidence,cf.get_distribution_config(),lock,'test-token')
                publication_failed=str(failure)=='Injected publication failure'
                self.assertEqual(cf.config,original);self.assertEqual(len(cf.updates),0 if publication_failed else 2);self.assertNotIn(lock,objects)
                self.assertEqual(objects['meridian/applications-config.js'],b'current applications config');self.assertEqual(objects['meridian/engagement-config.js'],b'current contact config')
                self.assertEqual(any(key.endswith('previous-distribution.json')for key in objects),not publication_failed)
                self.assertEqual((evidence/'automatic-rollback.json').exists(),not publication_failed);self.assertFalse((evidence/'production-result.json').exists())
    def test_artifact_keeps_configuration_and_callback_outside_versioned_assets(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);page=root/'index.html'
            page.write_text('<script src="/applications-config.js"></script><script src="/admin.js"></script><script src="/cbcap-preview.js"></script><a href="/admin.html">Staff</a><img src="/media/director.webp">')
            (root/'applications-config.js').write_text('mutable');(root/'engagement-config.js').write_text('mutable')
            (root/'admin.html').write_text('existing admin');(root/'admin.js').write_text('existing admin script')
            data=release.artifact_bytes(page,'a'*40).decode()
            self.assertIn('src="/applications-config.js"',data);self.assertIn('href="/admin.html"',data)
            self.assertIn('src="/admin.js"',data);self.assertIn('/releases/'+'a'*40+'/media/director.webp',data)
            self.assertIn('src="/releases/'+'a'*40+'/cbcap-preview.js"',data)
            entries=release.files_manifest(root,'a'*40);self.assertEqual([x['path']for x in entries],['index.html'])
            self.assertEqual(entries[0]['sha256'],release.digest(data.encode()))
    def test_configuration_switch_preserves_origin_and_unrelated_associations(self):
        original={'Aliases':{'Items':['sozorock.com','www.sozorock.com']},'Origins':{'Items':[{'Id':'site','DomainName':'sozorock-meridian-site.s3.us-east-1.amazonaws.com','OriginPath':'/meridian'}]},'DefaultCacheBehavior':{'TargetOriginId':'site','FunctionAssociations':{'Quantity':2,'Items':[{'EventType':'viewer-request','FunctionARN':'old'},{'EventType':'viewer-response','FunctionARN':'preserve'}]}}}
        before=json.dumps(original,sort_keys=True);changed=release.release_configuration(original,'new','b'*40,'headers')
        self.assertEqual(before,json.dumps(original,sort_keys=True));self.assertEqual(changed['Origins'],original['Origins'])
        self.assertIn({'EventType':'viewer-response','FunctionARN':'preserve'},changed['DefaultCacheBehavior']['FunctionAssociations']['Items'])
        self.assertEqual(changed['CustomErrorResponses']['Items'][0]['ResponseCode'],'404')
        original['Aliases']['Items'].append('canada.sozorock.com')
        with self.assertRaises(AssertionError):release.release_configuration(original,'new','b'*40)

if __name__=='__main__':unittest.main()
