import { HeroLcpImage } from "@/components/site/hero-lcp-image";
import { HomeHeroChrome } from "@/components/site/home-hero-chrome";
import type { HeroSlideNavTone } from "./hero-overlay-context";

export type HomeHeroSlide = {
  src: string;
  alt: string;
  navTone?: HeroSlideNavTone;
};

type HomeHeroProps = {
  slide: HomeHeroSlide;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

export function HomeHero({
  slide,
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  return (
    <section
      aria-label="Featured"
      className="home-hero relative h-[100dvh] overflow-hidden bg-background"
    >
      <HeroLcpImage src={slide.src} alt={slide.alt} />
      <HomeHeroChrome
        slide={slide}
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </section>
  );
}
