import { readFeed, sanitizeRecord, liveOpportunity } from "./live-catalog";
import { MAJORS } from "./catalog";
import { match, emptyState, validateState, resolveOpportunity } from "./engine";
const record = {
  id: "live-zoo-999999999",
  title: "Galaxy classification",
  provider: "zooniverse",
  checked: "2026-09-24",
  source: "https://www.zooniverse.org/projects/test/galaxies",
  url: "https://www.zooniverse.org/projects/test/galaxies",
  active: true,
  tags: ["astronomy"],
  format: "Remote",
};
test("only recognized feed sources and safe URLs are accepted", () => {
  expect(sanitizeRecord(record)).toBeTruthy();
  expect(
    sanitizeRecord({ ...record, source: "https://example.com" }),
  ).toBeNull();
  expect(sanitizeRecord({ ...record, url: "javascript:alert(1)" })).toBeNull();
  expect(sanitizeRecord({ ...record, id: "nasa-ostem" })).toBeNull();
  expect(sanitizeRecord({ ...record, checked: "2026-02-30" })).toBeNull();
});
test("malformed, duplicate and future-dated feeds cannot replace a good snapshot", () => {
  const feed = {
    version: 1,
    generatedAt: "2026-09-24T00:00:00Z",
    sources: {},
    opportunities: [record],
  };
  expect(readFeed(feed).opportunities).toHaveLength(1);
  expect(() =>
    readFeed({ ...feed, opportunities: [record, record] }),
  ).toThrow();
  expect(() => readFeed({ ...feed, opportunities: [null] })).toThrow();
  expect(() =>
    readFeed({ ...feed, generatedAt: "2099-01-01T00:00:00Z" }),
  ).toThrow();
});
test("inactive and stale listings do not appear as available", () => {
  const op = liveOpportunity(record, MAJORS);
  expect(match(op, null, "2026-09-24").blocked).toBe(false);
  expect(match(op, null, "2026-10-02").eligibilityLabel).toBe(
    "Source refresh overdue",
  );
  expect(match({ ...op, feedActive: false }, null, "2026-09-24").blocked).toBe(
    true,
  );
  expect(op.majors).toContain("Physics");
  expect(
    liveOpportunity({ ...record, title: "Uncategorized", tags: [] }, MAJORS)
      .majors,
  ).toEqual([]);
});
test("saved live opportunities survive feed retirement and backup restoration", () => {
  const state = emptyState();
  state.saved[record.id] = {
    status: "Preparing",
    notes: "Keep my work",
    stepsDone: [1],
    snapshot: record,
  };
  const restored = validateState(JSON.parse(JSON.stringify(state)));
  expect(restored.saved[record.id].notes).toBe("Keep my work");
  expect(restored.saved[record.id].stepsDone).toEqual([1]);
  expect(resolveOpportunity(record.id, restored.saved).feedActive).toBe(false);
});
