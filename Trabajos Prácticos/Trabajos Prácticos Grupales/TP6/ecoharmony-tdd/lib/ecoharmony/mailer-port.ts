// Puerto de mail — en tests usamos MailerRegistro

import type { InscripcionConfirmada } from "./types";

export interface Mailer {
  enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void>;
}

/** Guarda envíos en memoria para assert en Vitest */
export class MailerRegistro implements Mailer {
  envios: Array<{ email: string; inscripcion: InscripcionConfirmada }> = [];

  async enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void> {
    this.envios.push({ email, inscripcion });
  }
}
