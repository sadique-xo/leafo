import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
let supabaseHost: string | null = null;
try {
  if (supabaseUrl) {
    supabaseHost = new URL(supabaseUrl).hostname;
  }
} catch {
  supabaseHost = null;
}

const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];

if (supabaseHost) {
  remotePatterns.push({
    protocol: "https",
    hostname: supabaseHost,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
