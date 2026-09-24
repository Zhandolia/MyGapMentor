import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MAJORS } from "./catalog";
import { Icon, useWorkspace } from "./components";
import logo from "./NEW_LOGO.png";

export default function Landing() {
  const [query, setQuery] = useState("");
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
    <div className="landing">
      <nav className="landing-nav" aria-label="Workspace access">
        <Link to="/workspace">
          {state.profile ? "Back to my workspace" : "My workspace"}{" "}
          <span aria-hidden="true">↗</span>
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
    </div>
  );
}
