"use client";

import { TYC_CLAUSULAS } from "@/lib/ecoharmony/constantes";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
}

/** Modal con las cláusulas del TyC (7 del material) */
export function TyCModal({ abierto, onCerrar }: Props) {
  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tyc-titulo"
    >
      <div className="max-h-[85vh] w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="border-b border-green-100 bg-[var(--eco-primary)] px-5 py-4 text-white">
          <h2 id="tyc-titulo" className="text-lg font-semibold">
            Términos y condiciones
          </h2>
        </div>
        <ol className="max-h-64 list-decimal space-y-2 overflow-y-auto px-6 py-4 text-sm leading-relaxed">
          {TYC_CLAUSULAS.map((clausula, i) => (
            <li key={i} className="ml-4 pl-1">
              {clausula}
            </li>
          ))}
        </ol>
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            onClick={onCerrar}
            className="w-full rounded-lg bg-[var(--eco-primary)] py-2.5 text-sm font-medium text-white transition hover:bg-[var(--eco-primary-dark)]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
