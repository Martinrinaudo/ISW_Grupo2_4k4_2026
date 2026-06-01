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

- **Tests:** no necesitan `.env`; cubren destino, asunto y cuerpo del mail con mock.
- **Demo con mail que llega:** **uno del grupo** configura `.env.local` (SMTP). Ver [`docs/CONFIGURACION-MAIL.md`](docs/CONFIGURACION-MAIL.md). El resto solo clona y corre tests/UI.
- **Sin `.env`:** inscripción OK; el mail se ve en la consola del servidor.

## Tests

`npm test` — backend (~20 tests): 6 PO del enunciado + reglas + **mail** (cuerpo, asunto, no enviar si falla, no cupos si falla SMTP).

## Carpetas

```
lib/ecoharmony/     dominio (reglas, servicio, mail)
tests/              Vitest
app/inscripcion/    pantalla y server actions
components/         formulario y modal TyC
docs/               instalación, mail, decisiones
```

## Más info para el grupo

- [`docs/GUIA-RAPIDA-GRUPO.md`](docs/GUIA-RAPIDA-GRUPO.md) — día a día, qué no subir
- [`docs/INSTALACION-WINDOWS.md`](docs/INSTALACION-WINDOWS.md) — si algo no instila
