import type { Metadata } from "next";
import { CollectionsCatalog } from "@/components/site/collections-catalog";
import { getPublishedCollections } from "@/lib/cms/get-collections";

export const metadata: Metadata = {
  title: "Outdoor Planters & Garden Pots - LEAFO",
  description:
    "Transform your exterior with our durable outdoor planters. UV-resistant and weatherproof FRP & fibreglass planters built for gardens and terraces.",
  keywords: ["outdoor planters", "garden planters", "weatherproof pots", "exterior planters"],
};

export default async function OutdoorPlantersPage() {
  const collections = await getPublishedCollections();
  return (
    <CollectionsCatalog
      collections={collections}
      heroOverride={{
        eyebrow: "OUTDOOR PLANTERS",
        title: "Weatherproof Outdoor Planters",
        intro:
          "Built to endure sun, rain, and frost, our outdoor planters bring life to patios, gardens, and commercial landscapes without compromising on style.",
      }}
    />
  );
}
