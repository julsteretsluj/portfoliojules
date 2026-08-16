"use client";

import { cn } from "@/lib/utils";

type MetamorphicLoaderProps = {
  size: number;
  color?: string;
  lighteningStep?: number;
  className?: string;
};

function lightenColor(color: string, amount: number) {
  if (!color) return "#000000";
  const rgb = color.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return color;
  const r = Math.min(255, Math.max(0, parseInt(rgb[1], 16) + amount));
  const g = Math.min(255, Math.max(0, parseInt(rgb[2], 16) + amount));
  const b = Math.min(255, Math.max(0, parseInt(rgb[3], 16) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
}

export function MetamorphicLoader({
  size,
  color = "#8f10f6",
  lighteningStep = 24,
  className,
}: MetamorphicLoaderProps) {
  const circleSizes = Array.from({ length: 9 }, (_, i) => size - i * lighteningStep);

  return (
    <div
      className={cn("metamorphic-loader", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {circleSizes.map((circleSize, index) => (
        <div
          key={index}
          className="metamorphic-loader-ring"
          style={{
            backgroundColor: lightenColor(color, index * lighteningStep),
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            animationDelay: `${(index + 1) * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
