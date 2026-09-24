import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MAJORS } from "./catalog";
import { Icon, useWorkspace } from "./components";
import logo from "./NEW_LOGO.png";

export default function Landing() {
  const [query, setQuery] = useState("");
  const [paused, setPaused] = useState(false);
  const { state } = useWorkspace();
  const navigate = useNavigate();
  function search(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    const major = MAJORS.find(
      (name) => name.toLowerCase() === value.toLowerCase(),
    );
    navigate(
      `/discover?${major ? "major" : "q"}=${encodeURIComponent(major || value)}`,
    );
  }
  return (
    <div className={`landing ${paused ? "motion-paused" : ""}`}>
      <nav className="landing-nav" aria-label="Workspace access">
        <Link to="/workspace">
          {state.profile ? "Back to my workspace" : "My workspace"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <nav
        className="floating-examples examples-top"
        aria-label="Example opportunities"
      >
        <Link to="/discover?op=nasa-ostem">
          <span>NASA internships</span>
          <small>College enrollment required</small>
        </Link>
        <Link to="/discover?op=gsoc">
          <span>Google Summer of Code</span>
          <small>Open source · 18+</small>
        </Link>
        <Link to="/discover?op=zooniverse">
          <span>Zooniverse research</span>
          <small>Contribute from anywhere</small>
        </Link>
      </nav>
      <section className="landing-center" aria-labelledby="landing-title">
        <h1 id="landing-title">
          <img src={logo} alt="MyGapMentor" />
        </h1>
        <p>Let’s find your next step.</p>
        <form className="landing-search" role="search" onSubmit={search}>
          <Icon name="discover" width="21" height="21" />
          <label className="sr-only" htmlFor="direction-search">
            Search a subject or opportunity
          </label>
          <input
            id="direction-search"
            type="search"
            required
            maxLength="150"
            placeholder="Search a subject or opportunity"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <button type="submit" aria-label="Search opportunities">
            <Icon name="arrow" />
          </button>
        </form>
        <Link className="landing-help" to="/mentor">
          Not sure where to start?
        </Link>
      </section>
      <nav
        className="floating-examples examples-bottom"
        aria-label="More ideas to explore"
      >
        <Link to="/discover?op=usaco">
          <span>USACO problem solving</span>
          <small>Build your programming skills</small>
        </Link>
        <Link to="/discover?op=schoolhouse">
          <span>Schoolhouse tutoring</span>
          <small>Help someone learn</small>
        </Link>
        <Link to="/discover?op=youngarts">
          <span>YoungArts competition</span>
          <small>Make room for your creativity</small>
        </Link>
      </nav>
      <button
        className="motion-control text-button"
        aria-pressed={paused}
        onClick={() => setPaused((v) => !v)}
      >
        {paused ? "Resume floating examples" : "Pause floating examples"}
      </button>
    </div>
  );
}
