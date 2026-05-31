import { cuerpoCorreo } from "./mailer-contenido";
import type { Mailer } from "./mailer-port";
import type { InscripcionConfirmada } from "./types";

export class MailerConsola implements Mailer {
  async enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void> {
    console.log(`[EcoHarmony] Confirmación para ${email}:`);
    console.log(cuerpoCorreo(inscripcion));
  }
}
