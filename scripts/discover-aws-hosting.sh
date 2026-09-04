#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ACCOUNT_ID="149086500999"
AWS_REGION="us-east-1"
APEX_DOMAIN="sozorock.com"
WWW_DOMAIN="www.sozorock.com"
REPORT_PATH="/tmp/sozorock-hosting-discovery.json"

account_id="$(aws sts get-caller-identity --query Account --output text)"
if [[ "$account_id" != "$EXPECTED_ACCOUNT_ID" ]]; then
  echo "Refusing to continue: signed into AWS account ${account_id}, expected ${EXPECTED_ACCOUNT_ID}." >&2
  exit 1
fi

registration="$(aws route53domains get-domain-detail \
  --region "$AWS_REGION" \
  --domain-name "$APEX_DOMAIN" \
  --output json \
  | jq '{
      domain: .DomainName,
      registrar: .RegistrarName,
      expiration: .ExpirationDate,
      status: (.StatusList // []),
      nameservers: [.Nameservers[]?.Name]
    }')"

hosted_zones="$(aws route53 list-hosted-zones-by-name \
  --dns-name "$APEX_DOMAIN" \
  --output json)"

hosted_zone_id="$(jq -r --arg name "${APEX_DOMAIN}." \
  '[.HostedZones[]? | select(.Name == $name and (.Config.PrivateZone // false) == false)][0].Id // empty' \
  <<<"$hosted_zones")"
hosted_zone_id="${hosted_zone_id#/hostedzone/}"

web_records='[]'
hosted_zone_nameservers='[]'
if [[ -n "$hosted_zone_id" ]]; then
  web_records="$(aws route53 list-resource-record-sets \
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
        ]')"

  hosted_zone_nameservers="$(aws route53 get-hosted-zone \
    --id "$hosted_zone_id" \
    --output json \
    | jq '[.DelegationSet.NameServers[]?]')"
fi

distributions="$(aws cloudfront list-distributions --output json)"
matching_distributions="$(jq --arg apex "$APEX_DOMAIN" --arg www "$WWW_DOMAIN" '
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
  ]' <<<"$distributions")"

jq -n \
  --arg account_id "$account_id" \
  --arg region "$AWS_REGION" \
  --arg apex "$APEX_DOMAIN" \
  --arg www "$WWW_DOMAIN" \
  --arg hosted_zone_id "$hosted_zone_id" \
  --argjson registration "$registration" \
  --argjson hosted_zone_nameservers "$hosted_zone_nameservers" \
  --argjson web_records "$web_records" \
  --argjson distributions "$matching_distributions" \
  '{
    account_id: $account_id,
    region: $region,
    domains: [$apex, $www],
    registration: $registration,
    route53: {
      public_hosted_zone_id: (if $hosted_zone_id == "" then null else $hosted_zone_id end),
      nameservers: $hosted_zone_nameservers,
      web_records: $web_records
    },
    cloudfront_distributions_in_this_account: $distributions,
    assessment: {
      public_hosted_zone_found: ($hosted_zone_id != ""),
      apex_cloudfront_found_in_this_account: any($distributions[]?; (.aliases | index($apex)) != null),
      www_cloudfront_found_in_this_account: any($distributions[]?; (.aliases | index($www)) != null),
      both_domains_share_distribution: any($distributions[]?; ((.aliases | index($apex)) != null and (.aliases | index($www)) != null))
    }
  }' | tee "$REPORT_PATH"

echo
echo "Read-only discovery complete: ${REPORT_PATH}"
