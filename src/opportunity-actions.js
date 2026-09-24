const actions = {
  "by-the-people": [
    "Choose a Library of Congress campaign and read its transcription guide.",
    "Transcribe a page and review another when your account permits.",
    "Save the page links and explain what the primary sources reveal.",
  ],
  librivox: [
    "Read the recording guide and choose an available project.",
    "Submit a short test recording and use the community feedback.",
    "Record an assigned section and retain the approved public recording link.",
  ],
  idealist: [
    "Filter internships by location, cause, and compensation.",
    "Verify one employer’s eligibility, duties, hours, and current deadline.",
    "Tailor your resume and submit through the employer’s official process.",
  ],
  "mlh-fellowship": [
    "Check the cohort dates, age rules, coding requirements, and time zones.",
    "Prepare a working code sample and explain your own contribution.",
    "Complete the application and plan for the published interview process.",
  ],
  nccc: [
    "Check your age, citizenship or residence status, and the selected NCCC track.",
    "Review the full-time commitment, living arrangements, benefits, and start date.",
    "Prepare the application and confirm practical questions with the program.",
  ],
  "space-apps": [
    "Choose a participating location or virtual option and read its registration rules.",
    "Find teammates and explore a NASA data challenge together.",
    "Build a small prototype and document the data, code, demo, and team roles.",
  ],
  usaco: [
    "Read contest instructions and start at a suitable practice level.",
    "Solve a small set of archived problems without outside solutions.",
    "Review mistakes and enter a live contest only under its participation rules.",
  ],
  euler: [
    "Choose an introductory mathematical programming problem.",
    "Derive an approach and test your own implementation.",
    "Keep private notes on proof, efficiency, and mistakes; respect solution-sharing rules.",
  ],
  unv: [
    "Confirm you meet the age requirement and choose an active assignment.",
    "Check the host’s requested skills, deliverable, hours, and dates.",
    "Apply with a relevant sample and agree on a clear output if selected.",
  ],
  zooniverse: [
    "Choose an active project and complete its classification tutorial.",
    "Contribute a careful first batch and use the discussion board for uncertainty.",
    "Keep a contribution record and explain the underlying research question.",
  ],
  maps: [
    "Read the beginner mapping guidance and set up the required account.",
    "Choose a beginner-friendly task and follow its mapping instructions.",
    "Review validation feedback and record your corrected contributions.",
  ],
  proofread: [
    "Read the proofreading guidelines and try the practice pages.",
    "Choose a beginner project and proofread against the scanned original.",
    "Use feedback to improve accuracy and retain a contribution record.",
  ],
  inaturalist: [
    "Learn the observation and identification guidelines.",
    "Upload an accurately located observation with useful supporting photos.",
    "Review community identifications and build a local biodiversity journal.",
  ],
  forage: [
    "Choose a job simulation relevant to a career question you have.",
    "Complete a task before comparing your work with the example answer.",
    "Summarize what you learned and label it as a simulation on your portfolio.",
  ],
  ocw: [
    "Select one course and check prerequisites and available assignments.",
    "Work through a lecture and attempt its corresponding problems.",
    "Create an original project or explanation that applies the material.",
  ],
  openlearn: [
    "Choose a course with a level and duration that fit your goals.",
    "Complete its activities and reflect on what remains unclear.",
    "Apply one concept in a small project and accurately label any completion statement.",
  ],
  devpost: [
    "Find an upcoming hackathon in your subject area.",
    "Check age, location, team, intellectual-property, and submission rules.",
    "Scope a feasible demo and record the official deadline in your own calendar.",
  ],
  mlh: [
    "Choose an event from the current MLH season calendar.",
    "Check that event’s student or recent-graduate rules and travel costs.",
    "Register if eligible and prepare teammates, tools, and a manageable project idea.",
  ],
  gsoc: [
    "Review contributor eligibility and the official cycle timeline.",
    "Choose a mentoring organization, build its project, and make a useful contribution.",
    "Discuss a feasible proposal with the community when the next application round opens.",
  ],
  kaggle: [
    "Select a competition and read its specific eligibility and data rules.",
    "Build a reproducible baseline with a sound validation split.",
    "Investigate errors and publish only material allowed by the competition rules.",
  ],
};
const commitments = {
  "mlh-fellowship":
    "20 hours/week for 12 weeks; check cohort and time-zone requirements.",
  nccc: "Full-time residential service, generally 10–11 months; track rules vary.",
  "space-apps": "Event weekend: November 14–15, 2026; allow preparation time.",
  gsoc: "Project scopes and schedules vary by cycle; 2026 applications have closed.",
  unv: "Assignment-specific, up to 20 hours/week for up to 12 weeks under UNV terms.",
};
export function enrichOpportunity(op) {
  return {
    ...op,
    source: op.source || op.url,
    keywords:
      op.keywords ||
      {
        usaco: "olympiad competitive programming algorithms",
        euler: "olympiad mathematics practice",
        "space-apps": "nasa hackathon space data",
        gsoc: "google summer programming coding mentorship",
        schoolhouse: "teaching tutor volunteer",
        "by-the-people": "volunteer archive humanities",
      }[op.id] ||
      "",
    commitment:
      op.commitment ||
      commitments[op.id] ||
      (op.review
        ? "Check the selected assignment or event’s required hours before committing."
        : "Self-paced; begin with one manageable session."),
    steps: op.steps ||
      actions[op.id] || [
        "Read the official instructions and confirm participation requirements.",
        "Choose one manageable task and complete the introductory guidance.",
        "Make a first contribution and record its result and feedback.",
      ],
  };
}
