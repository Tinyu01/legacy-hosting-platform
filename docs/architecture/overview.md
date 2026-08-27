# Architecture Overview

## Purpose

Legacy Hosting is a **commerce & infrastructure platform**, not a traditional marketing website.

Customers configure products, pay, and receive provisioned infrastructure. The platform must remain independent of any single upstream provider.

## High-Level Components

```
                    INTERNET
                       │
                       ▼
        ┌────────────────────────────┐
        │     LEGACY HOSTING STOREFRONT     │
        │     hosting.malenglegacy.co.za    │
        │          (Next.js)                │
        └───────────────┬──────────────┘
                       │
                       ▼  REST / JSON
        ┌────────────────────────────┐
        │        LEGACY HOSTING API         │
        │            (NestJS)               │
        └─────────────┬──────────────┘
               │              │
       ┌───────┴───────┐     ┌──────┴───────┐
       │  FOSSBilling   │     │ Provider Router │
       │  (billing/CRM) │     └──────┬───────┘
       └───────────────┘            │
                              ┌──────┴──────┐
                              │ Hetzner / Contabo
                              │ Name.com
                              │ HostAfrica / etc.
                              └──────────────┘
```

## Key Design Decisions

1. **Catalogue is the commercial contract**  
   `catalog/hosting-catalog.json` drives the storefront, pricing, FOSSBilling mapping and portal feature flags.

2. **Provider abstraction**  
   Customers buy "Legacy VPS 1", never "Hetzner CX22". The Provider Router selects the backend at provisioning time.

3. **FOSSBilling is headless**  
   It is the billing/orchestration engine, not the customer-facing UI.

4. **Cloud Portal is a separate Next.js app**  
   `cloud.malenglegacy.co.za` focuses purely on management (console, metrics, DNS, billing history).

5. **Secrets never enter Git**  
   All provider credentials are injected via environment variables.

## Related ADRs

- [ADR-001: Monorepo Structure](../adr/001-monorepo-structure.md)
- [ADR-002: Catalogue as Source of Truth](../adr/002-catalogue-source-of-truth.md)
- [ADR-003: Provider Router Strategy](../adr/003-provider-router.md)
