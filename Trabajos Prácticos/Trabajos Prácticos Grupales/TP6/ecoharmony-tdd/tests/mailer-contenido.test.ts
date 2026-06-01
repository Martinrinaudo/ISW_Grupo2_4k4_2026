import { describe, expect, it } from "vitest";
import { asuntoCorreo, cuerpoCorreo } from "@/lib/ecoharmony/mailer-contenido";
import type { InscripcionConfirmada } from "@/lib/ecoharmony/types";

describe("cuerpo del mail de confirmación", () => {
  const inscripcion: InscripcionConfirmada = {
    idInscripcion: "abc-123",
    turno: { actividad: "Safari", fecha: "2026-05-27", hora: "10:00" },
    participantes: [
      { nombre: "Ana López", dni: "30111222", edad: 25 },
    ],
  };

  it("asunto incluye la actividad", () => {
    expect(asuntoCorreo("Palestra")).toBe("Inscripción confirmada — Palestra");
  });

  it("incluye actividad, fecha, horario e ID", () => {
    const texto = cuerpoCorreo(inscripcion);
    expect(texto).toContain("Safari");
    expect(texto).toContain("2026-05-27");
    expect(texto).toContain("10:00");
    expect(texto).toContain("abc-123");
    expect(texto).toContain("Ana López");
    expect(texto).toContain("30111222");
  });
});
