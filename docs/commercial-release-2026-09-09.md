# Commercial website release, September 9, 2026

The corporate homepage represents SozoRock Technology across AI, data infrastructure, cybersecurity, product engineering and School. CB-CAP is the flagship product, not the entire company. The New York technology entity remains distinct from the Foundation and the Canadian technology entity.

## Approved visual and content decisions

- Locally hosted Instrument Sans; white, ink #132B42, cobalt #214FCC and teal #23616B. School retains its separate established design and typography.
- Spacious typography and varied section composition replace repeated full-width divider rules. Rules remain where they distinguish interactive controls or accordion items.
- Primary navigation: What we do, CB-CAP, Insights, Company, School and Talk to us. Capability pages contain distinct work, applications and engagement content. Company includes About and How we work; legal links remain in the footer.
- Use American English. Spell out small counts in narrative, such as four programs; retain numerals in measurements, fees, indexes and durations such as 12 weeks.
- CB-CAP leads with access barriers, forecasting and planning by community and ZIP area. Applications include CHA/CHIP, service capacity, funding, health systems and life sciences.

## Functional scope

CB-CAP provides an interactive public demonstration: geographic selection, map zoom, barrier switching, scenario comparison, forecast horizon and reviewable scenario export. The map contains 88 historical 2010 Census ZCTA areas. Barrier values, service locations, coverage and forecasts are synthetic illustrations, not resident records or validated predictions. Production institutional use requires agreed sources, permissions, evaluation and governance.

The corporate contact and demo enquiry routes use the existing receipt-backed contact system. No new contact backend, application activation, administrator access or infrastructure is introduced.

## School preservation

The complete School homepage, four program journeys, supporting pages, established motion assets, fees and independent styles remain in this build. School source, its page generator, application/admin source and operational configuration are unchanged. The School prerender process is isolated from Vite's browser dependency optimization so it builds reliably with the added corporate island dependencies.

## Validation and release

Run `npm run verify`, then both existing browser acceptance suites against the production build with CSP enforced. The corporate suite covers 16 routes across nine viewport widths plus interaction, no-JavaScript, contact retry and legacy-link checks. School's acceptance suite covers nine viewport widths and its existing journeys and failure cases.

Publish through the existing guarded main-branch AWS workflow. It verifies operational acceptance, stages an immutable release, preserves mutable intake/admin configuration and runs live acceptance with rollback. A local pass is not evidence of live deployment. The workflow's production-result.json is the release record.

Enterprise references informed navigation, clear product explanation and typographic hierarchy. This is SozoRock's own design; no endorsement, implementation or commercial relationship with Accenture, Deloitte or Cloudflare is implied.
