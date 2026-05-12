"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageGalleryItem = {
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
};

type ImageGalleryProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: ImageGalleryItem[];
};

export function ImageGallery({ eyebrow, title, intro, items }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--surface-alt)]">
      <div className="site-container section-space">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-12">
          <div>
            {eyebrow ? (
              <p className="label-ui text-[10px] tracking-[0.16em] text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-display mt-4 text-3xl tracking-tight text-[color:var(--charcoal)] md:text-5xl">
              {title}
            </h2>
          </div>
          {intro ? (
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base lg:justify-self-end lg:text-right">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-3 md:mt-12 lg:h-[32rem] lg:flex-row lg:items-stretch">
          {items.map((item, index) => {
            const active = activeIndex === index;

            return (
              <article
                key={item.title}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={cn(
                  "group relative min-h-[18rem] overflow-hidden border border-white/12 bg-[color:var(--surface-strong)] shadow-[0_24px_70px_rgba(31,31,31,0.08)] transition-[flex,transform,box-shadow] duration-500 ease-[var(--ease-editorial)] md:min-h-[22rem] lg:min-h-0",
                  active ? "lg:flex-[2.2]" : "lg:flex-[0.86]",
                )}
                tabIndex={0}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    active ? "scale-[1.03]" : "scale-100 lg:grayscale-[0.18]",
                  )}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/28 to-black/5"
                  aria-hidden
                />
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 z-10 p-5 text-white transition-all duration-500 md:p-7",
                    active ? "translate-y-0 opacity-100" : "lg:translate-y-6 lg:opacity-82",
                  )}
                >
                  <div className="flex items-end justify-between gap-5">
                    <div className="min-w-0">
                      <p className="label-ui text-[10px] text-white/68">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display mt-2 text-3xl leading-none tracking-tight md:text-4xl">
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 max-w-xs text-sm leading-relaxed text-white/78 transition-all duration-500",
                          active ? "opacity-100" : "lg:max-h-0 lg:overflow-hidden lg:opacity-0",
                        )}
                      >
                        {item.caption}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "hidden h-px bg-white/70 transition-all duration-500 md:block",
                        active ? "w-20" : "w-8",
                      )}
                      aria-hidden
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
