# US readiness — 3 October 2026

## Scope

This change serves www.sozorock.com, its School pages and its existing US application service. Canada, Foundation and Practice Studio are excluded. The owner will configure Stripe and complete its integration manually; no Stripe credentials, account settings, checkout or billing changes were made in this change.

## Verified live

- The browser loads the US four-step application form with its independent US configuration. A crawler included a hidden outage fallback in its extracted text; that was not a verified form outage.
- Synthetic receipt `ea2ddd31-b308-4e87-a5b1-9b4b7f6afa8c`: initial application HTTP 200, exact replay HTTP 200 with the same reference, changed payload HTTP 409, anonymous administrator listing HTTP 401. This establishes durable service acknowledgment and retry behavior, not authenticated staff readback or email delivery.
- Live US API: `https://q9l0fuov97.execute-api.us-east-1.amazonaws.com`. Hosting account 791860731989, us-east-1. Existing user pool `us-east-1_6u0ZpZCRF`. No replacement pool or administrator account.
- Latest main website deployment run 36281274231 failed at activation with **Operational acceptance expired**. Build, unit checks, browser acceptance, AWS authentication and artifact staging succeeded. Do not remove this guard or copy old successful acceptance booleans into a new record.
- Current School price is USD $299: $49 enrollment following accepted offer, $250 tuition before program start. No application payment or recurring billing. Canada's prices and award do not apply.

## Changes prepared

Eight confirmed Workspace aliases are available in both company and School footers, with the same source used for School homepage and generated deep pages. Labels and addresses stack independently, wrap at narrow widths and preserve existing footer typography. School Contact explicitly routes admissions and general/technical/account support. No info/rock alias or catch-all is introduced.

A review concurrency correction limits the legacy missing-version fallback to version zero. Later stale mutations cannot use a missing-version record to bypass compare-and-swap protection. Backend source changes require a separate controlled stack update; a website release cannot publish Lambda code.

## Owner's manual Stripe integration

Use the existing US commercial account for SozoRock Tech Inc.; do not select a similarly named Foundation/nonprofit account. Confirm account identity, business currency, charges/payouts eligibility, customer support details and statement descriptor in Stripe before live activation.

1. Start in Stripe test mode. Configure two one-time components: USD $49 enrollment (4,900 cents), USD $250 tuition (25,000 cents). Applying and accepting an offer must not charge a card. Do not enable a subscription, mandatory add-on or card-fee surcharge.
2. Connect checkout to an existing accepted US application. Compute program, amount and currency on the server. Snapshot the accepted terms and actual cohort dates; do not accept client-supplied prices or enroll an unreviewed applicant. Published copy currently says $299 is the amount paid to the School: confirm tax treatment and display the full payable amount before commitment rather than silently increasing that price.
3. Provide the applicable cancellation/refund policy, enrollment and tuition deadlines, program start date, session arrangements and equipment requirements before payment. No invented deadlines, accreditation, employment guarantee or scholarship claims.
4. Store secret and webhook signing keys only in an encrypted server secret store in the US hosting account. Never place them in Git, HTML, public config, frontend environment variables, URLs, screenshots or chat. If a key is exposed, revoke it through Stripe.
5. A backend checkout endpoint must authorize the private accepted-offer token, use Stripe idempotency keys, and prevent parallel/retried requests from creating duplicate collectible sessions. Public payment links alone do not establish applicant identity or backend enrollment.
6. A public Stripe webhook endpoint must verify the signature against the exact raw request bytes and a bounded timestamp tolerance. Reconcile against Stripe's current payment/session object. Match US application, program, currency, amount, account and test/live mode; deduplicate events. Only verified funds change backend payment state. A success URL, screenshot, email or generic staff status update must not mark an application paid.
7. Keep enrollment and tuition statuses separate; enrollment is complete only after required fees are verified and the School confirms the place. Late, failed, duplicate, expired, refunded and disputed events must not create duplicate enrollments. Store minimal financial evidence separately from the 90-day application expiration so that payment/refund records are not lost when an application expires.
8. Send a receipt after a verified successful payment and staff notification to billing@sozorock.com. Use admissions@sozorock.com for application/offer correspondence and registrar@sozorock.com for enrollment records. Configure sender authentication and test delivery; footer mail links do not prove automatic messages work.
9. Test approved application → offer → acceptance → $49 checkout → $250 checkout → protected admin reconciliation. Include failure, canceled checkout, retry, altered amount, webhook replay, refund and test/live separation. Use synthetic records and Stripe test cards; no real charge is needed for these checks.
10. Enable live mode only after the end-to-end tests and tax/refund decisions are complete. Preserve webhook verification, MFA and backend-only state changes. Update School offer/admissions/privacy copy together with the working integration; currently it correctly says online payment is unavailable.

Stripe references: https://docs.stripe.com/payments/checkout/fulfill-orders ; https://docs.stripe.com/webhooks/signature ; https://docs.stripe.com/api/checkout/sessions/create ; https://docs.stripe.com/api/idempotent_requests

## Remaining release acceptance

An authenticated US AWS operator and a real School admin MFA session are required. Read back the synthetic reference above through the protected portal; verify contact persistence/readback; inspect the exact current stack and configuration; renew operational-acceptance.json only from factual evidence as described in docs/corporate-release.md. Then run the guarded website release and require successful production acceptance. Keep the enabled live applications-config.js and engagement-config.js untouched.

The application service currently does not automatically send applicant receipts or staff email. Workspace aliases are working mail destinations, not a notification worker. Automatic delivery needs a separately verified sender, durable retry behavior and protected applicant data. The existing administration and offer files are operational assets preserved by normal public releases; changes to those files need separate publication and acceptance. Start dates, payment deadlines and final enrollment agreements need owner confirmation before paid enrollment. Credential verification and learner delivery remain separate readiness work; no credential has been issued by this review.
