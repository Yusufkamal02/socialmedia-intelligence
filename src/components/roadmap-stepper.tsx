"use client";

import { useState } from "react";
import { roadmap } from "@/lib/content";

const colors = ["bg-red", "bg-gold", "bg-leaf"];

export function RoadmapStepper() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const m = roadmap[active];

  function toggle(step: string) {
    const next = new Set(checked);
    if (next.has(step)) next.delete(step);
    else next.add(step);
    setChecked(next);
  }

  return (
    <div className="mt-10">
      <div className="relative grid grid-cols-3 gap-2">
        <div className="absolute top-5 right-[16%] left-[16%] h-1 rounded-full bg-line" />
        <div
          className="absolute top-5 left-[16%] h-1 rounded-full bg-ink transition-all duration-500"
          style={{ width: `${(active / (roadmap.length - 1)) * 68}%` }}
        />
        {roadmap.map((r, i) => (
          <button key={r.month} type="button" onClick={() => setActive(i)} className="relative flex flex-col items-center gap-2 text-center">
            <span
              className={`grid h-11 w-11 place-items-center rounded-full border-4 border-paper font-display font-bold text-paper transition ${
                i <= active ? colors[i % colors.length] : "bg-line text-muted"
              } ${i === active ? "scale-110 shadow-[0_0_0_3px_var(--ink)]" : ""}`}
            >
              {i + 1}
            </span>
            <span className={`text-sm font-semibold ${i === active ? "" : "text-muted"}`}>{r.month}</span>
          </button>
        ))}
      </div>

      <div key={active} className="pop mt-8 rounded-2xl border border-line bg-paper p-6 md:p-8">
        <p className="text-sm text-muted">{m.place}</p>
        <h2 className="mt-1 font-display text-3xl font-bold">{m.title}</h2>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted">Milestones · tick what you could help with</p>
        <ul className="mt-3 space-y-2">
          {m.steps.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => toggle(s)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  checked.has(s) ? "border-leaf bg-leaf/10" : "border-line hover:border-ink"
                }`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border text-sm ${checked.has(s) ? "border-leaf bg-leaf text-paper" : "border-line"}`}>
                  {checked.has(s) ? "✓" : ""}
                </span>
                {s}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)} className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-40">
            ← Previous
          </button>
          <span className="text-sm text-muted">{checked.size} milestone{checked.size === 1 ? "" : "s"} ticked</span>
          <button
            type="button"
            disabled={active === roadmap.length - 1}
            onClick={() => setActive(active + 1)}
            className="rounded-full bg-ink px-4 py-2 text-sm text-paper disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
