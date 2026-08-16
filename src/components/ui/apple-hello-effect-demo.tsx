import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

const AppleHelloEffectDemo = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <AppleHelloEnglishEffect speed={1.1} />
    </div>
  );
};

export { AppleHelloEffectDemo };
