"""Offline regressions for artifact isolation and rollback scope."""
import importlib.util,json,tempfile,unittest,types
from unittest.mock import patch
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('release',ROOT/'scripts/release.py');release=importlib.util.module_from_spec(spec)
errors=types.ModuleType('botocore.exceptions');errors.ClientError=Exception
with patch.dict('sys.modules',{'boto3':types.ModuleType('boto3'),'botocore.exceptions':errors}):spec.loader.exec_module(release)

class ReleaseTests(unittest.TestCase):
    def test_artifact_keeps_configuration_and_callback_outside_versioned_assets(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);page=root/'admin.html'
            page.write_text('<script src="/applications-config.js"></script><script src="/admin.js"></script><a href="/admin.html">Staff</a><img src="/media/director.webp">')
            (root/'applications-config.js').write_text('mutable');(root/'engagement-config.js').write_text('mutable')
            data=release.artifact_bytes(page,'a'*40).decode()
            self.assertIn('src="/applications-config.js"',data);self.assertIn('href="/admin.html"',data)
            self.assertIn('/releases/'+'a'*40+'/admin.js',data);self.assertIn('/releases/'+'a'*40+'/media/director.webp',data)
            entries=release.files_manifest(root,'a'*40);self.assertEqual([x['path']for x in entries],['admin.html'])
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
