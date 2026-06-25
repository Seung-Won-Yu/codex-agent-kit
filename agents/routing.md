# Routing Reference

Use this file only when direct execution is unreliable or multiple lanes plausibly fit. The router is a thin dispatcher: choose the smallest useful workflow, then execute.

## Default Rules

- Clear single-domain task: execute directly.
- Exact skill clearly fits: load that skill directly.
- Vague, shorthand, overloaded, emotional, or mixed Korean/English request: `$messy-request-interpreter -> $skill-router`.
- Broad multi-domain request: `$skill-router`, then one primary skill plus at most two supports.
- Missing niche skill: use the closest installed representative skill.

## Core Lanes

| Situation | Primary skill | Supports | Verification |
|---|---|---|---|
| Rough mixed request | `$messy-request-interpreter` | `$skill-router` | Confirm interpreted goal briefly |
| Normal implementation/refactor | `$incremental-implementation` | `$karpathy-guidelines`, `$test-driven-development` | Focused tests, lint, build, or targeted command |
| Unclear bug/failure | `$diagnose` | `$debugging-and-error-recovery` | Reproduce, fix, verify |
| Working app/prototype | `$product-frontend-engineer` | `$frontend-ui-engineering`, `$gpt-taste`, `$supabase` | `$webapp-testing`, `$playwright`, or Browser |
| Existing UI cleanup | `$ux-enhancer` | `$accessibility`, `$webapp-testing` | Verify changed screen/flow |
| Visual or image artifact | `$media-image-director` | image generation tool, Browser/Playwright | Inspect generated/rendered asset |
| Full design workflow | `$design-flow` | current phase skills only | `$design-review` before handoff/build |
| Game concept/prototype | exact game skill | `$product-frontend-engineer`, `$media-image-director` | Playtest, screenshot, or browser check |
| API/data/backend | `$api-and-interface-design`, `$database-schema-designer`, or `$system-design` | `$supabase`, `$supabase-postgres-best-practices` | Tests, queries, migrations, or schema diff |
| Research/report | `$research-report-writer` or `$research-synthesizer` | `$search-strategy`, `$knowledge-synthesis` | Cite current sources; separate facts from inference |
| Planning/docs | `$planning-document-writer` or exact doc skill | `$technical-writer`, `$api-documentation-writer` | Check artifact shape against the use case |
| Deploy/ops | exact deploy/env/Docker/GitHub skill | `$runbook-generator` when useful | Smoke test or command output |

## Fast Lanes

- "대충 알아서", "개떡같이 말해도", mixed Korean/English, many goals: `$messy-request-interpreter -> $skill-router`.
- Code change/refactor: `$incremental-implementation`.
- Behavior change: add `$test-driven-development`.
- Error/debugging: `$diagnose`.
- Product/frontend prototype/local preview: `$product-frontend-engineer`.
- Premium frontend direction: `$gpt-taste`.
- Existing UI feels confusing: `$ux-enhancer`.
- Screenshot/reference image to UI: `$image-to-code`.
- Actual image/poster/thumbnail/README visual: `$media-image-director`.
- PRD/spec/screen spec/requirements: `$planning-document-writer`, then exact artifact skill if needed.
- Research, comparison, market/technical scan: `$research-report-writer` or `$research-synthesizer`.
- API contract: `$api-and-interface-design`.
- Data model/schema: `$database-schema-designer`.
- Architecture/service boundary: `$system-design`.
- Supabase/Auth/RLS/Storage/Realtime/Edge Functions: `$supabase`.
- Postgres SQL/index/RLS performance: `$supabase-postgres-best-practices`.
- GitHub/CI: `$gh-cli`, `$gh-address-comments`, or `$gh-fix-ci`.
- Deployment: exact deploy skill.

## Prototype Counterproposal

For ambiguous design/prototype requests, make a compact counterproposal before execution:

```text
내 해석: ...
추천 경로: ...
대안: ...
진행: ...
```

Use this map:

- Visual artifact, concept direction, HTML mockup, storyboard, poster, or web deck: `$claude-design` if installed, otherwise closest visual/design skill.
- Structured Open Design artifact such as `DESIGN.md`, data report, dashboard, D3 visual, decision room, diagram, or motion frame: exact `od-*` skill.
- Working app with routes, state, forms, auth, database, deployment, or local preview: `$product-frontend-engineer`.
- Full design-to-build process: `$design-flow`.
- Existing UI cleanup: `$ux-enhancer` or frontend audit skill if installed.
- Image generation, editing, prompt improvement, product mockup, social card, game/app visual: `$media-image-director`.

If the recommended path is clearly best and low-risk, state it and proceed.

## Role Ownership

- `@router`: unclear, mixed, broad, or "handle this somehow" requests.
- `@pmo`: PRDs, specs, stories, sprint/status/risk work.
- `@product`: product flows, UX, screens, frontend implementation, web quality.
- `@game`: mobile game concepts, HUDs, player experience, playable slices.
- `@dev`: implementation, bugs, refactors, tests, APIs, setup, dependencies, repo work.
- `@arch`: architecture, system design, data flow, service boundaries, schemas, scaling.
- `@intel`: research, comparisons, market/customer/competitor discovery, current facts.
- `@doc`: technical docs, API docs, runbooks, SOPs, release notes, reports.
- `@qa`: only when explicitly requested or when review/testing/audit/release-readiness is the main task.

If multiple roles fit, choose the role that owns the final output.

## Quality Gate

Use these as quiet checklists, not extra ceremony:

- Staff lens: correctness, readability, architecture, security, performance.
- Frontend lens: user flow, semantic HTML, composition, loading/empty/error states, accessibility, responsive stability.
- Backend lens: contract first, boundary validation, consistent errors, auth/ownership, pagination, idempotency, indexes, migration safety.
- Ship lens: scope, verification, UX states, security basics, clear handoff.
