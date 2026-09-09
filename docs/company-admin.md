# Company administration

The candidate portal covers School applications and corporate/CB-CAP enquiries. It does not edit website content. The public website release preserves the currently deployed admin HTML, JavaScript and operational configuration. Updating this source does not activate the new backend or portal.

## Access and data

Both read routes require the existing Cognito access-token authorizer, application client and exact Admins group. Authenticator MFA and the existing sign-in flow remain required. `/admin/enquiries` has read-only Scan permission on one explicitly configured table in the US hosting account. It cannot write or delete enquiries. Without that table parameter, enquiry access returns unavailable. The public contact API has no record-listing route.

Enquiry results include only corporate-context records within their 30-day retention period. Application results retain their 90-day expiry. Both responses use explicit field allowlists and no-store headers. Empty filtered pages retain continuation cursors. Displayed records clear on logout, token expiry and an unauthorized response; switching views aborts the previous request. Record values render as text.

## Separate deployment and acceptance

An authenticated AWS operator in hosting account 791860731989, us-east-1 is required. The website GitHub role cannot provision this change. Do not expand its permissions or use the general provisioning command, which deliberately closes intake.

1. Read the healthy `sozorock-us-applications` stack, its current parameters and resource identities. Read the existing US contact stack's `EnquiriesTable` output and confirm it is the table used by the current enquiry Lambda. Never select a table by a similar name or reuse Canada resources.
2. Generate the template with `python3 scripts/build-applications-template.py`. Validate it with CloudFormation. Prepare an UPDATE change set using the exact enquiry table for `EnquiriesTableName` and `UsePreviousValue` for every existing parameter, including `IntakeEnabled` and `ReserveFunctionCapacity`.
3. Inspect the change set: the intended changes are the Lambda code/environment, one scoped read-only IAM statement and one JWT-protected route. Reject any replacement of the applications table, user pool or client, any change to intake state, or any unrelated resource changes. Execute only that reviewed change set and wait for successful completion.
4. Check anonymous requests to both admin routes return 401/403. An invited administrator must complete real MFA and read back an authorized corporate enquiry through the new route. Verify a non-Admins token is denied. Use synthetic records for validation and retain only receipt references and pass/fail evidence, never tokens or message contents.
5. Back up the currently deployed `meridian/admin.html` and `meridian/admin.js` with their metadata. Publish the reviewed candidate files and `/assets/admin.css` to the same US origin, retain no-store caching for the portal, and invalidate those three paths. Leave both public configuration files and intake state unchanged. If verification fails, restore the backed-up portal and invalidate again.
6. Exercise both views, pagination, expiry and sign-out in the live portal. Read back the published bytes. Refresh the separate operational acceptance record with the verified admin-file digests before the next website release. Do not fabricate the MFA or staff-readback fields.

## Candidate validation

`npm run verify` exercises backend authentication, parameter validation, expiry/context filtering, field allowlists, pagination and template permissions using simulated storage. `python3 scripts/acceptance-admin.py --base-url http://127.0.0.1:4173` tests the browser with intercepted synthetic API responses, including stale responses, text rendering, unauthorized responses and session expiry. CI runs this candidate test before website authentication. These checks do not establish deployed IAM correctness or successful staff MFA.
