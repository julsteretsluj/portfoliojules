"use client";

import type { ReactNode } from "react";
import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import confetti from "canvas-confetti";
import { prefersReducedMotion } from "@/motion/setup";

export type ConfettiRef = {
  fire: (options?: ConfettiOptions) => Promise<void> | void;
};

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

const CONFETTI_COLORS = ["#0071E3", "#C9A227", "#1F6F54", "#C93400"];

const ConfettiContext = createContext<ConfettiRef | null>(null);

function canCelebrate() {
  return typeof window !== "undefined" && !prefersReducedMotion();
}

export function fireConfettiFrom(
  target: EventTarget | null,
  options: ConfettiOptions = {},
) {
  if (!canCelebrate()) return;
  if (!target || !("getBoundingClientRect" in target)) {
    void confetti({
      particleCount: 90,
      spread: 72,
      colors: CONFETTI_COLORS,
      zIndex: 70,
      disableForReducedMotion: true,
      ...options,
    });
    return;
  }

  const rect = (target as Element).getBoundingClientRect();
  void confetti({
    particleCount: 90,
    spread: 72,
    colors: CONFETTI_COLORS,
    zIndex: 70,
    disableForReducedMotion: true,
    ...options,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
  });
}

export function launchSideCannons() {
  if (!canCelebrate()) return;

  const end = Date.now() + 2200;
  const colors = CONFETTI_COLORS;

  const frame = () => {
    if (Date.now() > end) return;

    void confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 58,
      origin: { x: 0, y: 0.55 },
      colors,
      zIndex: 70,
      disableForReducedMotion: true,
    });
    void confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 58,
      origin: { x: 1, y: 0.55 },
      colors,
      zIndex: 70,
      disableForReducedMotion: true,
    });

    requestAnimationFrame(frame);
  };

  frame();
}

const ConfettiComponent = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    className,
    ...rest
  } = props;

  const instanceRef = useRef<ConfettiInstance | null>(null);
  const optionsRef = useRef(options);
  const globalOptionsRef = useRef(globalOptions);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    globalOptionsRef.current = globalOptions;
  }, [globalOptions]);

  const canvasRef = useCallback((node: HTMLCanvasElement | null) => {
    if (node) {
      if (instanceRef.current) return;
      instanceRef.current = confetti.create(node, {
        resize: true,
        useWorker: true,
        ...globalOptionsRef.current,
      });
      return;
    }

    instanceRef.current?.reset();
    instanceRef.current = null;
  }, []);

  const fire = useCallback(async (opts: ConfettiOptions = {}) => {
    if (!canCelebrate()) return;
    try {
      await instanceRef.current?.({
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
        ...optionsRef.current,
        ...opts,
      });
    } catch (error) {
      console.error("Confetti error:", error);
    }
  }, []);

  const api = useMemo(() => ({ fire }), [fire]);

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) void fire();
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} className={className} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

ConfettiComponent.displayName = "Confetti";

export const Confetti = ConfettiComponent;

export type ConfettiButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  options?: ConfettiOptions &
    ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };
};

export const ConfettiButton = forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  ({ options, children, onClick, ...props }, ref) => {
    const handleClick: ConfettiButtonProps["onClick"] = (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      fireConfettiFrom(event.currentTarget, options);
    };

    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);

ConfettiButton.displayName = "ConfettiButton";
