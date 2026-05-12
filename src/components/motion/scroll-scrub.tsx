"use client";

import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";

type TriggerLike = string | Element | RefObject<Element | null> | null | undefined;

type ScrubVars = Omit<gsap.TweenVars, "scrollTrigger">;

type ScrollScrubProps = {
  children: ReactNode;
  from: ScrubVars;
  to: ScrubVars;
  trigger?: TriggerLike;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
};

function resolveTrigger(
  trigger: TriggerLike,
  fallback: HTMLDivElement,
): Element {
  if (!trigger) return fallback;
  if (typeof trigger === "string") return document.querySelector(trigger) ?? fallback;
  if ("current" in trigger) return trigger.current ?? fallback;
  return trigger;
}

export function ScrollScrub({
  children,
  from,
  to,
  trigger,
  start = "top top",
  end = "bottom top",
  scrub = true,
  className,
}: ScrollScrubProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!motionAllowed()) {
        gsap.set(el, from);
        return;
      }

      gsap.fromTo(el, from, {
        ...to,
        ease: "none",
        scrollTrigger: {
          trigger: resolveTrigger(trigger, el),
          start,
          end,
          scrub,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [from, to, trigger, start, end, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
