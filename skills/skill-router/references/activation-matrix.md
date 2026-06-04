# Skill Activation Matrix

Use this as the final tie-breaker when several installed lean-profile skills could fit. Pick the lightest exact match, usually one primary skill plus at most two supports.

## Priority Rules

1. Named installed skill wins.
2. Exact workflow wins over category.
3. Router stays thin: choose, then hand off.
4. Broad skills are support, not default owners.
5. Security/test skills need strong cues.
6. If a removed niche skill would have fit, use the nearest installed representative skill. Mention reinstalling only when the exact workflow matters.

## Route Family Bundles

| Family | Primary owner | Add support when | Avoid |
|---|---|---|---|
| Intake/router | `messy-request-interpreter` or `skill-router` | Request is fuzzy or asks which skill/agent to use | Routing obvious single-step tasks |
| Research/intel | `research-report-writer` or `research-synthesizer` | Current facts, source comparison, or report format matter | Browsing for stable local code facts |
| Planning/docs | `planning-document-writer` | Artifact type is ambiguous or formal | Stacking several planning skills before writing |
| Product prototype | `product-frontend-engineer` | Needs working screens, local preview, state, backend, or deploy | Using visual-only skills when code is needed |
| Visual design | `claude-design` | Needs artifact, mockup, storyboard, poster, deck, or options | Forcing app architecture before direction |
| Codex image generation | `media-image-director` | Image, poster, thumbnail, UI reference, product mockup, edit, variation, or image prompt is central | Treating image generation as generic frontend design |
| Open Design artifact | Exact `od-*` skill | Output has a known artifact form | Using generic visual design for a structured artifact |
| Premium frontend | `gpt-taste` | Needs distinctive, non-generic, high-motion UI direction | Using it as a substitute for implementation/testing |
| Reference-to-UI | `image-to-code` | Screenshots or images should drive the build | Treating it as a general frontend planner |
| Full design workflow | `design-flow` | Needs brief -> IA -> tokens -> tasks -> review | Using for quick UI tweaks |
| Existing UI cleanup | `frontend-design-audit` or `ux-enhancer` | Existing product/page/component needs diagnosis or usability refactor | Applying to greenfield builds with no UI yet |
| Mobile game design | Exact game skill | Core loop, HUD, playable slice, playtest review, or mobile game QA is central | Treating a game concept like generic SaaS |
| Backend/API/data | `api-and-interface-design`, `database-schema-designer`, or `supabase` | Backend, schema, Auth, RLS, SQL, migrations, or Supabase is central | Pulling in Supabase for non-Supabase stacks |
| Code implementation | `incremental-implementation` | Repo changes are needed | Planning-only answers when user asked to build |
| Debugging | `diagnose` | Cause is unknown, flaky, or multi-layered | Refactoring before reproducing |
| Review/security | Exact review/security skill | User asks for review/audit/security or surface is risky | Running heavyweight review without strong cues |
| Verification | `webapp-testing`, `playwright`, Browser, or focused tests | Work changed behavior or UI | Treating verification as a separate role by default |
| Deploy/ops | Exact deploy/env/Docker/GitHub skill | Target platform or operational artifact is named | Generic advice when commands can verify |

## Common Routes

| User situation | Primary skill | Support skills |
|---|---|---|
| Rough, mixed, shorthand, Korean/English fragments | `messy-request-interpreter` | `skill-router` |
| Broad "which skill/agent should handle this" | `skill-router` | `messy-request-interpreter` if unclear |
| AX consulting, AI transformation, AI adoption, automation consulting | `ax-consulting-planner` | `research-report-writer`, `planning-document-writer`, `system-design` |
| Planning doc, requirements, GDD, feature spec, screen spec | `planning-document-writer` | `create-prd`, `feature-spec`, `user-stories`, `test-scenarios` |
| Research report, benchmarking, market/technical research | `research-report-writer` | `research-synthesizer`, `search-strategy`, `knowledge-synthesis` |
| Product direction or what-to-build decision | `product-strategy` or `prioritize-features` | `metrics-dashboard`, `user-research-synthesizer` |
| Sprint/status/risk work | `sprint-plan`, `project-status-report`, or `risk-assessment` | `technical-writer` |
| Technical docs, README, developer guide | `technical-writer` | `documentation-and-adrs`, `api-documentation-writer` |
| API docs | `api-documentation-writer` | `api-and-interface-design`, `technical-writer` |
| SOP or runbook | `sop-builder` or `runbook-generator` | `technical-writer`, `risk-assessment` |
| Release notes or changelog | `release-notes` or `changelog-generator` | `handoff` |
| Meeting or conversation synthesis | `summarize-meeting` | `notion-knowledge-capture`, `handoff` |
| Notion research/spec/knowledge | Notion-specific skill | `research-synthesizer`, `planning-document-writer` |
| Product flow + frontend build | `product-frontend-engineer` | `frontend-ui-engineering`, `webapp-testing` |
| Lovable/Bolt/v0-style prototype | `product-frontend-engineer` | `gpt-taste`, `image-to-code`, `supabase`, `webapp-testing` |
| Visual artifact, poster, storyboard | `claude-design` | `media-image-director`, `playwright` |
| README visual, poster, thumbnail, social card | `media-image-director` | `claude-design` for broader art direction |
| App/game UI reference image | `media-image-director` | `game-ui-art-direction`, `od-platform-design` |
| Existing image restyle or variation | `media-image-director` | image generation/edit tool |
| Project `DESIGN.md` | `od-design-md` | `design-brief`, `design-tokens` |
| Score/rate UI design quality | `od-plan-design-review` | `frontend-design-audit`, `design-review` |
| Research notes -> decision artifact | `od-research-decision-room` | `research-synthesizer`, `user-research-synthesizer` |
| Dashboard artifact | `od-live-dashboard` | `product-frontend-engineer`, `webapp-testing` |
| Data -> visual report page | `od-data-report` | `od-d3-visualization` |
| Complex chart/map/network/heatmap | `od-d3-visualization` | `od-data-report`, `webapp-testing` |
| Whiteboard-style flow/architecture diagram | `od-hand-drawn-diagrams` | `system-design`, `technical-writer` |
| Animated hero/title card | `od-motion-frames` | `claude-design`, `media-image-director` |
| Cross-platform UI convention check | `od-platform-design` | `accessibility`, `frontend-design-audit` |
| Full designer-led workflow | `design-flow` | Phase skills only |
| Rough mobile game idea/GDD/core loop | `mobile-game-design` | `prototype-slice-planner`, `game-ui-art-direction` |
| Game HUD/reward/shop/mission UI | `game-ui-art-direction` | `frontend-design`, `mobile-game-qa` |
| First playable MVP scope | `prototype-slice-planner` | `mobile-game-design`, `product-frontend-engineer` |
| Playtest-style review | `player-experience-review` | `mobile-game-design`, `prototype-slice-planner` |
| Mobile game prototype QA | `mobile-game-qa` | `webapp-testing`, `playwright` |
| Game reference research | `game-reference-research` | `research-synthesizer` |
| Premium frontend direction | `gpt-taste` | `frontend-design`, `frontend-ui-engineering`, `webapp-testing` |
| Screenshot/reference image to web UI | `image-to-code` | `frontend-ui-engineering`, `playwright` |
| React/Next quality or performance | `react-best-practices` | `performance`, `core-web-vitals` |
| Bug or regression | `diagnose` | `debugging-and-error-recovery`, `test-driven-development` |
| Normal implementation/refactor | `incremental-implementation` | `karpathy-guidelines`, `test-driven-development` |
| Architecture or system boundaries | `system-design` | `api-and-interface-design`, `database-schema-designer` |
| API contract | `api-and-interface-design` | `database-schema-designer`, `technical-writer` |
| Data model | `database-schema-designer` | `api-and-interface-design`, `test-driven-development` |
| Supabase/Auth/RLS/Storage/Edge Functions | `supabase` | `supabase-postgres-best-practices`, `security-and-hardening` |
| Postgres SQL/index/RLS performance | `supabase-postgres-best-practices` | `database-schema-designer`, `supabase` |
| Code review before merge | `code-review-and-quality` | `security-best-practices` when risky |
| GitHub PR comments | `gh-address-comments` | `gh-cli` |
| GitHub CI failure | `gh-fix-ci` | `gh-cli` |
| Security best-practice review | `security-best-practices` | `security-and-hardening` |
| Dangerous defaults/config/auth env audit | `insecure-defaults` | `security-and-hardening` |
| Misuse-resistant API/config design | `sharp-edges` | `api-and-interface-design` |
| Web app/browser verification | `webapp-testing` | `playwright`, Browser |
| Existing UI usability audit | `frontend-design-audit` | `ux-enhancer`, `accessibility`, `webapp-testing` |
| React component usability cleanup | `ux-enhancer` | `frontend-ui-engineering`, `webapp-testing` |
| Environment setup | `env-setup-wizard` | `docker-debugger`, `dependency-auditor` |
| Deploy to Vercel/Netlify/Cloudflare/Render | Exact deploy skill | `webapp-testing` smoke check |

## Avoid Routes

- Do not use `@qa` or QA skills for ordinary coding unless review/testing/audit is the main request.
- Do not stack multiple planning skills for small tasks. Use one planning skill, then execute.
- Do not route to removed connector-dependent or niche skills unless the user explicitly asks to install them again.
