# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2026.x  | ✅ |

## Reporting a Vulnerability

Please report security vulnerabilities privately to:

**security@malenglegacy.co.za**

Do **not** open public GitHub issues for security reports.

We aim to acknowledge reports within 48 hours and provide a remediation timeline within 7 days.

## Security Baseline (Platform)

- All provider credentials are injected via environment variables or a secrets manager. They never appear in source control or in `hosting-catalog.json`.
- The public catalogue contains only commercial data. Internal cost, margin and provider-specific IDs are kept in the private backend.
- The API layer enforces authentication, authorisation and rate limiting.
- All external integrations are isolated behind adapter packages under `integrations/`.
- Secrets scanning is enabled in CI.
- Dependencies are kept up to date via Dependabot / Renovate.

## Scope

In scope:
- Authentication & session handling
- Payment flows
- Provider API token handling
- Customer data isolation
- Privilege escalation between customers

Out of scope:
- Denial-of-service against third-party providers
- Social engineering of Maleng Legacy staff
