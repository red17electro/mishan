# Mishan

Mishan is a volunteer-friendly website skeleton for a Kherson animal shelter that helps homeless pets find adopters and donors.

The current implementation is an MVP foundation:

- Astro static website
- English and Ukrainian routes
- Pet catalog with client-side filtering and sorting
- Stable pet profile URLs for QR codes
- Placeholder PayPal donation page
- Placeholder volunteer contact page
- Decap CMS admin configuration for invite-only editors on Netlify
- Test pet data and placeholder media

## Tech stack

- [Astro](https://astro.build/) static site
- [Decap CMS](https://decapcms.org/) for admin editing
- Netlify for free hosting, Identity, and Git Gateway
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

Decap CMS lives at:

```text
/admin
```

For production, deploy on Netlify and enable:

1. Netlify Identity
2. Invite-only registration
3. Git Gateway
4. Invited admin users

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Documentation

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md)
- [`docs/DECISIONS.md`](docs/DECISIONS.md)
