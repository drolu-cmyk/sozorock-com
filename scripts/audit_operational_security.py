#!/usr/bin/env python3
"""Read-only, redacted operational checks. Never resets an account or sends mail."""
import argparse
import hashlib
import json
import subprocess
import time
from pathlib import Path

TARGETS = {
    'canada': {'account': '891377012881', 'region': 'ca-central-1',
               'bucket': 'sozorock-ca-public-site-891377012881', 'distribution': 'EJWZP8OBAELWO',
               'stack': 'sozorock-ca-engagement', 'role': 'SozoRockCanadaPublicSiteDeploy'},
    'us': {'account': '791860731989', 'region': 'us-east-1',
           'bucket': 'sozorock-meridian-site', 'distribution': 'E2YV5089958YRU',
           'role': 'sozorock-com-github-deploy'},
}


def aws(region, *args):
    result = subprocess.run(['aws', *args, '--region', region, '--output', 'json'],
                            capture_output=True, text=True, timeout=45)
    if result.returncode:
        # Service errors can contain account identifiers or request details.
        raise RuntimeError('permission_denied' if 'AccessDenied' in result.stderr or
                           'not authorized' in result.stderr else 'service_check_failed')
    return json.loads(result.stdout)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--target', choices=TARGETS, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    target = TARGETS[args.target]
    region = target['region']
    if aws(region, 'sts', 'get-caller-identity')['Account'] != target['account']:
        raise SystemExit('Wrong AWS account; no checks performed.')
    checks = {}

    def check(name, operation):
        try:
            checks[name] = {'status': 'observed', 'result': operation()}
        except (RuntimeError, KeyError, ValueError, subprocess.TimeoutExpired) as error:
            checks[name] = {'status': 'unverified', 'reason': str(error) if isinstance(error, RuntimeError)
                            else type(error).__name__}

    def bucket_boundary():
        block = aws(region, 's3api', 'get-public-access-block', '--bucket', target['bucket'])['PublicAccessBlockConfiguration']
        policy = aws(region, 's3api', 'get-bucket-policy-status', '--bucket', target['bucket'])['PolicyStatus']
        return {'allPublicAccessBlocksEnabled': all(block.get(key) is True for key in
                ('BlockPublicAcls', 'IgnorePublicAcls', 'BlockPublicPolicy', 'RestrictPublicBuckets')),
                'bucketPolicyIsPublic': policy['IsPublic']}

    def distribution():
        config = aws(region, 'cloudfront', 'get-distribution-config', '--id', target['distribution'])['DistributionConfig']
        return {'enabled': config['Enabled'], 'httpsRedirect': config['DefaultCacheBehavior']['ViewerProtocolPolicy'] == 'redirect-to-https',
                'privateOriginControl': all(bool(origin.get('OriginAccessControlId') or
                    origin.get('S3OriginConfig', {}).get('OriginAccessIdentity')) for origin in config['Origins']['Items']),
                'legacyAccessLoggingEnabled': config.get('Logging', {}).get('Enabled', False),
                'wafAssociated': bool(config.get('WebACLId'))}

    check('bucketBoundary', bucket_boundary)
    check('originAccessLogging', lambda: {'enabled': bool(aws(region, 's3api', 'get-bucket-logging', '--bucket', target['bucket']).get('LoggingEnabled'))})
    check('distribution', distribution)
    if args.target == 'canada':
        def declared_permissions():
            policy = aws(region, 'iam', 'get-role-policy', '--role-name', target['role'],
                         '--policy-name', 'SozoRockCanadaPublicSiteDeployment')['PolicyDocument']
            actions = [action for statement in policy.get('Statement', []) if statement.get('Effect') == 'Allow'
                       for action in (statement.get('Action') if isinstance(statement.get('Action'), list) else [statement.get('Action')])]
            return {'declaredDescribeTimeToLive': 'dynamodb:DescribeTimeToLive' in actions or 'dynamodb:*' in actions,
                    'declaredUpdateTimeToLive': 'dynamodb:UpdateTimeToLive' in actions or 'dynamodb:*' in actions,
                    'effectivePermissionsNotSimulated': True}
        check('deploymentPolicy', declared_permissions)

    if args.target == 'canada':
        outputs = {entry['OutputKey']: entry['OutputValue'] for entry in
                   aws(region, 'cloudformation', 'describe-stacks', '--stack-name', target['stack'])['Stacks'][0]['Outputs']}

        def identity():
            pool = aws(region, 'cognito-idp', 'describe-user-pool', '--user-pool-id', outputs['AdminUserPoolId'])['UserPool']
            user = aws(region, 'cognito-idp', 'admin-get-user', '--user-pool-id', outputs['AdminUserPoolId'], '--username', outputs['AdminEmail'])
            attributes = {entry['Name']: entry['Value'] for entry in user.get('UserAttributes', [])}
            return {'mfaRequired': pool.get('MfaConfiguration') == 'ON',
                    'verifiedEmailRecoveryConfigured': any(item.get('Name') == 'verified_email' for item in pool.get('AccountRecoverySetting', {}).get('RecoveryMechanisms', [])),
                    'staffEnabled': user.get('Enabled'), 'staffConfirmed': user.get('UserStatus') == 'CONFIRMED',
                    'staffEmailVerified': attributes.get('email_verified') == 'true',
                    'staffSoftwareMfaEnrolled': 'SOFTWARE_TOKEN_MFA' in user.get('UserMFASettingList', []),
                    'passwordResetPerformed': False}

        def notifications():
            resources = aws(region, 'cloudformation', 'list-stack-resources', '--stack-name', target['stack'])['StackResourceSummaries']
            topic = next(item['PhysicalResourceId'] for item in resources if item['LogicalResourceId'] == 'NotificationTopic')
            subscriptions = aws(region, 'sns', 'list-subscriptions-by-topic', '--topic-arn', topic)['Subscriptions']
            return {'emailSubscriptions': sum(s['Protocol'] == 'email' for s in subscriptions),
                    'confirmedEmailSubscriptions': sum(s['Protocol'] == 'email' and s['SubscriptionArn'].startswith('arn:') for s in subscriptions),
                    'pendingEmailSubscriptions': sum(s['Protocol'] == 'email' and not s['SubscriptionArn'].startswith('arn:') for s in subscriptions),
                    'deliveryTestPerformed': False}

        check('staffRecoveryConfiguration', identity)
        check('notificationSubscriptions', notifications)
        check('guardRowExpiry', lambda: {'ttl': aws(region, 'dynamodb', 'describe-time-to-live', '--table-name', 'sozorock-ca-engagement-submissions')['TimeToLiveDescription']})
    else:
        def acceptance():
            # Only the existing non-personal acceptance record is retrieved, never submissions.
            temporary = args.output.parent / 'acceptance-readback.json'
            aws(region, 's3api', 'get-object', '--bucket', target['bucket'], '--key',
                'deployment-backups/sozorock-com/operational-acceptance.json', str(temporary))
            record = json.loads(temporary.read_text())
            temporary.unlink()
            result = {'current': record.get('expiresAt', 0) > time.time(), 'expiresAt': record.get('expiresAt'),
                      'applicationsVerified': record.get('applications') is True,
                      'staffReadbackVerified': record.get('administratorReadback') is True,
                      'contactVerified': record.get('contact') is True}
            for name in ('applications-config.js', 'engagement-config.js'):
                aws(region, 's3api', 'get-object', '--bucket', target['bucket'], '--key', 'meridian/' + name, str(temporary))
                result[name + 'MatchesAcceptedHash'] = hashlib.sha256(temporary.read_bytes()).hexdigest() == record.get('configSha256', {}).get(name)
                temporary.unlink()
            return result
        check('operationalAcceptance', acceptance)

    report = {'target': args.target, 'checkedAt': int(time.time()), 'readOnly': True,
              'mailboxDeliveryTestPerformed': False, 'checks': checks}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
