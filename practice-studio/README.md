# Practice Studio

Practice Studio is a standalone SozoRock Technology product incubated in this repository until its core contracts and engine boundaries are stable enough to extract into a dedicated repository.

## Product boundary
This directory must not depend on SozoRock School frontend code.

School is an initial licensed deployment of Practice Studio, not the owner or category of the product.

## Extraction rule
Practice Studio should move to its own repository before:
- production tenant onboarding;
- external customer licensing;
- independent deployment;
- vendor secrets or infrastructure specific to Practice Studio;
- product release cadence diverges from sozorock.com;
- School-specific requirements begin pressuring core engine architecture.

## Initial package layout
- src/domain — canonical product entities and types
- src/events — event schema and validation
- src/engine — world-state and consequence processing
- src/adapters — external system adapter contracts
- src/evidence — evidence ledger and capability mapping
- src/tenancy — tenant and licensed deployment model
- src/scheduling — workplace time/event orchestration
- src/people — persistent simulated-person contracts

No School admissions, credential issuance, marketing pages, or curriculum administration belong in this package.
