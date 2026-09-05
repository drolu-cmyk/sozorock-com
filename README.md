# SozoRockSchool

The official website for SozoRockSchool, focused on hands-on learning in Applied AI Systems, Cybersecurity GRC, Cybersecurity Identity and Access Management, and AI Governance.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static production site is generated in `dist/client`.

## Production destination

The canonical production URL is `https://www.sozorock.com`. Requests to
`https://sozorock.com` are permanently redirected to the canonical URL.

The production resources span two AWS accounts:

- Account `149086500999` owns the Route 53 hosted zone and domain registration.
- Account `791860731989` owns CloudFront distribution `E2YV5089958YRU` and the S3 origin.

The deployment discovers the S3 origin from the verified US CloudFront distribution and checks bucket ownership and region before publishing. The current bucket and origin prefix stay in place; no replacement bucket or origin migration is required.

## One-time AWS setup and first deployment

Run the same bootstrap from AWS CloudShell twice: first while signed into the DNS
account, then while signed into the hosting account. It detects the active account
and performs only the bounded actions assigned to it.

```bash
curl --proto '=https' --tlsv1.2 --fail --location --silent --show-error \
  https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/main/scripts/bootstrap-aws-deployment.sh \
  --output /tmp/bootstrap-aws-deployment.sh && \
bash /tmp/bootstrap-aws-deployment.sh
```

In the DNS account, the bootstrap creates a narrowly scoped cross-account Route 53
role for only the `sozorock.com` hosted zone. In the hosting account, it then:

- validates the known CloudFront distribution, S3 origin, and existing live object;
- builds and tests the exact GitHub revision;
- uses a temporary, tightly restricted Lambda bridge for the cross-account DNS changes when CloudShell is running with root credentials;
- creates the least-privilege GitHub Actions OIDC deployment role;
- backs up the current site and replaces it with SozoRockSchool;
- restores the backup automatically if the canonical site cannot be verified;
- configures the apex TLS certificate, redirect, and both DNS records; and
- waits for AWS deployment and verifies both public URLs.

The scripts refuse to run in any other AWS account or against a different
distribution, bucket, origin path, or hosted zone.

## Continuous deployment

The production workflow uses short-lived GitHub OIDC credentials and stores no
long-lived AWS access keys. After the one-time bootstrap, every push to `main`
builds and tests the site, validates the fixed AWS target, creates a recoverable S3
backup, publishes the new build, invalidates CloudFront, verifies the live page,
and automatically restores the previous release if verification fails.

The bounded IAM templates are:

- `infra/aws/dns-automation-role.yml`
- `infra/aws/dns-bridge.yml`
- `infra/aws/deployment-role.yml`

## Read-only discovery

The earlier Route 53 and registration discovery remains available for diagnostics:

```bash
curl --proto '=https' --tlsv1.2 --fail --location --silent --show-error \
  https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/main/scripts/discover-aws-hosting.sh \
  --output /tmp/discover-aws-hosting.sh && \
bash /tmp/discover-aws-hosting.sh
```

## US enquiry service activation

The website's existing S3 bucket, origin prefix, distribution and DNS records are
preserved. `infra/aws/school-platform.json` adds only an independent US contact
service: HTTP API, Lambda, DynamoDB and their bounded IAM/logging resources in
hosting account `791860731989`, `us-east-1`. It does not use the Canadian backend.

The current GitHub deployment role can publish website files but cannot provision
this service. No AWS credentials were available in the implementation workspace,
so the template has been checked locally, not deployed. Once the website release
with `engagement-config.js` is live, run this from AWS CloudShell while signed into
the US hosting account with CloudFormation/IAM/Lambda/API Gateway/DynamoDB access:

```bash
curl --proto '=https' --tlsv1.2 --fail --location --silent --show-error \
  https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/main/scripts/enable-us-enquiries.sh \
  --output /tmp/enable-us-enquiries.sh && \
bash /tmp/enable-us-enquiries.sh
```

The script verifies the account, production aliases, existing bucket owner and
region, deploys only the contact service, and tests a rejected honeypot request
without storing an enquiry. It then publishes the endpoint configuration to the
existing origin, invalidates that one file and verifies the served configuration.
A failed activation restores the previous configuration. Static deployments
preserve the activated endpoint. Run from a reviewed checkout, or set
`SOZOROCK_RELEASE_REF` to the approved commit SHA to pin the downloaded template.

Only successful durable writes produce a receipt. Retries with the same request
ID and details return the same receipt; different details with that ID are
rejected. Storage failures never produce a success response. Records are marked
for automatic deletion after 30 days; DynamoDB TTL deletion is asynchronous and
can occur later. The service does not send email or subscribe users to marketing.
An authorized operator must review the table reported by the activation script
in the US AWS console and handle enquiries, including privacy and accessibility
requests. Until activation, the website truthfully shows that online enquiries
are unavailable and does not collect form details.
