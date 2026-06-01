// Mail real con nodemailer si hay .env.local

import nodemailer from "nodemailer";
import { cuerpoCorreo } from "./mailer-contenido";
import type { Mailer } from "./mailer-port";
import type { InscripcionConfirmada } from "./types";

function configSmtp() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return null;
  }
  const port = Number(process.env.SMTP_PORT ?? "587");
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  };
}

export class MailerSmtp implements Mailer {
  async enviarConfirmacion(
    email: string,
    inscripcion: InscripcionConfirmada
  ): Promise<void> {
    const smtp = configSmtp();
    if (!smtp) {
      throw new Error("MailerSmtp usado sin variables SMTP configuradas.");
    }

    const from =
      process.env.SMTP_FROM ?? "EcoHarmony Park <noreply@ecoharmony.local>";

    const transporter = nodemailer.createTransport(smtp);
    await transporter.sendMail({
      from,
      to: email,
      subject: `Inscripción confirmada — ${inscripcion.turno.actividad}`,
      text: cuerpoCorreo(inscripcion),
    });
  }
}

export function smtpConfigurado(): boolean {
  return configSmtp() !== null;
}
