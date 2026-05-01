import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { DotPattern } from "@/components/ui/dot-pattern";

type HomeFeaturedProjectProps = {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  cta: { href: string; label: string };
};

export function HomeFeaturedProject({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  cta,
}: HomeFeaturedProjectProps) {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <DotPattern className="fill-[color:var(--outline)]/[0.08] md:fill-[color:var(--outline)]/[0.1]" />
      <Reveal className="relative z-10 site-container section-space">
        <p className="label-ui text-[11px] text-muted-foreground">{eyebrow}</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden bg-[color:var(--surface-strong)] lg:aspect-[4/5]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="min-w-0 lg:border-l-[length:var(--rule-width)] lg:border-[color:var(--border)] lg:pl-14">
            <h2 className="font-display text-3xl tracking-tight text-[color:var(--charcoal)] md:text-4xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {body}
            </p>
            <div className="mt-8">
              <Link href={cta.href} className="link-underline-editorial label-ui text-[11px]">
                {cta.label} →
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
