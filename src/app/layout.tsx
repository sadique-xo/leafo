import type { Metadata } from "next";
import { Inter, Newsreader, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ui = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "LEAFO — FRP planters, fiber pots & modular systems",
    template: "%s | LEAFO",
  },
  description:
    "Twelve collections of fiber-reinforced planters for homes, hotels, and landscapes. Designed and made in Anand, Gujarat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", display.variable, body.variable, ui.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col grain-bg">{children}</body>
    </html>
  );
}
