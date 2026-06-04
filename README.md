# Codex Agent Kit

My personal Codex routing rules and reusable agent skills.

This repository is a clean, shareable version of the local setup I use for product planning, frontend design, UX review, Supabase work, and implementation handoff. It intentionally excludes local sessions, auth files, caches, generated images, browser state, SQLite databases, and app runtime files.

## What This Is

This kit is my lightweight operating system for working with Codex. It helps rough ideas become the right kind of output: a product brief, design direction, frontend task list, UX review, Supabase plan, or implementation handoff.

Instead of backing up my whole local Codex folder, this repo keeps only the parts that are useful to share:

- reusable skills
- routing rules for choosing the right role
- a safe config example
- small docs that explain how the setup fits together

## What's Inside

```text
.
├── AGENTS.md                         # Global role and skill-routing rules
├── config/
│   └── codex.config.sample.toml      # Redacted Codex config example
├── docs/
│   ├── architecture.md               # How the kit is organized
│   ├── media-generation-routing.md   # Codex image-generation routing
│   ├── open-design-imports.md        # Imported Open Design skills and rationale
│   ├── skill-catalog.md              # Included skills and when to use them
│   └── security-checklist.md         # What must never be committed
├── scripts/
│   └── install.sh                    # Optional local install helper
├── skills/                           # Personal/shared skills
└── third_party/                      # Third-party license notices
```

## Core Workflow

The kit uses a lightweight routing model:

```text
messy request
-> routing brief
-> role assignment
-> smallest useful skill set
-> execution and verification
```

The default entry point is `AGENTS.md`. It maps rough requests into roles such as `@product`, `@game`, `@dev`, `@arch`, `@doc`, and `@intel`, then selects the narrowest skill needed for the job.

## How I Use It

I use this setup when I want Codex to behave less like a single generic assistant and more like a small team with clear lanes.

- Product ideas go through brief, structure, and task breakdown.
- UI work gets design direction, tokens, critique, and implementation notes.
- Existing screens can be audited for clarity and polish.
- Supabase work gets separated into app logic, schema, RLS, and Postgres performance.
- Messy requests are routed into the smallest useful workflow before execution.

## Skill Groups

| Group | What It Helps With | Skills |
| --- | --- | --- |
| Product/design planning | Turns vague product ideas into a brief, information architecture, and buildable tasks. | `design-brief`, `information-architecture`, `design-flow`, `brief-to-tasks` |
| Routing/orchestration | Chooses the smallest useful skill bundle and prevents over-stacking. | `skill-router` |
| Game design/prototyping | Shapes mobile game ideas into loops, UI direction, playable slices, playtest reviews, and QA passes. | `mobile-game-design`, `game-ui-art-direction`, `prototype-slice-planner`, `player-experience-review`, `mobile-game-qa`, `game-reference-research` |
| Codex image generation | Directs prompts, edits, variations, posters, thumbnails, UI references, game visuals, and product mockup images through Codex image generation. | `media-image-director` |
| Visual/UI quality | Improves visual direction, design tokens, screenshots, UI critique, and React usability. | `claude-design`, `design-tokens`, `design-review`, `frontend-design-audit`, `gpt-taste`, `image-to-code`, `ux-enhancer` |
| Backend/data | Keeps Supabase, RLS, schema, and Postgres performance work grounded and reviewable. | `supabase`, `supabase-postgres-best-practices` |
| Open Design imports | Adds artifact, dashboard, research, chart, diagram, and cross-platform design workflows inspired by Open Design. | `od-design-md`, `od-plan-design-review`, `od-research-decision-room`, `od-d3-visualization`, `od-data-report`, `od-hand-drawn-diagrams`, `od-motion-frames`, `od-live-dashboard`, `od-platform-design` |

## Included Skills

| Skill | Short Description |
| --- | --- |
| `brief-to-tasks` | Converts a design or product brief into a practical implementation checklist. |
| `claude-design` | Creates high-fidelity HTML-style design artifacts and visual directions. |
| `design-brief` | Captures audience, goals, constraints, tone, and product intent before building. |
| `design-flow` | Runs a full design workflow from brief to IA, tokens, tasks, and review. |
| `design-review` | Reviews a UI against a brief and points out polish, hierarchy, and usability issues. |
| `design-tokens` | Defines reusable colors, spacing, typography, radius, shadow, and theme values. |
| `frontend-design-audit` | Audits existing web screens for clarity, consistency, and visual quality. |
| `game-reference-research` | Researches game design, UI, tooling, and reference material for reusable skill notes. |
| `game-ui-art-direction` | Defines mobile game HUDs, reward UI, visual tokens, component states, and screen hierarchy. |
| `gpt-taste` | Pushes frontend work toward a stronger, more distinctive visual result. |
| `image-to-code` | Uses image references as the source for precise UI implementation. |
| `information-architecture` | Organizes pages, navigation, content hierarchy, and user flows. |
| `media-image-director` | Directs Codex image generation and editing with better prompts, visual guardrails, critique, and iteration. |
| `mobile-game-design` | Turns rough mobile game ideas into core loops, first sessions, GDD outlines, and prototype briefs. |
| `mobile-game-qa` | Checks mobile game prototypes for touch usability, HUD readability, feedback, layout, and performance basics. |
| `od-d3-visualization` | Adds D3-oriented guidance for complex interactive charts and explanatory graphics. |
| `od-data-report` | Turns CSV, Excel, or JSON data into a polished visual report page. |
| `od-design-md` | Captures visual rules, tokens, and design direction in a `DESIGN.md` source of truth. |
| `od-hand-drawn-diagrams` | Points agents toward Excalidraw-style hand-drawn architecture and flow diagrams. |
| `od-live-dashboard` | Builds self-contained dashboard artifacts with KPIs, activity, and task tables. |
| `od-motion-frames` | Produces looping CSS motion-composition artifacts for hero/video-style frames. |
| `od-plan-design-review` | Runs a score-based senior design review and flags weak AI-looking UI patterns. |
| `od-platform-design` | References cross-platform design guidance across Apple HIG, Material, and WCAG. |
| `od-research-decision-room` | Synthesizes messy research evidence into an HTML decision-room artifact. |
| `player-experience-review` | Reviews a game flow from the player's point of view to find confusion, friction, and churn risks. |
| `prototype-slice-planner` | Chooses the smallest playable prototype slice and separates must-build from fakeable scope. |
| `skill-router` | Chooses roles, lanes, and skill bundles, including the imported `od-*` workflows. |
| `supabase` | Guides Supabase Auth, RLS, Storage, Realtime, CLI, MCP, and migrations. |
| `supabase-postgres-best-practices` | Reviews Postgres schemas, indexes, RLS policies, and query performance. |
| `ux-enhancer` | Refactors React screens for simpler decisions, better scanning, and cleaner flows. |

## Quick Install

Review the files first, then run:

```bash
./scripts/install.sh
```

The installer copies `skills/` into `$CODEX_HOME/skills` and backs up an existing `$CODEX_HOME/AGENTS.md` before replacing it.

## Manual Install

```bash
mkdir -p "$HOME/.codex/skills"
cp -R skills/* "$HOME/.codex/skills/"
cp AGENTS.md "$HOME/.codex/AGENTS.md"
```

Optionally copy the sample config:

```bash
cp config/codex.config.sample.toml "$HOME/.codex/config.toml"
```

Do that only after reading the file and adapting paths to your machine.

## Safety Notes

Do not commit:

- `~/.codex/auth.json`
- SQLite state, memory, session, or log files
- generated images and screenshots with private data
- plugin runtime caches
- browser session files
- project-specific secrets or `.env` files

This repo is meant to be a portable method kit, not a raw dotfiles backup.
