"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  confirmarInscripcion,
  obtenerEtiquetaCupos,
} from "@/app/inscripcion/actions";
import { TyCModal } from "@/components/TyCModal";
import {
  ACTIVIDADES,
  DIAS_ANTICIPACION_MIN,
  SLOTS_HORA,
  TALLES,
} from "@/lib/ecoharmony/constantes";
import { FECHA_HOY_APP } from "@/lib/ecoharmony/fecha-app";
import { exigeTalle, sumarDias } from "@/lib/ecoharmony/reglas";
import type { Actividad, Participante, Talle } from "@/lib/ecoharmony/types";

const inputClass =
  "w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--eco-primary)] focus:ring-2 focus:ring-green-200";

const fechaMin = sumarDias(FECHA_HOY_APP, DIAS_ANTICIPACION_MIN);

function participantesVacios(n: number): Participante[] {
  return Array.from({ length: n }, () => ({
    nombre: "",
    dni: "",
    edad: 18,
  }));
}

/** Formulario inscripción */
export function InscripcionForm() {
  const [actividad, setActividad] = useState<Actividad>("Safari");
  const [fecha, setFecha] = useState("2026-05-27");
  const [hora, setHora] = useState("10:00");
  const [cantidad, setCantidad] = useState(1);
  const [participantes, setParticipantes] = useState<Participante[]>(
    participantesVacios(1)
  );
  const [email, setEmail] = useState("");
  const [tyc, setTyc] = useState(false);
  const [modalTyC, setModalTyC] = useState(false);
  const [etiquetaCupos, setEtiquetaCupos] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<string | null>(null);

  const solicitud = useMemo(
    () => ({
      turno: { actividad, fecha, hora },
      participantes,
      terminosAceptados: tyc,
      emailVisitante: email,
    }),
    [actividad, fecha, hora, participantes, tyc, email]
  );

  const actualizarEtiqueta = useCallback(async () => {
    try {
      const label = await obtenerEtiquetaCupos(solicitud);
      setEtiquetaCupos(label);
    } catch {
      setEtiquetaCupos("");
    }
  }, [solicitud]);

  useEffect(() => {
    actualizarEtiqueta();
  }, [actualizarEtiqueta]);

  useEffect(() => {
    setParticipantes((prev) => {
      if (prev.length === cantidad) return prev;
      if (prev.length < cantidad) {
        return [...prev, ...participantesVacios(cantidad - prev.length)];
      }
      return prev.slice(0, cantidad);
    });
  }, [cantidad]);

  const requiereTalle = exigeTalle(actividad);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setExito(null);
    const resultado = await confirmarInscripcion(solicitud);
    if (resultado.ok) {
      setExito(
        resultado.mailEnviado
          ? `Inscripción confirmada. Revisá el mail en ${resultado.email}.`
          : "Inscripción confirmada."
      );
      actualizarEtiqueta();
    } else {
      setError(resultado.error);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-[var(--eco-muted)]">
              Actividad
            </span>
            <select
              className={inputClass}
              value={actividad}
              onChange={(e) => setActividad(e.target.value as Actividad)}
            >
              {ACTIVIDADES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-[var(--eco-muted)]">
              Fecha del turno
            </span>
            <input
              type="date"
              className={inputClass}
              min={fechaMin}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-[var(--eco-muted)]">
              Horario
            </span>
            <select
              className={inputClass}
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            >
              {SLOTS_HORA.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-[var(--eco-muted)]">
              Cantidad de personas
            </span>
            <input
              type="number"
              min={1}
              max={20}
              className={inputClass}
              value={cantidad}
              onChange={(e) =>
                setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              required
            />
            {etiquetaCupos && (
              <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-[var(--eco-primary-dark)]">
                {etiquetaCupos}
              </p>
            )}
          </label>
        </div>

        <fieldset className="rounded-xl border border-green-100 bg-green-50/50 p-4">
          <legend className="px-1 text-sm font-semibold text-[var(--eco-primary-dark)]">
            Datos de participantes
          </legend>
          <div className="space-y-4">
            {participantes.map((p, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-lg bg-white p-3 shadow-sm sm:grid-cols-2"
              >
                <p className="text-xs font-medium text-gray-500 sm:col-span-2">
                  Persona {i + 1}
                </p>
                <input
                  placeholder="Nombre"
                  className={inputClass}
                  value={p.nombre}
                  onChange={(e) => {
                    const next = [...participantes];
                    next[i] = { ...next[i], nombre: e.target.value };
                    setParticipantes(next);
                  }}
                  required
                />
                <input
                  placeholder="DNI"
                  className={inputClass}
                  value={p.dni}
                  onChange={(e) => {
                    const next = [...participantes];
                    next[i] = { ...next[i], dni: e.target.value };
                    setParticipantes(next);
                  }}
                  required
                />
                <input
                  type="number"
                  min={1}
                  placeholder="Edad"
                  className={inputClass}
                  value={p.edad}
                  onChange={(e) => {
                    const next = [...participantes];
                    next[i] = {
                      ...next[i],
                      edad: parseInt(e.target.value, 10) || 0,
                    };
                    setParticipantes(next);
                  }}
                  required
                />
                {requiereTalle ? (
                  <select
                    className={inputClass}
                    value={p.talle ?? ""}
                    onChange={(e) => {
                      const next = [...participantes];
                      next[i] = {
                        ...next[i],
                        talle: e.target.value as Talle,
                      };
                      setParticipantes(next);
                    }}
                    required
                  >
                    <option value="">Talle</option>
                    {TALLES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="flex items-center text-xs text-gray-400">
                    Sin talle requerido
                  </span>
                )}
              </div>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--eco-muted)]">
            Email del visitante
          </span>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@mail.com"
            required
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModalTyC(true)}
            className="rounded-lg border border-[var(--eco-primary)] px-4 py-2 text-sm font-medium text-[var(--eco-primary)] transition hover:bg-green-50"
          >
            Ver términos y condiciones
          </button>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={tyc}
              onChange={(e) => setTyc(e.target.checked)}
              className="h-4 w-4 rounded border-green-300 text-[var(--eco-primary)]"
            />
            Acepto los términos y condiciones
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-[var(--eco-error-bg)] px-4 py-3 text-sm text-[var(--eco-error)]"
          >
            {error}
          </p>
        )}
        {exito && (
          <p
            role="status"
            className="rounded-lg bg-[var(--eco-success-bg)] px-4 py-3 text-sm text-[var(--eco-primary-dark)]"
          >
            {exito}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--eco-primary)] py-3 text-base font-semibold text-white shadow-md transition hover:bg-[var(--eco-primary-dark)]"
        >
          Confirmar inscripción
        </button>
      </form>

      <TyCModal abierto={modalTyC} onCerrar={() => setModalTyC(false)} />
    </>
  );
}
