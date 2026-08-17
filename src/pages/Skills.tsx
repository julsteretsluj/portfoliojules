import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Macbook } from "@/components/ui/animated-3d-mac-book-air";
import { links, skills, toolkit, toolkitTags } from "../data";
import { gsap, prefersReducedMotion, registerMotion } from "../motion/setup";

registerMotion();

function HeroStar() {
  return (
    <div className="hero-star" aria-hidden="true">
      <svg
        className="hero-star-shape"
        viewBox="0 0 200 200"
        width={200}
        height={200}
        focusable="false"
      >
        <defs>
          <linearGradient id="skills-star-gradient" x1="8%" y1="6%" x2="92%" y2="94%">
            <stop offset="0%" stopColor="#dff2fc" />
            <stop offset="42%" stopColor="#0071e3" />
            <stop offset="100%" stopColor="#243d72" />
          </linearGradient>
          <filter id="skills-star-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0071e3" floodOpacity="0.22" />
          </filter>
        </defs>
        <path
          filter="url(#skills-star-shadow)"
          fill="url(#skills-star-gradient)"
          d="M100 10 L121 74 L188 74 L134 112 L156 176 L100 138 L44 176 L66 112 L12 74 L79 74 Z"
        />
      </svg>
    </div>
  );
}

export default function Skills() {
  const root = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = skills;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const hero = root.current?.querySelector(".skills-hero");
      const star = root.current?.querySelector(".hero-star-shape");
      if (!hero || !star) return;

      gsap.from(star, {
        xPercent: 18,
        opacity: 0,
        rotate: -18,
        scale: 0.92,
        duration: 1.15,
        ease: "expo.out",
      });

      gsap.to(star, {
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="hero skills-hero">
        <HeroStar />
        <div className="hero-inner">
          <header className="hero-copy page-head skills-head">
            <p className="eyebrow">Skills</p>
            <h1>How the work actually gets done</h1>
            <p className="lede">
              My skill set combines leadership, operations, and digital execution to
              deliver high-impact outcomes in youth-focused programs.
            </p>
          </header>
        </div>
      </section>

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
          <h2>The tools I keep closest</h2>
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
    </div>
  );
}
