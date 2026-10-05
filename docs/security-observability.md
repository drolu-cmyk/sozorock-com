# Security monitoring activation

Status: source-ready, **not activated by website deployment**. This stack creates private telemetry destinations and threshold alarms; the separate operator command attaches existing sources after checking the country account, region, public CloudFront origin, HTTP API and confirmed SNS destination. It does not reset staff accounts, alter mail routing, enable payments, install Cloudflare or migrate DNS.

Normal AWS charges apply for log ingestion/storage, metrics, alarms, S3 request metrics and the optional IP review Lambda. These are not a free service guarantee. A confirmed subscription proves configuration, not inbox delivery. No test email is sent by this procedure.

## Scope and privacy

HTTP API logs contain only request ID, route template, status, latency, response byte count and source IP, retained for 30 days in private CloudWatch Logs. They exclude request paths containing IDs, query strings, headers, cookies, tokens, bodies, claims and applicant responses. Staff IP checking is optional: reviewed `ExpectedAdminCidrs` enables alerts for `/admin/` requests outside that baseline; an empty baseline disables those alerts. This does not block travel, countries or visitors. Derived Lambda logs retain only the count, not IP addresses, for 30 days.

The separate S3 log destination is encrypted, blocks public access, requires TLS and accepts log writes only from the selected source bucket and same AWS account. Objects expire after 30 days. Raw S3 server access logging is **off unless explicitly requested**. Its fixed AWS format includes request URI and arbitrary query values (AWS redacts the signing signature, not every query parameter). Therefore the script supports it only for the verified public static origin with query forwarding disabled, and requires `--acknowledge-raw-query-log-risk`. Rejected direct-origin requests can still place attacker-controlled queries in logs. Never enable this path for private evidence, authentication callbacks, or a promise of zero query retention. It is not a complete or real-time audit trail.

Optional S3 request metrics use aggregate GetRequests and BytesDownloaded. These observe origin requests, not every CloudFront cache hit or viewer download. API `sourceIp` observes the API connection; it is not a CloudFront viewer-IP monitoring system. No CloudFront log delivery region or Canadian data residency claim is inferred here.

Thresholds are review triggers, not learned anomaly detection. Calibrate them against actual traffic and record the business reason. No baseline means no claim that an IP range is unusual. Existing API stage throttles remain separate from alerting.

## Guarded operator procedure

Use an independently authorized operator in the correct country account and region. Do not expand the website OIDC role to administer all AWS resources. AWS CLI v2 and Python 3 are required.

1. Identify each deployed HTTP API (US applications and enquiries are separate), the public static origin bucket, and an existing same-region SNS topic with confirmed operational recipients. Use one unique stack name per API. Enable bucket metrics or raw access logs through only one of those stacks.
2. Run the script without `--apply` to inspect the plan. Supply approved thresholds in an optional JSON file; supported keys are the numeric parameters in the template.

```bash
python scripts/configure-security-observability.py \
  --source-bucket VERIFIED_PUBLIC_BUCKET \
  --api-id VERIFIED_HTTP_API_ID \
  --stack-name COUNTRY-api-security \
  --alert-topic-arn VERIFIED_CONFIRMED_SNS_TOPIC_ARN \
  --expected-admin-cidrs APPROVED_STAFF_CIDRS
```

3. Add `--apply` only after reviewing the plan, charges and IAM scope. `--enable-s3-metrics` enables aggregate storage metrics. The two raw-log flags are separate and optional. The script preserves prior source settings in a local directory readable only by the operator, refuses replacement of different existing logging and changes no source bucket policy/public permissions. A failure does not imply all previous steps were rolled back.
4. Verify API AccessLogSettings, log arrival, metric arrival, alarm state and controlled alert delivery. Use only a separately authorized alert test. Inspect expiry on the private destination. S3 delivery is best effort and can be delayed. Add the selected AccessLogSettings to the owning API infrastructure before future stage changes; preserve the monitoring attachment in release checks.
5. Roll back source attachments using the private `before.json`: restore `apiAccessLogSettings` with `apigatewayv2 update-stage`, or delete only access-log settings if previously absent; restore `bucketLogging` with `s3api put-bucket-logging`. Remove only the `SozoRockSecurity` metrics configuration if this activation created it. Retained log buckets are not automatically deleted with the stack.

Required operator capabilities include read-only STS, distribution/cache/origin-request policies, S3 location/logging, API stage and SNS subscription checks; scoped CloudFormation creation/update; S3 log destination/policy/lifecycle management; CloudWatch log groups, filters, alarms and API log delivery permissions; API stage update; optional source bucket metrics/logging updates; and, only with reviewed staff CIDRs, Lambda creation plus its scoped log-only execution role and subscription permission. API log delivery can require `logs:CreateLogDelivery`, `GetLogDelivery`, `UpdateLogDelivery`, `DeleteLogDelivery`, `ListLogDeliveries`, `PutResourcePolicy`, `DescribeResourcePolicies`, `DescribeLogGroups`. Missing permissions are an operator gate, not a reason to attach broad administrator policy.

## Canada per-client guard activation

`EnablePublicRateGuards` defaults to `false`. Existing API stage throttles still operate. When enabled, only ephemeral guard rows receive `guardExpiresAt`; applicant records receive no new expiry attribute. Before activation, an operator must permit `dynamodb:DescribeTimeToLive` and `dynamodb:UpdateTimeToLive` **only** on `arn:aws:dynamodb:ca-central-1:891377012881:table/sozorock-ca-engagement-submissions`, and verify TTL uses `guardExpiresAt`. Update the engagement stack with `EnablePublicRateGuards=true`, preserving every other current parameter via `UsePreviousValue`. Check the `PublicRateGuardsEnabled` output and Lambda environment, then verify quota behavior using synthetic requests without applicant data. Do not claim this application rate limit is active while the output remains false. Never apply TTL to applicant records without the separate retention decision.

## Primary references

- [HTTP API logging and delivery permissions](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-logging.html)
- [S3 logging setup and delivery boundaries](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html)
- [S3 server log fields and query strings](https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html)
- [Presigned URL logging and signature redaction](https://docs.aws.amazon.com/prescriptive-guidance/latest/presigned-url-best-practices/logging-interactions.html)
- [S3 request metrics and dimensions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html)
- [CloudWatch log subscription payloads](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html)
