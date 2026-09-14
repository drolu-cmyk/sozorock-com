"""Independent US intake. API Gateway verifies JWT signatures before admin routes."""
import base64
import binascii
import hashlib
import hmac
import json
import os
import re
import secrets
import time

import boto3
from botocore.exceptions import BotoCoreError, ClientError

TABLE = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])
ENQUIRIES = (boto3.resource('dynamodb').Table(os.environ['ENQUIRIES_TABLE_NAME'])
             if os.environ.get('ENQUIRIES_TABLE_NAME') else None)
ORIGIN = 'https://www.sozorock.com'
PROGRAMMES = {'applied-ai-systems', 'cybersecurity-grc', 'identity-access-management', 'ai-governance'}
UUID = r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'
STATES = set('AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY AS GU MP PR VI UM'.split())
TRANSITIONS = {'received': {'under_review', 'withdrawn'},
    'under_review': {'waitlisted', 'not_selected', 'withdrawn'},
    'waitlisted': {'under_review', 'not_selected', 'withdrawn'},
    'offered': {'withdrawn'}, 'offer_accepted': {'withdrawn'},
    'offer_declined': set(), 'not_selected': set(), 'withdrawn': set(),
    'payment_pending': set(), 'paid': set(), 'enrolled': set()}


def body(event):
    raw = event.get('body') or ''
    if not isinstance(raw, str) or len(raw) > 22000:
        raise ValueError('Invalid body')
    if event.get('isBase64Encoded'):
        raw = base64.b64decode(raw, validate=True).decode('utf-8')
    if len(raw.encode()) > 16000:
        raise ValueError('Invalid body')
    value = json.loads(raw)
    if not isinstance(value, dict):
        raise ValueError('Invalid body')
    return value


def get_application(identifier):
    if not isinstance(identifier, str) or not re.fullmatch(UUID, identifier):
        return None
    item = TABLE.get_item(Key={'id': identifier}, ConsistentRead=True).get('Item')
    return item if isinstance(item, dict) and item.get('expiresAt', 0) > int(time.time()) else None


def replace_application(item, previous_version):
    item['version'] = previous_version + 1
    TABLE.put_item(Item=item, ConditionExpression='attribute_exists(id) AND (version = :v OR attribute_not_exists(version))',
                   ExpressionAttributeValues={':v': previous_version})


def record_event(item, status, actor, note=''):
    now = int(time.time())
    history = list(item.get('history', []))
    if len(history) >= 200:
        raise ValueError('Review history limit reached')
    history.append({'status': status, 'actor': actor, 'timestamp': now, 'note': note})
    item.update(status=status, updatedAt=now, history=history)
    if note:
        item['notes'] = list(item.get('notes', [])) + [{'text': note, 'actor': actor, 'timestamp': now}]


def attribute(value):
    """Encode the small, explicit document types used in atomic intake writes."""
    if isinstance(value, bool):
        return {'BOOL': value}
    if isinstance(value, int):
        return {'N': str(value)}
    if isinstance(value, str):
        return {'S': value}
    if isinstance(value, list):
        return {'L': [attribute(v) for v in value]}
    if isinstance(value, dict):
        return {'M': {k: attribute(v) for k, v in value.items()}}
    raise ValueError('Unsupported storage value')


def persist_submission(item):
    # Atomically claim email/program for 24 hours and write the application.
    # A new browser-generated UUID cannot bypass rapid duplicate protection.
    duplicate = hashlib.sha256((item['email'].lower() + '\n' + item['programme']).encode()).hexdigest()
    guard = {'id': 'duplicate#' + duplicate, 'expiresAt': item['createdAt'] + 86400}
    boto3.client('dynamodb').transact_write_items(TransactItems=[
        {'Put': {'TableName': os.environ['TABLE_NAME'], 'Item': attribute(item)['M'],
                 'ConditionExpression': 'attribute_not_exists(id)'}},
        {'Put': {'TableName': os.environ['TABLE_NAME'], 'Item': attribute(guard)['M'],
                 'ConditionExpression': 'attribute_not_exists(id) OR expiresAt <= :now',
                 'ExpressionAttributeValues': {':now': {'N': str(item['createdAt'])}}}}])


def rate_limit(event):
    address = event.get('requestContext', {}).get('http', {}).get('sourceIp')
    if not address:  # Only IAM-invoked tests lack API Gateway's source IP.
        return True
    now = int(time.time())
    key = 'rate#' + hashlib.sha256((address + ':' + str(now // 600)).encode()).hexdigest()
    try:
        TABLE.update_item(Key={'id': key},
            UpdateExpression='SET expiresAt = :expires ADD attempts :one',
            ConditionExpression='attribute_not_exists(attempts) OR attempts < :limit',
            ExpressionAttributeValues={':expires': now + 1200, ':one': 1, ':limit': 10})
        return True
    except ClientError as error:
        if error.response['Error']['Code'] != 'ConditionalCheckFailedException':
            raise
        return False


def review(event, issue_offer=False):
    if not admin(event):
        return response(403, {'message': 'Administrator access required.'})
    item = get_application((event.get('pathParameters') or {}).get('id'))
    if not item:
        return response(404, {'message': 'Application not found.'})
    data = body(event)
    version = int(item.get('version', 0))
    if type(data.get('expectedVersion')) is not int or data['expectedVersion'] != version:
        return response(409, {'message': 'Application changed. Refresh before reviewing.'})
    note = data.get('note', '')
    if not isinstance(note, str) or len(note) > 2000:
        raise ValueError('Invalid note')
    actor = event['requestContext']['authorizer']['jwt']['claims'].get('sub')
    if not actor:
        return response(403, {'message': 'Administrator identity required.'})
    status = data.get('status')
    token = None
    if issue_offer:
        if item['status'] not in {'under_review', 'waitlisted', 'offered'}:
            return response(409, {'message': 'Review the application before issuing an offer.'})
        # No guessed refund policy or payment obligation is introduced by an offer.
        token = item['id'] + '.' + secrets.token_urlsafe(32)
        item.update(offerTokenHash=hashlib.sha256(token.encode()).hexdigest(),
                    offerExpiresAt=min(int(time.time()) + 14 * 86400, int(item['expiresAt'])),
                    offerIssuedAt=int(time.time()))
        status = 'offered'
    elif status != item['status'] and status not in TRANSITIONS.get(item['status'], set()):
        return response(409, {'message': 'This status transition is not available. Payment and enrollment require a verified payment service.'})
    elif status == item['status'] and not note.strip():
        raise ValueError('A review note or status change is required')
    record_event(item, status, actor, note.strip())
    replace_application(item, version)
    result = {'id': item['id'], 'status': status, 'version': item['version']}
    if token:
        result['offerUrl'] = ORIGIN + '/school/offer#token=' + token
    return response(200, result)


def offer(event, decision=None):
    data = body(event)
    token = data.get('token', '')
    if not isinstance(token, str) or not re.fullmatch(UUID + r'\.[A-Za-z0-9_-]{43}', token):
        return response(404, {'message': 'Offer link is invalid or expired.'})
    item = get_application(token.split('.')[0])
    if (not item or item.get('offerExpiresAt', 0) <= int(time.time())
            or not hmac.compare_digest(item.get('offerTokenHash', ''), hashlib.sha256(token.encode()).hexdigest())
            or item['status'] not in {'offered', 'offer_accepted', 'offer_declined'}):
        return response(404, {'message': 'Offer link is invalid or expired.'})
    if decision:
        if item['status'] != 'offered':
            # A retry can read its completed outcome; cannot make a second decision.
            if item['status'] == decision:
                return response(200, {'status': decision, 'paymentAvailable': False})
            return response(409, {'message': 'This offer has already received a response.'})
        version = int(item.get('version', 0))
        record_event(item, decision, 'applicant:offer-token')
        item['offerRespondedAt'] = int(time.time())
        replace_application(item, version)
        return response(200, {'status': decision, 'paymentAvailable': False})
    return response(200, {'programme': item['programme'], 'status': item['status'],
        'duration': '12 weeks', 'weeklyCommitment': '3 to 6 hours/week', 'format': '100% virtual',
        'expiresAt': item['offerExpiresAt'], 'paymentAvailable': False,
        'fee': {'enrollment': 49, 'tuition': 250, 'total': 299, 'currency': 'USD'},
        'terms': {'cancellationRefund': 'No payment is collected when accepting this offer. Applicable tax, the final total and cancellation/refund terms will be shown before any payment commitment.',
                  'equipment': 'Programme and session arrangements will be confirmed before enrollment. No start date is assigned by accepting this offer.'}})


def response(status, body):
    return {'statusCode': status, 'headers': {'Content-Type': 'application/json',
            'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': ORIGIN,
            'Vary': 'Origin'}, 'body': json.dumps(body, default=int)}


def admin(event):
    claims = event.get('requestContext', {}).get('authorizer', {}).get('jwt', {}).get('claims', {})
    groups = claims.get('cognito:groups', [])
    if isinstance(groups, str):
        # HTTP API represents array claims as a bracketed, comma-separated string.
        groups = [part.strip().strip('"') for part in groups.strip('[]').split(',')]
    return (claims.get('token_use') == 'access'
            and claims.get('client_id') == os.environ.get('ADMIN_CLIENT_ID')
            and isinstance(groups, list) and 'Admins' in groups)


def listing(event, enquiries=False):
    if not admin(event):
        return response(403, {'message': 'Administrator access required.'})
    table = ENQUIRIES if enquiries else TABLE
    if table is None:
        return response(503, {'message': 'Enquiry access is not configured.'})
    query = event.get('queryStringParameters') or {}
    try:
        limit = int(query.get('limit', '25'))
        if not 1 <= limit <= 100:
            raise ValueError()
        args = {'Limit': limit, 'ConsistentRead': True,
                'FilterExpression': 'expiresAt > :now',
                'ExpressionAttributeValues': {':now': int(time.time())}}
        fields = ('id', 'name', 'email', 'createdAt', 'expiresAt') + (
            ('organization', 'intent', 'message', 'context') if enquiries else
            ('programme', 'motivation', 'status', 'market', 'state', 'role', 'organization',
             'availability', 'consentVersion', 'consentAt', 'version', 'notes', 'history',
             'offerIssuedAt', 'offerRespondedAt', 'offerExpiresAt'))
        args['ProjectionExpression'] = ', '.join('#f' + str(i) for i in range(len(fields)))
        args['ExpressionAttributeNames'] = {'#f' + str(i): field for i, field in enumerate(fields)}
        if enquiries:
            args['FilterExpression'] += ' AND #context = :context'
            args['ExpressionAttributeNames']['#context'] = 'context'
            args['ExpressionAttributeValues'][':context'] = 'corporate'
        cursor = query.get('cursor')
        if cursor:
            if not isinstance(cursor, str) or len(cursor) > 200:
                raise ValueError()
            decoded = base64.b64decode(cursor, altchars=b'-_', validate=True).decode()
            cursor_pattern = UUID if enquiries else '(?:' + UUID + r'|(?:rate|duplicate)#[a-f0-9]{64})'
            if not re.fullmatch(cursor_pattern, decoded):
                raise ValueError()
            args['ExclusiveStartKey'] = {'id': decoded}
    except (ValueError, TypeError, UnicodeError, binascii.Error):
        return response(400, {'message': 'Invalid page parameters.'})
    page = table.scan(**args)
    items = [{k: item[k] for k in fields if k in item} for item in page.get('Items', [])
             if item.get('expiresAt', 0) > args['ExpressionAttributeValues'][':now']
             and (enquiries or item.get('programme') in PROGRAMMES)
             and (not enquiries or item.get('context') == 'corporate')]
    last = page.get('LastEvaluatedKey')
    # Return a cursor even for an empty filtered page; never silently truncate results.
    cursor = base64.urlsafe_b64encode(last['id'].encode()).decode() if last else None
    return response(200, {'items': items, 'nextCursor': cursor})


def submit(event):
    # Provisioning never enables intake. Operator must deliberately enable service
    # only during the recorded write/readback acceptance, before public activation.
    if os.environ.get('INTAKE_ENABLED') != 'true':
        return response(503, {'message': 'Applications are not open.'})
    try:
        raw = event.get('body') or ''
        if not isinstance(raw, str):
            raise ValueError()
        if len(raw) > 22000:
            return response(413, {'message': 'Application is too large.'})
        if event.get('isBase64Encoded'):
            raw = base64.b64decode(raw, validate=True).decode('utf-8')
        if len(raw.encode('utf-8')) > 16000:
            return response(413, {'message': 'Application is too large.'})
        data = json.loads(raw)
        if not isinstance(data, dict):
            raise ValueError()
        fields = [data.get(key, '') for key in ('requestId', 'name', 'email', 'programme', 'motivation')]
        if not all(isinstance(value, str) for value in fields):
            raise ValueError()
        request_id, name, email, programme, motivation = [value.strip() for value in fields]
        email = email.lower()
        extra = [data.get(key, '') for key in ('state', 'role', 'organization', 'availability')]
        if not all(isinstance(value, str) for value in extra):
            raise ValueError()
        state, role, organization, availability = [value.strip() for value in extra]
        if (data.get('website') or data.get('consent') is not True
                or not re.fullmatch(UUID, request_id) or not 2 <= len(name) <= 100
                or len(email) > 254 or not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', email)
                or programme not in PROGRAMMES or not 20 <= len(motivation) <= 3000
                or state not in STATES or not 2 <= len(role) <= 150
                or len(organization) > 150 or availability != '3-6-hours'):
            raise ValueError()
    except (ValueError, TypeError, UnicodeError, binascii.Error):
        return response(400, {'message': 'Check your application details and consent.'})
    digest = hashlib.sha256(json.dumps([name, email, programme, motivation, state, role, organization, availability, True]).encode()).hexdigest()
    now = int(time.time())
    item = {'id': request_id, 'name': name, 'email': email, 'programme': programme,
            'motivation': motivation, 'consent': True, 'consentVersion': 'us-applications-v2',
            'consentAt': now, 'market': 'United States', 'state': state, 'role': role,
            'organization': organization, 'availability': availability, 'version': 0,
            'digest': digest, 'createdAt': now, 'expiresAt': now + 90 * 86400, 'status': 'received',
            'history': [{'status': 'received', 'actor': 'applicant', 'timestamp': now, 'note': ''}]}
    existing = get_application(request_id)
    if existing:
        if existing.get('digest') == digest:
            return response(200, {'id': request_id, 'status': 'received'})
        return response(409, {'message': 'Application reference already used. Start a new application.'})
    if not rate_limit(event):
        return response(429, {'message': 'Too many applications. Please try again later.'})
    try:
        persist_submission(item)
    except ClientError as error:
        if error.response['Error']['Code'] not in {'ConditionalCheckFailedException', 'TransactionCanceledException'}:
            raise
        existing = TABLE.get_item(Key={'id': request_id}, ConsistentRead=True).get('Item', {})
        if not isinstance(existing, dict):
            existing = {}
        if existing.get('digest') != digest or existing.get('expiresAt', 0) <= now:
            return response(409, {'message': 'An application may already have been submitted. Keep your original reference or try again after 24 hours.'})
    return response(200, {'id': request_id, 'status': 'received'})


def handler(event, context):
    headers = {key.lower(): value for key, value in (event.get('headers') or {}).items()}
    if headers.get('origin') not in (None, ORIGIN):
        return response(403, {'message': 'Origin not allowed.'})
    try:
        if event.get('routeKey') == 'POST /applications':
            return submit(event)
        if event.get('routeKey') == 'GET /admin/applications':
            return listing(event)
        if event.get('routeKey') == 'GET /admin/enquiries':
            return listing(event, enquiries=True)
        if event.get('routeKey') == 'POST /admin/applications/{id}/status':
            return review(event)
        if event.get('routeKey') == 'POST /admin/applications/{id}/offer':
            return review(event, issue_offer=True)
        if event.get('routeKey') == 'POST /offers/view':
            return offer(event)
        if event.get('routeKey') == 'POST /offers/accept':
            return offer(event, decision='offer_accepted')
        if event.get('routeKey') == 'POST /offers/decline':
            return offer(event, decision='offer_declined')
        return response(404, {'message': 'Not found.'})
    except (ValueError, TypeError, UnicodeError, binascii.Error):
        return response(400, {'message': 'Check the submitted details.'})
    except ClientError as error:
        if error.response['Error']['Code'] == 'ConditionalCheckFailedException':
            return response(409, {'message': 'Application changed. Refresh and try again.'})
        return response(503, {'message': 'Service unavailable. Retry with the same application reference.'})
    except BotoCoreError:
        return response(503, {'message': 'Service unavailable. Retry with the same application reference.'})
