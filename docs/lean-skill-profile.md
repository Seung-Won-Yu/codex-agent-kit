# Lean Skill Profile

This profile keeps Codex useful without exposing every installed skill at once.

## Goal

- Keep about 100 skills available locally.
- Preserve the custom Seung-Won-Yu skills in this kit.
- Keep representative skills for design, frontend, games, image generation, GitHub, Supabase, docs, research, and normal implementation.
- Move rarely used specialized skills into a timestamped backup instead of deleting them.

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

To restore a skill, move its folder back into `$CODEX_HOME/skills`.

```bash
mv "$CODEX_HOME/skills.pruned-YYYYMMDD-HHMMSS/<skill-name>" "$CODEX_HOME/skills/"
```

Restart Codex after changing installed skills.
