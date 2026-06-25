#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
STAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$CODEX_HOME/skills" "$CODEX_HOME/config" "$CODEX_HOME/agents"

if [ -f "$CODEX_HOME/AGENTS.md" ]; then
  cp "$CODEX_HOME/AGENTS.md" "$CODEX_HOME/AGENTS.md.backup-$STAMP"
fi

cp -R "$ROOT_DIR/skills/." "$CODEX_HOME/skills/"
cp -R "$ROOT_DIR/agents/." "$CODEX_HOME/agents/"
cp "$ROOT_DIR/AGENTS.md" "$CODEX_HOME/AGENTS.md"
cp "$ROOT_DIR/config/lean-skills.txt" "$CODEX_HOME/config/lean-skills.txt"

echo "Installed Codex Agent Kit into $CODEX_HOME"
echo "Installed lean skill profile into $CODEX_HOME/config/lean-skills.txt"
echo "Installed routing references into $CODEX_HOME/agents"
echo "Review config/codex.config.sample.toml manually before copying it."
