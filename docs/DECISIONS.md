# Architecture Decisions

## ADR 001 — Use Astro static site

Astro is used because Mishan is content-heavy, needs fast static pages, and should not require a custom backend for MVP.

## ADR 002 — Use JSON content files

Pets and volunteers are stored as JSON under `src/content/` because Decap CMS can edit JSON forms cleanly and Astro can import the data at build time.

## ADR 003 — Use manual bilingual fields

Public content uses explicit `en` and `uk` fields. UI labels live in `src/i18n/ui.ts`. Live automatic translation is avoided because adoption/donation copy needs human trust and accuracy.

## ADR 004 — Keep stable pet URLs

Pet slugs must remain stable after QR codes are printed. Adopted pets should be marked as `adopted`, not deleted.

## ADR 005 — Defer Cloudinary

Cloudinary is useful for real media volume, but it is intentionally deferred. The MVP uses local placeholder images to keep the skeleton easy to understand.

## ADR 006 — Netlify + Decap CMS for admin-only editing

Netlify Identity and Git Gateway allow multiple invited admins to edit content without direct GitHub repository access.
