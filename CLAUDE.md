# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

No lint or test scripts are configured.

## Architecture

**Stack:** Astro 5 + React 19 + Tailwind CSS v4 (via Vite plugin, not PostCSS). TypeScript throughout. All DOM interactions (navbar mega menu, mobile accordion, video embeds) use vanilla JS — no jQuery.

**Path aliases:** `@` resolves to `/src`, `~` resolves to the project root (both configured in `astro.config.mjs`).

**Page → Component pattern:** Each page file in `src/pages/` is minimal — it imports one "page component" from `src/components/` and wraps it in `Layout.astro`. The page component (`Helmet.astro`, `Armour.astro`, etc.) owns all content data as frontmatter variables and composes reusable section components.

**Reusable section components** (accept props, no internal data):
- `ProductIntroSection.astro` — hero banner with desktop/mobile background image, title, description
- `ProductOptionNav.astro` — anchor navigation tabs for product sections
- `ProductOpItemsSection.astro` — grid of product option cards (images + labels)
- `ProductOptionSection.astro` — protection system option cards with feature lists (canonical style reference)
- `CustomStepsSection.astro` — multi-step customization walkthrough (image + content per step)
- `StatSection.astro` — animated statistics with scroll-triggered count-up
- `ContactSection.astro` — CTA contact card with configurable colors

**Interactive React components** (`.tsx`, use `client:visible` directive):
- `collapse/Collapse.tsx` — expanding product card grid on the home page; uses a `useIsMobile` hook (breakpoint 768px) to show all cards on mobile
- `imgslider/ImageSlider.tsx` — responsive image carousel (1 image on mobile ≤600px, 3 on desktop)

Astro components handle static rendering; React is only introduced for client-side interactivity.

**Routing:** File-based via `src/pages/`. Current routes:

| Route | Page component |
|---|---|
| `/` | `Home.astro` |
| `/company` | `Company.astro` |
| `/contact` | `ContactUs.astro` |
| `/products` | `Products.astro` |
| `/products/ballistic-helmets` | `Helmet.astro` |
| `/products/ballistic-plates` | `Plate.astro` |

## Layout

**`Layout.astro`** is the root wrapper for every page. Props: `title`, `description`, `keywords`, `image`, `canonical`, `noindex`.

It provides:
- Full SEO head (meta tags, Open Graph, Twitter Card, canonical)
- JSON-LD `Organization` + `WebSite` schemas (both emitted globally on every page)
- Google Fonts (`Space Grotesk`, `Hanken Grotesk`, `Roboto`)
- Google Site Verification meta tag
- OG image dimensions (`og:image:width` / `og:image:height`)
- Skip-to-content accessibility link
- Global `IntersectionObserver` that adds `.is-visible` to any element with class `.reveal` when it enters the viewport (threshold 0.15) — used for scroll-triggered fade/slide-up animations

## SEO

**Production domain:** `https://ch-paisarn.com` — set as `site` in `astro.config.mjs`. This propagates to all canonical URLs, the auto-generated sitemap (`/sitemap-index.xml`), and OG image paths.

**Page metadata pattern:** Every page in `src/pages/` passes `title`, `description`, and `keywords` to `Layout`. The `keywords` prop is optional — omitting it falls back to the global default in `Layout.astro`. Always provide a page-specific `keywords` for new pages.

**Global default keywords** (defined in `Layout.astro`):
```
ch-paisarn, ch-paisarn.com, ch paisarn, chapaisarn, chpaisarn, Ch.Paisarn,
body armor Thailand, ballistic protection manufacturer, military equipment Thailand,
NIJ certified armor, ballistic helmets Thailand, ballistic plates Thailand,
Thai defense manufacturer, เสื้อเกราะกันกระสุน, หมวกกันกระสุน, บริษัท เฉลิมไพศาล
```

**JSON-LD schemas:**
- `Organization` + `WebSite` — emitted globally in `Layout.astro`
- `BreadcrumbList` — emitted per inner-page component (`Company.astro`, `ContactUs.astro`, `Armour.astro`, `Helmet.astro`, `Plate.astro`) using `<script is:inline type="application/ld+json" set:html={...} />`

Always use `is:inline` on JSON-LD `<script>` tags to silence the Astro "will be treated as inline" hint.

**Submitting to Google:** After deploying changes, use Google Search Console → URL Inspection → "Request Indexing" per page, and submit `/sitemap-index.xml` under the Sitemaps section.

## DOM interactions

No jQuery — all interactivity is plain DOM APIs (`querySelectorAll`, `classList`, `addEventListener`). Usage patterns across the codebase:

- **Navbar** (`Navbar.astro`) — mega menu show/hide on hover (80ms hide delay), click-outside-to-close, mobile accordion with animated `max-height`, hamburger toggle. Re-initializes on `astro:after-swap` (client-side nav); each run creates a fresh `AbortController` and aborts the previous one to avoid duplicate listener bindings.
- **Video placeholders** (`Home.astro`, `Company.astro`) — click on SVG placeholder swaps in a YouTube `<iframe>` at the same dimensions via the shared `mountClickToPlayEmbed()` helper in `src/scripts/video-embed.ts`.
- **Stats** (`StatSection.astro`) — scroll animation uses vanilla `IntersectionObserver` + `requestAnimationFrame`.

## Styling conventions

Tailwind CSS v4 is imported in `src/styles/global.css` via `@import "tailwindcss"`. Custom utility classes are defined with `@layer components` in the same file — use these instead of raw Tailwind where they apply:

- Typography: `.heading-h1` through `.heading-h6`, `.body-text`, `.body-text-sm`
- Layout: `.section-padding` (responsive horizontal/vertical padding), `.section-min-h`
- Buttons: `.btn-primary` (green), `.btn-secondary` (white outline)
- Colors: `.text-primary`, `.text-primary-dark`, `.bg-gradient-primary`
- Decoration: `.label-accent-border` (3px solid `--accent` underline), `.shadow-card`
- Animation: `.reveal` (initial hidden state) + `.reveal.is-visible` (fade + slide-up end state, toggled by Layout.astro observer)

**Brand CSS variables:**

| Variable | Value | Usage |
|---|---|---|
| `--primary-900` | `#14375f` | Dark navy — headings, borders |
| `--primary-700` | `#194577` | Medium blue |
| `--primary-500` | `#2465ae` | Bright blue — buttons, cards |
| `--primary-300` | `#5e99dc` | Light blue |
| `--primary-100` | `#90b9e7` | Very light blue |
| `--primary-50` | `#dce9f7` | Ultra-light blue — backgrounds |
| `--secondary-500` | `#58bb90` | Green — primary CTA |
| `--secondary-700` | `#087a49` | Dark green accents |
| `--secondary-hover` | `#4fa07d` | Green hover state |
| `--accent` | `#9af9cf` | Bright teal — underlines, stat numbers |
| `--white` | `#ffffff` | |
| `--black` | `#272727` | Dark body text |
| `--gray-light` | `#f5f5f5` | |
| `--gray-lighter` | `#f0f0f0` | |
| `--gray-border` | `#d4d4d4` | |
| `--gray` | `#F3F7FC` | Blue-tinted gray backgrounds |

Fonts (loaded via Google Fonts): Space Grotesk for headings (`--font-space`), Hanken Grotesk for body (`--font-hanken`), Roboto (`--font-roboto`).

**Mobile breakpoints:** lg (1024px) for desktop nav vs. mobile hamburger menu; md (768px) for general responsive layouts.

## Component authoring guidelines

Reusable section components (`.astro`) must follow the pattern established in `src/components/ProductOptionSection.astro`. Use it as the canonical reference when creating or editing section components.

### Frontmatter (props)

- Type every prop explicitly. Read props from `Astro.props` with a typed local binding:
  ```ts
  const optionsTitle: string = Astro.props.optionsTitle;
  const protectionOptions: { label: string; title: string; features: string[] }[] = Astro.props.protectionOptions;
  ```
- Section components are presentational — they accept data via props and own no internal content data. Page components (`Helmet.astro`, `Armour.astro`, etc.) own the content.

### Markup

- Wrap the component in a single semantic root (`<section>`, `<article>`, etc.) with a kebab-case block class (e.g. `options-section`).
- Name child elements with the block prefix (BEM-style without the `__`): `options-head`, `option-card`, `option-card-header`, `option-card-label`. This keeps scoped styles unambiguous.
- Compose typography and shared layout via the global utility classes (`heading-h2`, `body-text`, `section-padding`, etc.) rather than redefining font-size/line-height locally.
- It's fine to mix Tailwind utilities for trivial layout (`flex flex-col justify-center items-center gap-8`) alongside the semantic class — but anything visual that's part of the component identity (colors, card chrome, spacing rhythm) belongs in the scoped `<style>` block.

### Scoped `<style>` block

- Every component owns its visual rules in a single component-scoped `<style>` block at the bottom of the file. Do not push component-specific styles into `global.css`.
- **All sizing, spacing, and typography units must be `rem`.** No `px` for padding, margin, gap, width, font-size, line-height, or border-radius. The only acceptable `px` usages are hairline borders (`1px`–`4px` decorative borders) and shadow offsets where sub-pixel rendering matters; prefer `rem` even there when practical.
- Use brand CSS variables (`var(--primary-900)`, `var(--secondary-500)`, etc.) for colors instead of hardcoding hex values. If a one-off color is genuinely needed, leave a comment explaining why.
- Reference fonts by family name in scoped styles (`font-family: "Space Grotesk", sans-serif;`) consistent with the existing components.

### Mobile-first responsive rules

- Author the **base (mobile) styles first**, with no media query. Mobile is the default, not an override.
- Add larger-viewport rules with `min-width` media queries only — never `max-width`. Use the project's two breakpoints:
  ```css
  /* Tablet and above */
  @media only screen and (min-width: 768px) { ... }

  /* Desktop and above */
  @media only screen and (min-width: 1024px) { ... }
  ```
- Inside each breakpoint, only re-declare properties that actually change at that size. Don't repeat unchanged rules.
- Lay out cards/grids as a single stacked column on mobile; introduce multi-column layouts, larger paddings, and row-direction headers at the `768px` breakpoint and up.

### File skeleton

```astro
---
const title: string = Astro.props.title;
const items: { label: string; title: string }[] = Astro.props.items;
---

<section class="example-section">
  <div class="example-head">
    <h2 class="example-title heading-h2">{title}</h2>
  </div>
  <div class="example-content">
    {items.map((item) => (
      <div class="example-card">
        <span class="example-card-label">{item.label}</span>
        <h3 class="example-card-title">{item.title}</h3>
      </div>
    ))}
  </div>
</section>

<style>
  /* Mobile (base) */
  .example-section {
    padding: 3rem 2rem;
    background-color: white;
  }
  .example-card {
    width: 100%;
    padding: 1rem;
    border-radius: 0.3125rem;
    background-color: var(--primary-700);
  }

  /* Tablet and above */
  @media only screen and (min-width: 768px) {
    .example-section { padding: 5rem 6.25rem; }
    .example-card { width: 80%; padding: 2rem; }
  }

  /* Desktop and above */
  @media only screen and (min-width: 1024px) {
    /* desktop-specific overrides only */
  }
</style>
```

## Deployment

Site is deployed to Vercel. Production domain is `https://ch-paisarn.com` — set as `site` in `astro.config.mjs` and used by `@astrojs/sitemap` for sitemap generation.
