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

## Decap CMS setup on Netlify

After the site is connected to Netlify:

1. Open the Netlify project.
2. Enable **Identity**.
3. Set registration to **Invite only**.
4. Enable **Git Gateway**.
5. Invite admin users by email.
6. Open `/admin` on the deployed site.
7. Log in and test editing a pet.

The CMS config is in:

```text
public/admin/config.yml
```

## Local CMS testing

Decap CMS supports local backend mode, but it usually requires running the proxy server from Decap CMS tooling. For normal development, editing JSON files directly is simpler.

## Deployment verification checklist

- [ ] `/en` loads
- [ ] `/uk` loads
- [ ] `/en/pets` filters and sorts
- [ ] `/uk/pets` filters and sorts
- [ ] Pet profile URLs load directly
- [ ] `/admin` loads Decap CMS
- [ ] Invited admin can log in
- [ ] Admin can create/edit a pet
- [ ] Netlify rebuilds after CMS publish
- [ ] Donation URL is replaced before real launch
