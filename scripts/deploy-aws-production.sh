#!/usr/bin/env bash
# One release path for CLI and GitHub Actions. Run inside the reviewed checkout.
set -euo pipefail
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$script_dir/release.py" "$@"
