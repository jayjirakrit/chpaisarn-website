# Implementation Plan: Download Spec PDF Button

**Branch**: `002-download-spec-pdf` | **Date**: 2026-08-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-download-spec-pdf/spec.md`

## Summary

Add an optional "Download Spec" button to the shared `ProductIntroSection.astro` component, positioned above the product title in the product-info column. The button only renders when the *current page's language* has a spec PDF configured for that product — English and Thai are configured independently, with no cross-language fallback (FR-008/FR-009). Because this site already renders English and Thai as separate routes backed by separate per-language data files (`helmet-info.ts` vs `helmet-info.th.ts`, etc.), the component itself only ever needs a single `specPdfUrl` prop for "the PDF for this page's language" — the language split happens at the data layer, not inside the component. PDFs are static files served from `public/specs/`, referenced by URL string — no build-time processing needed and no bytes transferred until the visitor clicks (plain `<a href>` semantics already satisfy the zero-preload requirement, no JS required).

## Technical Context

**Language/Version**: TypeScript (Astro 5.17 project), Astro component syntax (`.astro`)

**Primary Dependencies**: Astro 5, Tailwind CSS v4 (Vite plugin) — no new dependencies required

**Storage**: Static files under `public/specs/` (served verbatim by Astro/Vercel, not run through the `astro:assets` image pipeline)

**Testing**: None configured for this repo (per CLAUDE.md); verified via `npm run dev` + manual browser check per Development Workflow governance

**Target Platform**: Static site, deployed to Vercel

**Project Type**: Single Astro web project (no frontend/backend split)

**Performance Goals**: Zero additional bytes transferred on product-page initial load attributable to the spec PDF (FR-007 / SC-005)

**Constraints**: Must not fetch/preload/embed the PDF before user click; button must not alter layout on pages without a configured PDF (no gap); a page must never link to the *other* language's PDF — if the current page's language has no PDF configured, the button is omitted even when the other language's PDF exists (FR-009, no cross-language fallback)

**Scale/Scope**: One new optional prop on one shared component (`ProductIntroSection.astro`), pass-through in two wrapper components (`HelmetInfo.astro`, `ArmourInfo.astro`), and optional data-field additions in four product data files (`helmet-info.ts`, `helmet-info.th.ts`, `armor-info.ts`, `armor-info.th.ts`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Stack Discipline | PASS | Plain Astro markup + a native `<a href download>` anchor; no React, no jQuery, no new dependency. |
| II. Page → Component Pattern | PASS | `ProductIntroSection.astro` stays presentational (single `specPdfUrl` prop, language-agnostic); PDF URLs are owned as data, one field per language-specific data file (`helmet-info.ts` vs `helmet-info.th.ts`, etc.), so the EN/TH split is a data-ownership concern, never logic inside the shared component. |
| III. Component Authoring Standard | PASS (to verify at implementation) | New button markup gets a kebab-case block-scoped class, lives in `ProductIntroSection.astro`'s existing scoped `<style>` block, uses `rem` units and brand CSS variables, authored mobile-first. |
| IV. SEO Consistency | N/A | No new page, no metadata/breadcrumb changes. |
| V. Minimalism / No Speculative Work | PASS | Single optional `string` prop; no multi-PDF, no per-size variants, no feature flag — matches spec's Assumptions. |
| VI. Git Hygiene | PASS | No process change; standard commit rules apply at implementation time. |
| Spec-Kit Workflow Efficiency | PASS | This plan avoids restating CLAUDE.md architecture; tasks (in a later phase) will be consolidated per component/data file. |

No violations. Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-download-spec-pdf/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
└── contracts/
    └── product-intro-section.md   # Phase 1 output — component prop contract
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ProductIntroSection.astro   # MODIFY: add optional specPdfUrl prop + conditional button
│   ├── HelmetInfo.astro            # MODIFY: pass specPdfUrl={productInfo.specPdfUrl} through
│   └── ArmourInfo.astro            # MODIFY: pass specPdfUrl={productInfo.specPdfUrl} through
├── data/
│   ├── helmet-info.ts              # MODIFY: add optional specPdfUrl per product entry
│   ├── helmet-info.th.ts           # MODIFY: same, Thai variant
│   ├── armor-info.ts               # MODIFY: same
│   └── armor-info.th.ts            # MODIFY: same

public/
└── specs/
    ├── helmets/                    # NEW: helmet spec PDFs, one file per language per product
    │   ├── fast-helmet-en.pdf      #   e.g. referenced only from helmet-info.ts
    │   └── fast-helmet-th.pdf      #   e.g. referenced only from helmet-info.th.ts
    └── armor/                      # NEW: armor spec PDFs, same per-language convention
```

**Structure Decision**: Single Astro project — no frontend/backend split applies. Changes are confined to one reusable section component, its two page-level wrappers, and the plain-data files that already own per-product content, following the existing Page → Component Pattern (Constitution Principle II). PDFs live under `public/` (served as-is, unhashed, stable URLs) rather than `src/assets` because `astro:assets`/the `Image` component pipeline is for optimizable image formats, not arbitrary downloadable binaries — `public/` is the project's existing convention for direct-link static files (favicon, logo, navbar images).

## Complexity Tracking

*No violations — table not needed.*
