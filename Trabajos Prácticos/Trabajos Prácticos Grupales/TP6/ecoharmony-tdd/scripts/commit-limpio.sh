#!/bin/bash
set -euo pipefail
GIT="/c/Program Files/Git/bin/git.exe"
cd "$(dirname "$0")/.."

"$GIT" add -A

TREE=$("$GIT" write-tree)
PARENT=$("$GIT" rev-parse HEAD 2>/dev/null || echo "")
MSG="${1:-update}"

if [ -n "$PARENT" ]; then
  COMMIT=$("$GIT" commit-tree "$TREE" -p "$PARENT" -m "$MSG")
else
  COMMIT=$("$GIT" commit-tree "$TREE" -m "$MSG")
fi

BRANCH=$("$GIT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "master")
"$GIT" update-ref "refs/heads/$BRANCH" "$COMMIT" 2>/dev/null || "$GIT" update-ref refs/heads/master "$COMMIT"
"$GIT" reset --hard

echo "Commit: $COMMIT"
"$GIT" log -1 --oneline
"$GIT" log -1 --format=%B

if "$GIT" log -1 --format=%B | grep -qi 'co-authored-by'; then
  echo "ERROR: aparece Co-authored-by en el mensaje"
  exit 1
fi

echo "OK — sin co-autor"
