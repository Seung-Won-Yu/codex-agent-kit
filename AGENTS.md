# Developer Agents Registry

Use the lightest role that fits the task. Do not narrate role selection unless the user asks.

This workspace uses the lean skill profile in `config/lean-skills.txt`: about 100 representative skills instead of every available niche skill. Prefer the installed skill set. If a named skill is missing, use the closest installed skill; suggest reinstalling a niche skill only when the exact workflow is truly required.

## Default Intake

For rough or multi-domain requests, use this pipeline:

```text
$messy-request-interpreter -> routing brief -> $skill-router -> role assignment -> specialist skills -> execution
```

- Use `$messy-request-interpreter` when the user is vague, shorthand, overloaded, emotional, or mixing Korean/English fragments.
- Use `$skill-router` to choose the role, lane, and smallest useful skill set from its catalog.
- Execute after routing; do not stop at classification unless the user only asked for a plan.
- For simple obvious tasks, answer or act directly without routing ceremony.

## Roles

- `@router`: unclear, mixed, broad, or "handle this somehow" requests.
- `@pmo`: PRDs, specs, stories, sprint/status/risk work.
- `@product`: product flows, UX, screens, frontend implementation, web quality.
- `@game`: mobile game concepts, game-like UI, HUDs, player experience, playable slices.
- `@dev`: implementation, bugs, refactors, tests, APIs, setup, dependencies, repo work.
- `@arch`: architecture, system design, data flow, service boundaries, schemas, scaling.
- `@intel`: research, comparisons, market/customer/competitor discovery, current facts.
- `@doc`: technical docs, API docs, runbooks, SOPs, release notes, reports.
- `@qa`: only when explicitly requested, or when review/testing/audit/release-readiness is the main task.

If multiple roles fit, choose the role that owns the final output. Use others as supporting perspectives.

## Skill Rules

- Prefer one primary skill plus at most two supporting skills.
- Choose the narrowest exact installed skill before a broad category skill.
- Do not read the full catalog for obvious tasks. Use the quick routing table first, then consult `$skill-router` references only when multiple choices are plausible.
- Prefer `od-*` skills only when their specialized artifact format is useful.
- Apply `skills/skill-router/references/senior-engineering-lenses.md` as a lightweight quality gate for backend, frontend, review, and ship-ready work.
- Use `$planning-document-writer` for planning/document requests such as PRD, GDD, requirements, feature spec, screen spec, API docs, DB docs, SOP, or runbook.
- Use `$research-report-writer` or `$research-synthesizer` for research/report requests, benchmarking, market/technical research, trend reports, or decision memos.
- Use `$ax-consulting-planner` for AX consulting, AI transformation, AI adoption strategy, internal automation, AI PoC, or agent adoption planning.
- Use security skills only when the user asks for that review or the touched surface clearly involves auth, permissions, secrets, tenant isolation, payments, webhooks, or untrusted input.
- Apply `$karpathy-guidelines` as baseline discipline for coding work when no stronger project instruction already covers it.
- Load only the skill bodies or references needed for the task.

## Quick Routing

Use this table first. It is the normal path for most requests.

- Rough mixed request: `$messy-request-interpreter` -> `$skill-router` -> exact specialist.
- Product/frontend prototype: `$product-frontend-engineer`; add `$frontend-ui-engineering`, `$gpt-taste`, `$image-to-code`, or `$supabase` only when needed; verify with `$webapp-testing`, `$playwright`, or Browser.
- Visual/design artifact: `$claude-design`; add `$media-image-director` for raster assets and Browser/Playwright for inspection.
- Codex image generation: `$media-image-director` for prompts, generated visuals, edits, variations, posters, thumbnails, UI references, game visuals, and product mockup direction.
- Open Design artifact: exact `od-*` skill for `DESIGN.md`, design review, decision room, dashboard, data report, D3 visual, whiteboard diagram, motion frame, or platform convention check.
- Full design process: `$design-flow`; use `$design-brief`, `$information-architecture`, `$design-tokens`, `$brief-to-tasks`, and `$design-review` only for the needed phase.
- Existing UI improvement: `$frontend-design-audit` for diagnosis, `$ux-enhancer` for focused React usability refactors.
- Game concept/UI/prototype: `$mobile-game-design`, `$game-ui-art-direction`, `$prototype-slice-planner`, `$player-experience-review`, or `$mobile-game-qa` according to the bottleneck.
- API/data/backend: `$api-and-interface-design`, `$database-schema-designer`, or `$system-design`; add `$supabase` and `$supabase-postgres-best-practices` for Supabase/Postgres work.
- Implementation/refactor: `$incremental-implementation`; add `$test-driven-development` when behavior changes and `$diagnose` for unclear failures.
- Docs: `$technical-writer`, `$api-documentation-writer`, `$runbook-generator`, `$sop-builder`, `$release-notes`, or `$handoff`.
- Deploy/ops: `$vercel-deploy`, `$netlify-deploy`, `$cloudflare-deploy`, `$render-deploy`, `$env-setup-wizard`, `$docker-debugger`, or `$gh-fix-ci`.

## Skill Efficiency Rules

- Start with the user outcome, not the first keyword. For example, a screenshot can mean image generation, UI audit, frontend implementation, or documentation.
- Prefer representative skills over niche frameworks. Example: use `$research-report-writer` instead of separate market/competitor/strategy skills unless the user names a specific analysis.
- Prefer execution skills over planning skills when the user clearly wants a change made.
- Pair frontend, game, and visual work with verification by default.
- Pair backend and data changes with focused tests, queries, or migration checks.
- For image requests, use `$media-image-director` and generate/edit the image when the image tool is available.
- For missing niche skills, continue with the nearest installed representative skill.

## Senior Engineering Lenses

Use these as checklists, not extra skills:

- Staff review lens: correctness, readability, architecture, security, and performance.
- Backend lens: contract first, boundary validation, consistent errors, auth/ownership, pagination, idempotency, indexes, migration safety.
- Frontend lens: user flow first, semantic HTML, composition, loading/empty/error states, accessibility, responsive stability, performance, no generic AI aesthetic.
- Ship lens: scope, verification, UX states, security basics, clear handoff.

## Prototype And Design Routing

When the user says things like "이런 느낌", "클로드 디자인처럼", "러버블처럼", "대충 앱 하나", "뭔가 프로토타입", "개떡같이 말해도 알아서", or otherwise describes a fuzzy product/design outcome, do a compact counterproposal before execution.

Use this mode map:

- Claude Design-style artifact: `$claude-design` when the fastest useful output is a visual artifact, concept direction, HTML mockup, storyboard, poster, or web deck.
- Open Design artifact: exact `od-*` skill when the requested output has a fixed format such as `DESIGN.md`, data report, decision room, dashboard, D3 visual, whiteboard diagram, or motion frame.
- Lovable-style working app: `$product-frontend-engineer` when the user needs a real local prototype/app with routes, state, forms, auth, database, deployment, or usable screens.
- Full designer workflow: `$design-flow` when the user needs durable design decisions from brief to IA to tokens to tasks to review.
- Existing UI audit: `$frontend-design-audit` or `$ux-enhancer` when improving an existing UI matters more than creating a new one.
- Image generation: `$media-image-director` when the user wants an actual image, prompt, restyle, poster, thumbnail, social card, app/game visual, or README visual.

Counterproposal format:

```text
내 해석: ...
추천 경로: ...
대안: ...
진행: ...
```

If one route is clearly best and low-risk, state the recommendation and proceed.

## Backend Routing

- Backend architecture: `$system-design`.
- API contracts: `$api-and-interface-design`.
- Data model: `$database-schema-designer`.
- Supabase/Auth/RLS/Storage/Realtime/Edge Functions: `$supabase`.
- Postgres SQL/index/RLS performance: `$supabase-postgres-best-practices`.
- Backend security: `$security-and-hardening`, `$security-best-practices`, `$insecure-defaults`, or `$sharp-edges`.
- Backend verification: focused tests, queries, migrations, or schema diffs; use `$test-driven-development` when behavior changes.

## Document And Research Routing

- Formal planning docs: `$planning-document-writer` then the exact artifact skill.
- PRD/spec/story/scenario: `$create-prd`, `$feature-spec`, `$user-stories`, or `$test-scenarios`.
- Research-backed report: `$research-report-writer` + `$research-synthesizer`.
- Technical/API docs: `$technical-writer` or `$api-documentation-writer`.
- Operations docs: `$runbook-generator` or `$sop-builder`.
- Release/history: `$release-notes`, `$changelog-generator`, or `$handoff`.
- Notion knowledge/spec workflows: `$notion-knowledge-capture`, `$notion-research-documentation`, or `$notion-spec-to-implementation`.

## PM And Delivery Routing

- Product direction: `$product-strategy`, `$prioritize-features`, or `$metrics-dashboard`.
- Feature definition: `$create-prd`, `$feature-spec`, `$user-stories`, and `$test-scenarios`.
- Execution planning: `$sprint-plan`, `$project-status-report`, or `$risk-assessment`.
- AX/AI transformation: `$ax-consulting-planner` as the hub before research, planning, architecture, roadmap, or implementation handoff.

## QA Ops And Automation Routing

- Browser verification: `$webapp-testing`, `$playwright`, `$playwright-interactive`, Browser, or focused tests.
- CI/GitHub: `$gh-fix-ci`, `$gh-address-comments`, or `$gh-cli`.
- Environment/setup: `$env-setup-wizard`, `$docker-debugger`, or `$dependency-auditor`.
- Deploy: `$vercel-deploy`, `$netlify-deploy`, `$cloudflare-deploy`, or `$render-deploy`.

## Project Kit Policy

Use the global Codex routing and local lean skills as the default. Apply external project kits only when they clearly improve a specific repository.

- For small fixes, direct implementation, light docs, and one-off research, do not initialize heavy workflows.
- Prefer a lightweight project-local `AGENTS.md` or docs/spec folder when the project only needs routing rules or handoff memory.
- Before adding a project kit, state expected files/directories, install command, and rollback path.

## Execution Discipline

- Prefer evidence over guessing.
- For substantial refactors, present a short plan before large edits.
- Ask before destructive actions or broad external side effects.
- Run focused verification for the touched surface when feasible.
- Keep answers concise and implementation-oriented.
- Do not adopt `@qa` by default during normal implementation.
- Do not use subagents unless the user explicitly asks for subagents, delegation, or parallel agent work.
