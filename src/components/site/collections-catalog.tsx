"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useLenis } from "@/components/motion/lenis-context";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import {
  CollectionsFilterBar,
  type FilterKind,
} from "@/components/site/collections-filter-bar";
import { SiteHero } from "@/components/site/site-hero";
import type { CollectionItem } from "@/data/site-content";
import { collectionsPage } from "@/data/site-content";
import { saveCollectionListScroll } from "@/lib/collection-list-scroll";

function CollectionCard({
  item,
  onNavigate,
}: {
  item: CollectionItem;
  onNavigate: (slug: string) => void;
}) {
  const lead = item.images?.[0];
  const primary = lead?.src ?? item.imageSrc;
  const sizeCount = item.sizeVariants?.length ?? 0;

  const meta = [
    sizeCount > 0 ? `${sizeCount} ${sizeCount === 1 ? "size" : "sizes"}` : null,
    item.shapes[0],
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/collections/${item.slug}`}
      data-collection-card={item.slug}
      onClick={() => onNavigate(item.slug)}
      className="group block"
      data-stagger-item
    >
      {/*
        A white card holds the photo rather than the photo being reshaped to
        fill one. object-contain plus inner padding fits any source aspect
        whole, so nothing is cropped and the source files are used untouched.
        The image itself never moves on hover; only the card lifts.
      */}
      <div className="relative aspect-square w-full overflow-hidden bg-white ring-[0.5px] ring-black/[0.07] transition-shadow duration-300 group-hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.25)]">
        <Image
          src={primary}
          alt={item.imageAlt}
          fill
          className="object-contain p-5 md:p-6"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="label-ui text-[11px] tracking-[0.12em] text-[color:var(--primary-ink)] transition-opacity duration-300 group-hover:opacity-65">
          {item.name}
        </p>
        {meta ? <p className="text-[11px] text-muted-foreground">{meta}</p> : null}
      </div>
      <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{item.subtitle}</p>
    </Link>
  );
}

export function CollectionsCatalog({
  collections: allCollections,
  heroOverride,
}: {
  collections: CollectionItem[];
  heroOverride?: { title: string; intro: string; eyebrow: string };
}) {
  const lenis = useLenis();
  const [shape, setShape] = useState<string | null>(null);
  const [finish, setFinish] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const saveCatalogScroll = useCallback(
    (slug: string) => {
      saveCollectionListScroll({
        returnPath: "/collections",
        slug,
        pageScrollY: lenis?.scroll ?? window.scrollY,
      });
    },
    [lenis],
  );

  const filtered = useMemo(() => {
    return allCollections.filter((item) => {
      const shapeOk = !shape || item.shapes.includes(shape);
      const finishOk = !finish || item.finishes.includes(finish);
      const sizeOk = !size || item.scaleTags.includes(size);
      return shapeOk && finishOk && sizeOk;
    });
  }, [allCollections, shape, finish, size]);

  const countForOption = useCallback(
    (kind: FilterKind, option: string) => {
      return allCollections.filter((item) => {
        const shapeOk =
          kind === "shape" ? item.shapes.includes(option) : !shape || item.shapes.includes(shape);
        const finishOk =
          kind === "finish"
            ? item.finishes.includes(option)
            : !finish || item.finishes.includes(finish);
        const sizeOk =
          kind === "size" ? item.scaleTags.includes(option) : !size || item.scaleTags.includes(size);
        return shapeOk && finishOk && sizeOk;
      }).length;
    },
    [allCollections, shape, finish, size],
  );

  const clearAllFilters = useCallback(() => {
    setShape(null);
    setFinish(null);
    setSize(null);
  }, []);

  const groups = [
    {
      kind: "shape" as const,
      label: "Shape",
      options: collectionsPage.filters.shape.options,
      value: shape,
      onChange: setShape,
    },
    {
      kind: "finish" as const,
      label: "Finish",
      options: collectionsPage.filters.finish.options,
      value: finish,
      onChange: setFinish,
    },
    {
      kind: "size" as const,
      label: "Size",
      options: collectionsPage.filters.size.options,
      value: size,
      onChange: setSize,
    },
  ];

  const filterKey = `${shape ?? "all"}-${finish ?? "all"}-${size ?? "all"}`;

  return (
    <div>
      <SiteHero
        imageSrc={collectionsPage.heroImageSrc}
        imageAlt={collectionsPage.heroImageAlt}
        eyebrow={heroOverride?.eyebrow ?? "Catalog"}
        title={heroOverride?.title ?? collectionsPage.title}
        intro={heroOverride?.intro ?? collectionsPage.intro}
      />

      <CollectionsFilterBar
        groups={groups}
        resultCount={filtered.length}
        totalCount={allCollections.length}
        countForOption={countForOption}
        onClearAll={clearAllFilters}
      />

      <section className="site-container py-10 md:py-14">
        {filtered.length === 0 ? (
          <div className="rule-panel-border bg-[color:var(--surface-strong)]/35 p-6 md:p-8">
            <p className="font-display text-2xl text-[color:var(--charcoal)]">No exact match yet.</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {collectionsPage.emptyFilter}
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="label-ui mt-6 inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <RevealStagger
            staggerKey={filterKey + filtered.map((i) => i.slug).join("-")}
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filtered.map((item) => (
              <CollectionCard key={item.slug} item={item} onNavigate={saveCatalogScroll} />
            ))}
          </RevealStagger>
        )}
      </section>
    </div>
  );
}
