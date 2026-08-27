# Legacy Hosting Platform

> Infrastructure built for your next move.

Commerce & infrastructure platform for **Maleng Legacy Group**.

| Surface | Domain | Purpose |
|---------|--------|---------|
| **Storefront** | hosting.malenglegacy.co.za | Self-service commerce |
| **Cloud Portal** | cloud.malenglegacy.co.za | Customer control plane |
| **Corporate** | tech.malenglegacy.co.za | Enterprise / consulting |

---

## What is implemented (runs today)

```
legacy-hosting-platform/
│
├── catalog/
│   ├── hosting-catalog.json              ← commercial source of truth
│   └── schemas/hosting-catalog.schema.json
│
├── packages/
│   ├── types/            ← shared TS types (mirror the schema)
│   ├── catalog-sdk/       ← loadCatalog(), validation, query helpers
│   ├── pricing/           ← buildQuote() / buildDomainQuote() — ONLY place totals are computed
│   └── provisioning/      ← ProviderRouter (Hetzner vs Contabo vs future)
│
├── apps/
│   ├── api/src/routes/checkout.ts   ← wires catalog → pricing → provider router
│   └── storefront/                  ← Next.js commerce UI (in progress)
│
└── scripts/
    ├── validate-catalog.ts   ← CI: fails if catalog is malformed
    └── smoke-test.ts         ← end-to-end: pricing + provider routing
```

---

## Design decisions enforced by code

1. **Catalog is data, not code.** Adding a VPS tier or TLD = edit `hosting-catalog.json` only.
2. **Schema validation is load-bearing.** `loadCatalog()` throws on malformed data.
3. **Provider identity never leaks to the customer.** Checkout response omits Hetzner/Contabo.
4. **Provider routing is pluggable.** `ProviderRouter` takes a health source; adapters plug in later.
5. **Pricing math lives in one module.** `packages/pricing` is the only place that sums totals.
6. **Lifecycle states are real types** — `isPurchasable()` controls "Currently unavailable".

---

## Running it

```bash
git clone https://github.com/Tinyu01/legacy-hosting-platform.git
cd legacy-hosting-platform

npm install

# Validate the commercial catalogue
npm run validate:catalog

# Exercise checkout + pricing + provider router
npm run smoke
```

Expected smoke output includes a VPS quote with add-ons and a domain registration quote.

---

## Architecture

```
CUSTOMER
   │
   ▼
Storefront (Next.js)
   │
   ▼
API / checkout handler
   │
   ├── catalog-sdk  → hosting-catalog.json
   ├── pricing      → buildQuote()
   └── ProviderRouter
         ├── Hetzner
         ├── Contabo
         ├── Name.com
         └── HostAfrica / future
```

---

## Next phases

| Phase | Focus |
|-------|-------|
| **Now** | Engineered foundation (this scaffold) ✅ |
| **Phase 1** | Next.js storefront (Domains, Web Hosting, VPS configurator) |
| **Phase 2** | Real payment gateways + FOSSBilling mapping |
| **Phase 3** | Live provider adapters (Hetzner, Contabo, Name.com) |
| **Phase 4** | Cloud portal (console, metrics, DNS, billing) |

---

## Brand

```
MALENG LEGACY GROUP
│
├── Maleng Legacy Tech     → tech.malenglegacy.co.za
└── Legacy Hosting         → hosting.malenglegacy.co.za
    └── Client Portal      → cloud.malenglegacy.co.za
```

---

**Built by Maleng Legacy Tech**  
*Infrastructure built for your next move.*
