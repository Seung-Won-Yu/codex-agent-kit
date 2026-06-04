# Skill Catalog

Use this catalog as the local routing map. Prefer installed local skills over external recommendations.

## Routing Priorities

- Use `references/activation-matrix.md` when several skills could fit the same request.
- Choose the narrowest exact workflow before a broad category skill.
- Prefer one primary skill plus at most two supporting skills.
- Treat GitHub/community security, fuzzing, mutation, and static-analysis skills as opt-in by clear cue, not default coding behavior.
- Do not route to subagent-heavy workflows unless the user explicitly asks for subagents, delegation, or parallel agent work.

## Installed Local Skills

### skill-router

- Purpose: choose and sequence skills.
- Use for: broad tasks, multi-domain tasks, "which skill should I use", "orchestrate this", "route this".
- Avoid for: single obvious tasks where the correct skill is already named.

### product-frontend-engineer

- Purpose: product planning, UX, frontend implementation, React/Next patterns, web quality.
- Use for: product feature planning, UI redesign, dashboard/app/page implementation, accessibility/performance/SEO review.
- Supporting references: product planning, frontend design, React/Next implementation, web quality.

### senior-dev-lead

- Purpose: 10-year developer leader guidance for PMO, product, and technical decision support.
- Use for: explaining unfamiliar engineering concepts, assessing feasibility, creating developer handoffs, reviewing architecture risk, debugging plans, code review framing, and translating product asks into implementation slices.

### messy-request-interpreter

- Purpose: intake layer that turns rough, vague, overloaded, or casual requests into clear work briefs.
- Use for: "알아서", "대충", "이런 느낌", mixed PMO/development/research requests, scattered notes, emotional context, unclear output expectations.
- Route before specialist skills when the user intent needs normalization.

### planning-document-writer

- Purpose: choose and draft the right planning document format before invoking specialist skills.
- Use for: 기획서, GDD, 요구사항정의서, 기능명세서, 화면설계서, IA, user flow, flowchart, 플로우차트, 개발기획서, QA 시나리오, API 명세, DB 설계서, ADR, SOP, runbook.
- Pair with: `mobile-game-design`, `create-prd`, `feature-spec`, `system-design`, `api-and-interface-design`, `database-schema-designer`, `test-scenarios`, `technical-writer`, or file artifact plugins depending on the chosen document.

### research-report-writer

- Purpose: choose, research, and draft the right report format before invoking source and analysis skills.
- Use for: 리서칭보고서, 조사보고서, 시장조사, 기술조사, 경쟁사분석, 벤치마킹, 레퍼런스 조사, 논문/자료 요약, 의사결정 보고서, 트렌드 리포트, tool/library comparison.
- Pair with: `research-synthesizer`, `knowledge-synthesis`, `market-sizing`, `swot-analysis`, `porters-five-forces`, `pricing-strategy`, `user-research-synthesizer`, `weak-signal-synthesizer`, `technical-writer`, or `planning-document-writer`.

### ax-consulting-planner

- Purpose: AI transformation and AX consulting hub that turns business/process ambiguity into use cases, PoC scope, development planning, architecture, roadmap, rollout, and consulting artifacts.
- Use for: AX 컨설팅, AI 전환, AI 도입 전략, 업무 자동화 컨설팅, 에이전트 도입, AI PoC, AI 서비스 기획, 사내 자동화, AI 업무혁신, AX 개발기획, ROI, operating model, roadmap, or implementation-ready AI consulting handoff.
- Pair with: `research-report-writer`, `planning-document-writer`, `system-design`, `api-and-interface-design`, `openai-docs`, `mcp-builder`, `change-management`, `risk-assessment`, `sop-builder`, `presentations:Presentations`, `documents:documents`, or `spreadsheets:Spreadsheets` depending on the artifact.

## Local Codex Agent Kit Skills

### od-design-md

- Purpose: create and maintain `DESIGN.md` as a durable source of truth for visual rules, tokens, and design direction.
- Use for: "DESIGN.md 만들어줘", design system notes, visual rules doc, token source of truth, project design memory.
- Pair with: `design-brief`, `design-tokens`, `information-architecture`.

### od-platform-design

- Purpose: route cross-platform design work through web, iOS, Android, and accessibility conventions.
- Use for: platform design checks, Apple HIG/Material/WCAG-style constraints, mobile/web consistency reviews.
- Pair with: `accessibility`, `frontend-design-audit`, `ux-enhancer`.

### od-plan-design-review

- Purpose: score UI quality like a senior designer and flag weak AI-looking patterns before launch or merge.
- Use for: design rating, AI slop check, senior designer review, pre-launch visual gate.
- Pair with: `frontend-design-audit`, `design-review`, `webapp-testing`.

### od-research-decision-room

- Purpose: turn messy qualitative signals into a shareable HTML decision artifact.
- Use for: interview notes, support tickets, survey excerpts, usability findings, evidence-backed product decisions.
- Pair with: `research-synthesizer`, `user-research-synthesizer`, `opportunity-solution-tree`.

### od-live-dashboard

- Purpose: create self-contained dashboard artifacts with KPIs, activity feeds, and tables.
- Use for: team dashboard, ops dashboard, status room, Notion/Linear/mock dashboard artifact.
- Pair with: `product-frontend-engineer`, `webapp-testing`, `od-data-report`.

### od-data-report

- Purpose: convert CSV, Excel, JSON, or pasted data into a polished visual report page.
- Use for: data report, KPI report, finance/product weekly report, table plus charts.
- Pair with: `spreadsheets:Spreadsheets`, `od-d3-visualization`, `research-synthesizer`.

### od-d3-visualization

- Purpose: guide complex interactive data visualization work using D3-style patterns.
- Use for: D3 charts, maps, networks, treemaps, heatmaps, sankey, force graphs, explanatory graphics.
- Pair with: `od-data-report`, `webapp-testing`, `performance`.

### od-hand-drawn-diagrams

- Purpose: route diagrams toward whiteboard or Excalidraw-style sketches.
- Use for: architecture diagrams, flowcharts, system maps, concept diagrams, "손그림 느낌".
- Pair with: `system-design`, `technical-writer`, `planning-document-writer`.

### od-motion-frames

- Purpose: create loopable CSS motion compositions for animated heroes, title cards, or video-ready frames.
- Use for: motion design, kinetic typography, animated hero, title card, HyperFrames-style output.
- Pair with: `claude-design`, `imagegen`, `webapp-testing`.

## Image And Video Generation Skills

### media-imagegen

- Purpose: route direct image generation and image editing through available image-generation tools.
- Use for: "이미지 생성", "그림 만들어줘", icons, illustrations, social cards, visual references, image edits.
- Pair with: `media-canvas-design`, `media-image-enhancer`, `imagegen` capability when available.

### media-web-image-direction

- Purpose: generate premium website reference images, one image per section.
- Use for: landing-page comps, website section images, premium web design references.
- Pair with: `gpt-taste`, `image-to-code`, `frontend-design`.

### media-mobile-image-direction

- Purpose: generate premium mobile app screen concept images and multi-screen flows.
- Use for: iOS/Android app mockups, onboarding screens, mobile UI concepts, app-native image references.
- Pair with: `game-ui-art-direction`, `od-platform-design`, `image-to-code`.

### media-canvas-design

- Purpose: direct poster, illustration, static visual art, and canvas-style image generation.
- Use for: posters, illustrations, static art, visual exploration, cover images.
- Pair with: `media-imagegen`, `claude-design`.

### media-poster-hero

- Purpose: create vertical marketing posters or share-image artifacts.
- Use for: launch posters, social posters, event posters, 9:16 share images.
- Pair with: `media-imagegen`, `media-canvas-design`.

### media-screenshots-marketing

- Purpose: turn app/site screenshots into polished marketing visuals.
- Use for: hero screenshots, App Store screenshots, changelog visuals, portfolio preview images.
- Pair with: `webapp-testing`, `playwright`, `media-device-mockup-3d`.

### media-device-mockup-3d

- Purpose: create phone/laptop/device showcase visuals with app UI embedded.
- Use for: portfolio mockups, launch visuals, App Store assets, GitHub README previews.
- Pair with: `media-screenshots-marketing`, `claude-design`.

### media-image-enhancer

- Purpose: guide image cleanup, upscale, denoise, sharpen, and presentation-ready enhancement.
- Use for: low-resolution images, blurry screenshots, noisy assets, documentation visuals.
- Pair with: `media-imagegen`.

### media-gif-sticker-maker

- Purpose: prepare animated sticker or GIF generation workflows.
- Use for: GIF stickers, avatar packs, chat stickers, Pop Mart/Funko-style sticker concepts.
- Pair with: `media-imagegen`; provider execution may require external API setup.

### media-video-hyperframes

- Purpose: create HyperFrames/Remotion-compatible HTML frame sequences and short-video storyboards.
- Use for: product videos, short explainers, kinetic frames, mp4-ready scene sequences.
- Pair with: `od-motion-frames`, `media-remotion`.

### media-remotion

- Purpose: route React/Remotion programmatic video composition work.
- Use for: reproducible motion graphics, branded explainers, dashboards-to-video, code-rendered videos.
- Pair with: `media-video-hyperframes`, `product-frontend-engineer`.

### media-sora

- Purpose: prepare Sora-style short-video prompts and workflows.
- Use for: Sora, cinematic clips, b-roll, OpenAI video prompts.
- Pair with: `media-video-hyperframes`; provider execution requires Sora/API availability.

### media-fal-generate

- Purpose: route Fal.ai image/video generation provider workflows.
- Use for: Fal, Flux, SDXL, Ideogram, provider-backed image/video generation.
- Pair with: `media-imagegen`; provider execution requires Fal credentials and model selection.

### media-replicate

- Purpose: route Replicate model discovery, comparison, and generation workflows.
- Use for: Replicate API, model comparison, frequently swapped image/audio/video models.
- Pair with: `research-synthesizer`; provider execution requires Replicate credentials.

## OpenAI Official Curated Skills

### gh-address-comments

- Purpose: address GitHub PR review or issue comments on the current branch.
- Use for: PR comments, review feedback, "코멘트 대응", "리뷰 반영", or "GitHub 댓글 처리".
- Requires: GitHub CLI `gh` authentication.

### gh-fix-ci

- Purpose: inspect failing GitHub Actions checks and plan or apply fixes after approval.
- Use for: CI failure, GitHub checks, failing PR workflow, test logs in GitHub Actions.
- Requires: GitHub CLI `gh` authentication with repo/workflow access.

### linear

- Purpose: manage Linear issues, projects, and team workflows.
- Use for: issue creation, status updates, Linear project planning, ticket grooming.
- Requires: Linear connector or MCP OAuth access.

### sentry

- Purpose: read production issues and recent error events from Sentry.
- Use for: production errors, crash summaries, release health, Sentry issue triage.
- Requires: Sentry CLI or token-based auth.

### figma

- Purpose: fetch Figma design context, screenshots, variables, and assets.
- Use for: Figma URLs, design handoff, inspecting exact nodes before implementation.
- Pair with: `figma-implement-design`, `figma-use`, `frontend-ui-engineering`.

### figma-generate-library

- Purpose: generate or organize Figma design-system libraries.
- Use for: component libraries, reusable UI kits, design token/library setup.

### figma-create-design-system-rules

- Purpose: turn Figma/design-system conventions into reusable agent rules.
- Use for: AGENTS/CLAUDE-style design rules, implementation handoff standards.

### figma-code-connect-components

- Purpose: map code components to Figma components through Code Connect workflows.
- Use for: design system sync between Figma and implementation code.

### figma-create-new-file

- Purpose: create new Figma files through the Figma workflow.
- Use for: starting a fresh design file or design-system workspace.

### vercel-deploy

- Purpose: deploy web apps to Vercel, usually as preview unless production is explicit.
- Use for: "Vercel에 올려줘", preview deploys, deployment URL requests.
- Requires: Vercel CLI authentication.

### netlify-deploy

- Purpose: deploy web projects to Netlify.
- Use for: Netlify preview/production deploys, site linking, publish requests.
- Requires: Netlify CLI authentication.

### cloudflare-deploy

- Purpose: deploy to Cloudflare Workers, Pages, and related services.
- Use for: Cloudflare Pages/Workers hosting, low-cost team previews, edge deployments.
- Requires: Wrangler authentication.

### render-deploy

- Purpose: deploy apps and services to Render.
- Use for: Render-hosted web services, workers, or static sites.

### pdf

- Purpose: read, create, and visually validate PDF documents.
- Use for: PDF reports, extraction, layout review, rendered page checks.

### jupyter-notebook

- Purpose: create or edit `.ipynb` notebooks for experiments, analysis, and tutorials.
- Use for: data analysis notebooks, reproducible experiments, teaching walkthroughs.

### chatgpt-apps

- Purpose: build ChatGPT Apps SDK projects with MCP server and widget UI patterns.
- Use for: ChatGPT app scaffolds, MCP Apps bridge, tool/resource/widget design.
- Pair with: `openai-docs`, `mcp-builder`, `api-and-interface-design`.

### notion-knowledge-capture

- Purpose: capture decisions, notes, and knowledge into Notion pages.
- Use for: turning conversation outcomes into wiki entries or structured Notion notes.

### notion-meeting-intelligence

- Purpose: prepare and synthesize meeting materials using Notion context.
- Use for: agendas, pre-reads, meeting prep, follow-ups, decision summaries.

## Game and Mobile Game Skills

### game-reference-research

- Purpose: research game-related sources and turn them into reusable Codex reference files.
- Use for: 자료조사, 참고서, 레퍼런스, GitHub skill candidates, official docs summaries, source maps, skill-ready Markdown, and deciding what to install/adapt/watch/skip.
- Pair with `research-synthesizer` for live web research and `skill-creator` when creating or updating the skill folder.

### mobile-game-design

- Purpose: shape mobile game ideas into playable design briefs.
- Use for: mobile game concepts, GDDs, core loops, FTUE, progression, quests, rewards, retention, economy, first-session design, and "is this fun/sticky" questions.
- Pair with `prototype-slice-planner` when the next question is what to build first.

### game-ui-art-direction

- Purpose: define mobile game UI art direction and implementable screen/component rules.
- Use for: game-like UI, HUDs, reward popups, shops, inventories, mission screens, rarity states, UI tokens, Figma handoff, and playful frontend styling.
- Pair with `frontend-design`, `figma-generate-design`, `figma-use`, or `imagegen` when the user wants visual comps or assets.

### player-experience-review

- Purpose: simulate a target player moving through the game flow to expose friction.
- Use for: first-session walkthroughs, playtest-style critique, onboarding confusion, churn risk, reward clarity, and "would players understand this" reviews.
- Pair with `mobile-game-design` when findings should become a revised concept or GDD.

### prototype-slice-planner

- Purpose: choose the smallest playable prototype slice and protect scope.
- Use for: deciding what to build first, fake-vs-build decisions, prototype hypotheses, acceptance checks, and implementation handoff for mobile games.
- Pair with `planning-and-task-breakdown` or `product-frontend-engineer` when turning the slice into build tasks.

### mobile-game-qa

- Purpose: verify mobile game prototypes for playability and mobile UX quality.
- Use for: touch targets, HUD readability, safe areas, layout overlap, feedback feel, accessibility, performance basics, analytics events, smoke checks, and release readiness.
- Pair with `webapp-testing`, `playwright`, `playwright-interactive`, or `browser-use:browser` for local browser prototypes.

## PMO and Product Skills

### create-prd

- Purpose: comprehensive PRD creation.
- Use for: turning ideas, problems, or feature requests into product requirement documents.

### user-stories

- Purpose: convert requirements into user stories with acceptance criteria.
- Use for: sprint planning, backlog grooming, development handoff.

### summarize-meeting

- Purpose: meeting transcript or notes into decisions and action items.
- Use for: PMO meeting follow-up, owner/date tracking, open questions.

### stakeholder-map

- Purpose: map stakeholders by power, interest, and communication needs.
- Use for: rollout planning, dependency management, escalation strategy.

### pre-mortem

- Purpose: identify risks before execution.
- Use for: launch planning, feature delivery risk, project kickoff.

### prioritization-frameworks

- Purpose: choose and apply prioritization methods.
- Use for: RICE, ICE, MoSCoW, Kano, opportunity scoring, roadmap tradeoffs.

### outcome-roadmap

- Purpose: convert feature lists into outcome-focused roadmaps.
- Use for: PMO roadmap reviews and stakeholder updates.

### sprint-plan

- Purpose: plan sprint scope, capacity, risks, and sequencing.
- Use for: sprint preparation and delivery coordination.

### release-notes

- Purpose: produce user-facing or stakeholder-facing release notes.
- Use for: launches, changelog summaries, sprint outcomes.

### test-scenarios

- Purpose: generate test scenarios from requirements.
- Use for: QA handoff, UAT, acceptance testing.

### analyze-feature-requests

- Purpose: cluster and prioritize feature requests.
- Use for: customer feedback, backlog triage, enterprise request review.

### interview-script

- Purpose: create customer/user interview scripts.
- Use for: discovery research, JTBD interviews, stakeholder interviews.

### summarize-interview

- Purpose: synthesize interview transcripts.
- Use for: insights, pain points, opportunities, quotes, action items.

### opportunity-solution-tree

- Purpose: structure outcomes, opportunities, solutions, and experiments.
- Use for: product discovery and strategy alignment.

### prioritize-features

- Purpose: evaluate feature backlog by impact, effort, risk, and strategy.
- Use for: roadmap and sprint input decisions.

### metrics-dashboard

- Purpose: design product metrics dashboard.
- Use for: North Star metrics, input metrics, alert thresholds.

### product-strategy

- Purpose: product strategy canvas.
- Use for: strategic clarity, vision, market, defensibility, positioning.

### value-proposition

- Purpose: define JTBD-oriented value proposition.
- Use for: product positioning, landing copy, feature framing.

### swot-analysis

- Purpose: strengths, weaknesses, opportunities, threats.
- Use for: strategic review and competitive analysis.

### porters-five-forces

- Purpose: competitive forces analysis.
- Use for: market landscape and strategy discussions.

### pricing-strategy

- Purpose: pricing model and willingness-to-pay exploration.
- Use for: monetization and packaging decisions.

## Composio-Sourced Utility Skills

### meeting-insights-analyzer

- Purpose: extract structured insights from meetings.
- Use for: deeper meeting analysis, decisions, themes, follow-ups, blockers, stakeholder signals.
- Prefer `summarize-meeting` for simple PMO action-item summaries.

### content-research-writer

- Purpose: research-backed content drafting.
- Use for: articles, briefs, explainers, thought leadership, and source-based writing.
- Pair with `research-synthesizer` when freshness and citations matter.

### lead-research-assistant

- Purpose: research people, companies, or potential leads.
- Use for: stakeholder prep, partner/customer/account research, outreach context.

### changelog-generator

- Purpose: turn technical changes into readable changelogs.
- Use for: release summaries, sprint demos, customer-facing update notes.
- Pair with `release-notes` for PM-oriented launch communication.

### file-organizer

- Purpose: organize files and folders.
- Use for: messy local folders, artifact packaging, workspace cleanup plans.
- Be careful with destructive moves/deletes; ask before irreversible cleanup.

### invoice-organizer

- Purpose: classify and organize invoices or billing documents.
- Use for: admin support, finance handoff, invoice summaries, vendor/date/category grouping.

### competitive-ads-extractor

- Purpose: analyze competitor ads and messaging.
- Use for: marketing research, positioning, creative analysis, competitive messaging scans.

### developer-growth-analysis

- Purpose: analyze developer growth and adoption signals.
- Use for: developer tools, API products, community growth, funnel and activation analysis.

## Engineering Lead Skills

### planning-and-task-breakdown

- Purpose: break technical work into executable steps.
- Use for: implementation planning, scope decomposition, dependency mapping.

### spec-driven-development

- Purpose: drive implementation from explicit specs and acceptance criteria.
- Use for: building from PRDs, tickets, or requirements.

### source-driven-development

- Purpose: ground work in actual source code and repo facts.
- Use for: unfamiliar codebases, implementation tasks, avoiding assumptions.

### code-review-and-quality

- Purpose: multi-axis code review across correctness, readability, architecture, security, and performance.
- Use for: reviewing human or agent code before merge.

### debugging-and-error-recovery

- Purpose: diagnose failures and recover from errors systematically.
- Use for: bugs, failing tests, logs, runtime errors, regressions.

### test-driven-development

- Purpose: write tests first or use tests to drive safer implementation.
- Use for: bug fixes, behavior changes, shared logic.

### incremental-implementation

- Purpose: build in small safe steps.
- Use for: complex features, migrations, risky refactors.

### api-and-interface-design

- Purpose: design API and interface contracts.
- Use for: backend/frontend contracts, API shape, integration boundaries.

### documentation-and-adrs

- Purpose: technical documentation and architecture decision records.
- Use for: design decisions, long-lived engineering context, architecture writeups.

### context-engineering

- Purpose: collect and structure project context for agents and humans.
- Use for: onboarding, messy repos, repeated project knowledge.

### code-simplification

- Purpose: simplify code while preserving behavior.
- Use for: overbuilt implementations, confusing modules, maintainability improvements.

### doubt-driven-development

- Purpose: surface uncertainty and test assumptions.
- Use for: ambiguous requirements, risky technical choices, design reviews.

### ci-cd-and-automation

- Purpose: CI/CD and workflow automation.
- Use for: build pipelines, checks, release automation.

### git-workflow-and-versioning

- Purpose: Git workflow, branching, versioning, and release hygiene.
- Use for: commits, changelogs, release process, branch strategy.

### deprecation-and-migration

- Purpose: migration planning and deprecation paths.
- Use for: API changes, framework upgrades, legacy cleanup.

### shipping-and-launch

- Purpose: launch readiness and post-ship checks.
- Use for: release plans, rollout, rollback, monitoring.

### system-design

- Purpose: service, architecture, API, data model, and boundary design.
- Use for: system design docs, architecture tradeoffs, service decomposition, scaling and reliability planning.

### tech-debt

- Purpose: identify and prioritize technical debt.
- Use for: technical debt audits, refactor backlogs, code health planning, maintainability tradeoffs.

### testing-strategy

- Purpose: design practical test strategies.
- Use for: test plans, coverage strategy, unit/integration/e2e tradeoffs, QA handoff.

### test-coverage-improver

- Purpose: find coverage gaps and add or propose missing tests.
- Use for: improving test coverage, identifying untested behavior, writing focused regression tests.

### dependency-auditor

- Purpose: audit npm dependencies for security, unused packages, and update risks.
- Use for: dependency cleanup, package security checks, upgrade planning.

### docker-debugger

- Purpose: debug Dockerfiles, containers, and docker-compose setups.
- Use for: broken container builds, runtime container issues, image optimization.

### env-setup-wizard

- Purpose: set up and document environment variables and configuration.
- Use for: `.env.example`, local setup, missing env vars, deployment config hygiene.

### database-schema-designer

- Purpose: design SQL/NoSQL schemas and relationships.
- Use for: data modeling, ERDs, indexes, migrations, schema optimization.

### supabase

- Source: `supabase/agent-skills`.
- Purpose: Supabase-specific development across Database, Auth, RLS, Storage, Realtime, Edge Functions, Vectors, Cron, Queues, client libraries, SSR integrations, migrations, and CLI/MCP usage.
- Use for: Supabase-backed prototypes, Lovable-style full-stack apps, auth/session issues, `supabase-js`, Edge Functions, migrations, RLS policies, storage buckets, Realtime, and schema changes in Supabase projects.
- Pair with: `supabase-postgres-best-practices` for SQL/schema/index/RLS performance, `security-and-hardening` for auth/data exposure, and `database-schema-designer` for data modeling.

### supabase-postgres-best-practices

- Source: `supabase/agent-skills`.
- Purpose: Supabase-maintained Postgres performance and schema guidance.
- Use for: SQL queries, index design, connection management, schema review, RLS performance, database scaling, and Postgres optimization.
- Pair with: `supabase` for Supabase project operations and `database-schema-designer` for schema modeling.

### api-endpoint-scaffolder

- Purpose: scaffold robust API endpoints.
- Use for: new REST routes, validation, error handling, request/response contracts.

### mcp-builder

- Purpose: build MCP servers and tool interfaces for external APIs.
- Use for: creating or reviewing MCP integrations in TypeScript or Python.

### security-and-hardening

- Purpose: practical security hardening.
- Use for: auth, data exposure, input validation, permissions, deployment security.

### performance-optimization

- Purpose: general performance optimization.
- Use for: slow systems, expensive operations, runtime bottlenecks.

### frontend-ui-engineering

- Purpose: engineering implementation of frontend UI.
- Use for: component structure, state, responsiveness, UI reliability.

### browser-testing-with-devtools

- Purpose: browser-based testing and debugging.
- Use for: UI bugs, console/network/performance debugging.

### idea-refine

- Purpose: refine rough ideas into sharper options.
- Use for: early feature ideation and technical/product exploration.

### frontend-design

- Purpose: distinctive, production-grade frontend interfaces.
- Use for: building or beautifying web UIs where visual quality and originality matter.
- Prefer `product-frontend-engineer` first when the task also includes product planning or implementation sequencing.

### claude-design

- Source: `jiji262/claude-design-skill`.
- Purpose: Claude Design/Artifacts-style high-fidelity HTML artifacts: landing pages, slide decks, interactive prototypes, animated videos, posters, wireframes, storyboards, and visual explorations.
- Use for: "Claude Design처럼", "artifact로 보여줘", design options, clickable mockups, web decks, posters, visual prototypes, or when the user wants to see a designed artifact before committing to app code.
- Pair with: `imagegen` for assets, `browser-use:browser` or `playwright` for visual inspection, and `frontend-ui-engineering` when converting the artifact into production frontend code.

### design-flow

- Source: `julianoczkowski/designer-skills`.
- Purpose: orchestrate a full designer-led flow from clarification through design review.
- Use for: starting a design project from scratch, "full workflow", "design flow", or when the user wants a structured Claude Design-like process rather than immediate code.
- Sequence: `design-brief`, `information-architecture`, `design-tokens`, `brief-to-tasks`, implementation, then `design-review`.

### design-brief

- Source: `julianoczkowski/designer-skills`.
- Purpose: create a project-grounded design brief through interview and codebase exploration.
- Use for: defining UI direction, audience, constraints, feature intent, and experience principles before design/build.

### information-architecture

- Source: `julianoczkowski/designer-skills`.
- Purpose: define navigation, content hierarchy, page structure, URL patterns, and user flows.
- Use for: planning app/site structure, routes, nav, content organization, and user flows before visual design.

### design-tokens

- Source: `julianoczkowski/designer-skills`.
- Purpose: generate a reusable visual system with CSS variables or Tailwind tokens.
- Use for: setting palettes, type ramps, spacing, component tokens, light/dark mode, or project design-system foundations.

### brief-to-tasks

- Source: `julianoczkowski/designer-skills`.
- Purpose: turn a design brief into buildable vertical-slice tasks.
- Use for: implementation ordering, checklists, task breakdowns, and converting design intent into work units.

### design-review

- Source: `julianoczkowski/designer-skills`.
- Purpose: structured design critique against the brief and codebase, including screenshots.
- Use for: post-build design review, polish passes, responsiveness/accessibility checks, and aesthetic fidelity review.

### gpt-taste

- Source: `Leonxlnx/taste-skill`.
- Purpose: premium, high-agency frontend art direction that avoids generic AI UI patterns and pushes stronger layout, typography, spacing, and motion.
- Use for: Lovable-style prototypes that need to look less templated, landing pages, polished SaaS/product pages, Awwwards-style visual direction, and "더 고급스럽게/신박하게/AI 티 안 나게" frontend requests.
- Pair with: `frontend-ui-engineering` for implementation, `webapp-testing` or `playwright` for viewport verification, and `product-frontend-engineer` when product flow and implementation are part of the same request.

### image-to-code

- Source: `Leonxlnx/taste-skill`.
- Purpose: image-first website design-to-code workflow: create or use visual references, analyze them deeply, then implement matching frontend.
- Use for: screenshots, Figma-like image references, website cloning from images, visual redesigns, premium landing pages, and Lovable-style "make this image/reference into an app/site" work.
- Pair with: `imagegen` when new reference images are needed, `frontend-ui-engineering` for code, and `playwright`/`webapp-testing` for visual checks.

### frontend-design-audit

- Source: `mistyhx/frontend-design-audit`.
- Purpose: usability-focused audit of existing frontend code or live websites using established design principles.
- Use for: "review my UI", "audit this website", confusing flows, abandonment, weak accessibility, poor interaction design, or when something feels off in an existing interface.
- Pair with: `webapp-testing` or `playwright` for screenshots, `ux-enhancer` for focused component fixes, and `accessibility` for WCAG-specific remediation.

### ux-enhancer

- Source: `gashiartim/ux-enhancer`.
- Purpose: focused React component usability refactoring using Steve Krug's "Don't Make Me Think" principles.
- Use for: reducing cognitive load, clarifying CTAs, simplifying copy, improving scanability, and adding loading/empty/error states in task-driven components.
- Pair with: `frontend-ui-engineering` for implementation and `webapp-testing` for behavior checks.

### figma-use

- Purpose: required Figma MCP API workflow guardrail.
- Use for: creating, editing, inspecting, or programmatically manipulating Figma files.
- Pair with `figma-generate-design` for full screens and `figma-implement-design` when building code from Figma.

### figma-generate-design

- Purpose: create or update full Figma screens from descriptions, code, or rendered app references.
- Use for: mobile game UI comps, screen flows, HUD mockups, design system component assembly, and Figma handoff.
- Requires `figma-use` before any Figma API calls.

### figma-implement-design

- Purpose: translate Figma designs into production UI code.
- Use for: implementing components, screens, or flows from a Figma URL or selected Figma node.

### playwright-interactive

- Purpose: persistent Playwright browser debugging through a JS REPL.
- Use for: iterative UI debugging, mobile viewport checks, visual QA, and game prototype interaction testing when the session benefits from persistent browser state.

### web-design-guidelines

- Purpose: review UI code against Vercel web interface guidelines.
- Use for: design critique, UI consistency checks, layout quality, interface polish.

### vercel-react-best-practices

- Installed folder: `react-best-practices`.
- Purpose: React and Next.js performance and architecture guidance.
- Use for: data fetching, server/client component boundaries, bundle size, rendering performance, code review.

### vercel-composition-patterns

- Installed folder: `composition-patterns`.
- Purpose: UI composition patterns for web applications.
- Use for: layout structure, reusable page patterns, composition decisions.

### vercel-react-view-transitions

- Installed folder: `react-view-transitions`.
- Purpose: smooth native-feeling React view transitions.
- Use for: route/page transitions, motion polish, interaction continuity.

### web-quality-audit

- Purpose: comprehensive web quality review.
- Use for: Lighthouse-style audit across performance, accessibility, SEO, and best practices.

### performance

- Purpose: web loading and runtime performance optimization.
- Use for: slow pages, large bundles, render delays, resource optimization.

### core-web-vitals

- Purpose: optimize LCP, INP, and CLS.
- Use for: Core Web Vitals work, search/page-experience improvements, layout shift fixes.

### accessibility

- Purpose: WCAG-oriented accessibility review and fixes.
- Use for: keyboard navigation, screen reader names, labels, roles, contrast, focus states.

### seo

- Purpose: technical and on-page SEO.
- Use for: metadata, crawlability, headings, structured data, search visibility.

### best-practices

- Purpose: modern web best practices.
- Use for: security headers, modern APIs, browser compatibility, code quality.

### skill-creator

- Purpose: create or update Codex skills.
- Use for: turning repeatable workflows into skills, adapting Claude skills to Codex, adding references/scripts/assets.

### karpathy-guidelines

- Purpose: reduce common LLM coding mistakes with think-before-coding, simplicity, surgical edits, and verification discipline.
- Use for: writing, reviewing, or refactoring code; apply as default coding behavior rather than a heavy specialist workflow.

### skill-installer

- Purpose: install skills into the Codex skills folder from curated lists or GitHub repos.
- Use for: adding external skills once a candidate is trusted and useful.

### feature-spec

- Purpose: write implementation-ready feature specifications.
- Use for: functional requirements, edge cases, data models, API contracts, UX flows, acceptance criteria.

### change-management

- Purpose: plan rollouts that affect people, process, or systems.
- Use for: migration communication, rollout plans, stakeholder adoption, training and resistance management.

### risk-assessment

- Purpose: identify, score, and mitigate project, vendor, operational, or technical risks.
- Use for: risk registers, pre-launch risk reviews, vendor/process decision support.

### project-status-report

- Purpose: create project status reports with RAG status, milestones, blockers, and next actions.
- Use for: weekly updates, executive summaries, PMO reporting.

### market-sizing

- Purpose: estimate TAM/SAM/SOM with assumptions, methods, and sensitivity ranges.
- Use for: business cases, investor-ready market sizing, product strategy research.

### search-strategy

- Purpose: decompose research questions into targeted multi-source searches.
- Use for: search planning, source selection, query strategy, ambiguity handling.

### knowledge-synthesis

- Purpose: synthesize multiple sources into deduplicated, confidence-scored answers.
- Use for: research briefs, source-backed recommendations, multi-document summaries.

### user-research-synthesizer

- Purpose: synthesize interviews, surveys, and analytics into user insights.
- Use for: customer research reports, journey maps, pain points, opportunities.

### weak-signal-synthesizer

- Purpose: identify emerging trends by connecting weak signals across sources.
- Use for: horizon scanning, trend spotting, early market/technology signals.

### technical-writer

- Purpose: create technical documentation for mixed technical audiences.
- Use for: user guides, tutorials, onboarding docs, troubleshooting, knowledge base articles.

### api-documentation-writer

- Purpose: create developer-friendly API documentation.
- Use for: endpoint references, auth guides, examples, OpenAPI/Swagger-oriented docs.

### runbook-generator

- Purpose: create operational runbooks for on-call, deployment, and incident response.
- Use for: system operations docs, deployment procedures, disaster recovery guides.

### sop-builder

- Purpose: create standard operating procedures.
- Use for: repeatable business/process workflows, RACI, approvals, process maps.

### openai-docs

- Purpose: current OpenAI API and product guidance.
- Use for: models, Responses API, Agents SDK, tools, ChatGPT Apps, migration guidance.

### cli-creator

- Purpose: create composable CLI tools with a companion Codex skill.
- Use for: turning repeated local/API workflows into command-line tools.

### security-best-practices

- Purpose: language and framework specific secure coding review.
- Use for: security-sensitive code changes, auth, validation, secrets, dependency risks.

### security-threat-model

- Purpose: repository-grounded threat modeling.
- Use for: new features, architecture changes, data exposure, auth flows, deployment risks.

### security-ownership-map

- Purpose: identify ownership and sensitive security areas in a repository.
- Use for: unfamiliar repos, security triage, accountability mapping.

### notion-research-documentation

- Purpose: research across Notion and synthesize into documentation.
- Use for: Notion-backed project knowledge, specs, decisions, research notes.

### notion-spec-to-implementation

- Purpose: convert Notion specs into implementation plans.
- Use for: Notion PRDs, tickets, or specs that need executable engineering work.

### doc-coauthoring

- Purpose: collaborative long-form writing process.
- Use for: drafting, revising, and preserving voice in documents before file-level formatting.

### brand-guidelines

- Purpose: apply brand voice, colors, and visual rules from Anthropic's example skill.
- Use for: brand-constrained copy or design tasks when no project-specific brand system exists.

### internal-comms

- Purpose: write internal communication artifacts.
- Use for: status updates, announcements, memos, internal alignment messages.

### imagegen

- Purpose: generate or edit bitmap images.
- Use for: mockup imagery, raster assets, illustrations, textures, sprites, transparent cutouts.

### documents:documents

- Purpose: create, edit, redline, comment on, render, and verify `.docx`.
- Use for: reports, contracts, proposals, professional document editing.

### presentations:Presentations

- Purpose: create, edit, render, verify, and export slide decks.
- Use for: PowerPoint, Google Slides, pitch decks, strategy decks, analytics decks.

### spreadsheets:Spreadsheets

- Purpose: create, edit, analyze, visualize, and export spreadsheets.
- Use for: `.xlsx`, `.csv`, formulas, tables, charts, financial or operational analysis.

### browser-use:browser

- Purpose: inspect and verify local or browser-visible pages.
- Use for: screenshots, localhost testing, UI QA, interaction checks.

### webapp-testing

- Purpose: interact with and test local web apps.
- Use for: browser workflows, smoke tests, form interaction checks, UI verification.

### playwright

- Purpose: browser automation with Playwright.
- Use for: deterministic browser tests, screenshots, page interactions, regression checks.

### screenshot

- Purpose: capture screenshots when explicitly requested or needed for visual verification.
- Use for: visual QA, UI before/after review, rendered artifact checks.

### vercel-optimize

- Purpose: Vercel cost and performance optimization.
- Use for: projects deployed on Vercel, cost reduction, platform-specific performance tuning.

## Installed GitHub Community Skills

### gh-cli

- Source: `trailofbits/skills`.
- Purpose: prefer authenticated GitHub CLI workflows over unauthenticated GitHub fetches.
- Use for: GitHub API, PRs, issues, private repos, raw GitHub URLs, and rate-limit-sensitive GitHub lookups.

### diagnose

- Source: `mattpocock/skills`.
- Purpose: disciplined debugging loop: reproduce, minimize, hypothesize, instrument, fix, regression-test.
- Use for: bugs, failing tests, broken behavior, or performance regressions when the user says "diagnose/debug".

### grill-with-docs

- Source: `mattpocock/skills`.
- Purpose: challenge a plan against project language and docs, then update `CONTEXT.md` and ADRs when useful.
- Use for: stress-testing a plan before implementation in a repo with domain language or decisions to preserve.

### improve-codebase-architecture

- Source: `mattpocock/skills`.
- Purpose: find architecture simplification and module-deepening opportunities.
- Use for: architecture cleanup, refactor discovery, testability improvements, and AI-navigable codebases.

### zoom-out

- Source: `mattpocock/skills`.
- Purpose: explain a code area in broader system context.
- Use for: unfamiliar modules, "what is this doing", or understanding how a change fits the whole system.

### grill-me

- Source: `mattpocock/skills`.
- Purpose: interview the user to stress-test a non-code plan or design.
- Use for: product, process, or architecture ideas that need sharper assumptions before execution.

### handoff

- Source: `mattpocock/skills`.
- Purpose: compact the current conversation into a continuation handoff.
- Use for: preparing another session or agent to continue with minimal lost context.

### receiving-code-review

- Source: `obra/superpowers`.
- Purpose: evaluate review feedback before blindly implementing it.
- Use for: PR feedback, external reviewer comments, or technically questionable suggestions.

### agentic-actions-auditor

- Source: `trailofbits/skills`.
- Purpose: audit GitHub Actions workflows that run AI coding agents for prompt-injection and CI/CD risk.
- Use for: Claude Code Action, Gemini CLI, Codex, or other AI-agent workflows in GitHub Actions.

### differential-review

- Source: `trailofbits/skills`.
- Purpose: security-focused review of diffs, commits, and PRs with blast-radius thinking.
- Use for: security-sensitive PR review, regression risk, and high-risk code changes.

### insecure-defaults

- Source: `trailofbits/skills`.
- Purpose: detect fail-open defaults, weak auth, permissive configs, hardcoded credentials, and unsafe env handling.
- Use for: config security review, deployment hardening, and auth/default-value audits.

### sharp-edges

- Source: `trailofbits/skills`.
- Purpose: identify APIs and configs that are easy to misuse insecurely.
- Use for: API design, config schema design, crypto/auth ergonomics, and "secure by default" reviews.

### supply-chain-risk-auditor

- Source: `trailofbits/skills`.
- Purpose: assess dependency takeover and exploitation risk.
- Use for: dependency health, package trust, maintainer risk, and supply-chain security.

### modern-python

- Source: `trailofbits/skills`.
- Purpose: modern Python project setup with `uv`, `ruff`, `ty`, and `pytest`.
- Use for: Python scripts, new Python projects, or migration away from older Python tooling.

### property-based-testing

- Source: `trailofbits/skills`.
- Purpose: design stronger tests around properties and invariants.
- Use for: parsers, validators, serializers, protocol logic, smart contracts, and edge-heavy logic.

### mutation-testing

- Source: `trailofbits/skills`.
- Purpose: configure and tune mutation testing campaigns.
- Use for: assessing whether tests actually catch logic changes.

### coverage-analysis

- Source: `trailofbits/skills`.
- Purpose: analyze coverage for fuzzing and harness effectiveness.
- Use for: fuzz target quality, uncovered paths, and QA depth checks.

### harness-writing

- Source: `trailofbits/skills`.
- Purpose: write or improve fuzzing harnesses across languages.
- Use for: creating fuzz targets or improving existing fuzz harnesses.

### semgrep-rule-creator

- Source: `trailofbits/skills`.
- Purpose: create custom Semgrep rules for vulnerability or bug-pattern detection.
- Use for: static-analysis rule authoring, rule tests, and custom code pattern detection.

### sarif-parsing

- Source: `trailofbits/skills`.
- Purpose: parse, filter, deduplicate, and report SARIF results.
- Use for: CodeQL/Semgrep scan output analysis and CI security report cleanup.

## High-Value External Candidates

These are not installed unless explicitly added later.

### OpenAI `create-plan`

- Source: `openai/skills`, experimental.
- Use for: read-only implementation planning when the user asks for a plan rather than execution.
- Fit: high, because it is native to Codex skill conventions.

### Anthropic `frontend-design`

- Source: `anthropics/skills`.
- Use for: distinctive, production-grade UI design and avoiding generic AI frontend aesthetics.
- Fit: installed locally as `frontend-design` and partially adapted into `product-frontend-engineer`.

### Vercel `react-best-practices`

- Source: `vercel-labs/agent-skills`.
- Use for: React/Next.js performance, data fetching, bundle size, server/client boundaries.
- Fit: installed locally as `react-best-practices`; use selectively because it is large.

### Addy Osmani `web-quality-skills`

- Source: `addyosmani/web-quality-skills`.
- Use for: Lighthouse, Core Web Vitals, accessibility, SEO, web best practices.
- Fit: installed locally as `web-quality-audit`, `performance`, `core-web-vitals`, `accessibility`, `seo`, and `best-practices`.

### Planning-with-files

- Source: community Claude skill ecosystem.
- Use for: long-running tasks that need persistent `task_plan.md`, `findings.md`, and `progress.md`.
- Fit: useful for multi-hour projects; too heavy for short tasks.

### Swarms / parallel-task / codex-orchestrate

- Source: community orchestration skills.
- Use for: large multi-agent execution with dependency-aware waves.
- Fit: only when the user explicitly wants subagents or parallel execution.
