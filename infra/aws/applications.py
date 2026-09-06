"""Independent US intake. API Gateway verifies JWT signatures before admin routes."""
import base64
import binascii
import hashlib
import json
import os
import re
import time

import boto3
from botocore.exceptions import BotoCoreError, ClientError

TABLE = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])
ORIGIN = 'https://www.sozorock.com'
PROGRAMMES = {'applied-ai-systems', 'cybersecurity-grc', 'identity-access-management', 'ai-governance'}
UUID = r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'


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


def listing(event):
    if not admin(event):
        return response(403, {'message': 'Administrator access required.'})
    query = event.get('queryStringParameters') or {}
    try:
        limit = int(query.get('limit', '25'))
        if not 1 <= limit <= 100:
            raise ValueError()
        args = {'Limit': limit, 'ConsistentRead': True,
                'FilterExpression': 'expiresAt > :now',
                'ExpressionAttributeValues': {':now': int(time.time())}}
        cursor = query.get('cursor')
        if cursor:
            if not isinstance(cursor, str) or len(cursor) > 200:
                raise ValueError()
            decoded = base64.b64decode(cursor, altchars=b'-_', validate=True).decode()
            if not re.fullmatch(UUID, decoded):
                raise ValueError()
            args['ExclusiveStartKey'] = {'id': decoded}
    except (ValueError, TypeError, UnicodeError, binascii.Error):
        return response(400, {'message': 'Invalid page parameters.'})
    page = TABLE.scan(**args)
    items = [{k: v for k, v in item.items() if k != 'digest'} for item in page.get('Items', [])]
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
        if (data.get('website') or data.get('consent') is not True
                or not re.fullmatch(UUID, request_id) or not 2 <= len(name) <= 100
                or len(email) > 254 or not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', email)
                or programme not in PROGRAMMES or not 20 <= len(motivation) <= 3000):
            raise ValueError()
    except (ValueError, TypeError, UnicodeError, binascii.Error):
        return response(400, {'message': 'Check your application details and consent.'})
    digest = hashlib.sha256(json.dumps([name, email, programme, motivation, True]).encode()).hexdigest()
    now = int(time.time())
    item = {'id': request_id, 'name': name, 'email': email, 'programme': programme,
            'motivation': motivation, 'consent': True, 'consentVersion': 'us-applications-v1',
            'digest': digest, 'createdAt': now, 'expiresAt': now + 90 * 86400, 'status': 'received'}
    try:
        TABLE.put_item(Item=item, ConditionExpression='attribute_not_exists(id)')
    except ClientError as error:
        if error.response['Error']['Code'] != 'ConditionalCheckFailedException':
            raise
        existing = TABLE.get_item(Key={'id': request_id}, ConsistentRead=True).get('Item', {})
        if existing.get('digest') != digest or existing.get('expiresAt', 0) <= now:
            return response(409, {'message': 'Application reference already used. Start a new application.'})
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
        return response(404, {'message': 'Not found.'})
    except (ClientError, BotoCoreError):
        return response(503, {'message': 'Service unavailable. Retry with the same application reference.'})
