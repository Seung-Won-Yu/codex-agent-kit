#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
STAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p \
  "$CODEX_HOME/agents/playbooks" \
  "$CODEX_HOME/skills" \
  "$CODEX_HOME/skill-packs" \
  "$CODEX_HOME/scripts"

if [ -f "$CODEX_HOME/AGENTS.md" ]; then
  cp "$CODEX_HOME/AGENTS.md" "$CODEX_HOME/AGENTS.md.backup-$STAMP"
fi

cp "$ROOT_DIR/AGENTS.md" "$CODEX_HOME/AGENTS.md"
cp -R "$ROOT_DIR/agents/." "$CODEX_HOME/agents/"
cp -R "$ROOT_DIR/skills/." "$CODEX_HOME/skills/"
cp -R "$ROOT_DIR/skill-packs/." "$CODEX_HOME/skill-packs/"
cp "$ROOT_DIR/scripts/validate-skills.py" "$CODEX_HOME/scripts/validate-skills.py"

echo "Installed current Codex rules, agents, skills, and project packs into $CODEX_HOME"
echo "Existing extra skills were not pruned."
echo "Review config/codex.config.sample.toml manually; config.toml was not overwritten."
echo "Adjust skill-packs/manifest.yaml project paths before validation on another machine."
