---
name: skill-router
description: Lightweight meta-skill for choosing and sequencing Codex skills, references, tools, and workflows. Use when the user asks which skill to use, wants an integrated manager/orchestrator, has a broad task spanning planning, research, frontend, development, documentation, spreadsheets, presentations, OpenAI APIs, or skill creation, or explicitly says to route, coordinate, orchestrate, distribute, or choose the right skills.
---

# Skill Router

Use this skill as a thin dispatcher. Do not solve the whole task inside the router. Select the smallest useful skill set, load only the needed skill bodies or references, then proceed with the work.

## Routing Loop

1. If the request is vague, scattered, overloaded, or casual shorthand, use `$messy-request-interpreter` first.
2. If the request arrives as a routing brief from `$messy-request-interpreter`, treat that brief as the source of truth.
3. Classify the normalized goal into one or more work lanes.
4. Assign the lightest responsible role.
5. Choose the minimum skill set from `references/skill-catalog.md`.
6. If several skills fit or newly installed GitHub/community skills are involved, use `references/activation-matrix.md` as the final tie-breaker.
7. Load the selected skill instructions or references only when needed.
8. Sequence work as planning, execution, verification, and delivery.
9. If no installed skill fits, use general Codex ability and note the gap.
10. If a reusable gap appears often, suggest creating or installing a new skill.

## Skill Operating Model

Route by the smallest useful bundle:

| Situation | Primary | Supports | Verification |
|---|---|---|---|
| Vague, shorthand, mixed Korean/English | `messy-request-interpreter` | `skill-router` | Confirm interpreted goal in one sentence |
| Research or comparison | `research-report-writer` or `research-synthesizer` | `search-strategy`, `knowledge-synthesis` only when needed | Cite current sources and separate facts from inference |
| Planning artifact | `planning-document-writer` | Exact artifact skill | Check the document shape against the requested use |
| Working web/app prototype | `product-frontend-engineer` | `frontend-ui-engineering`, `gpt-taste`, `image-to-code`, `supabase` as needed | `webapp-testing`, `playwright`, or Browser |
| Visual design artifact | `claude-design` | `imagegen`, Browser/Playwright | Inspect rendered artifact or generated asset |
| Open Design specialized artifact | Exact `od-*` skill | `claude-design`, `webapp-testing`, or Browser only when needed | Inspect generated artifact, table, chart, or document structure |
| Image/video generation | Exact `media-*` skill | `imagegen`, Browser, Playwright, or provider setup only when needed | Inspect generated image, prompt, storyboard, frames, or provider output |
| Full designer workflow | `design-flow` | Phase skills only for the current phase | `design-review` before handoff/build |
| Existing UI improvement | `frontend-design-audit` or `ux-enhancer` | `accessibility`, `webapp-testing` | Verify the changed screen/flow |
| Implementation/refactor | `incremental-implementation` | `karpathy-guidelines`, `test-driven-development` when behavior changes | Focused tests, lint, or targeted command |
| Debugging | `diagnose` | `debugging-and-error-recovery` | Reproduce then verify the fix |
| API/data/backend | `api-and-interface-design` or `database-schema-designer` | `supabase`, `supabase-postgres-best-practices` when applicable | Tests, queries, migrations, or schema diff |
| Deployment/ops | Exact deploy/CI/env/Docker/runbook skill | Platform-specific support | Smoke test or deploy command output |

Rules of thumb:

- Use one primary skill plus at most two supports by default.
- Use three or more skills only for explicit multi-phase work.
- Broad skills are lenses, not default owners.
- Do not keep skills active across unrelated turns; re-route from the newest request.
- If two skills overlap, pick the one that owns the final artifact.
- If a named skill is missing from the active session list, check `/Users/est/.codex/skills` and `/Users/est/.agents/skills` before declaring it unavailable.

## Prototype Mode Counterproposal

For ambiguous design/prototype requests, actively compare modes before routing. The user should not need to know whether to say "Claude Design", "Lovable", "artifact", "mockup", or "prototype".

- Recommend `$claude-design` when the fastest useful output is a visual artifact, concept direction, HTML mockup, interactive prototype, deck, poster, storyboard, or design exploration.
- Recommend the exact `od-*` skill when the user asks for a specialized Open Design-style artifact: `DESIGN.md`, score-based design review, research decision room, live dashboard, data report, D3 visualization, hand-drawn diagram, motion frame, or cross-platform design rule check.
- Recommend the exact `media-*` skill when the user asks for image generation, image editing, posters, visual references, marketing screenshots, device mockups, GIF/stickers, Sora/Fal/Replicate workflows, Remotion, or video-frame output.
- Recommend `$product-frontend-engineer` with `$gpt-taste`, `$image-to-code`, `$supabase`, and verification skills when the user wants a working app, local preview, stateful UI, backend, auth, database, or deployment.
- Recommend `$design-flow` when the user needs a complete design-to-build process, durable design decisions, IA, tokens, build tasks, and post-build review.
- Recommend `$frontend-design-audit` or `$ux-enhancer` when improving an existing UI matters more than creating a new one.

Use this compact format when the mode is genuinely ambiguous:

```text
내 해석: ...
추천 경로: ...
대안: ...
진행: ...
```

If the recommended path is clearly best and low-risk, proceed after the counterproposal instead of waiting for a choice.

## Role Assignment

Assign one primary role before selecting specialist skills:

- `@router`: unclear, mixed, broad, or "handle this somehow" requests.
- `@pmo`: PRDs, feature specs, user stories, sprint plans, roadmaps, status reports, risks, stakeholders, handoffs.
- `@product`: product flows, UX, screens, dashboards, frontend implementation, React/Next, web quality.
- `@game`: mobile game concepts, core loops, game-like UI, HUDs, player experience, prototype slices, playtest and mobile game QA.
- `@dev`: implementation, bug fixes, refactors, tests, APIs, local setup, Docker, dependencies, repo work.
- `@arch`: architecture, system design, data flow, service boundaries, API contracts, schemas, migrations, scaling tradeoffs.
- `@intel`: research, comparisons, market/customer/competitor discovery, current facts, source synthesis.
- `@doc`: technical docs, API docs, runbooks, SOPs, internal comms, release notes, reports, long-form writing.
- `@qa`: use only when explicitly requested or when verification/review/audit/release-readiness is the main task.

If multiple roles fit, choose the role that owns the final output. Use the others as perspectives or supporting skills, not as separate process stages.

## Lane Selection

- Product planning, feature slicing, and end-to-end frontend delivery: use `$product-frontend-engineer`.
- Lovable/Bolt/v0-style prompt-to-app prototypes, rapid SaaS/webapp scaffolds, or "make this into a working prototype": use `$product-frontend-engineer` as the hub; pair with `$gpt-taste` for high-end visual direction, `$image-to-code` when screenshots/reference images should drive the UI, `$supabase` when auth/database/storage/edge functions are involved, and `$webapp-testing`/`$playwright` for local preview verification.
- Claude Design/Artifacts-style visual work, HTML design artifacts, clickable prototypes, landing page concepts, slide-like web decks, storyboards, posters, or "show me design options": use `$claude-design`; pair with `$imagegen` for raster assets, `$browser-use:browser`/`$playwright` for viewing the artifact, and `$frontend-ui-engineering` only when the artifact should become app code.
- Open Design-style specialized artifacts: use `$od-design-md` for `DESIGN.md`; `$od-plan-design-review` for score-based design gates; `$od-research-decision-room` for evidence-backed research decisions; `$od-live-dashboard` for KPI/activity/table dashboards; `$od-data-report` for structured-data report pages; `$od-d3-visualization` for complex interactive charts; `$od-hand-drawn-diagrams` for whiteboard-like diagrams; `$od-motion-frames` for kinetic hero/title-card frames; `$od-platform-design` for cross-platform UI constraints.
- Image/video generation: use `$media-imagegen` for direct image generation/editing; `$media-web-image-direction` for website section images; `$media-mobile-image-direction` for mobile app screen concepts; `$media-canvas-design` or `$media-poster-hero` for posters/static art; `$media-screenshots-marketing` for polished app/site screenshots; `$media-device-mockup-3d` for device showcases; `$media-video-hyperframes` for HTML video frames; `$media-remotion` for React-rendered video; `$media-sora`, `$media-fal-generate`, or `$media-replicate` only when provider execution is requested and available.
- Full designer-led UI workflow from idea to build: use `$design-flow`; for narrower steps use `$design-brief`, `$information-architecture`, `$design-tokens`, `$brief-to-tasks`, or `$design-review` based on the requested phase.
- Game-related research that should become reusable references, source maps, GitHub skill candidate lists, or Codex skill material: use `$game-reference-research`; pair with `$research-synthesizer` for current web research and `$skill-creator` when creating or updating skill files.
- Mobile game concepts, GDDs, core loops, FTUE, progression, retention, quests, missions, economy, or "is this fun/sticky": use `$mobile-game-design`.
- Game-like UI, mobile HUDs, reward popups, shop/inventory/mission screens, visual style, UI tokens, or Figma/frontend game UI handoff: use `$game-ui-art-direction`; pair with `$figma-generate-design`, `$figma-use`, `$frontend-design`, or `$imagegen` when the user wants visuals or assets.
- Player-perspective walkthroughs, playtest-style critique, first-session friction, confusion, churn risk, control comprehension, or reward clarity: use `$player-experience-review`.
- First playable scope, prototype slice planning, MVP boundaries, fake-vs-build choices, and implementation handoff for a mobile game: use `$prototype-slice-planner`.
- Mobile game prototype testing, touch usability, HUD readability, safe areas, feedback feel, performance basics, and release smoke checks: use `$mobile-game-qa` with `$webapp-testing`, `$playwright`, `$playwright-interactive`, or `$browser-use:browser` when browser verification is possible.
- Vague, messy, mixed, emotional, or shorthand requests: use `$messy-request-interpreter` before selecting specialist skills.
- Senior engineering explanation, tradeoffs, risk, architecture, or developer handoff: use `$senior-dev-lead`.
- AX consulting and AI transformation requests such as AX 컨설팅, AI 전환, AI 도입 전략, 업무 자동화 컨설팅, 에이전트 도입, AI PoC, AI 서비스 기획, 사내 자동화, AI 업무혁신, or AX 개발기획: use `$ax-consulting-planner` first, then route to research, planning documents, architecture, implementation, rollout, or artifact plugins as needed.
- Planning/document-format requests such as 기획서, GDD, 요구사항정의서, 기능명세서, 화면설계서, 플로우차트, 개발문서, API 명세, QA 시나리오, SOP, or runbook: use `$planning-document-writer` first, then the chosen specialist skill.
- Research/report-format requests such as 리서칭보고서, 조사보고서, 시장조사, 기술조사, 경쟁사분석, 벤치마킹, 레퍼런스 조사, 트렌드 리포트, 논문/자료 요약, or 의사결정 보고서: use `$research-report-writer` first, then the chosen research or analysis skill.
- Project-level spec workflow requests such as "이 프로젝트에 기획-구현 흐름 잡아줘", "Spec Kit 적용", "OpenSpec 적용", "프로젝트 킷 붙여줘", long-running greenfield work, or team-shared specs: inspect the repo first, then recommend one of local `AGENTS.md` only, GitHub Spec Kit, OpenSpec, or defer. Initialize an external kit only after the recommended path is accepted or the user clearly asked to proceed.
- PRDs, user stories, meetings, roadmaps, stakeholder tracking, prioritization, sprint planning, release notes, and test scenarios: use the PM execution skills listed in `references/skill-catalog.md`.
- Product discovery, feature request triage, interviews, opportunity trees, and metrics dashboards: use the PM discovery skills listed in `references/skill-catalog.md`.
- Product strategy, value proposition, SWOT, competitive forces, and pricing: use the PM strategy skills listed in `references/skill-catalog.md`.
- Code review, debugging, TDD, implementation planning, ADRs, API design, migration, CI/CD, or launch readiness: use the engineering skills listed in `references/skill-catalog.md`.
- For coding work in general, apply `$karpathy-guidelines` as baseline discipline when it is not already covered by stronger project instructions.
- System design, tech debt, testing strategy, coverage improvement, dependency audits, Docker/env setup, database schema design, API scaffolding, or MCP server work: use the imported engineering skills listed in `references/skill-catalog.md`.
- Backend structure and service design: use `$system-design` when boundaries, modules, data flow, scaling, reliability, workers, queues, or caching are the hard part; pair with `$api-and-interface-design` for contracts and `$database-schema-designer` for persistence.
- Backend API contracts: use `$api-and-interface-design` when endpoints, request/response shape, errors, pagination, idempotency, permissions, versioning, or frontend/backend contracts are the hard part.
- Backend data modeling: use `$database-schema-designer` when entities, relationships, migrations, indexes, constraints, tenancy, audit trails, or reporting queries are the hard part.
- Backend endpoint coding: use `$api-endpoint-scaffolder` only after the contract and data model are clear enough to implement; pair with `$test-driven-development` for behavior changes.
- Backend architecture cleanup: use `$improve-codebase-architecture` for service/module boundaries, dependency direction, testability, and AI-navigable structure.
- Backend migration/deprecation: use `$deprecation-and-migration` when changing existing APIs, schemas, auth behavior, events, or compatibility contracts.
- Backend security: use `$security-and-hardening`, `$security-threat-model`, `$insecure-defaults`, or `$sharp-edges` when auth, permissions, secrets, tenant isolation, webhooks, payments, or untrusted input are central.
- Supabase-specific work including Auth, RLS, Storage, Realtime, Edge Functions, migrations, `supabase-js`, or Lovable-style Supabase-backed apps: use `$supabase`; pair with `$supabase-postgres-best-practices` for schema, SQL, indexes, query performance, connection scaling, or RLS performance/security review.
- Feature specs, change management, risk assessment, project status reporting, SOPs, market sizing, user research synthesis, or weak-signal research: use the imported planning/research/documentation skills listed in `references/skill-catalog.md`.
- Document deliverable routing: when the user asks for 문서, 보고서, 제안서, 기획서, 요구사항정의서, 기능명세서, API 명세서, DB 설계서, SOP, runbook, 양식, 템플릿, 제출용, 공유용, or "파일로", route toward a real artifact instead of only a Markdown memo. Use `$documents:documents` for formal/narrative `.docx`, `$presentations:Presentations` for decks, and `$spreadsheets:Spreadsheets` for tables/models/trackers. Use Markdown only when the user asks for 초안, 메모, 내용만, README, md, or inline planning.
- Document shape selection: use `$planning-document-writer` when the user asks for 기획서, 요구사항정의서, 기능명세서, 화면설계서, 개발문서, API 명세, QA 시나리오, SOP, runbook, or is unsure which document they need.
- Research-backed writing: use `$research-report-writer` when the output should be a structured report and `$research-synthesizer` when current facts, citations, source comparison, or decision support matter.
- Product/PM artifacts: use `$create-prd`, `$feature-spec`, `$user-stories`, `$test-scenarios`, `$sprint-plan`, `$outcome-roadmap`, `$risk-assessment`, or `$project-status-report` according to the requested artifact.
- Technical writing, API documentation, or operational runbooks: use `$technical-writer`, `$api-documentation-writer`, `$runbook-generator`, or `$sop-builder` as appropriate.
- Release, rollout, and handoff writing: use `$release-notes`, `$changelog-generator`, `$internal-comms`, `$shipping-and-launch`, or `$handoff` when preserving changes or communicating launch state.
- Notion knowledge/spec workflows: use `$notion-knowledge-capture`, `$notion-research-documentation`, `$notion-spec-to-implementation`, or `$notion-meeting-intelligence` when Notion is the source, destination, or operating memory.
- Meeting insights, content research writing, lead/company research, changelogs, file organization, invoices, competitive ad analysis, or developer growth analytics: use the Composio-sourced utility skills listed in `references/skill-catalog.md`.
- Distinctive frontend visual design: use `$frontend-design` or `$web-design-guidelines`; use `$gpt-taste` when the user wants premium, non-generic, high-motion, Awwwards-style, or anti-slop frontend direction.
- Image/screenshot/reference-driven website implementation: use `$image-to-code` first, then `$frontend-ui-engineering` for implementation and `$webapp-testing`/`$playwright` for verification.
- Existing frontend usability critique, confusing flows, cluttered screens, weak CTAs, missing loading/empty/error states, or "users are confused": use `$frontend-design-audit` for full audit or `$ux-enhancer` when the task is a focused React component usability refactor.
- React/Next.js implementation performance: use `$vercel-react-best-practices`.
- Web quality audits: use `$web-quality-audit`, `$performance`, `$accessibility`, `$core-web-vitals`, `$seo`, or `$best-practices`.
- Browser/app testing: use `$webapp-testing`, `$playwright`, `$screenshot`, or `$browser-use:browser`.
- Security review: use `$security-best-practices`, `$security-threat-model`, or `$security-ownership-map`.
- CLI/tool creation: use `$cli-creator`.
- Notion research/spec workflows: use `$notion-research-documentation` or `$notion-spec-to-implementation`.
- Collaborative document drafting: use `$doc-coauthoring`; for file-level `.docx` work use `$documents:documents`.
- Brand or communication writing: use `$brand-guidelines` or `$internal-comms` when relevant.
- Creating or updating skills: use `$skill-creator`.
- Installing curated or GitHub skills: use `$skill-installer`.
- OpenAI API, models, Agents SDK, or ChatGPT Apps: use `$openai-docs`.
- Documents, Word, redlines, comments, or `.docx`: use `$documents:documents`.
- Presentations, slides, PowerPoint, or `.pptx`: use `$presentations:Presentations`.
- Spreadsheets, CSV/XLSX analysis, formulas, charts, or data cleanup: use `$spreadsheets:Spreadsheets`.
- Image generation or bitmap editing: use `$imagegen`.
- Browser inspection or local web UI verification: use `$browser-use:browser`.
- Broad web research synthesis or source comparison: use `$research-synthesizer` and follow `references/research-workflow.md`.
- GitHub/community skill ambiguity, especially between debugging, review, QA, security, and workflow skills: follow `references/activation-matrix.md`.
- Plain coding tasks without a stronger skill: inspect the repo and work normally.

## Orchestration Rules

- Prefer one primary skill plus at most two supporting skills.
- Avoid loading full external skill packs unless the task clearly needs them.
- Do not run multi-agent delegation unless the user explicitly asks for subagents or parallel agent work.
- For non-trivial, ambiguous, expensive, or direction-setting tasks, use a brief counterproposal gate before execution: interpreted goal, recommended path, 1-2 alternatives if meaningful, blocking questions only.
- For design/prototype ambiguity, the counterproposal must explicitly distinguish Claude Design-style visual artifact vs Lovable-style working app vs full designer workflow vs UX audit when those options could fit.
- For project kit decisions, keep global routing as the default; use external kits only project-locally when they add real value. Favor local `AGENTS.md` for light routing, GitHub Spec Kit for formal spec-driven lifecycles, OpenSpec for a lighter proposal/spec/task flow, and BMAD/Superpowers/research packs only as explicit opt-ins or reference material.
- For complex build tasks, make a short plan, then execute; do not produce a plan and stop unless asked.
- For research-backed recommendations, browse current sources and cite them.
- For file artifacts, use the relevant document/spreadsheet/presentation skill rather than hand-rolling formats.

## Output Contract

When the router is explicitly requested, briefly state:

- selected role
- selected lane
- selected skill or workflow
- why it fits
- what verification will be used

Then perform the task.
