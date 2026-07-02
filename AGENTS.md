# AGENTS.md

This file gives AI coding agents the project context and operational rules for working on the Mishan website.

## Project summary

Mishan is a volunteer-friendly static website for a Kherson animal shelter. Its purpose is to help homeless pets get adopted, make donation paths clear, and let non-technical shelter volunteers maintain pet and volunteer information.

Current scope is an MVP skeleton, not a final production site.

Key goals:

- Bilingual public site: English (`/en`) and Ukrainian (`/uk`).
- Pet catalogue with stable pet profile URLs suitable for printed QR codes.
- Simple donation and volunteer contact pages.
- Pages CMS for invite-only content editing via GitHub.
- Low-cost/free hosting approach using Netlify static hosting.

## Repository and environment

- GitHub repository: `https://github.com/red17electro/mishan`
- Default branch: `main`
- Local Hermes checkout: `/root/projects/mishan`
- Local preview/deployment details may exist on the maintainer's infrastructure, but they are intentionally not documented in-repository. Do not add private access URLs, hostnames, tailnet details, or personal infrastructure details to this file.

## Tech stack

- Astro static site (`output: 'static'`)
- TypeScript for content/data types
- Plain CSS in `src/styles/global.css`
- Pages CMS config in `.pages.yml`
- Netlify deployment config in `netlify.toml`
- JSON content files for pets and volunteers

No frontend framework has been added yet; prefer Astro components and static output unless there is a clear reason to introduce client-side JavaScript.

## Important commands

Run from the repository root.

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

Quality gate before committing:

```bash
npm run build
```

`npm run build` runs `astro check` first, then `astro build`. Treat a clean build as the minimum verification for normal changes.

## Local development URLs

Default Astro dev server:

```text
http://localhost:4321/en
http://localhost:4321/uk
http://localhost:4321/en/pets
http://localhost:4321/uk/pets
```

To update a private maintainer preview after code/content changes, use the maintainer's out-of-repository infrastructure notes. Do not commit private preview URLs or access details.

Generic static preview workflow:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/pages/                  Astro routes
src/pages/[lang]/           Localized EN/UK pages
src/pages/[lang]/pets/      Pet listing and detail pages
src/components/             Reusable Astro components
src/layouts/BaseLayout.astro Shared HTML shell/navigation/footer
src/i18n/ui.ts              UI labels and locale metadata
src/lib/data.ts             Content loading and normalization helpers
src/types.ts                Shared TypeScript types
src/content/pets/*.json     Pet records
src/content/volunteers/*.json Volunteer/contact records
.pages.yml                  Pages CMS config
public/images/              Static images and uploads
docs/                       Product, deployment, content, and decision docs
```

Generated directories/files such as `dist/`, `.astro/`, and `node_modules/` are not source of truth and should not be edited manually.

## Routing and localization

Supported languages:

- `en` = English
- `uk` = Ukrainian

Important routes:

```text
/                  redirects/links toward default localized entry
/en                English homepage
/uk                Ukrainian homepage
/en/pets           English pet catalogue
/uk/pets           Ukrainian pet catalogue
/en/pets/{slug}    English pet profile
/uk/pets/{slug}    Ukrainian pet profile
/en/about          English about page
/uk/about          Ukrainian about page
/en/donate         English donation page
/uk/donate         Ukrainian donation page
/en/contacts       English contacts page
/uk/contacts       Ukrainian contacts page
```

When adding user-visible copy, update both English and Ukrainian unless the task explicitly scopes only one language. Keep translations simple, respectful, and shelter-appropriate.

## Content model

### Pets

Pet records live in `src/content/pets/*.json`. Each pet has localized name/description fields plus structured attributes for filters and profile pages.

Important pet fields include:

- `slug` — stable URL identifier; do not change after QR codes are printed.
- `name.en`, `name.uk`
- `species`: `dog`, `cat`, or `other`
- `sex`: `female`, `male`, or `unknown`
- `age_group`: `baby`, `young`, `adult`, or `senior`
- `age_value`, `age_unit`
- `size`: `small`, `medium`, or `large`
- `status`: `available`, `reserved`, or `adopted`
- `description_short.en`, `description_short.uk`
- `description_full.en`, `description_full.uk`
- `health`, `compatibility`, `photos`, `videos`, `contact`, `featured`

Pet detail pages are generated from `slug` at `/en/pets/{slug}` and `/uk/pets/{slug}`.

### Volunteers

Volunteer records live in `src/content/volunteers/*.json` and are used for public contact routing. Do not expose private contact details unless the corresponding content field is explicitly marked for public display.

## Pages CMS / admin

- CMS config: `.pages.yml`
- Admin UI: [Pages CMS](https://app.pagescms.org) (linked from the site header)
- Content changes commit to GitHub and trigger a Netlify rebuild

For production setup, see `docs/DEPLOYMENT.md`.

## Deployment assumptions

Primary intended production hosting:

- Netlify static site
- Build command: `npm run build`
- Publish directory: `dist`
- Pages CMS connected to the GitHub repository for content editing

`astro.config.mjs` currently uses a placeholder production site URL:

```js
site: 'https://mishan-shelter.netlify.app'
```

Update this when the final Netlify domain/custom domain is known.

## Product constraints and priorities

- Keep hosting and maintenance costs minimal.
- Optimize for shelter volunteers who may not be technical.
- Keep pet URLs stable for QR code use.
- Make content editing safer than direct code edits where possible.
- Be cautious with personally identifying or sensitive volunteer/contact data.
- Do not add heavy dependencies without a strong reason.
- Prefer accessible, fast static pages over complex interactive UI.
- Keep English and Ukrainian experiences equivalent.

## Working rules for agents

Before making changes:

1. Inspect the current files and `git status`.
2. Read relevant docs under `docs/` if the task touches product behavior, content workflow, or deployment.
3. Preserve the existing Astro/static-site architecture unless asked to change it.

When changing source:

1. Make the smallest coherent change.
2. Keep localized content in sync across `en` and `uk`.
3. Avoid editing generated output in `dist/`; change source files and rebuild instead.
4. Keep pet slugs stable unless the user explicitly approves a breaking URL change.
5. Do not commit secrets, real private phone numbers, private emails, or API keys.

Before reporting success:

1. Run `npm run build`.
2. If updating a private maintainer preview, verify it using out-of-repository infrastructure notes without committing private access details.
3. If pushing to GitHub, confirm the pushed commit and, if CI exists, check the workflow result.

## Documentation map

- `README.md` — short project overview and quickstart.
- `docs/PRODUCT_SPEC.md` — product goals, users, MVP scope, and acceptance criteria.
- `docs/CONTENT_GUIDE.md` — content editing guidance for pets, volunteers, photos, and statuses.
- `docs/DEPLOYMENT.md` — Netlify and Pages CMS deployment steps.
- `docs/IMPLEMENTATION_PLAN.md` — implementation phases and backlog.
- `docs/DECISIONS.md` — architectural/product decisions made so far.

## Current known state

As of the initial skeleton:

- Test pet data exists for Luna, Barsik, Rich, and Marta.
- Placeholder SVG pet images are used.
- Donation flow is a placeholder and needs final PayPal/payment details.
- Volunteer/contact data is placeholder content.
- Pages CMS config exists in `.pages.yml`; connect the repository on [app.pagescms.org](https://app.pagescms.org) for production editing.
- Any private maintainer preview is not the final public production deployment and should not be documented with access details in this repository.
