# SozoRockSchool United States
Four virtual, human-assessed, 12-week AI and cybersecurity Nano-Credentials.

- Homepage: `src/SozoRockSchoolHomepage.jsx`; shared footer: `src/SiteFooter.jsx`; styling: `src/open-school.css`.
- Deep pages: edit `scripts/build-public-pages.mjs`, then rebuild; do not independently edit generated `public/*.html`.
- Motion sources and reproduction: [Blender guide](artwork/blender/README.md). Visual constraints: [design system](DESIGN-SYSTEM.md). Pricing authority: [US pricing](docs/us-introductory-pricing.md).
- This repo serves www.sozorock.com and its apex redirect only. Hosting account 791860731989, DNS account 149086500999; regional resources us-east-1. Never use Canada's backend or deployment configuration.
- Contact infrastructure is not an application system. Keep intake closed until its independent application, durable storage and authorized admin journey are verified. Never acknowledge an unconfirmed write.
- Use the exact title **Director of Learning, AI & Cybersecurity**. Keep one visible homepage attribution; retain descriptive portrait alt text.
- Start with `npm ci`; run `npm run verify`. Browser and release checks, architecture, access blockers and completion criteria: [engineering guide](docs/engineering.md).
- Preserve user work and regression coverage. Keep commits atomic. One owner integrates bounded work; no recursive delegation. Merge/deploy only with user authorization; main pushes deploy automatically.
