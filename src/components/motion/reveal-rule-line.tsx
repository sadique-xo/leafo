"use client";

import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef } from "react";

type RevealRuleLineProps = {
  /** Extra classes on the outer wrapper (width/spacing). */
  className?: string;
  /** Delay before draw starts (seconds). */
  delay?: number;
  /** ScrollTrigger start string, e.g. "top 88%" */
  start?: string;
  /** Duration of the draw (seconds). */
  duration?: number;
};

export function RevealRuleLine({
  className = "",
  delay = 0,
  start = "top 88%",
  duration = 0.85,
}: RevealRuleLineProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const line = lineRef.current;
    if (!outer || !line) return;

    if (!motionAllowed()) {
      gsap.set(line, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(line, {
        scaleX: 1,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: outer,
          start,
          toggleActions: "play none none none",
        },
      });
    }, outer);

    return () => ctx.revert();
  }, [delay, duration, start]);

  return (
    <div ref={outerRef} className={cn("w-full", className)}>
      <div
        ref={lineRef}
        className="w-full bg-[color:var(--rule-color)]"
        style={{ height: "var(--rule-width-strong)" }}
        aria-hidden
      />
    </div>
  );
}
