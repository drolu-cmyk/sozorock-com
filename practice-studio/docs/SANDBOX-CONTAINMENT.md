# Sandbox Lifecycle and Containment

## Objective
Allow realistic failure and experimentation inside Practice Studio without allowing participants to reach unrelated company infrastructure or create uncontrolled cost.

## Lifecycle
1. Create a tenant- and employee-scoped sandbox lease.
2. Provision only the resources needed for the current role/work.
3. Issue short-lived access.
4. Enforce service, region, network, quota and budget policy.
5. Tag all resources with lease, employee, tenant and expiry metadata.
6. Record every privileged sandbox action.
7. Warn before budget threshold.
8. Stop/disable at hard threshold.
9. Expire resources automatically.
10. Teardown at session/contract end.
11. Preserve the audit/evidence record after resources are removed.

## Initial AWS containment
Default:
- us-east-1 only;
- no Organizations/account-management APIs;
- no Route 53 Domains;
- no public IPs;
- no unrestricted internet egress;
- no cross-account actions;
- max session 90 minutes;
- max resource TTL 120 minutes;
- explicit per-lease budget.

These defaults can be loosened only for a validated use case.

## GitHub containment
Recommended:
- dedicated sandbox organization;
- employee-specific/team-specific repositories;
- no access to SozoRock production repositories;
- short-lived membership;
- branch protection where appropriate;
- mutation off until teardown and isolation tests pass.

## Emergency controls
Operators must be able to disable:
- one employee;
- one tenant;
- one provider integration;
- all mutations.

## Acceptance test
A participant may make mistakes inside the sandbox. Those mistakes must not:
- alter SozoRock production;
- reach another tenant;
- incur unbounded spend;
- remain active after expiry;
- bypass the evidence/audit layer.
