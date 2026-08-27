# ADR-002: Catalogue as Source of Truth

## Status

Accepted

## Context

Product definitions (prices, resources, features, eligible providers, portal capabilities) must stay consistent across the storefront, FOSSBilling, provisioning and the cloud portal.

Hard-coding products in React components or scattering them across services creates drift and makes commercial changes expensive.

## Decision

`catalog/hosting-catalog.json` is the **single commercial source of truth**.

It is validated by a strict JSON Schema and consumed by:

1. Storefront (product cards, configurators, pricing display)
2. Pricing engine
3. FOSSBilling product mapping
4. Provider Router eligibility
5. Cloud Portal feature flags

## Consequences

**Positive**
- Changing a price or adding a TLD requires no frontend code change
- Frontend remains completely provider-agnostic
- Clear audit trail of commercial decisions

**Negative**
- Requires a validation step in CI
- Schema evolution must be managed carefully

## Rules

- Never put secrets or internal cost data in the public catalogue
- Product status (`active`, `sold_out`, etc.) controls storefront visibility
- Provider strategy is expressed as `eligibleProviders`, never a hard-coded provider ID on the product
