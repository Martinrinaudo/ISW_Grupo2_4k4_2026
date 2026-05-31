// Validaciones de horario, cupos y participantes

import {
  ACTIVIDADES_CON_TALLE,
  DURACION_TURNO_MIN,
  EDAD_MINIMA,
  HORA_APERTURA_PARQUE,
  HORA_CIERRE_PARQUE,
  HORA_FIN_ACTIVIDAD,
  HORA_INICIO_ACTIVIDAD,
} from "./constantes";
import type { Actividad } from "./types";

export function minutosDesdeMedianoche(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

export function finTurnoMinutos(horaInicio: string): number {
  return minutosDesdeMedianoche(horaInicio) + DURACION_TURNO_MIN;
}

export function parseFecha(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Lunes y feriados 25/12 y 1/1 */
export function parqueCerrado(fechaIso: string): boolean {
  const fecha = parseFecha(fechaIso);
  if (fecha.getDay() === 1) return true;
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  if ((mes === 12 && dia === 25) || (mes === 1 && dia === 1)) return true;
  return false;
}

export function turnoDentroHorarioActividad(hora: string): boolean {
  const inicio = minutosDesdeMedianoche(hora);
  const fin = finTurnoMinutos(hora);
  return inicio >= HORA_INICIO_ACTIVIDAD && fin <= HORA_FIN_ACTIVIDAD;
}

export function turnoDentroHorarioParque(hora: string): boolean {
  const inicio = minutosDesdeMedianoche(hora);
  const fin = finTurnoMinutos(hora);
  return inicio >= HORA_APERTURA_PARQUE && fin <= HORA_CIERRE_PARQUE;
}

export function exigeTalle(actividad: Actividad): boolean {
  return ACTIVIDADES_CON_TALLE.includes(actividad);
}

export function edadMinima(actividad: Actividad): number | null {
  return EDAD_MINIMA[actividad];
}

export function cuposDisponiblesLabel(actividad: Actividad, n: number): string {
  return `QUEDAN ${n} CUPOS PARA ${actividad}`;
}

export function sumarDias(iso: string, dias: number): string {
  const d = parseFecha(iso);
  d.setDate(d.getDate() + dias);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
