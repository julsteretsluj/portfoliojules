import { Balloons } from "@/components/ui/balloons";
import { useRef } from "react";

export function DefaultBalloonsDemo() {
  const balloonsRef = useRef<{ launchAnimation: () => void } | null>(null);

  const handleLaunch = () => {
    balloonsRef.current?.launchAnimation();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <button type="button" className="btn btn-primary" onClick={handleLaunch}>
        Launch Balloons! 🎈
      </button>

      <Balloons ref={balloonsRef} type="default" />
    </div>
  );
}

export function TextBalloonsDemo() {
  const balloonsRef = useRef<{ launchAnimation: () => void } | null>(null);

  const handleLaunch = () => {
    balloonsRef.current?.launchAnimation();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <button type="button" className="btn btn-primary" onClick={handleLaunch}>
        Launch Text Balloons! 🎈
      </button>

      <Balloons
        ref={balloonsRef}
        type="text"
        text="🎈✨🎉"
        fontSize={120}
        color="#000000"
      />
    </div>
  );
}
