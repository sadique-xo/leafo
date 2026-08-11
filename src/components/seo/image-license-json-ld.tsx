import { absoluteUrl } from "@/lib/site-url";

type ImageLicenseJsonLdProps = {
  images: Array<{
    url: string;
    creatorName?: string;
    copyrightNotice?: string;
  }>;
};

export function ImageLicenseJsonLd({ images }: ImageLicenseJsonLdProps) {
  if (!images || images.length === 0) return null;

  const validImages = images.filter((img) => img && img.url);
  if (validImages.length === 0) return null;

  const jsonLd = validImages.map((image) => ({
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    contentUrl: image.url.startsWith("http") ? image.url : absoluteUrl(image.url),
    license: absoluteUrl("/terms"),
    acquireLicensePage: absoluteUrl("/contact"),
    creator: {
      "@type": "Organization",
      name: image.creatorName || "LEAFO",
    },
    copyrightNotice: image.copyrightNotice || `© ${new Date().getFullYear()} LEAFO`,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd) }}
    />
  );
}
