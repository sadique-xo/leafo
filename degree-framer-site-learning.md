# DEGREE° Framer site — motion & structure notes

Reference: [https://dergree.framer.website/](https://dergree.framer.website/) (DEGREE — Modern Architecture Studio template, Framer).

**Purpose:** Working notes from inspecting the live page (viewport scroll + DOM via `data-framer-name` and computed styles). Use this while building sections **one by one**; wait for section tasks before implementing.

---

## High-level structure (`main` sections)

| Order | `data-framer-name`   | Approx. role                          |
|-------|----------------------|----------------------------------------|
| 0     | `HeroSection`        | Full-bleed hero, white curtain, type  |
| 1     | `AboutSection`       | Rail type, image stack, WE ARE stack  |
| 2     | `FeaturedWorksSection` | Rail, project cards, featured rows  |
| 3     | `ProcessSection`     | Steps 1–3, masked copy                |
| 4     | `TestimonialSection` | (Not deeply sampled in pass)          |
| 5     | `FooterSection`      | (Not deeply sampled in pass)          |

First section height matched **one viewport** (~673px at test size); total document scroll was long (~12k px).

---

## Motion vocabulary (reuse when building)

| Technique | What it does | Where it showed up |
|-----------|--------------|--------------------|
| **Scroll-scrubbed translateX** | Huge type mostly off-canvas; moves with scroll | `translateX(-740px)` on intro rails (About + Featured) |
| **Scroll-scrubbed scale** | Zoom eases over scroll range | About block ~`scale(0.7)`; image cluster ~`scale(1.5)`; project images ~`1.35 → ~1` |
| **Opacity staging** | Focus / before-after | Mission lines ~`0.4` vs `1`; card image `0 → 1`; names ~`0.8` |
| **Overflow masks** | Text/image “reveals” inside a clip | `overflow: hidden` on Text Wrap, Secondary, Container, Paragraph, cards, Featured strips |
| **Layered backgrounds** | Reads as “bg change” while scrolling | White **`Curtain`** over hero photo; white sections scroll up over imagery |
| **Stacked panels** | One narrative step at a time | `Scroll Sections` children `1` / `2` / `3`; `Featured · 1` / `Featured · 2` |
| **Staggered Y + fade** | Next step hidden until scroll | Process inner blocks `opacity: 0` + `translateY(-230px)` before activation |

Hero photo used **`opacity: 1`** in samples; perceived background change is mostly **composition** (white layer + next section), not a single crossfade on the image.

---

## Section 1 — Hero (`HeroSection`)

### Layers (inferred naming)

- **Primary Image** — full-viewport photo, `position: relative`, inside nested **`overflow: hidden`** wrappers.
- **Curtain** — `position: absolute`, **`background: rgb(255, 255, 255)`**, full hero footprint; white overlay in the stack.
- **Container** / nested clips — additional **`overflow: hidden`** for masking.
- **Desktop 1**, **Text Wrap** — hero footer type; **`overflow: hidden`** strips → line / clipped vertical reveal pattern.
- **Text 2** — alternate or secondary text line (opacity can differ by scroll; sampled tree had `0` at top in one pass).

### Motion / scroll behavior

- Hero **scrolls with the document** (image block `top` goes negative as `scrollY` increases); not a `position: fixed` full-bleed parallax on the sampled image node.
- Transition into About: **hero moves up**, **white about content** enters from below; **horizontal band / large type** (e.g. “ABOUT”) appears during handoff.

### Build checklist (later)

- [ ] Full-viewport media stack with mask wrappers.
- [ ] White curtain layer (absolute) over image.
- [ ] Masked typography (overflow hidden parents).
- [ ] Scroll handoff to white section (no reliance on image opacity alone).

---

## Section 2 — About (`AboutSection`)

### Notable nodes

- **`DIV` rail** — **`translateX(-740px)`** → oversized horizontal title scrub.
- **About Section** — around **`scale(0.7)`** mid-transition → block scale toward full size.
- **Images** — **`scale(1.5)`** → zoomed collage easing toward ~1:1.
- **Center** / **Bottom** (copy lines) — **`opacity: 0.4`** on inactive lines vs **`1`** on active → cycling / focus by scroll or progress.
- **Scroll Sections** — parent sometimes **`opacity: 0`** with visible children `1`, `2`, `3` → **stacked scroll panels**, each **`overflow: hidden`**.
- **Paragraph** / **Secondary** / **Container** — masked text reveals.

### Motion summary

- **Rail + scale + image zoom + opacity copy + stacked panels.**

### Build checklist (later)

- [ ] Horizontal mega-type mapped to scroll (`translateX`).
- [ ] Section container scale scrub.
- [ ] Image group scale scrub (~1.5 → 1).
- [ ] Mission lines: opacity focus states.
- [ ] Three stacked sub-panels with overflow masks.

---

## Section 3 — Featured (`FeaturedWorksSection`)

### Notable nodes

- Top **`DIV`** — same **`translateX(-740px)`** rail as About.
- **Projects** — subtle **scale** (~0.9995 → 1).
- **Project Card** — **`overflow: hidden`**.
- **Project Image** — **opacity** (`0` / `1`) + **scale** (~1.35 when visible) → scroll-scrubbed zoom + fade.
- **Name** — **`opacity: 0.8`**.
- **Featured · 1** / **Featured · 2** — separate **`overflow: hidden`** vertical bands.
- **Button** → **Secondary** → **Container** — small masked text / CTA reveal.

### Build checklist (later)

- [ ] Repeat rail pattern.
- [ ] Card frame + image scrub (opacity + scale).
- [ ] Stacked “featured” rows with masks.

---

## Section 4 — Process (`ProcessSection`)

### Notable nodes

- **Step 1** / **Step 2** / **Step 3** — large vertical spacing between steps (stack moving through viewport).
- **Wrapper** — **`overflow: hidden`**.
- Inner **`DIV`** — **`opacity: 0`** + **`translateY(-230px)`** before reveal → staggered step content.

### Build checklist (later)

- [ ] Step stack layout + scroll-linked vertical rhythm.
- [ ] Per-step masked wrappers.
- [ ] Staging: translateY + opacity off → on.

---

## Implementation hints (when coding)

- Framer uses **continuous scroll interpolation** (scrub), not only one-shot “in view” triggers.
- Typical stack: **smooth scroll** (e.g. Lenis) + **scroll position → transform/opacity** (e.g. GSAP ScrollTrigger, Motion `useScroll` / `useTransform`, or CSS scroll-driven animations with acceptable browser support).
- **Parent `overflow: hidden`** is the main “reveal” primitive alongside transforms.

---

## One-paragraph build prompt (seed)

Recreate a long single-page flow with: (1) **full-viewport hero** — photo stack, **white curtain overlay**, **masked hero type**; (2) **About** — **scroll-scrubbed horizontal mega-type** (`translateX` rail), **section scale** (~0.7→1), **image collage scale** (~1.5→1), **opacity-cycled** mission lines, **three overflow-masked stacked panels**; (3) **Featured** — same **rail**, **project cards** with **image fade + zoom scrub**, **stacked featured rows**; (4) **Process** — **three steps**, **overflow-masked** copy, **translateY + opacity** staging. Favor **scroll-linked** motion and **layered white fills** for background transitions.

---

## Session log

- Initial pass: Playwright MCP — scroll positions, screenshots, qualitative animation notes.
- Second pass: `getComputedStyle` sampling at multiple `scrollY` values; section roots and named layers verified via `data-framer-name`.

**Next:** Build sections **one by one** per user direction; extend this file if new sections (Testimonial, Footer) are analyzed.
