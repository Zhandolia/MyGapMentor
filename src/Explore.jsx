import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CHECKED, MAJORS, PROJECTS, opportunities } from "./catalog";
import { blankProfile, ranked, today } from "./engine";
import {
  useWorkspace,
  PageHead,
  Empty,
  Icon,
  OpportunityCard,
  Task,
  Modal,
  External,
  dateLabel,
} from "./components";
export function Overview() {
  const { state, toggleTask } = useWorkspace(),
    p = state.profile,
    done = state.plan.filter((t) => t.done).length,
    next = state.plan.filter((t) => !t.done).slice(0, 3),
    saved = Object.entries(state.saved),
    due = saved
      .filter(([, s]) => s.due && s.status !== "Completed")
      .sort((a, b) => a[1].due.localeCompare(b[1].due))
      .slice(0, 3),
    picks = ranked(p)
      .filter((o) => !o.blocked && (!p?.freeOnly || o.cost === "Free"))
      .slice(0, 3);
  return (
    <>
      <PageHead
        eyebrow="YOUR PERSONAL WORKSPACE"
        title={
          p
            ? `A little progress, every week${p.name ? `, ${p.name}` : ""}.`
            : "A gap year with a clear next step."
        }
        description={
          p
            ? "Turn your interests into work you can be proud of. Pick up where you left off."
            : "Find opportunities that fit your interests. Build a realistic plan. Keep a record of what you learn."
        }
      />
      {!p ? (
        <section className="welcome panel">
          <div>
            <span className="pill blue">Start with what matters to you</span>
            <h2>
              Less searching.
              <br />
              More doing.
            </h2>
            <p>
              One meaningful project can be the thread that connects your year.
              We’ll help you find it—and make room for the work.
            </p>
            <div className="actions">
              <Link className="button primary" to="/profile">
                Build my gap-year plan <Icon name="arrow" />
              </Link>
              <Link className="text-link" to="/discover">
                Explore first →
              </Link>
            </div>
            <div className="quiet small">
              Free to use · No account or API key needed
            </div>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <strong>Set your direction</strong>
                <p>Your major, interests, and available time.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Choose a worthwhile commitment</strong>
                <p>Check the fit, requirements, and source.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Make progress you can explain</strong>
                <p>A weekly plan and evidence of your work.</p>
              </div>
            </li>
          </ol>
        </section>
      ) : (
        <section className="direction-strip">
          <div>
            <span className="eyebrow">YOUR DIRECTION</span>
            <h2>{p.major}</h2>
            <p>
              {p.hours} hours / week · {p.goal}
            </p>
          </div>
          <Link className="button" to="/profile">
            Edit direction
          </Link>
        </section>
      )}
      <div className="stats">
        <div>
          <span>Saved opportunities</span>
          <strong>{saved.length}</strong>
          <Link to="/tracker">Your shortlist →</Link>
        </div>
        <div>
          <span>Plan tasks completed</span>
          <strong>
            {done}
            <small> / {state.plan.length}</small>
          </strong>
          <Link to="/plan">Your next steps →</Link>
        </div>
        <div>
          <span>Hours documented</span>
          <strong>
            {Math.round(
              state.evidence.reduce((n, e) => n + Number(e.hours), 0) * 10,
            ) / 10}
          </strong>
          <Link to="/evidence">Record your work →</Link>
        </div>
      </div>
      <div className="dashboard-grid">
        <section className="panel">
          <div className="section-title">
            <h2>Your next steps</h2>
            <Link to="/plan">View plan →</Link>
          </div>
          {next.length ? (
            next.map((t) => (
              <Task key={t.id} task={t} toggle={() => toggleTask(t.id)} />
            ))
          ) : (
            <Empty
              title={
                state.plan.length
                  ? "You finished your plan."
                  : "Start with a manageable week."
              }
              action={
                <Link className="button" to={p ? "/plan" : "/profile"}>
                  {p ? "Create a plan" : "Set up your profile"}
                </Link>
              }
            >
              {state.plan.length
                ? "Review your evidence and decide what comes next."
                : "A plan will appear here once you set your direction."}
            </Empty>
          )}
        </section>
        <section className="panel">
          <div className="section-title">
            <h2>Personal target dates</h2>
            <Link to="/tracker">Manage →</Link>
          </div>
          {due.length ? (
            due.map(([id, s]) => (
              <Link className="deadline-row" to="/tracker" key={id}>
                <span>{opportunities.find((o) => o.id === id)?.title}</span>
                <span className={s.due < today() ? "overdue" : ""}>
                  {dateLabel(s.due)}
                  {s.due < today() ? " · overdue" : ""}
                </span>
              </Link>
            ))
          ) : (
            <Empty title="Give your intentions a date.">
              Save an opportunity, then set a personal target in your tracker.
              Official deadlines stay on the organizer’s site.
            </Empty>
          )}
        </section>
      </div>
      <div className="section-title spaced">
        <div>
          <span className="eyebrow">A PLACE TO BEGIN</span>
          <h2>
            {p ? "Selected for your direction" : "Explore the possibilities"}
          </h2>
        </div>
        <Link to="/discover">All opportunities →</Link>
      </div>
      <div className="card-grid">
        {picks.map((o) => (
          <OpportunityCard key={o.id} op={o} compact />
        ))}
      </div>
      <p className="small quiet">
        Sources reviewed {dateLabel(CHECKED)}. Confirm current requirements with
        each organizer.
      </p>
    </>
  );
}
export function Discover() {
  const { state, save, notify } = useWorkspace();
  const [params, setParams] = useSearchParams(),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("All types"),
    [major, setMajor] = useState(
      params.get("major") || state.profile?.major || "All majors",
    ),
    [format, setFormat] = useState("Any"),
    [free, setFree] = useState(state.profile?.freeOnly || false),
    [available, setAvailable] = useState(true),
    [compared, setCompared] = useState([]),
    [showCompare, setShowCompare] = useState(false);
  const profile = {
      ...(state.profile || blankProfile()),
      major:
        major === "All majors"
          ? state.profile?.major || "Computer Science"
          : major,
    },
    all = ranked(profile),
    results = all.filter(
      (o) =>
        (major === "All majors" || o.majors.includes(major)) &&
        (category === "All types" || o.category === category) &&
        (format === "Any" || o.format === format) &&
        (!free || o.cost === "Free") &&
        (!available || !o.blocked) &&
        `${o.title} ${o.organization} ${o.summary} ${o.majors.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    ),
    detail = all.find((o) => o.id === params.get("op"));
  const choose = (id) =>
    setCompared((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : s.length < 3
          ? [...s, id]
          : (notify("Compare up to three opportunities at a time."), s),
    );
  const reset = () => {
    setQuery("");
    setCategory("All types");
    setMajor("All majors");
    setFormat("Any");
    setFree(false);
    setAvailable(true);
  };
  return (
    <>
      <PageHead
        eyebrow="OPPORTUNITY EXPLORER"
        title="Find your next worthwhile thing."
        description="Start with your interests, then check the practical fit. A thoughtful shortlist beats a hundred open tabs."
      />
      <div className="notice">
        <strong>{opportunities.length} curated starting points</strong>
        <span>
          Programs, practice, and directories are labeled separately. Matching
          uses your major and preferences, not an admissions score.
        </span>
      </div>
      <section className="filters panel" aria-label="Filter opportunities">
        <label className="search-field">
          Search opportunities
          <input
            type="search"
            placeholder="Try research, volunteering, or NASA…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="filter-grid">
          <label>
            Major
            <select value={major} onChange={(e) => setMajor(e.target.value)}>
              <option>All majors</option>
              {MAJORS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All types</option>
              {[...new Set(opportunities.map((o) => o.category))]
                .sort()
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>
          </label>
          <label>
            Format
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              {["Any", "Remote", "Local", "Hybrid"].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="filter-bottom">
          <label className="check-label">
            <input
              type="checkbox"
              checked={free}
              onChange={(e) => setFree(e.target.checked)}
            />
            Free participation only
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Hide age conflicts &amp; ended events
          </label>
          <button className="text-button" onClick={reset}>
            Reset filters
          </button>
        </div>
      </section>
      <div className="results-heading" aria-live="polite">
        <span>
          <strong>{results.length}</strong> results · ordered by fit
        </span>
        {compared.length > 0 && (
          <button className="button" onClick={() => setShowCompare(true)}>
            Compare ({compared.length}/3)
          </button>
        )}
      </div>
      {!state.profile && (
        <p className="small quiet">
          <Link to="/profile">Add your profile</Link> for age-aware matching.
          Until then, age checks use an example age of 18.
        </p>
      )}
      <div className="card-grid">
        {results.map((o) => (
          <OpportunityCard
            op={o}
            key={o.id}
            onDetails={(o) =>
              setParams({
                ...(major !== "All majors" ? { major } : {}),
                op: o.id,
              })
            }
            compare={compared.includes(o.id)}
            onCompare={choose}
          />
        ))}
      </div>
      {!results.length && (
        <Empty
          title="No matches with these filters."
          action={
            <button className="button" onClick={reset}>
              Clear filters
            </button>
          }
        >
          Try a broader type or format. The catalog does not cover every
          opportunity.
        </Empty>
      )}
      <section className="panel project-callout">
        <span className="eyebrow">CREATE YOUR OWN OPPORTUNITY</span>
        <h2>A project built around your curiosity.</h2>
        <p>{PROJECTS[profile.major]}</p>
        <Link className="text-link" to={state.profile ? "/plan" : "/profile"}>
          Build it into my plan →
        </Link>
      </section>
      {detail && (
        <Modal
          title={detail.title}
          onClose={() => {
            params.delete("op");
            setParams(params);
          }}
        >
          <div className="tags">
            <span>{detail.category}</span>
            <span>{detail.format}</span>
            <span>{detail.cost}</span>
          </div>
          <p>{detail.summary}</p>
          <div className={`notice ${detail.blocked ? "warning" : ""}`}>
            <strong>{detail.eligibilityLabel}</strong>
            <span>{detail.eligibility}</span>
          </div>
          <h3>What you could take away</h3>
          <p>{detail.evidence}</p>
          <h3>Timing</h3>
          <p>
            {detail.timing}.{" "}
            {detail.eventDate
              ? "These are event dates, not an application deadline."
              : "Check the organizer for any application deadline."}
          </p>
          <h3>Your first step</h3>
          <p>
            Read the official requirements, confirm that your age and enrollment
            status fit, and choose a small first commitment. Set your own target
            date in the tracker.
          </p>
          <p className="small quiet">
            Source reviewed {dateLabel(detail.checked)}. Availability can
            change.
          </p>
          <div className="actions">
            <button
              className="button primary"
              disabled={!!state.saved[detail.id]}
              onClick={() => save(detail.id)}
            >
              {state.saved[detail.id] ? "Saved to tracker" : "Save to tracker"}
            </button>
            <External className="button" href={detail.apply || detail.url}>
              Visit official site
            </External>
            <External href={detail.source || detail.url}>Read source</External>
          </div>
        </Modal>
      )}
      {showCompare && (
        <Modal
          title="Compare your shortlist"
          onClose={() => setShowCompare(false)}
        >
          <div className="comparison">
            {compared
              .map((id) => all.find((o) => o.id === id))
              .map((o) => (
                <article key={o.id}>
                  <h3>{o.title}</h3>
                  <dl>
                    <dt>Type</dt>
                    <dd>{o.category}</dd>
                    <dt>Cost / format</dt>
                    <dd>
                      {o.cost} · {o.format}
                    </dd>
                    <dt>Eligibility</dt>
                    <dd>{o.eligibility}</dd>
                    <dt>Timing</dt>
                    <dd>{o.timing}</dd>
                    <dt>Possible output</dt>
                    <dd>{o.evidence}</dd>
                  </dl>
                  <button className="text-button" onClick={() => choose(o.id)}>
                    Remove from comparison
                  </button>
                </article>
              ))}
          </div>
          {!compared.length && (
            <p>Choose opportunities in the explorer to compare them.</p>
          )}
        </Modal>
      )}
    </>
  );
}
