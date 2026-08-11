import type { Metadata } from "next";
import { CollectionsCatalog } from "@/components/site/collections-catalog";
import { getPublishedCollections } from "@/lib/cms/get-collections";

export const metadata: Metadata = {
  title: "Collections - LEAFO planters",
  description:
    "Nineteen designs of FRP planters. Filter by shape, finish, and size. Inquire for project quotes.",
};

export default async function CollectionsPage() {
  const collections = await getPublishedCollections();
  return <CollectionsCatalog collections={collections} />;
}
