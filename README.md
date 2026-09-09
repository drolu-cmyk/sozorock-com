# SozoRock Technology

The website for SozoRock Technology, with CB-CAP spatial intelligence and SozoRockSchool's AI and cybersecurity programs.

- [SozoRock Technology](https://www.sozorock.com)
- [CB-CAP](https://www.sozorock.com/cb-cap)
- [SozoRockSchool](https://www.sozorock.com/school)

## Development

Use Node.js 22 and Python 3. Install dependencies with `npm ci`, then run `npm run verify`. The production build is written to `dist/client`.

Run `node scripts/preview-server.mjs` to preview the built site. Both corporate and School browser acceptance suites are included in `scripts`.

## Project structure

- `src/commercial-content.mjs`: corporate pages and navigation.
- `src/PlanningExperience.jsx`: interactive CB-CAP demonstration.
- `src/SozoRockSchoolHomepage.jsx`: School homepage.
- `scripts/build-public-pages.mjs`: School supporting pages.
- `scripts/page-shell.mjs`: page metadata and structured data.
- `src/site.mjs`: canonical routes and redirects.

Edit page sources and regenerate their HTML together. Corporate and School styles remain independent.

## Contact

For business and product enquiries, use [the contact page](https://www.sozorock.com/contact).
