import type { MetadataRoute } from "next";
import { getCollectionSlugsFromCms } from "@/lib/cms/get-collections";
import { PUBLIC_STATIC_ROUTES } from "@/lib/seo/static-routes";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const slugs = await getCollectionSlugsFromCms();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const collectionEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: absoluteUrl(`/collections/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticEntries, ...collectionEntries];
}
