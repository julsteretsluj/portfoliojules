import { Envelope } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import CopyEmail from "../components/CopyEmail";
import Squiggle from "../components/Squiggle";
import { email, links, roles } from "../data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal from-left">
          <p className="eyebrow">Phnom Penh · New Zealander</p>
          <h1>
            Student leader,
            <br />
            event coordinator,
            <span className="hero-break">
              digital builder.
              <Squiggle className="hero-scribble" />
            </span>
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
        </div>

        <figure className="hero-photo reveal from-right">
          <img
            src="/images/profile-photo.png"
            alt="Jules Kitto-Astrop speaking at a conference, microphone on the desk"
          />
          <figcaption>
            Speaking at the VFRI International Leadership Program, UNCC Bangkok
          </figcaption>
        </figure>
      </section>

      <section className="now-strip reveal from-up">
        <p className="now-strip-label">Roles</p>
        <ul className="role-strip">
          {roles.map((role) => (
            <li key={`${role.title}-${role.org}`}>
              <strong>{role.title}</strong>
              <span>{role.org}</span>
            </li>
          ))}
        </ul>
        <Link className="text-link" to="/experience">
          See experience
        </Link>
      </section>

      <blockquote className="pull-quote reveal from-up">
        The work is less about collecting stamps, and more about making rooms that actually function.
      </blockquote>

      <section className="home-split">
        <article className="note-card reveal from-left">
          <p className="chapter-label">Chapter — path</p>
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
        <aside className="highlight-card reveal from-right">
          <p className="chapter-label">Chapter — proof</p>
          <p className="eyebrow">Highlights</p>
          <p>
            Multiple MUN awards, plus two VERSO Hack recognitions for practical
            tech solutions — 1st in 2020, 2nd in 2025.
          </p>
          <Link className="text-link" to="/experience">
            See the full list
          </Link>
        </aside>
      </section>

      <section className="connect-band reveal from-up">
        <div>
          <h2>Let’s work on something that has to land.</h2>
          <p>
            I am open to leadership opportunities, conference partnerships, and
            youth-focused collaborations.
          </p>
        </div>
        <div className="connect-links">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            <Envelope size={18} weight="bold" aria-hidden="true" />
            Write to Jules
          </a>
          <CopyEmail />
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.instagramPersonal} target="_blank" rel="noreferrer">
            @jules.ktoast
          </a>
          <a href={links.seamun} target="_blank" rel="noreferrer">
            seamun.com
          </a>
        </div>
      </section>
    </>
  );
}
