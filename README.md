# SozoRock Technology

Corporate software and data engineering website at https://www.sozorock.com, with SozoRockSchool at /school. The apex redirects to www. This repository does not deploy Canada or Foundation sites.

## Build and review

Use Node 22 and Python 3. Run `npm ci`, then `npm run verify`. The build is `dist/client`. Run `node scripts/preview-server.mjs` for a route-aware preview at http://127.0.0.1:4173. `CSP_MODE=enforce` enables the production CSP in the preview.

- Corporate content and generated HTML: `scripts/build-corporate.mjs`.
- School supporting pages: `scripts/build-public-pages.mjs`.
- School homepage and preserved sculpture: `src/SozoRockSchoolHomepage.jsx`, `src/BlenderScene.jsx`, `src/open-school.css`.
- Routes, metadata and School facts: `src/site.mjs`, `scripts/page-shell.mjs`, `src/school-programs.mjs`.
- Corporate type, colors and responsive styles: `public/corporate.css`.
- Evidence provenance and original joint illustration: `artwork/corporate/`.

Commit generated pages with their generator changes. Do not hand-edit generated pages.

## Browser acceptance

Install `playwright==1.58.0` and `boto3==1.43.90` in an isolated Python environment. Provide Google Chrome or install Playwright Chromium. Both suites cover nine widths from 320 to 1920 pixels:

```
python scripts/acceptance-public-site.py --base-url http://127.0.0.1:4173 --output-dir work/qa/school
python scripts/acceptance-corporate.py --base-url http://127.0.0.1:4173 --output-dir work/qa/corporate
```

Browser form fault tests intercept submissions. They do not send live applications. Automated checks do not certify complete WCAG conformance or field performance.

## Production

The existing hosting account is 791860731989, region us-east-1. CloudFront E2YV5089958YRU serves S3 `sozorock-meridian-site` with origin path `/meridian`. Do not infer current DNS ownership from historical setup templates; routine releases do not modify DNS.

The single publisher is `scripts/release.py`, called by the main workflow and CLI wrapper. It stages immutable content, preserves operational configuration and restores the previous distribution if live browser acceptance fails. See [the release runbook](docs/corporate-release.md). Never run a shared-prefix `sync --delete` against the site or retained releases.

## Enquiries and School applications

The US enquiry stack `sozorock-school-enquiries` stores contact records in DynamoDB with a 30-day TTL. The independent application stack is `sozorock-us-applications`, with protected Cognito staff access and a 90-day record TTL. Contact is not an application system. TTL deletion is asynchronous.

Build the enquiry CloudFormation template using `scripts/build-enquiries-template.py`; the source JSON is a skeleton whose Lambda code is injected from `infra/aws/enquiries.py`. From a reviewed checkout, `scripts/enable-us-enquiries.sh` verifies durable synthetic receipts, authorized readback, replay and conflict handling before publishing contact configuration. It does not send email. An authorized operator must review enquiries in the US DynamoDB console and respond through the organization's approved communications process.

Keep public application collection disabled until durable write, retry and authenticated staff readback are verified. The /admin.html callback and MFA are preserved. Website rollback never restores application records, Cognito state, or mutable endpoint configuration.
