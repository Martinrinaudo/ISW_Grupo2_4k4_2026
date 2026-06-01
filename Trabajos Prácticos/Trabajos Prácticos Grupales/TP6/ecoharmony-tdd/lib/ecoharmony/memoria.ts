// Reloj, cupos en memoria y armado del servicio (app vs tests)

import { MailerConsola } from "./mailer-consola";
import { MailerSmtp, smtpConfigurado } from "./mailer-smtp";
import { InscripcionService } from "./inscripcion-service";
import type { Turno } from "./types";

export interface Reloj {
  ahora(): Date;
}

export class RelojFijo implements Reloj {
  constructor(private readonly instante: Date) {}

  ahora(): Date {
    return new Date(this.instante);
  }
}

export class RelojSistema implements Reloj {
  ahora(): Date {
    return new Date();
  }
}

export type { Mailer } from "./mailer-port";
export { MailerRegistro } from "./mailer-port";

import type { Mailer } from "./mailer-port";
import { MailerRegistro } from "./mailer-port";

export interface RepositorioCupos {
  cuposOcupados(turno: Turno): number;
  registrarInscripcion(turno: Turno, cantidad: number): void;
}

export class RepositorioCuposMemoria implements RepositorioCupos {
  private ocupados = new Map<string, number>();

  private key(turno: Turno): string {
    return `${turno.actividad}|${turno.fecha}|${turno.hora}`;
  }

  cuposOcupados(turno: Turno): number {
    return this.ocupados.get(this.key(turno)) ?? 0;
  }

  registrarInscripcion(turno: Turno, cantidad: number): void {
    const k = this.key(turno);
    this.ocupados.set(k, (this.ocupados.get(k) ?? 0) + cantidad);
  }
}

function crearMailerApp(): Mailer {
  return smtpConfigurado() ? new MailerSmtp() : new MailerConsola();
}

let servicioApp: InscripcionService | null = null;

export function getServicio(): InscripcionService {
  if (!servicioApp) {
    servicioApp = new InscripcionService(
      new RelojSistema(),
      new RepositorioCuposMemoria(),
      crearMailerApp()
    );
  }
  return servicioApp;
}

export function crearServicio(
  reloj?: Reloj,
  cupos?: RepositorioCupos,
  mailer?: Mailer
): InscripcionService {
  return new InscripcionService(
    reloj ?? new RelojFijo(new Date(2026, 4, 20, 9, 0)),
    cupos ?? new RepositorioCuposMemoria(),
    mailer ?? new MailerRegistro()
  );
}
