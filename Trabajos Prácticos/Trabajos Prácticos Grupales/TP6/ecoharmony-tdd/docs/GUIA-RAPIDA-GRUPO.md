# Guía rápida — Grupo 2

## Qué es cada cosa

| Carpeta/archivo | Para qué |
|-----------------|----------|
| `lib/ecoharmony/constantes.ts` | Cupos, horarios, textos TyC |
| `lib/ecoharmony/reglas.ts` | Validaciones puras |
| `lib/ecoharmony/inscripcion-service.ts` | Caso de uso inscribir |
| `tests/` | Vitest — correr antes de subir |
| `app/inscripcion/` | Pantalla |
| `docs/decisiones-tp6-tdd.md` | Lo que le mostramos al profe |

## Antes de commitear

```bash
npm test
```

Tiene que decir 16 tests OK.

## Qué NO subir

- `node_modules/`
- `.env.local`
- `.next/`

## Commits sin co-autor de Cursor

Cursor mete `Co-authored-by: Cursor` si hacés commit desde el IDE. Para el repo del grupo usamos el script:

```powershell
cd C:\Users\Matias\ecoharmony-tdd-git
& "C:\Program Files\Git\bin\bash.exe" "./scripts/commit-limpio.sh" "TP6: reglas Salva y docs"
```

El script revisa que el mensaje no tenga co-autor.

Alternativa: commit desde **PowerShell o Windows Terminal fuera de Cursor**, y después:

```bash
git log -1 --format=%B
```

Si aparece `Co-authored-by`, no pushear — rehacer con el script.

## Subir al repo del grupo

1. Copiar cambios al clone de `ISW_Grupo2_4k4_2026` (carpeta `TP6/ecoharmony-tdd`).
2. En el monorepo, `git add` con cuidado en rutas con tildes (`chcp 65001` en PowerShell).
3. Commit con `commit-limpio.sh` desde la raíz del monorepo (o el procedimiento que acordemos).
4. `git push origin main`
5. Mirar el commit en GitHub y confirmar que no hay co-autor.

También está `entregar-grupo.ps1` en este proyecto si lo usamos para copiar archivos.

## Cambiar una regla de negocio

1. `constantes.ts`
2. Si hace falta lógica nueva, `reglas.ts` o `inscripcion-service.ts`
3. Ajustar test en `tests/inscripcion.test.ts`
4. `npm test`
