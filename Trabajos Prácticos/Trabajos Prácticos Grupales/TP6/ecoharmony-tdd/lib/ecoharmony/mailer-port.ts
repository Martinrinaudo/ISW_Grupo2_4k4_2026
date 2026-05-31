import type { InscripcionConfirmada } from "./types";

export interface Mailer {
  enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void>;
}

export class MailerRegistro implements Mailer {
  envios: Array<{ email: string; inscripcion: InscripcionConfirmada }> = [];

  async enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void> {
    this.envios.push({ email, inscripcion });
  }
}
