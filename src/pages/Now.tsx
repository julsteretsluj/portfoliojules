import { links } from "../data";

export default function Now() {
  return (
    <>
      <header className="page-head now-head">
        <p className="eyebrow">A /now page · July 2026</p>
        <h1>What’s on the desk this month</h1>
        <p className="lede">
          A snapshot of current focus, projects, and learning, in the spirit of
          the /now page movement.
        </p>
      </header>

      <section className="now-columns">
        <article className="now-card tall reveal from-left">
          <h2>Model UN & leadership</h2>
          <p>
            Most of my energy right now is channeled into expanding the MUN
            circuit and handling large-scale event logistics.
          </p>
          <ul className="plain-list">
            <li>
              <strong>SEAMUN I 2027:</strong> Serving as Secretary-General and
              Event Manager, including committee structuring, secretariat tasks,
              and operations.
            </li>
            <li>
              <strong>SEAMUNs Thailand:</strong> Founder. Promoting and bridging
              conferences regionally on{" "}
              <a href={links.instagramSeamuns} target="_blank" rel="noreferrer">
                @seamuns.th
              </a>{" "}
              and{" "}
              <a href={links.seamuns} target="_blank" rel="noreferrer">
                seamuns.site
              </a>
              .
            </li>
          </ul>
        </article>
        <article className="now-card reveal from-up">
          <h2>Tech & engineering</h2>
          <p>When I am not managing events, I am coding the infrastructure to run them.</p>
          <ul className="plain-list">
            <li>
              <strong>InterMUN:</strong> Building a custom full-stack conference
              platform from scratch at{" "}
              <a href={links.intermun} target="_blank" rel="noreferrer">
                intermun.site
              </a>{" "}
              for delegates and secretariat workflows.
            </li>
          </ul>
        </article>
        <article className="now-card shift-down reveal from-right">
          <h2>Speaking & networking</h2>
          <p>I am actively speaking, attending programs, and building global youth networks.</p>
          <ul className="plain-list">
            <li>
              <strong>ILP 2026 Thailand:</strong> Recently attended and spoke at
              the International Leadership Program by VFRI at the UN Conference
              Centre (UNCC), Bangkok.
            </li>
            <li>
              <strong>Network building:</strong> Actively connecting with youth
              leaders, delegates, and tech enthusiasts for collaboration.
            </li>
          </ul>
        </article>
      </section>

      <section className="notebook reveal from-up">
        <h2>Brain food & personal growth</h2>
        <ul>
          <li>
            <strong>iPsyO</strong> — Deep-diving into International Psychology
            Olympiad materials and community discussions.
          </li>
          <li>
            <strong>Learning ASL</strong> — Expanding my communication toolkit
            through American Sign Language.
          </li>
        </ul>
      </section>
    </>
  );
}
