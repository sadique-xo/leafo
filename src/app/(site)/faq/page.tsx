import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import { ImageLicenseJsonLd } from "@/components/seo/image-license-json-ld";
import { SiteHero } from "@/components/site/site-hero";
import { faqPage, faqSections } from "@/data/faq-content";

export const metadata: Metadata = {
  title: "FAQ - LEAFO planters",
  description:
    "Questions about LEAFO FRP planters, finishes, ordering, delivery, warranty, trade work, and care.",
};

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function FaqPage() {
  return (
    <>
      <ImageLicenseJsonLd images={[{ url: faqPage.heroImageSrc }]} />
      <SiteHero
        imageSrc={faqPage.heroImageSrc}
        imageAlt={faqPage.heroImageAlt}
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        intro={faqPage.intro}
        primaryCta={faqPage.closing.cta}
      />

      <section className="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
        <Reveal className="site-container grid gap-8 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:py-16">
          <div>
            <p className="label-ui text-[10px] tracking-[0.18em] text-[color:var(--secondary-brand)] md:text-[11px]">
              FAQ Index
            </p>
            <h2 className="font-display mt-3 text-2xl text-[color:var(--primary-ink)] md:text-3xl">
              Start where the question starts.
            </h2>
          </div>
          <nav
            aria-label="FAQ sections"
            className="grid gap-x-8 gap-y-3 text-sm leading-relaxed sm:grid-cols-2"
          >
            {faqSections.map((section) => (
              <Link
                key={section.title}
                href={`#${sectionId(section.title)}`}
                className="link-underline-editorial w-fit text-[color:var(--charcoal)]"
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </Reveal>
      </section>

      <section className="bg-[color:var(--surface-alt)]">
        <div className="site-container py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="label-ui text-[10px] tracking-[0.18em] text-muted-foreground">
                  On this page
                </p>
                <div className="mt-5 grid gap-2">
                  {faqSections.map((section) => (
                    <Link
                      key={section.title}
                      href={`#${sectionId(section.title)}`}
                      className="text-sm leading-relaxed text-[color:var(--charcoal)] underline-offset-4 transition-opacity hover:underline hover:opacity-80"
                    >
                      {section.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              {faqSections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  id={sectionId(section.title)}
                  className="scroll-mt-28 border-t border-[color:var(--border)] py-10 first:border-t-0 first:pt-0 md:py-12"
                >
                  <Reveal>
                  <div className="grid gap-7 md:grid-cols-[0.3fr_0.7fr] md:gap-10">
                    <div>
                      <p className="label-ui text-[10px] tracking-[0.16em] text-muted-foreground">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </p>
                      <h2 className="font-display mt-3 text-2xl tracking-tight text-[color:var(--primary-ink)] md:text-3xl">
                        {section.title}
                      </h2>
                    </div>
                    <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
                      {section.items.map((item) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container section-space rule-section-h-soft">
        <Reveal className="border border-[color:var(--border)] bg-[color:var(--surface-strong)]/25 px-6 py-8 md:px-10 md:py-10">
          <RevealRuleLine className="mb-8" start="top 90%" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="label-ui text-[10px] tracking-[0.16em] text-[color:var(--secondary-brand)] md:text-[11px]">
                {faqPage.closing.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl text-[color:var(--primary-ink)] md:text-4xl">
                {faqPage.closing.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {faqPage.closing.intro}
              </p>
            </div>
            <InquiryTrigger className="label-ui inline-flex h-11 shrink-0 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]">
              {faqPage.closing.cta.label}
            </InquiryTrigger>
          </div>
        </Reveal>
      </section>
    </>
  );
}
