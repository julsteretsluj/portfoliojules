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

let launcher: (() => void) | null = null;

export function launchBalloons() {
  launcher?.();
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
        balloons();
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

    React.useEffect(() => {
      launcher = launchAnimation;
      return () => {
        if (launcher === launchAnimation) launcher = null;
      };
    }, [launchAnimation]);

    return <div className={cn("balloons-container", className)} />;
  },
);
Balloons.displayName = "Balloons";

export { Balloons };
