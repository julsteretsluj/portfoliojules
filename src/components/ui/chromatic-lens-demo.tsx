import { ChromaticLensEffect } from "@/components/ui/chromatic-lens";

export function ChromaticLensDemo() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[28px]">
      <ChromaticLensEffect
        image={{ src: "/images/profile-photo.png" }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
