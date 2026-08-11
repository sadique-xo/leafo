import type { Metadata } from "next";
import { Caveat, Inter, Newsreader, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteShareDescription, siteShareImage, siteShareTitle } from "@/lib/site-metadata";
import { getSiteUrl, isIndexableSite } from "@/lib/site-url";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cosmicScript = Caveat({
  variable: "--font-cosmic-script",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "optional",
});

const metadataBase = new URL(getSiteUrl());

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "LEAFO - India's most diverse range of FRP planters and Fiber pots",
    template: "%s | LEAFO",
  },
  description:
    "Nineteen designs of fiber-reinforced planters for homes, hotels, and landscapes. Designed and made in Gandhidham, Gujarat.",
  applicationName: "LEAFO",
  robots: isIndexableSite()
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  openGraph: {
    title: siteShareTitle,
    description: siteShareDescription,
    siteName: "LEAFO",
    type: "website",
    locale: "en_IN",
    images: [siteShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteShareTitle,
    description: siteShareDescription,
    images: [siteShareImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="auto"
      className={cn(
        "min-h-full antialiased font-sans",
        display.variable,
        inter.variable,
        geist.variable,
        cosmicScript.variable,
      )}
    >
      <body className="min-h-full flex flex-col grain-bg">{children}</body>
    </html>
  );
}
