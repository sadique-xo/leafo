import type { Metadata } from "next";
import { footer } from "@/data/site-content";
import { absoluteUrl } from "@/lib/site-url";

/** Default title for Open Graph / Twitter cards */
export const siteShareTitle =
  "LEAFO - India's most diverse range of FRP planters and fiber pots";

/** Default description for Open Graph / Twitter cards (matches footer tagline) */
export const siteShareDescription = footer.tagline;

/** Default social share image (`public/og.jpg`, 1200×630) */
export const siteShareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "LEAFO FRP planter in a sunlit courtyard — India's most diverse range of FRP planters and fiber pots",
} as const;

/** Canonical URL and matching Open Graph URL for a public path. */
export function pageAlternates(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const url = absoluteUrl(path);
  return {
    alternates: { canonical: url },
    openGraph: { url },
  };
}
