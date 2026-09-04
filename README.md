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

`www.sozorock.com`, hosted in AWS `us-east-1` through Amazon S3 and CloudFront.

The production workflow uses short-lived GitHub OIDC credentials. It requires these repository Actions variables:

- `AWS_DEPLOY_ROLE_ARN`
- `AWS_S3_BUCKET`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`

The least-privilege deployment role template is in `infra/aws/deployment-role.yml`.
