#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ACCOUNT_ID="149086500999"
AWS_REGION="us-east-1"
DOMAIN="www.sozorock.com"
STACK_NAME="sozorock-com-github-deploy"
OIDC_PROVIDER_ARN="arn:aws:iam::${EXPECTED_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
TEMPLATE_URL="https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/main/infra/aws/deployment-role.yml"

account_id="$(aws sts get-caller-identity --query Account --output text)"
if [[ "$account_id" != "$EXPECTED_ACCOUNT_ID" ]]; then
  echo "Refusing to continue: signed into AWS account ${account_id}, expected ${EXPECTED_ACCOUNT_ID}." >&2
  exit 1
fi

distributions="$(aws cloudfront list-distributions --output json)"
distribution_id="$(jq -r --arg domain "$DOMAIN" \
  '[.DistributionList.Items[]? | select((.Aliases.Items // []) | index($domain)) | .Id][0] // empty' \
  <<<"$distributions")"

if [[ -z "$distribution_id" ]]; then
  echo "No CloudFront distribution owns ${DOMAIN}." >&2
  exit 1
fi

origin_domain="$(jq -r --arg id "$distribution_id" \
  '[.DistributionList.Items[]? | select(.Id == $id) | .Origins.Items[]? | select(.DomainName | contains(".s3")) | .DomainName][0] // empty' \
  <<<"$distributions")"

if [[ -z "$origin_domain" || "$origin_domain" != *.s3* ]]; then
  echo "The ${DOMAIN} distribution does not expose an S3 origin that can be safely resolved." >&2
  exit 1
fi

bucket_name="${origin_domain%%.s3*}"
aws s3api head-bucket --bucket "$bucket_name" >/dev/null

if ! aws iam get-open-id-connect-provider \
  --open-id-connect-provider-arn "$OIDC_PROVIDER_ARN" >/dev/null 2>&1; then
  aws iam create-open-id-connect-provider \
    --url "https://token.actions.githubusercontent.com" \
    --client-id-list "sts.amazonaws.com" >/dev/null
fi

template_file="$(mktemp)"
trap 'rm -f "$template_file"' EXIT
curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
  "$TEMPLATE_URL" --output "$template_file"

aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --template-file "$template_file" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    S3BucketName="$bucket_name" \
    CloudFrontDistributionId="$distribution_id" \
    GitHubOidcProviderArn="$OIDC_PROVIDER_ARN" \
  --no-fail-on-empty-changeset

role_arn="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query 'Stacks[0].Outputs[?OutputKey==`DeployRoleArn`].OutputValue' \
  --output text)"

echo "AWS deployment bridge is ready."
echo "AWS_DEPLOY_ROLE_ARN=${role_arn}"
echo "AWS_S3_BUCKET=${bucket_name}"
echo "AWS_CLOUDFRONT_DISTRIBUTION_ID=${distribution_id}"
