# Corrige carpeta duplicada por encoding (Trabajos PrÃ¡cticos -> Trabajos Prácticos)
# Ejecutar en Windows Terminal (no Cursor):
#   powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Matias\ecoharmony-tdd-git\fix-ruta-grupo.ps1"

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$Repo = "C:\Users\Matias\ISW_Grupo2_4k4_2026"
$Origen = "C:\Users\Matias\ecoharmony-tdd-git"
$Correcto = Join-Path $Repo "Trabajos Prácticos\Trabajos Prácticos Grupales\TP6\ecoharmony-tdd"

Set-Location $Repo
git pull origin main

# Ruta incorrecta tal como la tiene git (mojibake)
$mal = (git ls-files "**/ecoharmony-tdd/README.md" | Select-Object -First 1) -replace "/README.md$", ""
if (-not $mal) { throw "No se encontro la ruta incorrecta en git" }
Write-Host "Ruta incorrecta: $mal" -ForegroundColor Yellow

# Copiar a la ruta correcta
New-Item -ItemType Directory -Path $Correcto -Force | Out-Null
robocopy $Origen $Correcto /E /XD node_modules .next .git /XF entregar-grupo.ps1 fix-ruta-grupo.ps1 /NFL /NDL /NJH /NJS | Out-Null

# Quitar carpeta mala del indice y del disco
git rm -r -- "$mal"
git add "Trabajos Prácticos/Trabajos Prácticos Grupales/TP6/ecoharmony-tdd"

git status --short
git commit -m "fix: mover TP6 a Trabajos Practicos (ruta correcta)"
git push origin main

Write-Host "Listo. Verificar en GitHub:" -ForegroundColor Green
Write-Host "https://github.com/Martinrinaudo/ISW_Grupo2_4k4_2026/tree/main/Trabajos%20Pr%C3%A1cticos/Trabajos%20Pr%C3%A1cticos%20Grupales/TP6/ecoharmony-tdd"
