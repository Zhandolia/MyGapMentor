import React, { useEffect, useRef, useState } from "react";
import {
  HashRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MAJORS } from "./catalog";
import { emptyState, validateState } from "./engine";
import { Context, Icon } from "./components";
import { Overview, Discover } from "./Explore";
import { Plan, Tracker, Evidence } from "./Workspace";
import { Profile, Mentor, Guides } from "./Profile";
import logo from "./NEW_LOGO.png";
import "./App.css";
const KEY = "mygapmentor.workspace.v1";
function load() {
  try {
    const data = localStorage.getItem(KEY);
    return {
      state: data ? validateState(JSON.parse(data)) : emptyState(),
      warning: "",
    };
  } catch {
    return {
      state: emptyState(),
      warning:
        "Saved data could not be loaded. Export a backup before leaving. Choose “Start a new workspace” in Profile to resume saving.",
    };
  }
}
function Shell() {
  const [initial] = useState(load),
    [state, setState] = useState(initial.state),
    [storageError, setStorageError] = useState(initial.warning),
    [blocked, setBlocked] = useState(!!initial.warning),
    [toast, setToast] = useState("");
  const location = useLocation(),
    main = useRef();
  useEffect(() => {
    if (blocked) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError("");
    } catch {
      setStorageError(
        "Browser storage is unavailable or full. Export a backup to keep this session’s changes.",
      );
    }
  }, [state, blocked]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${location.pathname.split("/")[1] || "Overview"} · MyGapMentor`;
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const save = (id) => {
    setState((s) => ({
      ...s,
      saved: {
        ...s.saved,
        [id]: s.saved[id] || {
          status: "Shortlisted",
          notes: "",
          due: "",
          url: "",
        },
      },
    }));
    setToast("Saved to your tracker.");
  };
  const updateSaved = (id, patch) =>
    setState((s) => ({
      ...s,
      saved: { ...s.saved, [id]: { ...s.saved[id], ...patch } },
    }));
  const toggleTask = (id) =>
    setState((s) => ({
      ...s,
      plan: s.plan.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  return (
    <Context.Provider
      value={{
        state,
        setState,
        save,
        updateSaved,
        toggleTask,
        notify: setToast,
        setBlocked,
      }}
    >
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Skip to content
      </a>
      <div className="workspace">
        <aside className="sidebar">
          <Link to="/" className="brand" aria-label="MyGapMentor home">
            <img src={logo} alt="MyGapMentor" />
          </Link>
          <div className="nav-caption">YOUR GAP YEAR, WITH DIRECTION</div>
          <nav aria-label="Main navigation">
            {[
              ["/", "overview", "Overview"],
              ["/discover", "discover", "Opportunities"],
              ["/plan", "plan", "My plan"],
              ["/tracker", "tracker", "My tracker"],
              ["/evidence", "evidence", "Evidence log"],
              ["/mentor", "mentor", "Mentor guide"],
            ].map(([to, icon, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                <Icon name={icon} />
                <span>{label}</span>
                {to === "/tracker" && Object.keys(state.saved).length > 0 && (
                  <span className="nav-count">
                    {Object.keys(state.saved).length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="local-note">
              <span className="status-dot" /> Free workspace
              <p>
                Saved on this device.
                <br />
                Your work, at your pace.
              </p>
            </div>
            <NavLink to="/profile" className="profile-link">
              <Icon name="profile" />
              {state.profile?.name || "Your profile"}
              <span>↗</span>
            </NavLink>
          </div>
        </aside>
        <div className="main-column">
          <div className="topbar">
            <span>Make your year count.</span>
            <Link to="/guides">How it works</Link>
          </div>
          <main id="main" ref={main} tabIndex="-1">
            {storageError && (
              <div className="notice warning" role="alert">
                {storageError} <Link to="/profile">Manage data</Link>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/evidence" element={<Evidence />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/guides" element={<Guides />} />
              {["basics", "account"].map((p) => (
                <Route
                  key={p}
                  path={`/${p}`}
                  element={<Navigate replace to="/profile" />}
                />
              ))}
              {["plans", "stories", "about", "contact"].map((p) => (
                <Route
                  key={p}
                  path={`/${p}`}
                  element={<Navigate replace to="/guides" />}
                />
              ))}
              {MAJORS.map((m) => (
                <Route
                  key={m}
                  path={`/${m.toLowerCase().replaceAll(" ", "-")}`}
                  element={
                    <Navigate
                      replace
                      to={`/discover?major=${encodeURIComponent(m)}`}
                    />
                  }
                />
              ))}
              <Route
                path="*"
                element={
                  <section className="empty">
                    <h1>This page has moved.</h1>
                    <Link to="/">Go to your overview →</Link>
                  </section>
                }
              />
            </Routes>
          </main>
          <footer>
            <span>MyGapMentor · Progress with purpose.</span>
            <Link to="/guides">Privacy &amp; sources</Link>
          </footer>
        </div>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" />
          {toast}
        </div>
      )}
    </Context.Provider>
  );
}
const oldPath = window.location.pathname.replace(/\/$/, "");
if (
  !window.location.hash &&
  oldPath &&
  oldPath !== "/index.html" &&
  !/\/MyGapMentor$/i.test(oldPath)
)
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}#${oldPath}`,
  );
export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
