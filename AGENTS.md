# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Current visual direction (September 2026)

The user superseded the earlier glass-panel prototype with full creative freedom. Use a full-bleed illustrative professional-learning scene and white overlay text. Keep silent, pausable image-animation video and reduced-motion/data-saving still fallback. Use Manrope, white, forest green, and subject-specific ochre, blue and burgundy accents. Programs must have distinct copy, meaningful visual artifacts and genuinely different practice interactions. No emoji icons, purple gradients, invented outcomes or fake admissions receipts. Keep motion optional and reduced-motion support complete. Use the real director portrait only; hero people are illustrative, not actual students.

Review with four independent angles: visual originality, detail/contrast, typography, and responsive/accessibility. Verify real browser screenshots and interactions before handoff.

## Deployment separation and simplification

- This repository serves only www.sozorock.com and its sozorock.com redirect. Regional resources stay in us-east-1; DNS account is 149086500999 and hosting account is 791860731989.
- Canada is a separate repository, AWS account, programme, and backend. Never route this site's applications to Canada or reuse its account configuration.
- Prefer removing unsupported behavior over adding complexity. Never display a submission receipt without a confirmed durable backend write. Online intake stays unavailable until an independent US backend is implemented and verified.
