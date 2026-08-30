# ADR-005: Secrets & Credential Handling

## Status

Accepted

## Context

The platform integrates with registrars, cloud providers and payment systems. Leaking credentials would be catastrophic.

## Decision

1. **No secrets in Git** — provider tokens, database passwords and API keys never enter the repository.
2. **No secrets in the catalogue** — `hosting-catalog.json` contains only commercial data. Provider-specific internal IDs may appear, but never credentials.
3. **Environment variables / secrets manager** — runtime configuration is injected via `.env` (local) or a secrets manager (production).
4. **Adapter isolation** — only packages under `integrations/*` may read provider credentials.
5. **CI secret scanning** — enabled; accidental commits must fail the pipeline.

## Consequences

- Onboarding requires a private secrets document or vault access.
- Local development uses `.env.example` as a template; real values stay out of Git.
- Rotation of keys does not require catalogue changes.
