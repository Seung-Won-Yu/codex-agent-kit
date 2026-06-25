# Backend Playbook

Use this only for substantial or ambiguous backend, API, schema, auth, or data work.

## Principles

- Design the contract before implementation when boundaries matter.
- Validate inputs at system edges.
- Return consistent errors.
- Check auth, ownership, tenant isolation, and permission boundaries.
- Prefer idempotency for retries and external callbacks.
- Add pagination and indexes when query growth is plausible.
- Keep migrations rollback-aware and data-safe.

## Supabase/Postgres

- Use `$supabase` for Supabase Auth, RLS, Storage, Realtime, Edge Functions, and platform workflows.
- Use `$supabase-postgres-best-practices` for SQL, indexes, RLS performance, and query planning.

## Verification

- Run focused tests, queries, migrations, schema diffs, or smoke checks.
- For security-sensitive surfaces, include the relevant security skill and state residual risk clearly.
