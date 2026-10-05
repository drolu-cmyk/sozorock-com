"""Privacy and sender-boundary checks for opt-in monitoring; no AWS access."""
import base64
import contextlib
import gzip
import io
import json
import os
from pathlib import Path
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = json.loads((ROOT / 'infra/security-observability.template.json').read_text())


class MonitoringTests(unittest.TestCase):
    def test_api_log_fields_exclude_personal_payload_and_credentials(self):
        fields = json.loads(TEMPLATE['Outputs']['ApiAccessLogFormat']['Value'])
        self.assertEqual(set(fields), {'requestId', 'route', 'status', 'latency', 'responseLength', 'sourceIp'})
        self.assertEqual(fields['route'], '$context.routeKey')
        for value in fields.values():
            for forbidden in ('body', 'header', 'query', 'cookie', 'authorizer', 'path'):
                self.assertNotIn(forbidden, value.lower())
        self.assertEqual(TEMPLATE['Resources']['ApiAccessLogs']['Properties']['RetentionInDays'], 30)

    def test_log_bucket_is_private_encrypted_expiring_and_source_bound(self):
        bucket = TEMPLATE['Resources']['PrivateAccessLogs']['Properties']
        self.assertTrue(all(bucket['PublicAccessBlockConfiguration'].values()))
        self.assertEqual(bucket['OwnershipControls']['Rules'][0]['ObjectOwnership'], 'BucketOwnerEnforced')
        self.assertEqual(bucket['LifecycleConfiguration']['Rules'][0]['ExpirationInDays'], 30)
        self.assertIn('BucketEncryption', bucket)
        statements = TEMPLATE['Resources']['PrivateAccessLogsPolicy']['Properties']['PolicyDocument']['Statement']
        grant = next(s for s in statements if s['Effect'] == 'Allow')
        self.assertEqual(grant['Principal'], {'Service': 'logging.s3.amazonaws.com'})
        self.assertIn('aws:SourceAccount', grant['Condition']['StringEquals'])
        self.assertIn('aws:SourceArn', grant['Condition']['ArnLike'])
        self.assertTrue(any(s['Effect'] == 'Deny' and s['Condition']['Bool'].get('aws:SecureTransport') == 'false' for s in statements))

    def event(self, owner='synthetic-account', source='192.0.2.7'):
        payload = {'owner': owner, 'logGroup': '/synthetic/api', 'messageType': 'DATA_MESSAGE',
                   'logEvents': [{'message': json.dumps({'route': 'GET /admin/submissions', 'sourceIp': source,
                                                        'extraSecret': 'must-never-be-logged'})}]}
        return {'awslogs': {'data': base64.b64encode(gzip.compress(json.dumps(payload).encode())).decode()}}

    def invoke(self, event, ranges):
        namespace = {}
        exec(TEMPLATE['Resources']['Inspector']['Properties']['Code']['ZipFile'], namespace)
        output = io.StringIO()
        with patch.dict(os.environ, {'EXPECTED_ACCOUNT': 'synthetic-account', 'EXPECTED_LOG_GROUP': '/synthetic/api',
                                    'EXPECTED_ADMIN_CIDRS': ranges}), contextlib.redirect_stdout(output):
            namespace['handler'](event, None)
        return output.getvalue()

    def test_ip_alert_requires_baseline_and_derived_logs_exclude_ip_and_payload(self):
        self.assertEqual(self.invoke(self.event(), ''), '')
        self.assertEqual(json.loads(self.invoke(self.event(), '192.0.2.0/24'))['unexpectedAdminSourceCount'], 0)
        result = self.invoke(self.event(), '198.51.100.0/24')
        self.assertEqual(json.loads(result), {'unexpectedAdminSourceCount': 1})
        self.assertNotIn('192.0.2.7', result)
        self.assertNotIn('must-never-be-logged', result)
        self.assertEqual(json.loads(self.invoke(self.event(source='2001:db8::1'), '2001:db8::/32'))['unexpectedAdminSourceCount'], 0)

    def test_unexpected_log_sender_is_rejected(self):
        with self.assertRaises(ValueError):
            self.invoke(self.event(owner='another-account'), '192.0.2.0/24')
        permission = TEMPLATE['Resources']['InspectorInvoke']['Properties']
        self.assertIn('SourceAccount', permission)
        self.assertIn('SourceArn', permission)

    def test_source_logging_is_not_implicitly_changed_by_stack(self):
        self.assertEqual(TEMPLATE['Parameters']['EnableStorageMetrics']['Default'], 'false')
        self.assertEqual(TEMPLATE['Parameters']['ExpectedAdminCidrs']['Default'], '')
        self.assertNotIn('LoggingConfiguration', TEMPLATE['Resources']['PrivateAccessLogs']['Properties'])
        self.assertFalse(any(r['Type'] in {'AWS::ApiGatewayV2::Stage', 'AWS::CloudFront::Distribution'} for r in TEMPLATE['Resources'].values()))
        compile((ROOT / 'scripts/configure-security-observability.py').read_text(), 'operator', 'exec')


if __name__ == '__main__':
    unittest.main()
