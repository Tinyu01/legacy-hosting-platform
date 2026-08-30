# Operations

## Day-2 responsibilities

- Catalogue updates (price, product, status) go through PR + schema validation + deploy.
- Provider outages are surfaced on the public status page (`/status`) and internal alerts.
- Provisioning failures retry via job queue; permanent failures raise support tickets.
- Backups: Postgres (platform state) and FOSSBilling data on a defined RPO/RTO.

## Runbooks (to be expanded)

1. Catalogue price change
2. Provider credential rotation
3. Stuck provisioning job
4. Customer data export / deletion (POPIA)
5. Emergency storefront maintenance mode

## Contacts

- Platform / engineering: engineering@malenglegacy.co.za
- Security: security@malenglegacy.co.za
- Customer support: support channels defined on the storefront
