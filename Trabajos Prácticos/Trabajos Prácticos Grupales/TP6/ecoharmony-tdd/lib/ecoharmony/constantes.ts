// Reglas confirmadas por cátedra (mail Salva, jun/2026) — ver docs/decisiones-tp6-tdd.md

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

export const HORA_APERTURA_PARQUE = 8 * 60 + 30;
export const HORA_CIERRE_PARQUE = 19 * 60;
export const HORA_INICIO_ACTIVIDAD = 9 * 60;
export const HORA_FIN_ACTIVIDAD = 18 * 60;
export const HORA_ULTIMO_INICIO_TURNO = 17 * 60;
export const DURACION_TURNO_MIN = 60;

export const ANTICIPACION_MIN_MS = 24 * 60 * 60 * 1000;

export const SLOTS_HORA: string[] = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
})();

export const TYC_POR_ACTIVIDAD: Record<Actividad, string[]> = {
  Safari: [
    "El paseo es al aire libre: traer gorra, agua y calzado cómodo.",
    "Menores van con un adulto responsable en el vehículo.",
    "Respetar las indicaciones del guía durante todo el recorrido.",
    "La inscripción es hasta 24 hs antes del turno; sin cupo no hay lugar.",
    "El parque puede suspender el safari por clima o seguridad.",
  ],
  "Jardinería": [
    "Actividad con tierra y herramientas: ropa que se pueda manchar.",
    "No aplican restricciones de edad; los chicos van acompañados.",
    "Seguir las consignas del taller (riego, siembra, etc.).",
    "Inscripción hasta 24 hs antes del horario elegido.",
    "Si llueve fuerte, el taller puede reprogramarse.",
  ],
  Palestra: [
    "Edad mínima 12 años. Talle de vestimenta obligatorio (XS a XXL).",
    "Usar el calzado y la indumentaria que indique el monitor.",
    "Avisar si tenés alguna lesión antes de empezar.",
    "Cupos limitados; la reserva vale con TyC aceptados y mail de confirmación.",
    "Inscripción hasta 24 hs antes del turno.",
  ],
  Tirolesa: [
    "Edad mínima 8 años. Talle obligatorio para el arnés y casco.",
    "Peso y estado de salud deben estar dentro de lo que marca el operador.",
    "No llevar objetos sueltos en los bolsillos durante el descenso.",
    "Turnos cada hora de 9 a 17; a las 18 no hay salida.",
    "Inscripción hasta 24 hs antes; sin cupo no se confirma el lugar.",
  ],
};
