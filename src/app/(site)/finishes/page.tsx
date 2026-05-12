import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Blend,
  Grip,
  HelpCircle,
  Layers,
  Mountain,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import { SiteHero } from "@/components/site/site-hero";
import { finishesPage } from "@/data/site-content";

const FINISH_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  blend: Blend,
  layers: Layers,
  mountain: Mountain,
  grip: Grip,
};

function IconFor({
  map,
  name,
  className,
}: {
  map: Record<string, LucideIcon>;
  name?: string;
  className?: string;
}) {
  const Icon = (name && map[name]) || HelpCircle;
  return <Icon className={className} aria-hidden strokeWidth={1.5} />;
}

export const metadata: Metadata = {
  title: "Finishes - LEAFO planters",
  description:
    "Five hand-applied FRP planter finishes: gloss, matte, rustic, stone, and orange peel. Samples and project guidance on request.",
};

export default function FinishesPage() {
  const { sampleNote } = finishesPage;

  return (
    <>
      <SiteHero
        imageSrc={finishesPage.heroImageSrc}
        imageAlt={finishesPage.heroImageAlt}
        eyebrow="Surface treatments"
        title={finishesPage.title}
        intro={finishesPage.intro}
        primaryCta={finishesPage.primaryCta}
        secondaryCta={finishesPage.secondaryCta}
      />

      <section className="border-b border-[var(--border)] bg-[color:var(--surface)]">
        <Reveal className="site-container grid gap-8 py-10 md:grid-cols-[0.78fr_1fr] md:items-end md:py-14">
          <div>
            <p className="label-ui text-[10px] tracking-[0.18em] text-[color:var(--secondary-brand)] md:text-[11px]">
              {finishesPage.sectionEyebrow}
            </p>
            <h2 className="font-display mt-3 max-w-md text-2xl leading-tight text-[color:var(--primary-ink)] md:text-3xl">
              {finishesPage.sectionTitle}
            </h2>
          </div>
          <div className="max-w-xl text-sm leading-relaxed text-muted-foreground md:justify-self-end">
            <p>{finishesPage.sectionIntro}</p>
            {sampleNote ? (
              <p className="mt-4 border-l border-[color:var(--primary-ink)]/20 pl-4 text-[color:var(--charcoal)]/80">
                <span className="label-ui mr-2 text-[10px] tracking-[0.16em] text-[color:var(--primary-ink)] md:text-[11px]">
                  Samples
                </span>
                {sampleNote}
              </p>
            ) : null}
          </div>
        </Reveal>
      </section>

      <section className="bg-[color:var(--surface)]">
        <RevealStagger
          staggerKey={finishesPage.items.map((i) => i.name).join("-")}
          className="site-container divide-y divide-[var(--border)]"
        >
          {finishesPage.items.map((item, index) => (
            <article
              key={item.name}
              data-stagger-item
              className="group grid gap-5 py-8 transition-colors duration-300 hover:bg-[color:var(--surface-strong)]/35 md:grid-cols-[8rem_minmax(11rem,0.55fr)_minmax(0,1fr)_minmax(12rem,0.65fr)] md:items-center md:py-10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--surface-strong)] md:aspect-square">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  sizes="(max-width: 768px) 100vw, 128px"
                />
              </div>

              <div className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--border)] bg-background text-[color:var(--primary-ink)] transition-colors duration-300 group-hover:border-[color:var(--primary-ink)]/25"
                  aria-hidden
                >
                  <IconFor map={FINISH_ICONS} name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-ui text-[10px] tracking-[0.16em] text-muted-foreground">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <h2 className="font-display mt-2 text-2xl leading-none text-[color:var(--primary-ink)] md:text-3xl">
                    {item.name}
                  </h2>
                  {item.tagline ? (
                    <p className="mt-3 max-w-xs text-sm font-medium leading-relaxed text-[color:var(--charcoal)]/85">
                      {item.tagline}
                    </p>
                  ) : null}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground md:max-w-lg">{item.description}</p>

              {item.traits && item.traits.length > 0 ? (
                <dl className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  {item.traits.slice(0, 2).map((t) => (
                    <div key={`${item.name}-${t.label}`} className="border-l border-[var(--border)] pl-4">
                      <dt className="label-ui text-[10px] tracking-[0.14em] text-[color:var(--secondary-brand)]">
                        {t.label}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-snug text-[color:var(--primary-ink)]">{t.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          ))}
        </RevealStagger>
      </section>

      <section className="site-container section-space rule-section-h-soft">
        <Reveal className="flex flex-col gap-5 border border-[var(--border)] bg-[color:var(--surface-strong)]/25 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
          <div>
            <p className="label-ui text-[10px] tracking-[0.16em] text-[color:var(--secondary-brand)] md:text-[11px]">
              Ready to choose?
            </p>
            <h2 className="font-display mt-2 text-xl text-[color:var(--primary-ink)] md:text-2xl">
              Match a finish to your shortlist.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <InquiryTrigger className="label-ui inline-flex h-11 items-center bg-[color:var(--primary)] px-8 text-[11px] text-white transition-all duration-300 hover:bg-[color:var(--primary-hover)] active:scale-[0.98]">
              {finishesPage.ctaLabel}
            </InquiryTrigger>
            <Link
              href="/collections"
              className="label-ui inline-flex h-11 items-center border border-[color:var(--primary-ink)] bg-transparent px-8 text-[11px] text-[color:var(--primary-ink)] transition-all duration-300 hover:bg-[color:var(--primary-ink)] hover:text-white active:scale-[0.98]"
            >
              Open catalogue
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
