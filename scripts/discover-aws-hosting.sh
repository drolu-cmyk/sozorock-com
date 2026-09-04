#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ACCOUNT_ID="149086500999"
AWS_REGION="us-east-1"
APEX_DOMAIN="sozorock.com"
WWW_DOMAIN="www.sozorock.com"
REPORT_PATH="/tmp/sozorock-hosting-discovery.json"

work_dir="$(mktemp -d /tmp/sozorock-hosting-discovery.XXXXXX)"
cleanup() {
  rm -f -- "$work_dir"/*.json
  rmdir -- "$work_dir" 2>/dev/null || true
}
trap cleanup EXIT

require_json() {
  local label="$1"
  local file_path="$2"

  if [[ ! -s "$file_path" ]] || ! jq -e 'type == "object" or type == "array"' "$file_path" >/dev/null; then
    echo "Discovery failed: ${label} did not return valid JSON." >&2
    echo "No AWS resources were changed." >&2
    exit 1
  fi
}

account_id="$(aws sts get-caller-identity --query Account --output text)"
if [[ "$account_id" != "$EXPECTED_ACCOUNT_ID" ]]; then
  echo "Refusing to continue: signed into AWS account ${account_id}, expected ${EXPECTED_ACCOUNT_ID}." >&2
  exit 1
fi

aws route53domains get-domain-detail \
  --region "$AWS_REGION" \
  --domain-name "$APEX_DOMAIN" \
  --output json \
  | jq '{
      domain: .DomainName,
      registrar: .RegistrarName,
      expiration: .ExpirationDate,
      status: (.StatusList // []),
      nameservers: [.Nameservers[]?.Name]
    }' > "$work_dir/registration.json"
require_json "domain registration lookup" "$work_dir/registration.json"

aws route53 list-hosted-zones-by-name \
  --dns-name "$APEX_DOMAIN" \
  --output json > "$work_dir/hosted-zones.json"
require_json "Route 53 hosted-zone lookup" "$work_dir/hosted-zones.json"

hosted_zone_id="$(jq -r --arg name "${APEX_DOMAIN}." \
  '[.HostedZones[]? | select(.Name == $name and (.Config.PrivateZone // false) == false)][0].Id // empty' \
  "$work_dir/hosted-zones.json")"
hosted_zone_id="${hosted_zone_id#/hostedzone/}"

printf '[]\n' > "$work_dir/web-records.json"
printf '[]\n' > "$work_dir/hosted-zone-nameservers.json"
if [[ -n "$hosted_zone_id" ]]; then
  aws route53 list-resource-record-sets \
    --hosted-zone-id "$hosted_zone_id" \
    --output json \
    | jq --arg apex "${APEX_DOMAIN}." --arg www "${WWW_DOMAIN}." '
        [.ResourceRecordSets[]?
          | select(.Name == $apex or .Name == $www)
          | select(.Type == "A" or .Type == "AAAA" or .Type == "CNAME")
          | {
              name: .Name,
              type: .Type,
              alias_target: (.AliasTarget.DNSName // null),
              values: ([.ResourceRecords[]?.Value] // [])
            }
        ]' > "$work_dir/web-records.json"

  aws route53 get-hosted-zone \
    --id "$hosted_zone_id" \
    --output json \
    | jq '[.DelegationSet.NameServers[]?]' > "$work_dir/hosted-zone-nameservers.json"
fi
require_json "Route 53 website records lookup" "$work_dir/web-records.json"
require_json "Route 53 nameserver lookup" "$work_dir/hosted-zone-nameservers.json"

aws cloudfront list-distributions --output json > "$work_dir/distributions.json"
require_json "CloudFront distribution lookup" "$work_dir/distributions.json"

jq --arg apex "$APEX_DOMAIN" --arg www "$WWW_DOMAIN" '
  [.DistributionList.Items[]?
    | select(
        ((.Aliases.Items // []) | index($apex)) != null
        or ((.Aliases.Items // []) | index($www)) != null
      )
    | {
        id: .Id,
        domain: .DomainName,
        enabled: .Enabled,
        status: .Status,
        aliases: (.Aliases.Items // []),
        origins: [
          .Origins.Items[]?
          | {
              id: .Id,
              domain: .DomainName,
              origin_path: (.OriginPath // "")
            }
        ]
      }
  ]' "$work_dir/distributions.json" > "$work_dir/matching-distributions.json"
require_json "CloudFront alias matching" "$work_dir/matching-distributions.json"

jq -n \
  --arg account_id "$account_id" \
  --arg region "$AWS_REGION" \
  --arg apex "$APEX_DOMAIN" \
  --arg www "$WWW_DOMAIN" \
  --arg hosted_zone_id "$hosted_zone_id" \
  --slurpfile registration "$work_dir/registration.json" \
  --slurpfile hosted_zone_nameservers "$work_dir/hosted-zone-nameservers.json" \
  --slurpfile web_records "$work_dir/web-records.json" \
  --slurpfile distributions "$work_dir/matching-distributions.json" \
  '{
    account_id: $account_id,
    region: $region,
    domains: [$apex, $www],
    registration: $registration[0],
    route53: {
      public_hosted_zone_id: (if $hosted_zone_id == "" then null else $hosted_zone_id end),
      nameservers: $hosted_zone_nameservers[0],
      web_records: $web_records[0]
    },
    cloudfront_distributions_in_this_account: $distributions[0],
    assessment: {
      public_hosted_zone_found: ($hosted_zone_id != ""),
      apex_cloudfront_found_in_this_account: any($distributions[0][]?; (.aliases | index($apex)) != null),
      www_cloudfront_found_in_this_account: any($distributions[0][]?; (.aliases | index($www)) != null),
      both_domains_share_distribution: any($distributions[0][]?; ((.aliases | index($apex)) != null and (.aliases | index($www)) != null))
    }
  }' | tee "$REPORT_PATH"

echo
echo "Read-only discovery complete: ${REPORT_PATH}"
