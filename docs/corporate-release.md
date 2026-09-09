# Corporate and School release runbook

## Release contract

Only `www.sozorock.com` and `sozorock.com`, existing account 791860731989 and distribution E2YV5089958YRU are authorized. The original S3 origin and prefix stay in place. No DNS, Foundation or Canada writes are part of a routine release.

1. Build and verify the committed source with `npm ci` and `npm run verify`.
2. Run both browser suites on the route-aware local server. Inspect desktop/mobile images, contact behavior, School selection, motion and keyboard access.
3. Verify operational application writes/replays/conflicts and staff readback after a real Cognito login with MFA. Verify contact via `verify-enquiries.py`. Record only synthetic evidence; never publish private admin screens or personal records.
4. Create `operational-acceptance.json` outside the repository with target account/distribution, factual booleans `applications`, `administratorReadback`, `contact`, `claimsConfirmed`, `expiresAt` (Unix seconds), and `configSha256` hashes for both live configuration files. Include evidence references and verifier/time. For an explicitly authorized public release that preserves disabled intake, use `applicationMode: preserve-disabled`, `intakeDisabled: true` and `adminBoundaryPreserved: true` only after verifying the existing disabled configuration, callback and anonymous denial. Leave `applications` and `administratorReadback` false. Do not turn failed/unverified checks into true values. Upload to `deployment-backups/sozorock-com/operational-acceptance.json` only after actual verification. The website deployment role does not authorize bypassing MFA.
5. Observe the CSP report-only policy in browsers before enforcement. Report-only policy ID: 184f8d08-4344-464a-8a0f-509a4a37cb73. Enforced policy ID: 0b4505ab-a5b2-4fa8-973c-8de149c2c99f. Regenerate policy definitions with `scripts/build-headers.mjs` when the allowlist changes. Set repository variable `SOZOROCK_HEADERS_POLICY_ID` to the reviewed enforced policy.
6. Ensure all legacy main-branch publication paths are replaced before staging. From the clean, verified checkout run `python scripts/release.py --evidence-dir <evidence-directory>` to stage only. Add `--activate --headers-policy <policy-id>` only with the operational evidence in that directory. The main workflow uses the same path and serializes runs without cancellation.
7. Require the durable `production-result.json`, correct current CDN configuration and passing live browser evidence. Check both function-generated unknown-route 404s and origin-generated missing-asset 404s. A CloudFront publish or HTTP 200 alone is not acceptance.

## Artifact and cache design

Files live at `meridian/releases/<full-commit>/`. Per-object conditional creation and SHA-256 byte readback prevent concurrent staging from replacing a completed artifact. A manifest is published only after all objects match. Reusing a commit with different build bytes fails. Static asset references in HTML/CSS/JS become viewer-visible release URLs so old pages keep access to their original bundles and images. Root operational configuration remains mutable and outside release artifacts.

Viewer-request routing canonicalizes GET/HEAD public URLs and preserves repeated query values. It does not redirect POST or /api requests. The public /admin.html callback URL and query remain unchanged. Unknown public routes return 404; old .html School URLs redirect to canonical /school paths.

## Recovery and retention

Every activation creates a unique recovery record under `deployment-backups/sozorock-com/<commit>/<activation-id>/`. Backups and old artifacts are never automatically deleted. Keep them at least seven days after successful live browser acceptance; use the later retention time in the acceptance record.

To restore a failed candidate, run `python scripts/release.py --rollback <previous-distribution.json> --evidence-dir <recovery-evidence>`. This takes the same release lock and requires the full current distribution configuration to match that candidate's recorded activated configuration. It restores only distribution routing/headers, never DynamoDB records, endpoint configuration or Cognito state. Verify the restored public site and protected boundaries afterward. Then re-stage/re-activate the intended candidate only after diagnosing the failure.

A forced host loss can leave `deployment-backups/sozorock-com/release.lock`. Do not automatically expire or steal it. Read its token and timestamp, confirm the recorded process/workflow is stopped, inspect the current distribution against the retained recovery record and resolve any incomplete activation first. An authorized operator may then remove only that exact stale lock. Never overwrite another release to clear a lock.

If an unrelated CDN change occurred after activation, automated rollback deliberately stops instead of overwriting it. Preserve evidence and reconcile the actual configuration before retrying.

## Current operational limitation

At the September 8, 2026 review, contact storage was verified and activated. School application intake remained disabled pending the actual operational route and authenticated staff readback. The user subsequently clarified that this blocks only application activation, not the verified corporate release. Deploy the public migration with `applicationMode: preserve-disabled`, verified `intakeDisabled` and `adminBoundaryPreserved`, current config hashes and an expiration. Keep authenticated staff readback explicitly unverified; do not enable intake or bypass MFA. Existing deployment authorization covers this isolated release.
