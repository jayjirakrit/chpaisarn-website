# Phase 1 Data Model: Download Spec PDF Button

## Entity: Product (extended)

The existing per-product data objects in `src/data/helmet-info.ts`, `helmet-info.th.ts`, `armor-info.ts`, and `armor-info.th.ts` gain one new optional field each. No new entity/collection is introduced — "Product Spec Document" (per spec.md's Key Entities) is modeled as a single optional field on the existing Product record, repeated independently in each language's data file, matching the spec's Assumption that a product has at most one spec PDF *per language* (up to two total: EN and TH).

| Field | Type | Required | Notes |
|---|---|---|---|
| `specPdfUrl` | `string` | No (optional) | Absolute site-root path to a static PDF under `public/specs/...` for **this file's language only** (e.g. `/specs/helmets/fast-helmet-en.pdf` in `helmet-info.ts`, `/specs/helmets/fast-helmet-th.pdf` in `helmet-info.th.ts`). Omitted or `undefined` → no "Download Spec" button renders for that product on that language's page (FR-002/FR-009, User Story 2). |

Because English and Thai product entries already live in separate files (`helmet-info.ts` vs `helmet-info.th.ts`, `armor-info.ts` vs `armor-info.th.ts`), the same product's two `specPdfUrl` values are two independent fields in two independent files — there is no shared object or cross-reference between them, and setting one has no effect on the other (FR-008: independent per language; FR-009: no cross-language fallback).

All other existing fields (`slug`, `name`, `productName`, `productsImg`, `level`, `colors`, `sizes`, `productDesc`, `pidTitle`, `pidDesc`, `specTitle`, `tableContent`, `highlightTitle`, `highlightItems`) are unchanged.

### Validation rules

- No runtime validation is added. `specPdfUrl` is a plain author-supplied string; presence/absence (per file/per language) is the only signal used (Constitution Principle V — no defensive checks for scenarios that can't occur, e.g. malformed paths, since these are static, build-time-authored assets under developer control, not user input).
- The referenced PDF file MUST exist at build time under `public/specs/...` for the link to resolve; this is a content/authoring responsibility (documented in quickstart.md), not enforced in code.
- The EN and TH `specPdfUrl` values for the same product (same `slug`) are never validated against each other — a maintainer may legitimately populate one language and leave the other unset for an arbitrary period (e.g. translation in progress), and this is expected, not an error state.

### State transitions

None — `specPdfUrl` is static, build-time content. It does not change at runtime.
