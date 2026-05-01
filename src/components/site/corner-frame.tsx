import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CornerFrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

const cornerClass =
  "pointer-events-none absolute z-[1] size-3 bg-[color:var(--primary-ink)]";

export function CornerFrame({ children, className, innerClassName }: CornerFrameProps) {
  return (
    <div
      className={cn(
        "relative border-[length:var(--rule-width)] border-[color:var(--border)]",
        className,
      )}
    >
      <span className={cn(cornerClass, "-left-1.5 -top-1.5")} aria-hidden />
      <span className={cn(cornerClass, "-bottom-1.5 -left-1.5")} aria-hidden />
      <span className={cn(cornerClass, "-right-1.5 -top-1.5")} aria-hidden />
      <span className={cn(cornerClass, "-bottom-1.5 -right-1.5")} aria-hidden />
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}
