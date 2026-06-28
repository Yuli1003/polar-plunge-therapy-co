import { useState } from "react";

/**
 * Health questionnaire / screening request. client:idle — below-fold multi-field
 * form can defer hydration until the main thread is free (per spec hydration plan).
 * Posts to /api/screening → ScreeningIntake CMS collection via @wix/data.
 */

const GOALS = [
  "Inflammation",
  "Mood / low mood",
  "Sleep",
  "Athletic recovery",
  "General resilience",
  "Other",
];

const YESNO = ["No", "Yes"];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="metric-label mb-2 block">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-text-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-2.5 font-display text-lg text-ink outline-none transition-colors focus:border-ink placeholder:text-ink-faint";

export default function ScreeningIntakeForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-ink pt-7" role="status" aria-live="polite">
        <p className="eyebrow">Screening request received</p>
        <p className="mt-5 font-display text-3xl leading-[1.2]">
          A clinician reviews every questionnaire before we book anything.
        </p>
        <p className="mt-4 max-w-prose text-ink-soft">
          Expect a call within two business days, and a clear yes or no. If cold
          exposure is not safe for you, we will tell you plainly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Full name">
          <input name="fullName" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Email">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Age">
          <input name="age" type="number" min={18} max={99} className={inputClass} />
        </Field>
        <Field label="Primary goal">
          <select name="primaryGoal" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Cardiac history"
        hint="Any diagnosed heart conditions, arrhythmias, hypertension, or cardiac events."
      >
        <textarea name="cardiacHistory" rows={3} className={inputClass} />
      </Field>

      <Field label="Current medications" hint="Include dosages where you can.">
        <textarea name="currentMedications" rows={2} className={inputClass} />
      </Field>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Raynaud's, cold urticaria, or pregnancy?">
          <select
            name="prRaynaudsOrPregnancy"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            {YESNO.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Cleared by a physician?">
          <select name="clearedByPhysician" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {[...YESNO, "Not yet"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {status === "error" && (
        <p className="border-l-2 border-[#a3402f] pl-3 text-sm text-[#a3402f]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="cta disabled:opacity-50"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting…" : "Submit screening request"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
