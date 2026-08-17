# Quickstart: Validating the Download Spec PDF Button

## Prerequisites

- Node deps installed (`npm install`)
- A sample PDF file to use as a test spec sheet

## 1. Add a spec PDF to a product

1. Place a PDF at `public/specs/helmets/<slug>-en.pdf` (create the `public/specs/helmets/` folder if it doesn't exist).
2. In `src/data/helmet-info.ts` (English data), add `specPdfUrl: "/specs/helmets/<slug>-en.pdf"` to one product object (e.g. the `"fast"` slug entry).
3. Leave at least one other product's entry without `specPdfUrl` (to validate User Story 2).
4. Deliberately do **not** add `specPdfUrl` for that same `"fast"` slug in `src/data/helmet-info.th.ts` yet — this sets up the per-language check in step 4a below.

## 2. Run the dev server

```bash
npm run dev
```

## 3. Validate User Story 1 — button appears and downloads

- Visit `http://localhost:4321/products/ballistic-helmets/fast` (or whichever slug you edited).
- Confirm a **"Download Spec"** button/link is visible above the product title, at the top of the product-info column.
- Open browser DevTools → Network tab, reload the page, confirm no request for the PDF file appears in the initial load.
- Click "Download Spec" — confirm the PDF now appears in the Network tab (fetched only now) and downloads/opens.

## 4. Validate User Story 2 — button hidden when no PDF

- Visit a helmet slug you did **not** add `specPdfUrl` to (in either language file).
- Confirm no "Download Spec" button renders, and there is no empty gap/spacing where it would have been.

### 4a. Validate FR-008/FR-009 — per-language independence, no cross-language fallback

- Visit the Thai route for the `"fast"` slug you edited in step 1 (`/th/products/ballistic-helmets/fast`) — since `helmet-info.th.ts` was deliberately left without `specPdfUrl` for this slug, confirm **no** "Download Spec" button renders here, even though the English page for the same product has one.
- Now add `specPdfUrl: "/specs/helmets/fast-helmet-th.pdf"` to the same `"fast"` entry in `helmet-info.th.ts`, and place a (possibly different) PDF at `public/specs/helmets/fast-helmet-th.pdf`.
- Reload the Thai page — confirm the button now appears and downloads the **Thai** PDF (`fast-helmet-th.pdf`), not the English one.

## 5. Validate User Story 3 — reusable across product types

- Repeat step 1 for an entry in `src/data/armor-info.ts` (e.g. add `specPdfUrl: "/specs/armor/<slug>-en.pdf"` and drop a matching PDF under `public/specs/armor/`).
- Visit the corresponding `/products/<slug>` armor page and confirm the button appears there too, with zero changes made to `ProductIntroSection.astro`, `HelmetInfo.astro`, or `ArmourInfo.astro`.

## 6. Validate mobile

- Resize the browser to a mobile viewport (or use device emulation) — confirm the button remains visible/usable above the title.

## 7. Production build sanity check

```bash
npm run build
npm run preview
```

- Confirm the PDF is present under `dist/specs/...` after build and the button still resolves correctly against the preview server.
