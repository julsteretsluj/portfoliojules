import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerMotion } from "../motion/setup";

registerMotion();

export default function PageCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const { pathname } = useLocation();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      if (first.current) {
        first.current = false;
        gsap.set(el, { yPercent: -100 });
        return;
      }
      gsap.fromTo(
        el,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.72, ease: "expo.inOut" },
      );
    },
    { dependencies: [pathname] },
  );

  return <div ref={ref} className="page-curtain" aria-hidden="true" />;
}
