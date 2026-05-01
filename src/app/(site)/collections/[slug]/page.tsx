import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ParallaxHeroImage } from "@/components/motion/parallax-hero-image";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import {
  getCollectionBySlugFromCms,
  getCollectionSlugsFromCms,
  getFallbackCollectionSlugs,
  getPublishedCollections,
} from "@/lib/cms/get-collections";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

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
    title: `${collection.name} — LEAFO FRP planter collection`,
    description: `${collection.summary} Available in five finishes and multiple sizes. Made in Anand, Gujarat.`,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlugFromCms(slug);

  if (!collection) {
    notFound();
  }

  const all = await getPublishedCollections();
  const related = all.filter((c) => c.slug !== slug).slice(0, 2);
  const showPrice = collection.priceNote.trim().length > 0;

  return (
    <>
      <section className="site-container grid gap-12 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-16">
        <div className="relative aspect-[4/5] w-full max-h-[85vh] bg-[color:var(--surface-strong)] lg:max-h-none">
          <ParallaxHeroImage
            src={collection.imageSrc}
            alt={collection.imageAlt}
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
        </div>
        <Reveal className="flex flex-col justify-center" start="top 80%" y={28}>
          <p className="label-ui text-[11px] text-muted-foreground">Collection</p>
          <h1 className="font-display mt-4 text-4xl tracking-tight text-[color:var(--charcoal)] md:text-5xl lg:text-6xl">
            {collection.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{collection.subtitle}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{collection.summary}</p>
          <dl className="mt-10 space-y-3 rule-section-h-soft pt-10 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Finishes</dt>
              <dd className="text-right text-[color:var(--charcoal)]">{collection.finish}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Material</dt>
              <dd className="text-right text-[color:var(--charcoal)]">{collection.material}</dd>
            </div>
            {showPrice ? (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">From</dt>
                <dd className="text-right text-[color:var(--charcoal)]">{collection.priceNote}</dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="label-ui inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
            >
              Inquire about this collection
            </Link>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="rule-section-h bg-[color:var(--surface)]">
          <div className="site-container grid gap-10 py-14 md:grid-cols-2 md:py-16">
            <div>
              <p className="label-ui text-[10px] text-muted-foreground">Sizes available</p>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--charcoal)]">
                {collection.sizes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-ui text-[10px] text-muted-foreground">Use</p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {collection.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="site-container section-space">
          <div className="grid gap-8 md:grid-cols-2">
            {collection.story.map((para) => (
              <p key={para} className="text-base leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </section>
      </Reveal>

      {related.length > 0 ? (
        <section className="rule-section-h bg-[color:var(--surface-strong)]/40">
          <div className="site-container section-space">
            <Reveal>
              <h2 className="font-display text-2xl text-[color:var(--charcoal)] md:text-3xl">Related</h2>
            </Reveal>
            <RevealStagger
              staggerKey={related.map((r) => r.slug).join("-")}
              className="mt-8 grid gap-8 sm:grid-cols-2"
            >
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/collections/${item.slug}`}
                  className="group block"
                  data-stagger-item
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-strong)]">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="label-ui mt-4 text-[11px] text-[color:var(--charcoal)]">{item.name}</p>
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
