# Practice Studio Threat Model and Security Controls

Status: Initial security baseline
Scope: Core product and IAM vertical slice

## Assets to protect
- participant identity and profile;
- simulated enterprise state;
- evidence ledger and professional artifacts;
- voice transcripts and recordings where enabled;
- integration credentials;
- AWS/GitHub/email/IAM sandbox environments;
- assessor notes;
- tenant configuration;
- cost controls and billing metadata.

## Trust boundaries
1. Participant device -> Practice Studio application.
2. Practice Studio application -> core API.
3. Core API -> model/voice providers.
4. Core API -> external professional systems.
5. Tenant A -> Tenant B.
6. Simulation state -> external real systems.
7. Participant -> assessor/operator surfaces.
8. Product engine -> School or other licensed operator.

## Primary threats and required controls

### Cross-tenant access
Risk: participant or operator reads another tenant's state/evidence.
Controls:
- tenant_id on every persisted entity;
- server-side authorization;
- explicit tenant scope checks;
- no client-supplied tenant trust;
- tenant-aware object-storage prefixes and keys;
- automated isolation tests.

### Real-system escape
Risk: sandbox credentials reach production or external systems.
Controls:
- dedicated sandbox accounts/organizations;
- no production credentials;
- strict allowlists;
- service control policies / permission boundaries;
- outbound network restrictions where feasible;
- automated teardown;
- short-lived credentials.

### Cloud cost abuse
Risk: participant intentionally or accidentally creates expensive resources.
Controls:
- per-employee budgets;
- quotas;
- denied high-risk services/regions;
- TTL tagging;
- scheduled cleanup;
- emergency kill switch;
- cost telemetry surfaced to operator.

### Prompt/model manipulation
Risk: participant induces simulated people to reveal hidden state, scoring logic, secrets, or operator instructions.
Controls:
- authoritative state outside prompts;
- least-data prompt construction;
- explicit tool authorization layer;
- secrets never included in model context;
- hidden assessment logic not exposed to conversational agents;
- output validation and policy checks.

### Evidence tampering
Risk: participant or model alters past evidence.
Controls:
- append-only event/evidence ledger;
- integrity hashes or signed references where practical;
- artifact versioning;
- immutable source references;
- audit logs for assessor changes.

### Voice privacy
Risk: recordings/transcripts exceed necessary retention or are used beyond purpose.
Controls:
- text alternative always available;
- configurable recording policy;
- transcript/recording separation;
- tenant retention settings;
- explicit consent where required;
- provider retention settings reviewed before use.

### Simulated-person inconsistency
Risk: model invents facts or contradicts authoritative state.
Controls:
- world facts from state service;
- person memory stored separately from model chat history;
- retrieval scoped by person knowledge;
- responses treated as generated interaction, not state mutation;
- state changes require explicit authorized actions.

### Unsafe cybersecurity practice
Risk: exercises enable uncontrolled external offensive activity.
Controls:
- isolated targets;
- no arbitrary external host targeting;
- restricted tools/network;
- monitored commands/actions;
- safe synthetic data;
- prohibited actions blocked at adapter layer.

### Privilege escalation in product
Risk: participant reaches operator/assessor/admin features.
Controls:
- separate roles and routes;
- server-side RBAC/ABAC;
- MFA for operator/assessor roles;
- no shared accounts;
- privileged action logging.

## Security release gates
Before real providers are connected:
- tenant isolation tests pass;
- secrets strategy defined;
- sandbox account boundary documented;
- cost kill switch designed;
- audit logging implemented;
- data retention policy configurable;
- operator/admin MFA path designed;
- incident response runbook drafted.

Before external pilot:
- independent security review;
- abuse test;
- provider data-processing/retention review;
- backup/restore test;
- teardown test;
- accessibility verification;
- privacy notice and participant consent reviewed.
