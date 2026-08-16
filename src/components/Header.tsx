import { useState } from "react";
import { Envelope, List, X } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { email, nav } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-top">
        <NavLink to="/" className="wordmark" onClick={() => setOpen(false)}>
          <span className="wordmark-name">Jules</span>
          <span className="wordmark-rest">Kitto-Astrop</span>
        </NavLink>
        <div className="header-actions">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            <Envelope size={18} weight="bold" aria-hidden="true" />
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
              <X size={18} weight="bold" aria-hidden="true" />
            ) : (
              <List size={18} weight="bold" aria-hidden="true" />
            )}
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
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
    </header>
  );
}
