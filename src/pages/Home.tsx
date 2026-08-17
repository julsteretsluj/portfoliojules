import { Link } from "react-router-dom";
import { useEffect, useRef, type SVGProps } from "react";
import { useGSAP } from "@gsap/react";
import CopyEmail from "../components/CopyEmail";
import Magnetic from "../components/Magnetic";
import MotionField from "../components/MotionField";
import { ChromaticLensEffect } from "@/components/ui/chromatic-lens";
import { Globe } from "@/components/ui/globe";
import { MorphingText } from "@/components/ui/morphing-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import { SocialLinks } from "@/components/ui/social-links";
import { TextColor } from "@/components/ui/text-color";
import { BreathingText } from "@/components/ui/breathing-text";
import { Cursor } from "@/components/ui/cursor";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { launchBalloons } from "@/components/ui/balloons";
import { fireConfettiFrom, launchSideCannons } from "@/components/ui/confetti";
import { email, roles, socials } from "../data";
import {
  gsap,
  prefersReducedMotion,
  registerMotion,
  SplitText,
} from "../motion/setup";

registerMotion();

function MouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={31}
      fill="none"
      {...props}
    >
      <g clipPath="url(#jules-cursor)">
        <path
          fill="#0071E3"
          fillRule="evenodd"
          stroke="#fff"
          strokeLinecap="square"
          strokeWidth={2}
          d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="jules-cursor">
          <path fill="#0071E3" d="M0 0h26v31H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const highlights = useRef<HTMLElement>(null);
  const cta = useRef<HTMLElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const watch = (
      el: HTMLElement | null,
      threshold: number,
      onEnter: () => void,
    ) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          onEnter();
          io.disconnect();
        },
        { threshold },
      );
      io.observe(el);
      observers.push(io);
    };

    watch(highlights.current, 0.45, launchSideCannons);
    watch(cta.current, 0.4, launchBalloons);

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const title = root.current?.querySelector(".hero-title .sparkles-text-label");
      const photo = root.current?.querySelector(".hero-photo img");
      const photoWrap = root.current?.querySelector(".hero-photo-frame");
      const tiles = root.current?.querySelectorAll(".tile-grid li");
      const quote = root.current?.querySelector(".quote-band blockquote");
      const hero = root.current?.querySelector(".hero");
      if (!title) return;

      const split = SplitText.create(title, {
        type: "chars,words",
        charsClass: "char",
        wordsClass: "word",
        tag: "span",
      });
      gsap.set(split.chars, { transformOrigin: "50% 100%" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 36,
        rotateX: -55,
        duration: 0.72,
        stagger: 0.02,
        ease: "expo.out",
      });

      if (photo && hero && photoWrap) {
        gsap.from(photoWrap, {
          clipPath: "inset(10% 9% 14% 9% round 28px)",
          duration: 1.2,
          ease: "expo.out",
        });
        gsap.from(photo, {
          scale: 1.16,
          y: 36,
          duration: 1.25,
          ease: "expo.out",
        });
        gsap.to(photo, {
          yPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      if (tiles?.length) {
        gsap.from(tiles, {
          opacity: 0,
          y: 22,
          scale: 0.94,
          duration: 0.5,
          stagger: { each: 0.055, from: "start" },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".tile-grid",
            start: "top 82%",
          },
        });
      }

      let quoteSplit: SplitText | undefined;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px)", () => {
        if (!quote) return;
        quoteSplit = SplitText.create(quote, {
          type: "words",
          wordsClass: "word",
          tag: "span",
        });
        gsap.from(quoteSplit.words, {
          opacity: 0.14,
          y: 18,
          duration: 0.4,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".quote-band",
            start: "top 68%",
            end: "+=85%",
            scrub: 1,
            pin: true,
            id: "home-pin",
          },
        });
      });

      return () => {
        split.revert();
        quoteSplit?.revert();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="hero">
        <MotionField />
        <div className="hero-copy">
          <p className="eyebrow">Phnom Penh · New Zealander</p>
          <SparklesText as="h1" className="hero-title">
            Jules Kitto-Astrop
          </SparklesText>
          <div className="hero-sub">
            <span className="sr-only">
              Student leader. Event coordinator. Digital builder.
            </span>
            <MorphingText
              className="hero-morph"
              texts={[
                "Student leader",
                "Event coordinator",
                "Digital builder",
              ]}
            />
          </div>
          <p className="lede">
            I organize youth diplomacy experiences, manage complex operations, and
            build practical digital systems that help teams deliver with clarity.
          </p>
          <p className="meta-line">Relocating from Bangkok · currently in Cambodia</p>
          <div className="hero-actions">
            <Magnetic>
              <LiquidButton asChild size="xl">
                <Link to="/experience">See experience</Link>
              </LiquidButton>
            </Magnetic>
            <Link className="btn btn-ghost" to="/about">
              Read my story
            </Link>
          </div>
        </div>
        <figure className="hero-photo">
          <div className="hero-photo-frame">
            <Cursor
              attachToParent
              variants={{
                initial: { scale: 0.3, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.3, opacity: 0 },
              }}
              transition={{ ease: "easeInOut", duration: 0.15 }}
              className="left-12 top-4"
            >
              <div className="cursor-follow">
                <MouseIcon className="h-6 w-6" />
                <span className="cursor-chip">Phnom Penh</span>
              </div>
            </Cursor>
            <img
              src="/images/profile-photo.png"
              alt="Jules Kitto-Astrop in a black blazer with a pounamu necklace, New Zealand flag behind"
            />
            <div className="hero-lens" aria-hidden="true">
              <ChromaticLensEffect
                image={{ src: "/images/profile-photo.png" }}
                width="100%"
                height="100%"
                cursorStyle="none"
              />
            </div>
          </div>
          <figcaption>
            New Zealander, currently in Phnom Penh. Move the cursor over the
            photo.
          </figcaption>
        </figure>
      </section>

      <section className="band">
        <div className="band-inner">
          <h2>Roles</h2>
          <ul className="tile-grid" aria-label="Recorded roles">
            {roles.map((role) => (
              <li key={`${role.title}-${role.org}`}>
                <strong>{role.title}</strong>
                <span>{role.org}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="quote-band">
        <blockquote>
          Less about collecting stamps. More about making rooms that actually
          function.
        </blockquote>
      </section>

      <section className="globe-band" data-reveal>
        <div className="globe-copy">
          <h2>Seven countries, one through-line</h2>
          <p>
            Lived and studied across Asia, Europe, Oceania, and North America.
            Conferences, teams, and websites have to hold up after the novelty
            of a new city wears off. Drag the globe — markers sit on the cities
            in the moving order.
          </p>
          <Link className="text-link" to="/about">
            Follow the route
          </Link>
        </div>
        <div className="globe-stage">
          <Globe className="top-10" />
        </div>
      </section>

      <section ref={highlights} className="band" data-reveal>
        <article className="highlight-card">
          <h2>Highlights</h2>
          <p>
            Multiple MUN awards, plus two VERSO Hack recognitions for practical
            tech solutions — 1st in 2020, 2nd in 2025.
          </p>
          <Link className="text-link" to="/experience">
            See the full list
          </Link>
        </article>
      </section>

      <section className="text-color-band" data-reveal>
        <p className="eyebrow">How the work actually goes</p>
        <TextColor as="p" words={["Lead.", "Coordinate.", "Build."]} />
      </section>

      <section ref={cta} className="cta-band" data-reveal>
        <BreathingText
          as="h2"
          label="Let’s work on something that has to land."
          staggerDuration={0.08}
          fromFontVariationSettings="'wght' 500"
          toFontVariationSettings="'wght' 800"
        />
        <p>
          I am open to leadership opportunities, conference partnerships, and
          youth-focused collaborations.
        </p>
        <div className="hero-actions">
          <Magnetic>
            <LiquidButton asChild size="xl">
              <a
                href={`mailto:${email}`}
                onPointerDown={(event) => {
                  launchBalloons();
                  fireConfettiFrom(event.currentTarget);
                }}
              >
                Write to Jules
              </a>
            </LiquidButton>
          </Magnetic>
          <CopyEmail />
        </div>
        <SocialLinks socials={socials} />
      </section>
    </div>
  );
}
