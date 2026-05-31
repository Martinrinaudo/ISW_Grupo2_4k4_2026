// Cupos, horarios y TyC — detalle en docs/decisiones-tp6-tdd.md

import type { Actividad, Talle } from "./types";

export const ACTIVIDADES: Actividad[] = [
  "Tirolesa",
  "Safari",
  "Palestra",
  "Jardinería",
];

export const TALLES: Talle[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const CUPO_POR_ACTIVIDAD: Record<Actividad, number> = {
  Safari: 8,
  Palestra: 12,
  "Jardinería": 12,
  Tirolesa: 10,
};

export const EDAD_MINIMA: Record<Actividad, number | null> = {
  Safari: null,
  "Jardinería": null,
  Palestra: 12,
  Tirolesa: 8,
};

export const ACTIVIDADES_CON_TALLE: Actividad[] = ["Palestra", "Tirolesa"];

export const HORA_APERTURA_PARQUE = 9 * 60;
export const HORA_CIERRE_PARQUE = 19 * 60;
export const HORA_INICIO_ACTIVIDAD = 9 * 60;
export const HORA_FIN_ACTIVIDAD = 18 * 60;
export const DURACION_TURNO_MIN = 30;

export const DIAS_ANTICIPACION_MIN = 2;

export const SLOTS_HORA: string[] = (() => {
  const slots: string[] = [];
  for (let m = HORA_INICIO_ACTIVIDAD; m <= 17 * 60 + 30; m += 30) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return slots;
})();

export const TYC_CLAUSULAS: string[] = [
  "Responsabilidad personal: el participante asume responsabilidad por su estado físico y salud.",
  "Cumplimiento de normas: seguir indicaciones del personal y reglamento de seguridad.",
  "Equipamiento: en Tirolesa y Palestra, uso obligatorio de equipamiento e indumentaria provista por el parque.",
  "Edad mínima: cada actividad tiene edad mínima; edad incorrecta invalida la inscripción.",
  "Cupos y horarios: sujeto a disponibilidad; inscripción hasta 2 días antes de la fecha elegida.",
  "Cancelaciones: el parque puede cancelar o reprogramar por clima o seguridad.",
  "Aceptación: participar implica aceptación total de estos términos.",
];
