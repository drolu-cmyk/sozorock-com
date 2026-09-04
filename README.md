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

The old Meridian website is replaced in place. Its historical S3 bucket and
origin-prefix names remain internal implementation details so the existing,
verified CloudFront setup can be reused without a risky infrastructure migration.
No Meridian branding or content is published.

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
