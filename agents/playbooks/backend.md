# Backend Quality Checklist

Use only for substantial or ambiguous backend, API, schema, auth, or data work. Preserve the request's intent and effect ceiling; this checklist never authorizes implementation.

- Define contracts and ownership boundaries before implementation when they matter.
- Validate untrusted input at system edges and return consistent errors.
- Check authentication, authorization, ownership, tenant isolation, and secret handling.
- Prefer idempotency for retries, jobs, and external callbacks.
- Check pagination, indexes, query growth, transactions, and migration rollback/data safety.
- For auth, permissions, secrets, tenants, payments, webhooks, or untrusted input, apply the safety overlay.
- Verify with the smallest relevant tests, queries, migration checks, schema diffs, or smoke checks.
- State material residual risk; do not broaden an inspect, diagnose, or proposal request into a code change.
