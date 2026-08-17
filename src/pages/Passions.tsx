import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { passions } from "../data";
import { gsap, prefersReducedMotion, registerMotion } from "../motion/setup";

registerMotion();

function HeroHeart() {
  return (
    <div className="hero-heart" aria-hidden="true">
      <svg
        className="hero-heart-shape"
        viewBox="0 0 200 200"
        width={200}
        height={200}
        focusable="false"
      >
        <defs>
          <linearGradient id="passions-heart-gradient" x1="10%" y1="8%" x2="90%" y2="92%">
            <stop offset="0%" stopColor="#ffd6e8" />
            <stop offset="38%" stopColor="#ff6b9d" />
            <stop offset="100%" stopColor="#c42939" />
          </linearGradient>
          <filter id="passions-heart-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#c42939" floodOpacity="0.2" />
          </filter>
        </defs>
        <path
          filter="url(#passions-heart-shadow)"
          fill="url(#passions-heart-gradient)"
          d="M100 168 C100 168 24 108 24 64 C24 36 46 20 68 20 C84 20 94 30 100 44 C106 30 116 20 132 20 C154 20 176 36 176 64 C176 108 100 168 100 168 Z"
        />
      </svg>
    </div>
  );
}

export default function Passions() {
  const root = useRef<HTMLDivElement>(null);
  const featured = passions.find((p) => p.featured)!;
  const rest = passions.filter((p) => !p.featured);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const hero = root.current?.querySelector(".passions-hero");
      const heart = root.current?.querySelector(".hero-heart-shape");
      if (!hero || !heart) return;

      gsap.from(heart, {
        xPercent: 18,
        opacity: 0,
        rotate: -10,
        scale: 0.92,
        duration: 1.15,
        ease: "expo.out",
      });

      gsap.to(heart, {
        rotate: 6,
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
      <section className="hero passions-hero">
        <HeroHeart />
        <div className="hero-inner">
          <header className="hero-copy page-head passions-head">
            <p className="eyebrow">Passions</p>
            <h1>What I keep coming back to</h1>
            <p className="lede">
              Beyond leadership roles and projects, these areas shape how I learn,
              contribute, and build communities with empathy and purpose.
            </p>
          </header>
        </div>
      </section>

      <blockquote className="featured-note reveal from-left">
        <p className="eyebrow">{featured.title}</p>
        <p>{featured.body}</p>
      </blockquote>

      <section className="passion-masonry">
        {rest.map((item, i) => (
          <article
            className={`passion-card reveal ${i % 2 ? "from-right" : "from-left"} card-h-${(i % 3) + 1}`}
            key={item.title}
          >
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="lego-aside-band reveal from-up">
        <h2>Creative play & problem solving</h2>
        <p>
          LEGO helps me think in systems: how parts connect, how structures
          scale, and how creativity and engineering work together.
        </p>
      </section>
    </div>
  );
}
