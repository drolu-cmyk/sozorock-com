#!/usr/bin/env bash
set -euo pipefail

DNS_ACCOUNT_ID="149086500999"
HOSTING_ACCOUNT_ID="791860731989"
SOURCE_REF="${SOZOROCK_RELEASE_REF:-main}"
REPOSITORY_RAW_ROOT="https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/${SOURCE_REF}"

for command_name in aws curl; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is unavailable: ${command_name}" >&2
    exit 1
  fi
done

account_id="$(aws sts get-caller-identity --query Account --output text --no-cli-pager)"

case "$account_id" in
  "$DNS_ACCOUNT_ID")
    target_script="authorize-aws-dns.sh"
    ;;
  "$HOSTING_ACCOUNT_ID")
    target_script="deploy-aws-production.sh"
    ;;
  *)
    echo "Refusing to continue: AWS account ${account_id} is not an approved SozoRockSchool production account." >&2
    echo "Expected DNS account ${DNS_ACCOUNT_ID} or hosting account ${HOSTING_ACCOUNT_ID}." >&2
    exit 1
    ;;
esac

downloaded_script="$(mktemp /tmp/sozorock-bootstrap.XXXXXX.sh)"
cleanup() {
  rm -f -- "$downloaded_script"
}
trap cleanup EXIT

curl --proto '=https' --tlsv1.2 --fail --location --silent --show-error \
  "${REPOSITORY_RAW_ROOT}/scripts/${target_script}" \
  --output "$downloaded_script"

SOZOROCK_RELEASE_REF="$SOURCE_REF" bash "$downloaded_script"
