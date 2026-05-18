import type { MetadataRoute } from "next";
import { siteShareDescription } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LEAFO — FRP planters & fiber pots",
    short_name: "LEAFO",
    description: siteShareDescription,
    start_url: "/",
    display: "browser",
    background_color: "#fbf9f8",
    theme_color: "#1f5d3a",
    lang: "en-IN",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: absoluteUrl("/"),
  };
}
