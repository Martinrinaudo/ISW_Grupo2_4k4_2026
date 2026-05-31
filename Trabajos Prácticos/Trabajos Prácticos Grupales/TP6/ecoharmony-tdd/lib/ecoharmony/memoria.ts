import { FECHA_HOY_APP } from "./fecha-app";
import { InscripcionService } from "./inscripcion-service";
import type { Turno } from "./types";

export interface Reloj {
  hoy(): string;
}

export class RelojFijo implements Reloj {
  constructor(private readonly fecha: string) {}

  hoy(): string {
    return this.fecha;
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

export function crearServicio(
  reloj?: Reloj,
  cupos?: RepositorioCupos,
  mailer?: Mailer
): InscripcionService {
  return new InscripcionService(
    reloj ?? new RelojFijo(FECHA_HOY_APP),
    cupos ?? new RepositorioCuposMemoria(),
    mailer ?? new MailerRegistro()
  );
}
