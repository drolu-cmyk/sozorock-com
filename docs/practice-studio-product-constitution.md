# Practice Studio Product Constitution

Status: Approved product direction
Owner: SozoRock Tech Inc.
Product owner: Dr Oluwabiyi Adeyemo

## Product definition
Practice Studio is a persistent enterprise work simulation platform. Participants enter a simulated organization as employees for the duration of their program, under their registered identity and role, and work inside a living digital workplace connected to controlled real professional tools. The environment is simulated; the practice is real.

Practice Studio is not an LMS, certification-prep course, quiz platform, virtual lab, or collection of isolated scenarios. It is an employment-like experience in which learning, required training, contextual support, debriefing, assessment, and evidence collection are embedded in work.

## Governing design principle
Never ask how to turn learning into a simulation. Ask what the employee would experience at work, then determine how learning and assessment belong naturally inside that experience.

## Experience model
A participant's program duration is the simulated employee contract period. The learner is treated in-product as an employee while legal and public-facing surfaces remain explicit that the employment is simulated.

The employee receives:
- registered-name identity and professional role;
- reporting line, team, responsibilities, calendar, email, meetings, files, systems, and workplace communications;
- controlled access to real or production-like professional environments such as AWS, GitHub, IAM, cybersecurity, data, and AI tooling as applicable;
- normal work, assignments, engagements, incidents, required training, one-page briefings, stakeholder interactions, and debriefs;
- natural voice and text interaction, including speech-to-text and text-to-speech;
- persistent consequences from decisions and actions;
- evidence-based assessment grounded in what the employee actually did.

## Product language
Prefer workplace language.

Use:
- employee or participant where legally necessary
- situation, assignment, engagement, incident, matter
- briefing, one-pager, required training
- manager, colleague, client, stakeholder
- workplace, workday, contract period
- demonstrated capability
- evidence of work

Avoid as primary product language:
- learner dashboard
- module
- lesson
- quiz
- scenario library
- gamification
- XP
- streak
- NPC
- AI character
- AI feedback
- course progress

## Interface principle
The authenticated experience must feel like reporting to work, not opening a course portal.

Preferred shell:
Today | Work | People | Messages | Meetings | Files | Systems | Support

A typical entry should read like:
Good morning, Olu.
You have two unread messages. Your 9:30 team check-in has moved to 9:15.

Do not default to course cards, module grids, percentage-complete rings, badges, or "Start Scenario" controls.

## Workplace realism
Not every day contains a crisis. Ordinary work is necessary for credibility. The world should contain:
- stand-ups and scheduled meetings;
- research and analysis;
- access requests and approvals;
- email and chat;
- required training;
- one-page briefings;
- waiting on other teams;
- manager feedback;
- deliverables and revisions;
- changing priorities;
- incidents that emerge from otherwise ordinary work.

## Learning support
Participants may be beginners or crossing into unfamiliar domains. Support must be contextual and optional rather than theory-first.

Examples:
- plain-language definitions;
- acronym explanations;
- one-page primers;
- examples;
- policy excerpts;
- optional deeper resources;
- manager or mentor guidance.

Support should help the employee continue the work without giving away the answer.

## Voice and communication
Voice is an interaction modality, not merely narration.

The employee can speak or type. Simulated managers, colleagues, clients, and stakeholders can respond naturally through voice and text. Meetings, calls, debriefs, incident bridges, voicemails, and briefings may use speech.

Voice providers must be benchmarked for naturalness, latency, interruption handling, speech recognition accuracy, concurrency, privacy, reliability, tool use, and cost. No single provider is assumed by default.

## Real systems
Where safe and permitted, Practice Studio should integrate real controlled professional systems rather than fake their interfaces.

Examples:
- AWS sandbox accounts and services;
- GitHub repositories, branches, issues, pull requests, and actions;
- isolated email and calendar;
- IAM environments;
- cybersecurity and SIEM tooling;
- data and AI systems.

The simulation engine provides the world, context, state, and consequences. Real tools provide the work.

## Persistent state
The environment remembers:
- what the employee saw;
- what information was available at the time;
- actions taken;
- communications;
- changes made in real systems;
- decisions and approvals;
- downstream consequences;
- previous feedback and work history.

Yesterday can affect tomorrow.

## Evidence and assessment
Assessment is based on evidence of work rather than completion alone.

The evidence model should capture:
employee -> timestamp -> context -> information available -> action -> system -> result -> consequence -> supporting evidence

Assessment should examine:
- investigation;
- execution;
- evidence use;
- judgment;
- communication;
- professional artifacts;
- response to feedback;
- technical correctness where applicable;
- awareness of uncertainty and limits.

The product should be able to reconstruct a professional episode and support a grounded debrief.

## Debriefing
After significant work, the employee may attend a manager debrief using voice and/or text. The debrief must be grounded in the employee's actual actions.

Example prompts:
- Walk me through what happened.
- What evidence supported that decision?
- What alternatives did you consider?
- What would you do differently?
- What should happen next?

## Required training
When training is mandatory, the workplace assigns it as an employer would. Required sessions can use natural voice, text, examples, short reference material, acknowledgment, and work-based follow-up.

Training should not break the workplace illusion by reverting to a conventional LMS unless the workplace context genuinely calls for a course-like compliance session.

## Four pathways
The initial pathways remain:
- Applied AI Systems
- Cybersecurity GRC
- Cybersecurity Identity & Access Management
- AI Governance

They are professional roles/pathways inside the same simulated enterprise, not four isolated course worlds. A single organizational event may affect multiple pathways differently.

## Product architecture
Practice Studio should be understood as:
SozoRock School -> Practice Studio -> Practice Studio Engine -> Simulated Enterprise -> Professional Pathway -> Employment Period -> Work + people + real tools + events + development -> Evidence of demonstrated capability

## Proprietary product layer
Do not rebuild commodity tools solely to own them. The defensible product is the orchestration layer that connects:
identity -> role -> enterprise state -> people -> real systems -> communications -> events -> actions -> consequences -> evidence -> assessment

## Safety and trust
The system must provide:
- strict cloud and account isolation;
- least privilege;
- cost limits and quotas;
- abuse prevention;
- safe failure;
- secrets protection;
- clear data retention;
- learner privacy controls;
- accessible alternatives to voice/video;
- auditability;
- human review where professional judgment or validity requires it.

## Public positioning
Primary product descriptor:
Persistent enterprise work simulation platform.

Short description:
A workplace you can enter.

Core statement:
The environment is simulated. The practice is real.

Elevator pitch:
SozoRock School is a workplace-practice environment where participants develop professional capability by working inside a persistent simulated enterprise for the duration of their program. Each participant joins as an employee under their own name, receives a role, manager, email, responsibilities and controlled access to real professional tools such as AWS, GitHub and applicable cybersecurity, identity, data and AI systems. They attend meetings and required training, receive briefs and one-page guidance, communicate with colleagues by voice, text and email, investigate evolving workplace situations, make decisions, deliver professional work and participate in debriefs. The workplace remembers what they do, and their decisions can change what happens next. Instead of measuring learning primarily through lectures and quizzes, SozoRock assesses the evidence of work: how participants investigate, use tools, exercise judgment, communicate, respond to changing conditions and produce the artifacts expected in professional practice.
