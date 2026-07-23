#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_ROOT="$TARGET_CODEX_HOME/backups/codex-agent-kit-$STAMP"

EXACT_INSTALL=false
INSTALL_CONFIG=false
INSTALL_PLUGINS=false

usage() {
  cat <<'EOF'
Usage: ./scripts/install.sh [options]

Options:
  --exact        Archive existing personal agents, global skills, and packs first.
                 The built-in .system skill directory is preserved.
  --with-config  Back up config.toml and install this kit's portable base config.
  --plugins      Install and enable the 10 plugins used by this setup.
  -h, --help     Show this help.

Recommended full setup:
  ./scripts/install.sh --exact --with-config --plugins
EOF
}

for argument in "$@"; do
  case "$argument" in
    --exact) EXACT_INSTALL=true ;;
    --with-config) INSTALL_CONFIG=true ;;
    --plugins) INSTALL_PLUGINS=true ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $argument" >&2
      usage >&2
      exit 2
      ;;
  esac
done

mkdir -p \
  "$TARGET_CODEX_HOME/agents/playbooks" \
  "$TARGET_CODEX_HOME/skills" \
  "$TARGET_CODEX_HOME/skill-packs" \
  "$TARGET_CODEX_HOME/scripts"

backup_file() {
  local source_file="$1"
  local relative_path="$2"
  if [ -e "$source_file" ]; then
    mkdir -p "$(dirname "$BACKUP_ROOT/$relative_path")"
    cp -R "$source_file" "$BACKUP_ROOT/$relative_path"
  fi
}

backup_file "$TARGET_CODEX_HOME/AGENTS.md" "AGENTS.md"
backup_file "$TARGET_CODEX_HOME/xhigh.config.toml" "xhigh.config.toml"

if [ "$EXACT_INSTALL" = true ]; then
  mkdir -p "$BACKUP_ROOT/skills"

  if [ -d "$TARGET_CODEX_HOME/agents" ]; then
    mv "$TARGET_CODEX_HOME/agents" "$BACKUP_ROOT/agents"
  fi

  if [ -d "$TARGET_CODEX_HOME/skill-packs" ]; then
    mv "$TARGET_CODEX_HOME/skill-packs" "$BACKUP_ROOT/skill-packs"
  fi

  for personal_skill in "$TARGET_CODEX_HOME"/skills/*; do
    if [ -e "$personal_skill" ]; then
      mv "$personal_skill" "$BACKUP_ROOT/skills/"
    fi
  done

  mkdir -p \
    "$TARGET_CODEX_HOME/agents/playbooks" \
    "$TARGET_CODEX_HOME/skills" \
    "$TARGET_CODEX_HOME/skill-packs"
fi

cp "$ROOT_DIR/AGENTS.md" "$TARGET_CODEX_HOME/AGENTS.md"
cp -R "$ROOT_DIR/agents/." "$TARGET_CODEX_HOME/agents/"
cp -R "$ROOT_DIR/skills/." "$TARGET_CODEX_HOME/skills/"
cp -R "$ROOT_DIR/skill-packs/." "$TARGET_CODEX_HOME/skill-packs/"
cp "$ROOT_DIR/scripts/validate-skills.py" "$TARGET_CODEX_HOME/scripts/validate-skills.py"
cp "$ROOT_DIR/config/xhigh.config.sample.toml" "$TARGET_CODEX_HOME/xhigh.config.toml"

if [ "$INSTALL_CONFIG" = true ]; then
  backup_file "$TARGET_CODEX_HOME/config.toml" "config.toml"
  cp "$ROOT_DIR/config/codex.config.sample.toml" "$TARGET_CODEX_HOME/config.toml"
fi

if [ "$INSTALL_PLUGINS" = true ]; then
  "$ROOT_DIR/scripts/install-plugins.sh"
fi

echo
echo "Codex Agent Kit installed into $TARGET_CODEX_HOME"
echo "- AGENTS.md, 3 agents, 4 playbooks"
echo "- 36 global skills, 11 packed skills"
echo "- xhigh profile and validation scripts"
if [ "$INSTALL_CONFIG" = true ]; then
  echo "- portable quality-first config.toml"
fi
if [ "$INSTALL_PLUGINS" = true ]; then
  echo "- 10 Codex plugins"
fi
if [ -d "$BACKUP_ROOT" ]; then
  echo "Previous files backed up to $BACKUP_ROOT"
fi
echo
echo "Edit skill-packs/manifest.yaml if your project paths differ, then restart Codex."
