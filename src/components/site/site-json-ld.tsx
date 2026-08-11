import { footer } from "@/data/site-content";
import { absoluteUrl } from "@/lib/site-url";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const externalProfiles = footer.connectLinks
  .map((link) => link.href)
  .filter((href) => /^https?:\/\//i.test(href));

export function SiteJsonLd() {
  const siteUrl = absoluteUrl("/");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "LEAFO",
    legalName: "LEAFO®",
    url: siteUrl,
    email: footer.email,
    telephone: footer.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gandhidham",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo/Leafo-final-logo.png"),
      contentUrl: absoluteUrl("/logo/Leafo-final-logo.png"),
      license: absoluteUrl("/terms"),
      acquireLicensePage: absoluteUrl("/contact"),
      creator: {
        "@type": "Organization",
        name: "LEAFO",
      },
      copyrightNotice: `© ${new Date().getFullYear()} LEAFO`,
    },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/og.jpg"),
      contentUrl: absoluteUrl("/og.jpg"),
      license: absoluteUrl("/terms"),
      acquireLicensePage: absoluteUrl("/contact"),
      creator: {
        "@type": "Organization",
        name: "LEAFO",
      },
      copyrightNotice: `© ${new Date().getFullYear()} LEAFO`,
    },
    sameAs: externalProfiles,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: "LEAFO",
    url: siteUrl,
    description: footer.tagline,
    publisher: { "@id": `${siteUrl}#organization` },
    inLanguage: "en-IN",
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={website} />
    </>
  );
}
