#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ACCOUNT_ID="791860731989"
DNS_ACCOUNT_ID="149086500999"
AWS_REGION="us-east-1"
APEX_DOMAIN="sozorock.com"
WWW_DOMAIN="www.sozorock.com"
HOSTED_ZONE_ID="Z0336115123Y50GO08GTI"
DNS_ROLE_ARN="arn:aws:iam::${DNS_ACCOUNT_ID}:role/sozorock-com-dns-automation"
DNS_EXTERNAL_ID="sozorock-com-production-dns-2026"
DISTRIBUTION_ID="E2YV5089958YRU"
EXPECTED_DISTRIBUTION_DOMAIN="d14v3l4z5ufdrh.cloudfront.net"
BACKUP_ROOT="deployment-backups/sozorock-com/"
DEPLOY_STACK_NAME="sozorock-com-github-deploy"
DNS_BRIDGE_STACK_NAME="sozorock-com-dns-bridge"
OIDC_PROVIDER_ARN="arn:aws:iam::${EXPECTED_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
REDIRECT_FUNCTION_NAME="sozorock-com-apex-redirect"
SOURCE_REF="${SOZOROCK_RELEASE_REF:-main}"
SOURCE_ARCHIVE_URL="https://github.com/drolu-cmyk/sozorock-com/archive/${SOURCE_REF}.tar.gz"
REPORT_PATH="/tmp/sozorock-production-deployment.json"

for command_name in aws curl jq node npm tar; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is unavailable: ${command_name}" >&2
    exit 1
  fi
done

account_id="$(aws sts get-caller-identity --query Account --output text --no-cli-pager)"
if [[ "$account_id" != "$EXPECTED_ACCOUNT_ID" ]]; then
  echo "Refusing to continue: signed into AWS account ${account_id}, expected hosting account ${EXPECTED_ACCOUNT_ID}." >&2
  exit 1
fi

work_dir="$(mktemp -d /tmp/sozorock-production.XXXXXX)"
source_dir="$work_dir/source"
mkdir -p "$source_dir"

distribution_file="$work_dir/distribution.json"
aws cloudfront get-distribution \
  --id "$DISTRIBUTION_ID" \
  --output json \
  --no-cli-pager > "$distribution_file"

distribution_domain="$(jq -r '.Distribution.DomainName // empty' "$distribution_file")"
distribution_enabled="$(jq -r '.Distribution.DistributionConfig.Enabled // false' "$distribution_file")"
www_alias_present="$(jq -r --arg www "$WWW_DOMAIN" '((.Distribution.DistributionConfig.Aliases.Items // []) | index($www)) != null' "$distribution_file")"
target_origin_id="$(jq -r '.Distribution.DistributionConfig.DefaultCacheBehavior.TargetOriginId // empty' "$distribution_file")"
origin_domain="$(jq -r --arg id "$target_origin_id" '[.Distribution.DistributionConfig.Origins.Items[]? | select(.Id == $id)][0].DomainName // empty' "$distribution_file")"
origin_path="$(jq -r --arg id "$target_origin_id" '[.Distribution.DistributionConfig.Origins.Items[]? | select(.Id == $id)][0].OriginPath // ""' "$distribution_file")"
bucket_name="${origin_domain%%.s3*}"

if [[ "$distribution_domain" != "$EXPECTED_DISTRIBUTION_DOMAIN" || "$distribution_enabled" != "true" ]]; then
  echo "Refusing to deploy: distribution ${DISTRIBUTION_ID} does not match the enabled SozoRock production target." >&2
  exit 1
fi
if [[ "$www_alias_present" != "true" ]]; then
  echo "Refusing to deploy: ${DISTRIBUTION_ID} does not own ${WWW_DOMAIN}." >&2
  exit 1
fi
[[ "$origin_domain" == *.s3*.amazonaws.com ]] || exit 1
SITE_PREFIX="${origin_path#/}"
if [[ -z "$SITE_PREFIX" ]]; then
  echo "Refusing a root origin: the release backup must be outside the website prefix." >&2
  exit 1
fi
SITE_PREFIX="${SITE_PREFIX%/}/"
[[ "$SITE_PREFIX" != "$BACKUP_ROOT"* && "$BACKUP_ROOT" != "$SITE_PREFIX"* ]]
aws s3api head-bucket --bucket "$bucket_name" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$AWS_REGION" --no-cli-pager >/dev/null
bucket_location="$(aws s3api get-bucket-location --bucket "$bucket_name" --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$AWS_REGION" --query LocationConstraint --output text --no-cli-pager)"
if [[ "$bucket_location" != "None" && "$bucket_location" != "us-east-1" ]]; then
  echo "Refusing to deploy: the existing S3 origin is outside us-east-1." >&2
  exit 1
fi
aws s3api head-object \
  --bucket "$bucket_name" \
  --key "${SITE_PREFIX}index.html" \
  --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" \
  --region "$AWS_REGION" \
  --no-cli-pager >/dev/null

node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
if (( node_major < 20 )); then
  echo "Node.js 20 or newer is required; CloudShell currently has $(node --version)." >&2
  exit 1
fi

curl --proto '=https' --tlsv1.2 --fail --location --silent --show-error \
  "$SOURCE_ARCHIVE_URL" \
  --output "$work_dir/source.tar.gz"
tar -xzf "$work_dir/source.tar.gz" -C "$source_dir" --strip-components=1

(
  cd "$source_dir"
  npm ci --no-audit --no-fund
  npm run build
  npm run test:sites
)

aws cloudformation validate-template \
  --region "$AWS_REGION" \
  --template-body "file://${source_dir}/infra/aws/dns-bridge.yml" \
  --no-cli-pager >/dev/null

aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$DNS_BRIDGE_STACK_NAME" \
  --template-file "$source_dir/infra/aws/dns-bridge.yml" \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    DnsRoleArn="$DNS_ROLE_ARN" \
    DnsExternalId="$DNS_EXTERNAL_ID" \
    HostedZoneId="$HOSTED_ZONE_ID" \
    ApexDomain="$APEX_DOMAIN" \
    WwwDomain="$WWW_DOMAIN" \
    CloudFrontDomain="$distribution_domain" \
  --no-fail-on-empty-changeset \
  --no-cli-pager

dns_bridge_function="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$DNS_BRIDGE_STACK_NAME" \
  --query 'Stacks[0].Outputs[?OutputKey==`FunctionName`].OutputValue' \
  --output text \
  --no-cli-pager)"
if [[ -z "$dns_bridge_function" || "$dns_bridge_function" == "None" ]]; then
  echo "The temporary DNS bridge was created without a callable function." >&2
  exit 1
fi

invoke_dns_bridge() {
  local payload_file="$1"
  local response_file="$2"
  local metadata_file="${response_file}.metadata"
  local bridge_succeeded=0
  for attempt in $(seq 1 12); do
    if aws lambda invoke \
      --region "$AWS_REGION" \
      --function-name "$dns_bridge_function" \
      --payload "fileb://${payload_file}" \
      --output json \
      --no-cli-pager \
      --cli-read-timeout 900 \
      --cli-connect-timeout 30 \
      "$response_file" > "$metadata_file" \
      && ! jq -e '.FunctionError != null' "$metadata_file" >/dev/null \
      && jq -e 'type == "object" and (.errorMessage == null)' "$response_file" >/dev/null; then
      bridge_succeeded=1
      break
    fi
    sleep 5
  done
  if [[ "$bridge_succeeded" != "1" ]]; then
    echo "The temporary DNS bridge rejected the requested operation." >&2
    jq . "$response_file" >&2 || true
    exit 1
  fi
}

jq -n '{operation: "get_zone"}' > "$work_dir/get-zone-request.json"
invoke_dns_bridge "$work_dir/get-zone-request.json" "$work_dir/get-zone-response.json"
zone_name="$(jq -r '.zone_name // empty' "$work_dir/get-zone-response.json")"
if [[ "$zone_name" != "sozorock.com." ]]; then
  echo "Refusing to deploy: the DNS bridge did not resolve the authoritative sozorock.com zone." >&2
  exit 1
fi

if ! aws iam get-open-id-connect-provider \
  --open-id-connect-provider-arn "$OIDC_PROVIDER_ARN" \
  --no-cli-pager >/dev/null 2>&1; then
  aws iam create-open-id-connect-provider \
    --url "https://token.actions.githubusercontent.com" \
    --client-id-list "sts.amazonaws.com" \
    --tags Key=Application,Value=SozoRockSchool \
    --no-cli-pager >/dev/null
else
  oidc_clients="$(aws iam get-open-id-connect-provider \
    --open-id-connect-provider-arn "$OIDC_PROVIDER_ARN" \
    --query 'ClientIDList' \
    --output json \
    --no-cli-pager)"
  if ! jq -e 'index("sts.amazonaws.com")' <<<"$oidc_clients" >/dev/null; then
    aws iam add-client-id-to-open-id-connect-provider \
      --open-id-connect-provider-arn "$OIDC_PROVIDER_ARN" \
      --client-id "sts.amazonaws.com" \
      --no-cli-pager
  fi
fi

aws cloudformation validate-template \
  --region "$AWS_REGION" \
  --template-body "file://${source_dir}/infra/aws/deployment-role.yml" \
  --no-cli-pager >/dev/null

aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$DEPLOY_STACK_NAME" \
  --template-file "$source_dir/infra/aws/deployment-role.yml" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    S3BucketName="$bucket_name" \
    S3Prefix="$SITE_PREFIX" \
    BackupPrefix="$BACKUP_ROOT" \
    CloudFrontDistributionId="$DISTRIBUTION_ID" \
    GitHubOidcProviderArn="$OIDC_PROVIDER_ARN" \
  --no-fail-on-empty-changeset \
  --no-cli-pager

deploy_role_arn="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$DEPLOY_STACK_NAME" \
  --query 'Stacks[0].Outputs[?OutputKey==`DeployRoleArn`].OutputValue' \
  --output text \
  --no-cli-pager)"

release_ref_label="$(tr -cs 'A-Za-z0-9._-' '-' <<<"${SOURCE_REF:0:24}" | sed 's/^-//; s/-$//')"
release_id="$(date -u +%Y%m%dT%H%M%SZ)-${release_ref_label:-release}"
site_uri="s3://${bucket_name}/${SITE_PREFIX}"
backup_uri="s3://${bucket_name}/${BACKUP_ROOT}${release_id}/"
backup_complete=0
deployment_active=0

invalidate_distribution() {
  local invalidation_id
  invalidation_id="$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths '/*' \
    --query 'Invalidation.Id' \
    --output text \
    --no-cli-pager)"
  aws cloudfront wait invalidation-completed \
    --distribution-id "$DISTRIBUTION_ID" \
    --id "$invalidation_id" \
    --no-cli-pager
}

rollback_release() {
  local exit_status=$?
  trap - EXIT
  if [[ "$deployment_active" == "1" && "$backup_complete" == "1" ]]; then
    echo "Live verification failed. Restoring the previous website release." >&2
    aws s3 sync "$backup_uri" "$site_uri" \
      --delete \
      --only-show-errors
    invalidate_distribution
  fi
  exit "$exit_status"
}
trap rollback_release EXIT

aws s3 sync "$site_uri" "$backup_uri" --only-show-errors
backup_complete=1
deployment_active=1

# Keep the independently activated US contact endpoint across static releases.
if aws s3api get-object --bucket "$bucket_name" --key "${SITE_PREFIX}engagement-config.js" \
  --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$AWS_REGION" \
  "$work_dir/engagement-config.js" --no-cli-pager >/dev/null 2>"$work_dir/engagement-config-error.txt"; then
  cp "$work_dir/engagement-config.js" "$source_dir/dist/client/engagement-config.js"
elif ! grep -Eq '\((NoSuchKey|404|NotFound)\)' "$work_dir/engagement-config-error.txt"; then
  echo "Unable to verify the existing contact configuration. Stopping to preserve it." >&2
  exit 1
fi
if aws s3api get-object --bucket "$bucket_name" --key "${SITE_PREFIX}applications-config.js" \
  --expected-bucket-owner "$EXPECTED_ACCOUNT_ID" --region "$AWS_REGION" \
  "$work_dir/applications-config.js" --no-cli-pager >/dev/null 2>"$work_dir/applications-config-error.txt"; then
  cp "$work_dir/applications-config.js" "$source_dir/dist/client/applications-config.js"
elif ! grep -Eq '\((NoSuchKey|404|NotFound)\)' "$work_dir/applications-config-error.txt"; then
  echo "Unable to verify the existing application configuration. Stopping to preserve it." >&2
  exit 1
fi
aws s3 sync "$source_dir/dist/client/" "$site_uri" \
  --delete \
  --exclude 'index.html' \
  --cache-control 'public,max-age=3600' \
  --only-show-errors
aws s3 cp "$source_dir/dist/client/index.html" "${site_uri}index.html" \
  --cache-control 'no-cache,no-store,must-revalidate' \
  --content-type 'text/html; charset=utf-8' \
  --only-show-errors

invalidate_distribution

www_verified=0
for attempt in $(seq 1 30); do
  page="$(curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
    --max-time 20 "https://${WWW_DOMAIN}/?release=${release_id}" || true)"
  if grep -Fq 'SozoRockSchool' <<<"$page" \
    && grep -Fq 'Applied AI Systems' <<<"$page" \
    && grep -Fq 'Cybersecurity Identity and Access Management' <<<"$page" \
    && grep -Fq 'AI Governance' <<<"$page"; then
    www_verified=1
    break
  fi
  sleep 10
done
if [[ "$www_verified" != "1" ]]; then
  echo "The new release did not verify at https://${WWW_DOMAIN}." >&2
  exit 1
fi
deployment_active=0
trap - EXIT

certificate_covers_both_domains() {
  local certificate_arn="$1"
  [[ -n "$certificate_arn" ]] || return 1
  aws acm describe-certificate \
    --region "$AWS_REGION" \
    --certificate-arn "$certificate_arn" \
    --output json \
    --no-cli-pager \
    | jq -e --arg apex "$APEX_DOMAIN" --arg www "$WWW_DOMAIN" --arg wildcard "*.${APEX_DOMAIN}" '
        (.Certificate.SubjectAlternativeNames // []) as $names
        | (.Certificate.Status == "ISSUED" or .Certificate.Status == "PENDING_VALIDATION")
          and (($names | index($apex)) != null)
          and ((($names | index($www)) != null) or (($names | index($wildcard)) != null))
      ' >/dev/null
}

current_certificate_arn="$(jq -r '.Distribution.DistributionConfig.ViewerCertificate.ACMCertificateArn // empty' "$distribution_file")"
certificate_arn=""
if certificate_covers_both_domains "$current_certificate_arn"; then
  certificate_arn="$current_certificate_arn"
else
  certificate_candidates="$(aws acm list-certificates \
    --region "$AWS_REGION" \
    --certificate-statuses ISSUED PENDING_VALIDATION \
    --query 'CertificateSummaryList[].CertificateArn' \
    --output text \
    --no-cli-pager)"
  for candidate_arn in $certificate_candidates; do
    if [[ "$candidate_arn" != "None" ]] && certificate_covers_both_domains "$candidate_arn"; then
      certificate_arn="$candidate_arn"
      break
    fi
  done
fi

if [[ -z "$certificate_arn" ]]; then
  certificate_arn="$(aws acm request-certificate \
    --region "$AWS_REGION" \
    --domain-name "$APEX_DOMAIN" \
    --subject-alternative-names "*.${APEX_DOMAIN}" \
    --validation-method DNS \
    --idempotency-token sozorockcomproduction \
    --options CertificateTransparencyLoggingPreference=ENABLED \
    --tags Key=Application,Value=SozoRockSchool Key=Domain,Value=sozorock.com \
    --query CertificateArn \
    --output text \
    --no-cli-pager)"
fi

certificate_status="$(aws acm describe-certificate \
  --region "$AWS_REGION" \
  --certificate-arn "$certificate_arn" \
  --query 'Certificate.Status' \
  --output text \
  --no-cli-pager)"

if [[ "$certificate_status" != "ISSUED" ]]; then
  certificate_file="$work_dir/certificate.json"
  validation_ready=0
  for attempt in $(seq 1 30); do
    aws acm describe-certificate \
      --region "$AWS_REGION" \
      --certificate-arn "$certificate_arn" \
      --output json \
      --no-cli-pager > "$certificate_file"
    if jq -e '
      (.Certificate.DomainValidationOptions | length) > 0
      and all(.Certificate.DomainValidationOptions[]; .ResourceRecord.Name != null and .ResourceRecord.Value != null)
    ' "$certificate_file" >/dev/null; then
      validation_ready=1
      break
    fi
    sleep 5
  done
  if [[ "$validation_ready" != "1" ]]; then
    echo "ACM did not produce DNS validation records for ${certificate_arn}." >&2
    exit 1
  fi

  jq '
    [.Certificate.DomainValidationOptions[].ResourceRecord]
    | unique_by(.Name + .Type + .Value)
    | {
        Comment: "Validate the SozoRockSchool production TLS certificate",
        Changes: map({
          Action: "UPSERT",
          ResourceRecordSet: {
            Name: .Name,
            Type: .Type,
            TTL: 300,
            ResourceRecords: [{Value: .Value}]
          }
        })
      }
  ' "$certificate_file" > "$work_dir/certificate-dns-change.json"

  jq '{operation: "change_records", change_batch: .}' \
    "$work_dir/certificate-dns-change.json" \
    > "$work_dir/certificate-dns-request.json"
  invoke_dns_bridge \
    "$work_dir/certificate-dns-request.json" \
    "$work_dir/certificate-dns-response.json"
  aws acm wait certificate-validated \
    --region "$AWS_REGION" \
    --certificate-arn "$certificate_arn" \
    --no-cli-pager
fi

function_arn="arn:aws:cloudfront::${EXPECTED_ACCOUNT_ID}:function/${REDIRECT_FUNCTION_NAME}"
aws cloudfront get-distribution-config \
  --id "$DISTRIBUTION_ID" \
  --output json \
  --no-cli-pager > "$work_dir/distribution-config.json"
existing_viewer_function="$(jq -r '
  [.DistributionConfig.DefaultCacheBehavior.FunctionAssociations.Items[]?
    | select(.EventType == "viewer-request")
    | .FunctionARN][0] // empty
' "$work_dir/distribution-config.json")"
existing_viewer_lambda="$(jq -r '
  [.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations.Items[]?
    | select(.EventType == "viewer-request")
    | .LambdaFunctionARN][0] // empty
' "$work_dir/distribution-config.json")"
if [[ -n "$existing_viewer_function" && "$existing_viewer_function" != "$function_arn" ]]; then
  echo "Refusing to replace the existing viewer-request function ${existing_viewer_function}." >&2
  exit 1
fi
if [[ -n "$existing_viewer_lambda" ]]; then
  echo "Refusing to conflict with the existing viewer-request Lambda@Edge function ${existing_viewer_lambda}." >&2
  exit 1
fi

jq -n \
  '{Comment: "Redirect sozorock.com to the canonical www domain", Runtime: "cloudfront-js-2.0"}' \
  > "$work_dir/function-config.json"

if aws cloudfront describe-function \
  --name "$REDIRECT_FUNCTION_NAME" \
  --stage DEVELOPMENT \
  --output json \
  --no-cli-pager > "$work_dir/function.json" 2>/dev/null; then
  function_etag="$(jq -r '.ETag' "$work_dir/function.json")"
  aws cloudfront update-function \
    --name "$REDIRECT_FUNCTION_NAME" \
    --if-match "$function_etag" \
    --function-config "file://${work_dir}/function-config.json" \
    --function-code "fileb://${source_dir}/infra/aws/apex-redirect.js" \
    --output json \
    --no-cli-pager > "$work_dir/function-updated.json"
else
  aws cloudfront create-function \
    --name "$REDIRECT_FUNCTION_NAME" \
    --function-config "file://${work_dir}/function-config.json" \
    --function-code "fileb://${source_dir}/infra/aws/apex-redirect.js" \
    --output json \
    --no-cli-pager > "$work_dir/function-updated.json"
fi
function_etag="$(jq -r '.ETag' "$work_dir/function-updated.json")"
aws cloudfront publish-function \
  --name "$REDIRECT_FUNCTION_NAME" \
  --if-match "$function_etag" \
  --no-cli-pager >/dev/null

jq \
  --arg apex "$APEX_DOMAIN" \
  --arg www "$WWW_DOMAIN" \
  --arg certificate_arn "$certificate_arn" \
  --arg function_arn "$function_arn" '
    .DistributionConfig
    | ((.Aliases.Items // []) + [$apex, $www] | unique) as $aliases
    | .Aliases = {Quantity: ($aliases | length), Items: $aliases}
    | .Comment = "SozoRockSchool — www.sozorock.com"
    | .ViewerCertificate = {
        ACMCertificateArn: $certificate_arn,
        SSLSupportMethod: "sni-only",
        MinimumProtocolVersion: "TLSv1.2_2021",
        CertificateSource: "acm"
      }
    | .DefaultCacheBehavior.ViewerProtocolPolicy = "redirect-to-https"
    | .IsIPV6Enabled = true
    | ((.DefaultCacheBehavior.FunctionAssociations.Items // [])
        | map(select(.EventType != "viewer-request"))
        + [{EventType: "viewer-request", FunctionARN: $function_arn}]) as $functions
    | .DefaultCacheBehavior.FunctionAssociations = {
        Quantity: ($functions | length),
        Items: $functions
      }
  ' "$work_dir/distribution-config.json" > "$work_dir/distribution-config-updated.json"

distribution_etag="$(jq -r '.ETag' "$work_dir/distribution-config.json")"
aws cloudfront update-distribution \
  --id "$DISTRIBUTION_ID" \
  --if-match "$distribution_etag" \
  --distribution-config "file://${work_dir}/distribution-config-updated.json" \
  --no-cli-pager >/dev/null
aws cloudfront wait distribution-deployed \
  --id "$DISTRIBUTION_ID" \
  --no-cli-pager

jq -n \
  --arg apex "$APEX_DOMAIN" \
  --arg www "$WWW_DOMAIN" \
  --arg target "$distribution_domain" \
  '{
    Comment: "Route both SozoRockSchool production domains to the verified CloudFront distribution",
    Changes: [
      {
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: $www,
          Type: "CNAME",
          TTL: 300,
          ResourceRecords: [{Value: $target}]
        }
      },
      {
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: $apex,
          Type: "A",
          AliasTarget: {
            HostedZoneId: "Z2FDTNDATAQYW2",
            DNSName: $target,
            EvaluateTargetHealth: false
          }
        }
      },
      {
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: $apex,
          Type: "AAAA",
          AliasTarget: {
            HostedZoneId: "Z2FDTNDATAQYW2",
            DNSName: $target,
            EvaluateTargetHealth: false
          }
        }
      }
    ]
  }' > "$work_dir/production-dns-change.json"

jq '{operation: "change_records", change_batch: .}' \
  "$work_dir/production-dns-change.json" \
  > "$work_dir/production-dns-request.json"
invoke_dns_bridge \
  "$work_dir/production-dns-request.json" \
  "$work_dir/production-dns-response.json"

apex_verified=0
for attempt in $(seq 1 60); do
  www_page="$(curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
    --max-time 20 "https://${WWW_DOMAIN}/?release=${release_id}" || true)"
  redirect_result="$(curl --proto '=https' --tlsv1.2 --silent --show-error \
    --max-time 20 --output /dev/null \
    --write-out '%{http_code} %{redirect_url}' \
    "https://${APEX_DOMAIN}/deployment-verification" || true)"
  if grep -Fq 'SozoRockSchool' <<<"$www_page" \
    && [[ "$redirect_result" == "301 https://${WWW_DOMAIN}/deployment-verification" ]]; then
    apex_verified=1
    break
  fi
  sleep 10
done

deployment_status="deployed"
if [[ "$apex_verified" != "1" ]]; then
  deployment_status="deployed_dns_propagating"
fi

dns_bridge_cleanup="retained"
if aws cloudformation delete-stack \
  --region "$AWS_REGION" \
  --stack-name "$DNS_BRIDGE_STACK_NAME" \
  --no-cli-pager; then
  if aws cloudformation wait stack-delete-complete \
    --region "$AWS_REGION" \
    --stack-name "$DNS_BRIDGE_STACK_NAME" \
    --no-cli-pager; then
    dns_bridge_cleanup="deleted"
  fi
fi

jq -n \
  --arg status "$deployment_status" \
  --arg hosting_account_id "$account_id" \
  --arg dns_account_id "$DNS_ACCOUNT_ID" \
  --arg distribution_id "$DISTRIBUTION_ID" \
  --arg distribution_domain "$distribution_domain" \
  --arg bucket "$bucket_name" \
  --arg site_prefix "$SITE_PREFIX" \
  --arg backup_uri "$backup_uri" \
  --arg certificate_arn "$certificate_arn" \
  --arg deploy_role_arn "$deploy_role_arn" \
  --arg dns_bridge_cleanup "$dns_bridge_cleanup" \
  --arg source_ref "$SOURCE_REF" \
  --arg www_verified "$www_verified" \
  --arg apex_redirect_verified "$apex_verified" \
  '{
    status: $status,
    source_ref: $source_ref,
    hosting_account_id: $hosting_account_id,
    dns_account_id: $dns_account_id,
    distribution: {id: $distribution_id, domain: $distribution_domain},
    storage: {bucket: $bucket, prefix: $site_prefix, backup: $backup_uri},
    certificate_arn: $certificate_arn,
    github_deploy_role_arn: $deploy_role_arn,
    temporary_dns_bridge: $dns_bridge_cleanup,
    urls: {
      canonical: "https://www.sozorock.com",
      apex: "https://sozorock.com"
    },
    verification: {
      www: ($www_verified == "1"),
      apex_redirect: ($apex_redirect_verified == "1")
    }
  }' | tee "$REPORT_PATH"

echo
echo "Production deployment report: ${REPORT_PATH}"
