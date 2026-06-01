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

Tiene que decir 21 tests OK.

## Qué NO subir

- `node_modules/`
- `.env.local`
- `.next/`

## Subir al repo del grupo

1. Copiar cambios al clone de `ISW_Grupo2_4k4_2026` (carpeta `TP6/ecoharmony-tdd`).
2. En el monorepo: `git add` de esa carpeta (cuidado con tildes en la ruta).
3. `git commit` y `git push origin main`.

Si hay drama con la ruta, está `entregar-grupo.ps1` en este proyecto.

## Cambiar una regla de negocio

1. `constantes.ts`
2. Si hace falta lógica nueva, `reglas.ts` o `inscripcion-service.ts`
3. Ajustar test en `tests/inscripcion.test.ts`
4. `npm test`
