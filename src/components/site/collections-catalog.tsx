"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import type { CollectionItem } from "@/data/site-content";
import { collectionsPage } from "@/data/site-content";

function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <Link href={`/collections/${item.slug}`} className="group block" data-stagger-item>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--surface-strong)]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <p className="label-ui mt-4 text-[11px] tracking-[0.12em] text-[color:var(--primary-ink)]">
        {item.name}
      </p>
      <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{item.subtitle}</p>
    </Link>
  );
}

export function CollectionsCatalog({ collections: allCollections }: { collections: CollectionItem[] }) {
  const [shape, setShape] = useState<string | null>(null);
  const [finish, setFinish] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allCollections.filter((item) => {
      const shapeOk = !shape || item.shapes.includes(shape);
      const finishOk = !finish || item.finishes.includes(finish);
      const sizeOk = !size || item.scaleTags.includes(size);
      return shapeOk && finishOk && sizeOk;
    });
  }, [allCollections, shape, finish, size]);

  const filterKey = `${shape ?? "all"}-${finish ?? "all"}-${size ?? "all"}`;

  return (
    <div>
      <Reveal className="relative mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[color:var(--surface-strong)] md:aspect-[2.4/1]">
          <Image
            src={collectionsPage.heroImageSrc}
            alt={collectionsPage.heroImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority
          />
        </div>
      </Reveal>

      <Reveal className="site-container pt-12 pb-10 md:pt-16 md:pb-12">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl tracking-tight text-[color:var(--primary-ink)] md:text-6xl lg:text-7xl">
            {collectionsPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.65] text-muted-foreground md:text-lg">
            {collectionsPage.intro}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="site-container pb-6 md:pb-8">
          <div className="flex flex-col gap-8 rule-panel-border bg-[color:var(--surface-strong)]/35 px-4 py-6 md:gap-10 md:px-8 md:py-8">
            <div className="flex flex-col gap-2">
              <p className="label-ui text-[10px] tracking-[0.16em] text-[color:var(--charcoal)]">
                {collectionsPage.filters.shape.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {collectionsPage.filters.shape.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setShape((s) => (s === opt ? null : opt))}
                    className={[
                      "label-ui rounded-none border px-3 py-2 text-[10px] transition-all duration-200 active:scale-[0.96]",
                      shape === opt
                        ? "border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] text-white"
                        : "border-[var(--border)] bg-[color:var(--surface)]/80 text-[color:var(--charcoal)] hover:border-[color:var(--primary-ink)]/35 hover:bg-[color:var(--surface)]",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="label-ui text-[10px] tracking-[0.16em] text-[color:var(--charcoal)]">
                {collectionsPage.filters.finish.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {collectionsPage.filters.finish.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFinish((f) => (f === opt ? null : opt))}
                    className={[
                      "label-ui rounded-none border px-3 py-2 text-[10px] transition-all duration-200 active:scale-[0.96]",
                      finish === opt
                        ? "border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] text-white"
                        : "border-[var(--border)] bg-[color:var(--surface)]/80 text-[color:var(--charcoal)] hover:border-[color:var(--primary-ink)]/35 hover:bg-[color:var(--surface)]",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rule-section-h-soft pt-6 md:border-t-0 md:pt-0">
              <p className="label-ui text-[10px] tracking-[0.16em] text-[color:var(--charcoal)]">
                {collectionsPage.filters.size.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {collectionsPage.filters.size.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSize((z) => (z === opt ? null : opt))}
                    className={[
                      "label-ui rounded-none border px-3 py-2 text-[10px] transition-all duration-200 active:scale-[0.96]",
                      size === opt
                        ? "border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] text-white"
                        : "border-[var(--border)] bg-[color:var(--surface)]/80 text-[color:var(--charcoal)] hover:border-[color:var(--primary-ink)]/35 hover:bg-[color:var(--surface)]",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="site-container py-14 md:py-20">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">{collectionsPage.emptyFilter}</p>
        ) : (
          <RevealStagger
            staggerKey={filterKey + filtered.map((i) => i.slug).join("-")}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filtered.map((item) => (
              <CollectionCard key={item.slug} item={item} />
            ))}
          </RevealStagger>
        )}
      </section>
    </div>
  );
}
