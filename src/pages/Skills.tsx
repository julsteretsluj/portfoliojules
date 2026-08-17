import { Macbook } from "@/components/ui/animated-3d-mac-book-air";
import { links, skills, toolkit, toolkitTags } from "../data";

export default function Skills() {
  const [lead, ...rest] = skills;

  return (
    <>
      <header className="page-head skills-head">
        <p className="eyebrow">Skills</p>
        <h1>How the work actually gets done</h1>
        <p className="lede">
          My skill set combines leadership, operations, and digital execution to
          deliver high-impact outcomes in youth-focused programs.
        </p>
      </header>

      <section className="skill-layout">
        <article className="skill-lead reveal from-left">
          <h2>{lead.title}</h2>
          <p>{lead.body}</p>
        </article>
        <div className="skill-stack">
          {rest.map((skill, i) => (
            <article className={`skill-mini reveal from-right delay-${i + 1}`} key={skill.title}>
              <h2>{skill.title}</h2>
              <p>{skill.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="macbook-band" data-reveal>
        <div className="macbook-stage">
          <Macbook interactive />
        </div>
        <div className="macbook-copy">
          <p className="eyebrow">Digital execution</p>
          <h2>The sites still have to work after the room empties</h2>
          <p>
            Web development sits next to the logistics. Domain setup, pages, and
            trackers are part of the same delivery stack as the conference
            floor.
          </p>
          <p className="macbook-hint">Move around it. Click the screen to switch sites.</p>
          <p>
            <a className="text-link" href={links.seamun} target="_blank" rel="noreferrer">
              seamun.com
            </a>
            {" · "}
            <a className="text-link" href={links.seamuns} target="_blank" rel="noreferrer">
              seamuns.site
            </a>
            {" · "}
            <a className="text-link" href={links.intermun} target="_blank" rel="noreferrer">
              intermun.site
            </a>
          </p>
        </div>
      </section>

      <section className="toolkit reveal from-up">
        <div>
          <p className="eyebrow">Digital toolkit</p>
          <h2>The four tools I keep closest</h2>
          <p>
            Planning, documentation, design, and execution — usually in that
            order, sometimes all at once.
          </p>
        </div>
        <ul className="toolkit-list">
          {toolkit.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <ul className="tag-row">
          {toolkitTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
