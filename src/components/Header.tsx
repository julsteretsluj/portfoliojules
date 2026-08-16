import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { email, nav } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="apple-nav">
      <div className="apple-nav-inner">
        <NavLink to="/" className="wordmark" onClick={() => setOpen(false)}>
          Jules
        </NavLink>
        <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="btn btn-primary nav-cta" href={`mailto:${email}`}>
          Send an email
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={20} weight="bold" aria-hidden="true" />
          ) : (
            <List size={20} weight="bold" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
    </header>
  );
}
