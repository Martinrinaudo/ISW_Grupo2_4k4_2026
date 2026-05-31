// Armado de solicitudes y servicio de test (reloj fijo + mail mock)

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

import { FECHA_HOY_APP } from "@/lib/ecoharmony/fecha-app";

export const HOY_TEST = FECHA_HOY_APP;

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
  const reloj = new RelojFijo(HOY_TEST);
  const cupos = new RepositorioCuposMemoria();
  const mailer = new MailerRegistro();
  const servicio = crearServicio(reloj, cupos, mailer);
  return { servicio, cupos, mailer, reloj };
}

export { cuposDisponiblesLabel };
