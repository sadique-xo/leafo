import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export const SITE_LOGO_SRC = "/logo/Leafo-final-logo.png";
/** Intrinsic wordmark ratio (1058×358). */
export const SITE_LOGO_ASPECT = "1058 / 358";

type SiteLogoTone = "ink" | "light" | "charcoal" | "current";

type SiteLogoProps = {
  className?: string;
  /** Fill color for the monochrome wordmark. */
  tone?: SiteLogoTone;
};

const toneClass: Record<SiteLogoTone, string> = {
  ink: "bg-[color:var(--primary-ink)]",
  light: "bg-white",
  charcoal: "bg-[color:var(--charcoal)]",
  current: "bg-current",
};

/**
 * Monochrome LEAFO wordmark via CSS mask so tone follows brand tokens
 * (white PNG, transparent counters including the plant in the “o”).
 */
export function SiteLogo({ className, tone = "ink" }: SiteLogoProps) {
  const maskStyle = {
    aspectRatio: SITE_LOGO_ASPECT,
    WebkitMaskImage: `url(${SITE_LOGO_SRC})`,
    maskImage: `url(${SITE_LOGO_SRC})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "left center",
    maskPosition: "left center",
  } satisfies CSSProperties;

  return (
    <span
      role="img"
      aria-label="LEAFO"
      className={cn("inline-block shrink-0", toneClass[tone], className)}
      style={maskStyle}
    />
  );
}
