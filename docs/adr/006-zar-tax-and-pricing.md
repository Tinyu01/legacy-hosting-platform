# ADR-006: ZAR Billing, Tax Display & Pricing

## Status

Accepted

## Context

Legacy Hosting is a South African commercial product. Customers expect ZAR pricing, clear VAT handling and no foreign-exchange surprises.

## Decision

- **Primary currency**: ZAR (`catalog.currency = "ZAR"`).
- **Tax**: VAT-enabled. Display mode is configurable (`inclusive` / `exclusive`) via catalogue tax settings; default for storefront is VAT-inclusive where required by SA consumer norms.
- **Pricing engine**: All displayed prices are computed by `packages/pricing` from catalogue base amounts + billing cycle + tax rules. UI components never hard-code ZAR amounts.
- **Annual vs monthly**: Catalogue defines both; UI shows the active cycle and any savings callout.
- **No multi-currency storefront in v1** — single currency simplifies accounting and support.

## Consequences

- Catalogue remains the single commercial contract for price changes.
- Frontend and FOSSBilling both consume the same ZAR figures.
- Future multi-currency would require a new ADR and pricing-engine extension.
