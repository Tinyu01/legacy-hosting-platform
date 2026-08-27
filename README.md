# Legacy Hosting Platform

> Infrastructure built for your next move.

**Legacy Hosting** is the commerce & infrastructure platform of **Maleng Legacy Group**.

It provides domains, web hosting, cloud VPS and dedicated servers through a modern, data-driven storefront and a dedicated customer control plane.

| Surface | Domain | Purpose |
|---------|--------|---------|
| **Storefront** | [hosting.malenglegacy.co.za](https://hosting.malenglegacy.co.za) | Self-service commerce |
| **Cloud Portal** | [cloud.malenglegacy.co.za](https://cloud.malenglegacy.co.za) | Customer control plane |
| **Corporate** | [tech.malenglegacy.co.za](https://tech.malenglegacy.co.za) | Enterprise / consulting |

---

## Architecture at a Glance

```
CUSTOMER
   │
   ▼
Legacy Hosting Storefront (Next.js)
   │
   ▼
Legacy Hosting API (NestJS)
   │
   ├── FOSSBilling (billing / CRM)
   ├── Provider Router
   │     ├── Hetzner
   │     ├── Contabo
   │     ├── Name.com
   │     ├── HostAfrica / AfricanHost
   │     └── Local SA Infrastructure
   └── Cloud Portal (Next.js)
```

The **hosting-catalog.json** is the single source of truth for all commercial products.
The frontend never talks directly to any provider.

---

## Monorepo Structure

```
legacy-hosting-platform/
│
├── apps/
│   ├── storefront/          # Next.js commerce site
│   ├── cloud-portal/        # Customer control plane
│   └── api/                 # NestJS platform API
│
├── packages/
│   ├── catalog/             # Catalogue SDK + validation
│   ├── pricing/             # Pricing engine
│   ├── ui/                  # Shared design system
│   ├── auth/                # Auth utilities
│   └── types/               # Shared TypeScript types
│
├── integrations/
│   ├── fossbilling/
│   ├── namecom/
│   ├── hetzner/
│   ├── contabo/
│   ├── cpanel/
│   └── hestia/
│
├── catalog/
│   ├── hosting-catalog.json
│   └── schemas/
│       └── hosting-catalog.schema.json
│
├── docs/
│   ├── architecture/
│   ├── adr/
│   ├── api/
│   ├── deployment/
│   ├── security/
│   └── operations/
│
├── infrastructure/
│   ├── docker/
│   └── terraform/
│
├── .github/
│   └── workflows/
│
├── package.json            # pnpm workspace root
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── docker-compose.yml
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

---

## Technology Baseline

| Layer | Technology |
|-------|------------|
| Storefront | Next.js 15 + TypeScript + Tailwind |
| Cloud Portal | Next.js 15 + TypeScript + Tailwind |
| API | NestJS + TypeScript |
| Database | PostgreSQL |
| Cache / Queues | Redis |
| Billing | FOSSBilling (headless) |
| Catalogue | JSON Schema validated |
| Monorepo | pnpm + Turborepo |
| CI/CD | GitHub Actions |
| Local Dev | Docker Compose |
| Testing | Vitest + Playwright |

---

## Getting Started (Local Development)

```bash
# Prerequisites
node >= 22
pnpm >= 9
docker & docker-compose

# Clone
git clone https://github.com/Tinyu01/legacy-hosting-platform.git
cd legacy-hosting-platform

# Install
pnpm install

# Environment
cp .env.example .env

# Start infrastructure
docker compose up -d

# Run all apps in dev mode
pnpm dev
```

| Service | URL |
|---------|-----|
| Storefront | http://localhost:3000 |
| Cloud Portal | http://localhost:3001 |
| API | http://localhost:4000 |
| API Docs | http://localhost:4000/docs |

---

## Catalogue

All commercial products live in:

```
catalog/hosting-catalog.json
```

Validated against:

```
catalog/schemas/hosting-catalog.schema.json
```

Never put provider credentials or internal cost data in the public catalogue.

---

## Security Baseline

- Provider API tokens live only in environment variables / secret manager
- No secrets in Git
- Catalogue schema prevents accidental exposure of internal fields
- All external integrations go through dedicated adapter packages
- Rate limiting and authentication on the API layer

See [SECURITY.md](./SECURITY.md) for the full policy.

---

## Documentation

| Document | Location |
|----------|----------|
| Architecture Overview | [docs/architecture/overview.md](./docs/architecture/overview.md) |
| Architecture Decision Records | [docs/adr/](./docs/adr/) |
| API Contract | [docs/api/](./docs/api/) |
| Deployment | [docs/deployment/](./docs/deployment/) |
| Security | [docs/security/](./docs/security/) |
| Operations | [docs/operations/](./docs/operations/) |

---

## Roadmap (High Level)

| Phase | Focus |
|-------|-------|
| **M001** | Repository & Architecture Foundation ✅ |
| **Phase 1** | Storefront (Domains + Web Hosting + VPS configurator) |
| **Phase 2** | Backend API + FOSSBilling + Payment abstraction |
| **Phase 3** | Provisioning (Name.com, Hetzner, Contabo, cPanel/Hestia) |
| **Phase 4** | Cloud Portal |

---

## Brand Architecture

```
MALENG LEGACY GROUP
│
├── Maleng Legacy Tech          → tech.malenglegacy.co.za
│   (Enterprise / Consulting)
│
└── Legacy Hosting              → hosting.malenglegacy.co.za
    (Product Commerce Platform)
    └── Client Cloud Portal    → cloud.malenglegacy.co.za
```

---

## Licence

Proprietary — © 2026 Maleng Legacy Group. All rights reserved.

---

**Built by Maleng Legacy Tech**  
*Infrastructure built for your next move.*
