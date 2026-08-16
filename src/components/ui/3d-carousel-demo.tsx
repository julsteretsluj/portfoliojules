import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex min-h-[500px] flex-col justify-center space-y-4 rounded-lg border border-dashed">
        <div className="p-2">
          <ThreeDPhotoCarousel
            images={[
              {
                src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&h=600&q=80",
                alt: "People collaborating around a table",
              },
              {
                src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=600&q=80",
                alt: "Travel map and camera",
              },
              {
                src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&h=600&q=80",
                alt: "Conference audience",
              },
              {
                src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&h=600&q=80",
                alt: "Speaker on stage",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
