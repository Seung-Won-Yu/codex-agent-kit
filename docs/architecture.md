# Architecture

This kit separates three layers:

## 1. Routing Layer

`AGENTS.md` defines the operating model:

- classify the user's final desired output
- choose the lightest responsible role
- select one primary skill plus at most two support skills
- execute, verify, and summarize

It is intentionally written as policy rather than code so it can be read and edited quickly.

`skills/skill-router/` contains the reusable router skill. Its bundled `references/skill-catalog.md` and `references/activation-matrix.md` are the detailed lookup tables used when several skills could fit.

## 2. Skill Layer

`skills/` contains reusable workflows. Each skill has a `SKILL.md` with:

- trigger conditions
- expected output
- step-by-step process
- guardrails and verification expectations

Some skills include `references/`, `examples/`, or assets. Load those progressively instead of reading everything at once.

## 3. Local Config Layer

`config/codex.config.sample.toml` shows feature flags and plugin shape without private paths, auth, browser state, or local runtime cache values.

The real config on a machine may include absolute paths and local project trust entries. Keep those private unless they are intentionally sanitized.

## 4. Third-Party Import Layer

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
