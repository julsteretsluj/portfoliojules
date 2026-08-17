"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const sizes = {
  default: "min-h-11 px-5",
  sm: "min-h-9 px-4 text-[0.82rem]",
  lg: "min-h-10 px-5",
  xl: "min-h-12 px-7",
  xxl: "min-h-14 px-8",
} as const;

export type LiquidButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  size?: keyof typeof sizes;
};

export function LiquidButton({
  className,
  size = "xl",
  asChild = false,
  children,
  ...props
}: LiquidButtonProps) {
  const classes = cn(
    "liquid-button inline-flex items-center justify-center whitespace-nowrap rounded-full text-[0.95rem] font-medium tracking-[-0.02em] no-underline",
    sizes[size],
    className,
  );

  if (asChild && React.isValidElement<Record<string, unknown>>(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(classes, children.props.className as string | undefined),
    });
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
