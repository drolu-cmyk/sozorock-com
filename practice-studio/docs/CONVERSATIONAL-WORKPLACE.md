# Conversational Workplace Contract

## Principle
Simulated people are persistent workplace participants, not free-form chatbots.

Each person has:
- a role;
- authority scope;
- knowledge scope;
- relationship state;
- explicit memory;
- availability;
- communication channels.

## Grounding
Conversation receives only the enterprise facts the person is allowed to know plus relevant remembered interactions and current work context.

The model is never the authoritative source of workplace state.

A person may:
- answer;
- ask questions;
- challenge reasoning;
- provide information within scope;
- schedule follow-up;
- escalate where authorized.

A person may not:
- invent enterprise facts;
- grant access through conversation alone;
- alter logs or evidence;
- reveal hidden assessment logic;
- assume knowledge outside their role.

## Voice and text
Voice and text are equivalent supported interaction modalities.

A participant may speak or type. The product may respond with natural voice plus visible text/captions when voice is enabled.

No critical task may require audio.

## Meetings
Meetings support:
- natural turn-taking;
- interruption/barge-in;
- captions;
- transcript policy by tenant;
- role-aware participants;
- shared work context.

## Debriefs
Manager debriefs are grounded in reconstructed evidence. The manager can challenge the employee's reasoning, but cannot invent actions or outcomes.

## Provider boundary
OpenAI, Deepgram, xAI, ElevenLabs, Cartesia or other providers may supply voice/model capabilities. Provider choice must not change the product contract above.
