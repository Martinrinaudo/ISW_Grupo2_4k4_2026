#!/bin/bash
set -euo pipefail
export LANG=C.UTF-8
export LC_ALL=C.UTF-8

REPO="/c/Users/Matias/ISW_Grupo2_4k4_2026"
SRC="/c/Users/Matias/ecoharmony-tdd-git"
GIT="/c/Program Files/Git/bin/git.exe"
DEST='Trabajos Prácticos/Trabajos Prácticos Grupales/TP6/ecoharmony-tdd'
MSG="${1:-actualizacion de documentacion}"

cd "$REPO"

mkdir -p "$DEST"
/c/Windows/System32/robocopy.exe "$SRC" "$DEST" /E /XD node_modules .git .next /XF entregar-grupo.ps1 subir-fix.sh /NFL /NDL /NJH /NJS || true

test -f "$DEST/README.md" || { echo "ERROR: no README en destino"; exit 1; }

"$GIT" add -A -- "$DEST/"
COUNT=$("$GIT" ls-files -- "$DEST" | wc -l)
echo "Archivos indexados: $COUNT"
if [ "$COUNT" -lt 25 ]; then
  "$GIT" status --short
  exit 1
fi

TREE=$("$GIT" write-tree)
PARENT=$("$GIT" rev-parse HEAD)
COMMIT=$("$GIT" commit-tree "$TREE" -p "$PARENT" -m "$MSG")
"$GIT" update-ref refs/heads/main "$COMMIT"
"$GIT" reset --hard

"$GIT" log -1 --oneline
"$GIT" push origin main
echo "Listo"
