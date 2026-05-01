"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type DotPatternProps = Omit<ComponentPropsWithoutRef<"svg">, "children"> & {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
};

export function DotPattern({
  width = 7,
  height = 7,
  x = 0,
  y = 0,
  cx = 3.5,
  cy = 3.5,
  cr = 0.55,
  className,
  ...props
}: DotPatternProps) {
  const patternId = `leafo-dots-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-[color:var(--outline)]/[0.13]",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
    </svg>
  );
}
