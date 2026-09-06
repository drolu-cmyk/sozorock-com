#!/usr/bin/env bash
# Connect administrator sign-in only. Public intake stays disabled.
set -euo pipefail
EXPECTED_ACCOUNT_ID="791860731989"
SERVICE_REGION="us-east-1"
DISTRIBUTION_ID="E2YV5089958YRU"
STACK_NAME="sozorock-us-applications"
for command_name in aws curl jq cmp; do
  command -v "$command_name" >/dev/null || { echo "Missing command: $command_name" >&2; exit 1; }
done
account_id="$(aws sts get-caller-identity --query Account --output text --no-cli-pager)"
[[ "$account_id" == "$EXPECTED_ACCOUNT_ID" ]] || { echo "Use hosting account $EXPECTED_ACCOUNT_ID, not $account_id." >&2; exit 1; }
work_dir="$(mktemp -d /tmp/sozorock-admin.XXXXXX)"
aws cloudfront get-distribution --id "$DISTRIBUTION_ID" --output json --no-cli-pager > "$work_dir/distribution.json"
jq -e '
  .Distribution.DomainName == "d14v3l4z5ufdrh.cloudfront.net"
  and .Distribution.DistributionConfig.Enabled == true
  and ((.Distribution.DistributionConfig.Aliases.Items | sort) == ["sozorock.com", "www.sozorock.com"])
' "$work_dir/distribution.json" >/dev/null || { echo "Unexpected production distribution." >&2; exit 1; }
origin_id="$(jq -r '.Distribution.DistributionConfig.DefaultCacheBehavior.TargetOriginId' "$work_dir/distribution.json")"
origin_domain="$(jq -r --arg id "$origin_id" '.Distribution.DistributionConfig.Origins.Items[] | select(.Id == $id) | .DomainName' "$work_dir/distribution.json")"
origin_path="$(jq -r --arg id "$origin_id" '.Distribution.DistributionConfig.Origins.Items[] | select(.Id == $id) | (.OriginPath // "")' "$work_dir/distribution.json")"
[[ "$origin_domain" == *.s3.amazonaws.com || "$origin_domain" == *.s3.us-east-1.amazonaws.com || "$origin_domain" == *.s3-us-east-1.amazonaws.com ]] || { echo "Expected an existing US S3 origin." >&2; exit 1; }
bucket_name="${origin_domain%%.s3*}"
site_prefix="${origin_path#/}"
[[ -n "$site_prefix" ]] && site_prefix="${site_prefix%/}/"
location="$(aws s3api get-bucket-location --bucket "$bucket_name" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" --query LocationConstraint --output text --no-cli-pager)"
[[ "$location" == "None" || "$location" == "us-east-1" ]] || { echo "Expected US East (N. Virginia) storage." >&2; exit 1; }
aws s3api head-object --bucket "$bucket_name" --key "${site_prefix}index.html" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" --no-cli-pager >/dev/null
aws cloudformation describe-stacks --region "$SERVICE_REGION" --stack-name "$STACK_NAME" --output json --no-cli-pager > "$work_dir/stack.json"
jq -e '.Stacks[0] | (.StackStatus == "CREATE_COMPLETE" or .StackStatus == "UPDATE_COMPLETE") and any(.Parameters[]; .ParameterKey == "IntakeEnabled" and .ParameterValue == "false")' "$work_dir/stack.json" >/dev/null || { echo 'Expected healthy stack with intake disabled.' >&2; exit 1; }
output_value() { jq -er --arg key "$1" '.Stacks[0].Outputs[] | select(.OutputKey == $key) | .OutputValue' "$work_dir/stack.json"; }
endpoint="$(output_value ApiEndpoint)"
pool="$(output_value UserPoolId)"
client="$(output_value AdminClientId)"
login="$(output_value AdminLoginOrigin)"
[[ "$endpoint" =~ ^https://[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com$ ]]
[[ "$pool" =~ ^us-east-1_[a-zA-Z0-9]+$ && "$client" =~ ^[a-z0-9]+$ ]]
[[ "$login" == 'https://sozorock-us-admin-791860731989.auth.us-east-1.amazoncognito.com' ]]
aws cognito-idp get-user-pool-mfa-config --region "$SERVICE_REGION" --user-pool-id "$pool" --no-cli-pager > "$work_dir/mfa.json"
jq -e '.MfaConfiguration == "ON" and .SoftwareTokenMfaConfiguration.Enabled == true' "$work_dir/mfa.json" >/dev/null
aws cognito-idp describe-user-pool-client --region "$SERVICE_REGION" --user-pool-id "$pool" --client-id "$client" --no-cli-pager > "$work_dir/client.json"
jq -e '.UserPoolClient | (.CallbackURLs | index("https://www.sozorock.com/admin.html") != null) and (.LogoutURLs | index("https://www.sozorock.com/") != null) and (.AllowedOAuthFlows | index("code") != null) and (has("ClientSecret") | not)' "$work_dir/client.json" >/dev/null
status="$(curl --proto '=https' --tlsv1.2 --silent --show-error --max-time 20 --output "$work_dir/probe.json" --write-out '%{http_code}' "${endpoint}/admin/applications")"
[[ "$status" == '401' || "$status" == '403' ]] || { echo 'Unauthenticated admin access was not denied. Stopping.' >&2; exit 1; }
config_key="${site_prefix}applications-config.js"
aws s3api get-object --bucket "$bucket_name" --key "$config_key" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" "$work_dir/previous-config.js" --no-cli-pager > "$work_dir/previous-config.json"
jq -nr --arg endpoint "$endpoint" --arg pool "$pool" --arg client "$client" --arg login "$login" '
  "window.SOZOROCK_APPLICATIONS = Object.freeze(" + ({enabled:false,apiEndpoint:$endpoint,userPoolId:$pool,adminClientId:$client,adminLoginOrigin:$login}|tojson) + ");"' > "$work_dir/applications-config.js"
restore_on_failure() {
  local result=$?
  trap - EXIT
  if [[ "$result" != "0" ]]; then
    aws s3api put-object --bucket "$bucket_name" --key "$config_key" --body "$work_dir/previous-config.js" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" --content-type 'application/javascript; charset=utf-8' --cache-control 'no-cache,no-store,must-revalidate' --no-cli-pager >/dev/null
    aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/applications-config.js' --no-cli-pager >/dev/null
    echo "Activation failed. Previous public configuration restored; service remains available for diagnosis." >&2
  fi
  exit "$result"
}
trap restore_on_failure EXIT
aws s3api put-object --bucket "$bucket_name" --key "$config_key" --body "$work_dir/applications-config.js" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" --content-type 'application/javascript; charset=utf-8' --cache-control 'no-cache,no-store,must-revalidate' --no-cli-pager >/dev/null
invalidation_id="$(aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/applications-config.js' --query Invalidation.Id --output text --no-cli-pager)"
aws cloudfront wait invalidation-completed --distribution-id "$DISTRIBUTION_ID" --id "$invalidation_id" --no-cli-pager
curl --proto '=https' --tlsv1.2 --fail --silent --show-error --max-time 20 'https://www.sozorock.com/applications-config.js' --output "$work_dir/live-config.js"
cmp "$work_dir/applications-config.js" "$work_dir/live-config.js"
trap - EXIT
printf 'US administrator connection verified. Public intake remains disabled.\n'
printf 'Open https://www.sozorock.com/admin.html and complete password change and authenticator setup.\n'
printf 'Previous configuration and checks: %s\n' "$work_dir"
