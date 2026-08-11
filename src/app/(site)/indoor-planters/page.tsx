import type { Metadata } from "next";
import { CollectionsCatalog } from "@/components/site/collections-catalog";
import { getPublishedCollections } from "@/lib/cms/get-collections";

export const metadata: Metadata = {
  title: "Modern Indoor Planters - LEAFO",
  description:
    "Elevate your interior design with our stylish indoor planters. Premium lightweight pots in various finishes for homes and offices.",
  keywords: ["indoor planters", "interior pots", "modern planters", "lightweight indoor pots"],
};

export default async function IndoorPlantersPage() {
  const collections = await getPublishedCollections();
  return (
    <CollectionsCatalog
      collections={collections}
      heroOverride={{
        eyebrow: "INDOOR PLANTERS",
        title: "Modern Indoor Planters",
        intro:
          "Bring nature inside with our refined collection of indoor planters. Seamlessly blend greenery into your home or office with designs tailored for contemporary interiors.",
      }}
    />
  );
}
