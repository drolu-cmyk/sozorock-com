"""Receipt, validation and admin boundary regression tests; no AWS credentials."""
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import types
import unittest
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parents[1]
class ClientError(Exception):
    def __init__(self, code):
        self.response = {'Error': {'Code': code}}
class BotoCoreError(Exception):
    pass

fake_boto = types.ModuleType('boto3')
fake_boto.resource = Mock()
errors = types.ModuleType('botocore.exceptions')
errors.ClientError, errors.BotoCoreError = ClientError, BotoCoreError
with patch.dict(sys.modules, {'boto3': fake_boto, 'botocore.exceptions': errors}), patch.dict(os.environ, {'TABLE_NAME': 'test'}):
    spec = importlib.util.spec_from_file_location('applications', ROOT / 'infra/aws/applications.py')
    app = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(app)

class ApplicationsTests(unittest.TestCase):
    def setUp(self):
        self.table = Mock()
        app.TABLE = self.table
        self.env = patch.dict(os.environ, {'INTAKE_ENABLED': 'true', 'ADMIN_CLIENT_ID': 'client'})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.data = {'requestId': '12345678-1234-1234-1234-123456789abc', 'name': 'Test Applicant',
            'email': 'test@example.invalid', 'programme': 'ai-governance',
            'motivation': 'Synthetic application used for regression testing.', 'consent': True}
    def submit(self, **changes):
        return app.handler({'routeKey': 'POST /applications', 'body': json.dumps(dict(self.data, **changes))}, None)
    def listing(self, claims=None, query=None):
        return app.handler({'routeKey': 'GET /admin/applications', 'queryStringParameters': query,
            'requestContext': {'authorizer': {'jwt': {'claims': claims or {}}}}}, None)
    def claims(self, **extra):
        return dict({'token_use': 'access', 'client_id': 'client', 'cognito:groups': '[Admins]'}, **extra)
    def test_acknowledges_only_write_and_retains_for_90_days(self):
        result = self.submit()
        self.assertEqual(result['statusCode'], 200)
        item = self.table.put_item.call_args.kwargs['Item']
        self.assertEqual(item['expiresAt'] - item['createdAt'], 90 * 86400)
        self.assertEqual(self.table.put_item.call_args.kwargs['ConditionExpression'], 'attribute_not_exists(id)')
    def test_write_failure_never_acknowledged(self):
        self.table.put_item.side_effect = ClientError('ProvisionedThroughputExceededException')
        self.assertEqual(self.submit()['statusCode'], 503)
    def test_retry_returns_same_receipt_and_conflicting_retry_rejected(self):
        self.submit()
        saved = self.table.put_item.call_args.kwargs['Item']
        self.table.put_item.side_effect = ClientError('ConditionalCheckFailedException')
        self.table.get_item.return_value = {'Item': saved}
        result = self.submit()
        self.assertEqual(json.loads(result['body'])['id'], self.data['requestId'])
        self.assertTrue(self.table.get_item.call_args.kwargs['ConsistentRead'])
        self.assertEqual(self.submit(name='Changed Applicant')['statusCode'], 409)
        self.table.get_item.side_effect = BotoCoreError()
        self.assertEqual(self.submit()['statusCode'], 503)
    def test_invalid_input_is_not_persisted(self):
        for changes in ({'consent': 'true'}, {'programme': 'other'}, {'email': 'invalid'},
                        {'website': 'bot'}, {'requestId': 'bad'}, {'name': ['invalid']}, {'motivation': 'short'}):
            with self.subTest(changes=changes):
                self.assertEqual(self.submit(**changes)['statusCode'], 400)
        self.table.put_item.assert_not_called()
    def test_disabled_intake_and_malformed_payload(self):
        with patch.dict(os.environ, {'INTAKE_ENABLED': 'false'}):
            self.assertEqual(self.submit()['statusCode'], 503)
        for body, status in [('not json', 400), ('[]', 400), ('x' * 22001, 413)]:
            self.assertEqual(app.handler({'routeKey': 'POST /applications', 'body': body}, None)['statusCode'], status)
        self.table.put_item.assert_not_called()
    def test_admin_must_have_access_token_client_and_exact_group(self):
        for claims in ({}, self.claims(token_use='id'), self.claims(client_id='other'),
                       self.claims(**{'cognito:groups': '[NotAdmins]'})):
            self.assertEqual(self.listing(claims)['statusCode'], 403)
        self.table.scan.assert_not_called()
    def test_empty_filtered_page_preserves_cursor(self):
        self.table.scan.return_value = {'Items': [], 'LastEvaluatedKey': {'id': self.data['requestId']}}
        body = json.loads(self.listing(self.claims())['body'])
        self.assertEqual(body['items'], [])
        self.assertTrue(body['nextCursor'])
        self.listing(self.claims(), {'cursor': body['nextCursor'], 'limit': '10'})
        self.assertEqual(self.table.scan.call_args.kwargs['ExclusiveStartKey'], {'id': self.data['requestId']})
        self.assertEqual(self.table.scan.call_args.kwargs['Limit'], 10)
    def test_admin_invalid_cursor_and_storage_failure(self):
        for query in ({'limit': '101'}, {'limit': '0'}, {'cursor': '!invalid'}):
            self.assertEqual(self.listing(self.claims(), query)['statusCode'], 400)
        self.table.scan.side_effect = BotoCoreError()
        self.assertEqual(self.listing(self.claims())['statusCode'], 503)
    def test_other_origin_and_unknown_route_rejected(self):
        self.assertEqual(app.handler({'headers': {'origin': 'https://canada.sozorock.com'}}, None)['statusCode'], 403)
        self.assertEqual(app.handler({'routeKey': 'DELETE /applications'}, None)['statusCode'], 404)
    def test_template_embeds_current_source_and_protects_admin(self):
        template = json.loads(subprocess.check_output([sys.executable, str(ROOT / 'scripts/build-applications-template.py')]))
        r = template['Resources']
        self.assertEqual(r['Handler']['Properties']['Code']['ZipFile'], (ROOT / 'infra/aws/applications.py').read_text())
        self.assertEqual(r['AdminRoute']['Properties']['AuthorizationType'], 'JWT')
        self.assertEqual(r['Admins']['Properties']['MfaConfiguration'], 'ON')
        self.assertEqual(template['Parameters']['IntakeEnabled']['Default'], 'false')
        self.assertEqual(r['Applications']['DeletionPolicy'], 'Retain')
        self.assertEqual(template['Parameters']['ReserveFunctionCapacity']['Default'], 'false')
        self.assertEqual(template['Conditions']['ReserveCapacity'], {'Fn::Equals': [{'Ref':'ReserveFunctionCapacity'}, 'true']})
        self.assertEqual(r['Handler']['Properties']['ReservedConcurrentExecutions'],
                         {'Fn::If': ['ReserveCapacity', 5, {'Ref':'AWS::NoValue'}]})
        self.assertEqual(r['Stage']['Properties']['DefaultRouteSettings'],
                         {'ThrottlingBurstLimit':10, 'ThrottlingRateLimit':5})

if __name__ == '__main__':
    unittest.main()
