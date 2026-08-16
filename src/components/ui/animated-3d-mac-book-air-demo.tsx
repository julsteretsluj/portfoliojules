import React from "react";
import { Macbook } from "@/components/ui/animated-3d-mac-book-air";

const Demo: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* The component is absolutely positioned, so this centering div is for context */}
      <Macbook />
    </div>
  );
};

export default Demo;
