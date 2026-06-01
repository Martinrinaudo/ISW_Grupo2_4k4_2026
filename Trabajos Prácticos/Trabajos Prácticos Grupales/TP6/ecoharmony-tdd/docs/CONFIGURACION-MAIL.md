# Mail de confirmación

## Sin SMTP (por defecto)

No hace falta configurar nada. Al confirmar una inscripción:

- La pantalla avisa que el mail no está configurado.
- El cuerpo del mensaje se imprime en la **consola** donde corre `npm run dev`.

La inscripción **no se cancela** por falta de mail.

## Con SMTP (opcional)

1. Copiá `.env.example` a `.env.local` en la raíz del proyecto.
2. Completá usuario y contraseña (en Gmail suele ser “contraseña de aplicación”).
3. Reiniciá `npm run dev`.

Variables:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `SMTP_FROM` — lo que ve el destinatario

**No subas** `.env.local` a GitHub (ya está en `.gitignore`).

## Tests

Los tests no usan SMTP; solo revisan que se arma bien `cuerpoCorreo` y que el mock recibe el envío.
