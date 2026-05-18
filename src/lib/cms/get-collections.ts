import { unstable_cache } from "next/cache";
import { collections as fallbackCollections } from "@/data/site-content";
import type { CollectionItem } from "@/data/site-content";
import { collectionRowToItem, type CollectionRow } from "@/lib/cms/map-collection";
import { createPublicClient } from "@/lib/supabase/public";

async function fetchPublishedCollections(): Promise<CollectionItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return fallbackCollections;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .eq("published", true)
      .order("slug");

    if (error || !data?.length) {
      return fallbackCollections;
    }

    return (data as CollectionRow[]).map(collectionRowToItem);
  } catch {
    return fallbackCollections;
  }
}

export const getPublishedCollections = unstable_cache(
  fetchPublishedCollections,
  ["published-collections", "finishes-v2"],
  { tags: ["collections"] },
);

export async function getCollectionBySlugFromCms(slug: string): Promise<CollectionItem | undefined> {
  const all = await getPublishedCollections();
  return all.find((c) => c.slug === slug);
}

export async function getCollectionSlugsFromCms(): Promise<string[]> {
  const all = await getPublishedCollections();
  return all.map((c) => c.slug);
}
export function getFallbackCollectionSlugs(): string[] {
  return fallbackCollections.map((c) => c.slug);
}
