import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CHECKED, MAJORS } from "./catalog";
import {
  blankProfile,
  emptyState,
  mentorAdvice,
  validateState,
} from "./engine";
import {
  useWorkspace,
  PageHead,
  Icon,
  Modal,
  External,
  download,
  dateLabel,
} from "./components";
export function Profile() {
  const { state, setState, notify, setBlocked } = useWorkspace(),
    [draft, setDraft] = useState(() =>
      state.profile ? { ...state.profile } : blankProfile(),
    ),
    [error, setError] = useState(""),
    [imported, setImported] = useState(null),
    [reset, setReset] = useState(false),
    navigate = useNavigate(),
    file = useRef();
  const field = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    const profile = {
      ...draft,
      name: draft.name.trim(),
      hours: Number(draft.hours),
      age: Number(draft.age),
    };
    setState((s) => ({ ...s, profile }));
    notify("Your direction is saved.");
    navigate(`/discover?major=${encodeURIComponent(profile.major)}`);
  };
  const importFile = async (e) => {
    setError("");
    const chosen = e.target.files?.[0];
    if (!chosen) return;
    try {
      if (chosen.size > 1000000)
        throw new Error("Choose a MyGapMentor JSON backup smaller than 1 MB.");
      setImported(validateState(JSON.parse(await chosen.text())));
    } catch (err) {
      setError(
        err instanceof SyntaxError
          ? "This file is not valid JSON. Choose a MyGapMentor backup."
          : err.message,
      );
    }
    e.target.value = "";
  };
  const backup = () =>
    download(
      "mygapmentor-backup.json",
      JSON.stringify(state, null, 2),
      "application/json",
    );
  return (
    <>
      <PageHead
        eyebrow="YOUR PROFILE"
        title="Three details. Better matches."
        description="Choose a subject, then let us check the published age and enrollment requirements."
      />
      <form className="panel profile-form" onSubmit={submit}>
        <div className="section-title">
          <h2>Your starting point</h2>
          <span className="pill">Stays on this device</span>
        </div>
        <div className="form-grid">
          <label>
            Intended major
            <select
              value={draft.major}
              onChange={(e) => field("major", e.target.value)}
            >
              {MAJORS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Current stage
            <select
              value={draft.stage}
              onChange={(e) => field("stage", e.target.value)}
            >
              <option value="gap">High-school graduate / gap year</option>
              <option value="school">Still in high school</option>
              <option value="college">Enrolled in college</option>
            </select>
          </label>
          <label>
            Age
            <input
              type="number"
              required
              min="13"
              max="99"
              value={draft.age}
              onChange={(e) => field("age", e.target.value)}
            />
            <span className="field-hint">
              Used for published age requirements.
            </span>
          </label>
        </div>
        <details className="optional-fields">
          <summary>
            Optional preferences{" "}
            <span className="small quiet">Time, format &amp; goals</span>
          </summary>
          <div className="form-grid">
            <label>
              First name (optional)
              <input
                maxLength="60"
                autoComplete="given-name"
                value={draft.name}
                onChange={(e) => field("name", e.target.value)}
                placeholder="What should we call you?"
              />
            </label>
            <label>
              Country or region (optional)
              <input
                maxLength="80"
                value={draft.country}
                onChange={(e) => field("country", e.target.value)}
                placeholder="e.g. United States"
              />
              <span className="field-hint">
                For your notes. Country eligibility needs an organizer check.
              </span>
            </label>
            <label>
              Preferred format
              <select
                value={draft.format}
                onChange={(e) => field("format", e.target.value)}
              >
                <option value="Remote">Remote</option>
                <option value="Local">Local / in person</option>
                <option value="Any">Either</option>
              </select>
            </label>
          </div>

          <div className="form-grid">
            <label>
              Hours available each week
              <input
                required
                type="number"
                min="2"
                max="30"
                step="0.5"
                value={draft.hours}
                onChange={(e) => field("hours", e.target.value)}
              />
              <span className="field-hint">
                Include learning, making, and reflection.
              </span>
            </label>
            <label>
              Plan start date
              <input
                required
                type="date"
                min="2020-01-01"
                max="2100-01-01"
                value={draft.start}
                onChange={(e) => field("start", e.target.value)}
              />
            </label>
            <label className="wide">
              My main goal
              <select
                value={draft.goal}
                onChange={(e) => field("goal", e.target.value)}
              >
                {[
                  "Build a portfolio",
                  "Explore my major",
                  "Make a community contribution",
                ].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="check-label">
            <input
              type="checkbox"
              checked={draft.freeOnly}
              onChange={(e) => field("freeOnly", e.target.checked)}
            />
            Prioritize opportunities with free participation
          </label>
          <label>
            Interests, experience &amp; constraints (optional)
            <textarea
              rows="4"
              maxLength="1500"
              value={draft.notes}
              onChange={(e) => field("notes", e.target.value)}
              placeholder="What have you enjoyed? What have you already tried? What needs to fit around work or family commitments?"
            />
            <span className="field-hint">
              A personal note; the automatic plan uses your major, goal, format,
              and time budget.
            </span>
          </label>
        </details>
        <div className="actions">
          <button type="submit" className="button primary">
            Show my matches <Icon name="arrow" />
          </button>
          <span className="small quiet">
            No account, payment, or API key required.
          </span>
        </div>
      </form>
      <details className="panel data-panel optional-fields">
        <summary>Backup &amp; data settings</summary>
        <p>
          Your profile, plan, tracker, and evidence save in this browser. They
          do not sync between devices. Export a backup before clearing browser
          data or changing devices.
        </p>
        <div className="actions">
          <button className="button" onClick={backup}>
            Export backup
          </button>
          <button className="button" onClick={() => file.current.click()}>
            Import backup
          </button>
          <input
            className="sr-only"
            ref={file}
            type="file"
            accept=".json,application/json"
            onChange={importFile}
            aria-label="Import workspace backup"
          />
          <button
            className="text-button danger-text"
            onClick={() => setReset(true)}
          >
            Start a new workspace
          </button>
        </div>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
      </details>
      {imported && (
        <Modal title="Restore this backup?" onClose={() => setImported(null)}>
          <p>
            This replaces your current workspace with{" "}
            {Object.keys(imported.saved).length} saved opportunities,{" "}
            {imported.plan.length} tasks, and {imported.evidence.length}{" "}
            evidence entries.
          </p>
          <div className="actions">
            <button className="button" onClick={backup}>
              Back up current workspace
            </button>
            <button
              className="button primary"
              onClick={() => {
                setState(imported);
                setBlocked(false);
                setDraft(imported.profile || blankProfile());
                setImported(null);
                notify("Backup restored.");
              }}
            >
              Restore backup
            </button>
            <button className="button" onClick={() => setImported(null)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {reset && (
        <Modal title="Start a new workspace?" onClose={() => setReset(false)}>
          <p>
            This clears the profile, saved opportunities, tasks, and evidence
            from this browser. Export a backup first if you want to keep them.
          </p>
          <div className="actions">
            <button className="button" onClick={backup}>
              Export backup
            </button>
            <button
              className="button danger"
              onClick={() => {
                setState(emptyState());
                setBlocked(false);
                setDraft(blankProfile());
                setReset(false);
                notify("A fresh workspace is ready.");
              }}
            >
              Clear workspace
            </button>
            <button className="button" onClick={() => setReset(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export function Mentor() {
  const { state } = useWorkspace(),
    [topic, setTopic] = useState("start"),
    advice = mentorAdvice(topic, state.profile, state),
    [question, setQuestion] = useState(""),
    [answer, setAnswer] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    local = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const ask = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setAnswer("");
    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          major: state.profile?.major || "Undecided",
          hours: state.profile?.hours || 6,
          context: advice.text,
        }),
        signal: AbortSignal.timeout(90000),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      setAnswer(body.answer);
    } catch {
      setError(
        "The local model is unavailable. Start the local mentor server and Ollama using the repository instructions. The guide still works.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <PageHead
        eyebrow="MENTOR GUIDE"
        title="Find clarity before adding more."
        description="Practical guidance for your next decision, grounded in your direction and the work you’ve recorded."
      />
      <div className="mentor-layout">
        <div className="panel mentor-topics">
          <h2>What’s on your mind?</h2>
          {[
            ["start", "Where should I start?"],
            ["eligibility", "Am I eligible on a gap year?"],
            ["focus", "Am I taking on too much?"],
            ["evidence", "How do I describe my work?"],
            ["admissions", "Will this help my application?"],
          ].map(([id, label]) => (
            <button
              className={topic === id ? "active" : ""}
              key={id}
              aria-pressed={topic === id}
              onClick={() => setTopic(id)}
            >
              {label}
              <span>→</span>
            </button>
          ))}
          <p className="small quiet">
            A structured planning guide. No paid API, generated deadlines, or
            admission predictions.
          </p>
        </div>
        <section className="panel mentor-answer" aria-live="polite">
          <span className="eyebrow">A THOUGHTFUL NEXT STEP</span>
          <h2>{state.profile?.major || "Start with your interests"}</h2>
          <p>{advice.text}</p>
          <div className="actions">
            <Link
              className="button primary"
              to={state.profile ? "/plan" : "/profile"}
            >
              {state.profile ? "Open my plan" : "Set my direction"}{" "}
              <Icon name="arrow" />
            </Link>
            <Link to="/evidence">Open evidence log →</Link>
          </div>
          <hr />
          <h3>Related places to explore</h3>
          {advice.links.map((o) => (
            <Link
              className="resource-row"
              key={o.id}
              to={`/discover?op=${o.id}`}
            >
              <span>
                <strong>{o.title}</strong>
                <small>
                  {o.category} · {o.eligibilityLabel}
                </small>
              </span>
              <Icon name="arrow" />
            </Link>
          ))}
        </section>
      </div>
      {local && (
        <section className="panel local-model">
          <h2>Optional local AI mentor</h2>
          <p>
            Use an Ollama model on this computer. Only your question, major,
            weekly hours, and the guide above are sent to the local server.
            Review generated advice against official sources.
          </p>
          <form onSubmit={ask}>
            <label>
              Your question
              <textarea
                required
                minLength="5"
                maxLength="1500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Help me narrow my project to fit six hours a week."
              />
            </label>
            <button disabled={busy} className="button" type="submit">
              {busy ? "Thinking locally…" : "Ask local model"}
            </button>
          </form>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {answer && (
            <p className="preserve-lines" role="status">
              {answer}
            </p>
          )}
        </section>
      )}
    </>
  );
}
export function Guides() {
  return (
    <>
      <PageHead
        eyebrow="A MORE INTENTIONAL GAP YEAR"
        title="A useful workspace. A thoughtful process."
        description="Turn an interest into a manageable commitment and a record of real work."
      />
      <div className="guide-grid">
        <section className="panel">
          <span className="eyebrow">01 · DIRECTION</span>
          <h2>Choose depth over a long list.</h2>
          <p>
            Start with a question you care about. Pick one main project and one
            supporting activity. Learn, contribute, get feedback, and revise.
            Work and family responsibilities are meaningful parts of a year,
            too.
          </p>
          <Link to="/profile">Set your direction →</Link>
        </section>
        <section className="panel">
          <span className="eyebrow">02 · FIT</span>
          <h2>Read the requirements first.</h2>
          <p>
            Graduation and enrollment rules matter during a gap year. Check age,
            country, dates, cost, and whether a program is open to graduates.
            “Broadly accessible” does not guarantee acceptance.
          </p>
          <Link to="/discover">Explore the catalog →</Link>
        </section>
        <section className="panel">
          <span className="eyebrow">03 · ACTION</span>
          <h2>Make room for the work.</h2>
          <p>
            The planner allocates your weekly hours across learning, project
            work, and reflection. Edit tasks and dates as life changes. Calendar
            exports are personal targets; they do not register you or send
            reminders automatically.
          </p>
          <Link to="/plan">Open your plan →</Link>
        </section>
        <section className="panel">
          <span className="eyebrow">04 · REFLECTION</span>
          <h2>Tell the truth, specifically.</h2>
          <p>
            Record your own role and evidence. Distinguish simulations from
            employment, course participation from credit, and team outcomes from
            your contribution. No platform can guarantee admission.
          </p>
          <Link to="/evidence">Keep an evidence log →</Link>
        </section>
      </div>
      <section className="panel prose" id="privacy">
        <h2>Privacy, sources &amp; how this works</h2>
        <h3>Free by design</h3>
        <p>
          The core platform uses a curated catalog and a transparent planning
          engine. It does not require an AI subscription or API key. The mentor
          guide provides structured advice; it is not a live counselor or an
          admissions prediction model.
        </p>
        <h3>Saved in your browser</h3>
        <p>
          Your profile and activity records stay in local browser storage. There
          are no accounts, payments, cloud sync, or advertising trackers in this
          version. Others using the same browser profile can access the
          workspace. Clearing browser data removes it. Use Profile to export,
          restore, or delete your data.
        </p>
        <h3>Current sources, honest limits</h3>
        <p>
          Sources were reviewed on {dateLabel(CHECKED)}. MyGapMentor is not
          affiliated with the linked organizations. Programs can change after
          review. Each listing shows eligibility notes and a source link. Event
          dates are labeled separately from deadlines. Directories require
          checking each event’s rules. This curated catalog is not exhaustive or
          a live feed. Age and enrollment checks use your profile; country,
          citizenship, exceptions, and age-at-deadline rules need an organizer
          check. Suggested outputs and checklists are written by MyGapMentor.
        </p>
        <h3>Feedback &amp; corrections</h3>
        <p>
          Found an outdated listing or a problem? Include the program name and
          its official source when reporting it.
        </p>
        <div className="actions">
          <External href="https://github.com/Zhandolia/MyGapMentor/issues">
            Report an issue
          </External>
          <a href="mailto:mygapmentor@gmail.com">Email MyGapMentor</a>
        </div>
      </section>
    </>
  );
}
