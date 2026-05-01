import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { CornerFrame } from "@/components/site/corner-frame";
import { HomeFeaturedProject } from "@/components/site/home-featured-project";
import { HomeHoverSlider } from "@/components/site/home-hover-slider";
import { HomeHero } from "@/components/site/home-hero";
import { DotPattern } from "@/components/ui/dot-pattern";
import { getPublishedCollections } from "@/lib/cms/get-collections";
import { about, getHomeHeroSlides, home } from "@/data/site-content";

const ogHero = getHomeHeroSlides()[0];

export const metadata: Metadata = {
  title: "LEAFO - FRP planters, fiber pots & modular systems",
  description:
    "Twelve collections of fiber-reinforced planters for homes, hotels, and landscapes. Designed and made in Anand, Gujarat.",
  openGraph: {
    title: "LEAFO - Planters, quietly considered.",
    description:
      "A diverse range of FRP planters for homes, hotels, offices, and landscapes. Made in Anand, Gujarat.",
    images: [{ url: ogHero.src, width: 1200, height: 800, alt: ogHero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAFO - Planters, quietly considered.",
    description:
      "A diverse range of FRP planters for homes, hotels, offices, and landscapes. Made in Anand, Gujarat.",
    images: [ogHero.src],
  },
};

export default async function HomePage() {
  const collections = await getPublishedCollections();
  const heroSlides = getHomeHeroSlides();

  return (
    <>
      <HomeHero
        slides={heroSlides}
        eyebrow={home.eyebrow}
        title={home.title}
        intro={home.intro}
        primaryCta={home.primaryCta}
        secondaryCta={home.secondaryCta}
      />

      <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <DotPattern className="fill-[color:var(--outline)]/[0.1] md:fill-[color:var(--outline)]/[0.13]" />
        <Reveal className="relative z-10 site-container py-12 md:py-16">
          <p className="label-ui text-[11px] text-muted-foreground">{home.heroFactsEyebrow}</p>
          <dl className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {home.heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="border-l border-[color:var(--border)] pl-6 md:border-l-[length:var(--rule-width)] md:pl-8"
              >
                <dt className="label-ui text-[10px] text-muted-foreground">{fact.label}</dt>
                <dd className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--charcoal)] md:text-[0.9375rem] md:leading-[1.58]">
                  {fact.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <HomeHoverSlider
        slides={home.finishesShort.map((f) => ({
          id: f.name,
          title: f.name.toLowerCase(),
          imageUrl: f.imageSrc,
          alt: f.imageAlt,
        }))}
      />

      <HomeFeaturedProject {...home.featuredProject} />

      <section className="relative overflow-hidden bg-[color:var(--surface-alt)]">
        <DotPattern className="fill-[color:var(--charcoal)]/[0.045] md:fill-[color:var(--charcoal)]/[0.065]" />
        <Reveal className="relative z-10 site-container section-space">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-16">
            <div className="min-w-0">
              <p className="label-ui text-[11px] text-muted-foreground">{about.eyebrow}</p>
              <h2 className="font-display mt-4 text-3xl tracking-tight text-[color:var(--charcoal)] md:text-4xl">
                {about.storyBlocks[0]?.title}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {about.storyBlocks[0]?.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="min-w-0 border-t border-[color:var(--border)] pt-12 lg:border-l-[length:var(--rule-width)] lg:border-t-0 lg:pl-12 lg:pt-0">
              {/* Mirrors Origin eyebrow height so “Approach” aligns with “Origin” and the vertical rule reads straight */}
              <p
                className="label-ui mb-0 mt-0 hidden text-[11px] lg:invisible lg:block"
                aria-hidden
              >
                {about.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-3xl tracking-tight text-[color:var(--charcoal)] md:text-4xl">
                {about.storyBlocks[1]?.title}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {about.storyBlocks[1]?.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 border-t-[length:var(--rule-width-strong)] border-[color:var(--rule-color)] pt-12 md:mt-16 md:pt-14">
            <CornerFrame innerClassName="p-6 md:p-8 lg:p-10">
              <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
                <div className="min-w-0 lg:col-span-7">
                  <p className="font-display text-[1.625rem] leading-[1.22] tracking-[-0.02em] text-[color:var(--charcoal)] md:text-[2rem] md:leading-[1.2] lg:text-[2.125rem]">
                    {home.brandStatementLead}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-[1.72] text-muted-foreground md:mt-8 md:text-[1.0625rem] md:leading-[1.75]">
                    {home.brandStatement}
                  </p>
                </div>
                <aside className="flex min-w-0 flex-col gap-8 border-[color:var(--border)] border-t pt-10 lg:col-span-5 lg:border-t-0 lg:border-l-[length:var(--rule-width)] lg:pl-10 lg:pt-2">
                  <div>
                    <p className="label-ui text-[10px] text-muted-foreground">
                      {home.brandStatementAsideEyebrow}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--charcoal)] md:text-[0.9375rem]">
                      {home.brandStatementAside}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <Link href="/about" className="link-underline-editorial label-ui text-[11px]">
                      Read the full story →
                    </Link>
                    <Link href="/collections" className="link-underline-editorial label-ui text-[11px]">
                      View collections →
                    </Link>
                  </div>
                </aside>
              </div>
            </CornerFrame>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="relative overflow-hidden border-t border-[color:var(--border)]">
          <DotPattern className="fill-[color:var(--outline)]/[0.085] md:fill-[color:var(--outline)]/[0.11]" />
          <div className="relative z-10">
            <div className="site-container pt-10 md:pt-12">
              <RevealRuleLine className="mt-0" start="top 90%" delay={0.04} />
            </div>
            <div className="site-container grid gap-10 py-14 md:grid-cols-3 md:py-16">
              {home.metrics.map((m) => (
                <div key={m.label} className="border-l border-[var(--border)] pl-6 md:border-l-[length:var(--rule-width)]">
                  <p className="label-ui text-[10px] text-muted-foreground">{m.label}</p>
                  <p className="font-display mt-3 text-4xl text-[color:var(--charcoal)]">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="site-container rule-section-h-soft py-8 md:py-10">
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {home.processSupporting}
              </p>
              <p className="label-ui mt-4 text-[10px] text-muted-foreground">{home.processTitle}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="bg-[color:var(--surface-alt)]">
        <div className="site-container section-space">
          <div className="relative overflow-hidden">
            <DotPattern className="fill-[color:var(--charcoal)]/[0.05] md:fill-[color:var(--charcoal)]/[0.07]" />
            <Reveal className="relative z-10">
              <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
                {home.collectionsHeading}
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                {home.collectionsIntro}
              </p>
            </Reveal>
          </div>
          <RevealStagger
            staggerKey={collections.map((f) => f.slug).join("-")}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {collections.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="group block"
                data-stagger-item
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--surface-strong)]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <p className="label-ui mt-4 text-[11px] text-[color:var(--charcoal)]">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
              </Link>
            ))}
          </RevealStagger>
          <Reveal>
            <div className="mt-12">
              <Link href="/collections" className="link-underline-editorial label-ui text-[11px]">
                View all collections →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="rule-section-h">
        <div className="site-container section-space">
          <div className="relative overflow-hidden">
            <DotPattern className="fill-[color:var(--outline)]/[0.09] md:fill-[color:var(--outline)]/[0.12]" />
            <Reveal className="relative z-10">
              <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
                {home.finishesHeading}
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                {home.finishesIntro}
              </p>
            </Reveal>
          </div>
          <RevealStagger
            staggerKey={home.finishesShort.map((f) => f.name).join("-")}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {home.finishesShort.map((f) => (
              <article key={f.name} className="group" data-stagger-item>
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--surface-strong)]">
                  <Image
                    src={f.imageSrc}
                    alt={f.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
                <h3 className="font-display mt-4 text-xl text-[color:var(--primary-ink)]">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.blurb}</p>
              </article>
            ))}
          </RevealStagger>
          <Reveal>
            <div className="mt-12">
              <Link href="/finishes" className="link-underline-editorial label-ui text-[11px]">
                See finishes in detail →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface-alt)]">
        <div className="site-container section-space">
          <div className="relative overflow-hidden">
            <DotPattern className="fill-[color:var(--charcoal)]/[0.045] md:fill-[color:var(--charcoal)]/[0.065]" />
            <Reveal className="relative z-10">
              <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
                {home.builtForHeading}
              </h2>
            </Reveal>
          </div>
          <RevealStagger
            staggerKey={home.builtForTiles.map((t) => t.title).join("-")}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {home.builtForTiles.map((tile) => (
              <article key={tile.title} data-stagger-item>
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--surface-strong)]">
                  <Image
                    src={tile.imageSrc}
                    alt={tile.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="label-ui mt-4 text-[11px] text-[color:var(--charcoal)]">{tile.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tile.caption}</p>
              </article>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Reveal>
        <div className="relative overflow-hidden">
          <DotPattern className="fill-[color:var(--outline)]/[0.095] md:fill-[color:var(--outline)]/[0.12]" />
          <div className="relative z-10 site-container pt-14 md:pt-16">
            <RevealRuleLine start="top 92%" duration={0.92} />
          </div>
          <div className="relative z-10 site-container flex flex-col gap-6 pb-16 pt-10 md:flex-row md:items-end md:justify-between md:pb-20 md:pt-12">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
                {home.inquiryHeadline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{home.inquirySub}</p>
            </div>
            <Link
              href={home.inquiryCta.href}
              className="label-ui inline-flex h-11 shrink-0 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
            >
              {home.inquiryCta.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
