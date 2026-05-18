"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { DotPattern } from "@/components/ui/dot-pattern";
import type { CollectionItem } from "@/data/site-content";
import { saveCollectionListScroll } from "@/lib/collection-list-scroll";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/motion/lenis-context";

type HomeCollectionsRailProps = {
  collections: CollectionItem[];
  title: string;
  intro: string;
};

export function HomeCollectionsRail({
  collections,
  title,
  intro,
}: HomeCollectionsRailProps) {
  const lenis = useLenis();
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(collections.length > 1);

  const updateControls = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setCanScrollPrev(rail.scrollLeft > 8);
    setCanScrollNext(rail.scrollLeft < maxScrollLeft - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const frame = window.requestAnimationFrame(updateControls);
    rail.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls, { passive: true });

    // Horizontal trackpad swipes scroll the rail; vertical wheel must reach Lenis.
    const onWheel = (event: WheelEvent) => {
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      if (absX <= absY || absX === 0) return;

      const maxLeft = rail.scrollWidth - rail.clientWidth;
      if (maxLeft <= 0) return;

      const nextLeft = rail.scrollLeft + event.deltaX;
      if (nextLeft < 0 || nextLeft > maxLeft) return;

      event.preventDefault();
      rail.scrollLeft = nextLeft;
    };

    rail.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", updateControls);
      rail.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  const saveRailScroll = useCallback(
    (slug: string) => {
      saveCollectionListScroll({
        returnPath: "/",
        slug,
        pageScrollY: lenis?.scroll ?? window.scrollY,
        railScrollLeft: railRef.current?.scrollLeft,
      });
    },
    [lenis],
  );

  const scrollByPage = (direction: "prev" | "next") => {
    const rail = railRef.current;
    if (!rail) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    let scrollAmount: number;

    if (isDesktop) {
      const firstCard = rail.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(rail).gap) || 0;
      scrollAmount = firstCard ? firstCard.offsetWidth + gap : rail.clientWidth * 0.86;
    } else {
      scrollAmount = rail.clientWidth * 0.86;
    }

    rail.scrollBy({
      left: scrollAmount * (direction === "next" ? 1 : -1),
      behavior: "smooth",
    });
  };

  if (collections.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--surface-alt)]">
      <DotPattern className="fill-[color:var(--charcoal)]/[0.05] md:fill-[color:var(--charcoal)]/[0.07]" />
      <div className="relative z-10 site-container py-14 md:py-16 lg:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                {intro}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByPage("prev")}
                disabled={!canScrollPrev}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--primary-ink)] text-[color:var(--primary-ink)] transition-all duration-300",
                  canScrollPrev
                    ? "hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.96]"
                    : "cursor-not-allowed opacity-35",
                )}
                aria-label="Scroll collections left"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollByPage("next")}
                disabled={!canScrollNext}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--primary-ink)] text-[color:var(--primary-ink)] transition-all duration-300",
                  canScrollNext
                    ? "hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.96]"
                    : "cursor-not-allowed opacity-35",
                )}
                aria-label="Scroll collections right"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden md:mt-12">
          <div
            ref={railRef}
            data-collections-rail
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {collections.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                data-collection-slug={item.slug}
                onClick={() => saveRailScroll(item.slug)}
                className="group w-[min(76vw,21rem)] shrink-0 snap-start sm:w-[19rem] lg:w-[21rem]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--surface-strong)]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 76vw, 21rem"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-5">
                  <div>
                    <p className="label-ui text-[11px] text-[color:var(--charcoal)]">
                      {item.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="label-ui shrink-0 pt-0.5 text-[10px] text-[color:var(--primary-ink)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-8 md:mt-10">
            <Link href="/collections" className="link-underline-editorial label-ui text-[11px]">
              View all collections →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
