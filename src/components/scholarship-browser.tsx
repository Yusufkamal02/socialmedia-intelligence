"use client";

import { useMemo, useState } from "react";
import {
  computeStatus,
  defaultFilters,
  filterScholarships,
  formatDate,
  levelLabels,
  statusLabels,
  type Level,
  type Scholarship,
  type ScholarshipFilters,
  type Status,
  type StatusFilter,
} from "@/lib/scholarships";

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open now" },
  { value: "plan", label: "Plan ahead" },
];

const chip: Record<Status, string> = {
  open: "bg-leaf text-paper",
  closed: "border border-ink/30 bg-paper-2 text-ink",
  check: "bg-gold text-ink",
};

const control = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-base focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink";

// `items` arrive pre-sorted from the server; `now` is the server's request time,
// so statuses match the server-rendered HTML.
export function ScholarshipBrowser({
  items,
  now,
  countries,
  levels,
}: {
  items: Scholarship[];
  now: string;
  countries: string[];
  levels: Level[];
}) {
  const [filters, setFilters] = useState<ScholarshipFilters>(defaultFilters);
  const date = useMemo(() => new Date(now), [now]);
  const shown = useMemo(() => filterScholarships(items, filters, date), [items, filters, date]);
  const set = <K extends keyof ScholarshipFilters>(key: K, value: ScholarshipFilters[K]) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <form role="search" aria-label="Filter scholarships" onSubmit={(e) => e.preventDefault()} className="grid gap-4 rounded-2xl border border-line bg-paper p-4 md:grid-cols-2 md:p-6 lg:grid-cols-[auto_1fr_1fr_1.3fr]">
        <fieldset>
          <legend className="text-sm font-semibold">Status</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {statusOptions.map((o) => (
              <label
                key={o.value}
                className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink has-[:focus-visible]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="status"
                  value={o.value}
                  checked={filters.status === o.value}
                  onChange={() => set("status", o.value)}
                  className="sr-only"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm font-semibold">
          Level of study
          <select value={filters.level} onChange={(e) => set("level", e.target.value as Level | "all")} className={control}>
            <option value="all">All levels</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {levelLabels[l]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Study in
          <select value={filters.country} onChange={(e) => set("country", e.target.value)} className={control}>
            <option value="all">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Search by name
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
            placeholder="e.g. Chevening"
            className={control}
          />
        </label>
      </form>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {shown.length} of {items.length} scholarships
      </p>

      {shown.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line p-8 text-center">
          <p className="font-display text-xl font-bold">No scholarships match these filters</p>
          <p className="mt-2 text-muted">Try another level or country, or clear the filters.</p>
          <button
            type="button"
            onClick={() => setFilters(defaultFilters)}
            className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 md:grid-cols-2">
          {shown.map((s) => (
            <li key={s.slug}>
              <ScholarshipCard s={s} status={computeStatus(s, date)} now={date} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ScholarshipCard({ s, status, now }: { s: Scholarship; status: Status; now: Date }) {
  const opensLater = s.opensAt && new Date(s.opensAt) > now;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted">{s.country}</p>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${chip[status]}`}>
          <StatusIcon status={status} />
          {statusLabels[status]}
        </span>
      </div>
      <h3 className="mt-2 font-display text-xl font-bold">{s.name}</h3>
      <ul aria-label="Levels" className="mt-3 flex flex-wrap gap-1.5">
        {s.levels.map((l) => (
          <li key={l} className="rounded-full border border-line px-2.5 py-0.5 text-xs">
            {levelLabels[l]}
          </li>
        ))}
      </ul>
      <p className="mt-4">{s.funding}</p>

      <dl className="mt-4 flex-1 space-y-3 text-sm">
        <div>
          <dt className="font-semibold">For PNG</dt>
          <dd className="mt-0.5 text-muted">{s.pngEligibility}</dd>
        </div>
        <div>
          <dt className="font-semibold">Dates</dt>
          <dd className="mt-0.5 text-muted">
            {status === "open" && s.closesAt && <span className="block font-semibold text-ink">Closes {formatDate(s.closesAt)}</span>}
            {opensLater && (
              <span className="block font-semibold text-ink">
                Opens {formatDate(s.opensAt!)}
                {s.closesAt && ` · Closes ${formatDate(s.closesAt)}`}
              </span>
            )}
            <span className="block">{s.deadlineNote}</span>
            {!opensLater && (
              <span className="block">
                Next round: {s.nextRound.text}
                {!s.nextRound.confirmed && <span className="ml-1 font-semibold text-ink">(unconfirmed)</span>}
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={s.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Official page ↗<span className="sr-only"> for {s.name} (opens in a new tab)</span>
        </a>
        {s.extraUrls.map((e) => (
          <a key={e.url} href={e.url} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-red">
            {e.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
      <p className="mt-4 border-t border-line pt-3 text-xs text-muted">Last checked: {formatDate(s.lastVerified)}</p>
    </article>
  );
}

// Shape differs per status so it never relies on colour alone (the label text is always shown too).
function StatusIcon({ status }: { status: Status }) {
  return (
    <svg aria-hidden viewBox="0 0 10 10" className="h-2.5 w-2.5">
      {status === "open" && <circle cx="5" cy="5" r="4" fill="currentColor" />}
      {status === "closed" && <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />}
      {status === "check" && <path d="M5 1 9 9H1Z" fill="currentColor" />}
    </svg>
  );
}
