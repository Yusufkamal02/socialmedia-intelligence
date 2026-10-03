"use client";

import { useState } from "react";

const kina = (n: number) => `K${Math.round(n).toLocaleString("en-US")}`;

const tabs = [
  { id: "money", label: "Money Skills", hint: "Plan a market stall budget" },
  { id: "farm", label: "Smart Farming", hint: "Control an automatic garden" },
  { id: "data", label: "Data Analytics", hint: "Explore a sales dashboard" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProgramDemos() {
  const [tab, setTab] = useState<TabId>("money");

  return (
    <div className="rounded-3xl border border-line bg-paper p-4 md:p-6">
      <div role="tablist" className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-2xl px-4 py-3 text-left transition ${
              tab === t.id ? "bg-ink text-paper" : "bg-paper-2 hover:bg-line"
            }`}
          >
            <span className="block font-semibold">{t.label}</span>
            <span className={`block text-xs ${tab === t.id ? "text-paper/70" : "text-muted"}`}>{t.hint}</span>
          </button>
        ))}
      </div>
      <div key={tab} className="pop mt-6">
        {tab === "money" && <BudgetDemo />}
        {tab === "farm" && <GardenDemo />}
        {tab === "data" && <DataDemo />}
      </div>
    </div>
  );
}

function Range(props: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void }) {
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

function BudgetDemo() {
  const [sales, setSales] = useState(600);
  const [costs, setCosts] = useState(350);
  const [savePct, setSavePct] = useState(20);

  const profit = Math.max(sales - costs, 0);
  const saved = (profit * savePct) / 100;
  const months = [1, 2, 3, 4, 5, 6];
  const goal = 1500;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <p className="text-muted">A lesson from week 2: how much of your weekly profit should you save?</p>
        <Range label="Weekly sales" value={sales} min={100} max={2000} step={50} display={kina(sales)} onChange={setSales} />
        <Range label="Weekly costs (stock, transport, fees)" value={costs} min={0} max={1500} step={50} display={kina(costs)} onChange={setCosts} />
        <Range label="Save from profit" value={savePct} min={0} max={60} step={5} display={`${savePct}%`} onChange={setSavePct} />
      </div>
      <div className="rounded-2xl bg-paper-2 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted">Weekly profit</p>
            <p className={`font-display text-3xl font-extrabold ${profit === 0 ? "text-red" : ""}`}>{kina(profit)}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Saved each week</p>
            <p className="font-display text-3xl font-extrabold text-leaf">{kina(saved)}</p>
          </div>
        </div>
        <p className="mt-5 text-sm font-semibold">Savings over 6 months · goal {kina(goal)} for a new stall</p>
        <div className="mt-3 flex h-36 items-end gap-2">
          {months.map((m) => {
            const total = saved * 4.33 * m;
            return (
              <div key={m} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-[10px] text-muted">{kina(total)}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${total >= goal ? "bg-leaf" : "bg-gold"}`}
                    style={{ height: `${Math.min(total / (goal * 1.5), 1) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted">M{m}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-sm">
          {saved === 0
            ? "With no savings, the goal is never reached. Try lowering costs or saving a little."
            : saved * 4.33 * 6 >= goal
              ? `Goal reached in about ${Math.ceil(goal / (saved * 4.33))} months. 🎉`
              : `At this rate the goal takes ${Math.ceil(goal / (saved * 4.33))} months.`}
        </p>
      </div>
    </div>
  );
}

function GardenDemo() {
  const [moisture, setMoisture] = useState(42);
  const [threshold, setThreshold] = useState(35);
  const [auto, setAuto] = useState(true);
  const [manual, setManual] = useState(false);

  const pumpOn = auto ? moisture < threshold : manual;
  const status = moisture < 25 ? "Plants are stressed" : moisture < 60 ? "Healthy soil" : "Too wet, roots may rot";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <p className="text-muted">A lesson from week 3: a sensor reads the soil and switches the pump for you.</p>
        <Range label="Soil moisture (sensor)" value={moisture} min={5} max={90} step={1} display={`${moisture}%`} onChange={setMoisture} />
        <Range label="Water when below" value={threshold} min={15} max={60} step={1} display={`${threshold}%`} onChange={setThreshold} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAuto(!auto)}
            className={`relative h-7 w-12 rounded-full transition ${auto ? "bg-leaf" : "bg-line"}`}
            aria-pressed={auto}
            aria-label="Automatic mode"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-paper transition-all ${auto ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm font-semibold">Automatic mode</span>
          {!auto && (
            <button type="button" onClick={() => setManual(!manual)} className="ml-auto rounded-full border border-ink px-3 py-1 text-sm">
              Pump {manual ? "off" : "on"}
            </button>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-[#d9ecf5] p-5">
        <div className="flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pumpOn ? "bg-leaf text-paper" : "bg-paper text-muted"}`}>
            Pump {pumpOn ? "ON" : "OFF"}
          </span>
          <span className="text-xs font-semibold text-ink/70">{status}</span>
        </div>
        <div className="relative mt-4 h-14">
          {pumpOn &&
            [10, 25, 40, 55, 70, 85].map((x, i) => (
              <span key={x} className="drop absolute top-0 h-3 w-1.5 rounded-full bg-[#3a86c8]" style={{ left: `${x}%`, animationDelay: `${i * 0.15}s` }} />
            ))}
        </div>
        <div className="flex items-end justify-around">
          {[0, 1, 2, 3, 4].map((i) => {
            const h = moisture < 25 ? 30 : moisture > 70 ? 40 : 55 + (i % 2) * 10;
            return (
              <div key={i} className="flex flex-col items-center">
                <span className={`text-2xl transition-all ${moisture < 25 ? "grayscale" : ""}`} style={{ transform: moisture < 25 ? "rotate(12deg)" : "none" }}>
                  🌱
                </span>
                <span className="w-1 rounded-full bg-leaf transition-all duration-500" style={{ height: h }} />
              </div>
            );
          })}
        </div>
        <div className="mt-1 h-10 rounded-lg transition-colors duration-500" style={{ background: `color-mix(in srgb, #5b3a1f ${30 + moisture * 0.7}%, #c9a77c)` }} />
      </div>
    </div>
  );
}

const products = [
  { name: "Kaukau", thisWeek: 420, lastWeek: 380 },
  { name: "Banana", thisWeek: 260, lastWeek: 310 },
  { name: "Taro", thisWeek: 310, lastWeek: 240 },
  { name: "Peanuts", thisWeek: 180, lastWeek: 150 },
  { name: "Fish", thisWeek: 520, lastWeek: 470 },
];

function DataDemo() {
  const [week, setWeek] = useState<"thisWeek" | "lastWeek">("thisWeek");
  const [sorted, setSorted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const rows = sorted ? [...products].sort((a, b) => b[week] - a[week]) : products;
  const max = Math.max(...products.map((p) => Math.max(p.thisWeek, p.lastWeek)));
  const total = products.reduce((s, p) => s + p[week], 0);
  const pick = products.find((p) => p.name === selected);

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div>
        <div className="flex flex-wrap gap-2">
          {(["thisWeek", "lastWeek"] as const).map((w) => (
            <button key={w} type="button" onClick={() => setWeek(w)} className={`rounded-full px-3 py-1 text-sm ${week === w ? "bg-ink text-paper" : "border border-line"}`}>
              {w === "thisWeek" ? "This week" : "Last week"}
            </button>
          ))}
          <button type="button" onClick={() => setSorted(!sorted)} className={`rounded-full px-3 py-1 text-sm ${sorted ? "bg-gold text-ink" : "border border-line"}`}>
            Sort by sales
          </button>
        </div>
        <ul className="mt-5 space-y-3">
          {rows.map((p) => (
            <li key={p.name}>
              <button type="button" onClick={() => setSelected(p.name)} className="group w-full text-left">
                <span className="flex justify-between text-sm">
                  <span className={selected === p.name ? "font-bold" : ""}>{p.name}</span>
                  <span className="font-semibold">{kina(p[week])}</span>
                </span>
                <span className="mt-1 block h-3 rounded-full bg-paper-2">
                  <span
                    className={`block h-3 rounded-full transition-all duration-500 ${selected === p.name ? "bg-red" : "bg-ink/80 group-hover:bg-red"}`}
                    style={{ width: `${(p[week] / max) * 100}%` }}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">Sample data from a fictional market co-op. Click a bar for insight.</p>
      </div>
      <div className="rounded-2xl bg-paper-2 p-5">
        <p className="text-sm text-muted">Total sales</p>
        <p className="font-display text-3xl font-extrabold">{kina(total)}</p>
        {pick ? (
          <div key={pick.name} className="pop mt-5">
            <p className="font-display text-xl font-bold">{pick.name}</p>
            {(() => {
              const change = ((pick.thisWeek - pick.lastWeek) / pick.lastWeek) * 100;
              return (
                <>
                  <p className={`mt-1 text-2xl font-extrabold ${change >= 0 ? "text-leaf" : "text-red"}`}>
                    {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(0)}%
                  </p>
                  <p className="mt-2 text-sm">
                    {change >= 0
                      ? `${pick.name} is growing. Consider bringing more stock next week.`
                      : `${pick.name} sales dropped. Check prices or try a different market day.`}
                  </p>
                </>
              );
            })()}
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted">This is the kind of insight learners build in week 4: turning sales records into decisions.</p>
        )}
      </div>
    </div>
  );
}
