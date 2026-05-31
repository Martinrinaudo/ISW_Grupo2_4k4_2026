import { describe, expect, it } from "vitest";
import { parqueCerrado, turnoDentroHorarioActividad } from "@/lib/ecoharmony/reglas";
import {
  AnticipacionInvalidaError,
  EdadInvalidaError,
  HorarioNoDisponibleError,
  SinCupoError,
  TalleRequeridoError,
  TerminosNoAceptadosError,
} from "@/lib/ecoharmony/types";
import {
  cuposDisponiblesLabel,
  setupTest,
  solicitudOk,
  turnoValido,
} from "./helpers";

describe("Inscripción a actividad", () => {
  // --- 6 pruebas de usuario del enunciado ---

  it("prueba 1 pasa: inscripción exitosa envía mail", async () => {
    const { servicio, mailer } = setupTest();
    const resultado = await servicio.inscribir(solicitudOk());
    expect(resultado.participantes[0].nombre).toBe("Ana López");
    expect(mailer.envios).toHaveLength(1);
    expect(mailer.envios[0].email).toBe("ana@mail.com");
  });

  it("prueba 2 falla: sin cupo para el horario", async () => {
    const { servicio, cupos } = setupTest();
    const sol = solicitudOk();
    cupos.registrarInscripcion(sol.turno, 8);
    sol.participantes = [{ nombre: "B", dni: "2", edad: 20 }];
    await expect(servicio.inscribir(sol)).rejects.toThrow(SinCupoError);
  });

  it("prueba 3 pasa: Safari sin talle", async () => {
    const { servicio, mailer } = setupTest();
    await servicio.inscribir(
      solicitudOk({
        turno: turnoValido(),
        participantes: [{ nombre: "Carlos", dni: "40111222", edad: 30 }],
        emailVisitante: "c@mail.com",
      })
    );
    expect(mailer.envios).toHaveLength(1);
  });

  it("prueba 4 falla: lunes parque cerrado", async () => {
    const { servicio } = setupTest();
    const fecha = "2026-05-25";
    expect(parqueCerrado(fecha)).toBe(true);
    await expect(
      servicio.inscribir(
        solicitudOk({
          turno: { actividad: "Safari", fecha, hora: "10:00" },
        })
      )
    ).rejects.toThrow(HorarioNoDisponibleError);
  });

  it("prueba 4 falla: actividad fuera de horario 09:00–18:00", async () => {
    const { servicio } = setupTest();
    const hora = "18:30";
    expect(turnoDentroHorarioActividad(hora)).toBe(false);
    await expect(
      servicio.inscribir(
        solicitudOk({
          turno: { actividad: "Safari", fecha: "2026-05-27", hora },
        })
      )
    ).rejects.toThrow(HorarioNoDisponibleError);
  });

  it("prueba 5 falla: sin términos y condiciones", async () => {
    const { servicio } = setupTest();
    await expect(
      servicio.inscribir(solicitudOk({ terminosAceptados: false }))
    ).rejects.toThrow(TerminosNoAceptadosError);
  });

  it("prueba 6 falla: Palestra sin talle", async () => {
    const { servicio } = setupTest();
    await expect(
      servicio.inscribir(
        solicitudOk({
          turno: { actividad: "Palestra", fecha: "2026-05-27", hora: "11:00" },
          participantes: [{ nombre: "Juana", dni: "50111222", edad: 15 }],
        })
      )
    ).rejects.toThrow(TalleRequeridoError);
  });

  it("prueba 6 pasa: Palestra con talle", async () => {
    const { servicio } = setupTest();
    await servicio.inscribir(
      solicitudOk({
        turno: { actividad: "Palestra", fecha: "2026-05-27", hora: "11:00" },
        participantes: [
          { nombre: "Juana", dni: "50111222", edad: 15, talle: "M" },
        ],
      })
    );
  });

  // --- reglas asumidas (ver decisiones-tp6-tdd.md) ---

  it("regla: edad mínima Tirolesa", async () => {
    const { servicio } = setupTest();
    await expect(
      servicio.inscribir(
        solicitudOk({
          turno: { actividad: "Tirolesa", fecha: "2026-05-27", hora: "10:00" },
          participantes: [
            { nombre: "Niño", dni: "1", edad: 7, talle: "S" },
          ],
        })
      )
    ).rejects.toThrow(EdadInvalidaError);
  });

  it("regla: anticipación menos de 2 días", async () => {
    const { servicio } = setupTest();
    await expect(
      servicio.inscribir(
        solicitudOk({
          turno: { actividad: "Safari", fecha: "2026-05-21", hora: "10:00" },
        })
      )
    ).rejects.toThrow(AnticipacionInvalidaError);
  });

  it("regla: etiqueta cupos disponibles", () => {
    const { servicio } = setupTest();
    expect(servicio.etiquetaCupos(solicitudOk())).toBe(
      cuposDisponiblesLabel("Safari", 8)
    );
  });

  it("regla: cantidad mayor a cupos restantes", async () => {
    const { servicio, cupos } = setupTest();
    const sol = solicitudOk();
    cupos.registrarInscripcion(sol.turno, 7);
    sol.participantes = [
      { nombre: "A", dni: "1", edad: 20 },
      { nombre: "B", dni: "2", edad: 21 },
    ];
    await expect(servicio.inscribir(sol)).rejects.toThrow(SinCupoError);
  });

  it("regla: feriado 25 diciembre cerrado", async () => {
    const { servicio } = setupTest();
    await expect(
      servicio.inscribir(
        solicitudOk({
          turno: {
            actividad: "Jardinería",
            fecha: "2026-12-25",
            hora: "10:00",
          },
        })
      )
    ).rejects.toThrow(HorarioNoDisponibleError);
  });
});
