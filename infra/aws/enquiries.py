"""US enquiries: acknowledge only a durable, idempotent DynamoDB receipt."""
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
INTENTS = {'general', 'organization', 'media', 'privacy', 'accessibility'}


def response(status, body):
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json', 'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': ORIGIN, 'Vary': 'Origin',
        },
        'body': json.dumps(body),
    }


def handler(event, context):
    headers = {key.lower(): value for key, value in (event.get('headers') or {}).items()}
    if headers.get('origin') not in (None, ORIGIN):
        return response(403, {'message': 'Origin not allowed.'})
    try:
        raw = event.get('body') or ''
        if not isinstance(raw, str):
            raise ValueError()
        if len(raw) > 22000:
            return response(413, {'message': 'Message is too large.'})
        if event.get('isBase64Encoded'):
            raw = base64.b64decode(raw, validate=True).decode('utf-8')
        if len(raw.encode('utf-8')) > 16000:
            return response(413, {'message': 'Message is too large.'})
        data = json.loads(raw)
        if not isinstance(data, dict):
            raise ValueError()
    except (ValueError, TypeError, UnicodeError, binascii.Error):
        return response(400, {'message': 'Invalid request.'})
    if data.get('website'):
        return response(400, {'message': 'Unable to process this enquiry.'})
    fields = [data.get(key, '') for key in ('name', 'email', 'message', 'intent', 'requestId')]
    if not all(isinstance(value, str) for value in fields):
        return response(400, {'message': 'Check your name, email and message, then try again.'})
    name, email, message, intent, request_id = [value.strip() for value in fields]
    valid = (
        2 <= len(name) <= 100 and len(email) <= 254
        and re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', email)
        and 20 <= len(message) <= 3000 and intent in INTENTS
        and re.fullmatch(r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}', request_id)
    )
    if not valid:
        return response(400, {'message': 'Check your name, email and message, then try again.'})
    digest = hashlib.sha256(json.dumps([name, email, message, intent]).encode()).hexdigest()
    now = int(time.time())
    item = {
        'id': request_id, 'name': name, 'email': email, 'message': message,
        'intent': intent, 'digest': digest, 'createdAt': now, 'expiresAt': now + 30 * 86400,
    }
    try:
        try:
            TABLE.put_item(Item=item, ConditionExpression='attribute_not_exists(id)')
        except ClientError as error:
            if error.response['Error']['Code'] != 'ConditionalCheckFailedException':
                raise
            existing = TABLE.get_item(Key={'id': request_id}, ConsistentRead=True).get('Item', {})
            if existing.get('digest') != digest:
                return response(409, {'message': 'This reference was used with different details. Reload the page before sending another enquiry.'})
    except (ClientError, BotoCoreError):
        return response(503, {'message': 'We could not confirm receipt. Please try again with the same details.'})
    return response(200, {'id': request_id, 'message': 'Your enquiry was received.'})
