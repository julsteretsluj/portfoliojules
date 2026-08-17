"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/motion/setup";

type LiquidCursorProps = Omit<ComponentProps<"div">, "children"> & {
  size?: number;
  strong?: boolean;
};

function canUseLiquidCursor() {
  return (
    !prefersReducedMotion() &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export const LiquidCursor = ({
  size = 40,
  strong = false,
  className,
  ...props
}: LiquidCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prevPos = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!canUseLiquidCursor()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-liquid-cursor");
    return () => {
      document.documentElement.classList.remove("has-liquid-cursor");
    };
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;
      const clickDrop = () => {
        if (!cursorRef.current) return;

        gsap.to(cursorRef.current, {
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(cursorRef.current, {
              scale: 1,
              duration: 0.4,
              ease: "bounce.out",
            });
          },
        });
      };
      const moveDrop = (e: MouseEvent) => {
        if (!cursorRef.current) return;

        const dx = e.clientX - prevPos.current.x;
        const dy = e.clientY - prevPos.current.y;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        let delta = angle - prevAngle.current;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const smoothingFactor = 0.2;
        const smoothAngle = prevAngle.current + delta * smoothingFactor;

        const maxStretch = 1.2;
        const stretch = Math.min(distance / 30, maxStretch);

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const total = absDx + absDy || 1;
        const xRatio = absDx / total;

        const scaleX = 1 + xRatio * stretch;
        const scaleY = 1 - xRatio * stretch * 0.3;

        gsap.to(cursorRef.current, {
          duration: 1,
          left: e.clientX - size / 2,
          top: e.clientY - size / 2,
          scaleX,
          scaleY,
          rotate: smoothAngle,
          opacity: 1,
          ease: "power2.out",
        });

        prevAngle.current = smoothAngle;
        prevPos.current = { x: e.clientX, y: e.clientY };
      };

      window.addEventListener("click", clickDrop);
      window.addEventListener("mousemove", moveDrop);
      return () => {
        window.removeEventListener("click", clickDrop);
        window.removeEventListener("mousemove", moveDrop);
      };
    },
    { dependencies: [enabled, size] },
  );

  if (!enabled) return null;

  const lightStyle = {
    background: `
  radial-gradient(circle, 
    rgba(255, 255, 255, 0.25) 90%,  
    rgba(255, 255, 255, 0.1) 70%, 
    transparent 20%                
  )
`,
    border: "1px solid rgba(255, 255, 255, 0.25)",
  };

  const strongStyle = {
    background: `
    radial-gradient(125.95% 106.37% at 32.61% 3.41%,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.45) 28.13%,
    rgba(252, 252, 252, 0.35) 45.31%,
    rgba(248, 248, 248, 0.3) 66.67%,
    rgba(243, 243, 243, 0.25) 100%)
  `,
    boxShadow: `
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset -4px -8px 12px rgba(255, 255, 255, 0.05),
    inset 3px 3px 8px rgba(240, 240, 240, 0.04),
    inset 5px 10px 14px rgba(255, 255, 255, 0.03)
  `,
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  return (
    <div
      {...props}
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        "liquid-cursor pointer-events-none fixed rounded-full saturate-[180%] backdrop-blur-[2px]",
        className,
      )}
      style={{
        height: size,
        width: size,
        opacity: 0,
        ...(strong ? strongStyle : lightStyle),
      }}
    />
  );
};
