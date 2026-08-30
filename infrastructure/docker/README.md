# Local infrastructure

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

Provides:

- **Postgres 16** — platform database (`legacy` / `legacy` / `legacy_hosting`)
- **Redis 7** — queues and cache

Root `docker-compose.yml` remains as a convenience symlink-style entry for the same stack.

FOSSBilling and provider sandboxes are intentionally not started here; they are configured via environment variables when needed.
