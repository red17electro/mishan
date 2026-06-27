# Mishan Implementation Plan

## Current state

This repository contains a working skeleton, not a finished production site.

## Next milestones

### Milestone 1 — Replace placeholders

- Replace placeholder PayPal link in `src/pages/[lang]/donate.astro`.
- Replace placeholder volunteers in `src/content/volunteers/`.
- Add real or licensed test media.
- Review Ukrainian copy with a native speaker if possible.

### Milestone 2 — Improve CMS workflow

- Deploy to Netlify.
- Connect the repository on Pages CMS.
- Invite first editor.
- Test creating a new pet from Pages CMS.

### Milestone 3 — Real content launch

- Add real pet profiles.
- Confirm which volunteer contacts may be public.
- Strip sensitive metadata from real photos.
- Test mobile layout.
- Test QR-code flow using pet URLs.

### Milestone 4 — Optional upgrades

- Add Cloudinary when real media volume becomes large.
- Add Russian route `/ru` without flags.
- Add adoption inquiry form.
- Add success stories.
- Add privacy-friendly analytics.
- Add custom domain if someone sponsors it.

## Development workflow

```bash
npm install
npm run dev
npm run check
npm run build
```

Commit only after `npm run build` passes.
