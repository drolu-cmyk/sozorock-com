import importlib.util,json,os,sys,time,unittest
from pathlib import Path
from unittest.mock import Mock,patch
from test_applications import fake_boto,errors,ClientError
with patch.dict(sys.modules,{'boto3':fake_boto,'botocore.exceptions':errors}),patch.dict(os.environ,{'TABLE_NAME':'test'}):
    spec=importlib.util.spec_from_file_location('enquiries',Path(__file__).resolve().parents[1]/'infra/aws/enquiries.py')
    app=importlib.util.module_from_spec(spec);spec.loader.exec_module(app)
class EnquiryTests(unittest.TestCase):
    def setUp(self):
        self.table=Mock();app.TABLE=self.table
        self.data={'requestId':'12345678-1234-1234-1234-123456789abc','name':'Synthetic Test','email':'test@example.invalid','message':'Synthetic enquiry for receipt testing.','intent':'general','context':'corporate','organization':'Test Organization'}
    def submit(self,**changes):return app.handler({'body':json.dumps(dict(self.data,**changes))},None)
    def test_corporate_receipt_is_written_before_acknowledgment(self):
        self.assertEqual(self.submit()['statusCode'],200)
        item=self.table.put_item.call_args.kwargs['Item'];self.assertEqual(item['context'],'corporate');self.assertEqual(item['organization'],'Test Organization');self.assertEqual(item['expiresAt']-item['createdAt'],30*86400)
    def test_uncertain_write_is_not_a_receipt(self):
        self.table.put_item.side_effect=ClientError('ProvisionedThroughputExceededException');self.assertEqual(self.submit()['statusCode'],503)
    def test_replay_conflict_and_expiry(self):
        self.submit();item=self.table.put_item.call_args.kwargs['Item'];self.table.put_item.side_effect=ClientError('ConditionalCheckFailedException');self.table.get_item.return_value={'Item':item}
        self.assertEqual(self.submit()['statusCode'],200)
        self.assertEqual(self.submit(organization='Different')['statusCode'],409)
        self.table.get_item.return_value={'Item':dict(item,expiresAt=int(time.time())-1)}
        self.assertEqual(self.submit()['statusCode'],409)
    def test_context_and_field_limits(self):
        for data in [{'context':'admin'},{'organization':'x'*201},{'email':'invalid'},{'website':'bot'},{'message':'short'}]:self.assertEqual(self.submit(**data)['statusCode'],400)
