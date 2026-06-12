# Decisiones TP6 — Inscribirme a actividad

**Versión para entrega e impresión:** [`ISW_TP_6.html`](ISW_TP_6.html) (generar `ISW_TP_6.pdf` desde el navegador o usar el PDF en `TP6/ISW_TP_6.pdf`).

Grupo 2 · EcoHarmony

## US

Visitante se inscribe a Tirolesa, Safari, Palestra o Jardinería: elige turno, carga participantes, acepta TyC y recibe mail de confirmación.

Las 6 pruebas de usuario del TP2 están en `tests/inscripcion.test.ts`.

## Reglas confirmadas (mail Salva, 1/jun/2026)

| Tema | Regla |
|------|--------|
| Parque | 8:30–19; cerrado lunes, 25/12 y 1/1 |
| Actividades | 9–18; 1 turno/hora; no hay turno a las 18:00 |
| Cupos | Safari 8, Palestra 12, Jardinería 12, Tirolesa 10 |
| Edad | Safari y Jardinería: todas; Palestra ≥12; Tirolesa ≥8 |
| Anticipación | 24 hs antes del inicio del turno |
| Talle | Palestra y Tirolesa; XS–XXL |
| TyC | Modal distinto por actividad (`TYC_POR_ACTIVIDAD`) |

Valores en `lib/ecoharmony/constantes.ts`.

## Arquitectura

- **Dominio** (`lib/ecoharmony/`): validaciones, cupos en memoria, envío de mail (puerto `Mailer`).
- **App** (`app/inscripcion/`, `components/`): formulario; no duplica reglas.
- **Tests** (Vitest): solo backend, como pidió Salva. Reloj inyectable (`RelojFijo` en tests, `RelojSistema` en la app).

Flujo al confirmar: validar → mail → descontar cupos.

## Mail

- Tests: `MailerRegistro` guarda email, asunto y cuerpo (misma lógica que SMTP). Ver `tests/mail-inscripcion.test.ts` y `tests/mailer-contenido.test.ts`.
- App: SMTP si hay `.env.local` (lo configura quien haga la demo); si no, `MailerConsola`.
- Si falla el envío, no se descuentan cupos.

## UI (sin tests automatizados)

- Cupos en vivo; si la cantidad supera lo disponible, el campo va en rojo.
- TyC por actividad antes de confirmar.

## TDD

Ciclo Red–Green–Refactor sobre el servicio. Fecha fija en tests: 20/05/2026 09:00 (`tests/helpers.ts`).
