import { useCallback, useEffect, useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { MorphingText } from "@/components/ui/morphing-text";
import { prefersReducedMotion } from "@/motion/setup";

const WORDS = ["Lead.", "Coordinate.", "Build."];

type EntryGateProps = {
  onEntered: () => void;
};

export default function EntryGate({ onEntered }: EntryGateProps) {
  const gateRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);
  const reduced =
    typeof window !== "undefined" ? prefersReducedMotion() : false;

  const enter = useCallback(() => {
    if (leaving) return;
    sessionStorage.setItem("jules-gate-entered", "1");
    if (reduced) {
      onEntered();
      return;
    }
    setLeaving(true);
  }, [leaving, onEntered, reduced]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const button = gateRef.current?.querySelector("button");
    button?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        event.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [enter]);

  return (
    <div
      ref={gateRef}
      className={`entry-gate${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-gate-title"
      onClick={enter}
      onTransitionEnd={(event) => {
        if (event.target === gateRef.current && leaving) onEntered();
      }}
    >
      <div className="entry-gate-copy">
        <p className="eyebrow">Jules Kitto-Astrop</p>
        <h1 id="entry-gate-title" className="sr-only">
          Lead. Coordinate. Build.
        </h1>
        {reduced ? (
          <p className="entry-morph-static">Lead. Coordinate. Build.</p>
        ) : (
          <MorphingText className="entry-morph" texts={WORDS} />
        )}
        <p className="entry-hint">Tap, click, or press Enter to come in.</p>
        <LiquidButton
          size="xl"
          onClick={(event) => {
            event.stopPropagation();
            enter();
          }}
        >
          Come in
        </LiquidButton>
      </div>
    </div>
  );
}

export function shouldShowEntryGate() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("jules-gate-entered") !== "1";
}
