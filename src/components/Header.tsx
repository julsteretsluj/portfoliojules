import { useState } from "react";
import { Envelope, List, X } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { email, nav } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="rail">
      <div className="rail-bar">
        <NavLink to="/" className="wordmark" onClick={() => setOpen(false)}>
          <span className="wordmark-name">Jules</span>
          <span className="wordmark-rest">Kitto-Astrop</span>
        </NavLink>
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

      <figure className="rail-photo">
        <img
          src="/images/profile-photo.png"
          alt="Jules Kitto-Astrop speaking at a conference"
        />
        <figcaption>VFRI ILP · UNCC Bangkok</figcaption>
      </figure>

      <p className="rail-place">Phnom Penh · New Zealander</p>

      <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-nav" aria-label="Primary">
        {nav.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={() => setOpen(false)}
          >
            <span className="nav-n">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <a className="btn btn-primary rail-cta" href={`mailto:${email}`}>
        <Envelope size={18} weight="bold" aria-hidden="true" />
        Write to Jules
      </a>
    </aside>
  );
}
