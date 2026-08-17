"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type Transition,
  type Variant,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/motion/setup";

export type CursorProps = {
  children: ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

function canUseCustomCursor() {
  return (
    !prefersReducedMotion() &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent = false,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  const cursorXSpring = useSpring(
    cursorX,
    springConfig ?? { stiffness: 500, damping: 28, mass: 0.5 },
  );
  const cursorYSpring = useSpring(
    cursorY,
    springConfig ?? { stiffness: 500, damping: 28, mass: 0.5 },
  );

  useEffect(() => {
    if (!canUseCustomCursor()) return;
    setEnabled(true);
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!enabled) return;

    if (!attachToParent) {
      document.documentElement.classList.add("has-mp-cursor");
    }

    const updatePosition = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      onPositionChange?.(event.clientX, event.clientY);
    };

    document.addEventListener("mousemove", updatePosition);
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.documentElement.classList.remove("has-mp-cursor");
    };
  }, [attachToParent, cursorX, cursorY, enabled, onPositionChange]);

  useEffect(() => {
    if (!enabled || !attachToParent) return;
    const parent = cursorRef.current?.parentElement;
    if (!parent) return;

    const onEnter = () => {
      parent.style.cursor = "none";
      setIsVisible(true);
    };
    const onLeave = () => {
      parent.style.cursor = "";
      setIsVisible(false);
    };

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      parent.style.cursor = "";
    };
  }, [attachToParent, enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        "mp-cursor pointer-events-none fixed top-0 left-0 z-[61]",
        className,
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
