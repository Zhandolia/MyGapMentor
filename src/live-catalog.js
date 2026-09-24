const text = (value, max) =>
  typeof value === "string" ? value.slice(0, max) : "";
const date = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
function url(value) {
  try {
    const parsed = new URL(value);
    return ["https:", "http:"].includes(parsed.protocol) &&
      !parsed.username &&
      !parsed.password
      ? parsed.href
      : "";
  } catch {
    return "";
  }
}
export function sanitizeRecord(raw) {
  if (!raw || typeof raw !== "object" || !date(raw.checked)) return null;
  if (!["mlh", "zooniverse"].includes(raw.provider)) return null;
  if (
    !new RegExp(
      raw.provider === "mlh" ? "^live-mlh-[a-f0-9]{20}$" : "^live-zoo-[0-9]+$",
    ).test(raw.id)
  )
    return null;
  const source = url(raw.source),
    target = url(raw.url);
  if (!target || !source || !text(raw.title, 180)) return null;
  if (
    raw.provider === "mlh" &&
    !/^https:\/\/www\.mlh\.com\/seasons\/\d{4}\/events$/.test(source)
  )
    return null;
  if (
    raw.provider === "zooniverse" &&
    (!/^https:\/\/www\.zooniverse\.org\/projects\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(
      source,
    ) ||
      target !== source)
  )
    return null;
  if (
    raw.provider === "mlh" &&
    (!date(raw.eventDate) || !date(raw.endDate) || raw.endDate < raw.eventDate)
  )
    return null;
  return {
    id: raw.id,
    title: text(raw.title, 180),
    provider: raw.provider,
    source,
    url: target,
    checked: raw.checked,
    sourceCheckedAt: raw.sourceCheckedAt,
    active: raw.active === true,
    eventDate: raw.provider === "mlh" ? raw.eventDate : undefined,
    endDate: raw.provider === "mlh" ? raw.endDate : undefined,
    format: raw.format === "Local" ? "Local" : "Remote",
    location: text(raw.location, 180),
    highSchool: raw.highSchool === true,
    tags: Array.isArray(raw.tags)
      ? raw.tags
          .filter((t) => typeof t === "string")
          .slice(0, 20)
          .map((t) => text(t, 40))
      : [],
  };
}
export function readFeed(raw) {
  if (
    !raw ||
    raw.version !== 1 ||
    !Array.isArray(raw.opportunities) ||
    raw.opportunities.length > 2500 ||
    !Number.isFinite(Date.parse(raw.generatedAt)) ||
    Date.parse(raw.generatedAt) > Date.now() + 86400000
  )
    throw new Error("Invalid catalog feed");
  const records = raw.opportunities.map(sanitizeRecord);
  if (
    records.some((r) => !r) ||
    new Set(records.map((r) => r.id)).size !== records.length
  )
    throw new Error("Invalid catalog records");
  const sources = {};
  for (const name of ["mlh", "zooniverse"]) {
    const source = raw.sources?.[name];
    sources[name] = {
      status: source?.status === "ok" ? "ok" : "error",
      lastSuccessAt: Number.isFinite(Date.parse(source?.lastSuccessAt))
        ? source.lastSuccessAt
        : null,
    };
  }
  return {
    version: 1,
    generatedAt: raw.generatedAt,
    sources,
    opportunities: records,
  };
}
function topics(record, majors) {
  if (record.provider === "mlh")
    return [
      "Computer Science",
      "Engineering",
      "Mathematics",
      "Fine Arts",
      "Business Administration",
    ];
  const words = (record.title + " " + record.tags.join(" ")).toLowerCase();
  const rules = [
    [
      /animal|bird|wild|biolog|ecolog|plant|nature|marine|biodivers/,
      ["Biology", "Environmental Science"],
    ],
    [/space|star|galax|planet|astro|solar|physics/, ["Physics", "Mathematics"]],
    [
      /history|histor|archive|transcri|manuscript|literat|handwrit/,
      ["History", "English", "Journalism"],
    ],
    [
      /climat|weather|ocean|environment|cloud|water/,
      ["Environmental Science", "Physics"],
    ],
    [
      /brain|neuro|psycholog|behavio|health|medical/,
      ["Biology", "Psychology", "Nursing"],
    ],
    [
      /math|statistic|data|algorithm|comput/,
      ["Mathematics", "Computer Science"],
    ],
    [/art|music|design/, ["Fine Arts", "Music"]],
    [/social|cultur|communit|language/, ["Sociology", "Communications"]],
  ];
  const result = [
    ...new Set(
      rules.filter(([re]) => re.test(words)).flatMap(([, list]) => list),
    ),
  ];
  return result;
}
export function liveOpportunity(input, majors) {
  const r = sanitizeRecord(input);
  if (!r) return null;
  const hack = r.provider === "mlh";
  return {
    ...r,
    feedRecord: r,
    feedActive: r.active,
    majors: topics(r, majors),
    keywords: r.tags.join(" ") + " " + r.location,
    organization: hack
      ? "Listed by Major League Hacking"
      : "Zooniverse research community",
    category: hack ? "Hackathon" : "Research participation",
    summary: hack
      ? `A hackathon listed in MLH’s current calendar${r.location ? " · " + r.location : ""}. Check registration with the organizer.`
      : "Contribute classifications to an active research project. Read its tutorial and choose a manageable first session.",
    eligibility: hack
      ? "Each event sets its own age, student/recent-graduate, location, and registration rules. The calendar date does not mean applications are open."
      : "The public feed lists this project as live with unfinished work. Check the project’s tutorial, language, account, and participation requirements before joining.",
    evidence: hack
      ? "A working demo, source repository, and an accurate account of your team contribution."
      : "A contribution log and a clear explanation of the research question, method, and uncertainty.",
    cost: hack ? "Check event" : "Free",
    review: true,
    minAge: 0,
    stages: r.highSchool ? ["school"] : undefined,
    status: hack ? "seasonal" : "ongoing",
    timing: hack
      ? `${r.eventDate}–${r.endDate} · event dates; check application deadline`
      : "Listed as active in the latest successful source refresh",
    commitment: hack
      ? "Event-specific schedule; check travel, equipment, and attendance requirements."
      : "Self-paced classifications; the project may pause when its available work is complete.",
    steps: hack
      ? [
          "Open the official event site and confirm eligibility, registration, and costs.",
          "Find teammates and agree on a small project you can finish during the event.",
          "Build and test your demo, then save the submission and your contribution notes.",
        ]
      : [
          "Read the project introduction and complete its classification tutorial.",
          "Contribute a careful first batch and ask about uncertain cases.",
          "Record your contribution and explain what the classifications help researchers investigate.",
        ],
  };
}
