import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CornerFrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

const cornerClass = "corner-frame-mark";

export function CornerFrame({ children, className, innerClassName }: CornerFrameProps) {
  return (
    <div className={cn("corner-frame relative", className)}>
      <span className={cn(cornerClass, "-left-1 -top-1")} aria-hidden />
      <span className={cn(cornerClass, "-bottom-1 -left-1")} aria-hidden />
      <span className={cn(cornerClass, "-right-1 -top-1")} aria-hidden />
      <span className={cn(cornerClass, "-bottom-1 -right-1")} aria-hidden />
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}
