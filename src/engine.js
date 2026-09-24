import { MAJORS, PROJECTS, opportunities } from "./catalog";
import { liveOpportunity, sanitizeRecord } from "./live-catalog";

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const addDays = (date, days) => {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
export const validDate = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
export const safeUrl = (value) => {
  try {
    const u = new URL(value);
    return ["https:", "http:"].includes(u.protocol) &&
      !u.username &&
      !u.password
      ? u.href
      : "";
  } catch {
    return "";
  }
};
export const blankProfile = () => ({
  name: "",
  major: "Computer Science",
  age: 18,
  stage: "gap",
  country: "",
  hours: 6,
  format: "Remote",
  freeOnly: true,
  goal: "Build a portfolio",
  start: today(),
  notes: "",
});
export const emptyState = () => ({
  version: 1,
  profile: null,
  saved: {},
  plan: [],
  planMajor: "",
  evidence: [],
});
export const STATUSES = [
  "Shortlisted",
  "Preparing",
  "Applied",
  "In progress",
  "Completed",
];
export function match(op, profile, now = today()) {
  const p = profile || blankProfile();
  const ageKnown = profile && Number.isFinite(profile.age);
  const blocked =
    ageKnown && (p.age < op.minAge || (op.maxAge && p.age > op.maxAge));
  const stageConflict =
    profile?.stage && op.stages && !op.stages.includes(profile.stage);
  const ended = op.endDate && op.endDate < now;
  const cycleClosed = !!(op.deadline && op.deadline < now);
  const staleFeed =
    !!op.provider && (!op.checked || addDays(op.checked, 7) < now);
  const inactive = op.feedActive === false;
  const reasons = [];
  let score = 0;
  if (op.majors.includes(p.major)) {
    score += op.majors.length === MAJORS.length ? 12 : 40;
    reasons.push(
      op.provider ? `Suggested topic: ${p.major}` : `Relevant to ${p.major}`,
    );
  }
  if (op.format === p.format || p.format === "Any") {
    score += 10;
    reasons.push(`${op.format} format`);
  }
  if (op.cost === "Free") {
    score += 8;
    reasons.push("Free participation");
  }
  if (op.category === "Course" && p.goal === "Explore my major") score += 12;
  if (
    op.category === "Volunteering" &&
    p.goal === "Make a community contribution"
  )
    score += 18;
  if (
    ["Hackathon", "Open source", "Research participation"].includes(
      op.category,
    ) &&
    p.goal === "Build a portfolio"
  )
    score += 12;
  if (op.status === "next-cycle" || cycleClosed) score -= 18;
  if (op.provider) score -= 16;
  if (op.minHours && p.hours < op.minHours) {
    score -= 25;
    reasons.push("Exceeds your weekly time budget");
  }
  const eligibility = inactive
    ? "No longer listed as active"
    : staleFeed
      ? "Source refresh overdue"
      : blocked
        ? op.maxAge
          ? `Published ages ${op.minAge}–${op.maxAge}`
          : `Requires age ${op.minAge}+`
        : stageConflict
          ? op.stages.includes("college")
            ? "Requires college enrollment"
            : "Requires high-school enrollment"
          : ended
            ? "Event has ended"
            : cycleClosed
              ? "Applications closed"
              : op.status === "next-cycle"
                ? "Future cycle"
                : !ageKnown && (op.minAge || op.maxAge || op.stages)
                  ? "Check age & enrollment"
                  : op.review
                    ? "Check specific rules"
                    : "Broadly accessible";
  return {
    ...op,
    score:
      blocked || ended || stageConflict || inactive || staleFeed ? -100 : score,
    reasons,
    blocked: !!(blocked || ended || stageConflict || inactive || staleFeed),
    cycleClosed,
    eligibilityLabel: eligibility,
  };
}
export function resolveOpportunity(id, saved = {}) {
  return (
    opportunities.find((op) => op.id === id) ||
    (saved[id]?.snapshot
      ? liveOpportunity({ ...saved[id].snapshot, active: false }, MAJORS)
      : null)
  );
}
export function searchMatches(op, query) {
  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => (w.length > 4 ? w.replace(/s$/, "") : w));
  const aliases = {
    coding: "programming",
    olympiad: "olympiad",
    camp: "summer",
    ai: "ai",
    volunteering: "volunteer",
  };
  const tokens = normalize(
    `${op.title} ${op.organization} ${op.category} ${op.summary} ${op.majors.join(" ")} ${op.keywords || ""}`,
  ).map((w) => aliases[w] || w);
  return normalize(query)
    .filter((w) => !["a", "an", "the", "for", "in", "and"].includes(w))
    .every((w) => tokens.some((t) => t.includes(aliases[w] || w)));
}
export const ranked = (profile, now) =>
  opportunities
    .map((op) => match(op, profile, now))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
export function createPlan(profile, saved = {}) {
  const options = ranked(profile).filter(
    (op) =>
      !op.blocked &&
      op.status === "ongoing" &&
      op.cost === "Free" &&
      op.majors.includes(profile.major) &&
      !op.eventDate &&
      (!op.minHours || op.minHours <= profile.hours) &&
      !op.category.endsWith("directory") &&
      (profile.format === "Any" || op.format === profile.format),
  );
  const selected =
    options.find((op) => saved[op.id] && op.category !== "Course") ||
    options.find((op) => op.category !== "Course") ||
    options[0];
  const title = selected?.title || "an independent project";
  const phases = [
    [
      "Choose a useful question",
      `Read the requirements for ${title}. Confirm eligibility and choose one manageable starting activity.`,
      "Write a one-paragraph project question and define what finished will look like.",
    ],
    [
      "Build your foundation",
      "Complete an introductory tutorial or a relevant lesson. Keep notes on what is still unclear.",
      "Create a first outline, sketch, or working experiment for your project.",
    ],
    [
      "Make a first contribution",
      `Try a small activity through ${title}. Save evidence of what you actually did.`,
      "Develop the smallest useful version of your independent project.",
    ],
    [
      "Review the first month",
      "Review what you learned. Drop an activity if it is a poor fit, and record why.",
      "Ask one suitable person for specific feedback on your first version.",
    ],
    [
      "Work consistently",
      `Continue ${title} or your verified alternative. Focus on one skill to improve.`,
      "Revise your project using the feedback you received.",
    ],
    [
      "Explain your method",
      "Read two reliable sources related to your project question and cite them.",
      "Write down your process so another person could understand or reproduce it.",
    ],
    [
      "Test your assumptions",
      "Compare your work with a strong example and identify one concrete weakness.",
      "Test or critique your project. Record limitations and unexpected findings.",
    ],
    [
      "Review the second month",
      "Review time spent, skills learned, and remaining gaps. Adjust your scope.",
      "Produce a second version with a clear explanation of what changed.",
    ],
    [
      "Make the work useful",
      "Identify who could benefit from the work and what format they need.",
      "Create a clear, accessible version for that audience.",
    ],
    [
      "Get an outside perspective",
      "Ask a teacher, peer, or community partner for focused feedback.",
      "Address the most important feedback and document your decisions.",
    ],
    [
      "Document your contribution",
      "Organize dated evidence, links, and notes. Credit collaborators accurately.",
      "Write a short case study: question, actions, result, limitations, next steps.",
    ],
    [
      "Reflect and plan ahead",
      "Review your progress and choose one next step that follows from what you learned.",
      "Prepare an honest activity description with your role, time, output, and impact.",
    ],
  ];
  const hours = Math.max(2, Math.min(30, Number(profile.hours)));
  const reflection = 0.5;
  const learn = Math.floor((hours - reflection) * 0.4 * 2) / 2;
  const project = hours - reflection - learn;
  return phases.flatMap(([phase, learning, building], w) => [
    {
      id: `w${w + 1}-learn`,
      week: w + 1,
      phase,
      title: learning,
      hours: learn,
      date: addDays(profile.start, w * 7 + 2),
      done: false,
      opportunityId: [0, 2, 4].includes(w) ? selected?.id || "" : "",
    },
    {
      id: `w${w + 1}-build`,
      week: w + 1,
      phase,
      title: building,
      hours: project,
      date: addDays(profile.start, w * 7 + 5),
      done: false,
      opportunityId: "",
    },
    {
      id: `w${w + 1}-reflect`,
      week: w + 1,
      phase,
      title: "Log your work, hours, and one thing you learned.",
      hours: reflection,
      date: addDays(profile.start, w * 7 + 6),
      done: false,
      opportunityId: "",
    },
  ]);
}
const text = (v, max = 1000) => (typeof v === "string" ? v.slice(0, max) : "");
export function validateState(raw) {
  if (
    !raw ||
    raw.version !== 1 ||
    !Array.isArray(raw.plan) ||
    !Array.isArray(raw.evidence) ||
    !raw.saved ||
    typeof raw.saved !== "object" ||
    Array.isArray(raw.saved)
  )
    throw new Error("This is not a MyGapMentor backup (version 1).");
  if (
    raw.plan.length > 200 ||
    raw.evidence.length > 500 ||
    Object.keys(raw.saved).length > 100
  )
    throw new Error("This backup is too large.");
  const state = emptyState();
  if (raw.profile) {
    const p = raw.profile;
    if (
      !MAJORS.includes(p.major) ||
      !validDate(p.start) ||
      !Number.isFinite(Number(p.hours)) ||
      !Number.isFinite(Number(p.age))
    )
      throw new Error("The profile contains invalid values.");
    state.profile = {
      ...blankProfile(),
      name: text(p.name, 60),
      major: p.major,
      age: Math.max(13, Math.min(99, Number(p.age))),
      hours: Math.max(2, Math.min(30, Number(p.hours))),
      stage: ["gap", "school", "college"].includes(p.stage) ? p.stage : "gap",
      country: text(p.country, 80),
      format: ["Remote", "Local", "Any"].includes(p.format)
        ? p.format
        : "Remote",
      freeOnly: p.freeOnly !== false,
      goal: [
        "Build a portfolio",
        "Explore my major",
        "Make a community contribution",
      ].includes(p.goal)
        ? p.goal
        : "Build a portfolio",
      start: p.start,
      notes: text(p.notes, 1500),
    };
  }
  for (const [id, s] of Object.entries(raw.saved)) {
    const snapshot = sanitizeRecord(s?.snapshot);
    const op =
      opportunities.find((o) => o.id === id) ||
      (snapshot?.id === id ? liveOpportunity(snapshot, MAJORS) : null);
    if (!op) continue;
    if (s && typeof s === "object")
      state.saved[op.id] = {
        status: STATUSES.includes(s.status) ? s.status : "Shortlisted",
        notes: text(s.notes, 2000),
        due: validDate(s.due) ? s.due : "",
        url: safeUrl(text(s.url, 1000)),
        ...(op.feedRecord ? { snapshot: op.feedRecord } : {}),
        stepsDone: Array.isArray(s.stepsDone)
          ? [
              ...new Set(
                s.stepsDone.filter(
                  (i) => Number.isInteger(i) && i >= 0 && i < op.steps.length,
                ),
              ),
            ]
          : [],
      };
  }
  if (
    raw.plan.some((t) => !t || typeof t !== "object") ||
    raw.evidence.some((e) => !e || typeof e !== "object")
  )
    throw new Error("This backup contains an invalid entry.");
  const taskIds = new Set(),
    entryIds = new Set();
  const uniqueId = (id, prefix, i, seen) => {
    let value =
      typeof id === "string" && /^[a-zA-Z0-9-]{1,100}$/.test(id)
        ? id
        : `${prefix}-${i}`;
    while (seen.has(value)) value += "-copy";
    seen.add(value);
    return value;
  };
  state.plan = raw.plan.map((t, i) => ({
    id: uniqueId(t.id, "task", i, taskIds),
    week: Math.max(1, Math.min(12, Number(t.week) || 1)),
    phase: text(t.phase, 100),
    title: text(t.title, 500),
    hours: Math.max(0.5, Math.min(30, Number(t.hours) || 1)),
    date: validDate(t.date) ? t.date : today(),
    done: t.done === true,
    opportunityId: opportunities.some((op) => op.id === t.opportunityId)
      ? t.opportunityId
      : "",
  }));
  state.planMajor = MAJORS.includes(raw.planMajor) ? raw.planMajor : "";
  state.evidence = raw.evidence.map((e, i) => ({
    id: uniqueId(e.id, "evidence", i, entryIds),
    title: text(e.title, 150),
    date: validDate(e.date) ? e.date : today(),
    hours: Math.max(0, Math.min(168, Number(e.hours) || 0)),
    notes: text(e.notes, 2000),
    url: safeUrl(text(e.url, 1000)),
  }));
  return state;
}
export function calendar(events) {
  const escape = (value) =>
    String(value)
      .replace(/\\/g, "\\\\")
      .replace(/\r\n|\r|\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MyGapMentor//Planner//EN",
    "CALSCALE:GREGORIAN",
  ];
  events
    .filter((e) => validDate(e.date))
    .forEach((e, i) =>
      lines.push(
        "BEGIN:VEVENT",
        `UID:${escape(e.id || i)}-${e.date}@mygapmentor`,
        `DTSTAMP:${new Date()
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "")}`,
        `DTSTART;VALUE=DATE:${e.date.replace(/-/g, "")}`,
        `DTEND;VALUE=DATE:${addDays(e.date, 1).replace(/-/g, "")}`,
        `SUMMARY:${escape(e.title)}`,
        `DESCRIPTION:${escape(e.description || "Personal planning target. Confirm program deadlines with the official source.")}`,
        "END:VEVENT",
      ),
    );
  lines.push("END:VCALENDAR");
  // RFC 5545 line folding, at most 75 UTF-8 octets per physical line.
  return (
    lines
      .map((line) => {
        let parts = [],
          part = "",
          bytes = 0;
        for (const ch of line) {
          const size = new TextEncoder().encode(ch).length;
          if (bytes + size > 74) {
            parts.push(part);
            part = " ";
            bytes = 1;
          }
          part += ch;
          bytes += size;
        }
        parts.push(part);
        return parts.join("\r\n");
      })
      .join("\r\n") + "\r\n"
  );
}
export function mentorAdvice(topic, profile, state) {
  const p = profile || blankProfile();
  const matches = ranked(p)
    .filter(
      (op) =>
        !op.blocked &&
        op.majors.includes(p.major) &&
        (!p.freeOnly || op.cost === "Free"),
    )
    .slice(0, 3);
  const answers = {
    start: `Start with one sustained project and one supporting activity. For ${p.major}, try this: ${PROJECTS[p.major]} With ${p.hours} hours each week, protect a regular work block and leave time to reflect. Your plan turns this into 12 weeks of concrete tasks.`,
    eligibility: `Being on a gap year does not automatically make you eligible for student programs. Check graduation date, enrollment, age, country, and any consent requirements on the organizer’s page. “Broadly accessible” is a useful starting point, not an admission decision. Directories always need a second check for the specific event.`,
    focus: `You have ${Object.keys(state.saved).length} saved opportunities. Choose one main commitment you can sustain within ${p.hours} hours a week. Favor a clear role, feedback, and a tangible output over collecting certificates. Stop or resize an activity that crowds out meaningful work or rest.`,
    evidence: `Use this structure: “I [specific action] for [audience or question], contributing [your role] over [actual time]. The result was [documented outcome]. I learned [specific insight].” Your evidence log has ${state.evidence.length} entries. Use only outcomes you can support; do not present a simulation as an internship or group results as your own.`,
    admissions: `No activity list can guarantee admission. Use your gap year to investigate a real interest, contribute to others, and produce work you can explain honestly. Check each university’s gap-year, first-year applicant, testing, and deferral policies directly. The planner organizes your work; it does not predict an admission outcome.`,
  };
  return { text: answers[topic] || answers.start, links: matches };
}
