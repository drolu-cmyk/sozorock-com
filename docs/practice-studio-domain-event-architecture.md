# Practice Studio Domain and Event Architecture

Status: Initial implementation contract
Branch: practice-studio-employment-engine

## Core aggregates

### Employee
Fields:
- employee_id
- registered_name
- preferred_name
- role_id
- pathway_id
- team_id
- manager_id
- contract_start
- contract_end
- employment_status
- timezone
- accessibility_preferences
- communication_preferences
- current_workplace_day
- permissions_profile
- evidence_profile_id

### Contract
Represents the simulated employment period.
Fields:
- contract_id
- employee_id
- pathway_id
- start_at
- end_at
- expected_weekly_hours
- required_training_ids
- role_expectations
- active_assignments
- completion_state

### Enterprise
Persistent simulated company/world.
Fields:
- enterprise_id
- legal_fiction_name
- business_units
- locations
- teams
- people
- clients
- vendors
- policies
- systems
- repositories
- data_assets
- current_state_version

### Person
Covers simulated colleagues, managers, clients, stakeholders, and human practitioners.
Fields:
- person_id
- person_type
- name
- role
- team
- authority_scope
- knowledge_scope
- relationship_state
- memory_state
- communication_channels
- availability

### System
Any simulated or real professional system.
Fields:
- system_id
- system_type
- provider
- external_reference
- environment
- access_model
- isolation_boundary
- telemetry_sources
- cost_guardrails
- teardown_policy

### WorkItem
A unit of work without implying a course module.
Types:
- assignment
- request
- incident
- engagement
- review
- approval
- research
- briefing
- required_training
- debrief
- deliverable

Fields:
- work_item_id
- type
- title
- owner
- stakeholders
- created_at
- due_at
- dependencies
- status
- source
- related_systems
- evidence_requirements
- competency_tags

### Event
Canonical representation of something that happens in the enterprise.
Fields:
- event_id
- occurred_at
- workplace_day
- actor_type
- actor_id
- source_system
- event_type
- object_type
- object_id
- context_id
- visible_to
- payload
- authoritative
- causation_id
- correlation_id

### Consequence
Records downstream change caused by an action/event.
Fields:
- consequence_id
- triggering_event_id
- applied_at
- target_type
- target_id
- before_state
- after_state
- reversible
- severity
- visibility
- follow_on_event_ids

### EvidenceRecord
Normalized assessment evidence.
Fields:
- evidence_id
- employee_id
- timestamp
- workplace_day
- source_system
- context_id
- event_type
- information_available
- employee_action
- artifact_or_target
- immediate_result
- downstream_consequence
- evidence_reference
- competency_tags
- confidence
- assessor_visibility
- integrity_hash

### CapabilityRecord
Fields:
- capability_record_id
- employee_id
- competency_id
- status
- evidence_ids
- assessor_notes
- demonstrated_at
- review_state

## Event categories

### Workplace
- workday.started
- workday.ended
- meeting.scheduled
- meeting.started
- meeting.completed
- message.received
- message.sent
- email.received
- email.sent
- briefing.assigned
- training.required
- training.completed
- deliverable.requested
- deliverable.submitted
- debrief.scheduled
- debrief.completed

### Identity and access
- identity.created
- identity.disabled
- identity.reenabled
- role.assigned
- role.changed
- access.requested
- access.approved
- access.denied
- access.granted
- access.revoked
- authentication.failed
- authentication.succeeded
- privilege.escalated
- mfa.changed

### Engineering
- repository.accessed
- branch.created
- commit.created
- pull_request.opened
- pull_request.reviewed
- workflow.failed
- workflow.succeeded
- secret.detected

### Cloud/security
- cloud.resource.created
- cloud.resource.modified
- cloud.resource.deleted
- policy.changed
- alert.raised
- log.reviewed
- finding.created
- finding.closed

### Human interaction
- person.spoke
- person.asked_question
- person.responded
- person.escalated
- manager.feedback_given
- client.requirement_changed

## State rules
1. Authoritative enterprise facts live in the world state, not in model memory alone.
2. AI-generated people may reason from world state but cannot silently overwrite it.
3. All external-system mutations must produce an internal event.
4. Consequences must be explicit and traceable to a triggering event.
5. Evidence must preserve what information was available to the employee at decision time.
6. Replays must reconstruct the sequence without depending on current model outputs.
7. Assessment may use AI assistance but final high-stakes judgments require configured human review.

## Persistence
Recommended initial pattern:
- Postgres for canonical entities and event ledger.
- Object storage for large artifacts, recordings, generated media, exported logs, and submissions.
- Event bus/queue for asynchronous integrations.
- Redis only for ephemeral session/realtime coordination, not authoritative history.

## Integration adapter contract
Every real-tool adapter must implement:
- provision(employee, role)
- authorize(employee, action)
- execute(action)
- observe(since)
- normalize(raw_event)
- teardown(employee)
- healthcheck()
- cost_status()
- evidence_links(event)

Initial adapters:
- AWS
- GitHub
- Email/Calendar
- IAM
- Voice/Realtime
- SIEM/Security tooling

## Simulation orchestration
The engine decides:
- which events are eligible;
- what dependencies are satisfied;
- what each person knows;
- what each employee can see;
- whether an action changes enterprise state;
- which follow-on events become possible;
- when a manager, colleague, client, or system should respond.

It must never expose hidden scoring rules or scenario metadata to the employee interface.

## Evidence integrity
Each evidence record should be attributable to:
- employee;
- timestamp;
- source;
- original event/artifact reference;
- state version;
- integrity hash where practical.

Assessment views should distinguish:
- observed fact;
- employee statement;
- AI inference;
- assessor judgment.

## Multiplayer readiness
Do not implement multiplayer first, but every stateful object should support:
- multiple employees;
- role-specific visibility;
- attribution;
- concurrent actions;
- conflict resolution;
- shared-event consequences.
