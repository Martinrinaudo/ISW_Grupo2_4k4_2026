// Puerto de mail — en tests usamos MailerRegistro (mismo cuerpo que SMTP)

import { asuntoCorreo, cuerpoCorreo } from "./mailer-contenido";
import type { InscripcionConfirmada } from "./types";

export interface Mailer {
  enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void>;
}

export type EnvioRegistrado = {
  email: string;
  inscripcion: InscripcionConfirmada;
  asunto: string;
  cuerpo: string;
};

/** Mock: registra destino, asunto y cuerpo como en producción */
export class MailerRegistro implements Mailer {
  envios: EnvioRegistrado[] = [];

  async enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void> {
    this.envios.push({
      email,
      inscripcion,
      asunto: asuntoCorreo(inscripcion.turno.actividad),
      cuerpo: cuerpoCorreo(inscripcion),
    });
  }
}

/** Para tests: simula fallo de SMTP */
export class MailerFalla implements Mailer {
  async enviarConfirmacion(): Promise<void> {
    throw new Error("No se pudo enviar el correo");
  }
}
