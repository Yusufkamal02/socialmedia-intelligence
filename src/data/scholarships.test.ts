import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scholarships } from "./scholarships.ts";

describe("scholarship data", () => {
  it("has unique slugs", () => {
    const slugs = scholarships.map((s) => s.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("links only to https pages", () => {
    for (const s of scholarships) {
      for (const url of [s.officialUrl, s.verifiedBy, ...s.extraUrls.map((e) => e.url)]) {
        assert.match(url, /^https:\/\//, `${s.slug}: ${url}`);
      }
    }
  });

  it("has valid dates", () => {
    for (const s of scholarships) {
      assert.match(s.lastVerified, /^\d{4}-\d{2}-\d{2}$/, s.slug);
      for (const d of [s.opensAt, s.closesAt]) {
        if (d) assert.ok(!Number.isNaN(new Date(d).getTime()) && /[Z+-]\d{0,2}:?\d{0,2}$/.test(d), `${s.slug}: ${d}`);
      }
      if (s.opensAt && s.closesAt) assert.ok(new Date(s.opensAt) < new Date(s.closesAt), s.slug);
    }
  });

  it("has at least one level and the required text", () => {
    for (const s of scholarships) {
      assert.ok(s.levels.length > 0, s.slug);
      assert.ok(s.name && s.country && s.funding && s.pngEligibility && s.deadlineNote, s.slug);
    }
  });

  // Integrity rule: no PNG quota numbers unless an official source states one.
  it("only states a PNG quota for MOFA Taiwan", () => {
    for (const s of scholarships) {
      if (s.slug === "mofa-taiwan") continue;
      assert.doesNotMatch(s.pngEligibility, /\b\d+\s+(places?|awards?|scholarships?|quota)\b|\bone scholarship\b/i, s.slug);
    }
  });
});
