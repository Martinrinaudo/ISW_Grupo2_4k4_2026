export type Actividad = "Tirolesa" | "Safari" | "Palestra" | "Jardinería";

export type Talle = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Participante {
  nombre: string;
  dni: string;
  edad: number;
  talle?: Talle;
}

export interface Turno {
  actividad: Actividad;
  /** ISO yyyy-mm-dd */
  fecha: string;
  /** HH:mm */
  hora: string;
}

export interface SolicitudInscripcion {
  turno: Turno;
  participantes: Participante[];
  terminosAceptados: boolean;
  emailVisitante: string;
}

export interface InscripcionConfirmada {
  turno: Turno;
  participantes: Participante[];
  idInscripcion: string;
}

export class ErrorInscripcion extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErrorInscripcion";
  }
}

export class TerminosNoAceptadosError extends ErrorInscripcion {
  constructor(message = "Debe aceptar los términos y condiciones") {
    super(message);
    this.name = "TerminosNoAceptadosError";
  }
}

export class HorarioNoDisponibleError extends ErrorInscripcion {
  constructor(message: string) {
    super(message);
    this.name = "HorarioNoDisponibleError";
  }
}

export class SinCupoError extends ErrorInscripcion {
  constructor(message = "No hay cupos suficientes para el horario seleccionado") {
    super(message);
    this.name = "SinCupoError";
  }
}

export class TalleRequeridoError extends ErrorInscripcion {
  constructor(message: string) {
    super(message);
    this.name = "TalleRequeridoError";
  }
}

export class EdadInvalidaError extends ErrorInscripcion {
  constructor(message: string) {
    super(message);
    this.name = "EdadInvalidaError";
  }
}

export class AnticipacionInvalidaError extends ErrorInscripcion {
  constructor(message = "La inscripción debe realizarse al menos 2 días antes del turno") {
    super(message);
    this.name = "AnticipacionInvalidaError";
  }
}
