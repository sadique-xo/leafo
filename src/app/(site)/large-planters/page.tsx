import type { Metadata } from "next";
import { CollectionsCatalog } from "@/components/site/collections-catalog";
import { getPublishedCollections } from "@/lib/cms/get-collections";

export const metadata: Metadata = {
  title: "Large & Jumbo Planters - LEAFO",
  description:
    "Make a statement with our large and jumbo FRP planters. Commercial-grade, extra-large planters perfect for trees, resorts, and architectural projects.",
  keywords: ["large planters", "jumbo planters", "commercial planters", "extra large pots", "tree planters"],
};

export default async function LargePlantersPage() {
  const collections = await getPublishedCollections();
  return (
    <CollectionsCatalog
      collections={collections}
      heroOverride={{
        eyebrow: "LARGE PLANTERS",
        title: "Commercial-Grade Large Planters",
        intro:
          "Create striking focal points with our collection of large and jumbo planters. Engineered for stability and scale, ideal for commercial spaces, hotels, and expansive landscapes.",
      }}
    />
  );
}
