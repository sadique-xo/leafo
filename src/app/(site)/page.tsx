import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import { CornerFrame } from "@/components/site/corner-frame";
import { HomeCollectionsRail } from "@/components/site/home-collections-rail";
import { HomeFeaturedProject } from "@/components/site/home-featured-project";
import { HomeHoverSlider } from "@/components/site/home-hover-slider";
import { HomeHero } from "@/components/site/home-hero";
import { HomeWeAre } from "@/components/site/home-we-are";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ImageGallery } from "@/components/ui/image-gallery";
import { getPublishedCollections } from "@/lib/cms/get-collections";
import { faqPage, homeFaqItems } from "@/data/faq-content";
import { about, getHomeHeroSlides, home, type HomeHeroSlideContent } from "@/data/site-content";
import { pageAlternates } from "@/lib/site-metadata";

function getWeAreImageSlides(
  heroSlides: HomeHeroSlideContent[],
  fallback: HomeHeroSlideContent,
) {
  const slides = heroSlides.slice(1, 4);

  if (slides.length < 3) {
    console.warn("HomeWeAre expected 3 post-hero slides; padding with the hero image.");
  }

  while (slides.length < 3) {
    slides.push(fallback);
  }

  return slides;
}

export const metadata: Metadata = {
  title: "LEAFO - India's most diverse range of FRP planters and Fiber pots",
  description:
    "Nineteen designs of fiber-reinforced planters for homes, hotels, and landscapes. Designed and made in Gandhidham, Gujarat.",
  ...pageAlternates("/"),
};

export default async function HomePage() {
  const collections = await getPublishedCollections();
  const heroSlides = getHomeHeroSlides();
  const heroSlide = heroSlides[0] ?? {
    src: home.heroImageSrc,
    alt: home.heroImageAlt,
    navTone: "light" as const,
  };
  const weAreImageSlides = getWeAreImageSlides(heroSlides, heroSlide);

  return (
    <>
      <HomeHero
        slide={heroSlide}
        eyebrow={home.eyebrow}
        title={home.title}
        intro={home.intro}
        primaryCta={home.primaryCta}
        secondaryCta={home.secondaryCta}
      />

      <HomeWeAre
        slides={home.weAre.lines.map((line, index) => ({
          image: {
            src: weAreImageSlides[index]?.src ?? heroSlide.src,
            alt: weAreImageSlides[index]?.alt ?? heroSlide.alt,
          },
          line,
        }))}
        closingCopy={home.weAre.closingCopy}
      />

      <HomeCollectionsRail
        collections={collections}
        title={home.collectionsHeading}
        intro={home.collectionsIntro}
      />

      <ImageGallery
        eyebrow="Applications"
        title={home.builtForHeading}
        intro="From compact balconies to hotel entries and workplace courtyards, LEAFO scales quietly with the room."
        items={home.builtForTiles}
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
          </div>
        </section>
      </Reveal>

      <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--surface-alt)]">
        <DotPattern className="fill-[color:var(--charcoal)]/[0.045] md:fill-[color:var(--charcoal)]/[0.065]" />
        <Reveal className="relative z-10 site-container py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start lg:gap-16">
            <div className="max-w-md">
              <p className="label-ui text-[11px] text-muted-foreground">{faqPage.eyebrow}</p>
              <h2 className="font-display mt-4 text-3xl tracking-tight text-[color:var(--charcoal)] md:text-4xl">
                Questions before you specify.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                A short set of answers on material, finish, ordering, and delivery.
              </p>
              <Link
                href="/faq"
                className="link-underline-editorial label-ui mt-7 inline-flex text-[11px]"
              >
                View all FAQ →
              </Link>
            </div>
            <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
              {homeFaqItems.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left marker:hidden">
                    <span className="font-display text-lg leading-snug text-[color:var(--charcoal)] md:text-xl">
                      {item.question}
                    </span>
                    <span
                      className="mt-1 text-xl leading-none text-[color:var(--primary-ink)] transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
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
            {home.inquiryCta.href === "/contact" ? (
              <InquiryTrigger className="label-ui inline-flex h-11 shrink-0 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]">
                {home.inquiryCta.label}
              </InquiryTrigger>
            ) : (
              <Link
                href={home.inquiryCta.href}
                className="label-ui inline-flex h-11 shrink-0 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
              >
                {home.inquiryCta.label}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </>
  );
}
