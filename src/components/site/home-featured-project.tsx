import Image from "next/image";
import Link from "next/link";
import { Building2, Ruler, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { InquiryTrigger } from "@/components/site/inquiry-trigger";
import { DotPattern } from "@/components/ui/dot-pattern";

const highlightIcons = [Ruler, ShieldCheck, Building2];

type HomeFeaturedProjectProps = {
  eyebrow: string;
  title: string;
  body: string;
  highlights?: Array<{ label: string; body: string }>;
  imageSrc: string;
  imageAlt: string;
  cta: { href: string; label: string };
};

export function HomeFeaturedProject({
  eyebrow,
  title,
  body,
  highlights = [],
  imageSrc,
  imageAlt,
  cta,
}: HomeFeaturedProjectProps) {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <DotPattern className="fill-[color:var(--outline)]/[0.08] md:fill-[color:var(--outline)]/[0.1]" />
      <Reveal className="relative z-10 site-container section-space">
        <p className="label-ui text-[11px] text-muted-foreground">{eyebrow}</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden bg-[color:var(--surface-strong)] shadow-[0_24px_70px_rgba(31,31,31,0.08)] lg:aspect-[4/5]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/72 via-black/22 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-5 left-5 right-5 text-white md:bottom-7 md:left-7 md:right-7">
              <p className="label-ui text-[10px] text-white/70">Custom manufacturing</p>
              <p className="font-display mt-2 max-w-sm text-2xl leading-tight tracking-tight md:text-3xl">
                Built for scale, finished for the room.
              </p>
            </div>
          </div>
          <div className="min-w-0 lg:border-l-[length:var(--rule-width)] lg:border-[color:var(--border)] lg:pl-14">
            <h2 className="font-display text-3xl tracking-tight text-[color:var(--charcoal)] md:text-4xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {body}
            </p>
            {highlights.length > 0 ? (
              <div className="mt-8 grid gap-4">
                {highlights.map((item, index) => {
                  const Icon = highlightIcons[index % highlightIcons.length];

                  return (
                    <div
                      key={item.label}
                      className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-[color:var(--border)] pt-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--primary-ink)]/8 text-[color:var(--primary-ink)]">
                        <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                      </div>
                      <div>
                        <p className="label-ui text-[10px] text-[color:var(--charcoal)]">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <div className="mt-8">
              {cta.href === "/contact" ? (
                <InquiryTrigger className="link-underline-editorial label-ui text-[11px]">
                  {cta.label} →
                </InquiryTrigger>
              ) : (
                <Link href={cta.href} className="link-underline-editorial label-ui text-[11px]">
                  {cta.label} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
