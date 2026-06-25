# Architecture

This kit separates six layers:

## 1. Routing Layer

`AGENTS.md` defines the operating model:

- execute directly when the task is clear
- use the fuzzy intake pipeline only when ambiguity changes the output
- select one primary skill plus at most two support skills when skills matter
- execute, verify, and summarize

It is intentionally written as policy rather than code so it can be read and edited quickly.

`agents/` contains lightweight routing references and playbooks. `skills/skill-router/` remains the reusable router skill for broad or explicit routing tasks.

## 2. Agent Reference Layer

`agents/routing.md` is the compact routing map used only when direct execution is unreliable or several lanes fit.

`agents/playbooks/` stores focused guidance for:

- backend/API/schema/auth/data work
- frontend/product UI work
- design/prototype work
- docs and research work

These files are deliberately smaller than the older all-in-one registry.

## 3. Skill Layer

`skills/` contains reusable workflows. Each skill has a `SKILL.md` with:

- trigger conditions
- expected output
- step-by-step process
- guardrails and verification expectations

Some skills include `references/`, `examples/`, or assets. Load those progressively instead of reading everything at once.

## 4. Local Config Layer

`config/codex.config.sample.toml` shows feature flags and plugin shape without private paths, auth, browser state, or local runtime cache values.

The real config on a machine may include absolute paths and local project trust entries. Keep those private unless they are intentionally sanitized.

## 5. Documentation Site Layer

`index.html` and `assets/` provide a GitHub Pages-friendly overview of the kit. The page is static and has no build step.

## 6. Third-Party Import Layer

`third_party/` stores license material for imported skill sources. Imported skills are kept in `skills/` with a clear prefix, such as `od-`, so they remain easy to identify and do not collide with local skill names.

Open Design imports are documented in `docs/open-design-imports.md`.

## What Is Excluded

Raw Codex homes contain many non-portable or private files:

- `auth.json`
- `sessions/`, `archived_sessions/`, `session_index.jsonl`
- `logs_*.sqlite`, `memories_*.sqlite`, `state_*.sqlite`
- browser sessions
- plugin caches and runtime bundles
- generated images
- attachments

Those are deliberately not part of this repository.
