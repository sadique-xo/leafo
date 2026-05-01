"use client";

import Link from "next/link";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";

export type HomeHoverSliderSlide = {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
};

export function HomeHoverSlider({ slides }: { slides: HomeHoverSliderSlide[] }) {
  if (slides.length === 0) return null;

  return (
    <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <HoverSlider>
        <div className="site-container flex flex-col gap-10 py-14 text-[color:var(--charcoal)] md:gap-12 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="label-ui text-[11px] text-[color:var(--secondary-brand)]">/ finishes</p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right md:text-base">
              Hover a line to preview the surface, each is applied by hand in our workshop.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-10 md:flex-row md:gap-16 lg:gap-24">
            <div className="flex min-w-0 flex-1 flex-col gap-7 md:max-w-[min(100%,42rem)] md:justify-between md:gap-0 md:py-1 lg:py-2">
              {slides.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  className="cursor-pointer font-display text-[clamp(2.25rem,4.5vw+1rem,4.75rem)] uppercase leading-[0.92] tracking-[-0.03em] text-[color:var(--charcoal)] md:leading-[0.88]"
                  text={slide.title}
                />
              ))}
            </div>
            <HoverSliderImageWrap className="aspect-[4/5] w-full max-w-md shrink-0 md:max-w-lg">
              {slides.map((slide, index) => (
                <HoverSliderImage
                  key={slide.id}
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.alt}
                  className="size-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 28rem"
                />
              ))}
            </HoverSliderImageWrap>
          </div>

          <Link
            href="/finishes"
            className="link-underline-editorial label-ui inline-flex w-fit text-[11px] text-[color:var(--charcoal)]"
          >
            See finishes in detail →
          </Link>
        </div>
      </HoverSlider>
    </section>
  );
}
