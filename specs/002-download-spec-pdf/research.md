# Phase 0 Research: Download Spec PDF Button

No open "NEEDS CLARIFICATION" markers remained after `/speckit-clarify` (see spec.md Clarifications). The items below are the technical decisions needed to execute the plan, derived from the existing codebase rather than external research.

## 1. Where to store the PDF asset

- **Decision**: Store spec PDFs under `public/specs/<product-line>/<slug>-<lang>.pdf` (e.g. `public/specs/helmets/fast-helmet-en.pdf` and `public/specs/helmets/fast-helmet-th.pdf`), referenced by a plain string URL (e.g. `/specs/helmets/fast-helmet-en.pdf`). The `-en`/`-th` suffix keeps the two language files unambiguous on disk even though each is only ever referenced from its own language's data file.
- **Rationale**: Astro's `astro:assets` pipeline (the `<Image>` component, `import.meta.glob` image imports already used in `src/data/helmet-info.ts`/`armor-info.ts`) exists to optimize and fingerprint *image* formats. A PDF gains nothing from that pipeline and doesn't need to be imported as a module — it just needs a stable, directly linkable URL. `public/` is already the project's convention for exactly this: `favicon.ico`, `favicon.svg`, `logo_chp.png`, and all `public/images/navbar/*` files are served verbatim from `public/` for direct linking.
- **Alternatives considered**:
  - `src/assets/specs/*.pdf` imported via `import.meta.glob(..., { query: "?url" })`: works, but adds Vite content-hashing and import-plumbing ceremony for a file type that isn't processed/optimized — no benefit over `public/`, and inconsistent with how the project already treats non-image static assets.
  - Fetching PDFs from an external host/CMS: rejected — spec's Assumptions explicitly state PDFs are static, build-time assets, not externally fetched.

## 2. How to satisfy "PDF must not be fetched until click" (FR-007)

- **Decision**: Render a plain `<a href={specPdfUrl} download target="_blank" rel="noopener">` anchor. No JavaScript, no `fetch()`, no `<link rel="preload">`/`prefetch`.
- **Rationale**: Browsers do not download the target of an `<a href>` until the link is activated (clicked/tapped). This is native behavior — a static anchor tag inherently transfers zero bytes of the linked file during page load, satisfying FR-007/SC-005 with no additional engineering. Using `download` prompts a save where the browser's PDF viewer would otherwise intercept navigation; `target="_blank" rel="noopener"` is a safe fallback for browsers that ignore `download` for cross-origin-like PDF viewer takeovers.
- **Alternatives considered**: A JS click-handler that calls `fetch()` then triggers a Blob download — rejected as unnecessary complexity (violates Constitution Principle V, Minimalism) for something a native anchor already does correctly.

## 3. How EN/TH per-language PDFs map onto the component (FR-008/FR-009)

- **Decision**: Keep `ProductIntroSection.astro` itself language-agnostic — it still takes a single `specPdfUrl?: string` prop meaning "the spec PDF for whatever language this page is." The EN/TH split happens entirely at the data layer: `helmet-info.ts` (English pages) and `helmet-info.th.ts` (Thai pages) are already separate files consumed by separate routes (`/products/ballistic-helmets/[name]` vs `/th/products/ballistic-helmets/[name]`), so each file simply gets its own independent `specPdfUrl` value for the same product. If a product's Thai file has no `specPdfUrl` while its English file does, the Thai page's prop is `undefined` and the button doesn't render there — satisfying FR-009's "no cross-language fallback" with zero conditional logic anywhere.
- **Rationale**: This site's i18n is route-based, not a client-side language switch (confirmed: `src/pages/th/**` is a fully separate route tree from `src/pages/**`, each rendering from its own data file). "Current language selection" is therefore already resolved by which page/route is being rendered — there's no runtime language state to branch on inside the component. Introducing an `{ en: string; th: string }` object prop, or fallback logic inside the component, would duplicate a decision the routing/data-file split already makes, violating Constitution Principle V (Minimalism).
- **Alternatives considered**:
  - A single `specPdfUrl: { en?: string; th?: string }` object prop with the component picking the right key via its `lang` prop: rejected — adds a branch inside a presentational component for something the file-per-language data split already guarantees, and it's more ceremony for callers (`HelmetInfo.astro`/`ArmourInfo.astro` would need to resolve the key before passing it down anyway, so the object buys nothing).
  - Fallback to the other language's PDF when the current one is missing: rejected per clarification — FR-009 explicitly requires no fallback.

## 4. Component prop design

- **Decision**: Add a single optional prop `specPdfUrl?: string` to `ProductIntroSection.astro`'s existing `ProductInfoProps` type. Render the button only `{specPdfUrl && (...)}`.
- **Rationale**: Matches FR-002/FR-004 (configurable per product, opt-in, no render when absent) and the existing typed-props pattern already used by every prop on this component. Keeps the component presentational per Constitution Principle II — it owns no PDF content, only renders what it's given.
- **Alternatives considered**: A boolean `hasSpecPdf` + separate URL prop — rejected as redundant; presence of the URL string is itself the signal (Constitution Principle V: no validation for scenarios that can't occur).

## 5. Threading the prop from data → page

- **Decision**: Add an optional `specPdfUrl` field directly on the relevant product objects in `src/data/helmet-info.ts`, `helmet-info.th.ts`, `armor-info.ts`, `armor-info.th.ts`, populated independently per file/per language (only for products/languages that actually have a PDF). `HelmetInfo.astro` and `ArmourInfo.astro` pass `specPdfUrl={productInfo.specPdfUrl}` straight through to `ProductIntroSection`, alongside the other pass-through props already there — the same wiring the component already had, unchanged by the language requirement.
- **Rationale**: This is the existing data-ownership pattern in the codebase (Constitution Principle II — page/data files own content, section components stay presentational) and satisfies User Story 3 (reusable, no component code changes needed to add a PDF to a new product — just a data-field addition) and FR-008/FR-009 (per-language independence falls out of the files already being per-language).
- **Note**: `src/pages/products/ballistic-plates/[name].astro` currently defines an inline, unwired product array and never renders an Info component (dead/placeholder code, pre-existing and out of scope for this feature) — no changes made there.

## 6. Button label / i18n

- **Decision**: Hardcode the literal string `"Download Spec"` in `ProductIntroSection.astro`, not routed through `useTranslations`/`t()`.
- **Rationale**: Spec's FR-006 and Assumptions are explicit that the label is fixed in all cases regardless of site language, unlike every other label in this component (which already reads from `t(...)`).
