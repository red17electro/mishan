# Deployment Guide

## Recommended MVP hosting

Use Netlify with a free subdomain such as:

```text
mishan-shelter.netlify.app
mishan-pets.netlify.app
mishan-rescue.netlify.app
```

A paid custom domain can be added later.

## Build settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | Netlify default modern Node is fine |

## Pages CMS setup

After the site is connected to Netlify:

1. Open [app.pagescms.org](https://app.pagescms.org).
2. Connect the GitHub repository.
3. Point Pages CMS at the repo root; config is in `.pages.yml`.
4. Invite editors who should manage pets, volunteers, and page copy.
5. Save a test edit and confirm Netlify rebuilds the site.

For local development, editing JSON files directly in `src/content/` is also fine.

## Deployment verification checklist

- [ ] `/en` loads
- [ ] `/uk` loads
- [ ] `/en/pets` filters and sorts
- [ ] `/uk/pets` filters and sorts
- [ ] Pet profile URLs load directly
- [ ] Invited editor can log in to Pages CMS
- [ ] Editor can create/edit a pet
- [ ] Netlify rebuilds after CMS publish
- [ ] Donation URL is replaced before real launch
