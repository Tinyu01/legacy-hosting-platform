# Deployment

## Environments

| Environment | Purpose | URL pattern |
|-------------|---------|-------------|
| Local | Development | localhost |
| Staging | Pre-production validation | staging.hosting.malenglegacy.co.za |
| Production | Live commerce | hosting.malenglegacy.co.za / cloud.malenglegacy.co.za |

## Local stack

```bash
# Infrastructure (Postgres + Redis)
docker compose -f infrastructure/docker/docker-compose.yml up -d
# or root convenience file:
docker compose up -d

# Apps
pnpm install
pnpm storefront   # storefront
pnpm api          # API
```

## Principles

- Catalogue is baked or mounted at deploy time; never mutated by the running app.
- Secrets injected via environment / secrets manager only.
- Storefront and Cloud Portal are static/SSR Next.js apps; API is the only component that talks to providers and FOSSBilling.
- Prefer blue/green or rolling deploys for the API; storefront can be CDN-cached aggressively for public catalogue pages.

## Checklist before production cutover

- [ ] Catalogue validated against schema
- [ ] CI green on `main`
- [ ] Secrets present and rotated
- [ ] FOSSBilling product mappings verified
- [ ] Provider sandbox credentials tested
- [ ] Status page and support channels live
