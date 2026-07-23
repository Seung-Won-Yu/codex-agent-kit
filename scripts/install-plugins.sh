#!/usr/bin/env bash
set -euo pipefail

if ! command -v codex >/dev/null 2>&1; then
  echo "Codex CLI is required to install plugins." >&2
  exit 1
fi

PLUGINS=(
  "documents@openai-primary-runtime"
  "spreadsheets@openai-primary-runtime"
  "presentations@openai-primary-runtime"
  "pdf@openai-primary-runtime"
  "template-creator@openai-primary-runtime"
  "sites@openai-bundled"
  "browser@openai-bundled"
  "chrome@openai-bundled"
  "computer-use@openai-bundled"
  "visualize@openai-bundled"
)

PLUGIN_LIST_FILE="$(mktemp)"
trap 'rm -f "$PLUGIN_LIST_FILE"' EXIT
codex plugin list >"$PLUGIN_LIST_FILE"

for plugin in "${PLUGINS[@]}"; do
  if awk -v plugin="$plugin" '$1 == plugin && $2 == "installed," { found = 1 } END { exit !found }' "$PLUGIN_LIST_FILE"; then
    echo "Already installed: $plugin"
    continue
  fi
  echo "Installing: $plugin"
  codex plugin add "$plugin"
done
