"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { useLayoutEffect, useRef, type ReactNode } from "react";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Re-run animations when this key changes (e.g. filter results). */
  staggerKey?: string;
  y?: number;
  stagger?: number;
  duration?: number;
};

export function RevealStagger({
  children,
  className = "",
  staggerKey = "",
  y = 36,
  stagger = 0.1,
  duration = 0.68,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;

    const items = root.querySelectorAll<HTMLElement>("[data-stagger-item]");
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration,
            stagger,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [staggerKey, y, stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
