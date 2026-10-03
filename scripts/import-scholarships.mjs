// One-off import: docs/kirap_scholarship_tracker.xlsx → src/data/scholarships.ts
//
//   node scripts/import-scholarships.mjs
//
// The spreadsheet is in Indonesian and its dates are free text, so this script
// only produces a starting point: Indonesian text is copied as-is and every date
// is null. Translate and verify each entry by editing the generated file. After
// that, src/data/scholarships.ts is the source of truth; do not re-run this over it.

import { writeFileSync } from "node:fs";
import { readSheet } from "read-excel-file/node";

const SRC = "docs/kirap_scholarship_tracker.xlsx";
const OUT = "src/data/scholarships.ts";
const LAST_VERIFIED = "2026-10-03"; // "Terakhir diperiksa" note in the sheet

const countryNames = {
  Inggris: "United Kingdom",
  "Amerika Serikat": "United States",
  Jepang: "Japan",
  Taiwan: "Taiwan",
  Indonesia: "Indonesia",
  "Selandia Baru": "New Zealand",
  Australia: "Australia",
};

function country(raw) {
  const key = Object.keys(countryNames).find((k) => raw.startsWith(k));
  return key ? countryNames[key] : raw;
}

function levels(raw) {
  const out = new Set();
  if (/S1|sarjana/i.test(raw)) out.add("bachelor");
  if (/S2|PG (Certificate|Diploma)|pascasarjana/i.test(raw)) out.add("master");
  if (/S3/.test(raw)) out.add("phd");
  if (/(^|[^G] )Diploma|diploma 3/i.test(raw)) out.add("diploma");
  if (/fellowship|non-degree|semester/i.test(raw)) out.add("exchange");
  if (/bahasa/i.test(raw)) out.add("other");
  return out.size ? [...out] : ["other"];
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const rows = await readSheet(SRC, "Beasiswa PNG");
const header = rows.findIndex((r) => r[0] === "No");
const data = rows.slice(header + 1).filter((r) => typeof r[0] === "number");

const scholarships = data.map((r) => {
  const [, name, dest, jenjang, cakupan, syarat, , deadline, putaran, sumber, link, linkExtra] = r.map((c) =>
    c == null ? "" : String(c).trim(),
  );
  return {
    slug: slugify(name),
    name,
    country: country(dest),
    levels: levels(jenjang),
    funding: cakupan,
    pngEligibility: syarat,
    officialUrl: link,
    extraUrls: linkExtra ? [{ label: "More information", url: linkExtra }] : [],
    opensAt: null,
    closesAt: null,
    deadlineNote: deadline,
    nextRound: { text: putaran, confirmed: !/estimasi|belum|cek/i.test(putaran) },
    sourceType: /resmi/i.test(sumber) && !/pihak ketiga/i.test(sumber) ? "official" : "third-party",
    lastVerified: LAST_VERIFIED,
    verifiedBy: link,
  };
});

const file = `// Scholarship Pathway data. This file is the single source of truth for /scholarships.
// Edit entries here; the page recomputes each status from the dates on every request.
// Only use official sources for dates. See docs/scholarship-verification-report.md.

import type { Scholarship } from "@/lib/scholarships";

export const scholarships: Scholarship[] = ${JSON.stringify(scholarships, null, 2)};
`;

writeFileSync(OUT, file);
console.log(`Wrote ${scholarships.length} scholarships to ${OUT}`);
