import { Link } from "react-router-dom";
import CopyEmail from "../components/CopyEmail";
import { email, links, roles } from "../data";

export default function Home() {
  return (
    <>
      <section className="masthead">
        <p className="eyebrow">Briefing · 2026</p>
        <h1>
          Student leader
          <span>who builds the room.</span>
        </h1>
        <p className="lede">
          I am Jules Kitto-Astrop. I organize youth diplomacy experiences,
          manage complex operations, and build practical digital systems that
          help teams deliver with clarity.
        </p>
        <p className="meta-line">Relocating from Bangkok · currently in Cambodia</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/experience">
            See experience
          </Link>
          <Link className="btn btn-ghost" to="/about">
            Read my story
          </Link>
        </div>
      </section>

      <ol className="badge-row" aria-label="Recorded roles">
        {roles.map((role, i) => (
          <li
            key={`${role.title}-${role.org}`}
            className={`badge-ticket rot-${(i % 5) + 1}`}
          >
            <strong>{role.title}</strong>
            <span>{role.org}</span>
          </li>
        ))}
      </ol>

      <blockquote className="pull-quote">
        Less about collecting stamps. More about making rooms that actually
        function.
      </blockquote>

      <section className="split-uneven">
        <article className="paper paper-wide">
          <p className="chapter-label">01 — Path</p>
          <h2>Seven countries, one through-line</h2>
          <p>
            Lived and studied across Asia, Europe, Oceania, and North America.
            Conferences, teams, and websites have to hold up after the novelty
            of a new city wears off.
          </p>
          <Link className="text-link" to="/about">
            Follow the route
          </Link>
        </article>
        <aside className="paper paper-narrow paper-shift">
          <p className="chapter-label">02 — Proof</p>
          <h2>Highlights</h2>
          <p>
            Multiple MUN awards, plus two VERSO Hack recognitions for practical
            tech solutions — 1st in 2020, 2nd in 2025.
          </p>
          <Link className="text-link" to="/experience">
            See the full list
          </Link>
        </aside>
      </section>

      <section className="connect-band">
        <h2>Let’s work on something that has to land.</h2>
        <p>
          I am open to leadership opportunities, conference partnerships, and
          youth-focused collaborations.
        </p>
        <div className="connect-links">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            Write to Jules
          </a>
          <CopyEmail />
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.seamun} target="_blank" rel="noreferrer">
            seamun.com
          </a>
        </div>
      </section>
    </>
  );
}
