# ADR-004: Headless FOSSBilling as Billing Engine

## Status

Accepted

## Context

Legacy Hosting needs invoicing, subscriptions, payment tracking and a back-office for finance operations. Building a full billing system from scratch is out of scope for the first commercial release.

## Decision

We will use **FOSSBilling in headless mode** as the billing/CRM engine only:

- Storefront and Cloud Portal never expose the FOSSBilling UI to customers.
- The Legacy Hosting API owns the customer-facing order and provisioning flow.
- FOSSBilling is driven via its API / adapter under `integrations/fossbilling`.
- Product IDs in the catalogue map to FOSSBilling products via explicit `billing.mapping` fields.

## Consequences

**Positive**
- Faster time-to-market for invoicing and tax-compliant SA billing
- Mature payment gateway integrations available
- Clear separation: commerce UI vs billing engine

**Negative**
- Dependency on FOSSBilling data model and API stability
- Occasional need to bridge concepts (e.g. configurable VPS vs fixed products)

## Alternatives Considered

- WHMCS (rejected — licensing cost and heavier coupling)
- Fully custom billing (rejected — too large for current team capacity)
- Stripe Billing only (rejected — weaker support for traditional SA hosting invoicing patterns)
