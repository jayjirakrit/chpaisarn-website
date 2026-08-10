# Quickstart: Validating the Armor Product Detail Content Cleanup

## Prerequisites

- Dependencies installed (`npm install`, if not already).
- No build/test tooling is required beyond the dev server — this project has no configured lint/test scripts (see plan.md Technical Context).

## Run

```bash
npm run dev
```

Site serves at `http://localhost:4321`.

## Validation scenarios

For each scenario, confirm against the acceptance criteria in [spec.md](./spec.md) (User Stories 1–4) and the entity rules in [data-model.md](./data-model.md).

### 1. Dead markup removed, no layout regression (spec FR-001/002, SC-006)

- Visit any armor product page, e.g. `http://localhost:4321/products/iiia-01`, and any helmet product page.
- Confirm the "Technical Specifications" and "Product Highlights" panels render with unchanged spacing/layout compared to before the change (the removed block was already invisible, so nothing should visibly move).

### 2. Soft Armor (Level IIIA) highlights (spec User Story 1 / FR-003, SC-001)

- Visit `http://localhost:4321/products/iiia-01`, `.../iiia-02`, `.../iiia-03` and their Thai equivalents `http://localhost:4321/th/products/iiia-01` (etc.).
- Confirm the "Product Highlights" panel does **not** contain: the hook-and-loop fastening line, the BFS < 44 mm line, or the "designed for military, law enforcement, and private security applications" line (or their Thai equivalents).

### 3. Quick-Release Level III+++ highlights (spec User Story 2 / FR-004, SC-002)

- Visit `http://localhost:4321/products/quick-release-iii-01` through `...-05`, and the matching `/th/products/...` pages.
- Confirm the panel does **not** contain: the "Ergonomic Adjustable Design" shoulder/waist strap line, or the "Single-Curved SAPI Plate Design" line.

### 4. Ballistic and Fragmentation Armor highlights (spec User Story 3 / FR-005, SC-003)

- Visit `http://localhost:4321/products/fragmentation` and `http://localhost:4321/th/products/fragmentation`.
- Confirm the panel does **not** contain: the "Ergonomic Adjustable Design" shoulder/waist system line, or the "designed for military, law enforcement, special operations, and high-risk security applications" line.

### 5. Concise remaining highlights + intro description (spec User Story 4 / FR-006/007, SC-004/005)

- On every page visited above, read the remaining highlight bullets and the intro paragraph near the top.
- Confirm each remaining bullet is one short, single-idea sentence that still conveys its original claim, and the intro paragraph is a single short paragraph that still states protection level, primary material, and intended users.
- Repeat the check on the Thai versions for meaning parity, not verbatim translation.

### 6. Out-of-scope content untouched (spec FR-010/011)

- Spot-check a ballistic helmet page (`/products/ballistic-helmets/...`) and a ballistic plate page (`/products/ballistic-plates/...`) to confirm their highlights/descriptions are unchanged.
- On any edited armor page, confirm the "Technical Specifications" table values are identical to before the change.

## Expected outcome

All six scenarios pass with no console errors and no visual regression in `npm run dev`. No automated test suite exists for this project, so this manual pass is the full acceptance check (per constitution Development Workflow).
