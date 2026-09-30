# Practice Studio IAM Vertical Slice

Status: Initial implementation target
Pathway: Cybersecurity Identity & Access Management

## Purpose
Prove that Practice Studio feels like reporting to work rather than completing a course.

The first slice should support one registered employee across several simulated workdays and demonstrate persistent identity, ordinary work, real-tool interaction, voice/text communication, evolving events, consequences, professional output, debriefing, and evidence-based assessment.

## Acceptance test
The slice is successful when one participant can:
1. register and enter under their own name;
2. receive a role, reporting line, team, calendar, email, and controlled system access;
3. complete ordinary work before any major incident;
4. use controlled real systems such as GitHub and AWS/IAM where safe;
5. speak or type to workplace people and receive natural responses;
6. encounter an issue that emerges through workplace evidence instead of a "Start Scenario" button;
7. make decisions that change technical and organizational state;
8. produce a professional artifact;
9. attend a manager debrief grounded in the exact actions they took;
10. leave behind a reconstructable evidence record.

## Initial employee
Example identity:
- Name: use the participant's registered name
- Role: Identity & Access Analyst
- Function: Technology Risk / Identity
- Manager: persistent simulated manager
- Contract period: program duration
- Access: least-privileged and sandboxed

## Workday rhythm
### Day 1 - Join
- onboarding communications;
- manager/team introduction;
- email and calendar active;
- identity and access orientation;
- required security/confidentiality briefing;
- first ordinary task;
- one-page reference where appropriate.

### Day 2 - Work
- stand-up;
- access request;
- repository or cloud permission task;
- colleague communication;
- manager follow-up;
- evidence-producing work.

### Day 3 - Signals
- otherwise normal work continues;
- one or more unusual signals appear across systems;
- no explicit incident label;
- employee decides whether the signals matter.

### Day 4 - Developing situation
- new evidence appears through email, logs, repository activity, access behavior, and people;
- employee investigates;
- employee may need to communicate, escalate, revoke, request, verify, or document;
- consequences depend on actions and timing.

### Day 5 - Resolve and explain
- remediation or follow-up;
- professional deliverable;
- manager briefing;
- voice/text debrief based on the employee's actual evidence trail;
- capability record updated.

## Initial product surfaces
Authenticated shell:
- Today
- Work
- People
- Messages
- Meetings
- Files
- Systems
- Support

No course cards, module tiles, XP, streaks, or progress rings.

## Engine responsibilities
### Identity Engine
Maintains employee identity, role, contract period, team, permissions, and history.

### World Engine
Maintains enterprise people, systems, policies, relationships, clients, and organizational facts.

### Time & Event Engine
Maintains workday, calendar, deadlines, queued events, dependencies, and event progression.

### People Engine
Maintains persistent simulated colleagues/managers/stakeholders with knowledge boundaries, role authority, memory, and relationship state.

### Communication Engine
Supports text, email, chat, meetings, speech-to-text, and text-to-speech.

### Work Engine
Maintains assignments, engagements, incidents, approvals, tasks, deliverables, and ordinary work.

### Real Systems Layer
Connects controlled professional tools and ingests relevant events.

### Consequence Engine
Applies technical and organizational changes caused by participant actions.

### Evidence Engine
Normalizes meaningful actions, context, available information, results, and downstream effects.

### Capability Engine
Maps evidence to competencies, debrief prompts, assessor review, and demonstrated capability.

### Support Engine
Provides contextual one-pagers, definitions, examples, policy excerpts, and optional deeper material.

## Data contract for evidence
Minimum normalized event:
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
- assessor_visibility

## Vendor evaluation
Do not hard-code a provider before benchmarking.

Voice/realtime candidates should be tested on:
- naturalness;
- speech-to-text accuracy;
- latency;
- interruption/barge-in;
- conversational turn-taking;
- accents;
- text fallback;
- tool calling;
- concurrency;
- privacy/security;
- cost per active employee-hour.

Cloud and workplace integrations should prioritize authenticity, isolation, licensing compliance, and automated teardown.

## Quality gates
Reject the slice if:
- it feels like an LMS with a game skin;
- the employee is told every time that a scenario is starting;
- workplace people forget major prior events;
- simulated people contradict authoritative enterprise state without an intentional reason;
- external tools are decorative rather than functionally relevant;
- assessment rewards only final answers and ignores evidence/judgment;
- voice is generic or obviously detached from the workplace context;
- failure can create uncontrolled external harm or cost;
- the participant cannot complete critical work without voice.

## Expansion after proof
After IAM is credible, introduce GRC, AI Governance, and Applied AI Systems into the same enterprise rather than creating separate worlds. Shared incidents should create role-specific responsibilities and evidence.
