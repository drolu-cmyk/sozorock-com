#!/usr/bin/env python3
"""Read-only US CloudShell diagnostics. Does not renew acceptance or change resources."""
import argparse
import hashlib
import json
import re
import time
import urllib.error
import urllib.request

import boto3
from botocore.exceptions import ClientError

ACCOUNT = '791860731989'
REGION = 'us-east-1'
ORIGIN = 'https://www.sozorock.com'
STACK = 'sozorock-us-applications'
BUCKET = 'sozorock-meridian-site'
DISTRIBUTION = 'E2YV5089958YRU'
SYNTHETIC_ID = 'ea2ddd31-b308-4e87-a5b1-9b4b7f6afa8c'


def public_get(path):
    request = urllib.request.Request(ORIGIN + path, headers={'User-Agent': 'SozoRock-US-operations-check/1.0'})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read()


def config_value(content, global_name):
    match = re.search(r'window\.' + re.escape(global_name) + r'\s*=\s*Object\.freeze\((\{.*\})\)', content.decode())
    if not match:
        raise RuntimeError('Unexpected live configuration format; inspect before continuing.')
    return json.loads(match.group(1))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--application-id', default=SYNTHETIC_ID)
    args = parser.parse_args()
    if not re.fullmatch(r'[a-f0-9-]{36}', args.application_id):
        raise RuntimeError('Invalid application reference.')
    session = boto3.Session(region_name=REGION)
    if session.client('sts').get_caller_identity()['Account'] != ACCOUNT:
        raise RuntimeError('Stopped: open CloudShell in US hosting account 791860731989.')
    now = int(time.time())
    report = {'account': ACCOUNT, 'region': REGION, 'checkedAt': now, 'readOnly': True,
              'administratorMfaReadback': 'Requires real staff sign-in; not established by this script.'}
    cf = session.client('cloudformation')
    stack = cf.describe_stacks(StackName=STACK)['Stacks'][0]
    if stack['StackStatus'] not in {'CREATE_COMPLETE', 'UPDATE_COMPLETE'}:
        raise RuntimeError('Application stack is not healthy; inspect it before updating.')
    outputs = {value['OutputKey']: value['OutputValue'] for value in stack.get('Outputs', [])}
    parameters = {value['ParameterKey']: value['ParameterValue'] for value in stack.get('Parameters', [])}
    report['applicationStack'] = {'name': STACK, 'status': stack['StackStatus'],
                                'intakeEnabled': parameters.get('IntakeEnabled') == 'true'}
    api = outputs.get('ApiEndpoint', '')
    if not re.fullmatch(r'https://[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com', api):
        raise RuntimeError('Unexpected US API endpoint; no further checks were made.')
    table_name = outputs.get('ApplicationsTable', '')
    if not table_name or not table_name.startswith(STACK + '-'):
        raise RuntimeError('Unexpected application table; inspect the current stack outputs.')
    pool_id = outputs.get('UserPoolId', '')
    if not pool_id.startswith('us-east-1_'):
        raise RuntimeError('Unexpected administrator pool region.')
    pool = session.client('cognito-idp').describe_user_pool(UserPoolId=pool_id)['UserPool']
    report['administratorPool'] = {'mfaRequired': pool.get('MfaConfiguration') == 'ON',
                                  'authenticatorEnabled': 'SOFTWARE_TOKEN_MFA' in pool.get('EnabledMfas', [])}
    # Reads only the supplied reference. Never lists applicants or prints their fields.
    item = session.resource('dynamodb').Table(table_name).get_item(
        Key={'id': args.application_id}, ConsistentRead=True).get('Item')
    report['applicationReadback'] = {'reference': args.application_id, 'recordExists': bool(item),
        'unexpired': bool(item and int(item.get('expiresAt', 0)) > now),
        'validProgram': bool(item and item.get('programme') in {'applied-ai-systems', 'cybersecurity-grc',
                                                             'identity-access-management', 'ai-governance'})}
    request = urllib.request.Request(api + '/admin/applications?limit=1')
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            report['anonymousAdminStatus'] = response.status
    except urllib.error.HTTPError as error:
        report['anonymousAdminStatus'] = error.code
    config_hashes = {}
    s3 = session.client('s3')
    for filename, global_name in [('applications-config.js', 'SOZOROCK_APPLICATIONS'),
                                  ('engagement-config.js', 'SOZOROCK_CONTACT')]:
        live = public_get('/' + filename)
        stored = s3.get_object(Bucket=BUCKET, Key='meridian/' + filename,
                               ExpectedBucketOwner=ACCOUNT)['Body'].read()
        cfg = config_value(live, global_name)
        config_hashes[filename] = hashlib.sha256(stored).hexdigest()
        report[filename] = {'servedBytesMatchS3': live == stored, 'sha256': config_hashes[filename]}
        if filename == 'applications-config.js':
            report[filename].update(enabled=cfg.get('enabled') is True,
                endpointMatchesStack=cfg.get('apiEndpoint') == api,
                poolMatchesStack=cfg.get('userPoolId') == pool_id,
                clientMatchesStack=cfg.get('adminClientId') == outputs.get('AdminClientId'))
    try:
        acceptance = json.loads(s3.get_object(Bucket=BUCKET,
            Key='deployment-backups/sozorock-com/operational-acceptance.json',
            ExpectedBucketOwner=ACCOUNT)['Body'].read())
        report['releaseAcceptance'] = {'targetMatches': acceptance.get('account') == ACCOUNT and
            acceptance.get('distributionId') == DISTRIBUTION,
            'unexpired': int(acceptance.get('expiresAt', 0)) > now,
            'expiresAt': acceptance.get('expiresAt'),
            'configurationMatches': acceptance.get('configSha256') == config_hashes,
            'renewed': False}
    except ClientError as error:
        if error.response['Error']['Code'] not in {'NoSuchKey', '404'}:
            raise
        report['releaseAcceptance'] = {'exists': False, 'renewed': False}
    distribution = session.client('cloudfront').get_distribution(Id=DISTRIBUTION)['Distribution']
    aliases = distribution['DistributionConfig'].get('Aliases', {}).get('Items', [])
    report['websiteDistribution'] = {'id': DISTRIBUTION, 'status': distribution['Status'],
                                     'aliasesMatchUS': set(aliases) == {'www.sozorock.com', 'sozorock.com'}}
    # Existing SES sender status only; Google Workspace mailboxes are independent.
    try:
        sender = session.client('sesv2').get_email_identity(EmailIdentity='sozorock.com')
        report['sesSender'] = {'verifiedForSending': sender.get('VerifiedForSendingStatus') is True,
                              'dkimStatus': sender.get('DkimAttributes', {}).get('Status')}
    except ClientError as error:
        if error.response['Error']['Code'] in {'NotFoundException', 'AccessDeniedException'}:
            report['sesSender'] = {'inspection': error.response['Error']['Code']}
        else:
            raise
    print(json.dumps(report, indent=2))
    print('READ-ONLY CHECK COMPLETE. No changes, payment activation or acceptance renewal performed.')


if __name__ == '__main__':
    main()
