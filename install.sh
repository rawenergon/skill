#!/usr/bin/env bash
set -e

REPO_URL="https://github.com/rawenergon/skill.git"
TARGET_SKILL="${1:-all}"
DEST_DIR="${2:-.gemini/skills}"

# If .agents/skills exists, default there instead
if [ -d ".agents/skills" ] && [ "$DEST_DIR" = ".gemini/skills" ]; then
  DEST_DIR=".agents/skills"
fi

mkdir -p "$DEST_DIR"

echo "📦 Installing skill(s): '$TARGET_SKILL' into '$DEST_DIR'..."

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

git clone --depth 1 "$REPO_URL" "$TMP_DIR" > /dev/null 2>&1

if [ "$TARGET_SKILL" = "all" ]; then
  cp -r "$TMP_DIR"/skills/* "$DEST_DIR"/
  echo "✅ All 45 agent skills successfully installed into $DEST_DIR/"
else
  if [ -d "$TMP_DIR/skills/$TARGET_SKILL" ]; then
    cp -r "$TMP_DIR/skills/$TARGET_SKILL" "$DEST_DIR/"
    echo "✅ Skill '$TARGET_SKILL' successfully installed into $DEST_DIR/$TARGET_SKILL"
  else
    echo "❌ Error: Skill '$TARGET_SKILL' not found in repository."
    exit 1
  fi
fi
