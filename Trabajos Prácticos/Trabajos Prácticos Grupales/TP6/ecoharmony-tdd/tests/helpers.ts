import { cuposDisponiblesLabel } from "@/lib/ecoharmony/reglas";
import { MailerRegistro } from "@/lib/ecoharmony/mailer-port";
import {
  crearServicio,
  RelojFijo,
  RepositorioCuposMemoria,
} from "@/lib/ecoharmony/memoria";
import type {
  Participante,
  SolicitudInscripcion,
  Turno,
} from "@/lib/ecoharmony/types";

/** 20/05/2026 09:00 — reloj fijo en tests */
export const AHORA_TEST = new Date(2026, 4, 20, 9, 0);

export function turnoValido(): Turno {
  return { actividad: "Safari", fecha: "2026-05-27", hora: "10:00" };
}

export function solicitudOk(
  overrides?: Partial<SolicitudInscripcion>
): SolicitudInscripcion {
  return {
    turno: turnoValido(),
    participantes: [{ nombre: "Ana López", dni: "30111222", edad: 25 }],
    terminosAceptados: true,
    emailVisitante: "ana@mail.com",
    ...overrides,
  };
}

export function setupTest() {
  const reloj = new RelojFijo(AHORA_TEST);
  const cupos = new RepositorioCuposMemoria();
  const mailer = new MailerRegistro();
  const servicio = crearServicio(reloj, cupos, mailer);
  return { servicio, cupos, mailer, reloj };
}

export { cuposDisponiblesLabel };
