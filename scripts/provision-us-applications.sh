#!/usr/bin/env bash
# Provision preparation only. Does not change public configuration or open intake.
set -euo pipefail
for tool in aws python3; do command -v "$tool" >/dev/null; done
account_id="$(aws sts get-caller-identity --query Account --output text --no-cli-pager)"
[[ "$account_id" == '791860731989' ]] || { echo 'Use US hosting account 791860731989.' >&2; exit 1; }
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
template_file="$(mktemp /tmp/sozorock-applications.XXXXXX.json)"
trap 'rm -f "$template_file"' EXIT
python3 "$script_dir/build-applications-template.py" > "$template_file"
aws cloudformation validate-template --region us-east-1 --template-body "file://$template_file" --no-cli-pager >/dev/null
aws cloudformation deploy --region us-east-1 --stack-name sozorock-us-applications --template-file "$template_file" --parameter-overrides IntakeEnabled=false --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset --no-cli-pager
aws cloudformation describe-stacks --region us-east-1 --stack-name sozorock-us-applications --query 'Stacks[0].Outputs' --no-cli-pager
printf 'Provisioned with intake disabled. Complete docs/us-applications.md acceptance before activating any public form.\n'
