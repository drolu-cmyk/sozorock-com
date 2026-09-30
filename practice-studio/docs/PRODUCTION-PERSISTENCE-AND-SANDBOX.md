# Production Persistence and Sandbox Configuration

## Persistence
Practice Studio production persistence should use PostgreSQL for canonical state and an object store for large artifacts.

The PostgreSQL repository implementation:
- requires tenant scope on every query;
- uses append-only inserts for events and evidence;
- computes an integrity hash for evidence when one is not supplied;
- supports optimistic world-state versioning to prevent silent concurrent overwrites.

## Sandbox integrations
Live GitHub/AWS integrations are disabled by default.

Activation requires explicit environment configuration.

### GitHub
Required for live sandbox:
- PRACTICE_STUDIO_GITHUB_ORG
- optional repository prefix
- mutation flag defaults false

### AWS
Required for live sandbox:
- PRACTICE_STUDIO_AWS_ACCOUNT_ID
- PRACTICE_STUDIO_AWS_ROLE_ARN
- region defaults us-east-1
- mutation flag defaults false
- session duration defaults 90 minutes

## Safety rule
Read-only observation should be activated before mutation.

Do not enable mutation until:
- sandbox isolation is independently verified;
- budgets/quotas/TTL teardown exist;
- least-privilege role has been reviewed;
- no production resources are reachable;
- test employee teardown is verified.
