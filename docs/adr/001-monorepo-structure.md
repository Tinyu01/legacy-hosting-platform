# ADR-001: Monorepo Structure

## Status

Accepted

## Context

Legacy Hosting will consist of multiple applications (storefront, cloud portal, API) and shared libraries (catalogue, pricing, UI, auth). These components evolve together and share types and business rules.

## Decision

We will use a **pnpm + Turborepo monorepo** with the following layout:

- `apps/` — deployable applications
- `packages/` — shared internal libraries
- `integrations/` — external provider adapters
- `catalog/` — commercial source of truth
- `docs/` — architecture, ADRs, operations

## Consequences

**Positive**
- Atomic changes across frontend + API + catalogue
- Shared TypeScript types without publishing packages
- Single CI pipeline and consistent tooling

**Negative**
- Larger repository
- Requires discipline around package boundaries

## Alternatives Considered

- Multiple repositories (rejected — coordination overhead too high for a small team)
- Single Next.js app with API routes only (rejected — insufficient for complex provisioning and portal)
