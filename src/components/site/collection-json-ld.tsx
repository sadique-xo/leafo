import type { CollectionItem } from "@/data/site-content";
import { absoluteUrl } from "@/lib/site-url";

type CollectionJsonLdProps = {
  collection: CollectionItem;
};

export function CollectionJsonLd({ collection }: CollectionJsonLdProps) {
  const pageUrl = absoluteUrl(`/collections/${collection.slug}`);
  const imageUrl = collection.imageSrc.startsWith("http")
    ? collection.imageSrc
    : absoluteUrl(collection.imageSrc);

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: collection.name,
    description: collection.summary,
    image: imageUrl,
    url: pageUrl,
    brand: {
      "@type": "Brand",
      name: "LEAFO",
    },
    material: collection.material,
    category: collection.category,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: {
        "@type": "Organization",
        name: "LEAFO",
        url: absoluteUrl("/"),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
