"""Review, one-time offer and concurrent-write boundaries with synthetic records."""
import copy
import hashlib
import json
import time
import unittest
from unittest.mock import Mock, patch
from test_applications import app, ClientError, fake_boto


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.item = {'id': '12345678-1234-1234-1234-123456789abc', 'status': 'received',
                     'programme': 'ai-governance', 'version': 0, 'email': 'synthetic@example.invalid',
                     'expiresAt': int(time.time()) + 86400, 'createdAt': int(time.time())}
        self.table = Mock()
        self.table.get_item.side_effect = lambda **kw: {'Item': copy.deepcopy(self.item)}
        self.table.put_item.side_effect = self.write
        self.patch = patch.object(app, 'TABLE', self.table)
        self.patch.start()
        self.addCleanup(self.patch.stop)
        self.env = patch.dict(app.os.environ, {'ADMIN_CLIENT_ID': 'client', 'TABLE_NAME': 'synthetic'})
        self.env.start()
        self.addCleanup(self.env.stop)

    def write(self, **kw):
        if kw['ExpressionAttributeValues'][':v'] != self.item['version']:
            raise ClientError('ConditionalCheckFailedException')
        self.item = copy.deepcopy(kw['Item'])

    def event(self, route, data, authorized=True):
        return {'routeKey': route, 'body': json.dumps(data), 'pathParameters': {'id': self.item['id']},
                'requestContext': {'authorizer': {'jwt': {'claims': {
                    'token_use': 'access', 'client_id': 'client',
                    'cognito:groups': '[Admins]' if authorized else '[Learners]', 'sub': 'synthetic-admin'}}}}}

    def call(self, route, data, authorized=True):
        result = app.handler(self.event(route, data, authorized), None)
        return result['statusCode'], json.loads(result['body'])

    def offer_token(self):
        code, _ = self.call('POST /admin/applications/{id}/status',
                            {'status': 'under_review', 'note': 'Reviewed synthetic application', 'expectedVersion': 0})
        self.assertEqual(code, 200)
        code, result = self.call('POST /admin/applications/{id}/offer', {'expectedVersion': 1})
        self.assertEqual(code, 200)
        return result['offerUrl'].split('#token=')[1]

    def test_review_auth_and_cas_prevent_unauthorized_or_stale_changes(self):
        data = {'status': 'under_review', 'expectedVersion': 0}
        self.assertEqual(self.call('POST /admin/applications/{id}/status', data, False)[0], 403)
        self.table.put_item.assert_not_called()
        self.assertEqual(self.call('POST /admin/applications/{id}/status', data)[0], 200)
        self.assertEqual(self.call('POST /admin/applications/{id}/status', data)[0], 409)
        self.assertEqual(self.item['history'][0]['actor'], 'synthetic-admin')

    def test_no_manual_paid_enrolled_or_offered_shortcuts(self):
        for status in ('paid', 'enrolled', 'payment_pending', 'offered', 'offer_accepted', 'unknown'):
            self.assertEqual(self.call('POST /admin/applications/{id}/status',
                                      {'status': status, 'expectedVersion': 0})[0], 409)
        self.table.put_item.assert_not_called()

    def test_offer_is_secret_authorization_and_response_excludes_private_data(self):
        token = self.offer_token()
        self.assertNotIn(token, json.dumps(self.item))
        code, public = self.call('POST /offers/view', {'token': token})
        self.assertEqual(code, 200)
        self.assertNotIn('email', public)
        self.assertNotIn('notes', public)
        self.assertNotIn('history', public)
        self.assertEqual(public['fee']['total'], 299)
        self.assertEqual(self.call('POST /offers/view', {'token': self.item['id']})[0], 404)
        self.assertEqual(self.call('POST /offers/view', {'token': token[:-1] + '!'} )[0], 404)

    def test_accept_is_single_decision_retry_safe_and_does_not_enroll(self):
        token = self.offer_token()
        accept = {'token': token, 'consent': True, 'termsVersion': self.item['offerTerms']['terms']['version']}
        self.assertEqual(self.call('POST /offers/accept', accept)[0], 200)
        saved_version = self.item['version']
        self.assertEqual(self.call('POST /offers/accept', accept)[0], 200)
        self.assertEqual(self.item['version'], saved_version)
        self.assertEqual(self.call('POST /offers/decline', {'token': token})[0], 409)
        self.assertEqual(self.item['status'], 'offer_accepted')
        self.assertTrue(self.item['offerConsent'])
        self.assertEqual(self.item['offerConsentVersion'], accept['termsVersion'])
        self.assertEqual(self.item['offerConsentAt'], self.item['offerRespondedAt'])

    def test_expired_or_withdrawn_offer_denied(self):
        token = self.offer_token()
        self.item['offerExpiresAt'] = 1
        self.assertEqual(self.call('POST /offers/accept', {'token': token})[0], 404)
        self.item['offerExpiresAt'] = int(time.time()) + 100
        self.item['status'] = 'withdrawn'
        self.assertEqual(self.call('POST /offers/view', {'token': token})[0], 404)

    def test_lost_offer_link_can_be_rotated_but_old_link_is_invalidated(self):
        old = self.offer_token()
        code, value = self.call('POST /admin/applications/{id}/offer', {'expectedVersion': self.item['version']})
        self.assertEqual(code, 200)
        new = value['offerUrl'].split('#token=')[1]
        self.assertNotEqual(old, new)
        self.assertEqual(self.call('POST /offers/view', {'token': old})[0], 404)
        self.assertEqual(self.call('POST /offers/accept', {'token': new, 'consent': True,
                              'termsVersion': self.item['offerTerms']['terms']['version']})[0], 200)
        self.assertEqual(self.call('POST /admin/applications/{id}/offer', {'expectedVersion': self.item['version']})[0], 409)

    def test_ip_quota_returns_429_without_application_write(self):
        self.table.update_item.side_effect = ClientError('ConditionalCheckFailedException')
        self.assertFalse(app.rate_limit({'requestContext': {'http': {'sourceIp': '192.0.2.1'}}}))
        key = self.table.update_item.call_args.kwargs['Key']['id']
        self.assertNotIn('192.0.2.1', key)

    def test_intake_and_duplicate_guard_are_atomic_and_email_normalized(self):
        client = Mock()
        with patch.object(fake_boto, 'client', return_value=client):
            app.persist_submission(self.item)
        writes = client.transact_write_items.call_args.kwargs['TransactItems']
        self.assertEqual(len(writes), 2)
        self.assertEqual(writes[0]['Put']['Item']['id']['S'], self.item['id'])
        self.assertTrue(writes[1]['Put']['Item']['id']['S'].startswith('duplicate#'))
        self.assertEqual(writes[0]['Put']['TableName'], writes[1]['Put']['TableName'])

    def test_offer_quota_blocks_storage_lookup_and_ignores_forwarded_header(self):
        event = self.event('POST /offers/view', {'token': 'invalid'})
        event['requestContext']['http'] = {'sourceIp': '192.0.2.3'}
        event['headers'] = {'x-forwarded-for': '198.51.100.1'}
        self.table.update_item.side_effect = ClientError('ConditionalCheckFailedException')
        result = app.handler(event, None)
        self.assertEqual(result['statusCode'], 429)
        self.assertEqual(result['headers']['Retry-After'], '600')
        self.table.get_item.assert_not_called()
        key = self.table.update_item.call_args.kwargs['Key']['id']
        event['headers']['x-forwarded-for'] = '203.0.113.2'
        app.handler(event, None)
        self.assertEqual(self.table.update_item.call_args.kwargs['Key']['id'], key)

    def test_accept_requires_explicit_consent_to_the_displayed_version(self):
        token = self.offer_token()
        version = self.item['offerTerms']['terms']['version']
        for data in ({'token': token}, {'token': token, 'consent': 'true', 'termsVersion': version},
                     {'token': token, 'consent': True, 'termsVersion': 'other'}):
            self.assertEqual(self.call('POST /offers/accept', data)[0], 400)
        self.assertEqual(self.item['status'], 'offered')
        self.assertNotIn('offerConsentAt', self.item)

    def test_saved_offer_is_preserved_on_view_and_link_rotation(self):
        token = self.offer_token()
        self.item['offerTerms']['fee'].update(enrollment=10, tuition=200, total=210)
        self.item['offerTerms']['terms']['version'] = 'synthetic-saved-version'
        saved = copy.deepcopy(self.item['offerTerms'])
        code, view = self.call('POST /offers/view', {'token': token})
        self.assertEqual(code, 200)
        self.assertEqual(view['fee'], saved['fee'])
        code, _ = self.call('POST /admin/applications/{id}/offer', {'expectedVersion': self.item['version']})
        self.assertEqual(code, 200)
        self.assertEqual(self.item['offerTerms'], saved)

    def test_legacy_offer_keeps_original_terms_and_freezes_them_on_accept(self):
        token = self.offer_token()
        del self.item['offerTerms']
        code, view = self.call('POST /offers/view', {'token': token})
        self.assertEqual(code, 200)
        self.assertEqual(view['fee']['total'], 299)
        self.assertEqual(view['terms']['version'], 'us-offer-legacy-v1')
        self.assertEqual(self.call('POST /offers/accept', {'token': token, 'consent': True,
            'termsVersion': view['terms']['version']})[0], 200)
        self.assertEqual(self.item['offerTerms']['fee'], view['fee'])
        self.assertEqual(self.item['offerConsentVersion'], 'us-offer-legacy-v1')


if __name__ == '__main__':
    unittest.main()
