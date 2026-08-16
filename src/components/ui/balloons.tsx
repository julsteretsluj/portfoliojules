import * as React from "react";
import { cn } from "@/lib/utils";
import { balloons, textBalloons } from "balloons-js";
import { prefersReducedMotion } from "@/motion/setup";

export interface BalloonsProps {
  type?: "default" | "text";
  text?: string;
  fontSize?: number;
  color?: string;
  className?: string;
  onLaunch?: () => void;
}

export type BalloonsHandle = {
  launchAnimation: () => void;
};

let lastLaunch = 0;

function liftBalloonLayer() {
  requestAnimationFrame(() => {
    document.querySelectorAll("balloons").forEach((node) => {
      const el = node as HTMLElement;
      el.style.zIndex = "2147483646";
      el.style.contain = "none";
      if (el.parentElement === document.documentElement) {
        document.body.appendChild(el);
      }
    });
  });
}

export function launchBalloons() {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;

  const now = performance.now();
  if (now - lastLaunch < 700) return;
  lastLaunch = now;

  void balloons();
  liftBalloonLayer();
}

const Balloons = React.forwardRef<BalloonsHandle, BalloonsProps>(
  (
    {
      type = "default",
      text,
      fontSize = 120,
      color = "#000000",
      className,
      onLaunch,
    },
    ref,
  ) => {
    const launchAnimation = React.useCallback(() => {
      if (prefersReducedMotion()) return;

      if (type === "default") {
        launchBalloons();
      } else if (type === "text" && text) {
        textBalloons([
          {
            text,
            fontSize,
            color,
          },
        ]);
      }

      onLaunch?.();
    }, [type, text, fontSize, color, onLaunch]);

    React.useImperativeHandle(ref, () => ({ launchAnimation }), [
      launchAnimation,
    ]);

    return <div className={cn("balloons-container", className)} />;
  },
);
Balloons.displayName = "Balloons";

export { Balloons };
