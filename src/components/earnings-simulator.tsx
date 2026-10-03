"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { roles } from "@/lib/content";

const kina = (n: number) => `K${Math.round(n).toLocaleString("en-US")}`;

export function EarningsSimulator() {
  const params = useSearchParams();
  const [roleId, setRoleId] = useState<string>(roles.find((r) => r.id === params.get("role"))?.id ?? "trainer");
  const [learners, setLearners] = useState(25);
  const [price, setPrice] = useState(150);
  const [cohorts, setCohorts] = useState(2);

  const role = roles.find((r) => r.id === roleId) ?? roles[0];
  const revenue = learners * price * cohorts;
  const earnings = revenue * role.commission;

  return (
    <div className="mt-6 grid gap-6 rounded-2xl border border-line bg-paper p-6 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold">Role</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoleId(r.id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  r.id === roleId ? "bg-ink text-paper" : "border border-line hover:border-ink"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </fieldset>
        <Slider label="Learners per cohort" value={learners} min={5} max={60} step={1} onChange={setLearners} display={`${learners}`} />
        <Slider label="Fee per learner" value={price} min={50} max={500} step={10} onChange={setPrice} display={kina(price)} />
        <Slider label="Cohorts per month" value={cohorts} min={1} max={6} step={1} onChange={setCohorts} display={`${cohorts}`} />
      </div>

      <div className="flex flex-col justify-center rounded-xl bg-ink p-6 text-paper">
        <p className="text-sm text-paper/70">Program revenue / month</p>
        <p className="font-display text-2xl font-bold">{kina(revenue)}</p>
        <p className="mt-6 text-sm text-paper/70">
          Your share as {role.name} ({Math.round(role.commission * 100)}%)
        </p>
        <p className="font-display text-5xl font-extrabold text-gold">{kina(earnings)}</p>
        <p className="mt-1 text-sm text-paper/70">≈ {kina(earnings * 12)} per year</p>
        <p className="mt-6 border-t border-paper/20 pt-3 text-xs text-paper/60">
          Illustration only. Final rates and fees are agreed together.
        </p>
      </div>
    </div>
  );
}

function Slider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-sm">
        <span className="font-semibold">{props.label}</span>
        <span className="font-display font-bold">{props.display}</span>
      </span>
      <input
        type="range"
        className="mt-2 w-full accent-[var(--red)]"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </label>
  );
}
