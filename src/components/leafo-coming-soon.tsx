"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SCROLL_LINES = [
  "Coming soon.",
  "Something's cooking.",
  "Still on the stove.",
  "Simmering nicely.",
  "Almost ready.",
  "Finishing touches.",
  "Worth the wait.",
  "Hold tight.",
] as const;

const SCROLL_END = "+=340%";
const SCRUB = 0.52;

export function LeafoComingSoon() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineIndex, setLineIndex] = useState(0);

  const onSequenceProgress = useCallback((t: number) => {
    const n = SCROLL_LINES.length;
    const next = Math.min(n - 1, Math.floor(t * n));
    setLineIndex((prev) => (prev === next ? prev : next));
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: SCROLL_END,
        pin: true,
        pinSpacing: true,
        scrub: SCRUB,
        onUpdate: (st) => {
          onSequenceProgress(st.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [onSequenceProgress]);

  return (
    <div className="min-h-screen bg-[var(--leafo-void)] text-white">
      <section
        ref={sectionRef}
        className="relative isolate h-screen overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/planters.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/80"
        />

        <div className="relative z-10 flex h-full flex-col">
          <header className="pointer-events-none flex shrink-0 flex-col gap-3 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10 lg:p-14">
            <p className="font-[family-name:var(--font-ui)] text-[10px] font-medium uppercase tracking-[0.35em] text-white/85 sm:max-w-md sm:text-xs">
              Pots &amp; planter · Manufacture of fiber pots · Fiber modules
              maker
            </p>
            <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] text-white/70">
              Est. — India
            </span>
          </header>

          <div className="relative flex min-h-0 flex-1 flex-col justify-end">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/85 from-10% via-black/40 to-transparent sm:h-48"
            />
            <div className="relative z-10 flex flex-col items-center gap-5 px-6 pb-10 text-center sm:px-10 sm:pb-14 lg:px-14">
              <p className="font-[family-name:var(--font-ui)] text-[11px] uppercase tracking-[0.55em] text-white/70">
                Scroll
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,9rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)]">
                LEAFO
              </h1>
              <p
                key={lineIndex}
                className="leafo-scroll-line font-[family-name:var(--font-display)] max-w-md text-xl font-medium leading-snug text-white/95 sm:text-2xl"
                aria-live="polite"
              >
                {SCROLL_LINES[lineIndex]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
