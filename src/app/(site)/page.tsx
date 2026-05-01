import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { getPublishedCollections } from "@/lib/cms/get-collections";
import { about, home } from "@/data/site-content";

export const metadata: Metadata = {
  title: "LEAFO — FRP planters, fiber pots & modular systems",
  description:
    "Twelve collections of fiber-reinforced planters for homes, hotels, and landscapes. Designed and made in Anand, Gujarat.",
  openGraph: {
    title: "LEAFO — Planters, quietly considered.",
    description:
      "A diverse range of FRP planters for homes, hotels, offices, and landscapes. Made in Anand, Gujarat.",
    images: [{ url: home.heroImageSrc, width: 1200, height: 800, alt: home.heroImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAFO — Planters, quietly considered.",
    description:
      "A diverse range of FRP planters for homes, hotels, offices, and landscapes. Made in Anand, Gujarat.",
    images: [home.heroImageSrc],
  },
};

export default async function HomePage() {
  const collections = await getPublishedCollections();
  return (
    <>
      <section className="relative isolate min-h-svh w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={home.heroImageSrc}
            alt={home.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Left-heavy scrim: keeps FRP/planter photography visible while text stays legible */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[color:var(--surface-alt)] via-[color:var(--surface-alt)]/88 to-[color:var(--surface-alt)]/25 md:via-[color:var(--surface-alt)]/75 md:to-transparent"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface-alt)]/40 via-transparent to-[color:var(--surface-alt)]/30 md:to-transparent" aria-hidden />

        <div className="relative z-10 flex min-h-svh flex-col justify-end pb-12 pt-24 sm:pb-14 sm:pt-28 md:justify-end md:pb-16 md:pt-32 lg:pb-20">
          <div className="site-container">
            <div className="max-w-2xl lg:max-w-3xl">
              <Reveal start="top 90%" y={24}>
              <p className="label-ui text-[11px] text-muted-foreground">{home.eyebrow}</p>
              <h1 className="font-display mt-4 max-w-[18ch] text-4xl leading-[1.06] tracking-tight text-[color:var(--charcoal)] sm:mt-5 sm:max-w-none sm:text-5xl md:text-6xl">
                {home.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
                {home.intro}
              </p>
              <p className="label-ui mt-6 text-[10px] tracking-[0.14em] text-muted-foreground md:mt-7 md:text-[11px]">
                {about.whatWeMake.slice(0, 3).join(" · ")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
                <Link
                  href={home.primaryCta.href}
                  className="label-ui inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
                >
                  {home.primaryCta.label}
                </Link>
                <Link
                  href={home.secondaryCta.href}
                  className="label-ui inline-flex h-11 items-center border border-[color:var(--primary-ink)] bg-[color:var(--surface-alt)]/85 px-8 text-[11px] text-[color:var(--primary-ink)] backdrop-blur-[2px] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.98]"
                >
                  {home.secondaryCta.label}
                </Link>
              </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-alt)]">
        <Reveal className="site-container section-space">
          <div className="grid grid-cols-1 gap-12 divide-y divide-[length:var(--rule-width)] divide-[color:var(--border)] lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-x-16 lg:divide-x lg:divide-y-0 lg:divide-[length:var(--rule-width)] lg:divide-[color:var(--border)]">
            <div className="min-w-0 lg:pr-0">
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
            <div className="min-w-0 pt-12 lg:pt-8 lg:pl-12">
              <h2 className="font-display text-3xl tracking-tight text-[color:var(--charcoal)] md:text-4xl">
                {about.storyBlocks[1]?.title}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {about.storyBlocks[1]?.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        <div className="rule-section-h-soft mt-14 pt-12">
            <p className="max-w-3xl text-base leading-relaxed text-[color:var(--charcoal)] md:text-lg">
              {home.brandStatement}
            </p>
          </div>
          <div className="mt-8">
            <Link href="/about" className="link-underline-editorial label-ui text-[11px]">
              Read the full story →
            </Link>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="border-t border-[color:var(--border)]">
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
        </section>
      </Reveal>

      <section className="bg-[color:var(--surface-alt)]">
        <div className="site-container section-space">
          <Reveal>
            <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
              {home.collectionsHeading}
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              {home.collectionsIntro}
            </p>
          </Reveal>
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
          <Reveal>
            <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
              {home.finishesHeading}
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              {home.finishesIntro}
            </p>
          </Reveal>
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
          <Reveal>
            <h2 className="font-display text-3xl text-[color:var(--charcoal)] md:text-4xl">
              {home.builtForHeading}
            </h2>
          </Reveal>
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
        <div className="site-container pt-14 md:pt-16">
          <RevealRuleLine start="top 92%" duration={0.92} />
        </div>
        <div className="site-container flex flex-col gap-6 pb-16 pt-10 md:flex-row md:items-end md:justify-between md:pb-20 md:pt-12">
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
      </Reveal>
    </>
  );
}
