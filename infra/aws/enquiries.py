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


def rate_limit(event):
    address = event.get('requestContext', {}).get('http', {}).get('sourceIp')
    if not address:
        return True  # Direct IAM-invoked acceptance tests have no client address.
    now = int(time.time())
    key = 'rate#' + hashlib.sha256((address + ':' + str(now // 600)).encode()).hexdigest()
    try:
        TABLE.update_item(Key={'id': key},
            UpdateExpression='SET expiresAt = :expires ADD attempts :one',
            ConditionExpression='attribute_not_exists(attempts) OR attempts < :limit',
            ExpressionAttributeValues={':expires': now + 1200, ':one': 1, ':limit': 20})
        return True
    except ClientError as error:
        if error.response['Error']['Code'] != 'ConditionalCheckFailedException':
            raise
        return False


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
    fields = [data.get(key, '') for key in ('name', 'email', 'message', 'intent', 'requestId', 'organization', 'context')]
    if not all(isinstance(value, str) for value in fields):
        return response(400, {'message': 'Check your name, email and message, then try again.'})
    name, email, message, intent, request_id, organization, context = [value.strip() for value in fields]
    context = context or 'school'
    valid = (
        2 <= len(name) <= 100 and len(email) <= 254
        and re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', email)
        and 20 <= len(message) <= 3000 and intent in INTENTS
        and len(organization) <= 200 and context in {'school', 'corporate'}
        and re.fullmatch(r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}', request_id)
    )
    if not valid:
        return response(400, {'message': 'Check your name, email and message, then try again.'})
    digest_fields = [name, email, message, intent]
    if organization or context != 'school':
        digest_fields += [organization, context]
    digest = hashlib.sha256(json.dumps(digest_fields).encode()).hexdigest()
    now = int(time.time())
    item = {
        'id': request_id, 'name': name, 'email': email, 'message': message,
        'intent': intent, 'organization': organization, 'context': context,
        'digest': digest, 'createdAt': now, 'expiresAt': now + 30 * 86400,
    }
    try:
        if not rate_limit(event):
            result = response(429, {'message': 'Too many enquiries. Please try again in 10 minutes.'})
            result['headers']['Retry-After'] = '600'
            return result
        try:
            TABLE.put_item(Item=item, ConditionExpression='attribute_not_exists(id)')
        except ClientError as error:
            if error.response['Error']['Code'] != 'ConditionalCheckFailedException':
                raise
            existing = TABLE.get_item(Key={'id': request_id}, ConsistentRead=True).get('Item', {})
            if existing.get('digest') != digest or existing.get('expiresAt', 0) <= now:
                return response(409, {'message': 'This reference was used with different details. Reload the page before sending another enquiry.'})
    except (ClientError, BotoCoreError):
        return response(503, {'message': 'We could not confirm receipt. Please try again with the same details.'})
    return response(200, {'id': request_id, 'message': 'Your enquiry was received.'})
