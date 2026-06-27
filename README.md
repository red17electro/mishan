# Mishan

Mishan is a volunteer-friendly website skeleton for a Kherson animal shelter that helps homeless pets find adopters and donors.

The current implementation is an MVP foundation:

- Astro static website
- English and Ukrainian routes
- Pet catalog with client-side filtering and sorting
- Stable pet profile URLs for QR codes
- Placeholder PayPal donation page
- Placeholder volunteer contact page
- Pages CMS configuration for invite-only editors
- Test pet data and placeholder media

## Tech stack

- [Astro](https://astro.build/) static site
- [Pages CMS](https://pagescms.org/) for admin editing
- Netlify for static hosting
- JSON content files for pets and volunteers

## Local development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:4321/en
http://localhost:4321/uk
```

## Quality checks

```bash
npm run check
npm run build
```

## Content structure

```text
src/content/pets/*.json
src/content/volunteers/*.json
```

Pet pages are generated at:

```text
/en/pets/{slug}
/uk/pets/{slug}
```

Keep slugs stable after printing QR codes.

## Admin CMS

Content is edited through [Pages CMS](https://app.pagescms.org). The site header links to the admin UI.

CMS config lives in:

```text
.pages.yml
```

For production, connect the GitHub repository on Pages CMS and invite editors there. Netlify rebuilds automatically after content commits.

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Documentation

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md)
- [`docs/DECISIONS.md`](docs/DECISIONS.md)
