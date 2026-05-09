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

**Stack:** Astro 5 + React 19 + Tailwind CSS v4 (via Vite plugin, not PostCSS). TypeScript throughout. jQuery for lightweight DOM interactions (navbar hover/mobile toggle).

**Path alias:** `@` resolves to `/src` (configured in `astro.config.mjs`).

**Page → Component pattern:** Each page file in `src/pages/` is minimal — it imports one "page component" from `src/components/` and wraps it in `Layout.astro`. The page component (`Helmet.astro`, `Armour.astro`, etc.) owns all content data as frontmatter variables and composes reusable section components.

**Reusable section components** (accept props, no internal data):
- `ProductIntroSection.astro` — hero banner with background image, title, description
- `ProductOptionNav.astro` — anchor navigation tabs for product sections
- `ProductOpItemsSection.astro` — grid of product option cards
- `CustomStepsSection.astro` — multi-step customization walkthrough
- `ContactSection.astro` — CTA contact card

**Interactive React components** (`.tsx`, use `client:visible` directive):
- `collapse/Collapse.tsx` — expanding product card grid on the home page; uses a `useIsMobile` hook (breakpoint 768px) to show all cards on mobile
- `imgslider/ImageSlider.tsx` — responsive image carousel (1 image on mobile ≤600px, 3 on desktop)

Astro components handle static rendering; React is only introduced for client-side interactivity.

**Routing:** File-based via `src/pages/`. Current routes: `/` (home), `/company`, `/products`, `/products/ballistic-helmets`, `/products/ballistic-plates`.

## Styling conventions

Tailwind CSS v4 is imported in `src/styles/global.css` via `@import "tailwindcss"`. Custom utility classes are defined with `@layer components` in the same file — use these instead of raw Tailwind where they apply:

- Typography: `.heading-h1` through `.heading-h6`, `.body-text`, `.body-text-sm`
- Layout: `.section-padding` (responsive horizontal/vertical padding), `.section-min-h`
- Buttons: `.btn-primary` (green), `.btn-secondary` (white outline)
- Colors: `.text-primary`, `.text-primary-dark`, `.bg-gradient-primary`

Brand colors as CSS variables: `--primary-900: #14375f` (dark navy) through `--primary-50`, `--secondary-500: #58bb90` (green CTA).

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

Site is deployed to Vercel. The `site` URL in `astro.config.mjs` is `https://chpaisarn-website.vercel.app` — this is used by `@astrojs/sitemap` for sitemap generation.
