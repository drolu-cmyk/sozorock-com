# Security and product release — 5 October 2026

This is a bounded source and production-boundary review, not a claim that every account or vulnerability has been cleared.

## Preserved account and mail state

The preceding Canadian release (PR127) contained no Cognito, mailbox or mail-DNS changes. Public DNS checked on 5 October points both domains to Google Workspace (`smtp.google.com`). SPF authorizes Google on both domains and also Amazon SES on the US apex. The apex DMARC policy remains monitoring-only (`p=none`); no enforcement change was made without sender alignment evidence. Role mailboxes remain intentional contact channels. No password reset, staff removal, payment activation or mail-routing change was performed.

Read-only operational audits use existing OIDC permissions and emit control booleans only. They never write application records, send mail or reset accounts. A permission-denied result means unverified, not secure or insecure. Direct unauthenticated HEAD requests for the tested public-origin object and bucket-listing URLs returned 403 for both countries. This does not establish every permission in an account.

## Product and copy

CB-CAP now has a working aggregate service-capacity decision brief with cost arithmetic, source/date, accountable role, outcome target and review date. It exports plain text without sending entries to the API or storing them in browser storage. Maps remain clearly synthetic demonstrations. US county estimates use the existing documented CDC PLACES snapshot separately; no county-to-ZIP or prevalence-to-demand inference is made. See `cbcap-decision-method.md` for evidence and limitations, including the full RRG text still unavailable.

School designs, programmes/programs, fees and payment availability are preserved. Client fixes make offer decisions match the chosen action, reject unconfirmed writes, expire OAuth state and clear private staff content immediately on logout. Repeated research copy was reduced without changing the research's status into a delivered capability.

## Security scope and remaining activation

Public handlers use API Gateway and Cognito. No Clerk or GitHub webhook receiver or unauthenticated AI model proxy was found in these public handlers. GitHub OIDC is a deployment trust relationship, not a webhook endpoint. Any future webhook must verify its provider signature against the raw body before processing, enforce timestamp/replay controls where supported, and reject absent/invalid signatures; do not add a dummy verifier to an unused route.

No credential pattern was found in the reviewed current local source. This does not constitute a complete historical secret scan or inspection of inaccessible cloud settings. The dependency audit reported zero known production-package vulnerabilities on the checked lockfiles.

Private storage is separate from published assets in the reviewed architecture. Canada private-evidence source uses KMS, public-access blocks, TLS and version-bound short-lived tickets after scan approval; its deployed state was not established by this public-site role. Public assets are intentionally delivered through CloudFront's private S3 origin access.

Cloudflare has not been installed or enabled. Current DNS is Route53 and the observed public CloudFront distributions have no WAF association. No Cloudflare account management integration was available; the AWS operator console was unavailable in this browser. Do not represent the dormant secure-gateway WAF template as protection on the public engagement API. DNS migration or a proxy must cover the API boundary as well as the website and preserve mail/verification records.

The monitoring stack and guarded operator procedure in `security-observability.md` are source-ready and separately gated. They are not activated by the website workflow. Configurable thresholds are review triggers, not learned anomaly detection. Ordinary logging/metric charges apply. Full mailbox delivery, staff authentication/readback, operator-only storage settings and monitoring activation remain explicit checks requiring appropriate access.

## Primary guidance

- https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
- https://clerk.com/docs/reference/backend/verify-webhook
- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-logging.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html
- https://developers.cloudflare.com/dns/proxy-status/

Commercial benchmark reviewed: Accenture AI and Data, McKinsey QuantumBlack and Deloitte consulting service pages. Adopted clear buyer needs, distinct capabilities, grounded proof and a concrete next action; no competitor copy, results or scale claims were borrowed.

## US live checks and release boundary

Audit run 37249212262 confirmed CloudFront private origin control and HTTPS redirection. Bucket-policy/public-block/logging inspection was denied to the website role. Both live public configuration files match the hashes in the earlier operational acceptance, but that acceptance has expired. Do not change its timestamps or copy historical success booleans forward without real new checks.

Backend deployment must precede the new offer client: the client requires a saved terms version, and the handler requires explicit acknowledgement of that version. Update the existing `sozorock-us-applications` and `sozorock-school-enquiries` stacks using the generated templates and every existing parameter's `UsePreviousValue`; never run the initial provisioning script, which forces intake off. Preserve current intake, table, concurrency, Cognito and recovery configuration. Review a CloudFormation change set before execution; expected changes are the Lambda code and narrowly scoped enquiry guard-row UpdateItem permission. No identity resource replacement is authorized by this update.

`public/admin.js` is deliberately excluded from `release.py`. After validating the backend, separately back up and update the existing `meridian/admin.js` object in `sozorock-meridian-site`, preserving `admin.html`, both configuration files and the callback. Verify immediate logout erasure through a real staff session. Do not silently assume the regular public release publishes this fix.

Renew operational acceptance with a real staff MFA login and synthetic application write/replay/conflict/readback plus contact write/readback, then activate the guarded website release. The OIDC website role cannot perform the independent backend deployment, authenticated readback or broad cloud administration. Source/CI success is not a live release.
