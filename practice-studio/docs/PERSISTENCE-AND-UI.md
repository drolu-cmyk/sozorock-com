# Durable Persistence and Employee UI Notes

## Persistence
The initial production persistence target is PostgreSQL plus object storage.

PostgreSQL stores tenant-aware canonical records for employees, people, world state, events, consequences, evidence, capability records, scheduled events, and person memory.

Object storage stores large or binary artifacts such as recordings, transcripts, exported logs, screenshots, submissions, generated media, and report files.

The event/evidence model remains append-oriented. Mutable summaries such as current world state or capability status can be rebuilt or audited against immutable history.

## UI boundary
The employee UI never computes authoritative state, assessment, or consequence rules locally.

The UI receives a workplace view model and renders the organization as a workplace:
Today | Work | People | Messages | Meetings | Files | Systems | Support

The authenticated shell should feel operational rather than educational. School-specific admissions, credential, payment, and curriculum administration remain outside this product surface.

## Initial visual direction
- calm professional workplace;
- no course cards;
- no LMS left rail;
- no XP, badges, streaks, or progress rings;
- no generic cyber imagery;
- limited use of panels;
- strong typography and temporal hierarchy;
- communications and scheduled work should feel live;
- real-system launch points should be contextual, not a vendor-logo grid.

The static shell in `web/workplace-shell.html` is a structural reference only, not the final visual system.
