"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { links } from "@/data";
import { gsap, prefersReducedMotion, registerMotion } from "@/motion/setup";

registerMotion();

const keyClass =
  "macbook-key custom-animate-keys float-left m-[1px] h-[6px] w-[6px] rounded-[2px] bg-[#444] shadow-[0_-2px_0_#222]";

const screens = [
  {
    label: "seamun.com",
    href: links.seamun,
    image: "/images/sites/seamun.jpg",
  },
  {
    label: "seamuns.site",
    href: links.seamuns,
    image: "/images/sites/seamuns.jpg",
  },
  {
    label: "intermun.site",
    href: links.intermun,
    image: "/images/sites/intermun.jpg",
  },
] as const;

type MacbookProps = {
  className?: string;
  interactive?: boolean;
};

export function Macbook({ className, interactive = false }: MacbookProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const screen = screens[screenIndex];

  useGSAP(
    () => {
      if (!interactive) return;
      const stage = stageRef.current;
      const inner = innerRef.current;
      if (!stage || !inner) return;

      const reduced = prefersReducedMotion();
      gsap.set(inner, { rotateX: -18, rotateY: -22, rotateZ: 0 });
      if (reduced) return;

      const rotX = gsap.quickTo(inner, "rotateX", {
        duration: 0.45,
        ease: "power3.out",
      });
      const rotY = gsap.quickTo(inner, "rotateY", {
        duration: 0.45,
        ease: "power3.out",
      });

      const onMove = (event: globalThis.PointerEvent) => {
        if (event.pointerType === "touch") return;
        const box = stage.getBoundingClientRect();
        const nx = (event.clientX - box.left) / box.width - 0.5;
        const ny = (event.clientY - box.top) / box.height - 0.5;
        rotY(-22 + nx * 48);
        rotX(-18 - ny * 26);
      };
      const reset = () => {
        rotY(-22);
        rotX(-18);
      };

      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", reset);
      return () => {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", reset);
      };
    },
    { dependencies: [interactive] },
  );

  function pressKey(event: PointerEvent<HTMLDivElement>) {
    if (!interactive || prefersReducedMotion()) return;
    const key = event.currentTarget;
    gsap.fromTo(
      key,
      { y: 0 },
      { y: 1.2, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out" },
    );
  }

  function cycleScreen(event: MouseEvent) {
    if (!interactive) return;
    event.preventDefault();
    event.stopPropagation();
    setScreenIndex((i) => (i + 1) % screens.length);
  }

  return (
    <div
      ref={stageRef}
      className={cn(
        "macbook-embed relative h-full w-full",
        interactive && "is-interactive",
        className,
      )}
    >
      <div className="macbook-container">
        <div
          ref={innerRef}
          className="macbook-inner custom-animate-rotate absolute left-0 top-0 z-20 h-[96px] w-[150px]"
        >
          <div className="macbook-screen custom-animate-lid-screen absolute bottom-0 left-0 h-[96px] w-[150px] rounded-[7px] bg-[#ddd] bg-[length:300px_300px] bg-left-bottom bg-[linear-gradient(45deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0)_100%)] shadow-[inset_0_3px_7px_rgba(255,255,255,0.5)]">
            <div className="macbook-screen-face-one absolute bottom-0 left-0 h-[96px] w-[150px] rounded-[7px] bg-[#d3d3d3] bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]">
              <div className="absolute left-1/2 top-[4px] ml-[-1.5px] h-[3px] w-[3px] rounded-full bg-black" />
              <div className="relative m-[10px] h-[74px] w-[130px] overflow-hidden rounded-[1px] bg-black bg-[length:100%_100%] shadow-[inset_0_0_2px_rgba(0,0,0,1)]">
                {interactive ? (
                  <button
                    type="button"
                    className="macbook-desktop"
                    onClick={cycleScreen}
                    aria-label={`Screen showing ${screen.label}. Click to switch site.`}
                  >
                    <img
                      key={screen.image}
                      className="macbook-desktop-shot"
                      src={screen.image}
                      alt=""
                      width={1440}
                      height={820}
                    />
                  </button>
                ) : (
                  <div className="macbook-desktop" aria-hidden="true">
                    <img
                      className="macbook-desktop-shot"
                      src={screens[0].image}
                      alt=""
                      width={1440}
                      height={820}
                    />
                  </div>
                )}
                <div className="custom-animate-screen-shade pointer-events-none absolute left-0 top-0 z-[2] h-[74px] w-[130px] bg-[length:300px_200px] bg-[position:0px_0px] bg-[linear-gradient(-135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_47%,rgba(255,255,255,0)_48%)]" />
                <span className="macbook-desktop-bar">{interactive ? screen.label : screens[0].label}</span>
              </div>
              <span className="absolute left-[57px] top-[85px] text-[6px] text-[#666]">
                MacBook Air
              </span>
            </div>
          </div>

          <div className="macbook-body custom-animate-lid-macbody absolute bottom-0 left-0 h-[96px] w-[150px] rounded-[7px] bg-[#cbcbcb] bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]">
            <div className="macbook-body-face-one custom-animate-lid-keyboard-area absolute bottom-0 left-0 h-[96px] w-[150px] rounded-[7px] bg-[#dfdfdf] bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]">
              <button
                type="button"
                className="macbook-trackpad"
                aria-label="Click the trackpad"
                disabled={!interactive}
                onClick={cycleScreen}
              />
              <div className="macbook-keyboard absolute left-[7px] top-[41px] h-[45px] w-[130px] overflow-hidden rounded-[4px] bg-[#cdcdcd] bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)] pl-[2px] shadow-[inset_0_0_3px_#777]">
                {Array.from({ length: 58 }).map((_, i) => (
                  <div
                    key={`key-norm-${i}`}
                    className={keyClass}
                    onPointerDown={pressKey}
                  />
                ))}
                <div className={`${keyClass} w-[45px]`} onPointerDown={pressKey} />
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={`key-f-${i}`}
                    className={`${keyClass} h-[3px]`}
                    onPointerDown={pressKey}
                  />
                ))}
              </div>
            </div>
            <div className="absolute left-[20px] top-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
            <div className="absolute right-[20px] top-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
            <div className="absolute bottom-[20px] right-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
            <div className="absolute bottom-[20px] left-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
          </div>
        </div>

        <div className="macbook-shadow custom-animate-macbook-shadow absolute left-[40px] top-[110px] h-[0px] w-[60px] shadow-[0_0_60px_40px_rgba(0,0,0,0.3)]" />
      </div>
    </div>
  );
}
