# Codex Agent Kit

My personal Codex routing rules and reusable agent skills.

This repository is a clean, shareable version of the local setup I use for product planning, frontend design, UX review, Supabase work, and implementation handoff. It intentionally excludes local sessions, auth files, caches, generated images, browser state, SQLite databases, and app runtime files.

## What's Inside

```text
.
├── AGENTS.md                         # Global role and skill-routing rules
├── config/
│   └── codex.config.sample.toml      # Redacted Codex config example
├── docs/
│   ├── architecture.md               # How the kit is organized
│   ├── skill-catalog.md              # Included skills and when to use them
│   └── security-checklist.md         # What must never be committed
├── scripts/
│   └── install.sh                    # Optional local install helper
└── skills/                           # Personal/shared skills
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

## Skill Groups

| Group | Skills |
| --- | --- |
| Product/design planning | `design-brief`, `information-architecture`, `design-flow`, `brief-to-tasks` |
| Visual/UI quality | `claude-design`, `design-tokens`, `design-review`, `frontend-design-audit`, `gpt-taste`, `image-to-code`, `ux-enhancer` |
| Backend/data | `supabase`, `supabase-postgres-best-practices` |

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
