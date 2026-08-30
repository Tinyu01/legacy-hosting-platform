# Security

See also root [SECURITY.md](../../SECURITY.md) for the public reporting policy.

## Baseline controls

| Control | Implementation |
|---------|----------------|
| Secrets hygiene | ADR-005; env / vault only |
| Catalogue purity | Commercial data only; no credentials |
| Adapter isolation | `integrations/*` only touch provider APIs |
| Authn / Authz | API-owned sessions; portal never trusts client-only claims |
| Rate limiting | API edge + application layer |
| Dependency hygiene | CI + Dependabot / Renovate |
| Secret scanning | CI |

## Threat model (summary)

In scope: credential theft, cross-tenant data access, privilege escalation, payment tampering, catalogue integrity.

Out of scope for this document: physical DC security of upstream providers, social engineering of staff.

## Operational notes

- Rotate provider tokens on a fixed cadence and after any suspected exposure.
- Keep FOSSBilling and Postgres network-isolated from the public internet where possible.
- Log access to customer billing data; retain according to POPIA requirements.
