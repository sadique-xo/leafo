import { collections as catalogCollections } from "@/data/site-content";
import type { CollectionItem } from "@/data/site-content";

/**
 * The product catalog is file-backed: `site-content.json` is generated from the
 * finalized product index by `scripts/build-catalog.mjs` and is the source of
 * truth. The Supabase `collections` table is left in place but is no longer
 * read, since it cannot carry the photo sets and size charts the catalog needs.
 */
export async function getPublishedCollections(): Promise<CollectionItem[]> {
  return catalogCollections;
}

export async function getCollectionBySlugFromCms(slug: string): Promise<CollectionItem | undefined> {
  return catalogCollections.find((c) => c.slug === slug);
}

export async function getCollectionSlugsFromCms(): Promise<string[]> {
  return catalogCollections.map((c) => c.slug);
}

export function getFallbackCollectionSlugs(): string[] {
  return catalogCollections.map((c) => c.slug);
}
