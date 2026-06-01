# Mail de confirmación

## Quién configura qué

| Qué | Quién |
|-----|--------|
| **Tests** (`npm test`) | Nadie configura nada. Usan mock y revisan destino, asunto y cuerpo del mail. |
| **SMTP real** (demo / entrega con mail que llega) | **Uno del grupo** arma `.env.local` en su máquina (o una cuenta compartida). No va al repo. |

No hace falta que todos tengan Gmail: alcanza con que quien muestre la app tenga el `.env.local`.

## SMTP real (para que llegue el mail)

1. Copiar `.env.example` → `.env.local` en la raíz del proyecto.
2. Cuenta con SMTP (Gmail + contraseña de aplicación es lo más común).
3. Completar `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
4. Reiniciar `npm run dev`.

**No subir** `.env.local` a GitHub.

### Gmail rápido

- Cuenta Google con verificación en 2 pasos.
- Contraseña de aplicación (16 caracteres) → va en `SMTP_PASS`.
- `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`.

## Sin `.env.local`

La inscripción funciona igual; el texto del mail sale en la **consola** del `npm run dev` y hay aviso en pantalla. Sirve para desarrollar sin cuenta.

## Tests (lo que pide la cátedra)

Salva dijo: en unitarios **mockear** el envío pero **testear el mensaje**. Por eso:

- `tests/mailer-contenido.test.ts` — contenido del cuerpo.
- `tests/mail-inscripcion.test.ts` — destino, asunto, cuerpo al inscribir; sin mail si falla; sin cupos si falla el envío.

No se usa SMTP en CI ni en `npm test`.
