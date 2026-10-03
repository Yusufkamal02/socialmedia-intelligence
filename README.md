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

## Tracking

- `src/proxy.ts` is the middleware (Next 16 renamed `middleware.ts` to `proxy.ts`). On every route it records IP, path, query, visitor ID, `ref`, user agent, referer and country/city headers, then sends the event to `/api/track` in the background.
- `src/components/route-beacon.tsx` pings `/api/pv` on in-site navigations, which the router often serves from its prefetch cache without hitting the server.
- `/api/track` appends to `data/visits.jsonl`, logs to the console, and forwards each event to `TRACK_WEBHOOK_URL` if it is set.
- Completed role quizzes are sent to `/api/quiz`, which recomputes the result server-side and appends it to `data/quiz.jsonl` with IP, visitor ID and `ref`.
- When `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set, a Telegram message is sent for each new visitor's first page, every full page load from a `ref`-tagged visitor, each completed quiz and each interest form. Bots and link-preview fetchers are skipped.
- Prefetches, RSC router fetches, HEAD/OPTIONS and `/admin` itself are not counted.

Storage is a local JSONL file. For serverless hosting (e.g. Vercel), swap `src/lib/store.ts` for a database.

Content and illustrative numbers live in `src/lib/content.ts`.

## Scholarship data

All scholarships live in `src/data/scholarships.ts`. To update, edit that one file; no UI changes are needed.

- Use only official sources (provider, embassy, ministry) for dates, and set `lastVerified` and `verifiedBy` to what you read.
- Dates are ISO 8601 with a time zone (e.g. `2026-10-06T11:00:00Z`). Status (Open now / Closed for now / Check dates) is computed from them on each render, and the page revalidates hourly, so cards close by themselves after the deadline.
- Use `statusOverride` only when the official page states a status without dates. A passed `closesAt` always wins.
- If the next round is not officially announced, keep `nextRound.confirmed: false`. Never invent dates.
- Run `npm test` after editing; it checks the status logic and the data (unique slugs, https links, valid dates, no unofficial quota numbers).
- Record what you checked in `docs/scholarship-verification-report.md`.

`scripts/import-scholarships.mjs` was a one-off import from `docs/kirap_scholarship_tracker.xlsx`. Do not re-run it over the verified data file.

