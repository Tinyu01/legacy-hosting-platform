# Contributing to Legacy Hosting Platform

Thank you for helping build Legacy Hosting.

## Development Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/short-description
   ```
2. Make focused, atomic commits.
3. Ensure tests and linting pass:
   ```bash
   pnpm lint
   pnpm test
   pnpm typecheck
   ```
4. Open a Pull Request against `main`.
5. Request review. All PRs require at least one approval.

## Commit Convention

We follow Conventional Commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `chore:` tooling, dependencies, config
- `refactor:` code change that neither fixes a bug nor adds a feature
- `test:` adding or updating tests
- `ci:` CI/CD changes

Examples:
```
feat(storefront): add domain search results component
fix(api): correct VPS pricing calculation for annual cycle
docs(adr): record decision on provider router strategy
```

## Catalogue Changes

Any change to commercial products **must** go through `catalog/hosting-catalog.json`.

- Validate against the schema before committing.
- Never hard-code product data in frontend components.
- Price changes require a corresponding FOSSBilling product mapping update (when Phase 2 is live).

## Code Style

- TypeScript strict mode
- ESLint + Prettier (run `pnpm format`)
- Prefer named exports
- Keep components small and focused
- No `any` unless explicitly justified

## Security

- Never commit secrets, API tokens or `.env` files.
- Follow the rules in [SECURITY.md](./SECURITY.md).

## Questions

Open a discussion or reach out to the platform team.
