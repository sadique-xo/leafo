import siteContent from "@/data/site-content.json";

type LinkItem = {
  href: string;
  label: string;
};

export type CollectionImage = {
  /** Full uncropped frame, used in the lightbox. */
  src: string;
  /** Square padded tile, used wherever a uniform grid cell is needed. */
  card?: string;
  alt: string;
};

/** One orderable size of a collection, as listed in the LEAFO size chart. */
export type SizeVariant = {
  /** Chart letter, e.g. "A" */
  variant: string;
  /** e.g. "AQUA-A" */
  sku: string;
  /** Diameter in cm, or "L×W" for rectangular formats, e.g. "19.5" | "24x12" */
  diameter: string;
  /** Height in cm */
  height: string;
  /** Prebuilt display string, e.g. "A - 19.5 × 30 cm" */
  label: string;
};

export type CollectionItem = {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  material: string;
  sizes: string[];
  finish: string;
  priceNote: string;
  summary: string;
  story: string[];
  features: string[];
  imageSrc: string;
  imageAlt: string;
  shapes: string[];
  finishes: string[];
  scaleTags: string[];
  /** Full photo set. Absent for CMS rows, which carry a single image. */
  images?: CollectionImage[];
  sizeVariants?: SizeVariant[];
  /** Pre-rename catalogue name, kept for internal traceability. */
  oldName?: string;
  /** Slugs shown as a companion set, e.g. the jars in the Antique Trio. */
  relatedSlugs?: string[];
};

type FilterGroup = {
  label: string;
  options: string[];
};

type CollectionsPageContent = {
  title: string;
  intro: string;
  heroImageSrc: string;
  heroImageAlt: string;
  emptyFilter: string;
  filters: {
    shape: FilterGroup;
    finish: FilterGroup;
    size: FilterGroup;
  };
};

type FinishPageTrait = { label: string; value: string };

type FinishPageItem = {
  name: string;
  tagline?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  /** Lucide icon key resolved in the finishes page */
  icon?: string;
  traits?: FinishPageTrait[];
};

type HomeFinishShort = {
  name: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
};

type BuiltForTile = {
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
};

export type ContactField =
  | {
      name: string;
      label: string;
      type: "text" | "email" | "tel" | "textarea";
      required: boolean;
      placeholder: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      required: boolean;
      placeholder: string;
      options: string[];
    };

type AboutStoryBlock = {
  title: string;
  paragraphs: string[];
};

export type HomeHeroSlideContent = {
  src: string;
  alt: string;
  navTone?: "dark" | "light";
};

type HomeWeAreContent = {
  lines: Array<{ line: string }>;
  closingCopy?: string;
};

type SiteContent = {
  navigation: LinkItem[];
  footer: {
    tagline: string;
    location: string;
    email: string;
    phone: string;
    note: string;
    legalLinks: LinkItem[];
    exploreLinks: LinkItem[];
    connectLinks: LinkItem[];
  };
  collectionsPage: CollectionsPageContent;
  finishesPage: {
    title: string;
    intro: string;
    heroImageSrc: string;
    heroImageAlt: string;
    ctaLabel: string;
    primaryCta?: LinkItem;
    secondaryCta?: LinkItem;
    sectionEyebrow?: string;
    sectionTitle?: string;
    sectionIntro?: string;
    sampleNote?: string;
    items: FinishPageItem[];
  };
  projectsPage: {
    title: string;
    intro: string;
    comingLabel: string;
    comingBody: string;
    heroImageSrc: string;
    heroImageAlt: string;
  };
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    heroImageSrc: string;
    heroImageAlt: string;
    heroSlides?: HomeHeroSlideContent[];
    weAre: HomeWeAreContent;
    heroFactsEyebrow: string;
    heroFacts: Array<{ label: string; body: string }>;
    brandStatementLead: string;
    brandStatement: string;
    brandStatementAsideEyebrow: string;
    brandStatementAside: string;
    featuredProject: {
      eyebrow: string;
      title: string;
      body: string;
      highlights?: Array<{ label: string; body: string }>;
      imageSrc: string;
      imageAlt: string;
      cta: LinkItem;
    };
    collectionsHeading: string;
    collectionsIntro: string;
    finishesShort: HomeFinishShort[];
    builtForHeading: string;
    builtForTiles: BuiltForTile[];
    metrics: Array<{ label: string; value: string }>;
    inquiryHeadline: string;
    inquirySub: string;
    inquiryCta: LinkItem;
  };
  collections: CollectionItem[];
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    storyBlocks: AboutStoryBlock[];
    whatWeMakeTitle: string;
    whatWeMake: string[];
    closing: string;
    cta: LinkItem;
    imageSrc: string;
    imageAlt: string;
  };
  contact: {
    title: string;
    intro: string;
    heroImageSrc: string;
    heroImageAlt: string;
    submitLabel: string;
    thankYouTitle: string;
    thankYouBody: string;
    reachTitle: string;
    visitTitle: string;
    hoursTitle: string;
    hours: string;
    followTitle: string;
    followLinks: LinkItem[];
    drawerTitle: string;
    drawerIntro: string;
    drawerMoreLabel: string;
    fields: ContactField[];
  };
};

const content = siteContent as unknown as SiteContent;

export const navigation = content.navigation;
export const footer = content.footer;
export const collectionsPage = content.collectionsPage;
export const finishesPage = content.finishesPage;
export const projectsPage = content.projectsPage;
export const home = content.home;

/** Hero carousel slides; falls back to single `heroImageSrc` when unset. */
export function getHomeHeroSlides(): HomeHeroSlideContent[] {
  const slides = content.home.heroSlides;
  if (slides?.length) return slides;
  return [
    {
      src: content.home.heroImageSrc,
      alt: content.home.heroImageAlt,
      navTone: "light",
    },
  ];
}
export const collections = content.collections;
export const about = content.about;
export const contact = content.contact;

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
