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
import { MAJORS, opportunities, catalogFeed, updateCatalog } from "./catalog";
import { emptyState, validateState } from "./engine";
import { Context, Icon } from "./components";
import { Overview, Discover } from "./Explore";
import Landing from "./Landing";
import { Plan, Tracker, Evidence } from "./Workspace";
import { Profile, Mentor, Guides } from "./Profile";
import logo from "./NEW_LOGO.png";
import "./App.css";
const KEY = "mygapmentor.workspace.v1";
const FEED_KEY = "mygapmentor.catalog.v1";
const FEED_URL =
  "https://raw.githubusercontent.com/Zhandolia/MyGapMentor/main/src/catalog-feed.json";
function load() {
  try {
    const cached = localStorage.getItem(FEED_KEY);
    if (cached) updateCatalog(JSON.parse(cached));
  } catch {
    /* A bad feed cache must never prevent loading personal work. */
  }
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
  const [feedVersion, setFeedVersion] = useState(catalogFeed.generatedAt);
  useEffect(() => {
    let disposed = false,
      busy = false;
    const refresh = async () => {
      if (busy || document.visibilityState === "hidden") return;
      busy = true;
      try {
        const response = await fetch(FEED_URL, {
          signal: AbortSignal.timeout(12000),
          cache: "no-cache",
          credentials: "omit",
        });
        if (!response.ok) throw new Error("Catalog unavailable");
        const body = await response.text();
        if (body.length > 5000000) throw new Error("Catalog too large");
        const next = JSON.parse(body);
        if (!disposed && updateCatalog(next)) {
          setFeedVersion(catalogFeed.generatedAt);
          try {
            localStorage.setItem(FEED_KEY, JSON.stringify(next));
          } catch {
            /* Bundled fallback remains available. */
          }
        }
      } catch {
        /* Keep the last successful catalog and display its actual date. */
      } finally {
        busy = false;
      }
    };
    refresh();
    const interval = setInterval(refresh, 30 * 60 * 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      disposed = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  const location = useLocation(),
    main = useRef();
  const isHome = location.pathname === "/";
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
    document.title =
      location.pathname === "/"
        ? "MyGapMentor — Find your next step"
        : `${location.pathname.split("/")[1]} · MyGapMentor`;
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
          snapshot: opportunities.find((op) => op.id === id)?.feedRecord,
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
        feedVersion,
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
      <div className={isHome ? "landing-shell" : "workspace"}>
        {!isHome && (
          <aside className="sidebar">
            <Link to="/" className="brand" aria-label="MyGapMentor home">
              <img src={logo} alt="MyGapMentor" />
            </Link>
            <div className="nav-caption">YOUR GAP YEAR, WITH DIRECTION</div>
            <nav aria-label="Main navigation">
              {[
                ["/workspace", "overview", "Overview"],
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
        )}
        <div className="main-column">
          {!isHome && (
            <div className="topbar">
              <span>Make your year count.</span>
              <Link to="/guides">How it works</Link>
            </div>
          )}
          <main id="main" ref={main} tabIndex="-1">
            {storageError && (
              <div className="notice warning" role="alert">
                {storageError} <Link to="/profile">Manage data</Link>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/workspace" element={<Overview />} />
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
          {!isHome && (
            <footer>
              <span>MyGapMentor · Progress with purpose.</span>
              <Link to="/guides">Privacy &amp; sources</Link>
            </footer>
          )}
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
const oldPath = window.location.pathname
  .replace(/^\/MyGapMentor(?=\/|$)/i, "")
  .replace(/\/index\.html$/, "")
  .replace(/\/$/, "");
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
