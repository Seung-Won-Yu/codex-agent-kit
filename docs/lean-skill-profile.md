# Lean Skill Profile

This profile keeps Codex useful without exposing every installed skill at once.

## Goal

- Keep about 100 skills available locally.
- Preserve the custom Seung-Won-Yu skills in this kit.
- Keep representative skills for design, frontend, games, image generation, GitHub, Supabase, docs, research, and normal implementation.
- Keep the active skill set small enough to route quickly.
- Absorb useful "senior developer" standards as shared lenses instead of installing separate persona skills.

## How To Apply

Preview:

```bash
scripts/prune-skills.sh
```

Apply:

```bash
scripts/prune-skills.sh --apply
```

The script reads `config/lean-skills.txt` and moves every other local skill from `$CODEX_HOME/skills` into:

```text
$CODEX_HOME/skills.pruned-YYYYMMDD-HHMMSS
```

## Restore

The previous prune backup was intentionally deleted after the lean profile was accepted. To bring a removed skill back, reinstall it from its source or copy it from a fresh skill bundle.

Restart Codex after changing installed skills.
