# TP6 — EcoHarmony, inscribirme a actividad

Grupo 2 · 4K4 · ISW

Implementamos la US **Inscribirme a actividad** con TDD (Next.js + TypeScript + Vitest). La pantalla está en `/inscripcion`.

**Repo del grupo:** https://github.com/Martinrinaudo/ISW_Grupo2_4k4_2026  
Ruta: `Trabajos Prácticos/Trabajos Prácticos Grupales/TP6/ecoharmony-tdd/`

## Requisitos

- Node 20 o más
- Git

Trabajá en una carpeta local (`C:\...`). En Google Drive `npm install` suele romperse.

## Cómo correrlo

```bash
npm install
npm test
npm run dev
```

Abrí http://localhost:3000/inscripcion

## Reglas (lo que nos confirmó Salva por mail, jun/2026)

| Tema | Valor |
|------|--------|
| Parque | 8:30 a 19, cerrado lunes y 25/12 y 1/1 |
| Actividades | 9 a 18, un turno por hora (último a las 17:00) |
| Cupos/turno | Safari 8, Palestra 12, Jardinería 12, Tirolesa 10 |
| Anticipación | 24 hs antes del turno (fecha + hora) |
| Talle | Palestra y Tirolesa (XS–XXL) |

Detalle y arquitectura: [`docs/decisiones-tp6-tdd.md`](docs/decisiones-tp6-tdd.md). Números en código: `lib/ecoharmony/constantes.ts`.

## Mail

- **Sin configurar:** la inscripción igual funciona; el texto de confirmación sale en la consola del servidor y hay un aviso en pantalla.
- **Con SMTP:** copiá `.env.example` a `.env.local` — ver [`docs/CONFIGURACION-MAIL.md`](docs/CONFIGURACION-MAIL.md).

## Tests

`npm test` corre el backend (16 tests): las 6 pruebas de usuario del enunciado + reglas (edad, 24 hs, cupos, feriados, cuerpo del mail). El mail real no se usa en tests.

## Carpetas

```
lib/ecoharmony/     dominio (reglas, servicio, mail)
tests/              Vitest
app/inscripcion/    pantalla y server actions
components/         formulario y modal TyC
docs/               instalación, mail, decisiones
```

## Más info para el grupo

- [`docs/GUIA-RAPIDA-GRUPO.md`](docs/GUIA-RAPIDA-GRUPO.md) — día a día, commits, qué no subir
- [`docs/INSTALACION-WINDOWS.md`](docs/INSTALACION-WINDOWS.md) — si algo no instala

## Commits al repo del grupo

No uses `git commit` desde Cursor en el monorepo del grupo (agrega co-autor). Usá `scripts/commit-limpio.sh` — está explicado en la guía rápida.
