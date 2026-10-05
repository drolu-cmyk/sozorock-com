# CB-CAP public decision brief

The public tool now completes a bounded planning task: it takes user-supplied aggregate service requests, current capacity, added capacity and incremental monthly operating cost; produces a capacity and budget comparison; and exports a brief with provenance, an accountable team, an outcome target and a review date. Inputs remain in React memory. They are not transmitted, cached in browser storage or written to the engagement API. The user may explicitly download a plain-text brief.

## Calculation contract

All capacities and demand refer to the same service, operating area and monthly period. The unit is service requests, not unique residents. Demand is constant. Added capacity is assumed usable. Current gap is `max(demand - capacity, 0)`; planned gap is `max(demand - capacity - added, 0)`; applicable added capacity is the difference between these gaps. Operating budget is additional monthly operating cost multiplied by the chosen whole-month period (1–36). Unit cost divides monthly cost by applicable added capacity, and is unavailable when that denominator is zero. One-time costs, existing costs, backlog, seasonality, constraints and downstream savings are excluded. The calculator does not infer demand from the sample map.

The sample map remains an interface demonstration. Its indices, locations and projection are synthetic; Historical 2010 Census ZCTAs are geographic context, not current USPS routes or local service catchments. The calculator accepts the actual operating area as a separate field. The separate county evidence panel uses the existing CDC PLACES 2025 county snapshot published July 14, 2026. Its release date is December 4, 2025; underlying source years are BRFSS 2023/2022, Census 2023 and ACS 2019–2023/2018–2022. The panel preserves confidence intervals and unavailable estimates and does not apply county estimates to ZIP areas or turn prevalence into service demand.

## Research grounding and limits

The complete *Rural Equity Blueprint Series, Volume 1: Access Day—Building a Framework for Rural Health Equity in New York State* (October 2025, ISBN 979-8-9936477-0-8, 56 pages) was reviewed for this workflow. Pages 15–16 describe operational and outcome measures linked through a governance cadence; pages 43–46 assign partner responsibilities and explain outcome review, financing and institutional memory. These principles support attaching sources, ownership and review to an exported brief.

Page 52 explicitly states that the publication's findings and figures are modeled projections prepared before pilot deployment. Pages 26–29 also label the efficiency and workforce figures as simulations. These percentages are not customer results, validated CB-CAP effects, or promises used by this tool. The publication does not name CB-CAP; this implementation derives requirements from its governance principles rather than claiming to implement a specification in that book.

The full text of *Rethinking Rural Governance, Volume 1* was not located in the available Library or Drive. Its official publisher overview at `https://sozorockfoundation.org/publication/rrg-v1-2025` was read; it describes Foundational, Integrative and Adaptive capabilities. That overview is not a full-text review. Detailed conformity to the book remains an evidence gap.

## Institutional evaluation

The public workflow is a draft decision aid, not an authenticated shared workspace. Before institutional operation, agree on one decision, permitted sources, measurement definitions, delivery constraints, a responsible owner and review criteria. Integrations, persistent collaboration, model validation, privacy controls and observed outcome evaluation need a separately scoped implementation. Do not market the public tool as supplying them already.

## Verification

Run `node --test tests/decision-brief.test.mjs tests/county-evidence.test.mjs`. Production acceptance should enter a valid aggregate example, verify the calculated gap and budget, download the brief, change an input and confirm the stale result disappears, and confirm clear/reset removes entered values. Repeat at mobile widths. No real operational or personal data is needed.
