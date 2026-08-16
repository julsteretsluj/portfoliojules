import { cn } from "@/lib/utils";

const DEFAULT_WORDS = ["Develop.", "Preview.", "Ship."] as const;

type TextColorProps = {
  words?: readonly [string, string, string];
  as?: "h1" | "h2" | "p";
  className?: string;
};

export function TextColor({
  words = DEFAULT_WORDS,
  as: Tag = "h1",
  className,
}: TextColorProps) {
  const [first, second, third] = words;

  return (
    <div className={cn("text-color", className)}>
      <div className="mb-10 mt-4 md:mt-6">
        <div className="px-2">
          <div className="relative h-full w-full p-8 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)]">
            <Tag className="text-color-heading flex select-none flex-col px-3 py-2 text-center text-7xl font-extrabold leading-none tracking-tighter sm:text-8xl md:flex-col lg:flex-row">
              <span
                data-content={first}
                className="before:animate-gradient-background-1 relative before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                  {first}
                </span>
              </span>
              <span
                data-content={second}
                className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                  {second}
                </span>
              </span>
              <span
                data-content={third}
                className="before:animate-gradient-background-3 relative before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                  {third}
                </span>
              </span>
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
}
