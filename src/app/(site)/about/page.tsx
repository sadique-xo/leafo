import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealRuleLine } from "@/components/motion/reveal-rule-line";
import { SiteHero } from "@/components/site/site-hero";
import { about } from "@/data/site-content";

export const metadata: Metadata = {
  title: "About LEAFO - design-led planter manufacturer in India",
  description:
    "LEAFO is a fiber-reinforced planter manufacturer based in Gandhidham, Gujarat. Designed for the way people actually live.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHero
        imageSrc={about.imageSrc}
        imageAlt={about.imageAlt}
        eyebrow={about.eyebrow}
        title={about.title}
        intro={about.intro}
      />

      <section className="bg-[color:var(--surface)]">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <RevealRuleLine start="top 86%" />
        </div>
        <div className="site-container grid gap-0 py-0 md:grid-cols-2">
          {about.storyBlocks.map((block, i) => (
            <article
              key={block.title}
              className={[
                "border-[var(--border)] px-0 py-12 md:border-r md:px-10 md:py-16 lg:px-14",
                "border-b md:border-b-0",
                i === about.storyBlocks.length - 1 ? "border-b-0 md:border-r-0" : "",
              ].join(" ")}
            >
              <h2 className="font-display text-2xl text-[color:var(--charcoal)] md:text-3xl">{block.title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {block.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Reveal className="site-container section-space">
        <h2 className="font-display text-2xl text-[color:var(--charcoal)] md:text-3xl">{about.whatWeMakeTitle}</h2>
        <ul className="mt-6 max-w-2xl list-inside list-disc space-y-2 text-sm text-muted-foreground md:text-base">
          {about.whatWeMake.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--charcoal)]">{about.closing}</p>
        <Link
          href={about.cta.href}
          className="label-ui mt-8 inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
        >
          {about.cta.label}
        </Link>
      </Reveal>
    </>
  );
}
