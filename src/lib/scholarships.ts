// Types and pure helpers for the Scholarship Pathway. Every function takes
// `now` as an argument so status is computed at request time (and tests can
// move the clock), never frozen into the data.

export type Level = "bachelor" | "master" | "phd" | "diploma" | "exchange" | "other";
export type Status = "open" | "closed" | "check";
export type StatusFilter = "all" | "open" | "plan";

export type Scholarship = {
  slug: string;
  name: string;
  /** Destination country, in plain English. */
  country: string;
  levels: Level[];
  /** Short summary of what the scholarship pays for. */
  funding: string;
  /** Who can apply from PNG, in simple English. */
  pngEligibility: string;
  officialUrl: string;
  extraUrls: { label: string; url: string }[];
  /** ISO 8601 date-time with offset, or null when not announced. */
  opensAt: string | null;
  closesAt: string | null;
  deadlineNote: string;
  nextRound: { text: string; confirmed: boolean };
  /** Use when the official page states the status but gives no dates. A passed `closesAt` always wins. */
  statusOverride?: Status;
  sourceType: "official" | "third-party";
  /** ISO date (YYYY-MM-DD) of the last check against `verifiedBy`. */
  lastVerified: string;
  verifiedBy: string;
};

export const levelLabels: Record<Level, string> = {
  bachelor: "Bachelor",
  master: "Master",
  phd: "PhD",
  diploma: "Diploma",
  exchange: "Exchange / fellowship",
  other: "Other",
};

export const statusLabels: Record<Status, string> = {
  open: "Open now",
  closed: "Closed for now",
  check: "Check dates",
};

const DAY = 24 * 60 * 60 * 1000;

const time = (iso: string | null) => (iso ? new Date(iso).getTime() : null);

export function computeStatus(s: Pick<Scholarship, "opensAt" | "closesAt" | "statusOverride">, now: Date): Status {
  const t = now.getTime();
  const opens = time(s.opensAt);
  const closes = time(s.closesAt);

  if (closes !== null && t >= closes) return "closed";
  if (s.statusOverride) return s.statusOverride;
  if (opens !== null && t < opens) return "closed";
  if (opens !== null && closes !== null) return "open";
  return "check";
}

export type ScholarshipFilters = {
  status: StatusFilter;
  level: Level | "all";
  country: string;
  query: string;
};

export const defaultFilters: ScholarshipFilters = { status: "all", level: "all", country: "all", query: "" };

export function filterScholarships(list: Scholarship[], f: ScholarshipFilters, now: Date): Scholarship[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((s) => {
    const status = computeStatus(s, now);
    if (f.status === "open" && status !== "open") return false;
    if (f.status === "plan" && status === "open") return false;
    if (f.level !== "all" && !s.levels.includes(f.level)) return false;
    if (f.country !== "all" && s.country !== f.country) return false;
    if (q && !s.name.toLowerCase().includes(q)) return false;
    return true;
  });
}

// Open first, then nearest upcoming closing date, then A–Z.
export function sortScholarships(list: Scholarship[], now: Date): Scholarship[] {
  const t = now.getTime();
  const upcomingClose = (s: Scholarship) => {
    const c = time(s.closesAt);
    return c !== null && c > t ? c : Infinity;
  };
  return [...list].sort((a, b) => {
    const openA = computeStatus(a, now) === "open" ? 0 : 1;
    const openB = computeStatus(b, now) === "open" ? 0 : 1;
    if (openA !== openB) return openA - openB;
    const ca = upcomingClose(a);
    const cb = upcomingClose(b);
    if (ca !== cb) return ca < cb ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function closingSoon(list: Scholarship[], now: Date, withinDays = 14) {
  const t = now.getTime();
  return sortScholarships(list, now)
    .filter((s) => computeStatus(s, now) === "open" && s.closesAt && time(s.closesAt)! - t <= withinDays * DAY)
    .map((s) => ({ scholarship: s, daysLeft: Math.max(0, Math.ceil((time(s.closesAt)! - t) / DAY)) }));
}

export function countries(list: Scholarship[]): string[] {
  return [...new Set(list.map((s) => s.country))].sort((a, b) => a.localeCompare(b));
}

export function usedLevels(list: Scholarship[]): Level[] {
  const used = new Set(list.flatMap((s) => s.levels));
  return (Object.keys(levelLabels) as Level[]).filter((l) => used.has(l));
}

export function latestVerified(list: Scholarship[]): string | null {
  return list.reduce<string | null>((max, s) => (max === null || s.lastVerified > max ? s.lastVerified : max), null);
}

/** Formats an ISO date or date-time as e.g. "6 Oct 2026" in PNG time (UTC+10). */
export function formatDate(iso: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00+10:00`) : new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Pacific/Port_Moresby" });
}
