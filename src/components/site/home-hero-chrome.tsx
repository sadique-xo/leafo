"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { heroMotionAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import type { HeroSlideNavTone } from "./hero-overlay-context";
import { useHeroOverlay } from "./hero-overlay-context";
import type { HomeHeroSlide } from "./home-hero";

type HomeHeroChromeProps = {
  slide: HomeHeroSlide;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

export function HomeHeroChrome({
  slide,
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
}: HomeHeroChromeProps) {
  const { setSlides, clear } = useHeroOverlay();
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlides([{ navTone: slide.navTone ?? "light" }]);
    return () => clear();
  }, [slide.navTone, setSlides, clear]);

  useLayoutEffect(() => {
    const copy = copyRef.current;
    if (!copy || !heroMotionAllowed()) return;

    const items = copy.querySelectorAll("[data-hero-reveal]");

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 18 });

      gsap.timeline({ defaults: { ease: "power3.out" } }).to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.1,
        delay: 0.35,
      });
    }, copy);

    return () => ctx.revert();
  }, [slide.src]);

  const foregroundLight = (slide.navTone ?? "light") === "light";
  const toneTransition =
    "transition-colors duration-500 motion-safe:ease-[var(--ease-editorial)]";
  const revealClass =
    "max-md:opacity-100 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0";

  return (
    <>
      <div
        className="absolute inset-0 z-[1] bg-black/[0.26] md:bg-black/[0.22] pointer-events-none"
        aria-hidden
      />

      <div
        ref={copyRef}
        className="site-container absolute inset-x-0 bottom-0 z-10 grid gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:gap-4 md:pb-10 lg:gap-5 lg:pb-[clamp(3.25rem,11vh,6.5rem)]"
      >
        <div data-hero-reveal className={revealClass}>
          <span
            className={cn(
              "label-ui inline-flex w-fit max-w-full flex-wrap items-center border border-white/15 px-3 py-1.5 text-[10px] tracking-[0.16em] shadow-[0_2px_28px_rgba(0,0,0,0.42)] backdrop-blur-md md:px-3.5 md:py-2 md:text-[11px]",
              foregroundLight
                ? "bg-black/52 text-white"
                : "bg-[color:var(--surface-alt)]/92 text-[color:var(--charcoal)] shadow-[0_2px_24px_rgba(0,0,0,0.18)] border-[color:var(--charcoal)]/12",
            )}
          >
            {eyebrow}
          </span>
        </div>

        <div data-hero-reveal className={revealClass}>
          <h1
            className={cn(
              "font-display max-w-[22rem] text-[clamp(2rem,5vw+0.65rem,3.625rem)] leading-[1.05] tracking-[-0.02em] sm:max-w-xl lg:max-w-2xl lg:text-[clamp(2.75rem,4.8vw+0.5rem,4rem)]",
              toneTransition,
              foregroundLight ? "text-white" : "text-[color:var(--charcoal)]",
            )}
          >
            {title}
          </h1>
        </div>

        <div data-hero-reveal className={revealClass}>
          <p
            className={cn(
              "max-w-md text-[0.9375rem] leading-[1.62] md:max-w-lg md:text-base md:leading-relaxed",
              toneTransition,
              foregroundLight ? "text-white/76" : "text-muted-foreground",
            )}
          >
            {intro}
          </p>
        </div>

        <div data-hero-reveal className={revealClass}>
          <div className="flex flex-wrap gap-3 pt-1 md:pt-2">
            <Link
              href={primaryCta.href}
              className="label-ui inline-flex h-11 shrink-0 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta.href === "/contact" ? (
              <InquiryTrigger
                className={cn(
                  "label-ui inline-flex h-11 shrink-0 items-center px-8 text-[11px] transition-all duration-300 active:scale-[0.98]",
                  foregroundLight
                    ? "border border-white/85 bg-white/[0.08] text-white hover:bg-white hover:text-[color:var(--charcoal)]"
                    : "border border-[color:var(--primary-ink)] bg-[color:var(--surface-alt)]/85 text-[color:var(--primary-ink)] backdrop-blur-[2px] hover:bg-[color:var(--primary-ink)] hover:text-white",
                )}
              >
                {secondaryCta.label}
              </InquiryTrigger>
            ) : (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "label-ui inline-flex h-11 shrink-0 items-center px-8 text-[11px] transition-all duration-300 active:scale-[0.98]",
                  foregroundLight
                    ? "border border-white/85 bg-white/[0.08] text-white hover:bg-white hover:text-[color:var(--charcoal)]"
                    : "border border-[color:var(--primary-ink)] bg-[color:var(--surface-alt)]/85 text-[color:var(--primary-ink)] backdrop-blur-[2px] hover:bg-[color:var(--primary-ink)] hover:text-white",
                )}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
