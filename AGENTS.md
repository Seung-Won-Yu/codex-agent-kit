# Developer Agents Registry

Use the lightest role that fits the task. Do not narrate role selection unless the user asks.

## Default Intake

For rough or multi-domain requests, use this pipeline:

```text
$messy-request-interpreter -> routing brief -> $skill-router -> role assignment -> specialist skills -> execution
```

- Use `$messy-request-interpreter` when the user is vague, shorthand, overloaded, emotional, or mixing Korean/English fragments.
- Use `$skill-router` to choose the role, lane, and smallest useful skill set from its catalog.
- For vague design/prototype/app requests, make the router compare Claude Design-style artifact, Lovable-style working app, full designer workflow, and UX audit before choosing.
- Execute after routing; do not stop at classification unless the user only asked for a plan.
- For simple obvious tasks, answer or act directly without routing ceremony.

## Roles

- `@router`: unclear, mixed, broad, or "handle this somehow" requests.
- `@pmo`: PRDs, specs, stories, sprint/roadmap/status/risk/stakeholder work.
- `@product`: product flows, UX, screens, frontend implementation, web quality.
- `@game`: mobile game concepts, game-like UI, HUDs, core loops, player experience, playable slices.
- `@dev`: implementation, bugs, refactors, tests, APIs, setup, dependencies, repo work.
- `@arch`: architecture, system design, data flow, service boundaries, schemas, scaling.
- `@intel`: research, comparisons, market/customer/competitor discovery, current facts.
- `@doc`: technical docs, API docs, runbooks, SOPs, comms, release notes, reports.
- `@qa`: only when explicitly requested, or when review/testing/audit/release-readiness is the main task.

If multiple roles fit, choose the role that owns the final output. Use others as supporting perspectives.

## Skill Rules

- Prefer installed local skills over inventing a new workflow.
- Prefer `od-*` skills only when their specialized artifact format is useful; otherwise use the narrower core skill already in this kit.
- Let `$skill-router` read its bundled `references/skill-catalog.md` when the right specialist skill is not obvious.
- Let `$skill-router` read its bundled `references/activation-matrix.md` when multiple skills could fit or when GitHub/community/Open Design skills are relevant.
- Prefer one primary skill plus at most two supporting skills.
- Choose the narrowest exact skill before a broad category skill. For example, GitHub PR comments route to `$gh-address-comments`, review feedback routes to `$receiving-code-review`, and dangerous config review routes to `$insecure-defaults`.
- For AX consulting or AI transformation requests such as AX 컨설팅, AI 전환, AI 도입 전략, 업무 자동화 컨설팅, 에이전트 도입, AI PoC, AI 서비스 기획, 사내 자동화, AI 업무혁신, or AX 개발기획, use `$ax-consulting-planner` as the hub before drafting strategy, requirements, architecture, roadmap, or implementation handoff.
- For planning/document requests such as 기획서, GDD, 요구사항정의서, 기능명세서, 화면설계서, 플로우차트, 개발문서, QA 시나리오, API 명세, DB 설계서, SOP, or runbook, use `$planning-document-writer` to pick the artifact shape before drafting.
- For research/report requests such as 리서칭보고서, 조사보고서, 시장조사, 기술조사, 경쟁사분석, 벤치마킹, 레퍼런스 조사, 트렌드 리포트, 논문/자료 요약, or 의사결정 보고서, use `$research-report-writer` to pick the report shape before researching and drafting.
- Load only the skill bodies or references needed for the task.
- Skills may live in either `$CODEX_HOME/skills` (usually `~/.codex/skills`) or the shared Agent Skills folder (`~/.agents/skills`). When a named or routed skill is missing from the visible session list, check both locations before saying it is unavailable.
- Use security, fuzzing, mutation, SARIF, and supply-chain skills only when the user asks for that kind of review or the touched surface clearly carries that risk.
- Apply `$karpathy-guidelines` as baseline discipline for coding work.

## Skill Operating Model

Use skills as a routing layer, not as ceremony. The default budget is one primary skill plus zero to two support skills. Use three or more skills only for large multi-phase work such as product design to implementation to deploy.

- Choose by final artifact first: report, plan, working app, visual artifact, code change, audit, deployment, or automation.
- Choose by bottleneck second: unclear request, current research, UX direction, architecture, implementation, debugging, verification, or launch.
- Do not stack duplicate skills. For example, avoid using `$claude-design`, `$gpt-taste`, `$frontend-design`, and `$design-flow` together unless the user explicitly wants a full design process.
- Broad skills such as `$senior-dev-lead`, `$best-practices`, `$karpathy-guidelines`, and `$context-engineering` are supporting lenses, not primary routes unless the user asks for that perspective.
- Re-route on each new user request. Do not keep a previous turn's skill active unless the new request is clearly part of the same workflow.
- Pair build skills with verification: frontend work should use browser/playwright/webapp testing when feasible; backend/data work should use focused tests or queries; docs/research should cite sources or validate structure.
- For Codex image generation, use `$media-image-director` to turn rough visual intent into a strong prompt, generate with the available image tool, then critique and iterate.

Default bundles:

- Rough mixed request: `$messy-request-interpreter` -> `$skill-router` -> exact specialist.
- Research/report: `$research-report-writer` or `$research-synthesizer`; add `$search-strategy` only for hard query planning.
- Planning/document: `$planning-document-writer`; then the exact artifact skill such as `$create-prd`, `$feature-spec`, `$sop-builder`, or `$runbook-generator`.
- Working web prototype: `$product-frontend-engineer`; add `$frontend-ui-engineering`, `$gpt-taste`, `$image-to-code`, or `$supabase` only when the requested surface needs them; verify with `$webapp-testing`, `$playwright`, or Browser.
- Visual concept/artifact: `$claude-design`; add `$imagegen` for raster assets and Browser/Playwright for inspection.
- Specialized Open Design artifact: use the exact `od-*` skill when the user asks for `DESIGN.md`, decision room, D3 chart, data report, hand-drawn diagram, motion frame, or live dashboard.
- Codex image generation: use `$media-image-director` for image prompts, generated visuals, edits, variations, posters, thumbnails, UI references, game visuals, and product mockup direction.
- Full design process: `$design-flow`; use `$design-brief`, `$information-architecture`, `$design-tokens`, `$brief-to-tasks`, and `$design-review` only for the needed phase.
- Existing UI improvement: `$frontend-design-audit` for diagnosis, `$ux-enhancer` for focused React usability refactors.
- API/data/backend: `$api-and-interface-design` or `$database-schema-designer`; add `$supabase` and `$supabase-postgres-best-practices` for Supabase/Postgres-specific work.
- Implementation/refactor: `$incremental-implementation`; add `$test-driven-development` when behavior changes and `$diagnose` for unclear failures.
- Security/compliance: use the narrow exact security skill only when the request or touched surface has strong security cues.
- Deploy/ops: use the exact deploy, CI/CD, env, Docker, runbook, or monitoring skill for the target platform.

Open Design imports:

- Use `$od-design-md` when a project needs a durable `DESIGN.md` source of truth for visual rules, tokens, and design direction.
- Use `$od-plan-design-review` as a score-based senior design gate before merging or shipping UI-heavy work.
- Use `$od-research-decision-room` when messy research notes, interviews, tickets, or survey excerpts need to become an evidence-backed decision artifact.
- Use `$od-live-dashboard` for self-contained dashboard artifacts with KPIs, activity, and tables.
- Use `$od-data-report` for CSV, Excel, JSON, or pasted data that should become a polished report page.
- Use `$od-d3-visualization` when the core value is a complex chart, map, network, treemap, heatmap, or interactive explanatory graphic.
- Use `$od-hand-drawn-diagrams` for whiteboard-style architecture, flow, system, or concept diagrams.
- Use `$od-motion-frames` for loopable CSS motion posters, animated heroes, title cards, and video-ready visual frames.
- Use `$od-platform-design` when a UI must respect cross-platform product conventions across web, iOS, Android, and accessibility.

Codex image generation:

- Use `$media-image-director` when the user asks to create, edit, improve, restyle, or iterate on an image inside Codex.
- Use it for posters, thumbnails, GitHub/portfolio visuals, app screenshots, mobile/game UI references, product mockups, character concepts, icons, and social cards.
- If the user asks for an actual image and the Codex image generation tool is available, generate the image instead of only writing a prompt.
- Keep provider-specific workflows such as Sora, Fal, Replicate, Runway, or Remotion out of the default route unless the user explicitly asks for external tooling.

## Prototype and Design Routing

When the user says things like "이런 느낌", "클로드 디자인처럼", "러버블처럼", "대충 앱 하나", "뭔가 프로토타입", "개떡같이 말해도 알아서", or otherwise describes a fuzzy product/design outcome, do a compact counterproposal before execution.

Use this mode map:

- `Claude Design-style artifact`: use `$claude-design` when the user needs visual options, HTML artifacts, interactive mockups, storyboards, posters, web decks, or a design direction before committing to app code.
- `Open Design-style specialized artifact`: use the exact `od-*` skill when the requested output has a fixed format such as a `DESIGN.md`, data report, research decision room, dashboard, D3 visual, whiteboard diagram, or motion frame.
- `Lovable-style working app`: use `$product-frontend-engineer` as the hub when the user needs a real local prototype/app with routes, state, forms, auth, database, deployment, or usable screens. Pair with `$gpt-taste`, `$image-to-code`, `$supabase`, `$webapp-testing`, or `$playwright` as needed.
- `Full designer workflow`: use `$design-flow` when the user needs a durable process from brief to IA to tokens to tasks to implementation to review. Use `$design-brief`, `$information-architecture`, `$design-tokens`, `$brief-to-tasks`, and `$design-review` for narrower phases.
- `Existing UI audit`: use `$frontend-design-audit` for full usability review of an existing UI or URL, and `$ux-enhancer` for focused React component usability cleanup.

The counterproposal should be short:

```text
내 해석: ...
추천 경로: ...
대안: ...
진행: ...
```

If one route is clearly best and low-risk, state the recommendation and proceed. Do not force the user to know the vocabulary.

## Full-Stack Prototype Routing

- For Supabase-backed apps, Auth, RLS, Storage, Realtime, Edge Functions, migrations, `supabase-js`, or Lovable-style backend work, use `$supabase`.
- For Postgres schema, SQL, indexes, RLS performance, query tuning, or connection scaling, pair with `$supabase-postgres-best-practices`.
- For API contracts and data modeling outside Supabase-specific details, use `$api-and-interface-design` and `$database-schema-designer`.
- For deployable web prototypes, prefer `$vercel-deploy`, `$netlify-deploy`, `$cloudflare-deploy`, or `$render-deploy` according to the target platform.

## Backend Core Routing

For backend work, pick the skill by the deepest uncertainty, not by the first file touched.

- `Backend architecture`: use `$system-design` when the task involves service boundaries, module structure, data flow, scaling, reliability, queues, workers, caching, or integration topology.
- `API contract`: use `$api-and-interface-design` when routes, request/response shape, errors, versioning, auth boundaries, pagination, idempotency, or frontend/backend contracts matter.
- `Data model`: use `$database-schema-designer` when entities, relationships, migrations, indexes, constraints, tenancy, audit trails, or reporting queries matter.
- `Supabase backend`: use `$supabase` for Auth, RLS, Storage, Realtime, Edge Functions, migrations, `supabase-js`, SSR integration, and Supabase CLI/MCP work.
- `Postgres performance`: use `$supabase-postgres-best-practices` for SQL, indexes, RLS performance, connection scaling, query plans, and Postgres schema review.
- `Endpoint implementation`: use `$api-endpoint-scaffolder` only after the contract and data model are clear enough to code.
- `Backend refactor`: use `$improve-codebase-architecture` for module cleanup, service extraction, dependency direction, testability, or AI-navigable codebase improvements.
- `Migration/deprecation`: use `$deprecation-and-migration` when changing existing APIs, tables, event names, auth behavior, or compatibility contracts.
- `Backend security`: use `$security-and-hardening`, `$security-threat-model`, `$insecure-defaults`, or `$sharp-edges` only when auth, permissions, secrets, data exposure, multi-tenant isolation, webhooks, payments, or untrusted input are involved.
- `Backend verification`: use `$test-driven-development`, `$property-based-testing`, `$testing-strategy`, or focused integration tests depending on risk.
- `Backend ops`: use `$env-setup-wizard`, `$docker-debugger`, `$ci-cd-and-automation`, or `$runbook-generator` when setup, containers, CI, deployment, or operations are central.

Default backend bundles:

- New backend feature: `$api-and-interface-design` + `$database-schema-designer` + `$test-driven-development`.
- New backend system or service: `$system-design` + `$api-and-interface-design` + `$database-schema-designer`.
- Supabase feature: `$supabase` + `$database-schema-designer` + `$supabase-postgres-best-practices`.
- Production-sensitive backend: `$system-design` + narrow security skill + `$testing-strategy`.
- Backend cleanup: `$improve-codebase-architecture` + `$incremental-implementation` + focused tests.

## Document And Research Core Routing

For writing and knowledge work, choose by the document's job, not by its title.

- `Deliverable default`: when the user asks for 문서, 보고서, 제안서, 기획서, 요구사항정의서, 기능명세서, API 명세서, DB 설계서, SOP, runbook, 양식, 템플릿, 제출용, 공유용, or "파일로", produce a real deliverable by default instead of only a Markdown memo. Use `.docx` for narrative/formal documents, `.pptx` for decks, `.xlsx` for tables/models/trackers, and Notion/Google Docs only when explicitly requested or already the destination. Use Markdown only when the user asks for 초안, 메모, 내용만, README, md, or when a quick inline answer is clearly enough.
- `Artifact picker`: use `$planning-document-writer` when the user asks for 기획서, 요구사항정의서, 기능명세서, 화면설계서, 개발문서, QA 시나리오, API 명세, SOP, runbook, or is unsure which document shape they need.
- `Current research`: use `$research-synthesizer` when facts may be current, source-backed, compared, or decision-critical.
- `Research report`: use `$research-report-writer` when the output should be a structured report, 벤치마킹, 시장/기술조사, 경쟁사분석, trend report, or decision memo.
- `Product planning`: use `$create-prd`, `$feature-spec`, `$user-stories`, `$test-scenarios`, `$sprint-plan`, or `$outcome-roadmap` according to the artifact requested.
- `Technical docs`: use `$technical-writer` for architecture notes, guides, developer docs, or README-style material.
- `API docs`: use `$api-documentation-writer` when endpoint references, OpenAPI/Swagger-style documentation, auth examples, or SDK usage guides are needed.
- `Operational docs`: use `$runbook-generator` for incident/ops procedures and `$sop-builder` for repeatable business or technical processes.
- `Collaborative docs`: use `$doc-coauthoring` when the user wants iterative drafting, redlines, or comment-oriented collaboration.
- `Office files`: use `$documents:documents`, `$presentations:Presentations`, or `$spreadsheets:Spreadsheets` for `.docx`, slides, or spreadsheet artifacts instead of hand-rolling file formats.
- `Notion knowledge`: use `$notion-knowledge-capture`, `$notion-research-documentation`, `$notion-spec-to-implementation`, or `$notion-meeting-intelligence` when the source or target is Notion.
- `Release/history`: use `$release-notes`, `$changelog-generator`, or `$handoff` when the output is meant to preserve what changed or what should happen next.

Default document/research bundles:

- Ambiguous document request: `$planning-document-writer` + exact artifact skill.
- Formal document deliverable: `$planning-document-writer` + `$documents:documents`, unless slides or sheets are a better fit.
- Research-backed report: `$research-report-writer` + `$research-synthesizer`.
- Technical spec: `$feature-spec` + `$api-and-interface-design` or `$database-schema-designer` when relevant.
- API documentation: `$api-documentation-writer` + `$api-and-interface-design`.
- Operations documentation: `$runbook-generator` or `$sop-builder` + `$technical-writer`.
- Meeting or conversation capture: `$summarize-meeting`, `$meeting-insights-analyzer`, `$notion-knowledge-capture`, or `$handoff` depending on destination.

## PM And Delivery Core Routing

- `Product direction`: use `$product-strategy`, `$value-proposition`, `$opportunity-solution-tree`, `$prioritize-features`, or `$metrics-dashboard` when deciding what to build and why.
- `Feature definition`: use `$create-prd`, `$feature-spec`, `$user-stories`, and `$test-scenarios` when turning an idea into buildable scope.
- `Execution planning`: use `$sprint-plan`, `$project-status-report`, `$risk-assessment`, `$stakeholder-map`, or `$change-management` when coordinating work, rollout, or stakeholders.
- `Launch communication`: use `$release-notes`, `$internal-comms`, `$changelog-generator`, or `$shipping-and-launch` when the output is user/team-facing rollout material.
- `AX/AI transformation`: use `$ax-consulting-planner` as the hub before research, planning documents, architecture, roadmap, or implementation handoff.

## QA Ops And Automation Core Routing

- `Test strategy`: use `$testing-strategy` when deciding the test mix, coverage goals, risk areas, or release-readiness checks.
- `Test creation`: use `$test-driven-development`, `$test-scenarios`, `$property-based-testing`, or `$test-coverage-improver` depending on whether the need is behavior tests, scenario docs, invariants, or coverage gaps.
- `Browser verification`: use `$webapp-testing`, `$playwright`, `$playwright-interactive`, or Browser when the surface is a local web app or user flow.
- `CI/CD`: use `$ci-cd-and-automation`, `$gh-fix-ci`, or `$gh-cli` for GitHub workflows, failing checks, PR automation, or authenticated GitHub work.
- `Environment/setup`: use `$env-setup-wizard`, `$docker-debugger`, `$modern-python`, or `$dependency-auditor` when setup, containers, Python tooling, or dependencies are central.
- `Deploy`: use `$vercel-deploy`, `$netlify-deploy`, `$cloudflare-deploy`, `$render-deploy`, or platform-specific instructions according to the target.
- `Security/reliability`: use narrow security, dependency, supply-chain, or threat-model skills only when the request or touched surface has strong cues.

## Counterproposal Gate

For non-trivial, ambiguous, expensive, or direction-setting work, do a short counterproposal pass before execution unless the user explicitly says to proceed directly.

- State the interpreted goal in one sentence.
- Present the recommended path first.
- Offer 1-2 meaningful alternatives when the choice changes scope, quality, cost, risk, or output shape.
- Ask only the blocking questions; otherwise proceed with the recommended path.
- Use this especially for 기획서, 리서칭보고서, 개발기획, architecture, UX flow, tool choice, stack choice, large refactors, and implementation plans.
- Do not counterproposal-gate tiny fixes, direct command requests, or clearly specified edits.

## Project Kit Policy

Use the global Codex routing and local skills as the default. Apply external project kits only when they clearly improve the specific repository.

- For small fixes, direct implementation, light docs, and one-off research, do not initialize Spec Kit, OpenSpec, BMAD, or other heavy workflows.
- For substantial features, greenfield products, long-running project work, or team-shared specs, inspect the repo and propose a project-local kit before installing or initializing it.
- Prefer a lightweight local `AGENTS.md` or docs/spec folder when the project only needs routing rules or handoff memory.
- Prefer GitHub Spec Kit when the project needs a formal spec-driven lifecycle with constitution, specify, plan, tasks, and implementation artifacts.
- Prefer OpenSpec when the project needs a lighter proposal/spec/task workflow without as much ceremony.
- Treat BMAD, Superpowers, and large research packs as reference material or opt-in project installs, not global defaults.
- Before adding a project kit, state the expected files/directories, install command, and rollback path. Ask if the setup has broad side effects or downloads/runs third-party code.

## Game and Mobile UI Routing

- For game-related research that should become reusable notes, reference files, GitHub candidate lists, or Codex skill material, route to `$game-reference-research`.
- For rough mobile game ideas, core loops, GDDs, FTUE, quests, retention, progression, or economy, route to `$mobile-game-design`.
- For game-like UI, HUDs, reward popups, shops, inventories, missions, visual style, or Figma/front-end game UI handoff, route to `$game-ui-art-direction`.
- For first-session walkthroughs, playtest-style critique, confusion, friction, churn risk, or whether the flow feels fun, route to `$player-experience-review`.
- For deciding what to build first, MVP/prototype scope, fake-vs-build decisions, or playable slice planning, route to `$prototype-slice-planner`.
- For testing mobile game prototypes, touch targets, HUD readability, safe areas, feedback feel, performance basics, or release checks, route to `$mobile-game-qa`.
- For game frontend implementation, pair the game skill with `$product-frontend-engineer`, `$frontend-ui-engineering`, `$webapp-testing`, `$playwright`, or `$browser-use:browser` as needed.

## Execution Discipline

- Prefer evidence over guessing.
- For substantial refactors, present a short plan before large edits.
- Ask before destructive actions or external side effects.
- Run focused verification for the touched surface when feasible.
- Keep answers concise and implementation-oriented.
- Do not adopt `@qa` by default during normal implementation.
- Do not use subagents unless the user explicitly asks for subagents, delegation, or parallel agent work.
