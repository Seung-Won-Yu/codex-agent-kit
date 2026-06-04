---
name: skill-router
description: Lightweight meta-skill for choosing and sequencing the lean Codex skill profile. Use when the user asks which skill to use, wants an integrated manager/orchestrator, has a broad task spanning planning, research, frontend, development, documentation, image generation, games, Supabase, deployment, or explicitly says to route, coordinate, orchestrate, or choose the right skills.
---

# Skill Router

Use this skill as a thin dispatcher. Do not solve the whole task inside the router. Select the smallest useful installed skill set, load only the needed skill bodies or references, then proceed with the work.

This setup uses a lean profile from `$CODEX_HOME/config/lean-skills.txt`, installed from this repo's `config/lean-skills.txt`. If a formerly known niche skill is not installed, route to the closest installed representative skill. Suggest installing a niche skill only when the exact workflow is truly required.

## Routing Loop

1. If the request is vague, scattered, overloaded, or casual shorthand, use `$messy-request-interpreter` first.
2. Classify the normalized goal into one or more work lanes.
3. Assign the lightest responsible role.
4. Choose one primary skill from the quick matrix below.
5. Add at most two support skills when they clearly change the outcome.
6. Use `references/activation-matrix.md` only as a tie-breaker, and `references/skill-catalog.md` only when you need a short description of a skill family.
7. Use `references/senior-engineering-lenses.md` as a quality gate for backend, frontend, review, and ship-ready work.
8. Load the selected skill instructions or references only when needed.
9. Sequence work as planning, execution, verification, and delivery.
10. If no installed skill fits, use general Codex ability and mention the gap.

## Skill Operating Model

| Situation | Primary | Supports | Verification |
|---|---|---|---|
| Vague, shorthand, mixed Korean/English | `messy-request-interpreter` | `skill-router` | Confirm interpreted goal in one sentence |
| Research or comparison | `research-report-writer` or `research-synthesizer` | `search-strategy`, `knowledge-synthesis` | Cite current sources and separate facts from inference |
| Planning artifact | `planning-document-writer` | Exact artifact skill | Check the document shape against the requested use |
| Working web/app prototype | `product-frontend-engineer` | `frontend-ui-engineering`, `gpt-taste`, `image-to-code`, `supabase` | `webapp-testing`, `playwright`, or Browser |
| Visual design artifact | `claude-design` | `media-image-director`, Browser/Playwright | Inspect rendered artifact or generated asset |
| Codex image generation | `media-image-director` | Image generation tool when an actual image is requested | Inspect generated image, prompt, or iteration brief |
| Open Design artifact | Exact `od-*` skill | `webapp-testing`, Browser, or `technical-writer` | Inspect generated artifact, table, chart, or document structure |
| Full design workflow | `design-flow` | Phase skills only for the current phase | `design-review` before handoff/build |
| Existing UI improvement | `frontend-design-audit` or `ux-enhancer` | `accessibility`, `webapp-testing` | Verify the changed screen/flow |
| Game design/prototype | Exact game skill | `product-frontend-engineer`, `media-image-director` | Playtest, screenshot, or browser check |
| Implementation/refactor | `incremental-implementation` | `karpathy-guidelines`, `test-driven-development` | Focused tests, lint, or targeted command |
| Debugging | `diagnose` | `debugging-and-error-recovery` | Reproduce then verify the fix |
| API/data/backend | `api-and-interface-design`, `database-schema-designer`, or `system-design` | `supabase`, `supabase-postgres-best-practices` | Tests, queries, migrations, or schema diff |
| Deployment/ops | Exact deploy/env/Docker/GitHub skill | `runbook-generator` when useful | Smoke test or deploy command output |

## Fast Lanes

- "대충 알아서", mixed Korean/English, many goals: `messy-request-interpreter` -> `skill-router`.
- Working app/prototype/local preview: `product-frontend-engineer`.
- Existing UI feels bad/confusing: `frontend-design-audit` or `ux-enhancer`.
- Premium visual/frontend taste: `gpt-taste`.
- Screenshot/reference to UI: `image-to-code`.
- Actual image/poster/thumbnail/README visual: `media-image-director`.
- Game idea/HUD/playtest/prototype: exact game skill.
- PRD/spec/docs/report: `planning-document-writer` or `research-report-writer`.
- Code change/refactor: `incremental-implementation`.
- Bug/error: `diagnose`.
- API/schema/backend architecture: `api-and-interface-design`, `database-schema-designer`, or `system-design`.
- Supabase/Postgres: `supabase` and `supabase-postgres-best-practices`.
- GitHub/CI/deploy: exact GitHub or deploy skill.

## Senior Lenses

Use `references/senior-engineering-lenses.md` to strengthen existing routes:

- Staff review gate for code review, refactors, and risky changes.
- Senior backend gate for API, schema, Supabase, auth, RLS, and migrations.
- Senior frontend gate for UI, React, design implementation, image-to-code, and product screens.
- Ship gate before final response when files or behavior changed.

## Prototype Mode Counterproposal

For ambiguous design/prototype requests, actively compare modes before routing.

- Recommend `$claude-design` for visual artifacts, concept direction, HTML mockups, storyboards, posters, or web decks.
- Recommend exact `od-*` skills for structured artifacts such as `DESIGN.md`, data reports, decision rooms, dashboards, D3 visuals, whiteboard diagrams, motion frames, or platform checks.
- Recommend `$media-image-director` for image generation, editing, posters, thumbnails, product mockups, social cards, game/app visuals, prompt improvement, or image iteration inside Codex.
- Recommend `$product-frontend-engineer` for working apps, local preview, stateful UI, backend, auth, database, or deployment.
- Recommend `$design-flow` for full design-to-build work.
- Recommend `$frontend-design-audit` or `$ux-enhancer` for existing UI cleanup.

Use:

```text
내 해석: ...
추천 경로: ...
대안: ...
진행: ...
```

If the recommended path is clearly best and low-risk, proceed.

## Role Assignment

- `@router`: unclear, mixed, broad, or "handle this somehow" requests.
- `@pmo`: PRDs, specs, user stories, sprint plans, status reports, risks, handoffs.
- `@product`: product flows, UX, screens, dashboards, frontend implementation, web quality.
- `@game`: mobile game concepts, HUDs, player experience, prototype slices, game QA.
- `@dev`: implementation, bug fixes, refactors, tests, APIs, local setup, repo work.
- `@arch`: architecture, system design, data flow, service boundaries, API contracts, schemas.
- `@intel`: research, comparisons, market/customer/competitor discovery, source synthesis.
- `@doc`: technical docs, API docs, runbooks, SOPs, release notes, reports.
- `@qa`: only when explicitly requested or when verification/review/audit/release-readiness is the main task.

## Lane Selection

- Rough or overloaded request: `$messy-request-interpreter`.
- Product planning, frontend delivery, prompt-to-app prototypes: `$product-frontend-engineer`.
- Premium frontend direction: `$gpt-taste`.
- Screenshot/reference image to UI: `$image-to-code`.
- Visual artifact or design option: `$claude-design`.
- Codex image generation or image editing: `$media-image-director`.
- Open Design artifact: exact `od-*` skill.
- Full designer workflow: `$design-flow`.
- Existing UI audit/refactor: `$frontend-design-audit` or `$ux-enhancer`.
- Mobile game concept/UI/prototype/QA: exact game skill.
- AX consulting or AI transformation: `$ax-consulting-planner`.
- Planning/document shape: `$planning-document-writer`.
- Research/report: `$research-report-writer` or `$research-synthesizer`.
- Technical/API/ops docs: `$technical-writer`, `$api-documentation-writer`, `$runbook-generator`, or `$sop-builder`.
- Normal implementation/refactor: `$incremental-implementation`.
- Debugging: `$diagnose`.
- Backend architecture/API/data: `$system-design`, `$api-and-interface-design`, or `$database-schema-designer`.
- Supabase/Postgres: `$supabase` and `$supabase-postgres-best-practices`.
- Security review: `$security-and-hardening`, `$security-best-practices`, `$insecure-defaults`, or `$sharp-edges`.
- Browser verification: `$webapp-testing`, `$playwright`, `$playwright-interactive`, Browser, or focused tests.
- GitHub work: `$gh-cli`, `$gh-address-comments`, or `$gh-fix-ci`.
- Deployment: `$vercel-deploy`, `$netlify-deploy`, `$cloudflare-deploy`, or `$render-deploy`.
- Plain coding tasks without a stronger skill: inspect the repo and work normally.

## Orchestration Rules

- Prefer one primary skill plus at most two supporting skills.
- Avoid installing niche skills unless the user explicitly wants that workflow.
- Do not run multi-agent delegation unless the user explicitly asks for subagents or parallel agent work.
- For non-trivial, ambiguous, expensive, or direction-setting tasks, use a brief counterproposal gate before execution.
- For complex build tasks, make a short plan, then execute.
- For research-backed recommendations, browse current sources and cite them.
- For file artifacts, use the relevant document/spreadsheet/presentation capability instead of hand-rolling formats.
- For backend/frontend/review tasks, quietly apply the matching senior engineering lens and surface only useful decisions or findings.

## Output Contract

When the router is explicitly requested, briefly state:

- selected role
- selected lane
- selected skill or workflow
- why it fits
- what verification will be used

Then perform the task.
