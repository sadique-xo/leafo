/**
 * Rebuilds the `collections` array and catalog filter options in
 * `src/data/site-content.json` from the finalized LEAFO product index.
 *
 * Product names, descriptions, and the size chart are transcribed from
 * `Leafo_Product_Index_1.xlsx` (the human source of record). They live inline
 * here so the build stays reproducible without the spreadsheet, which is not
 * committed. Photo paths come from the manifest written by
 * `build-product-images.mjs`.
 *
 * Run: `npm run build:catalog`
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentPath = join(root, "src", "data", "site-content.json");
const manifestPath = join(__dirname, "generated", "image-manifest.json");

const MATERIAL = "Fiber-reinforced plastic (FRP)";
const ALL_FINISHES = ["Matt", "Glossy", "Texture", "Wooden"];

/** Display order for filter chips; only tags actually in use are emitted. */
const SHAPE_ORDER = ["Round", "Tall", "Bowl", "Jar", "Faceted", "Sphere", "Rectangle", "Organic"];
const SCALE_ORDER = ["Tabletop", "Small", "Medium", "Large"];

/**
 * Height/footprint thresholds in cm. A planter is bucketed by its largest
 * dimension, so a wide-but-low dome still reads as Large.
 * @type {[string, number][]}
 */
const SCALE_BUCKETS = [
  ["Tabletop", 15],
  ["Small", 25],
  ["Medium", 35],
  ["Large", Infinity],
];

/**
 * @typedef {Object} Product
 * @property {string} slug
 * @property {string} name         Display name, uppercase per the index
 * @property {string} oldName      Pre-rename catalogue name
 * @property {string} subtitle
 * @property {string} description  Verbatim brand copy from the index
 * @property {string} storyExtra   Second paragraph, sizing/application context
 * @property {string} imageAlt
 * @property {string[]} shapes
 * @property {string[]} [finishes] Defaults to the full palette
 * @property {string[]} features
 * @property {[string, string, string][]} variants  [letter, diameter, height]
 * @property {string[]} [scaleTags] Overrides derivation when sizes are unset
 * @property {string[]} [sizesOverride] Display sizes for entries with no size chart rows
 * @property {string[]} [relatedSlugs]
 */

/** @type {Product[]} */
const PRODUCTS = [
  {
    slug: "aqua",
    name: "AQUA",
    oldName: "Aqua",
    subtitle: "Cascading edge detail. Three sizes.",
    description:
      "An ode to flowing water trickling down; AQUA embodies the subliminal elegance of a cascading stream. The edge details invoke the imagery of a droplet formulating itself against gravity.",
    storyExtra:
      "Three sizes step down in proportion, so a single planter reads as a quiet accent and a grouped set reads as a run of water.",
    imageAlt: "AQUA FRP planter with a cascading edge detail",
    shapes: ["Round", "Tall"],
    features: [
      "Indoor · Outdoor · Both",
      "Edge detailing catches light along the rim",
      "Groups well in threes along a corridor or sill",
    ],
    variants: [
      ["A", "19.5", "30"],
      ["B", "15.5", "24"],
      ["C", "11.5", "18"],
    ],
  },
  {
    slug: "alta",
    name: "ALTA",
    oldName: "Conica",
    subtitle: "A curved cone, tall and tapered. Four sizes.",
    description:
      "Exploring the geometrical marriage of a circle & a triangle, ALTA elevates the co-relation into a fresh form that one doesn't expect. The emergence is a curved conical surface softening the gaze of the onlooker.",
    storyExtra:
      "Four heights of the same silhouette, from a 40 cm floor piece down to an 18 cm tabletop. Pairs with palms, ficus, and other upright planting.",
    imageAlt: "ALTA tapered conical FRP planter",
    shapes: ["Round", "Tall"],
    features: [
      "Indoor · Outdoor · Both",
      "Height without a wide footprint",
      "Curved cone softens hard architectural lines",
    ],
    variants: [
      ["A", "22", "40"],
      ["B", "17", "32"],
      ["C", "13", "25"],
      ["D", "10", "18"],
    ],
  },
  {
    slug: "pino",
    name: "PINO",
    oldName: "Budd",
    subtitle: "An elongated bud that swells at the base. Four sizes.",
    description:
      "An elongated profile that swells as it reaches the ground, budding with possibilities of holding life within; PINO invokes a sense of newness and continuity. It almost appears as if it has emerged out of the earth, bearing a fruit of surprise.",
    storyExtra:
      "The narrowest profile in the range at its scale, which makes it useful beside doorways, glazing, and in circulation space where floor area is tight.",
    imageAlt: "PINO elongated bud-shaped FRP planter",
    shapes: ["Round", "Tall"],
    features: [
      "Indoor · Outdoor · Both",
      "Slim footprint for tight plan positions",
      "Reads as sculpture when left unplanted",
    ],
    variants: [
      ["A", "16", "40"],
      ["B", "13", "33"],
      ["C", "11", "28"],
      ["D", "8", "21"],
    ],
  },
  {
    slug: "fiora",
    name: "FIORA",
    oldName: "Fiora",
    subtitle: "Two forms married into one. Four sizes.",
    description:
      "Juggling upon the idea of balance & amalgamation, FIORA takes on its characteristics from two forms and marries them together with effortless grace.",
    storyExtra:
      "Nearly as wide as it is tall, which suits broad-canopy planting and softens the corner of a room or terrace.",
    imageAlt: "FIORA rounded FRP planter with a soft shoulder",
    shapes: ["Round", "Bowl"],
    features: [
      "Indoor · Outdoor · Both",
      "Generous mouth for broad-canopy planting",
      "Balanced proportions for lobbies and living rooms",
    ],
    variants: [
      ["A", "27.5", "32.5"],
      ["B", "23.5", "28.5"],
      ["C", "20.5", "24.5"],
      ["D", "17", "20.5"],
    ],
  },
  {
    slug: "barril",
    name: "BARRIL",
    oldName: "Barril",
    subtitle: "Cylinder on a curved base. Nine sizes.",
    description:
      "Understated elegance of a cylinder takes flight with a loudly expressed curvature base. BARRIL feels familiar to the eyes while still offering the novelty of grace.",
    storyExtra:
      "Nine sizes make this the workhorse of the catalogue, covering everything from a 9 cm desk piece to a 36 cm floor-standing planter.",
    imageAlt: "BARRIL cylindrical FRP planter with a curved base",
    shapes: ["Round"],
    features: [
      "Indoor · Outdoor · Both",
      "The widest size range in the LEAFO catalogue",
      "Specify one form across an entire project at different scales",
    ],
    variants: [
      ["A", "36", "36"],
      ["B", "30", "30"],
      ["C", "24", "24"],
      ["D", "22", "18"],
      ["E", "18", "18"],
      ["F", "18", "14"],
      ["G", "15", "15"],
      ["H", "12", "12"],
      ["I", "12", "9"],
    ],
  },
  {
    slug: "domo",
    name: "DOMO",
    oldName: "Domo",
    subtitle: "Wide, grounded, dome-shouldered. Five sizes.",
    description:
      "A perfect imagination of grounded presence; DOMO dominates with its presence. The planter is hard to ignore as it doesn't shy away from taking space, weaving a tale of stability & confidence.",
    storyExtra:
      "Wider than it is tall at every size, so it holds a floor plane without adding height. Effective either side of an entrance or under low glazing.",
    imageAlt: "DOMO wide dome-shaped FRP planter",
    shapes: ["Bowl", "Round"],
    features: [
      "Indoor · Outdoor · Both",
      "Low centre of gravity suits exposed terraces",
      "Wide mouth for multi-plant arrangements",
    ],
    variants: [
      ["A", "36", "26"],
      ["B", "31", "22"],
      ["C", "25", "18"],
      ["D", "19", "14"],
      ["E", "14", "10"],
    ],
  },
  {
    slug: "flute",
    name: "FLUTE",
    oldName: "Flute",
    subtitle: "An elongated musical profile. Five sizes.",
    description:
      "The sharp yet sweet music of an instrument takes form; the elongated physical attributes find themselves merging with the simplistic euphony of its composition to give shape to FLUTE.",
    storyExtra:
      "Tall rounded-base cups that work as a graduated set. Five sizes let you build a run with rhythm rather than repetition.",
    imageAlt: "FLUTE tall rounded-base FRP planter",
    shapes: ["Round", "Tall"],
    features: [
      "Indoor · Outdoor · Both",
      "Rounded base lifts the form off the floor visually",
      "Designed to be read as a graduated set",
    ],
    variants: [
      ["A", "16", "30"],
      ["B", "14", "22"],
      ["C", "14", "14"],
      ["D", "12", "16"],
      ["E", "10", "11"],
    ],
  },
  {
    slug: "honeycomb",
    name: "HONEYCOMB",
    oldName: "Cryst",
    subtitle: "A hex-faceted module that shifts with the light.",
    description:
      "As our imagination crystallizes itself into a hex-faceted module, we observe it take shape as a beautiful form offering depth & illusion. HONEYCOMB offers the excitement of a shape that changes and comes to life in the space as one moves around it.",
    storyExtra:
      "A single 18 × 26 cm size. The faceting does the work here, so it is best given room to be walked around.",
    imageAlt: "HONEYCOMB hex-faceted FRP planter",
    shapes: ["Faceted"],
    features: [
      "Indoor · Outdoor · Both",
      "Hex faceting shifts as you move around it",
      "Strongest in glossy, where facets catch reflection",
    ],
    variants: [["A", "18", "26"]],
  },
  {
    slug: "oliv",
    name: "OLIV",
    oldName: "Oliv",
    subtitle: "An ellipsoid fruit form. One size.",
    description:
      "Shaped like a beloved fruit that surprises with its distinctly flavoured presence, OLIV dances the line between expectation and reality with ease. The slight change in proportions masterfully plays with the idea of appropriation in inspiration, while leaving us with a fresh form to enjoy.",
    storyExtra:
      "A single 11 × 14.5 cm piece, scaled for desks, shelves, and console tables.",
    imageAlt: "OLIV ellipsoid FRP planter in olive green",
    shapes: ["Sphere"],
    features: [
      "Indoor · Outdoor · Both",
      "Tabletop scale for desks and shelving",
      "Reads as an object first, a planter second",
    ],
    variants: [["A", "11", "14.5"]],
  },
  {
    slug: "quilt",
    name: "QUILT",
    oldName: "Quilt",
    subtitle: "An embossed diamond grid. One size.",
    description:
      "One of our most detailed designs, with a personality that does not shy away from grabbing eyeballs. QUILT plays with an embossed diamond grid, further enhanced by its gently curved profile, coming alive as light around it changes.",
    storyExtra:
      "The most detailed surface in the catalogue at the smallest scale, at 9 × 8 cm.",
    imageAlt: "QUILT small FRP planter with an embossed diamond grid",
    shapes: ["Round"],
    features: [
      "Indoor · Outdoor · Both",
      "Embossed diamond grid across the body",
      "Detail reads best in raking or directional light",
    ],
    variants: [["A", "9", "8"]],
  },
  {
    slug: "balcora",
    name: "BALCORA",
    oldName: "Axis",
    subtitle: "Orthogonal modular boxes. Four formats.",
    description:
      "Imagined in the three standard planes, connecting orthogonally into parallel projections; BALCORA offers infinite possibilities of humble forms not only in creation but also placement in space. The flexibility it offers is unparalleled, pertaining to its modular nature.",
    storyExtra:
      "Four rectangular formats between 24 and 36 cm long that line up end to end, which makes them useful as hedges, dividers, and balcony runs.",
    imageAlt: "BALCORA rectangular modular FRP planter box",
    shapes: ["Rectangle"],
    features: [
      "Indoor · Outdoor · Both",
      "Modular formats line up into continuous runs",
      "Built for hedges, dividers, and balcony edges",
    ],
    variants: [
      ["A", "24x12", "12"],
      ["B", "36x12", "12"],
      ["C", "24x16", "12"],
      ["D", "36x16", "12"],
    ],
  },
  {
    slug: "laguna",
    name: "LAGUNA",
    oldName: "Oasis",
    subtitle: "A flat, wide bowl for water planting. Two sizes.",
    description:
      "Carrying the promise of water, shade and abundance, it carries forward the idea with its flat base design meant to contain water plantation species. LAGUNA is sure to offer joy & relief as one finds it amongst much of earth-based landscape.",
    storyExtra:
      "The flat base is designed to hold standing water, which makes it the one planter in the range built for lilies and other aquatic species.",
    imageAlt: "LAGUNA wide flat FRP water bowl planter",
    shapes: ["Bowl"],
    features: [
      "Indoor · Outdoor · Both",
      "Flat base designed for aquatic planting",
      "Wide, low profile for courtyards and landscape",
    ],
    variants: [
      ["A", "32", "11"],
      ["B", "26", "9"],
    ],
  },
  {
    slug: "amphora",
    name: "AMPHORA",
    oldName: "Urth",
    subtitle: "The tallest of the three antique jars.",
    description:
      "Resembling the ever potent layers of the earth below us, shaped into something so sublime and timeless. AMPHORA connects the process with the concept in the way it's designed.",
    storyExtra:
      "The tallest of the three jars, at 10.5 × 29 cm. Shown as a set with OLLA and TINAJA in the Antique Trio.",
    imageAlt: "AMPHORA tall antique-finish FRP jar planter",
    shapes: ["Jar", "Tall"],
    features: [
      "Indoor · Outdoor · Both",
      "Tallest of the three antique jar forms",
      "Designed to be grouped with OLLA and TINAJA",
    ],
    variants: [["A", "10.5", "29"]],
    relatedSlugs: ["olla", "tinaja", "antique-trio"],
  },
  {
    slug: "olla",
    name: "OLLA",
    oldName: "Clay",
    subtitle: "The soft-bellied middle jar.",
    description:
      "The soft curves merging with intentional exaggeration of form prove fruitful when one instantly feels warmth & endearment when looking at it; OLLA plays upon anachronistic wisdom and connects us to something timeless and familiar.",
    storyExtra:
      "The middle jar at 12 × 18 cm, and the widest of the three relative to its height.",
    imageAlt: "OLLA rounded antique-finish FRP jar planter",
    shapes: ["Jar", "Round"],
    features: [
      "Indoor · Outdoor · Both",
      "Widest belly of the three antique jars",
      "Designed to be grouped with AMPHORA and TINAJA",
    ],
    variants: [["B", "12", "18"]],
    relatedSlugs: ["amphora", "tinaja", "antique-trio"],
  },
  {
    slug: "tinaja",
    name: "TINAJA",
    oldName: "Kao",
    subtitle: "The smallest of the three antique jars.",
    description:
      "Stylish as it is, the form is inspired from a lump of earth slowly pressed and shaped by human hands. While TINAJA takes inspiration from a universal grounded experience, it yet is presented as a very fashionable form.",
    storyExtra:
      "The smallest jar at 10 × 14 cm, which puts it at tabletop scale alongside its two larger siblings.",
    imageAlt: "TINAJA small antique-finish FRP jar planter",
    shapes: ["Jar", "Round"],
    features: [
      "Indoor · Outdoor · Both",
      "Tabletop scale within the antique jar family",
      "Designed to be grouped with AMPHORA and OLLA",
    ],
    variants: [["C", "10", "14"]],
    relatedSlugs: ["amphora", "olla", "antique-trio"],
  },
  {
    slug: "antique-trio",
    name: "Antique Trio",
    oldName: "Urth / Clay / Kao",
    subtitle: "AMPHORA, OLLA and TINAJA as a set of three.",
    description:
      "The three antique jars specified together. AMPHORA, OLLA and TINAJA share a surface and a lineage but not a silhouette, so the set reads as a considered group rather than a repeated form.",
    storyExtra:
      "Supplied as a set of three: AMPHORA at 10.5 × 29 cm, OLLA at 12 × 18 cm, and TINAJA at 10 × 14 cm. Each is also available on its own.",
    imageAlt: "Antique Trio set of three LEAFO jar planters grouped together",
    shapes: ["Jar"],
    features: [
      "Indoor · Outdoor · Both",
      "Set of three: AMPHORA · OLLA · TINAJA",
      "Also available as individual pieces",
    ],
    variants: [],
    scaleTags: ["Tabletop", "Small", "Medium"],
    sizesOverride: ["Set of 3 - AMPHORA · OLLA · TINAJA"],
    relatedSlugs: ["amphora", "olla", "tinaja"],
  },
  {
    slug: "bead",
    name: "BEAD",
    oldName: "Bead",
    subtitle: "A 6 cm ellipsoid, alone or in a bunch.",
    description:
      "Despite being small in size, these ellipsoids have an impactful space presence. BEAD is great as both a stand-alone piece or as a bunch, lending lively amusement to any space no matter the scale.",
    storyExtra:
      "At 6 × 6 cm this is the smallest piece LEAFO makes. Specified in quantity, it behaves more like a surface treatment than a planter.",
    imageAlt: "BEAD small ellipsoid FRP planter",
    shapes: ["Sphere"],
    features: [
      "Indoor · Outdoor · Both",
      "The smallest form in the catalogue",
      "Designed to be specified in quantity",
    ],
    variants: [["A", "6", "6"]],
  },
  {
    slug: "pops",
    name: "POPS",
    oldName: "Pops",
    subtitle: "Lightweight landscaping rocks. Three sizes.",
    description:
      "Coming in numerous shapes and sizes, these lightweight rocks are designed as accessories for a well-thought landscaping experience. POPS takes on nostalgia as we name it after a childhood favourite candy.",
    storyExtra:
      "An accessory rather than a planter: lightweight rock forms that fill and finish a landscape scheme. Sizes are confirmed per project.",
    imageAlt: "POPS lightweight FRP landscaping rocks",
    shapes: ["Organic"],
    finishes: ["Matt", "Texture"],
    features: [
      "Outdoor landscaping accessory",
      "Lightweight enough to reposition by hand",
      "Sizes and quantities confirmed per project",
    ],
    variants: [
      ["A", "", ""],
      ["B", "", ""],
      ["C", "", ""],
    ],
    scaleTags: ["Tabletop", "Small"],
  },
  {
    slug: "madera",
    name: "MADERA",
    oldName: "Barn",
    subtitle: "A wooden-plank box. One format.",
    description:
      "Taking the legacy of BALCORA further, this one adds more layers of personality; MADERA comes in wooden textures of your choice, put up as planks. Despite its genesis from a rural element, these look sophisticated in all sorts of applications.",
    storyExtra:
      "A 24 × 12 × 12 cm box in the wood-grain finish, with the plank line carried across the face. Sits alongside BALCORA in the same modular logic.",
    imageAlt: "MADERA rectangular FRP planter box in a wooden plank finish",
    shapes: ["Rectangle"],
    finishes: ["Wooden"],
    features: [
      "Indoor · Outdoor · Both",
      "Wood-grain finish in your choice of tone",
      "Shares the modular logic of BALCORA",
    ],
    variants: [["A", "24x12", "12"]],
  },
  {
    slug: "cova",
    name: "COVA",
    oldName: "Vessel",
    subtitle: "A widened clay cup that opens upward. Five sizes.",
    description:
      "Taking inspiration from clay cups made on a spinning wheel, as if the centrifugal force is giving it the widened shape; COVA could be called a close kin to PINO in the way its base takes shape. The difference lies in the upper half as it opens up, creating a symbolic step forward in our design archive.",
    storyExtra:
      "Five sizes from 14.5 to 32.5 cm. The open upper half gives planting room to spill over the rim.",
    imageAlt: "COVA rounded FRP planter that widens toward the rim",
    shapes: ["Round", "Bowl"],
    features: [
      "Indoor · Outdoor · Both",
      "Open rim suits trailing and spilling planting",
      "Close kin to PINO in the way the base is formed",
    ],
    variants: [
      ["A", "32.5", "30"],
      ["B", "27", "26"],
      ["C", "23", "22"],
      ["D", "19", "18"],
      ["E", "14.5", "14"],
    ],
    relatedSlugs: ["pino"],
  },
];

/** @param {string} value */
function largestDimension(value) {
  const numbers = value.split(/[^0-9.]+/).map(Number).filter((n) => Number.isFinite(n) && n > 0);
  return numbers.length ? Math.max(...numbers) : 0;
}

/** @param {number} cm */
function bucketFor(cm) {
  const match = SCALE_BUCKETS.find(([, max]) => cm <= max);
  return match ? match[0] : "Large";
}

/** @param {Product} product */
function buildSizeVariants(product) {
  return product.variants.map(([variant, diameter, height]) => ({
    variant,
    sku: `${product.name.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${variant}`,
    diameter,
    height,
    label: diameter && height ? `${variant} - ${diameter} × ${height} cm` : `${variant} - size on request`,
  }));
}

/** @param {Product} product */
function deriveScaleTags(product) {
  if (product.scaleTags) return product.scaleTags;

  const tags = new Set();
  for (const [, diameter, height] of product.variants) {
    const largest = Math.max(largestDimension(diameter), largestDimension(height));
    if (largest > 0) tags.add(bucketFor(largest));
  }
  return SCALE_ORDER.filter((tag) => tags.has(tag));
}

function main() {
  if (!existsSync(manifestPath)) {
    console.error(`Missing ${relative(root, manifestPath)}. Run \`npm run build:product-images\` first.`);
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const content = JSON.parse(readFileSync(contentPath, "utf8"));

  const collections = PRODUCTS.map((product) => {
    const shots = manifest[product.slug];
    if (!shots?.length) {
      throw new Error(`No images in manifest for "${product.slug}"`);
    }

    const finishes = product.finishes ?? ALL_FINISHES;
    const sizeVariants = buildSizeVariants(product);
    const images = shots.map((shot, index) => ({
      src: shot.src,
      card: shot.card,
      alt: index === 0 ? product.imageAlt : `${product.imageAlt} — view ${index + 1}`,
    }));

    return {
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      category: "Collection",
      material: MATERIAL,
      sizes: product.sizesOverride ?? sizeVariants.map((size) => size.label),
      finish: finishes.join(" · "),
      priceNote: "",
      summary: product.description,
      story: [product.description, product.storyExtra],
      features: product.features,
      imageSrc: images[0].card ?? images[0].src,
      imageAlt: images[0].alt,
      shapes: SHAPE_ORDER.filter((shape) => product.shapes.includes(shape)),
      finishes,
      scaleTags: deriveScaleTags(product),
      images,
      sizeVariants,
      oldName: product.oldName,
      ...(product.relatedSlugs ? { relatedSlugs: product.relatedSlugs } : {}),
    };
  });

  const usedShapes = new Set(collections.flatMap((c) => c.shapes));
  const usedFinishes = new Set(collections.flatMap((c) => c.finishes));
  const usedScales = new Set(collections.flatMap((c) => c.scaleTags));

  content.collections = collections;
  content.collectionsPage.filters = {
    shape: { label: "By shape", options: SHAPE_ORDER.filter((s) => usedShapes.has(s)) },
    finish: { label: "By finish", options: ALL_FINISHES.filter((f) => usedFinishes.has(f)) },
    size: { label: "By size", options: SCALE_ORDER.filter((s) => usedScales.has(s)) },
  };

  writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);

  const totalSizes = collections.reduce((sum, c) => sum + c.sizeVariants.length, 0);
  const totalImages = collections.reduce((sum, c) => sum + c.images.length, 0);

  console.log(`Wrote ${collections.length} collections to ${relative(root, contentPath)}`);
  console.log(`  ${totalSizes} size variants · ${totalImages} images`);
  console.log(`  shapes: ${content.collectionsPage.filters.shape.options.join(", ")}`);
  console.log(`  scale:  ${content.collectionsPage.filters.size.options.join(", ")}`);
  console.log(`  finish: ${content.collectionsPage.filters.finish.options.join(", ")}`);

  for (const c of collections) {
    console.log(
      `    ${c.slug.padEnd(13)} ${String(c.images.length).padStart(2)} img  ${String(c.sizeVariants.length).padStart(2)} sizes  ${c.shapes.join("/")} · ${c.scaleTags.join("/")}`,
    );
  }
}

main();
