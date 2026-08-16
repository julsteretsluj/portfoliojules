"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollContextValue = {
  scrollYProgress: MotionValue<number>;
};

const ScrollContext = React.createContext<ScrollContextValue | null>(null);

function useScrollContext() {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error("Scroll animation parts must be used inside ContainerScroll");
  }
  return context;
}

export function ContainerScroll({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const reduced = useReducedMotion();

  return (
    <ScrollContext.Provider
      value={{ scrollYProgress: reduced ? scrollYProgress : smooth }}
    >
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

export function ContainerSticky({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

type ContainerAnimatedProps = HTMLMotionProps<"div"> & {
  inputRange?: number[];
  outputRange?: number[];
};

export function ContainerAnimated({
  className,
  inputRange = [0, 1],
  outputRange = [72, 0],
  style,
  ...props
}: ContainerAnimatedProps) {
  const { scrollYProgress } = useScrollContext();
  const y = useTransform(scrollYProgress, inputRange, outputRange);
  const opacity = useTransform(scrollYProgress, inputRange, [0.15, 1]);

  return (
    <motion.div
      className={className}
      style={{ y, opacity, willChange: "transform, opacity", ...style }}
      {...props}
    />
  );
}

export function ContainerInset({
  className,
  style,
  ...props
}: HTMLMotionProps<"div">) {
  const { scrollYProgress } = useScrollContext();
  const inset = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 10]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% round ${radius}px)`;

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      style={{ clipPath, willChange: "clip-path", ...style }}
      {...props}
    />
  );
}

export function HeroVideo({
  src,
  className,
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScrollContext();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration || reduced) return;
    video.currentTime = latest * video.duration;
  });

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

export function HeroButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-medium text-[#1d1d1f] transition-transform duration-300 hover:scale-[1.03]",
        className,
      )}
      {...props}
    />
  );
}
