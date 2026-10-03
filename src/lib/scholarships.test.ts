import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  closingSoon,
  computeStatus,
  defaultFilters,
  filterScholarships,
  formatDate,
  sortScholarships,
  type Scholarship,
} from "./scholarships.ts";

const base: Scholarship = {
  slug: "x",
  name: "X",
  country: "Japan",
  levels: ["master"],
  funding: "",
  pngEligibility: "",
  officialUrl: "https://example.org",
  extraUrls: [],
  opensAt: null,
  closesAt: null,
  deadlineNote: "",
  nextRound: { text: "", confirmed: false },
  sourceType: "official",
  lastVerified: "2026-10-03",
  verifiedBy: "https://example.org",
};

const make = (over: Partial<Scholarship>): Scholarship => ({ ...base, ...over });
const at = (iso: string) => new Date(iso);

describe("computeStatus", () => {
  const s = make({ opensAt: "2026-08-04T11:00:00Z", closesAt: "2026-10-06T11:00:00Z" });

  it("is open between the opening and closing time", () => {
    assert.equal(computeStatus(s, at("2026-10-03T00:00:00Z")), "open");
  });

  it("closes automatically once the deadline passes", () => {
    assert.equal(computeStatus(s, at("2026-10-06T10:59:59Z")), "open");
    assert.equal(computeStatus(s, at("2026-10-06T11:00:00Z")), "closed");
  });

  it("is closed before the opening date", () => {
    assert.equal(computeStatus(s, at("2026-08-01T00:00:00Z")), "closed");
  });

  it("is 'check' when no dates are known", () => {
    assert.equal(computeStatus(make({}), at("2026-10-03T00:00:00Z")), "check");
  });

  it("is 'check' with only a future deadline and no opening date", () => {
    assert.equal(computeStatus(make({ closesAt: "2026-12-01T00:00:00Z" }), at("2026-10-03T00:00:00Z")), "check");
  });

  it("uses the override while the deadline is ahead", () => {
    const o = make({ closesAt: "2026-10-20T16:00:00+01:00", statusOverride: "open" });
    assert.equal(computeStatus(o, at("2026-10-03T00:00:00Z")), "open");
  });

  it("ignores an 'open' override after the deadline", () => {
    const o = make({ closesAt: "2026-10-20T16:00:00+01:00", statusOverride: "open" });
    assert.equal(computeStatus(o, at("2026-10-20T15:00:00Z")), "closed");
  });

  it("respects time zones", () => {
    // 23:59 PNG time (UTC+10) is 13:59 UTC.
    const png = make({ opensAt: "2026-01-01T00:00:00+10:00", closesAt: "2026-04-30T23:59:00+10:00" });
    assert.equal(computeStatus(png, at("2026-04-30T13:58:00Z")), "open");
    assert.equal(computeStatus(png, at("2026-04-30T13:59:00Z")), "closed");
  });
});

describe("filterScholarships", () => {
  const now = at("2026-10-03T00:00:00Z");
  const list = [
    make({ slug: "open", name: "Chevening", country: "United Kingdom", opensAt: "2026-08-01T00:00:00Z", closesAt: "2026-10-06T00:00:00Z" }),
    make({ slug: "closed", name: "MEXT", country: "Japan", levels: ["diploma", "master"], closesAt: "2026-06-04T00:00:00Z" }),
    make({ slug: "check", name: "Erasmus Mundus", country: "Europe (several countries)", levels: ["master"] }),
    make({ slug: "bach", name: "KNB", country: "Indonesia", levels: ["bachelor"], statusOverride: "closed" }),
  ];
  const slugs = (f: Partial<typeof defaultFilters>) => filterScholarships(list, { ...defaultFilters, ...f }, now).map((s) => s.slug);

  it("returns everything by default", () => {
    assert.deepEqual(slugs({}), ["open", "closed", "check", "bach"]);
  });

  it("filters to open now", () => {
    assert.deepEqual(slugs({ status: "open" }), ["open"]);
  });

  it("'plan ahead' shows everything that is not open", () => {
    assert.deepEqual(slugs({ status: "plan" }), ["closed", "check", "bach"]);
  });

  it("filters by level", () => {
    assert.deepEqual(slugs({ level: "diploma" }), ["closed"]);
    assert.deepEqual(slugs({ level: "bachelor" }), ["bach"]);
  });

  it("filters by country", () => {
    assert.deepEqual(slugs({ country: "Japan" }), ["closed"]);
  });

  it("searches names case-insensitively and trims", () => {
    assert.deepEqual(slugs({ query: "  erasmus " }), ["check"]);
    assert.deepEqual(slugs({ query: "nothing" }), []);
  });

  it("combines filters", () => {
    assert.deepEqual(slugs({ status: "plan", level: "master", country: "Japan" }), ["closed"]);
  });
});

describe("sortScholarships", () => {
  const now = at("2026-10-03T00:00:00Z");

  it("puts open first, then nearest upcoming deadline, then A–Z", () => {
    const list = [
      make({ slug: "z-check", name: "Zeta" }),
      make({ slug: "a-check", name: "Alpha" }),
      make({ slug: "later-open", name: "B", opensAt: "2026-09-01T00:00:00Z", closesAt: "2026-10-20T00:00:00Z" }),
      make({ slug: "soon-open", name: "C", opensAt: "2026-09-01T00:00:00Z", closesAt: "2026-10-06T00:00:00Z" }),
      make({ slug: "upcoming", name: "D", opensAt: "2026-12-01T00:00:00Z", closesAt: "2027-03-15T00:00:00Z" }),
      make({ slug: "past", name: "E", opensAt: "2026-02-01T00:00:00Z", closesAt: "2026-04-30T00:00:00Z" }),
    ];
    assert.deepEqual(
      sortScholarships(list, now).map((s) => s.slug),
      ["soon-open", "later-open", "upcoming", "a-check", "past", "z-check"],
    );
  });

  it("does not mutate the input", () => {
    const list = [make({ name: "B" }), make({ name: "A" })];
    sortScholarships(list, now);
    assert.deepEqual(list.map((s) => s.name), ["B", "A"]);
  });
});

describe("closingSoon", () => {
  const list = [
    make({ slug: "in-3-days", opensAt: "2026-08-04T11:00:00Z", closesAt: "2026-10-06T11:00:00Z" }),
    make({ slug: "in-17-days", statusOverride: "open", closesAt: "2026-10-20T16:00:00+01:00" }),
  ];

  it("lists open scholarships closing within 14 days, with days left", () => {
    const soon = closingSoon(list, at("2026-10-03T11:00:00Z"));
    assert.deepEqual(
      soon.map((x) => [x.scholarship.slug, x.daysLeft]),
      [["in-3-days", 3]],
    );
  });

  it("rounds days left down", () => {
    assert.deepEqual(closingSoon(list, at("2026-10-03T08:00:00Z")).map((x) => x.daysLeft), [3]);
    assert.deepEqual(closingSoon(list, at("2026-10-06T01:00:00Z")).map((x) => x.daysLeft), [0]);
  });

  it("picks up later deadlines as they approach", () => {
    const soon = closingSoon(list, at("2026-10-10T00:00:00Z"));
    assert.deepEqual(soon.map((x) => x.scholarship.slug), ["in-17-days"]);
  });

  it("is empty when nothing is closing soon", () => {
    assert.deepEqual(closingSoon(list, at("2026-11-01T00:00:00Z")), []);
  });
});

describe("formatDate", () => {
  it("shows dates in PNG time", () => {
    assert.equal(formatDate("2026-10-06T11:00:00Z"), "6 Oct 2026");
    assert.equal(formatDate("2026-10-20T16:00:00+01:00"), "21 Oct 2026");
    assert.equal(formatDate("2026-10-03"), "3 Oct 2026");
  });
});
