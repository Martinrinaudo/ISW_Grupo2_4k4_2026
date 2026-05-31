# Decisiones de diseño — TP6 TDD

Grupo 2 · US Inscribirme a actividad (EcoHarmony)

## Del enunciado

User story y criterios de aceptación (`tp2-ecoharmony/us-inscribir-actividad.md`):

- Actividades: Tirolesa, Safari, Palestra, Jardinería.
- Horario, cantidad de personas, datos por participante (nombre, DNI, edad, talle si aplica).
- TyC obligatorio y mail de confirmación.

Las **6 pruebas de usuario** del enunciado:

1. Inscripción completa con mail — **pasa**
2. Sin cupo — **falla**
3. Sin talle cuando no hace falta (Safari/Jardinería) — **pasa**
4. Parque cerrado o actividad no disponible — **falla**
5. Sin TyC — **falla**
6. Sin talle cuando es obligatorio — **falla**

## Lo que asumimos

La US no trae cupos, horarios, edades mínimas ni anticipación. Consultamos a cátedra por mail; hasta que respondan usamos `lib/ecoharmony/constantes.ts`:

| | |
|---|---|
| Cupos por turno | Safari 8, Palestra 12, Jardinería 12, Tirolesa 10 |
| Edad mínima | Palestra 12, Tirolesa 8 |
| Talle obligatorio | Palestra y Tirolesa (XS a XXL) |
| Parque | 9 a 19 hs; actividades 9 a 18 hs; turnos de 30 min |
| Cerrado | Lunes, 25/12 y 1/1 |
| Anticipación | Hasta 2 días antes del turno |
| TyC | 7 cláusulas del material de cursada |

Mail mockeado en tests. En la app: SMTP con `.env.local` o log en consola.

**Pendiente:** cuando cátedra confirme reglas, actualizar `constantes.ts`, tests y pantalla.

## Arquitectura

- `lib/ecoharmony/` — dominio
- `app/inscripcion/` + `components/` — UI
- `tests/` — Vitest (13 tests; las 6 pruebas de usuario + reglas extra)

Flujo: validar → mail → cupos. Reloj fijo en tests: `2026-05-20`.

## Tests automatizados

Cada prueba de usuario del enunciado tiene al menos un test. Además: edad mínima, anticipación, feriado, label de cupos, cupos vs cantidad de personas.
