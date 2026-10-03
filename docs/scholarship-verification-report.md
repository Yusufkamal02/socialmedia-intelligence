# Scholarship verification report

**Verified on:** 3 October 2026
**Source file:** `docs/kirap_scholarship_tracker.xlsx` (sheet `Beasiswa PNG`, 12 rows; sheet `Belum terkonfirmasi`, 2 rows)
**Result file:** `src/data/scholarships.ts` (16 entries)

Rules applied: status and dates come only from official pages (scholarship provider, embassy, ministry or government agency). Third-party sites were used only as leads. Dates that were not officially announced are left empty and shown as "unconfirmed" or "Check dates". No PNG quota numbers are published except the one stated officially (MOFA Taiwan: 1 award in 2026).

The site no longer stores a fixed status. The "After" column is what the page computes on 3 Oct 2026 from the dates in the data file.

## Original 12 rows

| # | Scholarship | xlsx status | After (3 Oct 2026) | Source read | What changed |
|---|---|---|---|---|---|
| 1 | Chevening | Open | **Open** until 6 Oct 2026 11:00 UTC | chevening.org PNG page + application timeline | Opening date added (4 Aug 2026). The xlsx estimate for the next round (Aug–Oct 2027) was removed because it is not official. The "10 places in 2023" figure was removed because it is not on the official page. |
| 2 | Australia Awards | Closed | **Closed** | DFAT opening and closing dates page (PNG row); australiaawardspng.org | **The official link was wrong**: the xlsx link points to *in-PNG* scholarships, not study in Australia. Changed to `/scholarships/australia-awards-scholarship`. Exact times added (1 Feb 2026 09:00 AEDT to 30 Apr 2026 14:00 AEST). Levels changed from bachelor/master/PhD to **master** (the official page describes a "progressive" qualification, usually a master's). Requirements added: 2 years of work, IELTS 6.5. The "Feb 2027" estimate was removed. |
| 3 | Manaaki New Zealand | Closed | **Closed** (official page says closed) | nzscholarships.govt.nz eligible countries | Confirmed that PNG can only use Option 1 (study in NZ). The third-party 2026 round dates were removed. The opening and closing dates page still mentions only the 2024 round. |
| 4 | Commonwealth (Master's, PhD, Shared, Distance) | Closed | **Open** until 20 Oct 2026 16:00 BST (Master's) | cscuk.fcdo.gov.uk Master's, PhD and Shared pages | **Big change**: Master's applications for 2027/28 are **open now**. **PNG is NOT eligible for the Commonwealth PhD** (the 2027/28 list has 17 countries and does not include PNG), so the entry is now only "Commonwealth Master's Scholarships". Shared Scholarships (PNG eligible) are closed for 2026/27 and linked as extra information. Added that applications go through a nominating agency, which may set an earlier deadline. The Distance Learning page returned 404 and is not listed. |
| 5 | Fulbright | Closed | **Closed** | pg.usembassy.gov Fulbright page | Confirmed: deadline 30 Apr 2026 23:59 PNG time. Added the minimum of 2 years' work experience. Removed "no dependants" and "no test required" because they could not be confirmed in the text I read. |
| 6 | USSP | Closed | **Closed** (official page says "Applications now closed") | pg.usembassy.gov USSP page | No change. |
| 7 | Humphrey + Global UGRAD | Closed / unverified | Humphrey: **Closed**. UGRAD: **Check dates** | pg.usembassy.gov Humphrey + exchange programs pages | Split into two entries. Humphrey: added the minimum of **5 years'** work experience (it was missing). UGRAD: shown without dates. |
| 8 | MEXT (Japan) | Closed | **Closed** | Embassy of Japan in PNG announcement (21 Apr 2026). Opened in a browser; automated fetch is blocked (403). | Confirmed deadlines of 28 May and 4 Jun 2026, birth-date limits, and that applications go in a sealed envelope. The "Apr–Jun 2027" estimate was removed. |
| 9 | MOFA Taiwan | Unclear | **Closed** | roc-taiwan.org/pg_en/post/1942.html | **Found the official dates**: 2 Feb to 31 Mar 2026 (they were missing). The quota of 1 award for PNG is confirmed. Allowance corrected: degree study is NT$33,000 a month, Mandarin NT$28,000. |
| 10 | TaiwanICDF | Waiting | **Closed for now**. Opens 1 Dec 2026 (confirmed) | icdf.org.tw Apply Now + Eligibility | The third-party estimate is replaced by **official** dates: 1 Dec 2026 to 15 Mar 2027. `sourceType` changed to `official`. PNG eligibility confirmed. |
| 11 | KNB (Indonesia) | Waiting | **Closed** | knb.kemdiktisaintek.go.id + 2026 guideline (PDF linked from the official site) | **2026 dates added**: 2 Feb to 31 Mar 2026. PNG appears in the 2026 guideline's embassy list (no. 78, KBRI Port Moresby and KRI Vanimo). The "3 PNG students in 2024" figure was removed (not from the official page). The "Mar 2027" estimate was removed. |
| 12 | TIAS (Indonesia) | Closed | **Check dates** | tias.kemenkeu.go.id/landing | The landing page confirms PNG is on the priority list and that the scholarship targets civil servants or nominated officials. **The 2026 booklet returned 403**, so the dates 16 Feb to 17 Apr 2026 could not be confirmed and **were not published**. Added the 2-year return rule and PhD as a level. |

## Could not be fully verified

- **TIAS**: dates. The official booklet PDF returned 403; the landing page has no dates.
- **Global UGRAD**: no dates on the US Embassy PNG page.
- **Manaaki NZ, USSP, Humphrey**: closed, but the official pages give no date for the next round.
- **Commonwealth Master's**: the DHERST nomination deadline for PNG (it may be earlier than 20 Oct) is not published on any official page I could find.
- **Commonwealth Distance Learning**: the official page returned 404.
- **Chevening funding details**: the PNG page did not list what is covered. The summary comes from the xlsx and Chevening's well-known standard package. Re-check on chevening.org.
- **Chinese Government Scholarship**: the DHERST page is the 2024/25 notice. A 2026/27 notice was found on another PNG government site (mra.gov.pg), but it had no closing date. The pathway is valid; current dates are unknown.

## New additions (official sources only)

| Scholarship | Evidence | Status |
|---|---|---|
| Chinese Government Scholarship (CSC) | DHERST official page: PNG–China agreement, apply via Campus China + DHERST | Check dates |
| Erasmus Mundus Joint Masters | EACEA (European Commission): open to all nationalities | Check dates (each programme has its own deadline, most Oct–Jan) |
| DAAD EPOS (Germany) | DAAD scholarship database (PNG in the country list) + DAAD developing countries list PDF | Check dates (deadline per course) |

## Considered but not added

- **Global Korea Scholarship (GKS)**: no official page found confirming a PNG embassy track or PNG on the 2026 graduate country list. A third-party search summary claimed PNG is listed, but this was not confirmed on an official source.
- **Türkiye Scholarships**: the official site gives a 10 Jan to 20 Feb window without a year and no explicit country eligibility statement I could confirm. Worth re-checking.
- **Commonwealth PhD**: PNG is not eligible (see row 4).
- Leads for next time, both listed on DHERST: Malaysian Technical Cooperation Programme (MTCP) and Handong Global University.

## Pages that blocked automated access

The US Embassy (403 for one fetcher, fine with another), the Embassy of Japan (403, read in a browser), DFAT (timeout, read in a browser) and the TIAS booklet (403). Plan for a manual check in a browser when re-verifying.
