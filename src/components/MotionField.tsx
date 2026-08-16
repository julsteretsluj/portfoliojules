import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../motion/setup";

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
};

export default function MotionField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (prefersReducedMotion()) {
      return;
    }

    const pointer = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 };
    const orbs: Orb[] = [
      { x: 0.22, y: 0.28, r: 180, vx: 0.00018, vy: 0.00012, hue: 205 },
      { x: 0.72, y: 0.22, r: 150, vx: -0.00014, vy: 0.00016, hue: 195 },
      { x: 0.52, y: 0.62, r: 210, vx: 0.0001, vy: -0.00011, hue: 220 },
      { x: 0.18, y: 0.7, r: 120, vx: 0.00016, vy: -0.00013, hue: 188 },
      { x: 0.86, y: 0.58, r: 130, vx: -0.00012, vy: 0.00009, hue: 212 },
    ];

    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    const drawRibbon = (t: number, offset: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 40; i += 1) {
        const p = i / 40;
        const x = p * width;
        const y =
          height * (0.28 + offset) +
          Math.sin(p * 6 + t + offset * 8) * 42 +
          Math.cos(p * 3.2 - t * 0.7) * 18 +
          (pointer.y - 0.5) * 40;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(0, 113, 227, ${alpha})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };

    const tick = () => {
      frame += 1;
      const t = frame * 0.008;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      orbs.forEach((orb, i) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < 0.08 || orb.x > 0.92) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.88) orb.vy *= -1;
        const px = (orb.x + (pointer.x - 0.5) * 0.08) * width;
        const py = (orb.y + (pointer.y - 0.5) * 0.08) * height;
        const g = ctx.createRadialGradient(px, py, 0, px, py, orb.r);
        g.addColorStop(0, `hsla(${orb.hue}, 90%, 62%, 0.28)`);
        g.addColorStop(0.45, `hsla(${orb.hue + i * 4}, 80%, 58%, 0.1)`);
        g.addColorStop(1, "hsla(210, 80%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      drawRibbon(t, 0, 0.22);
      drawRibbon(t * 1.15 + 1, 0.18, 0.14);
      drawRibbon(t * 0.8 + 2.1, 0.38, 0.1);

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    canvas.parentElement?.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (typeof window !== "undefined" && prefersReducedMotion()) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="motion-field"
      aria-hidden="true"
    />
  );
}
