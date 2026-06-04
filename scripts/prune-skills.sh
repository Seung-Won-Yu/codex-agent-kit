#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
SKILLS_DIR="$CODEX_HOME/skills"
KEEP_FILE="${KEEP_FILE:-$ROOT_DIR/config/lean-skills.txt}"
STAMP="$(date +%Y%m%d-%H%M%S)"
APPLY=0

usage() {
  cat <<'USAGE'
Usage: scripts/prune-skills.sh [--apply]

Moves skills not listed in config/lean-skills.txt out of $CODEX_HOME/skills.
Without --apply, prints a dry-run plan.

Environment:
  CODEX_HOME  Defaults to ~/.codex
  KEEP_FILE   Defaults to config/lean-skills.txt
USAGE
}

for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $arg" >&2; usage; exit 2 ;;
  esac
done

if [ ! -d "$SKILLS_DIR" ]; then
  echo "Skills directory not found: $SKILLS_DIR" >&2
  exit 1
fi

if [ ! -f "$KEEP_FILE" ]; then
  echo "Keep file not found: $KEEP_FILE" >&2
  exit 1
fi

ACTIVE_KEEP="$(mktemp)"
trap 'rm -f "$ACTIVE_KEEP"' EXIT
grep -vE '^[[:space:]]*(#|$)' "$KEEP_FILE" | sort -u > "$ACTIVE_KEEP"

total="$(find "$SKILLS_DIR" -maxdepth 1 -mindepth 1 -type d ! -name '.*' | wc -l | tr -d ' ')"
keep_count="$(wc -l < "$ACTIVE_KEEP" | tr -d ' ')"
remove_count=0
remove_list="$(mktemp)"
trap 'rm -f "$ACTIVE_KEEP" "$remove_list"' EXIT

for dir in "$SKILLS_DIR"/*; do
  [ -d "$dir" ] || continue
  name="$(basename "$dir")"
  if ! grep -qxF "$name" "$ACTIVE_KEEP"; then
    echo "$name" >> "$remove_list"
    remove_count=$((remove_count + 1))
  fi
done

echo "Skills directory: $SKILLS_DIR"
echo "Keep profile: $KEEP_FILE"
echo "Current skills: $total"
echo "Profile target: $keep_count"
echo "Will move out: $remove_count"

if [ "$remove_count" -gt 0 ]; then
  echo
  sort "$remove_list"
fi

if [ "$APPLY" -ne 1 ]; then
  echo
  echo "Dry run only. Re-run with --apply to move these skills into a backup folder."
  exit 0
fi

BACKUP_DIR="$CODEX_HOME/skills.pruned-$STAMP"
mkdir -p "$BACKUP_DIR"

while IFS= read -r name; do
  [ -n "$name" ] || continue
  if [ -d "$SKILLS_DIR/$name" ]; then
    mv "$SKILLS_DIR/$name" "$BACKUP_DIR/$name"
  fi
done < "$remove_list"

remaining="$(find "$SKILLS_DIR" -maxdepth 1 -mindepth 1 -type d ! -name '.*' | wc -l | tr -d ' ')"

echo
echo "Moved pruned skills to: $BACKUP_DIR"
echo "Remaining skills: $remaining"
