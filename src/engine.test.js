import { MAJORS, opportunities } from "./catalog";
import {
  addDays,
  blankProfile,
  calendar,
  createPlan,
  emptyState,
  match,
  ranked,
  safeUrl,
  validateState,
} from "./engine";
test("age restrictions and ended events do not rank as available", () => {
  const p = { ...blankProfile(), age: 17 };
  expect(
    match(
      opportunities.find((o) => o.id === "unv"),
      p,
    ).blocked,
  ).toBe(true);
  expect(
    match(
      opportunities.find((o) => o.id === "space-apps"),
      p,
      "2026-11-16",
    ).blocked,
  ).toBe(true);
  expect(
    match(
      opportunities.find((o) => o.id === "usaco"),
      p,
    ).eligibilityLabel,
  ).toBe("Check specific rules");
});
test.each(MAJORS)(
  "%s gets a relevant source and a budget-respecting 12 week plan",
  (major) => {
    const p = { ...blankProfile(), major, hours: 2, start: "2026-12-28" };
    expect(ranked(p).some((o) => !o.blocked && o.majors.includes(major))).toBe(
      true,
    );
    const tasks = createPlan(p);
    expect(tasks).toHaveLength(36);
    for (let week = 1; week <= 12; week++)
      expect(
        tasks.filter((t) => t.week === week).reduce((n, t) => n + t.hours, 0),
      ).toBe(2);
    expect(tasks[0].date).toBe("2026-12-30");
    expect(tasks[35].date).toBe("2027-03-21");
  },
);
test("planner does not choose an age-restricted program or closed seasonal application as an active assignment", () => {
  const tasks = createPlan(
    { ...blankProfile(), age: 17, major: "Political Science" },
    { unv: { status: "Shortlisted" } },
  );
  expect(
    tasks.some((t) => t.opportunityId === "unv" || t.opportunityId === "gsoc"),
  ).toBe(false);
});
test("calendar escapes injected fields, preserves all-day dates and folds UTF-8", () => {
  const data = calendar([
    {
      id: "x",
      date: "2026-12-31",
      title: "A, B; C\nEND:VEVENT",
      description: "é".repeat(100),
    },
  ]);
  expect(data).toContain("DTEND;VALUE=DATE:20270101");
  expect(data).toContain("SUMMARY:A\\, B\\; C\\nEND:VEVENT");
  expect(
    data.split("\r\n").filter((line) => line === "END:VEVENT"),
  ).toHaveLength(1);
  for (const line of data.split("\r\n"))
    expect(unescape(encodeURIComponent(line)).length).toBeLessThanOrEqual(75);
  expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
});
test("backup sanitizes URLs, rejects unsupported versions, and ignores unknown saved IDs", () => {
  const s = emptyState();
  s.saved = {
    unv: { status: "forged", notes: "hi", due: "2026-02-31" },
    unknown: {},
  };
  s.evidence = [{ title: "Test", url: "javascript:alert(1)", hours: -20 }];
  const valid = validateState(s);
  expect(valid.saved.unv.status).toBe("Shortlisted");
  expect(valid.saved.unv.due).toBe("");
  expect(valid.saved.unknown).toBeUndefined();
  expect(valid.evidence[0].url).toBe("");
  expect(valid.evidence[0].hours).toBe(0);
  expect(() => validateState({ ...s, version: 999 })).toThrow();
  expect(safeUrl("https://user:password@example.com")).toBe("");
});
test("catalog IDs are unique and all entries have primary source links and review dates", () => {
  expect(new Set(opportunities.map((o) => o.id)).size).toBe(
    opportunities.length,
  );
  opportunities.forEach((o) => {
    expect(safeUrl(o.source || o.url)).toMatch(/^https:/);
    expect(o.checked).toBe("2026-09-24");
  });
});
test("backup validation preserves stable IDs and rejects invalid entries", () => {
  const state = emptyState();
  state.profile = blankProfile();
  state.plan = createPlan(state.profile);
  state.evidence = [
    {
      id: "entry-123",
      title: "Work",
      date: "2026-09-24",
      hours: 1,
      notes: "",
      url: "",
    },
  ];
  const once = validateState(state),
    twice = validateState(once);
  expect(twice).toEqual(once);
  expect(once.plan[0].id).toBe(state.plan[0].id);
  expect(() => validateState({ ...state, evidence: [null] })).toThrow(
    "invalid entry",
  );
});
test("full-time commitments are not scheduled into a part-time week", () => {
  const nccc = opportunities.find((o) => o.id === "nccc");
  expect(match(nccc, { ...blankProfile(), age: 25 }).blocked).toBe(true);
  const tasks = createPlan(
    {
      ...blankProfile(),
      major: "Environmental Science",
      format: "Local",
      hours: 6,
      age: 19,
    },
    { nccc: { status: "Shortlisted" } },
  );
  expect(tasks.some((t) => t.opportunityId === "nccc")).toBe(false);
});
