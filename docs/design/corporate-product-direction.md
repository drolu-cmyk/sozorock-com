# Corporate and CB-CAP direction, September 9, 2026

## Decision

Select **Technology for complex operations.** Use white, near-black, the existing mineral accent `#a63f2b`, Source Sans 3, large editorial type and deliberate section changes. Corporate navigation: CB-CAP, What we do, School, Insights, About; Talk to us as the main corporate action.

Three native hero territories were developed: an open editorial composition for “Technology for complex operations”; an inverse, tightly stacked composition for “Engineering for complex work”; and a centered statement for “Built for complex operations.” The first is the clearest umbrella for the four disciplines. The inverse direction is too engineering-specific as the corporate opening. The centered direction is concise but leaves more explanatory work to the next section.

Reference principles were reviewed from Accenture's corporate homepage and Deloitte's CortexAI product story: strong hierarchy, clear product identity, concise positioning, disciplined navigation and a product-specific conversion. These are inspiration, not claims of a visual clone or affiliation.

- https://www.accenture.com/en
- https://www.deloitte.com/ca/en/products/cortex-ai.html

## Explicit corrections

The user rejected screenshots, pasted Foundation interfaces and the previous hero concepts. No screenshot is used in the new corporate or CB-CAP experience. Browser acceptance retains behavioral assertions and disables image capture. The product interface is newly implemented in this repository.

CB-CAP is positioned as a SozoRock Technology commercial product at `/cb-cap`, with a dedicated `/cb-cap/request-demo` route. Its journey never sends visitors to the Foundation website. Place Intelligence is removed from commercial navigation, content, sitemap and routes. The old `/work/cb-cap` redirects to `/cb-cap`; retired Place Intelligence returns 404. School remains a distinct applied-learning activity and retains its approved sculpture.

## Evidence experience

The public experience has state/county selection and three measures. Explore shows the estimate, population, FIPS code and confidence interval. Compare keeps the measure constant across two counties in one state. Trace carries the selected geography and measure to the dataset, source years and interpretation limits. It uses semantic controls and real text, with a static Albany County evidence reading when JavaScript or the data request is unavailable.

Data is a bounded extract of public CDC PLACES estimates from the verified July 14, 2026 snapshot. Provenance is in `src/data/cbcap-provenance.json`. Only source measures are included; composite planning scores, inferred counts and patient-level data are excluded. The data remains a dated snapshot, with missing values retained as null. It is not advertised as a live data connection or an activated institutional platform.

## Operational boundaries

Demo requests use the existing durable corporate enquiries endpoint, with a visible demo context and a fixed CB-CAP prefix in the stored message. There is no invented calendar confirmation or email acknowledgment. Existing receipt identity and retry behavior are retained. Backend email notification and a broader staff inbox require separate operational work.

The broader attached brief remains in progress: School intake/notification end-to-end verification, backend admin expansion, mail configuration, entity documentation and legal review are not completed by this visual release. AWS console access from the cloud browser was unavailable. The hosting release continues through the existing GitHub OIDC workflow for account `791860731989` in `us-east-1`; registrar and Foundation infrastructure are outside this change.

## Validation

The normal build and server tests are required. Additional contracts verify county identity, confidence intervals, missing values, commercial-domain separation and readable evidence without JavaScript. Corporate browser acceptance covers the live product controls and responsive overflow at nine widths. CI performs those checks before authenticating to AWS, then applies the existing operational-acceptance, immutable-release and recovery checks. No release gate is bypassed.
