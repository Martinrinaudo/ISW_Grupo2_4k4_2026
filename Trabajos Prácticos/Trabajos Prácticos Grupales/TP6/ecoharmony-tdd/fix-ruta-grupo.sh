#!/bin/bash
set -euo pipefail
export LANG=C.UTF-8
export LC_ALL=C.UTF-8

REPO="/c/Users/Matias/ISW_Grupo2_4k4_2026"
SRC="/c/Users/Matias/ecoharmony-tdd-git"
GIT="/c/Program Files/Git/bin/git.exe"
MSG="${1:-TP6: reglas Salva, tests y docs del grupo}"

cd "$REPO"
"$GIT" pull origin main

CORRECT_TOP=$("$GIT" ls-files | grep '/\.gitkeep$' | grep 'Trabajos Pr' | grep -v Investig | head -1 | cut -d/ -f1)
DEST="$CORRECT_TOP/Trabajos Prácticos Grupales/TP6/ecoharmony-tdd"

echo "Destino: $DEST"

mkdir -p "$DEST"
/c/Windows/System32/robocopy.exe "$SRC" "$DEST" /E /XD node_modules .git .next /XF entregar-grupo.ps1 /NFL /NDL /NJH /NJS >/dev/null || true

# Limpiar carpeta mojibake si quedó sin trackear
rm -rf "Trabajos Pr"*"cticos"/ 2>/dev/null || true

"$GIT" add -A -- "$DEST/"
"$GIT" add -- "$CORRECT_TOP/.gitkeep" "$CORRECT_TOP/Trabajos Prácticos Grupales/.gitkeep" 2>/dev/null || true

COUNT=$("$GIT" ls-files -- "$DEST" | wc -l)
echo "Archivos en índice bajo $DEST: $COUNT"
if [ "$COUNT" -lt 25 ]; then
  echo "ERROR: faltan archivos en el índice; no se hace commit"
  "$GIT" status --short | head -30
  exit 1
fi

"$GIT" status --short | head -25

TREE=$("$GIT" write-tree)
PARENT=$("$GIT" rev-parse HEAD)
COMMIT=$("$GIT" commit-tree "$TREE" -p "$PARENT" -m "$MSG")
"$GIT" update-ref refs/heads/main "$COMMIT"
"$GIT" reset --hard

if "$GIT" log -1 --format=%B | grep -qi 'co-authored-by'; then
  echo "ERROR: Co-authored-by en el commit"
  exit 1
fi

"$GIT" push origin main
echo "OK — $( "$GIT" log -1 --oneline )"
"$GIT" ls-files -- "$DEST" | wc -l
