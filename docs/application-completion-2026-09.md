# Application completion — September 2026

This scoped update preserves the production corporate hero, CB-CAP, four capabilities, School sculpture, four programs, fees and AWS accounts. The user explicitly deferred payment gateways, tax implementation and email activation; the immediate operational outcome is a complete application stored in AWS and visible through the existing MFA administrator portal. No payment, enrollment completion or credential issuance is claimed by this release.

## Application data

Required in browser and server: full legal name, email, U.S. state/territory, one of the four programs, current role/area of work, learning goal (20–3,000 characters), availability of 3–6 hours/week, and privacy acknowledgement. Organization remains optional. These fields support program/regional reporting and selection without collecting unnecessary sensitive demographics. No SSN, identity document, health data, immigration status or date of birth is requested. Future impact surveys require a separate purpose and consent.

The existing `POST /applications` now stores market `United States`, versioned consent and timestamp, submission timestamp and audit history. Same request/details returns the same receipt; altered details conflict. Application creation and a 24-hour normalized-email/program duplicate guard are one DynamoDB transaction. API Gateway throttling is supplemented by ten new submissions per IP per ten-minute window. Short-lived IP hashes and duplicate guards expire automatically. Application PII retains the existing 90-day expiry; admin scans suppress expired and non-application rows.

## Existing staff portal

The existing Cognito pool, invited staff, MFA, PKCE callback and Admins group are retained. No second account system is created. Staff can load/paginate applications, search loaded records, filter by program/status, export loaded filtered records, add review notes and change allowed review states. Exports neutralize spreadsheet formula prefixes. UI data clears when the session expires. Server mutations require the same JWT authorization, Admins group and an authorized actor; compare-and-swap versions reject stale updates.

`POST /admin/applications/{id}/status` accepts `status`, `note`, `expectedVersion`. `POST /admin/applications/{id}/offer` accepts `expectedVersion` after review. It returns a private random-token link once; only its hash is stored. The URL fragment is sent in a POST body to `/offers/view`, `/offers/accept` or `/offers/decline`, rather than in request paths. A decision is single-use; identical retries confirm the existing decision. The public response omits applicant data and reviewer notes. Expired/withdrawn offers are unavailable.

Payment states cannot be set through generic staff mutations. Acceptance does not enroll the applicant. USD $49 enrollment + $250 tuition remains the published $299 program price; final tax and cancellation/refund terms must be shown before a later payment commitment. No recurring billing or application charge is introduced. No dates/cohorts are fabricated.

## Deployment and verification

Use `scripts/build-applications-template.py` to embed the sole handler source. Review the CloudFormation change set before execution, preserving table/pool and existing parameters. The new API routes reuse the existing integration and JWT authorizer. The public configuration stays closed until a synthetic durable write, exact replay/conflict checks, anonymous denial and readback through the real MFA session succeed. Publish the separate existing `admin.html` and `admin.js` with backups and byte verification; the normal public release intentionally preserves these operational files.

The research page uses a separate scoped stylesheet and semantic native disclosures; no new visual system, video runtime, AI service or external data collection was added.

Legacy `docs/us-applications.md` describes the initial preparation. Its minimal fields and lack of review workflow are superseded by this document. Credential/learner systems were not added. Automated applicant email remains unavailable until private Gmail authorization is configured; no private sender address is placed in public content.
