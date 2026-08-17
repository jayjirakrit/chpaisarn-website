# Contract: `ProductIntroSection.astro` props (updated)

This is the UI contract other page/wrapper components rely on when consuming the shared `ProductIntroSection` component. This feature adds one new optional prop; all existing props are unchanged.

## Props (`ProductInfoProps`)

| Prop | Type | Required | Change |
|---|---|---|---|
| `productName` | `string` | Yes | unchanged |
| `productsImg` | `ImageMetadata[]` | Yes | unchanged |
| `level` | `string` | Yes | unchanged |
| `colors` | `Color[]` | Yes | unchanged |
| `sizes` | `String[]` | Yes | unchanged |
| `productDesc` | `string` | Yes | unchanged |
| `lang` | `Lang` | No (default `"en"`) | unchanged |
| `specPdfUrl` | `string` | No | **NEW** — the spec PDF URL *for the language of the page currently rendering this component*. When provided, a "Download Spec" button/link renders above the product title; when omitted, no button renders and no layout gap is left. The component itself has no notion of "the other language" — callers are responsible for passing the value that matches the page's own language (see Behavior contract, item 5). |

## Behavior contract

1. **Given** `specPdfUrl` is a non-empty string, **when** the component renders, **then** a link labeled exactly `"Download Spec"` appears above `productName`, pointing at `specPdfUrl`.
2. **Given** `specPdfUrl` is `undefined`/omitted, **when** the component renders, **then** no button markup is emitted at all (not hidden via CSS — absent from the DOM) and no spacing/gap is reserved for it.
3. **Given** the button is rendered, **when** a visitor activates it, **then** the browser requests `specPdfUrl` only at that point — no earlier request is made as part of page load, prefetch, or hydration.
4. The label text `"Download Spec"` is invariant — it is not translated and does not change based on the `lang` prop.
5. **Language independence (FR-008/FR-009)**: `specPdfUrl` always means "the PDF for this page's own language." The component performs no EN/TH resolution or fallback itself — it is the caller's responsibility to source `specPdfUrl` from the product data file matching the page's language (e.g. an English page must never pass a Thai PDF URL, or vice versa). If the caller's own data has no PDF for the current language, it MUST pass `undefined`, not the other language's URL.

## Consumers (must pass `specPdfUrl` through unchanged when present on their own data)

- `src/components/HelmetInfo.astro` → `specPdfUrl={productInfo.specPdfUrl}` — `productInfo` is sourced from `helmet-info.ts` (English routes) or `helmet-info.th.ts` (Thai routes) depending on which page rendered it, so the correct language's value flows through automatically.
- `src/components/ArmourInfo.astro` → `specPdfUrl={productInfo.specPdfUrl}` — same pattern, sourced from `armor-info.ts` / `armor-info.th.ts`.

Any future page/wrapper component that renders `ProductIntroSection` and wants the button must supply `specPdfUrl` from its own (language-matched) product data — no changes to `ProductIntroSection.astro` itself are required (User Story 3 / SC-003).
