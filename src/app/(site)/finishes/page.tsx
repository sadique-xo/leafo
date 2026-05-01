import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { finishesPage } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Finishes - LEAFO planters",
  description:
    "Five hand-applied surface treatments: gloss, matte, rustic, stone, and orange peel. Specified per project.",
};

export default function FinishesPage() {
  return (
    <>
      <Reveal className="relative mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[color:var(--surface-strong)] md:aspect-[2.4/1]">
          <Image
            src={finishesPage.heroImageSrc}
            alt={finishesPage.heroImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority
          />
        </div>
      </Reveal>
      <Reveal className="site-container section-space">
        <h1 className="font-display text-4xl tracking-tight text-[color:var(--charcoal)] md:text-6xl">
          {finishesPage.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {finishesPage.intro}
        </p>
      </Reveal>
      <section className="rule-section-h">
        <RevealStagger
          staggerKey={finishesPage.items.map((i) => i.name).join("-")}
          className="site-container divide-y divide-[var(--border)]"
        >
          {finishesPage.items.map((item) => (
            <article
              key={item.name}
              data-stagger-item
              className="grid gap-8 py-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12 md:py-14"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--surface-strong)] md:max-w-md">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl text-[color:var(--primary-ink)] md:text-3xl">{item.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </RevealStagger>
      </section>
      <Reveal className="site-container section-space rule-section-h-soft">
        <Link
          href="/contact"
          className="label-ui inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]"
        >
          {finishesPage.ctaLabel}
        </Link>
      </Reveal>
    </>
  );
}
