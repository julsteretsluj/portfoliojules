import { useEffect, useMemo, useRef, useState } from "react";
import { takes } from "../data";
import { cn } from "@/lib/utils";

export default function Takes() {
  const allTakes = takes;
  const n = allTakes.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      // Keep the carousel legible on small screens.
      const next = Math.max(120, Math.min(220, w * 0.38));
      setRadius(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const yRadius = useMemo(() => radius * 0.58, [radius]);

  return (
    <>
      <header className="page-head takes-head">
        <p className="eyebrow">Hot takes</p>
        <h1>Working opinions, not a manifesto</h1>
        <p className="lede">
          How I actually run rooms, websites, and teams — and the systems I
          think those rooms should sit inside.
        </p>
      </header>

      <div className="takes-gallery-wrap" data-reveal>
        <div
          ref={galleryRef}
          className="takes-gallery"
          role="list"
          aria-label="Hot takes circular gallery"
        >
          {allTakes.map((take, idx) => {
            const step = (Math.PI * 2) / n;
            const diff = idx - activeIndex;
            // Put the active card at the "top" of the carousel.
            const angle = diff * step - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * yRadius;

            const cyclicDistance = Math.min(
              (idx - activeIndex + n) % n,
              (activeIndex - idx + n) % n,
            );

            const isActive = idx === activeIndex;
            const scale = isActive ? 1.06 : Math.max(0.78, 0.88 - cyclicDistance * 0.03);
            const opacity = isActive ? 1 : Math.max(0.35, 1 - cyclicDistance * 0.1);
            const zIndex = 2000 - cyclicDistance * 10;

            return (
              <button
                key={take.title}
                type="button"
                role="listitem"
                aria-label={`Hot take ${String(idx + 1).padStart(2, "0")}: ${take.title}`}
                className={cn(
                  "take-gallery-card",
                  isActive && "is-active",
                )}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
              >
                <p className="take-gallery-n">{String(idx + 1).padStart(2, "0")}</p>
                <h2 className="take-gallery-title">{take.title}</h2>
                <p className="take-gallery-body">{take.body}</p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
