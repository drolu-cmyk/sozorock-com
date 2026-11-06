#!/usr/bin/env python3
"""Read-only plan by default; explicit operator activation of scoped monitoring."""
import argparse
import ipaddress
import json
import os
from pathlib import Path
import subprocess
import tempfile

ACCOUNT = '791860731989'
REGION = 'us-east-1'
DISTRIBUTION = 'E2YV5089958YRU'
ROOT = Path(__file__).resolve().parents[1]


def aws(*parts):
    result = subprocess.run(['aws', *parts, '--region', REGION, '--output', 'json', '--no-cli-pager'],
                            check=True, capture_output=True, text=True)
    if parts[:2] == ('cloudformation', 'deploy'):
        return {}
    return json.loads(result.stdout) if result.stdout.strip() else {}


def validate_ranges(value):
    return ','.join(str(ipaddress.ip_network(part.strip(), strict=True))
                    for part in value.split(',') if part.strip())


def origin_forwards_no_queries(config):
    behaviors = [config['DefaultCacheBehavior'], *config.get('CacheBehaviors', {}).get('Items', [])]
    for cache in behaviors:
        if 'CachePolicyId' in cache:
            policy = aws('cloudfront', 'get-cache-policy', '--id', cache['CachePolicyId'])['CachePolicy']['CachePolicyConfig']
            if policy['ParametersInCacheKeyAndForwardedToOrigin']['QueryStringsConfig']['QueryStringBehavior'] != 'none':
                return False
        elif cache.get('ForwardedValues', {}).get('QueryString') is not False:
            return False
        if cache.get('OriginRequestPolicyId'):
            policy = aws('cloudfront', 'get-origin-request-policy', '--id', cache['OriginRequestPolicyId'])['OriginRequestPolicy']['OriginRequestPolicyConfig']
            if policy['QueryStringsConfig']['QueryStringBehavior'] != 'none':
                return False
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-bucket', required=True)
    parser.add_argument('--api-id', required=True)
    parser.add_argument('--stack-name', required=True)
    parser.add_argument('--alert-topic-arn', required=True)
    parser.add_argument('--expected-admin-cidrs', default='')
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--enable-s3-metrics', action='store_true')
    parser.add_argument('--enable-public-s3-access-logs', action='store_true')
    parser.add_argument('--acknowledge-raw-query-log-risk', action='store_true')
    parser.add_argument('--thresholds-json', type=Path, help='Reviewed CloudFormation numeric threshold parameter overrides')
    args = parser.parse_args()
    ranges = validate_ranges(args.expected_admin_cidrs)
    if aws('sts', 'get-caller-identity')['Account'] != ACCOUNT:
        raise SystemExit('Wrong country account; no changes made.')
    if not args.alert_topic_arn.startswith(f'arn:aws:sns:{REGION}:{ACCOUNT}:'):
        raise SystemExit('A same-account, same-region confirmed alert topic is required.')
    subscriptions = aws('sns', 'list-subscriptions-by-topic', '--topic-arn', args.alert_topic_arn)
    if not any(s.get('SubscriptionArn', '').startswith('arn:') for s in subscriptions.get('Subscriptions', [])):
        raise SystemExit('Alert delivery has no confirmed subscription; no changes made.')
    aws('s3api', 'head-bucket', '--bucket', args.source_bucket, '--expected-bucket-owner', ACCOUNT)
    location = aws('s3api', 'get-bucket-location', '--bucket', args.source_bucket, '--expected-bucket-owner', ACCOUNT).get('LocationConstraint') or 'us-east-1'
    if location != REGION:
        raise SystemExit('Source and logging destinations must remain in the country region.')
    config = aws('cloudfront', 'get-distribution-config', '--id', DISTRIBUTION)['DistributionConfig']
    origin = next(o for o in config['Origins']['Items'] if o['Id'] == config['DefaultCacheBehavior']['TargetOriginId'])
    if not origin['DomainName'].startswith(args.source_bucket + '.s3'):
        raise SystemExit('Only the verified public static origin bucket is supported. Private evidence is excluded.')
    if aws('apigatewayv2', 'get-api', '--api-id', args.api_id)['ProtocolType'] != 'HTTP':
        raise SystemExit('This procedure supports existing HTTP APIs only.')
    stage = aws('apigatewayv2', 'get-stage', '--api-id', args.api_id, '--stage-name', '$default')
    logging = aws('s3api', 'get-bucket-logging', '--bucket', args.source_bucket, '--expected-bucket-owner', ACCOUNT)
    metrics = None
    if args.enable_s3_metrics:
        try:
            metrics = aws('s3api', 'get-bucket-metrics-configuration', '--bucket', args.source_bucket,
                          '--expected-bucket-owner', ACCOUNT, '--id', 'SozoRockSecurity').get('MetricsConfiguration')
        except subprocess.CalledProcessError as error:
            if 'NoSuchConfiguration' not in (error.stderr or ''):
                raise
        if metrics and metrics != {'Id': 'SozoRockSecurity'}:
            raise SystemExit('Existing metric filter differs; review it before replacement.')
    if args.enable_public_s3_access_logs:
        if not args.acknowledge_raw_query_log_risk or not origin_forwards_no_queries(config):
            raise SystemExit('Raw S3 access logs require explicit query-risk acknowledgement and a no-query CloudFront origin policy.')
    template = json.loads((ROOT / 'infra/security-observability.template.json').read_text())
    params = {'SourceBucketName': args.source_bucket, 'ApiId': args.api_id,
              'AlertTopicArn': args.alert_topic_arn, 'ExpectedAdminCidrs': ranges,
              'EnableStorageMetrics': str(args.enable_s3_metrics).lower()}
    if args.thresholds_json:
        thresholds = json.loads(args.thresholds_json.read_text())
        for key, value in thresholds.items():
            if key not in template['Parameters'] or template['Parameters'][key]['Type'] != 'Number' or type(value) is not int or value < 1:
                raise SystemExit('Threshold overrides must be positive reviewed integer threshold parameters.')
            params[key] = str(value)
    print(json.dumps({'account': ACCOUNT, 'region': REGION, 'apply': args.apply,
                      'api_metadata_only': True, 'admin_ip_baseline_configured': bool(ranges),
                      'storage_metrics': args.enable_s3_metrics, 'raw_public_s3_logs': args.enable_public_s3_access_logs,
                      'normal_aws_logging_metrics_alarm_and_lambda_charges_apply': True}))
    if not args.apply:
        return
    state = Path(tempfile.mkdtemp(prefix='sozorock-monitoring-'))
    os.chmod(state, 0o700)
    backup = state / 'before.json'
    backup.write_text(json.dumps({'apiId': args.api_id, 'sourceBucket': args.source_bucket,
                                 'apiAccessLogSettings': stage.get('AccessLogSettings'), 'bucketLogging': logging, 'bucketMetrics': metrics}, indent=2))
    os.chmod(backup, 0o600)
    print('Private rollback configuration: ' + str(backup))
    aws('cloudformation', 'deploy', '--stack-name', args.stack_name,
        '--template-file', str(ROOT / 'infra/security-observability.template.json'),
        '--capabilities', 'CAPABILITY_IAM', '--no-fail-on-empty-changeset',
        '--parameter-overrides', *[key + '=' + str(value) for key, value in params.items()])
    output = aws('cloudformation', 'describe-stacks', '--stack-name', args.stack_name)['Stacks'][0]['Outputs']
    values = {v['OutputKey']: v['OutputValue'] for v in output}
    log_settings = {'DestinationArn': values['ApiAccessLogArn'], 'Format': values['ApiAccessLogFormat']}
    if stage.get('AccessLogSettings') and stage['AccessLogSettings'] != log_settings:
        raise SystemExit('Existing API logging differs; review preserved settings before replacing it.')
    aws('apigatewayv2', 'update-stage', '--api-id', args.api_id, '--stage-name', '$default',
        '--access-log-settings', json.dumps(log_settings))
    if args.enable_s3_metrics:
        aws('s3api', 'put-bucket-metrics-configuration', '--bucket', args.source_bucket,
            '--expected-bucket-owner', ACCOUNT, '--id', 'SozoRockSecurity',
            '--metrics-configuration', json.dumps({'Id': 'SozoRockSecurity'}))
    if args.enable_public_s3_access_logs:
        target = {'LoggingEnabled': {'TargetBucket': values['PrivateAccessLogsBucket'], 'TargetPrefix': 's3-access/'}}
        if logging.get('LoggingEnabled') and logging != target:
            raise SystemExit('Existing bucket logging differs; review it before replacing it.')
        aws('s3api', 'put-bucket-logging', '--bucket', args.source_bucket,
            '--expected-bucket-owner', ACCOUNT, '--bucket-logging-status', json.dumps(target))
    actual = aws('apigatewayv2', 'get-stage', '--api-id', args.api_id, '--stage-name', '$default')
    if actual.get('AccessLogSettings') != log_settings:
        raise SystemExit('API logging readback failed; inspect preserved rollback configuration.')
    print('Configuration applied and API settings verified. Verify real log arrival and alarm delivery separately; no test notification was sent.')


if __name__ == '__main__':
    main()
