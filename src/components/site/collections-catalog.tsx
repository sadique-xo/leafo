"use client";

import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { SiteHero } from "@/components/site/site-hero";
import type { CollectionItem } from "@/data/site-content";
import { collectionsPage } from "@/data/site-content";
import { cn } from "@/lib/utils";

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

type FilterKind = "shape" | "finish" | "size";

export function CollectionsCatalog({ collections: allCollections }: { collections: CollectionItem[] }) {
  const [shape, setShape] = useState<string | null>(null);
  const [finish, setFinish] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const activeFilters = [
    shape ? { kind: "shape" as const, label: `Shape: ${shape}`, value: shape } : null,
    finish ? { kind: "finish" as const, label: `Finish: ${finish}`, value: finish } : null,
    size ? { kind: "size" as const, label: `Scale: ${size}`, value: size } : null,
  ].filter((filter): filter is { kind: FilterKind; label: string; value: string } =>
    Boolean(filter),
  );

  const filtered = useMemo(() => {
    return allCollections.filter((item) => {
      const shapeOk = !shape || item.shapes.includes(shape);
      const finishOk = !finish || item.finishes.includes(finish);
      const sizeOk = !size || item.scaleTags.includes(size);
      return shapeOk && finishOk && sizeOk;
    });
  }, [allCollections, shape, finish, size]);

  const filterKey = `${shape ?? "all"}-${finish ?? "all"}-${size ?? "all"}`;
  const hasActiveFilters = activeFilters.length > 0;

  const clearFilter = (kind: FilterKind) => {
    if (kind === "shape") setShape(null);
    if (kind === "finish") setFinish(null);
    if (kind === "size") setSize(null);
  };

  const clearAllFilters = () => {
    setShape(null);
    setFinish(null);
    setSize(null);
  };

  const countForOption = (kind: FilterKind, option: string) => {
    return allCollections.filter((item) => {
      const shapeOk = kind === "shape" ? item.shapes.includes(option) : !shape || item.shapes.includes(shape);
      const finishOk =
        kind === "finish" ? item.finishes.includes(option) : !finish || item.finishes.includes(finish);
      const sizeOk = kind === "size" ? item.scaleTags.includes(option) : !size || item.scaleTags.includes(size);
      return shapeOk && finishOk && sizeOk;
    }).length;
  };

  const filterGroups = [
    {
      kind: "shape" as const,
      label: "Shape",
      helper: "Start with the silhouette.",
      value: shape,
      options: collectionsPage.filters.shape.options,
      setValue: setShape,
    },
    {
      kind: "finish" as const,
      label: "Finish",
      helper: "Match the surface to the space.",
      value: finish,
      options: collectionsPage.filters.finish.options,
      setValue: setFinish,
    },
    {
      kind: "size" as const,
      label: "Scale",
      helper: "Filter by tabletop to architectural.",
      value: size,
      options: collectionsPage.filters.size.options,
      setValue: setSize,
    },
  ];

  return (
    <div>
      <SiteHero
        imageSrc={collectionsPage.heroImageSrc}
        imageAlt={collectionsPage.heroImageAlt}
        eyebrow="Catalog"
        title={collectionsPage.title}
        intro={collectionsPage.intro}
      />

      <Reveal>
        <section className="site-container py-10 md:py-12">
          <div className="rule-panel-border overflow-hidden bg-[color:var(--surface-strong)]/35">
            <div className="flex flex-col gap-4 border-b border-[color:var(--border)] px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary-ink)] text-white">
                  <SlidersHorizontal className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="label-ui text-[10px] tracking-[0.16em] text-muted-foreground">
                    Find your planter
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--charcoal)]">
                    Pick one or two cues. Results update instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p className="label-ui text-[10px] text-muted-foreground">
                  {filtered.length} / {allCollections.length} shown
                </p>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="label-ui text-[10px] text-[color:var(--primary-ink)] underline-offset-4 hover:underline"
                  >
                    Clear all
                  </button>
                ) : null}
              </div>
            </div>

            {hasActiveFilters ? (
              <div className="flex flex-wrap gap-2 border-b border-[color:var(--border)] bg-[color:var(--surface)]/55 px-4 py-4 md:px-6 lg:px-8">
                {activeFilters.map((filter) => (
                  <button
                    type="button"
                    key={`${filter.kind}-${filter.value}`}
                    onClick={() => clearFilter(filter.kind)}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] px-3 py-1.5 text-xs text-white transition-opacity hover:opacity-88"
                  >
                    {filter.label}
                    <X className="size-3" aria-hidden />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="grid gap-0 lg:grid-cols-3">
              {filterGroups.map((group, index) => (
                <div
                  key={group.kind}
                  className={cn(
                    "border-b border-[color:var(--border)] px-4 py-5 md:px-6 lg:border-b-0 lg:px-8",
                    index > 0 && "lg:border-l",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="label-ui text-[10px] tracking-[0.16em] text-[color:var(--charcoal)]">
                        {group.label}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{group.helper}</p>
                    </div>
                    {group.value ? (
                      <button
                        type="button"
                        onClick={() => group.setValue(null)}
                        className="label-ui text-[10px] text-muted-foreground underline-offset-4 hover:text-[color:var(--primary-ink)] hover:underline"
                      >
                        Reset
                      </button>
                    ) : null}
                  </div>

                  <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
                    {group.options.map((opt) => {
                      const count = countForOption(group.kind, opt);
                      const selected = group.value === opt;
                      const disabled = count === 0 && !selected;

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={disabled}
                          aria-pressed={selected}
                          onClick={() => group.setValue((current) => (current === opt ? null : opt))}
                          className={cn(
                            "label-ui inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[10px] transition-all duration-200 active:scale-[0.96]",
                            selected
                              ? "border-[color:var(--primary-ink)] bg-[color:var(--primary-ink)] text-white"
                              : "border-[color:var(--border)] bg-[color:var(--surface)]/80 text-[color:var(--charcoal)] hover:border-[color:var(--primary-ink)]/35 hover:bg-[color:var(--surface)]",
                            disabled && "cursor-not-allowed opacity-35 hover:border-[color:var(--border)]",
                          )}
                        >
                          <span>{opt}</span>
                          <span
                            className={cn(
                              "rounded-full px-1.5 py-0.5 text-[9px]",
                              selected ? "bg-white/18 text-white" : "bg-black/[0.05] text-muted-foreground",
                            )}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <section className="site-container pb-14 pt-4 md:pb-20 md:pt-8">
        <div className="mb-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-ui text-[10px] text-muted-foreground">Results</p>
            <h2 className="font-display mt-2 text-2xl text-[color:var(--charcoal)] md:text-3xl">
              {filtered.length === allCollections.length
                ? "Browse all collections"
                : `${filtered.length} matching collection${filtered.length === 1 ? "" : "s"}`}
            </h2>
          </div>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearAllFilters}
              className="label-ui w-fit text-[10px] text-[color:var(--primary-ink)] underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          ) : null}
        </div>

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
