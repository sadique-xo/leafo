/**
 * Converts the finalized product photography in `for-co-work/RENAMED/` into
 * web-sized WebP under `public/products/` and `public/hero/`.
 *
 * Source frames are 6000-7000px camera JPEGs (~500 MB total); output is capped
 * at LONG_EDGE and stripped of metadata. Also writes an image manifest that
 * `build-catalog.mjs` reads so the two steps can't drift apart.
 *
 * Run: `npm run build:product-images`
 * Dry run: `npm run build:product-images -- --dry-run`
 */
import sharp from "sharp";
import { createHash } from "crypto";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "fs";
import { dirname, extname, join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourceDir = join(root, "for-co-work", "RENAMED");
const publicDir = join(root, "public");
const manifestPath = join(__dirname, "generated", "image-manifest.json");

const LONG_EDGE = 1800;
const WEBP_QUALITY = 78;

/**
 * Card tiles are square so the catalog grid stays uniform. Source photography
 * is a near 50/50 mix of 3:2 group shots and 2:3 packshots, and cropping either
 * one into a fixed portrait frame cuts planters off the edges, so tiles are
 * padded instead.
 */
const CARD_SIZE = 1200;

/**
 * Card filenames carry a hash of their own bytes. Re-running this script after
 * changing how tiles are produced (or after a photo is re-shot) then yields a
 * new URL, so browsers and the Next image optimizer cannot serve a stale tile
 * from a previous run.
 */
function contentHash(buffer) {
  return createHash("sha256").update(buffer).digest("hex").slice(0, 8);
}
const dryRun = process.argv.includes("--dry-run");

/**
 * Source folder → output slug. `13_D13-FAMILY` holds one subfolder per jar plus
 * the group shot, so it is expanded rather than mapped directly.
 * @type {Record<string, string>}
 */
const FOLDER_SLUGS = {
  "00_HERO": "hero",
  "01_AQUA": "aqua",
  "02_ALTA": "alta",
  "03_PINO": "pino",
  "04_FIORA": "fiora",
  "05_BARRIL": "barril",
  "06_DOMO": "domo",
  "07_FLUTE": "flute",
  "08_HONEYCOMB": "honeycomb",
  "09_OLIV": "oliv",
  "10_QUILT": "quilt",
  "11_BALCORA": "balcora",
  "12_LAGUNA": "laguna",
  "13_D13-FAMILY/AMPHORA": "amphora",
  "13_D13-FAMILY/ANTIQUE-TRIO": "antique-trio",
  "13_D13-FAMILY/OLLA": "olla",
  "13_D13-FAMILY/TINAJA": "tinaja",
  "14_BEAD": "bead",
  "15_POPS": "pops",
  "16_MADERA": "madera",
  "17_COVA": "cova",
};

/** @param {number} bytes */
function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

/** @param {string} dir */
function jpegsIn(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && [".jpg", ".jpeg"].includes(extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

/**
 * Pads an image out to a square by replicating its edge pixels, then squares it
 * off at CARD_SIZE. Nothing is cropped.
 * @param {Buffer} buffer
 * @param {number} width
 * @param {number} height
 */
/** Above this on every channel, a sampled edge is treated as a white sweep. */
const NEAR_WHITE = 228;

/**
 * Backdrop colour of a strip, used to pick the fill for the band beside it.
 *
 * Uses the median rather than the mean: a planter or prop usually intrudes into
 * the edge, and averaging blends that into a muddy tint (the sample strips here
 * run to a standard deviation of 100). The median ignores the intruder as long
 * as backdrop is the majority of the strip.
 *
 * @param {Buffer} buffer
 * @param {{left: number, top: number, width: number, height: number}} region
 */
async function stripColor(buffer, region) {
  const { data, info } = await sharp(buffer)
    .extract(region)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  const median = [0, 1, 2].map((offset) => {
    const values = new Uint8Array(pixels);
    for (let i = 0; i < pixels; i += 1) {
      values[i] = data[i * info.channels + offset];
    }
    values.sort();
    return values[Math.floor(pixels / 2)];
  });

  const [r, g, b] = median;

  // Studio sweeps photograph a touch off-white; snapping them keeps the tiles
  // reading as one consistent set rather than twenty slightly different creams.
  if (r >= NEAR_WHITE && g >= NEAR_WHITE && b >= NEAR_WHITE) {
    return { r: 255, g: 255, b: 255 };
  }
  return { r, g, b };
}

/**
 * Middle 60% of one edge of the frame.
 * @param {"top" | "bottom" | "left" | "right"} edge
 */
function edgeRegion(edge, width, height, strip) {
  if (edge === "top" || edge === "bottom") {
    const inset = Math.round(width * 0.2);
    return {
      left: inset,
      top: edge === "top" ? 0 : height - strip,
      width: width - inset * 2,
      height: strip,
    };
  }
  const inset = Math.round(height * 0.2);
  return {
    left: edge === "left" ? 0 : width - strip,
    top: inset,
    width: strip,
    height: height - inset * 2,
  };
}

/**
 * Pads an image out to a square, then squares it off at CARD_SIZE. Nothing is
 * cropped. Each band is filled with the average colour of the edge it extends,
 * sampled per side so a backdrop that shifts from wall to floor still reads
 * continuously. Replicating edge pixels instead would smear any variation in
 * that row or column into visible streaks.
 * @param {Buffer} buffer
 * @param {number} width
 * @param {number} height
 */
async function toCardTile(buffer, width, height) {
  const size = Math.max(width, height);
  const strip = Math.max(2, Math.round(Math.min(width, height) * 0.02));
  let squared = buffer;

  if (height < size) {
    const pad = size - height;
    const top = Math.floor(pad / 2);
    const topColor = await stripColor(buffer, edgeRegion("top", width, height, strip));
    const bottomColor = await stripColor(buffer, edgeRegion("bottom", width, height, strip));

    squared = await sharp(squared).extend({ top, background: topColor }).toBuffer();
    squared = await sharp(squared).extend({ bottom: pad - top, background: bottomColor }).toBuffer();
  }

  if (width < size) {
    const pad = size - width;
    const left = Math.floor(pad / 2);
    const leftColor = await stripColor(buffer, edgeRegion("left", width, height, strip));
    const rightColor = await stripColor(buffer, edgeRegion("right", width, height, strip));

    squared = await sharp(squared).extend({ left, background: leftColor }).toBuffer();
    squared = await sharp(squared).extend({ right: pad - left, background: rightColor }).toBuffer();
  }

  // sharp resizes before extending within a single pipeline, so the scale-down
  // has to be its own pass or it would crop the image and pad the crop.
  return sharp(squared)
    .resize(CARD_SIZE, CARD_SIZE)
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer();
}

/**
 * @param {string} file
 * @param {string} outPath
 */
async function convert(file, outPath) {
  const before = statSync(file).size;
  const pipeline = sharp(file)
    .rotate()
    .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 });

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
  const card = await toCardTile(data, info.width, info.height);
  const cardPath = outPath.replace(/\.webp$/, `-card.${contentHash(card)}.webp`);

  console.log(
    `  ${dryRun ? "[dry-run] " : ""}${relative(root, outPath)}  ${fmt(before)} → ${fmt(data.length)} (${info.width}×${info.height}) + card ${fmt(card.length)}`,
  );

  if (!dryRun) {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, data);
    writeFileSync(cardPath, card);
  }

  return {
    before,
    after: data.length + card.length,
    width: info.width,
    height: info.height,
    cardPath,
  };
}

async function main() {
  if (!existsSync(sourceDir)) {
    console.error(`Source not found: ${relative(root, sourceDir)}`);
    process.exit(1);
  }

  // Card names are content-hashed, so a rerun would otherwise leave the
  // previous run's tiles behind as orphans. Only files this script owns may be
  // removed: public/products is generated wholesale, but public/hero is shared
  // with committed art (hero slides, finish swatches), so there we delete just
  // the `leafo-hero-*` files this script writes.
  if (!dryRun) {
    rmSync(join(publicDir, "products"), { recursive: true, force: true });

    const heroDir = join(publicDir, "hero");
    if (existsSync(heroDir)) {
      for (const name of readdirSync(heroDir)) {
        if (name.startsWith("leafo-hero-")) rmSync(join(heroDir, name), { force: true });
      }
    }
  }

  /** @type {Record<string, { src: string; card: string; width: number; height: number }[]>} */
  const manifest = {};
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const [folder, slug] of Object.entries(FOLDER_SLUGS)) {
    const dir = join(sourceDir, folder);
    const files = jpegsIn(dir);

    if (files.length === 0) {
      console.warn(`! no images in ${folder}`);
      continue;
    }

    console.log(`\n${folder} → ${slug} (${files.length})`);
    manifest[slug] = [];

    for (const [index, name] of files.entries()) {
      const num = String(index + 1).padStart(2, "0");
      const outName = `${slug}-${num}.webp`;
      const outPath =
        slug === "hero"
          ? join(publicDir, "hero", `leafo-hero-${num}.webp`)
          : join(publicDir, "products", slug, outName);

      const result = await convert(join(dir, name), outPath);

      totalBefore += result.before;
      totalAfter += result.after;
      count += 1;

      manifest[slug].push({
        src: "/" + relative(publicDir, outPath).split(/[\\/]/).join("/"),
        card: "/" + relative(publicDir, result.cardPath).split(/[\\/]/).join("/"),
        width: result.width,
        height: result.height,
      });
    }
  }

  console.log("\n---");
  console.log(
    `Converted ${count} image(s): ${fmt(totalBefore)} → ${fmt(totalAfter)} (−${Math.round(((totalBefore - totalAfter) / totalBefore) * 100)}%)`,
  );

  if (!dryRun) {
    mkdirSync(dirname(manifestPath), { recursive: true });
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Manifest: ${relative(root, manifestPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
