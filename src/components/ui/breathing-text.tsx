"use client";

import type { ElementType, ReactNode } from "react";
import { motion, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/motion/setup";

type BreathingTextProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
  children?: ReactNode;
  label?: string;
  as?: ElementType;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  repeatDelay?: number;
};

export function BreathingText({
  children,
  label,
  as: ElementTag = "span",
  fromFontVariationSettings,
  toFontVariationSettings,
  transition = {
    duration: 1.5,
    ease: "easeInOut",
  },
  staggerDuration = 0.1,
  staggerFrom = "first",
  repeatDelay = 0.1,
  className,
  ...props
}: BreathingTextProps) {
  const text = String(label ?? children ?? "");

  const getCustomIndex = (index: number, total: number) => {
    if (typeof staggerFrom === "number") {
      return Math.abs(index - staggerFrom);
    }
    switch (staggerFrom) {
      case "first":
        return index;
      case "last":
        return total - 1 - index;
      case "center":
      default:
        return Math.abs(index - Math.floor(total / 2));
    }
  };

  if (typeof window !== "undefined" && prefersReducedMotion()) {
    return (
      <ElementTag className={cn("breathing-text", className)} {...props}>
        {text}
      </ElementTag>
    );
  }

  const letterVariants: Variants = {
    initial: { fontVariationSettings: fromFontVariationSettings },
    animate: (i: number) => ({
      fontVariationSettings: toFontVariationSettings,
      transition: {
        ...transition,
        repeat: Infinity,
        repeatType: "mirror",
        delay: i * staggerDuration,
        repeatDelay,
      },
    }),
  };

  const letters = text.split("");

  return (
    <ElementTag
      className={cn(
        "breathing-text relative after:pointer-events-none after:absolute after:h-0 after:overflow-hidden after:invisible after:select-none after:font-black after:content-[attr(data-text)]",
        className,
      )}
      {...props}
      data-text={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block whitespace-pre"
          aria-hidden="true"
          variants={letterVariants}
          initial="initial"
          animate="animate"
          custom={getCustomIndex(i, letters.length)}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </ElementTag>
  );
}

export default BreathingText;
