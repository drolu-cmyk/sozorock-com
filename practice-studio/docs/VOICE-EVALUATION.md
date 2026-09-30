# Voice Provider Evaluation

Practice Studio uses voice for workplace interaction, not narration. Providers are benchmarked behind one contract.

## Measures
Connection time, first-audio latency, round-trip latency, STT word error rate, interruption success, caption coverage, completed-turn rate, provider errors, concurrency behavior, and cost per active employee-hour.

## Human review
Naturalness, conversational timing, emotional fit, intelligibility, and workplace credibility.

Tests include ordinary workplace dialogue, manager challenge questions, technical terminology, names, acronyms, interruptions, background noise, and imperfect microphones.

## Fallback
Voice is never a single point of failure. Preserve conversation, transcript and work context, switch immediately to text, and allow voice to resume when healthy.

## Provider boundary
The workplace engine remains authoritative. Voice providers receive only the context required for the interaction and cannot mutate enterprise state without an authorized tool action.

Initial candidates include OpenAI, Deepgram, xAI, ElevenLabs and Cartesia. Provider selection follows measured quality, reliability, privacy/security, portability and economics rather than available credits.
