"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { HeroSlideNavTone } from "./hero-overlay-context";
import { useHeroOverlay } from "./hero-overlay-context";

export type HomeHeroSlide = {
  src: string;
  alt: string;
  navTone?: HeroSlideNavTone;
};

type HomeHeroProps = {
  slides: HomeHeroSlide[];
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

const AUTOPLAY_MS = 6500;

export function HomeHero({
  slides,
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  const { setSlides, setActiveIndex, clear } = useHeroOverlay();
  const [activeIndex, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pauseRef = useRef(false);

  const count = slides.length;
  const safeIndex = count ? Math.min(activeIndex, count - 1) : 0;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const meta = slides.map((s) => ({
      /* "light" = light foreground (nav/copy) on dark photography */
      navTone: s.navTone ?? "light",
    }));
    setSlides(meta);
    return () => clear();
  }, [slides, setSlides, clear]);

  useEffect(() => {
    setActiveIndex(safeIndex);
  }, [safeIndex, setActiveIndex]);

  useEffect(() => {
    if (count <= 1 || reduceMotion) return;

    const tick = () => {
      if (pauseRef.current) return;
      setIndex((i) => (i + 1) % count);
    };

    const id = window.setInterval(tick, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, reduceMotion]);

  const goTo = useCallback(
    (i: number) => {
      if (!count) return;
      const next = ((i % count) + count) % count;
      setIndex(next);
    },
    [count],
  );

  const trackPct = count ? 100 / count : 100;

  const foregroundLight = (slides[safeIndex]?.navTone ?? "light") === "light";

  const toneTransition =
    "transition-colors duration-500 motion-safe:ease-[var(--ease-editorial)]";

  return (
    <section
      aria-label="Featured"
      className={cn(
        "relative isolate -mt-[length:var(--hero-nav-stack)] h-[100dvh] max-h-[100dvh] min-h-[100dvh] w-full overflow-hidden",
      )}
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
      onFocusCapture={() => {
        pauseRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) pauseRef.current = false;
      }}
    >
      <div className="absolute inset-0 h-full">
        <div
          className={cn(
            "flex h-full",
            reduceMotion ? "" : "transition-transform duration-[760ms] motion-safe:ease-[var(--ease-editorial)]",
          )}
          style={{
            width: `${Math.max(count, 1) * 100}%`,
            transform: count ? `translateX(-${safeIndex * trackPct}%)` : undefined,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="relative h-full shrink-0 overflow-hidden"
              style={{ width: `${trackPct}%` }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slight darken for contrast without hiding photography */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/[0.26] md:bg-black/[0.22]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col pt-[length:var(--hero-nav-stack)] pb-[max(1rem,env(safe-area-inset-bottom))] md:pb-10">
        <div className="site-container mt-auto mb-12 flex min-h-0 w-full flex-col md:mb-16 lg:mb-[clamp(3.25rem,11vh,6.5rem)]">
          <Reveal start="top 92%" y={18}>
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-12 xl:gap-x-16">
              <div className="flex min-h-0 max-w-xl flex-col gap-4 md:gap-5 lg:max-w-2xl">
                {/* Brand line - backed for legibility on photography */}
                <p
                  className={cn(
                    "label-ui inline-flex w-fit max-w-full flex-wrap items-center border border-white/15 px-3 py-1.5 text-[10px] tracking-[0.16em] shadow-[0_2px_28px_rgba(0,0,0,0.42)] backdrop-blur-md md:px-3.5 md:py-2 md:text-[11px]",
                    foregroundLight
                      ? "bg-black/52 text-white"
                      : "bg-[color:var(--surface-alt)]/92 text-[color:var(--charcoal)] shadow-[0_2px_24px_rgba(0,0,0,0.18)] backdrop-blur-md border-[color:var(--charcoal)]/12",
                  )}
                >
                  {eyebrow}
                </p>

                {/* Headline + supporting copy */}
                <div className="flex flex-col gap-3 md:gap-4">
                  <h1
                    className={cn(
                      "font-display max-w-[22rem] text-[clamp(2rem,5vw+0.65rem,3.625rem)] leading-[1.05] tracking-[-0.02em] sm:max-w-xl lg:max-w-2xl lg:text-[clamp(2.75rem,4.8vw+0.5rem,4rem)]",
                      toneTransition,
                      foregroundLight ? "text-white" : "text-[color:var(--charcoal)]",
                    )}
                  >
                    {title}
                  </h1>
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

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-1 md:pt-2">
                  <Link
                    href={primaryCta.href}
                    className="label-ui inline-flex h-11 shrink-0 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
                  >
                    {primaryCta.label}
                  </Link>
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
                </div>
              </div>

              {count > 1 ? (
                <div
                  className="flex gap-2 lg:flex-col lg:items-end lg:justify-end lg:pb-0.5"
                  role="tablist"
                  aria-label="Hero images"
                >
                  {slides.map((slide, i) => (
                    <button
                      key={slide.src}
                      type="button"
                      role="tab"
                      aria-selected={i === safeIndex}
                      aria-label={`Image ${i + 1} of ${count}`}
                      className={cn(
                        "h-1.5 shrink-0 rounded-none transition-[width,opacity,background-color] duration-300 motion-safe:ease-[var(--ease-editorial)]",
                        i === safeIndex
                          ? "w-8 bg-[color:var(--primary)] opacity-100 lg:h-8 lg:w-1.5"
                          : foregroundLight
                            ? "w-2 bg-white/35 hover:bg-white/55 lg:h-2 lg:w-1.5"
                            : "w-2 bg-[color:var(--charcoal)]/35 hover:bg-[color:var(--charcoal)]/55 lg:h-2 lg:w-1.5 md:bg-[color:var(--charcoal)]/25",
                      )}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
