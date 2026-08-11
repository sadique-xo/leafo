import type { Metadata } from "next";
import { CollectionsCatalog } from "@/components/site/collections-catalog";
import { getPublishedCollections } from "@/lib/cms/get-collections";

export const metadata: Metadata = {
  title: "Premium Fibreglass Planters - LEAFO",
  description:
    "Shop elegant and long-lasting fibreglass planters. Our weatherproof fiberglass pots are perfect for gardens, balconies, and commercial spaces.",
  keywords: ["fibreglass planters", "fiberglass pots", "large fiberglass planters", "weatherproof planters"],
};

export default async function FibreglassPlantersPage() {
  const collections = await getPublishedCollections();
  return (
    <CollectionsCatalog
      collections={collections}
      heroOverride={{
        eyebrow: "FIBREGLASS PLANTERS",
        title: "Elegant Fibreglass Planters",
        intro:
          "Enhance your spaces with our meticulously crafted fibreglass planters. Offering the perfect balance of lightweight convenience, superior durability, and timeless design.",
      }}
    />
  );
}
