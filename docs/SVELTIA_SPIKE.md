# Sveltia CMS spike (experimental)

This document describes the **Path E** spike: a parallel Sveltia CMS admin at `/admin-sveltia/` for evaluation only. It is **not** a production migration and does **not** replace Decap CMS at `/admin/`.

## How to open the spike

On any Netlify deploy preview or production deploy:

```text
https://<your-netlify-site>/admin-sveltia/
```

Locally after `npm run dev`:

```text
http://localhost:4321/admin-sveltia/
```

Or after a static build:

```bash
npm run build
npm run preview
# then open http://localhost:4321/admin-sveltia/
```

Production content editing remains at `/admin/` (Decap CMS).

## What is in this spike

| Path | Purpose |
|---|---|
| `public/admin-sveltia/index.html` | Loads Sveltia CMS from the official CDN (`unpkg.com/@sveltia/cms`) |
| `public/admin-sveltia/config.yml` | Spike-only config with GitHub backend (not Git Gateway) |
| `public/admin/` | **Unchanged** — Decap CMS, Netlify Identity, Git Gateway |

Netlify SPA routing for the spike is configured in `netlify.toml` (same pattern as `/admin/`).

## What is expected to work

- The Sveltia CMS UI loads from the CDN.
- The spike config mirrors Mishan pet and volunteer collections (same folders and fields as Decap).
- On Netlify, if GitHub OAuth is already linked for the site, **GitHub sign-in** may work for users with **direct GitHub write access** to `red17electro/mishan`.
- Browsing and editing the modern Screenshot for UX comparison against Decap.

## What is expected **not** to work (blockers)

Sveltia CMS **does not support** the current volunteer-friendly Netlify stack:

| Decap / Netlify feature | Sveltia spike status |
|---|---|
| `backend: git-gateway` | **Not supported** — Sveltia explicitly excludes Git Gateway ([backends docs](https://sveltiacms.app/en/docs/backends), [migration guide](https://sveltiacms.app/en/docs/migration/netlify-decap-cms)) |
| Netlify Identity invite-only login | **Not supported** — Identity is tied to Git Gateway; Sveltia does not use the Identity widget |
| Editorial workflow (`publish_mode: editorial_workflow`) | **Not supported yet** — omitted from spike config |
| `local_backend` / Decap proxy server | **Ignored** — Sveltia uses its own local workflow |

**Conclusion:** Sveltia **cannot** preserve the current invite-only Netlify Identity + Git Gateway flow without a different auth model (for example GitHub OAuth with repository collaborators, or a self-hosted OAuth client such as [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)).

Volunteers who only have Netlify Identity invites (no GitHub repo access) should **not** use this spike for editing.

## Spike config vs Decap config

The spike uses a **separate** `public/admin-sveltia/config.yml` because:

1. `backend: git-gateway` must not be used (Sveltia will not load it correctly).
2. `publish_mode: editorial_workflow` is removed (unsupported).
3. `local_backend: true` is omitted (ignored by Sveltia).

Collections and media paths are copied from `public/admin/config.yml` so the spike exercises the same content model.

## Rollback / no-risk story

- **Decap is untouched:** `/admin/`, `public/admin/index.html`, and `public/admin/config.yml` are unchanged.
- **No Identity or Git Gateway changes:** this PR does not modify Netlify Identity, Git Gateway, or editorial workflow settings.
- **Remove the spike:** delete `public/admin-sveltia/`, the `/admin-sveltia/*` redirect in `netlify.toml`, and this doc. No migration of production admin is required.

## References

- [Sveltia CMS — Getting started](https://sveltiacms.app/en/docs/start)
- [Sveltia CMS — Migrating from Netlify/Decap CMS](https://sveltiacms.app/en/docs/migration/netlify-decap-cms)
- [Sveltia CMS — Backends](https://sveltiacms.app/en/docs/backends)
- Mishan deployment: `docs/DEPLOYMENT.md` (Decap production path)
