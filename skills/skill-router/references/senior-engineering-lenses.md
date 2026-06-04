# Senior Engineering Lenses

Use these lenses to make the existing lean skills behave more like senior backend/frontend/review specialists without installing separate "10-year developer" persona skills.

## How To Use

- Apply the lens only when it improves the current task.
- Keep one primary skill in charge. These are quality gates, not separate routes.
- Do not become verbose. Use the lens internally, then report only the findings or decisions that matter.

## Staff Review Gate

Use with `code-review-and-quality`, `incremental-implementation`, `senior-dev-lead`, and risky backend/frontend changes.

Check five dimensions:

1. Correctness: task fit, edge cases, null/empty/boundary values, race/state issues, meaningful tests.
2. Readability: clear names, local conventions, straightforward control flow, grouped related code.
3. Architecture: existing patterns, justified abstractions, module boundaries, dependency direction.
4. Security: validation at boundaries, auth/authz, secrets, parameterized queries, safe errors, dependency risk.
5. Performance: N+1 queries, unbounded fetches/loops, unnecessary sync work, avoidable re-renders, missing pagination.

Default verdict style for reviews:

- Critical: must fix before merge.
- Important: should fix before merge.
- Suggestion: optional improvement.

## Senior Backend Gate

Use with `system-design`, `api-and-interface-design`, `database-schema-designer`, `supabase`, and `supabase-postgres-best-practices`.

Before implementing:

- Define the contract first: endpoint/module purpose, input, output, errors, auth boundary.
- Validate all external input at API, form, env, file, webhook, and third-party response boundaries.
- Prefer additive changes over breaking changes.
- Keep error semantics consistent: machine-readable code, human-readable message, safe details.
- Use pagination/limits for list endpoints and unbounded queries.
- Check idempotency for create/update/delete, webhooks, and retries.
- Keep data ownership explicit: tenant/user/resource checks, RLS where relevant.
- Use indexes for common filters/joins and avoid N+1 query paths.
- Keep migrations rollback-aware and avoid irreversible data changes unless clearly requested.

Verification defaults:

- API contract or integration tests for endpoints.
- Schema diff/migration check for DB changes.
- RLS/auth checks for Supabase work.
- Query or EXPLAIN-style review for performance-sensitive paths when feasible.

## Senior Frontend Gate

Use with `product-frontend-engineer`, `frontend-ui-engineering`, `frontend-design-audit`, `gpt-taste`, `image-to-code`, and `react-best-practices`.

Before implementing:

- Start from the user flow and content priority, not decorative layout.
- Separate server/data state from local UI state.
- Prefer composition over over-configured components.
- Build semantic HTML first; avoid div/button impostors.
- Include loading, empty, error, disabled, and success states when the flow needs them.
- Keep responsive layout stable: no overlapping text, no layout shifts from dynamic labels.
- Use the project design system and semantic tokens before inventing colors.
- Avoid generic AI aesthetics: purple-everything, loud gradients, shadow-heavy cards, placeholder copy, oversized spacing.
- Keep accessibility baseline: keyboard navigation, labels, focus management, contrast.
- Watch performance: unnecessary re-renders, oversized images, excessive client state, large bundles.

Verification defaults:

- Browser or Playwright check for changed screens.
- Responsive viewport check when layout changed.
- Accessibility and keyboard sanity check for interactive UI.
- Screenshot inspection for visual work.

## Ship Gate

Use before final response when the task changed files or project behavior.

- Scope: Did we touch only what the user asked for?
- Build: Did relevant tests/lint/type checks run, or did we explain why not?
- UX: Does the changed flow have obvious loading/error/empty states when needed?
- Security: Did we avoid secrets, unsafe logs, auth gaps, and unvalidated input?
- Handoff: Did we summarize what changed, verification, and residual risk clearly?
