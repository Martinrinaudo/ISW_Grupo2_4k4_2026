// Caso de uso: validar solicitud, enviar mail y registrar cupos

import { CUPO_POR_ACTIVIDAD, DIAS_ANTICIPACION_MIN } from "./constantes";
import type { Mailer } from "./mailer-port";
import type { Reloj, RepositorioCupos } from "./memoria";
import {
  cuposDisponiblesLabel,
  edadMinima,
  exigeTalle,
  parqueCerrado,
  sumarDias,
  turnoDentroHorarioActividad,
  turnoDentroHorarioParque,
} from "./reglas";
import {
  AnticipacionInvalidaError,
  EdadInvalidaError,
  ErrorInscripcion,
  HorarioNoDisponibleError,
  type InscripcionConfirmada,
  SinCupoError,
  type SolicitudInscripcion,
  TalleRequeridoError,
  TerminosNoAceptadosError,
} from "./types";

export class InscripcionService {
  constructor(
    private readonly reloj: Reloj,
    private readonly cupos: RepositorioCupos,
    private readonly mailer: Mailer
  ) {}

  cuposRestantes(solicitud: SolicitudInscripcion): number {
    const maximo = CUPO_POR_ACTIVIDAD[solicitud.turno.actividad];
    const ocupados = this.cupos.cuposOcupados(solicitud.turno);
    return Math.max(0, maximo - ocupados);
  }

  etiquetaCupos(solicitud: SolicitudInscripcion): string {
    return cuposDisponiblesLabel(
      solicitud.turno.actividad,
      this.cuposRestantes(solicitud)
    );
  }

  async inscribir(
    solicitud: SolicitudInscripcion
  ): Promise<InscripcionConfirmada> {
    this.validar(solicitud);
    const confirmada: InscripcionConfirmada = {
      turno: solicitud.turno,
      participantes: [...solicitud.participantes],
      idInscripcion: crypto.randomUUID(),
    };
    // primero el mail; si falla no consumimos cupo
    await this.mailer.enviarConfirmacion(
      solicitud.emailVisitante,
      confirmada
    );
    this.cupos.registrarInscripcion(
      solicitud.turno,
      solicitud.participantes.length
    );
    return confirmada;
  }

  private validar(solicitud: SolicitudInscripcion): void {
    if (!solicitud.terminosAceptados) {
      throw new TerminosNoAceptadosError();
    }
    const { turno } = solicitud;
    if (parqueCerrado(turno.fecha)) {
      throw new HorarioNoDisponibleError(
        "El parque está cerrado en la fecha seleccionada"
      );
    }
    if (!turnoDentroHorarioParque(turno.hora)) {
      throw new HorarioNoDisponibleError(
        "Horario fuera del horario de apertura del parque"
      );
    }
    if (!turnoDentroHorarioActividad(turno.hora)) {
      throw new HorarioNoDisponibleError(
        "La actividad no está disponible en el horario seleccionado"
      );
    }
    const minFecha = sumarDias(this.reloj.hoy(), DIAS_ANTICIPACION_MIN);
    if (turno.fecha < minFecha) {
      throw new AnticipacionInvalidaError();
    }
    if (solicitud.participantes.length > this.cuposRestantes(solicitud)) {
      throw new SinCupoError();
    }
    if (solicitud.participantes.length === 0) {
      throw new ErrorInscripcion("Debe indicar al menos un participante");
    }
    const minEdad = edadMinima(turno.actividad);
    for (const p of solicitud.participantes) {
      if (minEdad !== null && p.edad < minEdad) {
        throw new EdadInvalidaError(
          `Edad mínima para ${turno.actividad}: ${minEdad} años`
        );
      }
      if (exigeTalle(turno.actividad) && !p.talle) {
        throw new TalleRequeridoError(
          `La actividad ${turno.actividad} requiere talle de vestimenta`
        );
      }
    }
  }
}
