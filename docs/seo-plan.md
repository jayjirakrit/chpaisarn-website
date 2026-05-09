# SEO Improvement Plan — Rank for "chpaisarn" on Google

## Context

The Ch.Paisarn website (Astro 5 + React 19) shipped with only a single static `<title>` ("Ch.Paisarn - Ballistic Protection") and a Google site verification meta. There was no meta description, no Open Graph / Twitter card tags, no canonical URL, no JSON-LD, and no robots.txt. `astro-robots-txt` was already in `package.json` but never wired into `astro.config.mjs`. Every page reused the same `<Layout>` with no per-page title or description, so Google had no signal about what each route was about.

Goal: make the site discoverable when searching `chpaisarn` on Google. The canonical URL stays `https://chpaisarn-website.vercel.app` (the live Vercel URL).

Strategy:
1. Make `chpaisarn` / `Ch.Paisarn` appear prominently in titles, descriptions, headings, and structured data so Google associates the query with this site.
2. Give every page a unique, descriptive `<title>` and meta description.
3. Add Organization JSON-LD with `name`, `alternateName`, and `url` so Google can build a knowledge-graph entry for the brand.
4. Generate a robots.txt and reference the sitemap so Search Console can crawl the site.

## Approach

### 1. `src/layouts/Layout.astro` — accept SEO props

Replaced the static head with props-driven tags. Defaults cover the home page; every other page passes overrides.

Props (all optional, with sensible defaults):
- `title?: string` — defaults to `"Ch.Paisarn (Chpaisarn) — Ballistic Protection Manufacturer in Thailand"`
- `description?: string` — defaults to a ~155-char brand description that includes the literal token `Chpaisarn` and `Ch.Paisarn`
- `image?: string` — defaults to `/logo_chp.webp`
- `canonical?: string` — when omitted, computed from `Astro.url.pathname` against `Astro.site`
- `noindex?: boolean` — defaults to `false`

Tags rendered in `<head>`:
- `<title>{title}</title>`
- `<meta name="description" content={description} />`
- `<meta name="keywords" content="Chpaisarn, Ch.Paisarn, ballistic protection, body armor, ballistic helmets, ballistic plates, Thailand body armor manufacturer, NIJ certified armor" />`
- `<link rel="canonical" href={canonical} />`
- `<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />`
- Open Graph: `og:type` (website), `og:site_name` ("Ch.Paisarn"), `og:title`, `og:description`, `og:url`, `og:image` (absolute URL via `new URL(image, Astro.site)`)
- Twitter: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- Kept existing: charset, viewport, favicon, font preconnect, Google site verification
- Added `<meta name="author" content="Ch.Paisarn">`

Organization JSON-LD `<script type="application/ld+json">` block (renders on every page):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ch.Paisarn",
  "alternateName": ["Chpaisarn", "CH Paisarn", "Ch Paisarn Co., Ltd."],
  "url": "https://chpaisarn-website.vercel.app",
  "logo": "https://chpaisarn-website.vercel.app/logo_chp.webp",
  "email": "contact@chpaisarn.com",
  "telephone": "+662 580 2552",
  "address": [
    { "@type": "PostalAddress", "streetAddress": "55/20 Soi Ronnasittipichai Sanambinnam Road", "addressLocality": "Tasai Muang Nonthaburi", "postalCode": "11000", "addressCountry": "TH" },
    { "@type": "PostalAddress", "streetAddress": "179 Moo11 Banchian", "addressLocality": "Hunka Chainat", "postalCode": "17130", "addressCountry": "TH" }
  ],
  "description": "Ch.Paisarn (Chpaisarn) is a Thailand-based manufacturer of ballistic protection products including body armor, ballistic helmets, and ballistic plates."
}
```

The `alternateName` array is the key piece for the "chpaisarn" query — it tells Google the spaceless, lowercased form is the same entity.

### 2. Per-page SEO from each page (`src/pages/*.astro`)

Each page wraps a content component in `<Layout>`. Updated the five existing pages to pass `title` and `description` props. The brand token appears in every title.

| Page | Title | Description summary |
|---|---|---|
| `src/pages/index.astro` | `Ch.Paisarn (Chpaisarn) — Ballistic Protection Manufacturer in Thailand` | Mentions Chpaisarn, body armor, helmets, plates, NIJ, Thailand. |
| `src/pages/company.astro` | `About Ch.Paisarn (Chpaisarn) — Thai Ballistic Protection Company` | Company history, partners (Thai military / police / UN), Nonthaburi + Chainat factories. |
| `src/pages/products/index.astro` | `Ballistic Protection Products — Ch.Paisarn (Chpaisarn)` | Body armor, helmets, plates, customized defense solutions. |
| `src/pages/products/ballistic-helmets/index.astro` | `Ballistic Helmets — Ch.Paisarn (Chpaisarn)` | NIJ-rated ballistic helmets manufactured in Thailand. |
| `src/pages/products/ballistic-plates/index.astro` | `Ballistic Plates — Ch.Paisarn (Chpaisarn)` | Hard armor ballistic plates, NIJ levels, Thailand manufacturer. |

Each `description` is 140–160 characters and includes both `Ch.Paisarn` and `Chpaisarn` where natural — Google will bold matching tokens in SERP snippets.

### 3. Wire `astro-robots-txt` and sitemap (`astro.config.mjs`)

The package was already installed. Added it to `integrations` with a `sitemap: true` policy line. `@astrojs/sitemap` already runs; the robots.txt now references it explicitly.

```js
import robotsTxt from "astro-robots-txt";
// ...
integrations: [
  react(),
  sitemap(),
  robotsTxt({
    sitemap: true,
    policy: [{ userAgent: "*", allow: "/" }],
  }),
],
```

After `npm run build`: `dist/robots.txt` and `dist/sitemap-index.xml` are both produced.

### 4. Brand-token reinforcement on the home page (`src/components/Home.astro`)

Per CLAUDE.md, page components own content. Added the literal lowercase token "Chpaisarn" alongside "Ch.Paisarn" in the existing `teamDescription` copy: *"Ch.Paisarn (Chpaisarn) specializes in crafting high-performance ballistic protection..."*. This is the highest-leverage on-page change for the target query — Google ranks pages where the search token appears in body copy + headings + title + structured data consistently. Visual design unchanged.

The Footer copyright line already says "© 2026 Ch.Paisarn" — left as-is.

### 5. Post-deploy verification (manual)

After deploy, the user should:
1. Open Google Search Console for `chpaisarn-website.vercel.app`, request reindex on `/` and `/company`.
2. Submit `https://chpaisarn-website.vercel.app/sitemap-index.xml` in Search Console → Sitemaps.
3. Test JSON-LD with Google's [Rich Results Test](https://search.google.com/test/rich-results).
4. Test OG card with [opengraph.xyz](https://www.opengraph.xyz/).
5. Search `chpaisarn` and `site:chpaisarn-website.vercel.app chpaisarn` after 1–2 weeks to confirm indexing.

## Files modified

- `src/layouts/Layout.astro` — accepts props, renders full SEO `<head>`, embeds Organization JSON-LD.
- `src/pages/index.astro`, `src/pages/company.astro`, `src/pages/products/index.astro`, `src/pages/products/ballistic-helmets/index.astro`, `src/pages/products/ballistic-plates/index.astro` — pass `title` and `description` to `<Layout>`.
- `astro.config.mjs` — added `astro-robots-txt` integration.
- `src/components/Home.astro` — one sentence containing the literal "Chpaisarn" token.

No new files were created in `src/`; no new dependencies were added (every package needed was already in `package.json`).

## Verification

1. `npm run build` succeeds. In `dist/`:
   - `dist/robots.txt` exists and points at the sitemap.
   - `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist with all 5 routes.
   - Each built page has a unique `<title>`, a `<meta name="description">`, a `<link rel="canonical">`, and an Organization JSON-LD block in `<head>`.
2. `npm run dev`, view source on `/`, `/company`, `/products`, `/products/ballistic-helmets`, `/products/ballistic-plates`:
   - Each page shows its own title in the browser tab.
   - Each page's `<meta name="description">` matches the table above.
   - The home page renders the literal word "Chpaisarn" in body copy.
3. Paste the home page HTML into Google's Rich Results Test → Organization schema is detected with no errors and `alternateName` includes `Chpaisarn`.
