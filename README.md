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

An AWS administrator can prepare the existing `www.sozorock.com` distribution from AWS CloudShell by running:

```bash
curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
  https://raw.githubusercontent.com/drolu-cmyk/sozorock-com/main/scripts/bootstrap-aws-deployment.sh \
  --output /tmp/bootstrap-aws-deployment.sh && \
bash /tmp/bootstrap-aws-deployment.sh
```

The script refuses to run outside AWS account `149086500999`, discovers the existing CloudFront and S3 resources from the `www.sozorock.com` alias, and creates only the bounded GitHub deployment role.
