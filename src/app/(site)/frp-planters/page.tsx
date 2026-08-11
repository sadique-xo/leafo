import type { Metadata } from "next";
import { CollectionsCatalog } from "@/components/site/collections-catalog";
import { getPublishedCollections } from "@/lib/cms/get-collections";

export const metadata: Metadata = {
  title: "Premium FRP Planters - LEAFO",
  description:
    "Explore our high-quality FRP planters. Lightweight, durable, and weather-resistant fiber reinforced plastic pots for indoor and outdoor spaces.",
  keywords: ["FRP planters", "FRP pots", "fiber reinforced plastic planters", "lightweight FRP planters"],
};

export default async function FRPPlantersPage() {
  const collections = await getPublishedCollections();
  return (
    <CollectionsCatalog
      collections={collections}
      heroOverride={{
        eyebrow: "FRP PLANTERS",
        title: "Durable & Lightweight FRP Planters",
        intro:
          "Discover our premium range of Fiber Reinforced Plastic (FRP) planters. Designed to withstand the elements while providing a sleek, modern aesthetic for any residential or commercial project.",
      }}
    />
  );
}
