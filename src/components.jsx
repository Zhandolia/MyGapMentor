import React, { createContext, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { today } from "./engine";
export const Context = createContext();
export const useWorkspace = () => useContext(Context);
export const dateLabel = (date) =>
  date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No target date";
export function download(name, content, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Icon({ name, ...rest }) {
  const paths = {
    overview: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    discover: "M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    plan: "M5 4h14v17H5z M8 2v4 M16 2v4 M8 10h8 M8 14h8 M8 18h4",
    tracker: "M4 4h4v16H4z M10 4h4v11h-4z M16 4h4v14h-4z",
    evidence: "M4 5h6l2 2h8v13H4z M8 12h8 M8 16h5",
    mentor: "M4 4h16v12H9l-5 4z M8 8h8 M8 12h5",
    profile: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-3a8 8 0 0 1 16 0v3",
    arrow: "M5 12h14 M14 7l5 5-5 5",
    check: "M5 12l4 4L19 6",
    external: "M14 3h7v7 M21 3L10 14 M10 3H3v18h18v-7",
  };
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
export function External({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children} <Icon name="external" width="14" height="14" />
      <span className="sr-only"> (opens a new tab)</span>
    </a>
  );
}
export function PageHead({ eyebrow, title, description, children }) {
  return (
    <header className="page-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children && <div className="head-actions">{children}</div>}
    </header>
  );
}
export function Empty({ title, children, action }) {
  return (
    <div className="empty">
      <Icon name="plan" width="28" height="28" />
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function Modal({ title, children, onClose }) {
  const ref = useRef(),
    close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const el = ref.current,
      previous = document.activeElement;
    el.showModal();
    const cancel = (e) => {
      e.preventDefault();
      close.current();
    };
    el.addEventListener("cancel", cancel);
    return () => {
      el.removeEventListener("cancel", cancel);
      el.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="dialog-heading">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Task({ task, toggle }) {
  return (
    <label className={`task ${task.done ? "done" : ""}`}>
      <input type="checkbox" checked={task.done} onChange={toggle} />
      <span>
        <span className="task-title">{task.title}</span>
        <span className="task-meta">
          {task.hours}h · {dateLabel(task.date)}
          {!task.done && task.date < today() ? " · past target date" : ""}
        </span>
      </span>
    </label>
  );
}
export function OpportunityCard({
  op,
  compact = false,
  onDetails,
  compare,
  onCompare,
}) {
  const { state, save } = useWorkspace();
  return (
    <article className="op-card">
      <div className="card-top">
        <span className="category">{op.category}</span>
        <span className="small quiet">{op.cost}</span>
      </div>
      <h3>
        {onDetails ? (
          <button className="heading-button" onClick={() => onDetails(op)}>
            {op.title}
          </button>
        ) : (
          <Link to={`/discover?op=${op.id}`}>{op.title}</Link>
        )}
      </h3>
      <div className="organization">{op.organization}</div>
      <p>{op.summary}</p>
      <div className="tags">
        <span>{op.format}</span>
        <span className={op.blocked ? "warn-tag" : ""}>
          {op.eligibilityLabel}
        </span>
      </div>
      {!compact && (
        <>
          <p className="timing">{op.timing}</p>
          <div className="match-reason">
            {op.reasons[0] || "Explore a different direction"}
          </div>
        </>
      )}
      <div className="card-bottom">
        <button
          className={state.saved[op.id] ? "button saved" : "button"}
          disabled={!!state.saved[op.id]}
          onClick={() => save(op.id)}
        >
          {state.saved[op.id] ? "✓ Saved" : "+ Save"}
        </button>
        {onDetails ? (
          <button className="text-button" onClick={() => onDetails(op)}>
            Details →
          </button>
        ) : (
          <Link to={`/discover?op=${op.id}`}>View details →</Link>
        )}
        {onCompare && (
          <label className="compare-check">
            <input
              type="checkbox"
              checked={compare}
              onChange={() => onCompare(op.id)}
            />
            Compare<span className="sr-only"> {op.title}</span>
          </label>
        )}
      </div>
    </article>
  );
}
