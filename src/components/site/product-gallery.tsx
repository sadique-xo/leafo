"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { CollectionImage } from "@/data/site-content";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD_PX = 48;

type ProductGalleryProps = {
  name: string;
  images: CollectionImage[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = images.length;
  const active = images[activeIndex] ?? images[0];
  const hasMultiple = count > 1;

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!lightboxOpen || !hasMultiple) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, hasMultiple, step]);

  const onTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || !hasMultiple) return;

    const deltaX = event.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    step(deltaX > 0 ? -1 : 1);
  };

  if (!active) return null;

  return (
    <>
      <div className="flex flex-col lg:h-[calc(100dvh-9.5rem)] lg:min-h-[22rem]">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${name} images at full size`}
          className="group relative block aspect-square max-h-[58vh] w-full overflow-hidden bg-white ring-[0.5px] ring-black/[0.07] transition-shadow duration-300 group-hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.25)] lg:aspect-auto lg:max-h-none lg:min-h-0 lg:flex-1"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority
            className="object-contain p-5 md:p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <span className="pointer-events-none absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="size-4" aria-hidden />
          </span>
        </button>

        {hasMultiple ? (
          <div
            className="mt-4 flex flex-wrap gap-2.5 lg:shrink-0"
            role="group"
            aria-label={`${name} photo thumbnails`}
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${count}`}
                aria-current={index === activeIndex}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden border bg-white transition-all duration-300 md:size-[4.5rem] lg:size-16",
                  index === activeIndex
                    ? "border-[color:var(--primary-ink)] opacity-100"
                    : "border-[color:var(--border)] opacity-65 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill className="object-contain p-1.5" sizes="6rem" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className="h-[100dvh] w-screen max-w-none gap-0 rounded-none border-0 bg-[color:var(--charcoal)]/97 p-0 ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">{name} images</DialogTitle>

          <div
            className="relative flex h-full w-full items-center justify-center"
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={onTouchEnd}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain p-4 md:p-12"
              sizes="100vw"
            />

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/22 md:top-6 md:right-6"
            >
              <X className="size-5" aria-hidden />
            </button>

            {hasMultiple ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/22 md:left-6"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/22 md:right-6"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
                <p className="label-ui absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/12 px-4 py-1.5 text-[10px] text-white md:bottom-8">
                  {activeIndex + 1} / {count}
                </p>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
