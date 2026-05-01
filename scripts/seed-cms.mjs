/**
 * Seed Supabase `collections` from site-content.json.
 * Run: `npm run seed:cms` with .env.local containing SUPABASE_SERVICE_ROLE_KEY (and NEXT_PUBLIC_*).
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

if (existsSync(join(root, ".env.local"))) {
  dotenv.config({ path: join(root, ".env.local") });
}
dotenv.config({ path: join(root, ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const admin = createClient(url, key, { auth: { persistSession: false } });

const raw = JSON.parse(
  readFileSync(join(root, "src/data/site-content.json"), "utf8")
);

const rows = raw.collections.map((c) => ({
  slug: c.slug,
  name: c.name,
  subtitle: c.subtitle,
  category: c.category,
  material: c.material,
  sizes: c.sizes,
  finish: c.finish,
  price_note: c.priceNote,
  summary: c.summary,
  story: c.story,
  features: c.features,
  image_src: c.imageSrc,
  image_alt: c.imageAlt,
  shapes: c.shapes,
  finishes: c.finishes,
  scale_tags: c.scaleTags,
  published: true,
}));

const { error } = await admin.from("collections").upsert(rows, { onConflict: "slug" });

if (error) {
  console.error(error);
  process.exit(1);
}

console.log(`Upserted ${rows.length} collections.`);
