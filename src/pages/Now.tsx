import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { links } from "../data";
import { gsap, prefersReducedMotion, registerMotion } from "../motion/setup";

registerMotion();

function HeroArrow() {
  return (
    <div className="hero-arrow" aria-hidden="true">
      <svg
        className="hero-arrow-shape"
        viewBox="0 0 200 200"
        width={200}
        height={200}
        focusable="false"
      >
        <defs>
          <linearGradient id="now-arrow-gradient" x1="12%" y1="4%" x2="88%" y2="96%">
            <stop offset="0%" stopColor="#dff2fc" />
            <stop offset="45%" stopColor="#0071e3" />
            <stop offset="100%" stopColor="#2c4a38" />
          </linearGradient>
          <filter id="now-arrow-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0071e3" floodOpacity="0.2" />
          </filter>
        </defs>
        <path
          filter="url(#now-arrow-shadow)"
          fill="url(#now-arrow-gradient)"
          d="M100 176 L36 92 H68 V24 H132 V92 H164 Z"
        />
      </svg>
    </div>
  );
}

export default function Now() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const hero = root.current?.querySelector(".now-hero");
      const arrow = root.current?.querySelector(".hero-arrow-shape");
      if (!hero || !arrow) return;

      gsap.from(arrow, {
        xPercent: 18,
        opacity: 0,
        y: -24,
        scale: 0.92,
        duration: 1.15,
        ease: "expo.out",
      });

      gsap.to(arrow, {
        y: 18,
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
      <section className="hero now-hero">
        <HeroArrow />
        <div className="hero-inner">
          <header className="hero-copy page-head now-head">
            <p className="eyebrow">A /now page · July 2026</p>
            <h1>What’s on the desk this month</h1>
            <p className="lede">
              A snapshot of current focus, projects, and learning, in the spirit of
              the /now page movement.
            </p>
          </header>
        </div>
      </section>

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
            <strong>Learning ASL</strong> — Expanding my communication toolkit
            through American Sign Language.
          </li>
        </ul>
      </section>
    </div>
  );
}
