# Codex Agent Kit

Personal Codex setup for turning rough requests into cleaner product, design, frontend, backend, game, image, and documentation workflows.

This repo is not a raw backup of `~/.codex`. It keeps the portable parts only:

- global `AGENTS.md` routing rules
- a lean skill profile
- selected custom/shared skills
- senior engineering lenses
- install/prune scripts
- safety docs

## Current Shape

```text
rough request
-> messy-request-interpreter
-> skill-router
-> one primary skill
-> optional support skills
-> execution
-> verification
-> short handoff
```

The active local setup is intentionally lean: about 100 representative skills instead of every niche skill I have tried.

## What This Helps With

- Product ideas, specs, PRDs, and implementation handoff
- Frontend/UI work with stronger taste and verification
- Game concepts, HUDs, playable slices, and player-experience review
- Codex-native image prompts, README visuals, posters, thumbnails, and mockups
- Supabase, RLS, schema, API, and Postgres review
- Technical docs, runbooks, changelogs, and project README cleanup
- GitHub workflow, CI fixes, deploys, and focused verification

## Repository Map

```text
.
├── AGENTS.md                                  # Global lean routing rules
├── config/
│   ├── codex.config.sample.toml               # Redacted config example
│   └── lean-skills.txt                        # Active keep-list for local skills
├── docs/
│   ├── architecture.md                        # How the kit is organized
│   ├── lean-skill-profile.md                  # 102-skill profile notes
│   ├── media-generation-routing.md            # Codex image-generation routing
│   ├── open-design-imports.md                 # Open Design imports and rationale
│   ├── security-checklist.md                  # What must never be committed
│   └── skill-catalog.md                       # Included custom/managed skills
├── scripts/
│   ├── install.sh                             # Copy kit into ~/.codex
│   └── prune-skills.sh                        # Keep local skills aligned to lean profile
├── skills/
│   └── skill-router/
│       └── references/
│           └── senior-engineering-lenses.md   # Staff/backend/frontend/ship gates
└── third_party/                               # Third-party notices
```

## Lean Profile

The local Codex skill set is kept near 100 skills using:

```text
config/lean-skills.txt
```

The goal is simple: keep enough power for real work, but avoid a noisy skill pile where every request has too many possible routes.

Representative lanes:

| Lane | Primary Skills |
| --- | --- |
| Intake/routing | `messy-request-interpreter`, `skill-router` |
| Product/frontend | `product-frontend-engineer`, `frontend-ui-engineering`, `gpt-taste`, `image-to-code` |
| Existing UI cleanup | `frontend-design-audit`, `ux-enhancer`, `accessibility`, `webapp-testing` |
| Visual artifacts | `claude-design`, `media-image-director` |
| Game work | `mobile-game-design`, `game-ui-art-direction`, `prototype-slice-planner`, `player-experience-review`, `mobile-game-qa` |
| Open Design artifacts | `od-design-md`, `od-live-dashboard`, `od-data-report`, `od-d3-visualization`, `od-motion-frames` |
| Backend/API/data | `system-design`, `api-and-interface-design`, `database-schema-designer` |
| Supabase/Postgres | `supabase`, `supabase-postgres-best-practices` |
| Implementation/debugging | `incremental-implementation`, `diagnose`, `test-driven-development`, `code-review-and-quality` |
| Docs/research | `planning-document-writer`, `research-report-writer`, `research-synthesizer`, `technical-writer` |
| GitHub/deploy | `gh-cli`, `gh-address-comments`, `gh-fix-ci`, `vercel-deploy`, `cloudflare-deploy` |

## Senior Engineering Lenses

Instead of installing separate "senior backend developer" or "senior frontend developer" persona skills, this kit folds the useful parts into:

```text
skills/skill-router/references/senior-engineering-lenses.md
```

It adds four quiet quality gates:

- Staff review gate: correctness, readability, architecture, security, performance
- Senior backend gate: contracts, validation, errors, auth/ownership, pagination, idempotency, indexes, migration safety
- Senior frontend gate: user flow, semantic HTML, composition, states, accessibility, responsive stability, performance
- Ship gate: scope, verification, UX states, security basics, handoff

These are applied by the router when useful without adding more active skills.

## Custom Skills In This Repo

This repo only stores the custom/curated skills I actively maintain here. The full local profile also includes official and curated skills installed in `~/.codex/skills`.

| Group | Skills |
| --- | --- |
| Routing | `skill-router` |
| Design workflow | `design-brief`, `information-architecture`, `design-tokens`, `brief-to-tasks`, `design-review`, `design-flow` |
| Frontend polish | `claude-design`, `frontend-design-audit`, `gpt-taste`, `image-to-code`, `ux-enhancer` |
| Game design | `mobile-game-design`, `game-ui-art-direction`, `prototype-slice-planner`, `player-experience-review`, `mobile-game-qa`, `game-reference-research` |
| Image generation | `media-image-director` |
| Open Design imports | `od-design-md`, `od-plan-design-review`, `od-research-decision-room`, `od-live-dashboard`, `od-data-report`, `od-d3-visualization`, `od-hand-drawn-diagrams`, `od-motion-frames`, `od-platform-design` |
| Supabase | `supabase`, `supabase-postgres-best-practices` |

## Install

Review the files first, then run:

```bash
./scripts/install.sh
```

The installer copies `skills/` into `$CODEX_HOME/skills` and backs up an existing `$CODEX_HOME/AGENTS.md` before replacing it.

## Keep Skills Lean

Preview what would be moved out:

```bash
./scripts/prune-skills.sh
```

Apply the lean profile:

```bash
./scripts/prune-skills.sh --apply
```

The previous prune backup was intentionally deleted after the lean profile was accepted. Removed niche skills can be reinstalled later from their source if an exact workflow becomes necessary.

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

This repo is a portable method kit, not a raw dotfiles backup.
