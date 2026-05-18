import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl, isIndexableSite } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableSite()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
