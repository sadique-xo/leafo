import type { MetadataRoute } from "next";

type StaticSitemapRoute = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/** Public marketing pages included in sitemap.xml (excludes admin and disabled routes). */
export const PUBLIC_STATIC_ROUTES: StaticSitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/collections", changeFrequency: "weekly", priority: 0.9 },
  { path: "/finishes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];
