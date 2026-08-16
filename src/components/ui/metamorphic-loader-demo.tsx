"use client";
import { MetamorphicLoader } from "@/components/ui/metamorphic-loader";

const Purple = () => (
  <div>
    <MetamorphicLoader size={260} />
  </div>
);

const Blue = () => (
  <div>
    <MetamorphicLoader size={200} color="#156ef6" lighteningStep={18} />
  </div>
);

const Green = () => (
  <div>
    <MetamorphicLoader size={216} color="#6cc606" />
  </div>
);

const Orange = () => (
  <div>
    <MetamorphicLoader size={124} color="#ffa300" lighteningStep={14} />
  </div>
);

const Emerald = () => (
  <div>
    <MetamorphicLoader size={300} color="#019a41" lighteningStep={50} />
  </div>
);

export { Purple, Blue, Green, Orange, Emerald };
