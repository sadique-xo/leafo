/**
 * Loss-aware image optimization for `public/`.
 *
 * - Photo PNGs (with or without alpha) → WebP @ quality 90
 * - JPEGs → mozjpeg recompress in place when smaller
 * - Skips files already under MIN_BYTES unless `--force`
 *
 * Run: `npm run optimize:images`
 * Dry run: `npm run optimize:images -- --dry-run`
 */
import sharp from "sharp";
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs";
import { dirname, extname, join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const WEBP_QUALITY = 90;
const JPEG_QUALITY = 88;
const MIN_BYTES = 120 * 1024;
const dryRun = process.argv.includes("--dry-run");

/** @param {string} dir */
function walkImages(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkImages(full));
      continue;
    }
    const ext = extname(entry.name).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      files.push(full);
    }
  }
  return files;
}

/** @param {number} bytes */
function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

/** @param {string} file */
async function optimize(file) {
  const rel = relative(root, file);
  const ext = extname(file).toLowerCase();
  const before = statSync(file).size;
  const force = process.argv.includes("--force");

  if (before < MIN_BYTES && !force) {
    return null;
  }

  const meta = await sharp(file).metadata();

  if (ext === ".png") {
    const webpPath = file.replace(/\.png$/i, ".webp");
    const webp = await sharp(file)
      .webp({ quality: WEBP_QUALITY, effort: 6, alphaQuality: WEBP_QUALITY })
      .toBuffer();

    if (webp.length >= before) {
      console.log(`  skip ${rel} (WebP not smaller)`);
      return null;
    }

    const saved = before - webp.length;
    console.log(
      `  ${dryRun ? "[dry-run] " : ""}${rel} → ${relative(root, webpPath)}  ${fmt(before)} → ${fmt(webp.length)} (−${Math.round((saved / before) * 100)}%)`,
    );

    if (!dryRun) {
      writeFileSync(webpPath, webp);
      unlinkSync(file);
    }

    return { from: rel, to: relative(root, webpPath), before, after: webp.length };
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    const jpeg = await sharp(file)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    if (jpeg.length >= before) {
      console.log(`  skip ${rel} (already optimized)`);
      return null;
    }

    const saved = before - jpeg.length;
    console.log(
      `  ${dryRun ? "[dry-run] " : ""}${rel}  ${fmt(before)} → ${fmt(jpeg.length)} (−${Math.round((saved / before) * 100)}%)`,
    );

    if (!dryRun) {
      writeFileSync(file, jpeg);
    }

    return { from: rel, to: rel, before, after: jpeg.length };
  }

  if (ext === ".webp" && before >= MIN_BYTES) {
    const webp = await sharp(file)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();

    if (webp.length >= before) {
      console.log(`  skip ${rel} (already optimized)`);
      return null;
    }

    console.log(
      `  ${dryRun ? "[dry-run] " : ""}${rel}  ${fmt(before)} → ${fmt(webp.length)} (−${Math.round(((before - webp.length) / before) * 100)}%)`,
    );

    if (!dryRun) {
      writeFileSync(file, webp);
    }

    return { from: rel, to: rel, before, after: webp.length };
  }

  return null;
}

async function main() {
  if (!existsSync(publicDir)) {
    console.error("public/ not found");
    process.exit(1);
  }

  const files = walkImages(publicDir);
  console.log(`Optimizing ${files.length} images in public/${dryRun ? " (dry run)" : ""}\n`);

  /** @type {Awaited<ReturnType<typeof optimize>>[]} */
  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const result = await optimize(file);
    if (result) {
      results.push(result);
      totalBefore += result.before;
      totalAfter += result.after;
    }
  }

  console.log("\n---");
  if (results.length === 0) {
    console.log("Nothing to optimize.");
    return;
  }

  console.log(
    `Optimized ${results.length} file(s): ${fmt(totalBefore)} → ${fmt(totalAfter)} (−${Math.round(((totalBefore - totalAfter) / totalBefore) * 100)}%)`,
  );

  const extChanges = results.filter((r) => r.from !== r.to);
  if (extChanges.length > 0) {
    console.log("\nUpdate these paths in site-content / components (.png → .webp):");
    for (const { from, to } of extChanges) {
      const fromUrl = "/" + from.replace(/^public\//, "");
      const toUrl = "/" + to.replace(/^public\//, "");
      console.log(`  ${fromUrl} → ${toUrl}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
