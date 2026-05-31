import { InscripcionForm } from "@/components/InscripcionForm";
import { smtpConfigurado } from "@/lib/ecoharmony/mailer-smtp";

/** Pantalla /inscripcion — avisa si el mail va a consola o SMTP */
export default function InscripcionPage() {
  const mailReal = smtpConfigurado();

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <header className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--eco-muted)]">
          EcoHarmony Park · Grupo 2
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--eco-primary-dark)]">
          Inscribirme a actividad
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Reservá tu lugar en Tirolesa, Safari, Palestra o Jardinería.
        </p>
      </header>

      {!mailReal && (
        <p className="mb-4 text-center text-sm text-amber-800">
          Mail no configurado — la confirmación se ve en la consola del servidor.
        </p>
      )}

      <div className="rounded-2xl bg-[var(--eco-card)] p-6 shadow-lg ring-1 ring-green-100">
        {mailReal && (
          <p className="mb-4 text-center text-xs text-[var(--eco-muted)]">
            Se envía confirmación por mail
          </p>
        )}
        <InscripcionForm />
      </div>
    </main>
  );
}
