"use server";

import { getServicio } from "@/lib/ecoharmony/memoria";
import { smtpConfigurado } from "@/lib/ecoharmony/mailer-smtp";
import { ErrorInscripcion } from "@/lib/ecoharmony/types";
import type { SolicitudInscripcion } from "@/lib/ecoharmony/types";

export type ResultadoInscripcion =
  | { ok: true; idInscripcion: string; email: string; mailEnviado: boolean }
  | { ok: false; error: string };

export type InfoCupos = {
  etiqueta: string;
  cuposRestantes: number;
};

export async function obtenerInfoCupos(
  solicitud: SolicitudInscripcion
): Promise<InfoCupos> {
  const servicio = getServicio();
  const cuposRestantes = servicio.cuposRestantes(solicitud);
  return {
    etiqueta: servicio.etiquetaCupos(solicitud),
    cuposRestantes,
  };
}

export async function confirmarInscripcion(
  solicitud: SolicitudInscripcion
): Promise<ResultadoInscripcion> {
  try {
    const confirmada = await getServicio().inscribir(solicitud);
    return {
      ok: true,
      idInscripcion: confirmada.idInscripcion,
      email: solicitud.emailVisitante,
      mailEnviado: smtpConfigurado(),
    };
  } catch (e) {
    const msg =
      e instanceof ErrorInscripcion
        ? e.message
        : e instanceof Error
          ? e.message
          : "No se pudo completar la inscripción";
    return { ok: false, error: msg };
  }
}
