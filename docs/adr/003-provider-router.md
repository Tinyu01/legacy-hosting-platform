# ADR-003: Provider Router Strategy

## Status

Accepted

## Context

We will use multiple upstream suppliers (Hetzner, Contabo, Name.com, HostAfrica, future local SA providers). Customers must never be locked to a single provider, and we must be able to change or add suppliers without rewriting the storefront.

## Decision

Introduce a **Provider Router** layer between the Legacy Hosting API and concrete provider adapters.

The catalogue only declares:

```json
"providerStrategy": {
  "type": "router",
  "eligibleProviders": ["hetzner", "contabo"]
}
```

At provisioning time the router evaluates:

- Requested location
- Capacity / availability
- Current pricing / margin
- Provider health
- Product type

and selects the concrete adapter.

## Consequences

**Positive**
- True provider independence
- Ability to fail over or optimise cost without customer-visible change
- Clean separation of commercial product vs infrastructure supplier

**Negative**
- Additional abstraction layer to maintain
- Requires good observability of which provider was chosen

## Implementation Notes

- Adapters live under `integrations/`
- Credentials are injected only via environment variables
- The router decision is logged and stored against the provisioned resource for support purposes
