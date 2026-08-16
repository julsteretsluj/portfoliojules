"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap, prefersReducedMotion } from "@/motion/setup";

export type DockApp = {
  id: string;
  name: string;
  icon: string;
};

type MacOSDockProps = {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
  openApps?: string[];
  className?: string;
};

function getResponsiveConfig() {
  if (typeof window === "undefined") {
    return { baseIconSize: 64, maxScale: 1.6, effectWidth: 240 };
  }
  const shortest = Math.min(window.innerWidth, window.innerHeight);
  if (shortest < 480) {
    return {
      baseIconSize: Math.max(40, shortest * 0.08),
      maxScale: 1.4,
      effectWidth: shortest * 0.4,
    };
  }
  if (shortest < 768) {
    return {
      baseIconSize: Math.max(48, shortest * 0.07),
      maxScale: 1.5,
      effectWidth: shortest * 0.35,
    };
  }
  if (shortest < 1024) {
    return {
      baseIconSize: Math.max(56, shortest * 0.06),
      maxScale: 1.6,
      effectWidth: shortest * 0.3,
    };
  }
  return {
    baseIconSize: Math.max(64, Math.min(80, shortest * 0.05)),
    maxScale: 1.8,
    effectWidth: 300,
  };
}

export default function MacOSDock({
  apps,
  onAppClick,
  openApps = [],
  className = "",
}: MacOSDockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [scales, setScales] = useState(() => apps.map(() => 1));
  const [positions, setPositions] = useState<number[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const lastMoveRef = useRef(0);
  const reduced = prefersReducedMotion();

  const getConfig = useCallback(() => getResponsiveConfig(), []);
  const [config, setConfig] = useState(getConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1;
  const gap = Math.max(4, baseIconSize * 0.08);

  useEffect(() => {
    const handleResize = () => setConfig(getConfig());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getConfig]);

  const calculateScales = useCallback(
    (x: number | null) => {
      if (x === null || reduced) return apps.map(() => minScale);
      return apps.map((_, index) => {
        const center = index * (baseIconSize + gap) + baseIconSize / 2;
        const left = x - effectWidth / 2;
        const right = x + effectWidth / 2;
        if (center < left || center > right) return minScale;
        const angle = ((center - left) / effectWidth) * 2 * Math.PI;
        const clamped = Math.min(Math.max(angle, 0), 2 * Math.PI);
        const influence = (1 - Math.cos(clamped)) / 2;
        return minScale + influence * (maxScale - minScale);
      });
    },
    [apps, baseIconSize, gap, effectWidth, maxScale, reduced],
  );

  const calculatePositions = useCallback(
    (nextScales: number[]) => {
      let cursor = 0;
      return nextScales.map((scale) => {
        const size = baseIconSize * scale;
        const center = cursor + size / 2;
        cursor += size + gap;
        return center;
      });
    },
    [baseIconSize, gap],
  );

  useEffect(() => {
    const nextScales = apps.map(() => minScale);
    setScales(nextScales);
    setPositions(calculatePositions(nextScales));
  }, [apps, calculatePositions, config]);

  const animate = useCallback(() => {
    const targetScales = calculateScales(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const easing = mouseX !== null ? 0.2 : 0.12;
    setScales((current) =>
      current.map((value, i) => value + (targetScales[i] - value) * easing),
    );
    setPositions((current) =>
      current.map((value, i) => value + (targetPositions[i] - value) * easing),
    );
    const scalesMoving = scales.some(
      (value, i) => Math.abs(value - targetScales[i]) > 0.002,
    );
    const positionsMoving = positions.some(
      (value, i) => Math.abs(value - targetPositions[i]) > 0.1,
    );
    if (scalesMoving || positionsMoving || mouseX !== null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [mouseX, calculateScales, calculatePositions, scales, positions]);

  useEffect(() => {
    if (reduced) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, reduced]);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const now = performance.now();
      if (now - lastMoveRef.current < 16) return;
      lastMoveRef.current = now;
      if (!dockRef.current) return;
      const rect = dockRef.current.getBoundingClientRect();
      const pad = Math.max(8, baseIconSize * 0.12);
      setMouseX(event.clientX - rect.left - pad);
    },
    [baseIconSize, reduced],
  );

  const onMouseLeave = useCallback(() => setMouseX(null), []);

  const bounce = (el: HTMLElement, index: number) => {
    if (reduced) return;
    const distance =
      scales[index] > 1.3 ? -baseIconSize * 0.2 : -baseIconSize * 0.15;
    gsap.to(el, {
      y: distance,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      transformOrigin: "bottom center",
    });
  };

  const handleAppClick = (id: string, index: number) => {
    const el = iconRefs.current[index];
    if (el) bounce(el, index);
    onAppClick(id);
  };

  const contentWidth =
    positions.length > 0
      ? Math.max(
          ...positions.map((pos, i) => pos + (baseIconSize * scales[i]) / 2),
        )
      : apps.length * (baseIconSize + gap) - gap;
  const pad = Math.max(8, baseIconSize * 0.12);

  return (
    <div
      ref={dockRef}
      className={`backdrop-blur-md ${className}`}
      role="navigation"
      aria-label="Dock"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        width: `${contentWidth + pad * 2}px`,
        background: "rgba(45, 45, 45, 0.75)",
        borderRadius: `${Math.max(12, baseIconSize * 0.4)}px`,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: `
          0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0, 0, 0, 0.4),
          0 ${Math.max(2, baseIconSize * 0.05)}px ${Math.max(8, baseIconSize * 0.2)}px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2)
        `,
        padding: `${pad}px`,
      }}
    >
      <div className="relative" style={{ height: `${baseIconSize}px`, width: "100%" }}>
        {apps.map((app, index) => {
          const scale = scales[index] ?? 1;
          const left = positions[index] || 0;
          const size = baseIconSize * scale;
          return (
            <button
              key={app.id}
              ref={(node) => {
                iconRefs.current[index] = node;
              }}
              type="button"
              className="absolute flex cursor-pointer flex-col items-center justify-end border-0 bg-transparent p-0"
              title={app.name}
              aria-label={app.name}
              aria-current={openApps.includes(app.id) ? "page" : undefined}
              onClick={() => handleAppClick(app.id, index)}
              style={{
                left: `${left - size / 2}px`,
                bottom: "0px",
                width: `${size}px`,
                height: `${size}px`,
                transformOrigin: "bottom center",
                zIndex: Math.round(scale * 10),
              }}
            >
              <img
                src={app.icon}
                alt=""
                width={size}
                height={size}
                className="object-contain"
                draggable={false}
                style={{
                  filter: `drop-shadow(0 ${scale > 1.2 ? Math.max(2, baseIconSize * 0.05) : Math.max(1, baseIconSize * 0.03)}px ${scale > 1.2 ? Math.max(4, baseIconSize * 0.1) : Math.max(2, baseIconSize * 0.06)}px rgba(0,0,0,${0.2 + (scale - 1) * 0.15}))`,
                }}
              />
              {openApps.includes(app.id) ? (
                <div
                  className="absolute"
                  style={{
                    bottom: `${Math.max(-2, -baseIconSize * 0.05)}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: `${Math.max(3, baseIconSize * 0.06)}px`,
                    height: `${Math.max(3, baseIconSize * 0.06)}px`,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
