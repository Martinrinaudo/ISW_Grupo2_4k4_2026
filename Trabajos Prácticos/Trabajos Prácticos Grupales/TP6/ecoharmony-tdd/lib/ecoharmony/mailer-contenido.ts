import type { InscripcionConfirmada } from "./types";

export function cuerpoCorreo(inscripcion: InscripcionConfirmada): string {
  const { turno, participantes, idInscripcion } = inscripcion;
  const lista = participantes
    .map(
      (p, i) =>
        `${i + 1}. ${p.nombre} — DNI ${p.dni}, edad ${p.edad}${
          p.talle ? `, talle ${p.talle}` : ""
        }`
    )
    .join("\n");

  return `EcoHarmony Park — Confirmación de inscripción

ID: ${idInscripcion}
Actividad: ${turno.actividad}
Fecha: ${turno.fecha}
Horario: ${turno.hora}

Participantes:
${lista}

Gracias por visitarnos.`;
}
