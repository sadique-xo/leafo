import { HeroLcpImage } from "@/components/site/hero-lcp-image";
import { SiteHeroChrome } from "@/components/site/site-hero-chrome";
import type { HeroSlideNavTone } from "./hero-overlay-context";

type SiteHeroCta = {
  href: string;
  label: string;
};

type SiteHeroProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  intro?: string;
  primaryCta?: SiteHeroCta;
  secondaryCta?: SiteHeroCta;
  navTone?: HeroSlideNavTone;
};

export function SiteHero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
  navTone = "light",
}: SiteHeroProps) {
  return (
    <section
      aria-label={title}
      className="relative h-[100dvh] overflow-hidden bg-background"
    >
      <HeroLcpImage src={imageSrc} alt={imageAlt} />
      <SiteHeroChrome
        imageSrc={imageSrc}
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        navTone={navTone}
      />
    </section>
  );
}
