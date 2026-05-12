export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const faqPage = {
  eyebrow: "Frequently Asked",
  title: "Questions, considered.",
  intro:
    "A few of the things people ask us before they bring a LEAFO planter home, or specify one for a project. If yours isn't here, write to us.",
  heroImageSrc: "/inquiry.jpg",
  heroImageAlt: "LEAFO fiber planters and greenery in a serene showroom with stone walls and floor",
  closing: {
    eyebrow: "Still wondering?",
    title: "Ask us anything.",
    intro: "If the question isn't here, send it our way. A real person will write back.",
    cta: { href: "/contact", label: "Write to us" },
  },
} as const;

export const faqSections: FaqSection[] = [
  {
    title: "The material",
    items: [
      {
        question: "What are LEAFO planters made of?",
        answer:
          "Fiber-reinforced plastic, hand-finished in our Anand workshop. FRP is light, weather-stable, and strong enough to live indoors or outdoors for years. Each planter is built layer by layer, then finished by hand.",
      },
      {
        question: "Why FRP, and not terracotta, concrete, or ceramic?",
        answer:
          "FRP gives us three things the traditional materials cannot, all at once: weight a person can lift, finishes that hold their color, and a wall thin enough to keep proportion right. Terracotta breathes but breaks. Concrete lasts but is immovable. Ceramic is beautiful but fragile. FRP is the quiet middle.",
      },
      {
        question: "How thick are the walls?",
        answer:
          "Most LEAFO planters sit between 6mm and 12mm, depending on size and series. Thicker where it carries weight, thinner where it shouldn't show.",
      },
      {
        question: "Will the planter feel cheap or plasticky?",
        answer:
          "No. Hold one and you'll feel the weight of the resin, the texture of the finish, and the honesty of something made by hand. FRP done well looks and feels closer to stone or fine ceramic than to plastic.",
      },
    ],
  },
  {
    title: "Finishes and color",
    items: [
      {
        question: "What finishes do you offer?",
        answer:
          "Gloss, Matte, Rustic, Stone, and Orange Peel - each finish belongs to certain series. The collection page for each series shows which finishes are available.",
      },
      {
        question: "What's the difference between Rustic and Orange Peel?",
        answer:
          "Rustic carries a softer, weathered surface, closer to aged stone. Orange Peel is more defined, with a tight dimpled grain you can read with your fingers. Both are hand-applied; no two are identical.",
      },
      {
        question: "What paint do you use? Will it fade?",
        answer:
          "We use industrial-grade PU coatings formulated for outdoor exposure. Color holds well in shade and indoor light. In direct, full-day sun, deeper tones may soften gradually over years - this is true of any pigment, and we choose ones that age gracefully.",
      },
      {
        question: "Can I request a custom color or finish?",
        answer:
          "For project work and larger orders, yes. Write to us with the reference and we'll tell you what's possible.",
      },
    ],
  },
  {
    title: "Indoor, outdoor, and care",
    items: [
      {
        question: "Can LEAFO planters live outdoors?",
        answer:
          "Yes. FRP is built for it - rain, sun, frost, salt air. Our finishes are sealed against weather.",
      },
      {
        question: "How do I clean the surface?",
        answer:
          "Soft cloth, mild soap, water. That's it. Avoid abrasive scrubbers and solvent-based cleaners; they'll dull the finish.",
      },
      {
        question: "Is there a drainage hole?",
        answer:
          "Most planters ship with a pre-drilled drainage hole. If you'd prefer it sealed for indoor use over a hard floor, mention it in your inquiry and we'll send it that way.",
      },
      {
        question: "Will my plant grow well in an FRP planter?",
        answer:
          "Yes. FRP doesn't leach into soil and doesn't hold heat the way metal does. Pair it with the right potting mix and drainage and your plant will be at home.",
      },
      {
        question: "Can I pot directly into the planter, or should I use a liner?",
        answer:
          "Both work. For larger plants and outdoor settings, potting directly is fine. For delicate species or interiors, a plastic nursery pot inside the planter makes repotting easier.",
      },
    ],
  },
  {
    title: "Ordering",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Send us an inquiry from any product page or our contact page. We'll respond with availability, pricing, lead time, and a proforma invoice. No carts, no online checkout - every order is confirmed in conversation.",
      },
      {
        question: "Can I order a single planter?",
        answer:
          "Yes. We don't have a minimum order quantity for individuals. For trade and project pricing, larger volumes apply.",
      },
      {
        question: "Do you offer discounts on bulk or project orders?",
        answer:
          "Yes, for architects, designers, hotels, and developers. Mention the scope when you write in and we'll share trade terms.",
      },
      {
        question: "How long does an order take?",
        answer:
          "In-stock pieces ship in 5 to 7 working days. Made-to-order finishes and large project quantities take 3 to 6 weeks, depending on size and finish. We'll confirm the timeline before you commit.",
      },
      {
        question: "How do I pay?",
        answer:
          "Bank transfer or UPI against a proforma invoice. Half on confirmation, the balance before dispatch - adjusted for trade and project terms.",
      },
      {
        question: "Why isn't there a payment option on the website?",
        answer:
          "Because no two orders are quite the same. Finishes, sizes, freight, and lead time shift with each one, and we'd rather speak with you once than have you guess.",
      },
      {
        question: "What is the GST on FRP planters?",
        answer: "18%, included in every quote we send.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        question: "Do you deliver to my door?",
        answer:
          "Yes. We ship across India and arrange international freight on request. Delivery is door-to-door for most pin codes.",
      },
      {
        question: "How are the planters packed?",
        answer:
          "Each piece is wrapped in foam, corner-protected, and crated for transit. For large planters, we build a wooden crate around the planter itself.",
      },
      {
        question: "Can I see the packaging before it ships?",
        answer: "Of course. Ask, and we'll send photos before dispatch.",
      },
      {
        question: "What if the planter arrives damaged?",
        answer:
          "Open it within 48 hours of delivery, send us photos of the damage and the packaging, and we'll replace it. Damage in transit is rare, but when it happens, it's on us.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes. We've sent planters to the UK, the UAE, Singapore, Australia, and across the EU. Freight is quoted case by case.",
      },
    ],
  },
  {
    title: "Warranty and longevity",
    items: [
      {
        question: "Is there a warranty?",
        answer:
          "Two years against manufacturing defects on every LEAFO planter. Color and finish are covered against premature fading in normal use. Wear from impact, drilling, or harsh cleaning is not.",
      },
      {
        question: "How long do these planters last?",
        answer:
          "Treated reasonably, a LEAFO planter will outlast most things in your home or project. We've seen pieces from our earliest years still standing, still holding color.",
      },
    ],
  },
  {
    title: "Trade, design, and resellers",
    items: [
      {
        question: "Do you work with architects and interior designers?",
        answer:
          "Yes - most of what leaves our workshop goes to a project. We share trade pricing, finish samples, and CAD specifications on request. Mention your firm when you write in.",
      },
      {
        question: "Do you offer reseller or distributor partnerships?",
        answer:
          "Yes, selectively. We work with a small number of partners in each region. If you'd like to discuss it, write to us with your market and we'll set up a call.",
      },
      {
        question: "Can I see a sample before placing a large order?",
        answer:
          "For project orders, yes - we send finish swatches, and for committed quantities, a sample planter. Ask when you write in.",
      },
      {
        question: "Do you design custom planters for projects?",
        answer:
          "Yes. For specific dimensions, finishes, or one-off shapes, we work directly with the design team. There's a minimum order quantity and a longer lead time; we'll share both when you send the brief.",
      },
    ],
  },
  {
    title: "The plants",
    items: [
      {
        question: "Do you sell plants too?",
        answer:
          "No. LEAFO makes planters. For the plant, we'll happily point you toward a good nursery near you.",
      },
      {
        question: "Will you help me choose the right plant for a planter?",
        answer:
          "We can offer suggestions based on size, light, and setting - but final plant choice is yours, ideally with a nursery that knows your climate.",
      },
    ],
  },
];

export const homeFaqItems: FaqItem[] = [
  faqSections[0].items[0],
  faqSections[1].items[0],
  faqSections[3].items[0],
  faqSections[4].items[3],
].filter(Boolean);
