# Copia TP6 al monorepo del grupo y pushea sin Co-authored-by Cursor

$ErrorActionPreference = "Stop"
$Proyecto = "C:\Users\Matias\ecoharmony-tdd-git"
$Bash = "C:\Program Files\Git\bin\bash.exe"
$Msg = if ($args.Count -gt 0) { $args[0] } else { "TP6: reglas Salva, tests y docs del grupo" }

Write-Host "=== Tests ===" -ForegroundColor Cyan
Set-Location $Proyecto
npm test
if ($LASTEXITCODE -ne 0) { throw "Tests fallaron" }

Write-Host "=== Commit local ===" -ForegroundColor Cyan
& $Bash -c "cd '/c/Users/Matias/ecoharmony-tdd-git' && ./scripts/commit-limpio.sh '$Msg'"

Write-Host "=== Subir al repo del grupo (ruta con tildes) ===" -ForegroundColor Cyan
& $Bash -c "cd '/c/Users/Matias/ecoharmony-tdd-git' && ./fix-ruta-grupo.sh '$Msg'"

Write-Host "Listo. Revisá el commit en GitHub." -ForegroundColor Green
