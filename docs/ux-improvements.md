# UX, Interaction Design, Animations & Navigation Improvements

## Overview

This document covers all improvements made to the Ch.Paisarn website to bring it up to modern UX standards. Changes span accessibility, interaction design, CSS animations, navigation behavior, and performance — all without adding external animation libraries.

---

## 1. Accessibility

### 1.1 Skip-to-main-content link
**File:** `src/layouts/Layout.astro`

A visually hidden `<a href="#main-content">` link is now the first child of `<body>`. It becomes visible (top-left) only when focused via keyboard (`Tab` key). This allows keyboard and screen-reader users to bypass the navbar entirely.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">…</main>
```

### 1.2 Focus-visible ring
**File:** `src/styles/global.css`

A consistent `:focus-visible` ring (`3px solid var(--primary-500)`) now appears on all interactive elements during keyboard navigation. Mouse clicks do not trigger it (`:focus:not(:focus-visible)`), so the UI stays clean for pointer users.

### 1.3 ARIA on navigation
**File:** `src/components/Navbar.astro`

- `<nav>` now has `aria-label="Main navigation"`
- Each mega-menu panel has `role="region"` and `aria-label="[Name] submenu"`
- Language selectors have `role="group"` and `aria-label="Language selection"`
- Hamburger button has `aria-expanded` (updated to `"true"/"false"` on toggle)
- Mobile accordion buttons have `aria-expanded` and `aria-controls` pointing to the child panel

### 1.4 Contact form accessibility
**File:** `src/components/ContactUs.astro`

- Fields now have `required`, `aria-required="true"`, and `autocomplete` hints
- Each field has an associated `<span role="alert" aria-live="polite">` for inline error announcements
- `aria-invalid="true"` is set programmatically on failed validation

---

## 2. Contact Form (Structural Fix)

**File:** `src/components/ContactUs.astro`

| Before | After |
|--------|-------|
| No `<form>` wrapper | `<form id="contact-form" novalidate>` |
| `type="text"` on email | `type="email"` |
| `type="text"` on phone | `type="tel"` |
| `<input>` for enquiry | `<textarea rows="4">` |
| Plain `<button>` | `<button type="submit">` |
| No validation | Client-side validation with `input.validity` API |
| No submission state | Button shows "Sending…" then "Sent! We'll be in touch." |

Validation errors appear inline below each field without page reload. The submit button disables while sending and shows a success state.

---

## 3. Animations

### 3.1 Hero entrance animation
**File:** `src/components/Home.astro`

The two hero title lines and CTA button group animate in on page load with a staggered `fadeUp` keyframe:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(1.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Title 1: 0.1s delay, Title 2: 0.3s, CTA group: 0.5s */
```

### 3.2 Scroll-reveal (Intersection Observer)
**Files:** `src/layouts/Layout.astro` (observer script), `src/styles/global.css` (`.reveal` utility)

Elements with class `reveal` start invisible and slide up when they enter the viewport. The observer fires once per element and then disconnects.

**Applied to:**
- Partners section title and description (`Home.astro`)
- Each partner card (staggered 80ms per card)
- CTA box in `ContactSection.astro`
- Each customization step in `CustomStepsSection.astro` (100ms stagger)
- Each product option card in `ProductOpItemsSection.astro` (60ms stagger)

### 3.3 Collapse product cards — smooth expansion
**Files:** `src/components/collapse/Collapse.tsx`, `src/components/collapse/Collapse.css`

On desktop (≥1024px), clicking a product card now smoothly expands it using CSS `flex` transitions instead of an instant state switch:

```css
.product-card { flex: 1; transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.product-card.is-active-card { flex: 3; }
.product-description { opacity: 0; transition: opacity 0.3s ease 0.15s; }
.is-active-card .product-description { opacity: 1; }
```

The description fades in 150ms after the card starts expanding, so it doesn't flash during the width transition.

---

## 4. Navigation

### 4.1 Mega-menu — fade + slide transition (replaces instant show/hide)
**File:** `src/components/Navbar.astro`

The mega-menu no longer uses `display: none`. It uses `opacity` + `visibility` + `transform`, enabling a smooth 200ms fade-in/out with a subtle upward slide:

```css
.mega-menu {
  opacity: 0; visibility: hidden; pointer-events: none;
  transform: translateY(-0.5rem);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
}
.mega-menu.is-visible { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); }
```

The JS hide delay was reduced from 150ms → 80ms since the CSS transition handles the visual fade.

### 4.2 Mobile nav panel — slide-down animation
**File:** `src/components/Navbar.astro`

The mobile menu panel now uses a `max-height` transition (0 → 60rem) with a cubic-bezier curve, creating a natural slide-down/up effect.

### 4.3 Mobile accordion — animated height expand
**File:** `src/components/Navbar.astro`

Mobile sub-menu items expand/collapse via `max-height` transition (0 → 40rem). The arrow button rotates 90° when expanded.

### 4.4 Active nav link underline indicator
**File:** `src/components/Navbar.astro`

A `var(--secondary-500)` (green) underline slides out from left to right on hover and stays on the active page:

```css
.nav-link::after { width: 0; transition: width 0.2s ease; }
.nav-link.is-active::after, .nav-link:hover::after { width: 100%; }
```

### 4.5 ProductOptionNav — real anchor links
**File:** `src/components/ProductOptionNav.astro`

Nav items were `<p>` tags with no behavior. They are now `<a href="#section-id">` elements that smooth-scroll to the corresponding section. Callers (`Armour.astro`, `Helmet.astro`, `Plate.astro`) pass `{ label, anchor }` objects and wrap target sections in `id`-tagged `<div>` containers.

---

## 5. Interaction Design

### 5.1 Button press feedback
**File:** `src/styles/global.css`

`.btn-primary` and `.btn-secondary` now have an `:active` state that scales down to 96%, giving tactile click feedback:

```css
.btn-primary:active, .btn-secondary:active { transform: scale(0.96); }
```

Font-size was also corrected from `24px` → `1.5rem` for consistency with the project's rem-only sizing rule.

### 5.2 CTA button — navigates to /contact
**File:** `src/components/ContactSection.astro`

The "Contact Us" button was a non-functional `<button>`. It is now an `<a href="/contact">` with `display: inline-block` and the same visual styles, plus `:active` press feedback.

### 5.3 Mega-menu card hover enhancement
**File:** `src/components/Navbar.astro`

In addition to the existing image scale on hover, card titles now transition color to `var(--primary-500)` and the card gains a subtle box-shadow.

### 5.4 Partner logo hover
**File:** `src/components/Home.astro`

Partner logo images have a slight grayscale filter by default (30%) that removes on hover, combined with a scale-up (1.08×). This subtly signals interactivity.

---

## 6. Performance

### 6.1 Lazy-loading below-fold images
- Partner logos in `Home.astro`: `loading="lazy" decoding="async"`
- Product images in `Collapse.tsx`: `loading="lazy" decoding="async"`
- Mega-menu card images in `Navbar.astro`: `loading="lazy" decoding="async"`

### 6.2 Oversized navbar card images (recommendation — not yet applied)

The following images in `/public/images/navbar/` are significantly oversized for their display size:

| File | Current size | Recommended |
|------|-------------|-------------|
| `contact-card.png` | 7.3 MB | < 80 KB WebP |
| `about-company.png` | 5.6 MB | < 80 KB WebP |
| `about-quality.png` | 4.3 MB | < 80 KB WebP |

**To apply:** Move these files from `/public/images/navbar/` to `src/assets/navbar/`, import them in `Navbar.astro` frontmatter, and reference via `img.src`. Astro's built-in image optimization pipeline will then convert them to WebP and resize them automatically.

---

## 7. Files Modified

| File | Changes |
|------|---------|
| `src/layouts/Layout.astro` | Skip link, `id="main-content"`, IntersectionObserver script |
| `src/styles/global.css` | Button `:active` scale, `font-size` rem fix, `.reveal` utility, `:focus-visible` ring |
| `src/components/Navbar.astro` | ARIA labels, mega-menu fade transition, mobile slide-down, accordion expand, active underline, card hover |
| `src/components/ContactUs.astro` | Full form rewrite: `<form>`, correct input types, `<textarea>`, ARIA, validation, submission state |
| `src/components/ContactSection.astro` | `<button>` → `<a href="/contact">`, scroll-reveal on `.cta-box`, `:active` press |
| `src/components/Home.astro` | Hero `fadeUp` animation, partner lazy-load, partner hover, scroll-reveal classes |
| `src/components/ProductOptionNav.astro` | `<p>` → `<a href="#anchor">`, hover color transition |
| `src/components/CustomStepsSection.astro` | `reveal` class with staggered delay on steps |
| `src/components/ProductOpItemsSection.astro` | `reveal` class with staggered delay on cards |
| `src/components/collapse/Collapse.tsx` | `is-active-card` class, product image `loading="lazy"`, always-rendered description div |
| `src/components/collapse/Collapse.css` | `flex` transition on cards, opacity fade on description |
| `src/components/Armour.astro` | Updated `optionsNav` format, added section `id` wrappers |
| `src/components/Helmet.astro` | Updated `optionsNav` format, added section `id` wrappers |
| `src/components/Plate.astro` | Updated `optionsNav` format, added section `id` + `id="standards-compliance"` |

---

## 8. Testing Checklist

1. `npm run dev` — open each route: `/`, `/contact`, `/products`, `/products/ballistic-helmets`, `/products/ballistic-plates`
2. **Navigation (desktop):** Hover nav items — mega-menu fades in/out with slide; active page shows green underline
3. **Navigation (mobile):** Tap hamburger — panel slides down; tap nav item arrow — submenu height-expands; arrow rotates
4. **Hero:** Confirm staggered title + CTA fade-up on first load
5. **Scroll:** Scroll each page and watch section headings, cards, and steps fade up on enter
6. **Products (home):** Click product cards — confirm smooth flex expansion and description fade-in
7. **Buttons:** Click `.btn-primary` / `.btn-secondary` — confirm subtle scale-down on press
8. **Contact form:** Submit empty → inline errors appear; fill correctly → "Sending…" then "Sent!"
9. **Keyboard:** Tab through page — green `:focus-visible` ring on all interactive elements; first Tab shows skip link
10. **CTA buttons:** Click "Contact Us" in any CTA section — navigates to `/contact`
11. `npm run build` — confirm no build errors
