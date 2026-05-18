"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type WeAreLine = { eyebrow?: string; line: string };

export type WeAreSlide = {
  image: { src: string; alt: string };
  line: WeAreLine;
};

type HomeWeAreProps = {
  slides: WeAreSlide[];
  closingCopy?: string;
};

export function HomeWeAre({ slides, closingCopy }: HomeWeAreProps) {
  const pinSectionRef = useRef<HTMLElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useLayoutEffect(() => {
    const pinSection = pinSectionRef.current;
    const imageStack = imageStackRef.current;
    const eyebrow = eyebrowRef.current;
    const images = imageRefs.current.filter((image): image is HTMLDivElement => Boolean(image));
    const lines = lineRefs.current.filter((line): line is HTMLParagraphElement => Boolean(line));
    if (!pinSection || !imageStack || !eyebrow || images.length === 0 || lines.length === 0) return;

    const ctx = gsap.context(() => {
      const isMdUp =
        typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
      const baselineIdx = isMdUp ? 0 : 1;
      const baselineLine = lines[baselineIdx];
      if (!baselineLine) return;

      const lineOffsets = lines.map((line) => line.offsetTop - baselineLine.offsetTop);
      const transitionPoints = [0, 0.32, 0.64];
      const fadeDuration = 0.045;
      gsap.set(imageStack, { scale: 1 });
      gsap.set(eyebrow, { y: 0 });
      gsap.set(images, { opacity: 0 });
      gsap.set(images[0], { opacity: 1 });
      gsap.set(lines, { opacity: 0.4 });
      if (isMdUp) {
        gsap.set(lines[0], { opacity: 1 });
      } else {
        gsap.set(lines[0], { autoAlpha: 0 });
        if (lines[1]) gsap.set(lines[1], { opacity: 1 });
      }

      if (!motionAllowed()) return;

      gsap.fromTo(
        imageStack,
        { scale: 0.8 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to({}, { duration: 1 });

      slides.forEach((_, index) => {
        if (index === 0) return;

        const position = transitionPoints[index] ?? index / slides.length;
        tl.to(images[index - 1], { opacity: 0, duration: fadeDuration, ease: "none" }, position);
        tl.to(images[index], { opacity: 1, duration: fadeDuration, ease: "none" }, position);
        tl.to(eyebrow, { y: lineOffsets[index], duration: fadeDuration, ease: "none" }, position);
        tl.to(lines, { opacity: 0.4, duration: fadeDuration, ease: "none" }, position);
        if (!isMdUp) tl.set(lines[0], { autoAlpha: 0 });
        tl.to(lines[index], { opacity: 1, duration: fadeDuration, ease: "none" }, position);
      });
    }, pinSection);

    return () => ctx.revert();
  }, [slides]);

  return (
    <section ref={pinSectionRef} className="relative hidden md:block md:h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-background">
        <div ref={imageStackRef} className="absolute inset-0 origin-center will-change-transform">
          {slides.map((slide, i) => (
            <div
              key={`${slide.image.src}-${i}`}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/45 pointer-events-none" aria-hidden />

        <div className="site-container absolute inset-x-0 top-1/2 -translate-y-1/2">
          <div className="max-w-4xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-6 lg:gap-8">
              <span ref={eyebrowRef} className="we-are-eyebrow">
                WE ARE
              </span>
              <div className="grid gap-[var(--we-are-line-gap)]">
                {slides.map((slide, i) => (
                  <p
                    key={`${slide.line.line}-${i}`}
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className={cn(
                      "we-are-line",
                      i === 0 && "hidden md:block md:opacity-100",
                      i === 1 && "opacity-100 md:opacity-40",
                      i === 2 && "opacity-40",
                    )}
                  >
                    {slide.line.line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {closingCopy ? (
          <div className="site-container absolute inset-x-0 bottom-[var(--we-are-closing-bottom)]">
            <p className="we-are-closing">{closingCopy}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
