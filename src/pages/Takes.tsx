import { useCallback, useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { takes } from "../data";
import { cn } from "@/lib/utils";

function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

function signedOffset(index: number, active: number, count: number) {
  let delta = index - active;
  const half = count / 2;
  if (delta > half) delta -= count;
  if (delta < -half) delta += count;
  return delta;
}

export default function Takes() {
  const count = takes.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = takes[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(wrapIndex(index, count));
    },
    [count],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

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

      <section className="takes-gallery-wrap" data-reveal>
        <div className="takes-stage">
          <button
            type="button"
            className="takes-arrow"
            aria-label="Previous take"
            onClick={() => goTo(activeIndex - 1)}
          >
            <CaretLeft size={22} weight="bold" aria-hidden="true" />
          </button>

          <div className="takes-gallery" aria-label="Hot takes gallery">
            {takes.map((take, index) => {
              const offset = signedOffset(index, activeIndex, count);
              const distance = Math.abs(offset);
              if (distance > 2) return null;

              const isActive = index === activeIndex;
              const x = offset * 148;
              const y = distance * 10;
              const scale = isActive ? 1 : 0.82 - distance * 0.06;
              const rotate = offset * -11;

              return (
                <button
                  key={take.title}
                  type="button"
                  className={cn("take-gallery-card", isActive && "is-active")}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotateY(${rotate}deg) scale(${scale})`,
                    zIndex: 20 - distance,
                    opacity: isActive ? 1 : 0.38,
                  }}
                  tabIndex={isActive ? 0 : -1}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Take ${String(index + 1).padStart(2, "0")}: ${take.title}`}
                  onClick={() => goTo(index)}
                >
                  <p className="take-gallery-n">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {isActive ? (
                    <>
                      <h2 className="take-gallery-title">{take.title}</h2>
                      <p className="take-gallery-body">{take.body}</p>
                    </>
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="takes-arrow"
            aria-label="Next take"
            onClick={() => goTo(activeIndex + 1)}
          >
            <CaretRight size={22} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="takes-rotate">
          <label className="sr-only" htmlFor="takes-rotate-bar">
            Rotate through hot takes
          </label>
          <input
            id="takes-rotate-bar"
            className="takes-rotate-bar"
            type="range"
            min={0}
            max={count - 1}
            step={1}
            value={activeIndex}
            onChange={(event) => goTo(Number(event.target.value))}
            aria-valuetext={`${activeIndex + 1} of ${count}: ${active.title}`}
          />
          <p className="takes-rotate-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      </section>
    </>
  );
}
