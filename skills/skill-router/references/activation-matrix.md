# Skill Activation Matrix

Use this as the final tie-breaker when multiple installed skills could fit. Pick the lightest exact match, usually one primary skill plus at most two supports.

## Priority Rules

1. Named skill wins: if the user names `$skill`, load that skill unless it is missing or unsafe.
2. Exact workflow wins over category: GitHub PR comments use `gh-address-comments`, not generic code review.
3. Router stays thin: use `skill-router` to choose and sequence, then hand off to the specialist skill.
4. Broad skills are support, not default: `senior-dev-lead`, `karpathy-guidelines`, and `best-practices` support specialist work but should not crowd out exact skills.
5. Third-party security/test skills need strong cues: use Trail of Bits skills when the request mentions security review, static analysis, fuzzing, supply chain, unsafe defaults, or misuse-resistant APIs.
6. Do not use subagent-heavy skills unless the user explicitly asks for subagents, delegation, or parallel agent work.

## Route Family Bundles

Use this table before falling into the larger common-route list. It keeps large skill inventories efficient.

| Family | Primary owner | Add at most two supports when | Avoid |
|---|---|---|---|
| Intake/router | `messy-request-interpreter` or `skill-router` | The request is fuzzy, mixed, or asks which skill/agent to use | Routing obvious single-step tasks |
| Research/intel | `research-report-writer` or `research-synthesizer` | Current facts, source comparison, or report format matter | Browsing for stable/local code facts |
| Planning/docs | `planning-document-writer` | The artifact type is ambiguous or formal | Stacking several planning skills before writing |
| Product prototype | `product-frontend-engineer` | Needs working screens, local preview, state, backend, or deploy | Using visual-only skills when code is needed |
| Visual design | `claude-design` | Needs artifact, mockup, storyboard, poster, deck, or options | Forcing app architecture before direction is chosen |
| Open Design artifact | Exact `od-*` skill | The output has a known artifact form: `DESIGN.md`, data report, D3 chart, decision room, diagram, dashboard, motion frame, or score review | Using generic visual design when the user asked for a structured artifact |
| Premium frontend | `gpt-taste` | Needs distinctive, non-generic, high-motion UI direction | Using it as a substitute for implementation/testing |
| Reference-to-UI | `image-to-code` | Screenshots or images should drive the build | Treating it as a general frontend planner |
| Full design workflow | `design-flow` | Needs brief -> IA -> tokens -> tasks -> review | Using for quick UI tweaks |
| Existing UI cleanup | `frontend-design-audit` or `ux-enhancer` | Existing product/page/component needs diagnosis or usability refactor | Applying to greenfield builds with no UI yet |
| Backend/API/data | `api-and-interface-design`, `database-schema-designer`, or `supabase` | Backend, schema, Auth, RLS, SQL, migrations, or Supabase is central | Pulling in Supabase for non-Supabase stacks |
| Code implementation | `incremental-implementation` | Repo changes are needed; add TDD/diagnose only if useful | Planning-only answers when the user asked to build |
| Debugging | `diagnose` | Cause is unknown, flaky, or multi-layered | Refactoring before reproducing |
| Review/security | Exact review or security skill | The user asks for review/audit/security or the surface is risky | Running heavyweight scans without strong cues |
| Verification | `webapp-testing`, `playwright`, `browser-use:browser`, focused tests | Work changed behavior or UI | Treating verification as a separate role by default |
| Deploy/ops | Exact deploy/CI/env/Docker/runbook skill | Target platform or operational artifact is named | Generic deploy advice when commands can verify |

## Counterproposal Gate

Use a short counterproposal gate before execution when the request is large, ambiguous, costly, or direction-setting.

Format:

1. Interpreted goal
2. Recommended path
3. Alternative A/B only when meaningfully different
4. Blocking questions only

Skip the gate for tiny fixes, direct command/output requests, explicitly specified edits, or when the user says "바로 해", "그냥 진행", or "묻지 말고 해".

### Design/Prototype Mode Gate

When a vague request could mean several creation modes, compare these explicitly and recommend one:

| User probably means | Recommended route | Use when |
|---|---|---|
| "Claude Design처럼", "artifact", "mockup", "시안", "옵션 보여줘", "포스터/덱/스토리보드" | `claude-design` | They need a visual artifact or direction before app code |
| "Open Design처럼", "DESIGN.md", "decision room", "데이터 리포트", "D3", "화이트보드 다이어그램", "모션 프레임", "대시보드 artifact" | Exact `od-*` skill | They need a structured artifact with a known format |
| "Lovable처럼", "작동하는 프로토타입", "앱으로", "localhost", "배포", "로그인/DB" | `product-frontend-engineer` + relevant support | They need working screens, state, backend, deployable app code |
| "처음부터 제대로 디자인 프로세스", "브리프부터", "IA/토큰/태스크까지" | `design-flow` | They need durable design decisions and implementation planning |
| "뭔가 불편함", "사용자가 헷갈림", "이 UI 봐줘", "전환율 떨어짐" | `frontend-design-audit` or `ux-enhancer` | Existing UI needs diagnosis or usability cleanup |

If the user says "개떡같이 말해도 알아서" or similar, do not ask them to know the vocabulary. Recommend the most likely route, name 1-2 alternatives, and proceed when low-risk.

## Project Kit Selection

Use this when the user wants a project-level workflow, spec system, research kit, or "apply this setup to a repo."

| Project need | Recommended path | Defer/avoid |
|---|---|---|
| Small fix, single feature tweak, light docs, quick research | Use global routing and local skills only | Do not initialize external kits |
| Project just needs consistent agent behavior | Add or update project-local `AGENTS.md` | Avoid Spec Kit/OpenSpec if no persistent spec artifacts are needed |
| Formal feature lifecycle, team-visible specs, approval checkpoints | Consider GitHub Spec Kit | Avoid for tiny or exploratory tasks |
| Lighter proposal/spec/task flow | Consider OpenSpec | Avoid if the user wants no project files added |
| Full agile/role workflow, large team process | Treat BMAD as opt-in/reference | Do not make it the global default |
| Skill-methodology overhaul or subagent workflows | Treat Superpowers as opt-in/reference | Do not use subagent-heavy paths unless explicitly requested |
| Academic/deep research workflow | Cherry-pick narrow research skills if needed | Do not install large research packs wholesale |

## Common Routes

| User situation | Primary skill | Support skills |
|---|---|---|
| Rough, mixed, shorthand, Korean/English fragments | `messy-request-interpreter` | `skill-router` |
| Broad "which skill/agent should handle this" | `skill-router` | `messy-request-interpreter` if unclear |
| Create/update/install skills | `skill-creator` or `skill-installer` | `skill-router` |
| Apply a workflow/spec/research kit to a project | `skill-router` | `planning-document-writer`, `research-synthesizer` if current kit choice needs verification |
| AX 컨설팅, AI 전환, AI 도입 전략, 업무 자동화, 에이전트 도입, AI PoC, AX 개발기획 | `ax-consulting-planner` | `research-report-writer`, `planning-document-writer`, `system-design` as needed |
| 기획서, 요구사항정의서, GDD, 화면설계서, 플로우차트, 개발문서 | `planning-document-writer` | Format-specific specialist skill |
| Formal document/report/proposal/spec deliverable | `planning-document-writer` | `documents:documents`, `presentations:Presentations`, or `spreadsheets:Spreadsheets` based on form |
| 리서칭보고서, 조사보고서, 시장조사, 기술조사, 벤치마킹, 경쟁사분석 | `research-report-writer` | `research-synthesizer`, report-specific specialist skill |
| Current web/tool/library research | `research-synthesizer` | `search-strategy`, `knowledge-synthesis` |
| PRD/spec/story/sprint/status work | `create-prd`, `feature-spec`, `user-stories`, `sprint-plan`, `project-status-report` | `prioritization-frameworks` |
| Product direction or what-to-build decision | `product-strategy`, `value-proposition`, `opportunity-solution-tree`, or `prioritize-features` | `user-research-synthesizer`, `metrics-dashboard` |
| Feature definition to implementation handoff | `feature-spec` | `user-stories`, `test-scenarios`, `api-and-interface-design` |
| Technical docs, architecture notes, README, developer guide | `technical-writer` | `documentation-and-adrs`, `api-documentation-writer` |
| API reference, OpenAPI/Swagger-style docs, SDK examples | `api-documentation-writer` | `api-and-interface-design`, `technical-writer` |
| SOP, runbook, operations procedure | `sop-builder` or `runbook-generator` | `technical-writer`, `risk-assessment` |
| Release notes, changelog, launch comms | `release-notes` or `changelog-generator` | `internal-comms`, `shipping-and-launch` |
| Meeting or conversation synthesis | `summarize-meeting` or `meeting-insights-analyzer` | `notion-knowledge-capture`, `handoff` |
| Notion-backed research, specs, or knowledge capture | Notion-specific skill | `research-synthesizer`, `planning-document-writer` |
| Word/PDF/slides/sheets artifact creation | Plugin skill for the file type | `technical-writer`, `pdf` for PDFs |
| Test strategy or release readiness | `testing-strategy` | `test-scenarios`, `webapp-testing` |
| CI/CD, environment, deploy, or operations setup | Exact platform/setup skill | `runbook-generator`, `gh-cli` for GitHub |
| Product flow + frontend build | `product-frontend-engineer` | `frontend-ui-engineering`, `webapp-testing` |
| Lovable/Bolt/v0-style prompt-to-app prototype | `product-frontend-engineer` | `gpt-taste`, `image-to-code`, `supabase`, `webapp-testing` as needed |
| Claude Design/Artifacts-style HTML artifact, visual prototype, deck, poster, storyboard | `claude-design` | `imagegen`, `browser-use:browser`, `playwright` |
| Create or update a project `DESIGN.md` | `od-design-md` | `design-brief`, `design-tokens` |
| Score/rate UI design quality before merge or launch | `od-plan-design-review` | `frontend-design-audit`, `design-review` |
| Research notes, interviews, tickets, surveys -> decision artifact | `od-research-decision-room` | `research-synthesizer`, `user-research-synthesizer` |
| KPI/activity/table dashboard artifact | `od-live-dashboard` | `product-frontend-engineer`, `webapp-testing` |
| CSV/Excel/JSON/pasted data -> visual report page | `od-data-report` | `spreadsheets:Spreadsheets`, `od-d3-visualization` |
| Complex chart, map, network, heatmap, treemap, or D3 visual | `od-d3-visualization` | `od-data-report`, `webapp-testing` |
| Whiteboard-style flow, architecture, or system diagram | `od-hand-drawn-diagrams` | `system-design`, `technical-writer` |
| Animated hero, kinetic poster, title card, loopable visual | `od-motion-frames` | `claude-design`, `imagegen` |
| Cross-platform UI convention or accessibility design check | `od-platform-design` | `accessibility`, `frontend-design-audit` |
| Full designer-led workflow from idea to implementation | `design-flow` | `design-brief`, `information-architecture`, `design-tokens`, `brief-to-tasks`, `design-review` |
| Design brief, IA, tokens, or build-task phase explicitly named | Exact phase skill | `product-frontend-engineer`, `frontend-ui-engineering` |
| Visual UI design only | `frontend-design` | `web-design-guidelines`, `imagegen` |
| Premium/anti-generic frontend direction | `gpt-taste` | `frontend-design`, `frontend-ui-engineering`, `webapp-testing` |
| Screenshot/reference image to web UI | `image-to-code` | `frontend-ui-engineering`, `playwright` |
| React/Next quality or performance | `vercel-react-best-practices` | `performance`, `core-web-vitals` |
| Figma handoff or Figma implementation | `figma-use` first | `figma`, `figma-implement-design`, `frontend-ui-engineering` |
| Bug, failing behavior, performance regression | `diagnose` | `debugging-and-error-recovery`, `test-driven-development` |
| Normal implementation/refactor | `incremental-implementation` | `karpathy-guidelines`, `test-driven-development` when logic changes |
| Architecture or system boundaries | `system-design` or `api-and-interface-design` | `improve-codebase-architecture`, `database-schema-designer` |
| New backend feature with unclear structure | `api-and-interface-design` | `database-schema-designer`, `test-driven-development` |
| New backend service/system | `system-design` | `api-and-interface-design`, `database-schema-designer` |
| Backend module/service cleanup | `improve-codebase-architecture` | `incremental-implementation`, focused tests |
| Backend endpoint implementation after contract is clear | `api-endpoint-scaffolder` | `test-driven-development`, `api-documentation-writer` |
| Backend API/schema migration or deprecation | `deprecation-and-migration` | `api-and-interface-design`, `database-schema-designer` |
| Supabase app, Auth, RLS, Storage, Edge Functions, migrations, or `supabase-js` | `supabase` | `supabase-postgres-best-practices`, `database-schema-designer`, `security-and-hardening` |
| Postgres schema/query/index/RLS performance review | `supabase-postgres-best-practices` | `database-schema-designer`, `supabase` |
| Need broader codebase context | `zoom-out` | `senior-dev-lead` |
| Existing review feedback to respond to | `receiving-code-review` | `gh-address-comments` if from GitHub |
| Code review before merge | `code-review-and-quality` | `differential-review` for security-sensitive diffs |
| GitHub PR comments | `gh-address-comments` | `gh-cli` |
| GitHub CI failure | `gh-fix-ci` | `gh-cli`, `ci-cd-and-automation` |
| GitHub API/private/rate-limited lookup | `gh-cli` | Exact GitHub skill if available |
| Security best-practice review | `security-best-practices` | `security-threat-model` |
| Security-sensitive diff review | `differential-review` | `insecure-defaults`, `sharp-edges` |
| Dangerous defaults/config/auth env audit | `insecure-defaults` | `security-and-hardening` |
| Misuse-resistant API/config design | `sharp-edges` | `api-and-interface-design` |
| Dependency takeover/supply-chain risk | `supply-chain-risk-auditor` | `dependency-auditor` |
| Custom Semgrep rule writing | `semgrep-rule-creator` | `sarif-parsing` for outputs |
| SARIF output analysis | `sarif-parsing` | `code-review-and-quality` |
| Stronger invariant tests | `property-based-testing` | `testing-strategy`, `test-driven-development` |
| Mutation testing | `mutation-testing` | `test-coverage-improver` |
| Fuzz harness creation | `harness-writing` | `coverage-analysis` |
| Python project setup/migration | `modern-python` | `env-setup-wizard`, `dependency-auditor` |
| Web app/browser verification | `webapp-testing` | `playwright`, `browser-use:browser` |
| Existing UI usability audit or confusing user flow | `frontend-design-audit` | `ux-enhancer`, `accessibility`, `webapp-testing` |
| React component usability cleanup | `ux-enhancer` | `frontend-ui-engineering`, `webapp-testing` |
| Mobile game design/prototype/QA | Game-specific skills | `product-frontend-engineer`, `webapp-testing` |
| Technical/API docs/runbooks/SOPs | `technical-writer`, `api-documentation-writer`, `runbook-generator`, `sop-builder` | `doc-coauthoring` |
| Word/PDF/slides/sheets artifacts | Plugin skill for that file type | `pdf` for PDFs |
| Conversation continuation handoff | `handoff` | `context-engineering` |

## Avoid Routes

- Do not use `@qa` or QA skills for ordinary coding unless review/testing/audit is the main request.
- Do not use `semgrep` or `codeql` raw Trail of Bits skills by default; prefer installed `semgrep-rule-creator` and `sarif-parsing`, or ask before running heavyweight scans.
- Do not stack multiple planning skills for small tasks. Use one planning skill, then execute.
- Do not invoke connector-dependent skills such as `linear`, `sentry`, or Figma workflows unless the connector/auth context is available or the user explicitly wants setup.
