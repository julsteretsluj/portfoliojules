import { useState } from "react";
import { cn } from "@/lib/utils";

export type RevealImage = {
  src: string;
  alt: string;
};

export type RevealImageItem = {
  text: string;
  images?: RevealImage[];
};

type RevealImageListItemProps = {
  text: string;
  images?: RevealImage[];
};

function Frame({ image, label }: { image?: RevealImage; label: string }) {
  if (image?.src) {
    return (
      <img alt={image.alt} src={image.src} className="h-full w-full object-cover" />
    );
  }

  return (
    <span className="reveal-image-soon" aria-hidden="true">
      {label}
    </span>
  );
}

function RevealImageListItem({ text, images = [] }: RevealImageListItemProps) {
  const [open, setOpen] = useState(false);
  const frames = images.length > 0 ? images : [undefined, undefined];
  const effect =
    "reveal-image-frame relative duration-500 delay-100 shadow-none group-hover/reveal:shadow-xl group-focus-within/reveal:shadow-xl group-[.is-open]/reveal:shadow-xl scale-0 group-hover/reveal:scale-100 group-focus-within/reveal:scale-100 group-[.is-open]/reveal:scale-100 opacity-0 group-hover/reveal:opacity-100 group-focus-within/reveal:opacity-100 group-[.is-open]/reveal:opacity-100 group-hover/reveal:w-full group-hover/reveal:h-full group-focus-within/reveal:w-full group-focus-within/reveal:h-full group-[.is-open]/reveal:w-full group-[.is-open]/reveal:h-full w-16 h-16 overflow-hidden transition-all rounded-[10px]";

  return (
    <div
      className={cn(
        "group/reveal reveal-image-item relative h-fit w-fit overflow-visible py-2 pr-14",
        open && "is-open",
      )}
      tabIndex={0}
      onPointerUp={(event) => {
        if (event.pointerType === "touch") setOpen((value) => !value);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen((value) => !value);
        }
      }}
    >
      <p className="reveal-image-name">{text}</p>
      {[...frames].reverse().map((image, index) => (
        <div
          key={image?.src ?? `soon-${text}-${index}`}
          className="reveal-image-stack"
        >
          <div className={cn(effect, index === frames.length - 1 && "duration-200")}>
            <Frame image={image} label="Soon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RevealImageList({
  items,
  className,
}: {
  items: RevealImageItem[];
  className?: string;
}) {
  return (
    <div className={cn("reveal-image-list", className)}>
      {items.map((item) => (
        <RevealImageListItem
          key={item.text}
          text={item.text}
          images={item.images}
        />
      ))}
    </div>
  );
}
