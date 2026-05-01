"use client";

import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { useLayoutEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start, e.g. "top 88%" */
  start?: string;
};

export function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  duration = 0.75,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
