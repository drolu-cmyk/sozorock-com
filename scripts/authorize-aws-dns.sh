#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ACCOUNT_ID="149086500999"
HOSTING_ACCOUNT_ID="791860731989"
AWS_REGION="us-east-1"
HOSTED_ZONE_ID="Z0336115123Y50GO08GTI"
STACK_NAME="sozorock-com-dns-automation"
EXTERNAL_ID="sozorock-com-production-dns-2026"
SOURCE_REF="${SOZOROCK_RELEASE_REF:-main}"
TEMPLATE_URL="https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/${SOURCE_REF}/infra/aws/dns-automation-role.yml"

for command_name in aws curl jq; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is unavailable: ${command_name}" >&2
    exit 1
  fi
done

account_id="$(aws sts get-caller-identity --query Account --output text --no-cli-pager)"
if [[ "$account_id" != "$EXPECTED_ACCOUNT_ID" ]]; then
  echo "Refusing to continue: signed into AWS account ${account_id}, expected DNS account ${EXPECTED_ACCOUNT_ID}." >&2
  exit 1
fi

zone_name="$(aws route53 get-hosted-zone \
  --id "$HOSTED_ZONE_ID" \
  --query 'HostedZone.Name' \
  --output text \
  --no-cli-pager)"
if [[ "$zone_name" != "sozorock.com." ]]; then
  echo "Refusing to continue: hosted zone ${HOSTED_ZONE_ID} is ${zone_name}, not sozorock.com." >&2
  exit 1
fi

template_file="$(mktemp /tmp/sozorock-dns-role.XXXXXX.yml)"
cleanup() {
  if [[ -f "$template_file" ]]; then
    rm -f -- "$template_file"
  fi
}
trap cleanup EXIT

curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
  "$TEMPLATE_URL" \
  --output "$template_file"

aws cloudformation validate-template \
  --region "$AWS_REGION" \
  --template-body "file://${template_file}" \
  --no-cli-pager >/dev/null

aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --template-file "$template_file" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    HostingAccountId="$HOSTING_ACCOUNT_ID" \
    HostedZoneId="$HOSTED_ZONE_ID" \
    ExternalId="$EXTERNAL_ID" \
  --no-fail-on-empty-changeset \
  --no-cli-pager

role_arn="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query 'Stacks[0].Outputs[?OutputKey==`DnsAutomationRoleArn`].OutputValue' \
  --output text \
  --no-cli-pager)"

jq -n \
  --arg status "ready" \
  --arg dns_account_id "$account_id" \
  --arg hosting_account_id "$HOSTING_ACCOUNT_ID" \
  --arg hosted_zone_id "$HOSTED_ZONE_ID" \
  --arg role_arn "$role_arn" \
  '{
    status: $status,
    dns_account_id: $dns_account_id,
    hosting_account_id: $hosting_account_id,
    hosted_zone_id: $hosted_zone_id,
    dns_automation_role_arn: $role_arn
  }'
