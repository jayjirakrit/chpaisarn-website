# CSS & HTML Optimization — Change Summary

## Overview

This document summarizes the standardization pass applied to the Ch.Paisarn website codebase. The goal was to eliminate hardcoded values, remove duplicate CSS, fix minor semantic issues, and improve long-term maintainability — without changing any visual output.

---

## 1. Global CSS Variables (`src/styles/global.css`)

### New Design Tokens Added to `:root`

| Variable | Value | Purpose |
|---|---|---|
| `--secondary-700` | `#087a49` | Dark green for accent card titles (was hardcoded) |
| `--secondary-hover` | `#4fa07d` | Hover state for CTA buttons (was hardcoded) |
| `--accent` | `#9af9cf` | Teal border accent used on label elements |
| `--gray-lighter` | `#f0f0f0` | Light gray for table header text/borders |
| `--gray-border` | `#d4d4d4` | Table cell borders |
| `--error` | `#c0392b` | Form validation error color |
| `--focus-ring` | `#0078d7` | Input focus ring/border color |
| `--cta-blue` | `#0360ae` | CTA button color used in `Button.astro` |
| `--shadow-card` | `0 0.25rem 0.625rem rgba(0,0,0,0.15)` | Standard card shadow |

### Full Variable Reference

```css
:root {
  /* Primary */
  --primary-900: #14375f;   /* dark navy */
  --primary-700: #194577;
  --primary-500: #2465ae;
  --primary-300: #5e99dc;
  --primary-100: #90b9e7;
  --primary-50:  #dce9f7;

  /* Secondary */
  --secondary-500:   #58bb90;   /* CTA green */
  --secondary-700:   #087a49;   /* accent dark green */
  --secondary-hover: #4fa07d;   /* green hover */

  /* Accent */
  --accent: #9af9cf;   /* teal label border */

  /* Neutral */
  --white:        #ffffff;
  --black:        #272727;
  --gray-light:   #f5f5f5;
  --gray-lighter: #f0f0f0;
  --gray-border:  #d4d4d4;
  --gray:         #F3F7FC;

  /* UI */
  --error:     #c0392b;
  --focus-ring: #0078d7;
  --cta-blue:  #0360ae;

  /* Shadows */
  --shadow-card: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.15);

  /* Fonts */
  --font-space:  "Space Grotesk", sans-serif;
  --font-hanken: "Hanken Grotesk", sans-serif;
  --font-roboto: "Roboto", sans-serif;
}
```

---

## 2. Global Utility Classes

### New Utilities Added

```css
.label-accent-border  { border-bottom: 3px solid var(--accent); }
.shadow-card          { box-shadow: var(--shadow-card); }
```

### Existing Utilities

```css
.section-padding  /* responsive horizontal/vertical section padding */
.btn-primary      /* green CTA button */
.btn-secondary    /* white outline button */
.text-primary     /* color: var(--primary-500) */
.text-primary-dark /* color: var(--primary-900) */
.bg-gradient-primary /* left-to-right primary gradient */
.reveal           /* scroll-reveal: toggled by IntersectionObserver */
```

### Typography — Tag Selectors Only

All `.heading-h*` utility classes have been removed from the codebase. Heading styles are now applied exclusively via HTML tag selectors in `global.css`. Use the correct semantic tag and the typography is automatic.

```css
h1 { /* Space Grotesk, bold, 80px desktop */ }
h2 { /* Hanken Grotesk, bold, 58px desktop */ }
h3 { /* Hanken Grotesk, bold, 38px desktop */ }
h4 { /* Hanken Grotesk, bold, 28px desktop */ }
h5 { /* Hanken Grotesk, bold, 22px desktop */ }
h6 { /* Hanken Grotesk, 18px desktop */ }
```

Body text applies automatically to `<p>` and `<small>` tags:

```css
p     { /* base → lg, leading-relaxed */ }
small { /* sm → base, leading-relaxed */ }
```

#### Cross-level heading sizing

When a tag's semantic level must differ from its visual size (e.g., an `<h3>` that should look like an `h2`), add a scoped CSS class with explicit sizing in the component's `<style>` block. Do **not** re-introduce `.heading-h*` classes.

```css
/* Example: h3 tag that needs h2-scale visuals */
.section-title {
  font-family: var(--font-hanken);
  font-weight: 700;
  font-size: 2.25rem;
}
@media only screen and (min-width: 768px)  { .section-title { font-size: 3rem; } }
@media only screen and (min-width: 1024px) { .section-title { font-size: 3.625rem; } }
```

Reference sizes per level (mobile → tablet → desktop):

| Level | Mobile | Tablet | Desktop |
|---|---|---|---|
| h1 | 3rem | 3.75rem | 5rem |
| h2 | 2.25rem | 3rem | 3.625rem |
| h3 | 1.5rem | 1.875rem | 2.375rem |
| h4 | 1.25rem | 1.5rem | 1.75rem |
| h5 | 1.125rem | 1.25rem | 1.375rem |
| h6 | 1rem | 1.125rem | 1.125rem |

---

## 3. Component Changes

### `ContactSection.astro`
- `#58bb90` → `var(--secondary-500)`
- `#4fa07d` → `var(--secondary-hover)`
- `"Hanken Grotesk", sans-serif` → `var(--font-hanken)`
- `"Space Grotesk", sans-serif` → `var(--font-space)`
- `box-shadow: 0 4px 10px ...` → `var(--shadow-card)`
- `border-radius: 5px` → `0.3125rem`
- `max-width: 446px` → `27.875rem`
- Removed empty `.cta-description {}` rule and empty `@media (min-width: 1024px) {}`

### `ProductOptionSection.astro`
- `#2465ae` → `var(--primary-500)` (card background)
- `#9af9cf` → `var(--accent)` (border-bottom, both mobile and tablet)
- `"Space Grotesk", sans-serif` → `var(--font-space)`
- `font-size: 12px` → `0.75rem`
- `box-shadow: 0 4px 10px ...` → `var(--shadow-card)`
- `border-radius: 5px` → `0.3125rem`
- Removed duplicate `.option-card-features` / `.option-card-features li` block in `@media (768px)`
- Removed empty `.option-card-title {}` and empty `@media (min-width: 1024px) {}`

### `ProductOpItemsSection.astro`
- `#9af9cf` → `var(--accent)` (border-bottom)
- `"Space Grotesk", sans-serif` → `var(--font-space)`
- `"Hanken Grotesk", sans-serif` → `var(--font-hanken)`
- `border-radius: 5px` → `0.3125rem`
- Removed duplicate `.option-items-card-features` / `.option-items-card-features li` block in `@media (768px)`

### `CustomStepsSection.astro`
- `#9af9cf` → `var(--accent)` (border-bottom, border-right)
- `"Hanken Grotesk", sans-serif` → `var(--font-hanken)` (step-label, step-title)
- `border-bottom: 4px` standardized to `3px` (was inconsistently 4px vs 3px elsewhere)
- Removed unused `.customize-cta` ruleset (class never applied in HTML)
- Removed duplicate `.customize-cta` rule from `@media (768px)`
- Removed empty `@media (min-width: 1024px) {}`

### `ProductOptionNav.astro`
- `"Hanken Grotesk", sans-serif` → `var(--font-hanken)`
- Removed empty `@media (min-width: 1024px) {}`

### `ProductIntroSection.astro`
- Removed conflicting dual-class `body-text heading-h6` on `<p>` — kept `body-text`
- Removed empty `@media (min-width: 1024px) {}`
- `<h1 class="hero-title heading-h2">` → `<h1 class="hero-title">` with explicit h2-scale scoped CSS on `.hero-title` (tag level is h1 but visual size is h2)

### `SpecsSection.astro`
- `#2465ae` → `var(--primary-500)` (table header background, sub-header border)
- `#f0f0f0` → `var(--gray-lighter)` (table header text, border)
- `#d4d4d4` → `var(--gray-border)` (table cell border)
- `#272727` → `var(--black)` (table cell text)
- `"Hanken Grotesk", sans-serif` → `var(--font-hanken)`
- `font-size: 16px` → `1rem`
- `padding: 16px 22px` → `1rem 1.375rem`
- `padding: 12px 22px` → `0.75rem 1.375rem`
- `padding-left: 24px` → `1.5rem`

### `collapse/Collapse.css`
- `border-bottom: 10px solid #58bb90` → `var(--secondary-500)`
- `min-height: 400px` → `25rem`

### `Footer.astro`
- All `#272727` instances → `var(--black)`

### `Navbar.astro`
- `#087a49` → `var(--secondary-700)` (mega card accent title)
- `#f3f4f6` → `var(--gray-light)` (mobile language border)

### `ContactUs.astro`
- `#c0392b` → `var(--error)` (required mark, invalid state, error text)
- `#0078d7` → `var(--focus-ring)` (input focus border)
- `#58bb90` → `var(--secondary-500)` (submit button)
- `"Space Grotesk"` → `var(--font-space)` (submit button)
- `border-radius: 2px` → `0.125rem`

### `Home.astro`
- Removed inline `style="font-family: 'Space Grotesk'; font-size: 18px;"` from "View Products" button — now uses `.btn-primary`
- Replaced inline hardcoded styles on "Customize your product" button with scoped `.customize-btn` class
- Replaced inline hardcoded styles on "Learn Our Story" button with `.btn-primary`
- Removed `.heading-h1` from `.hero-content` wrapper `<div>` — heading font/weight moved to `.hero-content` scoped rule
- Removed `.heading-h2` from `<h2>` tags (now automatic via tag selector)

### `Navbar.astro`
- Removed `.heading-h6` from `<h6>` in mobile mega menu (now automatic)

### `ContactUs.astro`
- `#c0392b` → `var(--error)` (required mark, invalid state, error text)
- `#0078d7` → `var(--focus-ring)` (input focus border)
- `#58bb90` → `var(--secondary-500)` (submit button)
- `"Space Grotesk"` → `var(--font-space)` (submit button)
- `border-radius: 2px` → `0.125rem`
- Removed `.heading-h3` from `<h3>` (now automatic)
- `<label class="heading-h5">` → `<label class="form-label">` with scoped h5-scale sizing (labels are not heading tags)

### `Plate.astro`
- `<h3 class="heading-h2">` → `<h3 class="reg-title-h2">` with explicit h2-scale scoped CSS
- `<h2 class="heading-h3">` → `<h2 class="reg-spec-title">` with explicit h3-scale scoped CSS
- Removed `.heading-h3` from same-level `<h3>` (now automatic)
- Removed `.heading-h5` from same-level `<h5>` (now automatic)
- `"Hanken Grotesk", sans-serif` → `var(--font-hanken)` in table styles
- `#2465ae` → `var(--primary-500)`, `#f0f0f0` → `var(--gray-lighter)`, `#d4d4d4` → `var(--gray-border)` in table styles

### `ProductOpItemsSection.astro`
- Removed `.heading-h2` from `<h2>` and `.heading-h5` from `<h5>` (now automatic)

### `ProductOptionSection.astro`
- Removed `.heading-h2` from `<h2>` and `.heading-h4` from `<h4>` (now automatic)

### `CustomStepsSection.astro`
- `<p class="customize-description heading-h6">` → `<p class="customize-description">` with explicit h6-scale sizing in scoped CSS

### `collapse/Collapse.tsx`
- `heading-h3` className → `product-label-h3` (scoped class in `Collapse.css` with h3-scale sizing)

### `Button.astro`
- `#0360AE` → `var(--cta-blue)` throughout (background, text, border, hover)

---

## 4. How to Add New Colors

Always add to `:root` in `src/styles/global.css` before using in components:

```css
/* Add under the appropriate group in :root */
--my-new-color: #aabbcc;
```

Then reference in any component's scoped `<style>`:

```css
.my-element {
  color: var(--my-new-color);
}
```

Never hardcode hex values directly in component styles.

---

## 5. Responsive Breakpoints

The project uses two breakpoints. Always use `min-width` (mobile-first):

```css
/* Tablet and above */
@media only screen and (min-width: 768px) { ... }

/* Desktop and above */
@media only screen and (min-width: 1024px) { ... }
```

---

## 6. Font Usage

```css
font-family: var(--font-space);    /* Space Grotesk — headings, buttons */
font-family: var(--font-hanken);   /* Hanken Grotesk — body, UI labels */
font-family: var(--font-roboto);   /* Roboto — fallback only */
```

Never write `"Space Grotesk", sans-serif` directly in component styles.
