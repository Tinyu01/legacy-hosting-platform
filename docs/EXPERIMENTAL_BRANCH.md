# `dev/experimental` branch

**Purpose:** sandbox for storefront/UI and architecture experiments that may be discarded or never merge cleanly into `main`.

## Rules

1. **`main` stays production-safe.** Catalogue schema, pricing engine, and provider router on `main` are the source of truth.
2. **This branch may break.** UI rewrites, nav experiments, theme experiments, and dead-end layouts are allowed here.
3. **Do not put secrets** on this branch (API tokens, FOSSBilling credentials, provider keys).
4. **Prefer PRs into `main`** only for changes you intend to keep long-term.
5. **If an experiment is abandoned,** leave it on this branch or delete the branch — do not force-rewrite `main` history to "recover" it.

## Local setup

```bash
git fetch origin
git checkout dev/experimental
git pull origin dev/experimental
npm install
npm run storefront
```

## Relation to `main`

| Branch | Role |
|--------|------|
| `main` | Stable Milestone foundation + storefront you ship from |
| `dev/experimental` | Throwaway / high-churn experiments |

Created from `main` at the HostAfrica-style nav + full landing page state (2026-08-29).
