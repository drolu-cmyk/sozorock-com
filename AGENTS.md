# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Current visual direction (September 2026)

The approved Open School direction supersedes the earlier laptop and document scenes. Use a full-bleed conceptual architectural school with four entrances, white overlay text, Plus Jakarta Sans headings, Source Sans 3 body, ink/steel and cobalt. Applied AI is cobalt, GRC teal, IAM silver and AI Governance terracotta. No tables, decorative connector lines, paper artifacts, fake dashboards, emoji icons, purple gradients or invented outcomes. Keep any scene animation optional and reduced-motion support complete. A generated still is not a Blender render or a video; describe the implemented medium accurately. Hero people are illustrative, not actual students. The director belongs in teaching/about content, never a hero CTA or footer attribution.

This US site offers four 12-week Nano-Credentials, 3–6 hours/week, virtual delivery and human assessment. Introductory US pricing: USD $49 enrollment plus USD $250 tuition, USD $299 total per program for the first US intake. No application payment; intake remains closed until independently verified. Credential issuance requires human authorization and a unique verification ID. No degree, academic credit, professional license, third-party certification or job guarantee. Keep program choices, deep-page links and selected-program application parameters consistent.

Review with four independent angles: visual originality, detail/contrast, typography, and responsive/accessibility. Verify real browser screenshots and interactions before handoff.

## Deployment separation and simplification

- This repository serves only www.sozorock.com and its sozorock.com redirect. Regional resources stay in us-east-1; DNS account is 149086500999 and hosting account is 791860731989.
- Canada is a separate product with its own repository, AWS account and backend. Never route this site's applications to Canada or reuse its account configuration.
- Prefer removing unsupported behavior over adding complexity. Never display a submission receipt without a confirmed durable backend write. Online intake stays unavailable until an independent US backend is implemented and verified.

## User corrections, September 5, 2026

US is paid professional development. Never reuse Canada’s no-tuition or CAD $10 offer. The user authorized researched introductory pricing on September 5: USD $49 enrollment plus USD $250 tuition, USD $299 total per program. Publish the total clearly wherever enrollment pricing appears. Identify the US operator as SozoRock Tech Inc., New York. Keep both products operationally separate. Preserve the approved architectural artwork; a CSS pan is not Blender. Do not invent learner quotes, enrollment totals or outcomes. Make homepage content readable without JavaScript.

Use the exact title Director of Learning, AI & Cybersecurity for Dr. Oluwabiyi Adeyemo in visible copy and metadata.
