import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
import { gsap, prefersReducedMotion, registerMotion } from "../motion/setup";

registerMotion();

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const els = gsap.utils.toArray<HTMLElement>(".reveal, [data-reveal]");
      if (!els.length) return;

      const tweens = els.map((el) => {
        const fromRight = el.classList.contains("from-right");
        const fromLeft = el.classList.contains("from-left");
        return gsap.from(el, {
          opacity: 0,
          x: fromRight ? 28 : fromLeft ? -28 : 0,
          y: fromRight || fromLeft ? 0 : 28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    },
    { dependencies: [pathname] },
  );

  return null;
}
