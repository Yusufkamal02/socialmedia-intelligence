"use client";

import Link from "next/link";
import { useState } from "react";
import { programs, quiz, roles, scoreQuiz, type RoleId } from "@/lib/content";

const roleWhy: Record<RoleId, string> = {
  ambassador: "You can start small, alongside work or study, by sharing programs with the people who already listen to you.",
  trainer: "You enjoy explaining things and have community trust, which is exactly what makes a great local trainer.",
  reseller: "You like building relationships with organisations, so you can bring programs to schools, NGOs and companies.",
};

export function RoleQuiz() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);

  const done = step >= quiz.length;

  function choose(i: number) {
    const next = [...picks.slice(0, step), i];
    setPicks(next);
    setStep(step + 1);
    if (next.length === quiz.length) {
      fetch("/api/quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ picks: next }),
        keepalive: true,
      }).catch(() => {});
    }
  }

  function reset() {
    setPicks([]);
    setStep(0);
  }

  const { role: roleId, program: programId } = scoreQuiz(picks);
  const role = roles.find((r) => r.id === roleId)!;
  const program = programs.find((p) => p.id === programId)!;

  return (
    <div className="rounded-3xl bg-ink p-6 text-paper md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold">Find your role · 30 seconds</p>
        <p className="text-sm text-paper/60">{done ? "Done" : `${step + 1} / ${quiz.length}`}</p>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-paper/15">
        <div className="h-1.5 rounded-full bg-gold transition-all duration-500" style={{ width: `${(Math.min(step, quiz.length) / quiz.length) * 100}%` }} />
      </div>

      {!done ? (
        <div key={step} className="pop mt-8">
          <h3 className="font-display text-2xl font-bold md:text-3xl">{quiz[step].question}</h3>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {quiz[step].answers.map((a, i) => (
              <button
                key={a.label}
                type="button"
                onClick={() => choose(i)}
                className="rounded-2xl border border-paper/20 p-4 text-left transition hover:-translate-y-0.5 hover:border-gold hover:bg-paper/5"
              >
                {a.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="mt-5 text-sm text-paper/60 underline hover:text-paper">
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="pop mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-paper/70">Your best fit</p>
            <h3 className="font-display text-4xl font-extrabold text-gold md:text-5xl">{role.name}</h3>
            <p className="mt-3 max-w-xl text-paper/85">{roleWhy[roleId]}</p>
            <p className="mt-4 text-paper/70">
              Suggested first program: <span className="font-semibold text-paper">{program.name}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href={`/partnership?role=${roleId}#calculator`} className="rounded-full bg-gold px-6 py-3 text-center font-semibold text-ink hover:brightness-110">
              See earnings for this role →
            </Link>
            <Link href={`/join?role=${roleId}&program=${programId}`} className="rounded-full border border-paper/40 px-6 py-3 text-center font-semibold hover:bg-paper/10">
              I&apos;m interested
            </Link>
            <button type="button" onClick={reset} className="text-sm text-paper/60 underline hover:text-paper">
              Retake quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
