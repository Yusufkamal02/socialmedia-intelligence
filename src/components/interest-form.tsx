"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { callDays, callSlots, programs, roles } from "@/lib/content";

type Status = { state: "idle" | "sending" | "done" | "error"; message?: string };

const input = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 focus:border-ink focus:outline-none";
const steps = ["About you", "Your interests", "Pick a call time"];

export function InterestForm() {
  const params = useSearchParams();
  const initialRole = roles.find((r) => r.id === params.get("role"))?.name ?? roles[1].name;
  const initialProgram = programs.find((p) => p.id === params.get("program"))?.name;

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [data, setData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    role: initialRole,
    programs: initialProgram ? [initialProgram] : ([] as string[]),
    callDay: "Monday",
    callSlot: `${callSlots[1].png} / ${callSlots[1].wib}`,
    message: "",
  });

  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => setData((d) => ({ ...d, [key]: value }));

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else submit();
  }

  async function submit() {
    setStatus({ state: "sending" });
    const res = await fetch("/api/interest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);

    if (res?.ok) {
      setStatus({ state: "done" });
    } else {
      const body = await res?.json().catch(() => null);
      setStatus({ state: "error", message: body?.error ?? "Something went wrong. Please try again." });
    }
  }

  if (status.state === "done") {
    return (
      <div className="pop mt-10 rounded-2xl bg-leaf p-8 text-paper">
        <p className="font-display text-3xl font-extrabold">Tenkyu tru, {data.name.split(" ")[0]}!</p>
        <p className="mt-2 text-paper/80">
          We received your answers. Our team will email you to confirm a call on {data.callDay} at {data.callSlot.split(" / ")[0]} (PNG time).
        </p>
        <p className="mt-4 text-sm text-paper/70">Remember: we will never ask you to pay or to share passwords or bank details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={next} className="mt-10 rounded-2xl border border-line bg-paper p-6 md:p-8">
      <ol className="flex gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div className={`h-1.5 rounded-full transition-colors duration-300 ${i <= step ? "bg-red" : "bg-line"}`} />
            <p className={`mt-2 text-xs ${i === step ? "font-semibold" : "text-muted"}`}>
              {i + 1}. {s}
            </p>
          </li>
        ))}
      </ol>

      <div key={step} className="pop mt-8 space-y-6">
        {step === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold">
              Full name
              <input required value={data.name} onChange={(e) => set("name", e.target.value)} className={input} autoFocus />
            </label>
            <label className="block text-sm font-semibold">
              Email
              <input type="email" required value={data.email} onChange={(e) => set("email", e.target.value)} className={input} />
            </label>
            <label className="block text-sm font-semibold md:col-span-2">
              WhatsApp (optional)
              <input value={data.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+675 …" className={input} />
            </label>
          </div>
        )}

        {step === 1 && (
          <>
            <fieldset>
              <legend className="text-sm font-semibold">Which role interests you most?</legend>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                {roles.map((r) => (
                  <label key={r.id} className="flex cursor-pointer flex-col rounded-lg border border-line p-3 has-[:checked]:border-ink has-[:checked]:bg-paper-2">
                    <span className="flex items-center gap-2">
                      <input type="radio" name="role" checked={data.role === r.name} onChange={() => set("role", r.name)} className="accent-[var(--red)]" />
                      <span className="font-semibold">{r.name}</span>
                    </span>
                    <span className="mt-1 pl-6 text-xs text-muted">{r.time}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">Programs you&apos;d like to bring</legend>
              <div className="mt-2 space-y-2">
                {programs.map((p) => (
                  <label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line p-3 has-[:checked]:border-ink has-[:checked]:bg-paper-2">
                    <input
                      type="checkbox"
                      checked={data.programs.includes(p.name)}
                      onChange={(e) =>
                        set("programs", e.target.checked ? [...data.programs, p.name] : data.programs.filter((x) => x !== p.name))
                      }
                      className="accent-[var(--red)]"
                    />
                    {p.name}
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset>
              <legend className="text-sm font-semibold">Best day for a video call</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {callDays.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => set("callDay", d)}
                    className={`rounded-full px-4 py-2 text-sm ${data.callDay === d ? "bg-ink text-paper" : "border border-line hover:border-ink"}`}
                  >
                    {d.slice(0, 3)}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">Time</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                {callSlots.map((s) => {
                  const value = `${s.png} / ${s.wib}`;
                  return (
                    <button
                      key={s.png}
                      type="button"
                      onClick={() => set("callSlot", value)}
                      className={`rounded-xl p-3 text-left ${data.callSlot === value ? "bg-ink text-paper" : "border border-line hover:border-ink"}`}
                    >
                      <span className="block font-semibold">{s.png}</span>
                      <span className={`block text-xs ${data.callSlot === value ? "text-paper/70" : "text-muted"}`}>{s.wib}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label className="block text-sm font-semibold">
              Anything you&apos;d like to ask or add?
              <textarea rows={3} value={data.message} onChange={(e) => set("message", e.target.value)} className={input} />
            </label>
          </>
        )}
      </div>

      {status.state === "error" && <p className="mt-4 text-sm text-red">{status.message}</p>}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-line px-5 py-3 font-semibold">
            ← Back
          </button>
        ) : (
          <span className="text-xs text-muted">🔒 We only use this to contact you about the partnership.</span>
        )}
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded-full bg-red px-6 py-3 font-semibold text-paper hover:brightness-110 disabled:opacity-60"
        >
          {step < steps.length - 1 ? "Continue →" : status.state === "sending" ? "Sending…" : "Send my interest"}
        </button>
      </div>
    </form>
  );
}
