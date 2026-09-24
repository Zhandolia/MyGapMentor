import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, opportunities } from "./catalog";
import { calendar, createPlan, safeUrl, STATUSES, today } from "./engine";
import {
  useWorkspace,
  PageHead,
  Empty,
  Icon,
  Task,
  Modal,
  External,
  download,
} from "./components";
export function Plan() {
  const { state, setState, toggleTask, notify } = useWorkspace(),
    [confirm, setConfirm] = useState(false),
    [week, setWeek] = useState("All weeks"),
    p = state.profile,
    done = state.plan.filter((t) => t.done).length;
  const generate = () => {
    setState((s) => ({
      ...s,
      plan: createPlan(s.profile, s.saved),
      planMajor: s.profile.major,
    }));
    setConfirm(false);
    notify("Your 12-week plan is ready.");
  };
  if (!p)
    return (
      <>
        <PageHead
          eyebrow="MY PLAN"
          title="Give your ambitions a weekly rhythm."
          description="A useful plan starts with the time you actually have."
        />
        <Empty
          title="Set your direction first."
          action={
            <Link className="button primary" to="/profile">
              Create your profile
            </Link>
          }
        >
          Choose a major, a goal, and a realistic weekly time budget.
        </Empty>
      </>
    );
  return (
    <>
      <PageHead
        eyebrow="MY PLAN"
        title="Small steps. Substantial work."
        description="A 12-week starting plan you can adapt. Dates are personal work targets, not program deadlines."
      >
        <button
          className="button"
          onClick={() => (state.plan.length ? setConfirm(true) : generate())}
        >
          {state.plan.length ? "Rebuild plan" : "Create my plan"}
        </button>
        {state.plan.length > 0 && (
          <button
            className="button"
            onClick={() =>
              download(
                "mygapmentor-plan.ics",
                calendar(
                  state.plan
                    .filter((t) => !t.done)
                    .map((t) => ({
                      ...t,
                      title: `MyGapMentor: ${t.title}`,
                      description: `${t.hours} hours. Personal work target.`,
                    })),
                ),
                "text/calendar",
              )
            }
          >
            Export calendar
          </button>
        )}
      </PageHead>
      <div className="panel project-brief">
        <span className="eyebrow">
          YOUR INDEPENDENT PROJECT · {state.planMajor || p.major}
        </span>
        <h2>Make something you can explain.</h2>
        <p>{PROJECTS[state.planMajor || p.major]}</p>
        <div className="tags">
          <span>{p.hours} hours / week in your profile</span>
          <span>{p.goal}</span>
        </div>
      </div>
      {state.planMajor && state.planMajor !== p.major && (
        <div className="notice warning">
          Your profile major changed. Rebuild the plan when you’re ready to
          replace the existing tasks.
        </div>
      )}
      {state.plan.length > 0 ? (
        <>
          <div className="plan-summary">
            <div>
              <strong>
                {done} of {state.plan.length} tasks completed
              </strong>
              <progress
                value={done}
                max={state.plan.length}
                aria-label="Plan completion"
              />
            </div>
            <label>
              Show week
              <select value={week} onChange={(e) => setWeek(e.target.value)}>
                <option>All weeks</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={String(i + 1)}>
                    Week {i + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="week-list">
            {Array.from({ length: 12 }, (_, i) => i + 1)
              .filter((w) => week === "All weeks" || String(w) === week)
              .map((w) => {
                const tasks = state.plan.filter((t) => t.week === w);
                return (
                  <section className="panel week" key={w}>
                    <header>
                      <div className="week-number">
                        {String(w).padStart(2, "0")}
                      </div>
                      <div>
                        <span className="eyebrow">
                          WEEK {w} · {tasks.reduce((n, t) => n + t.hours, 0)}{" "}
                          HOURS
                        </span>
                        <h2>{tasks[0]?.phase || "Your next steps"}</h2>
                      </div>
                      <span className="quiet small">
                        {tasks.filter((t) => t.done).length}/{tasks.length} done
                      </span>
                    </header>
                    {tasks.map((t) => (
                      <div className="task-with-edit" key={t.id}>
                        <Task task={t} toggle={() => toggleTask(t.id)} />
                        <details>
                          <summary>Edit task</summary>
                          <label>
                            Task
                            <textarea
                              maxLength="500"
                              value={t.title}
                              onChange={(e) =>
                                setState((s) => ({
                                  ...s,
                                  plan: s.plan.map((x) =>
                                    x.id === t.id
                                      ? { ...x, title: e.target.value }
                                      : x,
                                  ),
                                }))
                              }
                            />
                          </label>
                          <label>
                            Target date
                            <input
                              type="date"
                              value={t.date}
                              onChange={(e) => {
                                if (e.target.value)
                                  setState((s) => ({
                                    ...s,
                                    plan: s.plan.map((x) =>
                                      x.id === t.id
                                        ? { ...x, date: e.target.value }
                                        : x,
                                    ),
                                  }));
                              }}
                            />
                          </label>
                          {t.opportunityId && (
                            <Link to={`/discover?op=${t.opportunityId}`}>
                              Read opportunity details →
                            </Link>
                          )}
                        </details>
                      </div>
                    ))}
                  </section>
                );
              })}
          </div>
        </>
      ) : (
        <Empty
          title="Ready for your first week?"
          action={
            <button className="button primary" onClick={generate}>
              Generate 12-week plan
            </button>
          }
        >
          The plan fits your time budget and includes learning, project work,
          and reflection.
        </Empty>
      )}
      {confirm && (
        <Modal title="Rebuild your plan?" onClose={() => setConfirm(false)}>
          <p>
            This replaces your current tasks and completion history using your
            latest profile. Your tracker and evidence log stay intact.
          </p>
          <div className="actions">
            <button className="button" onClick={() => setConfirm(false)}>
              Keep current plan
            </button>
            <button
              className="button"
              onClick={() =>
                download(
                  "mygapmentor-backup.json",
                  JSON.stringify(state, null, 2),
                  "application/json",
                )
              }
            >
              Export backup first
            </button>
            <button className="button primary" onClick={generate}>
              Replace plan
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export function Tracker() {
  const { state, setState, updateSaved, notify } = useWorkspace(),
    [filter, setFilter] = useState("All"),
    [remove, setRemove] = useState(null),
    entries = Object.entries(state.saved).filter(
      ([, s]) => filter === "All" || s.status === filter,
    ),
    dates = Object.entries(state.saved).filter(
      ([, s]) => s.due && s.status !== "Completed",
    );
  return (
    <>
      <PageHead
        eyebrow="MY TRACKER"
        title="From interesting to in progress."
        description="Keep your shortlist small, your next steps clear, and your own target dates in one place."
      >
        <Link className="button primary" to="/discover">
          Find opportunities <Icon name="arrow" />
        </Link>
        {dates.length > 0 && (
          <button
            className="button"
            onClick={() =>
              download(
                "mygapmentor-targets.ics",
                calendar(
                  dates.map(([id, s]) => ({
                    id,
                    date: s.due,
                    title: `Personal target: ${opportunities.find((o) => o.id === id)?.title}`,
                    description: s.notes,
                  })),
                ),
                "text/calendar",
              )
            }
          >
            Export target dates
          </button>
        )}
      </PageHead>
      <div className="tabs" aria-label="Filter tracker">
        {["All", ...STATUSES].map((s) => (
          <button
            key={s}
            aria-pressed={filter === s}
            className={filter === s ? "active" : ""}
            onClick={() => setFilter(s)}
          >
            {s}{" "}
            <span>
              {
                Object.values(state.saved).filter(
                  (x) => s === "All" || x.status === s,
                ).length
              }
            </span>
          </button>
        ))}
      </div>
      <div className="tracker-list">
        {entries.map(([id, s]) => {
          const o = opportunities.find((x) => x.id === id);
          return (
            <article className="panel tracker-item" key={id}>
              <div className="section-title">
                <div>
                  <span className="category">{o.category}</span>
                  <h2>
                    <Link to={`/discover?op=${id}`}>{o.title}</Link>
                  </h2>
                  <p className="small quiet">
                    {o.organization} · {o.timing}
                  </p>
                </div>
                <button className="text-button" onClick={() => setRemove(id)}>
                  Remove<span className="sr-only"> {o.title}</span>
                </button>
              </div>
              <fieldset className="activity-checklist">
                <legend>Your next steps</legend>
                {o.steps.map((step, index) => (
                  <label className="check-label" key={step}>
                    <input
                      type="checkbox"
                      checked={(s.stepsDone || []).includes(index)}
                      onChange={() =>
                        updateSaved(id, {
                          stepsDone: (s.stepsDone || []).includes(index)
                            ? s.stepsDone.filter((i) => i !== index)
                            : [...(s.stepsDone || []), index],
                        })
                      }
                    />
                    <span>{step}</span>
                  </label>
                ))}
                <p className="small quiet">
                  {(s.stepsDone || []).length} of {o.steps.length} steps
                  complete · Checking a step does not submit an application.
                </p>
              </fieldset>
              <div className="form-grid">
                <label>
                  Status
                  <select
                    value={s.status}
                    onChange={(e) =>
                      updateSaved(id, { status: e.target.value })
                    }
                  >
                    {STATUSES.map((st) => (
                      <option key={st}>{st}</option>
                    ))}
                  </select>
                </label>
                <label>
                  My target date
                  <input
                    type="date"
                    value={s.due}
                    onChange={(e) => updateSaved(id, { due: e.target.value })}
                  />
                  <span
                    className={
                      s.due && s.due < today() && s.status !== "Completed"
                        ? "field-hint overdue"
                        : "field-hint"
                    }
                  >
                    {s.due && s.due < today() && s.status !== "Completed"
                      ? "Past your personal target date."
                      : "A personal reminder, not an official deadline."}
                  </span>
                </label>
              </div>
              <label>
                Next step &amp; notes
                <textarea
                  rows="2"
                  placeholder="Check the rules, find a teammate, draft a proposal…"
                  maxLength="2000"
                  value={s.notes}
                  onChange={(e) => updateSaved(id, { notes: e.target.value })}
                />
              </label>
              <div className="actions">
                <External href={o.apply || o.url}>Official site</External>
                <Link to="/evidence">Log a contribution →</Link>
                <span className="small quiet">Changes save as you type.</span>
              </div>
            </article>
          );
        })}
      </div>
      {!entries.length && (
        <Empty
          title={
            filter === "All"
              ? "Your shortlist starts here."
              : `No opportunities marked “${filter}”.`
          }
          action={
            <Link className="button" to="/discover">
              Explore opportunities
            </Link>
          }
        >
          Save an opportunity you want to investigate. You can track progress
          without signing up for anything here.
        </Empty>
      )}
      {remove && (
        <Modal title="Remove this opportunity?" onClose={() => setRemove(null)}>
          <p>
            Its tracker notes and target date will be removed. You can save the
            opportunity again later.
          </p>
          <div className="actions">
            <button className="button" onClick={() => setRemove(null)}>
              Keep it
            </button>
            <button
              className="button danger"
              onClick={() => {
                setState((s) => {
                  const saved = { ...s.saved };
                  delete saved[remove];
                  return { ...s, saved };
                });
                setRemove(null);
                notify("Removed from your tracker.");
              }}
            >
              Remove from tracker
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export function Evidence() {
  const { state, setState, notify } = useWorkspace(),
    [editing, setEditing] = useState(null),
    [remove, setRemove] = useState(null),
    [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (editing.url && !safeUrl(editing.url)) {
      setError("Use a complete http or https link.");
      return;
    }
    const entry = {
      ...editing,
      title: editing.title.trim(),
      hours: Number(editing.hours),
      url: safeUrl(editing.url),
      id: editing.id || `entry-${Date.now()}`,
    };
    if (!entry.title) {
      setError("Add a title for this contribution.");
      return;
    }
    setState((s) => ({
      ...s,
      evidence: editing.id
        ? s.evidence.map((x) => (x.id === editing.id ? entry : x))
        : [entry, ...s.evidence],
    }));
    setEditing(null);
    notify("Contribution saved.");
  };
  const newEntry = () => {
    if (state.evidence.length >= 500) {
      notify(
        "The log holds 500 entries. Export a backup before archiving old entries.",
      );
      return;
    }
    setError("");
    setEditing({ title: "", date: today(), hours: 1, notes: "", url: "" });
  };
  const exportLog = () =>
    download(
      "mygapmentor-evidence.md",
      "# MyGapMentor — evidence log\n\n" +
        state.evidence
          .map(
            (e) =>
              `## ${e.title}\n${e.date} · ${e.hours} hours\n\n${e.notes}\n\n${e.url ? `Evidence: ${e.url}` : ""}`,
          )
          .join("\n\n"),
    );
  return (
    <>
      <PageHead
        eyebrow="EVIDENCE LOG"
        title="Keep the work behind the story."
        description="Capture what you did while it’s still fresh. Your future self will thank you when it’s time to reflect or apply."
      >
        <button className="button primary" onClick={newEntry}>
          + Log a contribution
        </button>
        {state.evidence.length > 0 && (
          <button className="button" onClick={exportLog}>
            Export activity record
          </button>
        )}
      </PageHead>
      <div className="notice">
        <strong>Specific beats impressive.</strong>
        <span>
          Record your actual role, time, what changed, and what you learned. A
          link or dated draft is more useful than an unsupported claim.
        </span>
      </div>
      <div className="evidence-list">
        {state.evidence.map((e) => (
          <article className="panel evidence-item" key={e.id}>
            <div className="evidence-date">
              <strong>
                {new Date(`${e.date}T12:00:00`).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </strong>
              <span>{e.hours} hours</span>
            </div>
            <div className="evidence-body">
              <h2>{e.title}</h2>
              <p className="preserve-lines">
                {e.notes || "No reflection added yet."}
              </p>
              {e.url && <External href={e.url}>View evidence</External>}
            </div>
            <div className="actions">
              <button
                className="text-button"
                onClick={() => {
                  setError("");
                  setEditing({ ...e });
                }}
              >
                Edit<span className="sr-only"> {e.title}</span>
              </button>
              <button className="text-button" onClick={() => setRemove(e.id)}>
                Delete<span className="sr-only"> {e.title}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {!state.evidence.length && (
        <Empty
          title="Your first entry doesn’t need to be a big achievement."
          action={
            <button className="button" onClick={newEntry}>
              Add your first entry
            </button>
          }
        >
          A problem solved, a useful conversation, a contribution, a first
          draft. Record the work as it happens.
        </Empty>
      )}
      {editing && (
        <Modal
          title={editing.id ? "Edit contribution" : "Log a contribution"}
          onClose={() => setEditing(null)}
        >
          <form onSubmit={submit}>
            <label>
              What did you work on?
              <input
                autoFocus
                required
                maxLength="150"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="e.g. Built the first version of a community map"
              />
            </label>
            <div className="form-grid">
              <label>
                Date
                <input
                  required
                  type="date"
                  value={editing.date}
                  max={today()}
                  onChange={(e) =>
                    setEditing({ ...editing, date: e.target.value })
                  }
                />
              </label>
              <label>
                Hours spent
                <input
                  required
                  type="number"
                  min="0.25"
                  max="168"
                  step="0.25"
                  value={editing.hours}
                  onChange={(e) =>
                    setEditing({ ...editing, hours: e.target.value })
                  }
                />
              </label>
            </div>
            <label>
              Your role, result &amp; reflection
              <textarea
                rows="5"
                maxLength="2000"
                value={editing.notes}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
                placeholder="What did you contribute? What can you show? What did you learn?"
              />
            </label>
            <label>
              Evidence link (optional)
              <input
                type="url"
                maxLength="1000"
                placeholder="https://…"
                value={editing.url}
                onChange={(e) =>
                  setEditing({ ...editing, url: e.target.value })
                }
              />
            </label>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <div className="actions">
              <button type="submit" className="button primary">
                Save contribution
              </button>
              <button
                type="button"
                className="button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
      {remove && (
        <Modal title="Delete this entry?" onClose={() => setRemove(null)}>
          <p>This removes the contribution from your evidence log.</p>
          <div className="actions">
            <button className="button" onClick={() => setRemove(null)}>
              Keep entry
            </button>
            <button
              className="button danger"
              onClick={() => {
                setState((s) => ({
                  ...s,
                  evidence: s.evidence.filter((e) => e.id !== remove),
                }));
                setRemove(null);
                notify("Entry deleted.");
              }}
            >
              Delete entry
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
