import type { CollectionItem } from "@/data/site-content";
import { resolveImageSrc } from "@/lib/cms/resolve-image-src";

export type CollectionRow = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  material: string;
  sizes: unknown;
  finish: string;
  price_note: string;
  summary: string;
  story: unknown;
  features: unknown;
  image_src: string;
  image_alt: string;
  shapes: string[] | null;
  finishes: string[] | null;
  scale_tags: string[] | null;
  published: boolean;
  updated_at: string;
};

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  return [];
}

export function collectionRowToItem(row: CollectionRow): CollectionItem {
  return {
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    category: row.category,
    material: row.material,
    sizes: asStringArray(row.sizes),
    finish: row.finish,
    priceNote: row.price_note,
    summary: row.summary,
    story: asStringArray(row.story),
    features: asStringArray(row.features),
    imageSrc: resolveImageSrc(row.image_src),
    imageAlt: row.image_alt,
    shapes: row.shapes ?? [],
    finishes: row.finishes ?? [],
    scaleTags: row.scale_tags ?? [],
  };
}
