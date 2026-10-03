# Kirap — partnership microsite

Next.js 16 microsite recruiting local partners in Papua New Guinea, with visitor tracking on every route.

## Run

```bash
cp .env.example .env.local   # fill TRACK_SECRET and ADMIN_PASSWORD
npm install
npm run dev
```

Give each prospect a neutral code, e.g. `https://<domain>/?ref=p01`, and keep the code→person mapping privately. The `ref` is stored in a cookie, so every later visit is tagged too.

## Routes

| Route | Purpose |
|---|---|
| `/` | Overview + "Why you" |
| `/programs` | The 4 programs + material previews |
| `/scholarships` | Scholarship Pathway: scholarships open to PNG citizens, with filters |
| `/partnership` | Roles, revenue share, earnings calculator |
| `/roadmap` | 90-day pilot plan |
| `/join` | Interest form → `POST /api/interest` |
| `/admin` | Visitor monitor (basic auth: `ADMIN_USER` / `ADMIN_PASSWORD`) |

## Scholarship data

All scholarships live in `src/data/scholarships.ts`. To update, edit that one file; no UI changes are needed.

- Use only official sources (provider, embassy, ministry) for dates, and set `lastVerified` and `verifiedBy` to what you read.
- Dates are ISO 8601 with a time zone (e.g. `2026-10-06T11:00:00Z`). Status (Open now / Closed for now / Check dates) is computed from them on each render, and the page revalidates hourly, so cards close by themselves after the deadline.
- Use `statusOverride` only when the official page states a status without dates. A passed `closesAt` always wins.
- If the next round is not officially announced, keep `nextRound.confirmed: false`. Never invent dates.
- Run `npm test` after editing; it checks the status logic and the data (unique slugs, https links, valid dates, no unofficial quota numbers).
- Record what you checked in `docs/scholarship-verification-report.md`.

`scripts/import-scholarships.mjs` was a one-off import from `docs/kirap_scholarship_tracker.xlsx`. Do not re-run it over the verified data file.

