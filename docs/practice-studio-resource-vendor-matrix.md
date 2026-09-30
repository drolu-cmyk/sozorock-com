# Practice Studio Resource and Vendor Matrix

Status: Evaluation backlog
Rule: Vendors earn their place through quality, fit, safety, cost, licensing, and portability.

## AI and realtime intelligence
Evaluate:
- OpenAI realtime and reasoning models
- Deepgram Voice Agent / STT / TTS
- xAI Grok Voice
- Anthropic for selected reasoning/orchestration tasks
- Google Gemini / Vertex AI where advantageous
- AWS Bedrock for model choice and AWS-native controls

Criteria:
latency, naturalness, interruption handling, tool use, structured output, context reliability, price, privacy, retention controls, regional availability, concurrency.

## Voice and audio
Evaluate:
- Deepgram
- OpenAI
- xAI
- ElevenLabs
- Cartesia
- AssemblyAI
- LiveKit for realtime transport/orchestration
- Daily or Twilio where communications primitives are needed

## Visual people / video
Evaluate only where visual presence materially improves immersion:
- HeyGen
- Tavus
- Synthesia
- Runway/Higgsfield for authored visual assets where appropriate

Avoid avatar-first design. Voice/text must remain fully functional without video.

## Cloud and sandbox infrastructure
Primary:
- AWS Organizations
- AWS Control Tower / account vending pattern
- AWS IAM Identity Center
- CloudFormation/CDK/Terraform/OpenTofu
- CloudTrail
- Config
- Security Hub
- GuardDuty
- Budgets
- Service Quotas
- SCPs

Secondary/benchmark:
- Azure sandbox resources
- Google Cloud sandbox projects

## Source control and engineering work
Primary:
- GitHub Organizations
- GitHub Actions
- Issues/Projects as appropriate
- protected repositories and ephemeral learner repos

Evaluate:
- GitLab where DevSecOps features or credits materially improve the product.

## Identity and cybersecurity
Evaluate:
- AWS IAM / Identity Center
- Microsoft Entra ID developer/test environments
- Okta/Auth0
- Keycloak for controlled open-source simulations
- Wazuh
- Elastic Security
- Security Onion
- Splunk trial/developer/education routes
- Microsoft Sentinel/Azure where licensing permits

## Email and calendar
Evaluate:
- Google Workspace isolated subdomain/tenant patterns
- Microsoft 365 developer/test options
- purpose-built isolated mail service for simulated enterprise mail
- transactional provider for system-generated notifications

Requirements:
real inbox behavior, threading, attachments, calendar invitations, safe domain isolation, no unintended external delivery.

## Work management and service operations
Evaluate:
- Jira
- ServiceNow developer instances
- Linear
- custom lightweight internal adapter where licensing prevents realistic use

## Data and AI engineering
- PostgreSQL
- pgvector
- object storage
- Jupyter
- AWS data services
- dbt where appropriate
- managed vector/search services only where needed

## Observability
- OpenTelemetry
- CloudWatch
- Grafana
- PostHog for product behavior
- Sentry for application errors
- centralized event/evidence warehouse

## Infrastructure safety
Required:
- per-environment budgets
- automated shutdown
- TTL on resources
- network egress controls
- secrets manager
- no production credentials
- restricted regions/services where necessary
- automated cleanup jobs
- abuse detection
- emergency kill switch

## Accessibility
Required:
- captions
- transcripts
- full text alternative to voice
- keyboard operation
- screen-reader semantics
- reduced-motion mode
- color/contrast compliance
- no critical task dependent solely on audio/video

## Human validation resources
Use targeted external review for:
- IAM authenticity
- GRC authenticity
- AI governance authenticity
- applied AI systems authenticity
- assessment validity
- accessibility
- privacy/legal
- security red-team
- cloud cost/FinOps review

## Credits and non-dilutive resources to pursue
Evaluate current eligibility for:
- AWS Activate
- Deepgram Startup Program / F6S offer
- GitHub startup/education/partner programs
- Google Cloud for Startups
- Microsoft for Startups Founders Hub where product eligibility fits
- Cloudflare for Startups
- OpenAI startup/partner programs if available
- NVIDIA Inception if GPU/AI product requirements justify it
- MongoDB for Startups if adopted
- Datadog/Sentry/PostHog startup programs if adopted
- Twilio/LiveKit/ElevenLabs startup credits if adopted
- accelerator/provider programs that provide credits without forcing architectural lock-in

Do not claim or apply using Foundation status for Technology benefits unless the program expressly permits that relationship.

## Procurement rule
Do not introduce a paid vendor because it has credits.
Adopt only if:
1. it solves an approved requirement;
2. it passes quality/security review;
3. the post-credit economics remain acceptable;
4. migration away is feasible.
