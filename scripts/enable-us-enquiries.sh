#!/usr/bin/env bash
# Run in AWS CloudShell in the US hosting account. Existing S3/DNS/CF stay in place.
set -euo pipefail
EXPECTED_ACCOUNT_ID="791860731989"
SERVICE_REGION="us-east-1"
DISTRIBUTION_ID="E2YV5089958YRU"
STACK_NAME="sozorock-school-enquiries"
for command_name in aws curl jq cmp; do
  command -v "$command_name" >/dev/null || { echo "Missing command: $command_name" >&2; exit 1; }
done
account_id="$(aws sts get-caller-identity --query Account --output text --no-cli-pager)"
[[ "$account_id" == "$EXPECTED_ACCOUNT_ID" ]] || { echo "Use hosting account $EXPECTED_ACCOUNT_ID, not $account_id." >&2; exit 1; }
work_dir="$(mktemp -d /tmp/sozorock-enquiries.XXXXXX)"
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
# Use the adjacent reviewed template in a checkout, or fetch the requested release.
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
template_path="$work_dir/school-platform.json"
python3 "$script_dir/build-enquiries-template.py" > "$template_path"
# Reject accidental expansion into storage, CDN, DNS, or unrelated service resources.
jq -e '
  [.Resources[].Type] | all(. == "AWS::DynamoDB::Table" or . == "AWS::IAM::Role" or . == "AWS::Logs::LogGroup" or . == "AWS::Lambda::Function" or . == "AWS::Lambda::Permission" or . == "AWS::ApiGatewayV2::Api" or . == "AWS::ApiGatewayV2::Integration" or . == "AWS::ApiGatewayV2::Route" or . == "AWS::ApiGatewayV2::Stage")
' "$template_path" >/dev/null
aws cloudformation validate-template --region "$SERVICE_REGION" --template-body "file://${template_path}" --no-cli-pager >/dev/null
aws cloudformation deploy --region "$SERVICE_REGION" --stack-name "$STACK_NAME" --template-file "$template_path" --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --no-cli-pager
aws cloudformation describe-stacks --region "$SERVICE_REGION" --stack-name "$STACK_NAME" --output json --no-cli-pager > "$work_dir/stack.json"
endpoint="$(jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "ApiEndpoint") | .OutputValue' "$work_dir/stack.json")"
[[ "$endpoint" =~ ^https://[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com$ ]] || { echo "Unexpected API endpoint." >&2; exit 1; }
# Verify durable storage, authorized readback, replay and conflict before activation.
table_name="$(jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "EnquiriesTable") | .OutputValue' "$work_dir/stack.json")"
python3 "$script_dir/verify-enquiries.py" --endpoint "$endpoint" --table "$table_name" --output "$work_dir/operational-contact.json"
config_key="${site_prefix}engagement-config.js"
# Back up the prior activation file locally; a failed cache verification restores it.
aws s3api get-object --bucket "$bucket_name" --key "$config_key" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" "$work_dir/previous-config.js" --no-cli-pager > "$work_dir/previous-config.json"
jq -nr --arg endpoint "$endpoint" '"window.SOZOROCK_CONTACT = Object.freeze(" + ({apiEndpoint:$endpoint}|tojson) + ");"' > "$work_dir/engagement-config.js"
restore_on_failure() {
  local result=$?
  trap - EXIT
  if [[ "$result" != "0" ]]; then
    aws s3api put-object --bucket "$bucket_name" --key "$config_key" --body "$work_dir/previous-config.js" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" --content-type 'application/javascript; charset=utf-8' --cache-control 'no-cache,no-store,must-revalidate' --no-cli-pager >/dev/null
    aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/engagement-config.js' --no-cli-pager >/dev/null
    echo "Activation failed. Previous public configuration restored; service remains available for diagnosis." >&2
  fi
  exit "$result"
}
trap restore_on_failure EXIT
aws s3api put-object --bucket "$bucket_name" --key "$config_key" --body "$work_dir/engagement-config.js" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$SERVICE_REGION" --content-type 'application/javascript; charset=utf-8' --cache-control 'no-cache,no-store,must-revalidate' --no-cli-pager >/dev/null
invalidation_id="$(aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/engagement-config.js' --query Invalidation.Id --output text --no-cli-pager)"
aws cloudfront wait invalidation-completed --distribution-id "$DISTRIBUTION_ID" --id "$invalidation_id" --no-cli-pager
curl --proto '=https' --tlsv1.2 --fail --silent --show-error --max-time 20 'https://www.sozorock.com/engagement-config.js' --output "$work_dir/live-config.js"
cmp "$work_dir/engagement-config.js" "$work_dir/live-config.js"
trap - EXIT
printf 'US enquiry service activated. Existing website storage, DNS and CloudFront origin preserved.\n'
jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "EnquiriesTable") | "Review received enquiries in DynamoDB, us-east-1: " + .OutputValue' "$work_dir/stack.json"
printf 'Activation evidence and previous configuration: %s\n' "$work_dir"
