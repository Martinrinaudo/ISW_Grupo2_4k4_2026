import { describe, expect, it } from "vitest";
import { asuntoCorreo, cuerpoCorreo } from "@/lib/ecoharmony/mailer-contenido";
import { MailerFalla } from "@/lib/ecoharmony/mailer-port";
import {
  crearServicio,
  RelojFijo,
  RepositorioCuposMemoria,
} from "@/lib/ecoharmony/memoria";
import { SinCupoError } from "@/lib/ecoharmony/types";
import { AHORA_TEST, setupTest, solicitudOk } from "./helpers";

describe("mail en la inscripción", () => {
  it("envía a el email del visitante con asunto y cuerpo correctos", async () => {
    const { servicio, mailer } = setupTest();
    const sol = solicitudOk({ emailVisitante: "visitante@test.com" });
    const confirmada = await servicio.inscribir(sol);

    expect(mailer.envios).toHaveLength(1);
    const envio = mailer.envios[0];
    expect(envio.email).toBe("visitante@test.com");
    expect(envio.asunto).toBe(asuntoCorreo("Safari"));
    expect(envio.cuerpo).toBe(cuerpoCorreo(confirmada));
    expect(envio.cuerpo).toContain(confirmada.idInscripcion);
  });

  it("el cuerpo lista todos los participantes con talle si aplica", async () => {
    const { servicio, mailer } = setupTest();
    await servicio.inscribir(
      solicitudOk({
        turno: { actividad: "Tirolesa", fecha: "2026-05-27", hora: "11:00" },
        participantes: [
          { nombre: "A", dni: "1", edad: 10, talle: "S" },
          { nombre: "B", dni: "2", edad: 12, talle: "M" },
        ],
      })
    );
    const cuerpo = mailer.envios[0].cuerpo;
    expect(cuerpo).toContain("talle S");
    expect(cuerpo).toContain("talle M");
    expect(cuerpo).toContain("Tirolesa");
  });

  it("si la inscripción falla, no se envía mail", async () => {
    const { servicio, mailer, cupos } = setupTest();
    const sol = solicitudOk();
    cupos.registrarInscripcion(sol.turno, 8);
    sol.participantes = [{ nombre: "X", dni: "9", edad: 20 }];
    await expect(servicio.inscribir(sol)).rejects.toThrow(SinCupoError);
    expect(mailer.envios).toHaveLength(0);
  });

  it("si el mail falla, no consume cupos", async () => {
    const cupos = new RepositorioCuposMemoria();
    const servicio = crearServicio(
      new RelojFijo(AHORA_TEST),
      cupos,
      new MailerFalla()
    );
    const sol = solicitudOk();
    await expect(servicio.inscribir(sol)).rejects.toThrow(
      "No se pudo enviar el correo"
    );
    expect(cupos.cuposOcupados(sol.turno)).toBe(0);
  });
});
