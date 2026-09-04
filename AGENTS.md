# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved SozoRockSchool Direction

- The approved visual source is the ripple hero: one smooth dark stone, four expanding rings, deep mineral green and charcoal water, cool dawn light, pure white type, one glass panel, and generous negative space.
- The page must feel unmistakably like a hands-on professional technology school, not a SaaS startup.
- Keep Courses, Experience, Outcomes, and Apply as the visitor path. Do not add About to the primary navigation.
- Keep Applied AI Systems, Cybersecurity GRC, Cybersecurity Identity and Access Management, and AI Governance distinct and prominent.
- Avoid people, classrooms, collaboration imagery, equipment, dashboard graphics, generic AI patterns, card grids, gradients, cream, purple, cyan, neon, numbering, and busy layouts.
- Use concise, specific copy and carry one visual metaphor through the whole page without introducing a competing concept.
