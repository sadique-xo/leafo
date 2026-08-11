import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Feather, HeartHandshake, Sparkles, Sun } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import { CollectionJsonLd } from "@/components/site/collection-json-ld";
import { ProductGallery } from "@/components/site/product-gallery";
import type { CollectionItem } from "@/data/site-content";
import {
  getCollectionBySlugFromCms,
  getCollectionSlugsFromCms,
  getFallbackCollectionSlugs,
  getPublishedCollections,
} from "@/lib/cms/get-collections";
import { pageAlternates } from "@/lib/site-metadata";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

const productHighlights = [
  { label: "UV Resistant", icon: Sun },
  { label: "Moulded with Love", icon: HeartHandshake },
  { label: "Light Weight", icon: Feather },
  { label: "Fade Resistant", icon: Sparkles },
];

/**
 * Ranks the catalog by how much taxonomy it shares with the current design, so
 * a product without curated companions still gets a meaningful row instead of
 * whichever four collections happen to come first. Shape is weighted hardest
 * because it is the most visible kinship, then finish, then scale. Sort is
 * stable, so equal scores keep catalog order.
 */
function byRelatedness(target: CollectionItem, all: CollectionItem[]) {
  const shared = (a: string[], b: string[]) => a.filter((value) => b.includes(value)).length;

  return all
    .filter((candidate) => candidate.slug !== target.slug)
    .map((candidate) => ({
      candidate,
      score:
        shared(candidate.shapes, target.shapes) * 3 +
        shared(candidate.finishes, target.finishes) * 2 +
        shared(candidate.scaleTags, target.scaleTags),
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.candidate);
}

export async function generateStaticParams() {
  try {
    const slugs = await getCollectionSlugsFromCms();
    if (slugs.length) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch {
    /* fall through */
  }
  return getFallbackCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlugFromCms(slug);

  if (!collection) {
    return { title: "Collection not found" };
  }

  return {
    title: `${collection.name} - LEAFO FRP planter collection`,
    description: `${collection.summary} Available in four finishes and multiple sizes. Made in Gandhidham, Gujarat.`,
    keywords: ["FRP planter", "fibreglass planter", "fiber pots", collection.name, ...collection.shapes, ...collection.finishes],
    ...pageAlternates(`/collections/${slug}`),
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlugFromCms(slug);

  if (!collection) {
    notFound();
  }

  const all = await getPublishedCollections();
  const companions = collection.relatedSlugs
    ?.map((companionSlug) => all.find((c) => c.slug === companionSlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const related = (companions?.length ? companions : byRelatedness(collection, all)).slice(0, 4);
  const galleryImages = collection.images?.length
    ? collection.images
    : [{ src: collection.imageSrc, alt: collection.imageAlt }];
  const sizeVariants = collection.sizeVariants ?? [];
  const showPrice = collection.priceNote.trim().length > 0;
  const finishOptions =
    collection.finishes.length > 0
      ? collection.finishes
      : collection.finish.split("·").map((finish) => finish.trim()).filter(Boolean);

  return (
    <>
      <CollectionJsonLd collection={collection} />
      <section className="site-container pb-14 pt-28 md:pb-18 md:pt-32 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(23rem,0.82fr)] lg:gap-14 xl:gap-18">
          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start" start="top 85%" y={24}>
            <ProductGallery name={collection.name} images={galleryImages} />
          </Reveal>

          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start" start="top 85%" y={24}>
            <p className="label-ui text-[11px] text-muted-foreground">Collection</p>
            <h1 className="font-display mt-3 text-5xl tracking-tight text-[color:var(--charcoal)] md:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[color:var(--charcoal)]">
              {collection.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {collection.summary}
            </p>

            {showPrice ? (
              <p className="mt-7 font-display text-2xl text-[color:var(--primary-ink)]">
                {collection.priceNote}
              </p>
            ) : null}

            <div className="mt-8">
              <div className="flex items-center justify-between gap-4">
                <p className="label-ui text-[10px] text-muted-foreground">Sizes</p>
                <InquiryTrigger className="text-xs text-muted-foreground underline underline-offset-4">
                  Ask for sizing help
                </InquiryTrigger>
              </div>
              {sizeVariants.length > 0 ? (
                <div className="mt-3 overflow-hidden border border-[color:var(--border)]">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="bg-[color:var(--surface-strong)]/60">
                        <th scope="col" className="label-ui px-3 py-2 text-[10px] font-normal text-muted-foreground">
                          Size
                        </th>
                        <th scope="col" className="label-ui px-3 py-2 text-[10px] font-normal text-muted-foreground">
                          Dia × H
                        </th>
                        <th scope="col" className="label-ui px-3 py-2 text-right text-[10px] font-normal text-muted-foreground">
                          SKU
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeVariants.map((size) => (
                        <tr key={size.sku} className="border-t border-[color:var(--border)]">
                          <td className="px-3 py-2 text-[color:var(--charcoal)]">{size.variant}</td>
                          <td className="px-3 py-2 text-[color:var(--charcoal)]">
                            {size.diameter && size.height
                              ? `${size.diameter} × ${size.height} cm`
                              : "On request"}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-[11px] text-muted-foreground">
                            {size.sku}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {collection.sizes.map((size) => (
                    <span
                      key={size}
                      className="border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs text-[color:var(--charcoal)]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8">
              <p className="label-ui text-[10px] text-muted-foreground">Finish palette</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {finishOptions.map((finish) => (
                  <span
                    key={finish}
                    className="border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 text-xs text-[color:var(--charcoal)]"
                  >
                    {finish}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 border-y border-[color:var(--border)] py-6 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Material</span>
                <span className="text-right text-[color:var(--charcoal)]">{collection.material}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Use</span>
                <span className="text-right text-[color:var(--charcoal)]">
                  {collection.features[0] ?? "Indoor · Outdoor · Both"}
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-3">
              {productHighlights.map(({ label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="size-8 text-[color:var(--primary-ink)] md:size-10" strokeWidth={1.7} />
                  <span className="text-[10px] font-medium leading-tight text-[color:var(--primary-ink)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-3">
              <InquiryTrigger className="label-ui inline-flex h-12 items-center justify-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]">
                Inquire about this collection
              </InquiryTrigger>
              <Link
                href="/finishes"
                className="label-ui inline-flex h-12 items-center justify-center border border-[color:var(--primary-ink)] px-8 text-[11px] text-[color:var(--primary-ink)] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.98]"
              >
                Explore finishes
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <section className="rule-section-h bg-[color:var(--surface)]">
          <div className="site-container grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-18">
            <div>
              <p className="label-ui text-[10px] text-muted-foreground">Description</p>
              <h2 className="font-display mt-4 text-3xl text-[color:var(--charcoal)] md:text-4xl">
                Built for quiet scale.
              </h2>
            </div>
            <div className="grid gap-8">
              <div className="grid gap-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                {collection.story.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <div className="rule-section-h-soft pt-8">
                <p className="label-ui text-[10px] text-muted-foreground">Key features</p>
                <ul className="mt-4 grid gap-2 text-sm text-[color:var(--charcoal)] sm:grid-cols-2">
                {collection.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--primary-ink)]" />
                      <span>{f}</span>
                    </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {related.length > 0 ? (
        <section className="rule-section-h bg-[color:var(--surface-strong)]/40">
          <div className="site-container section-space">
            <Reveal>
              <h2 className="font-display text-2xl text-[color:var(--charcoal)] md:text-3xl">
                {companions?.length ? "Goes with" : "Related collections"}
              </h2>
            </Reveal>
            <RevealStagger
              staggerKey={related.map((r) => r.slug).join("-")}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/collections/${item.slug}`}
                  className="group block"
                  data-stagger-item
                >
                  {/* White card holding a fitted photo, matching the catalog grid. */}
                  <div className="relative aspect-square overflow-hidden bg-white ring-[0.5px] ring-black/[0.07] transition-shadow duration-300 group-hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.25)]">
                    <Image
                      src={item.images?.[0]?.src ?? item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-contain p-5 md:p-6"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <p className="label-ui mt-4 text-[11px] text-[color:var(--charcoal)] transition-opacity duration-300 group-hover:opacity-65">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                </Link>
              ))}
            </RevealStagger>
          </div>
        </section>
      ) : null}
    </>
  );
}
