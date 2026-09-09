# SozoRock Technology and School design QA

## Current release candidate: September 9, 2026

Local result: passed. Live release acceptance is recorded separately by the guarded deployment workflow; a local result does not establish deployment success.

The approved corporate and CB-CAP desktop/mobile concepts were compared with the interactive implementation. The latest user refinement removes decorative section dividers and requires complete School and corporate destinations. Those refinements take precedence over the earlier mockup's repeated rules.

## Visual evidence

Evidence is stored outside the repository in outputs/release-evidence/visual alongside the local acceptance results:

- home-desktop.png and cbcap-desktop.png: rendered at 1536 by 1024 CSS pixels, full-page capture.
- home-mobile.png and cbcap-mobile.png: rendered at 390 by 844 CSS pixels, full-page capture.
- Original concept identifiers: exec-edbc1d11-c628-4a3c-91c3-989c9e309f73.png (corporate desktop) and exec-2dac9933-c4c2-4e54-ba05-cd62b65e3457.png (CB-CAP desktop).

The reference and current corporate capture were reviewed together. Hero hierarchy, type scale, split capability composition, clear product entry and restrained color are preserved. Intentional changes include removing decorative rules, functional historical geography instead of the mockup map image, and substantive School, insight and contact sections. Mobile captures were inspected for readable wrapping, complete navigation, control fit and section pacing.

## Verification

- npm run verify: production build, 18 Node tests and 17 Python tests passed.
- School browser acceptance: all nine viewport widths passed; existing programs, fees, motion, supporting pages and fault cases retained.
- Corporate browser acceptance: 16 routes at all nine viewport widths passed, including ZIP selection, barriers, forecast horizon, resource scenarios, review modal and export.
- Corporate navigation, focus handling, no-JavaScript content, legacy redirects, contact receipt retry behavior and unknown routes passed.
- Initial no-JavaScript mobile navigation overflow was fixed and the complete corporate suite rerun successfully.
- Final navigation review moved the Platform anchor to the static platform explanation. Desktop link and mobile selector were rechecked; regression coverage now requires a unique static target with and without JavaScript.
- Corporate Instrument Sans and School font/style bundles remain isolated. The planning island is approximately 99 KB gzip and uses production React.
- Git diff confirms School source, its deep-page generator, application/admin source and operational configurations are unchanged.

## Product limits and remaining evidence

The public CB-CAP experience is an interactive demonstration using historical 2010 Census ZCTA geography and synthetic planning scenarios. It does not claim live resident records, validated forecasts or an activated institutional backend. Existing real contact receipt behavior remains separate from the illustrative planning experience.

The prior root QA described a much older School prototype and an obsolete form-success behavior. It remains available in git history and is superseded by current acceptance evidence. School intake remains governed by the separate operational acceptance process.

No unresolved blocking local visual or functional findings remain. Production acceptance and the deployed commit must be verified in the release workflow before reporting this version as live.
