---

description: "Task list template for feature implementation"
---

# Tasks: Armor Product Detail Content Cleanup

**Input**: Design documents from `/specs/001-armor-detail-content-cleanup/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (no contracts/ — no external interface for this content-only feature)

**Tests**: Not requested — this project has no configured lint/test scripts (constitution Development Workflow); verification is manual via `npm run dev` per quickstart.md.

**Organization**: Tasks are grouped by user story (product line) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

Single-project Astro site. Files touched: `src/components/ProductDetailSection.astro`, `src/data/armor-info.ts`, `src/data/armor-info.th.ts` (see plan.md Project Structure).

---

## Phase 1: Setup

**Purpose**: Remove the dormant duplicate-content markup so the layout is clean before any content edits begin. Independent of every user story below — safe to do first.

- [X] T001 Remove the disabled `pid-content` block (the commented-out title/description `<div>`) and its now-unused `.pid-content` / `.pid-content-desc` scoped styles from `src/components/ProductDetailSection.astro`; leave `.pid-spec` and `.pid-highlight` markup/styles untouched (spec FR-001, FR-002)

**Checkpoint**: No visible change on any product page (block was already hidden); layout of "Technical Specifications" and "Product Highlights" panels unaffected.

---

## Phase 2: Foundational

No blocking prerequisites exist beyond Phase 1 — each user story below edits an independent slice of `src/data/armor-info.ts` / `src/data/armor-info.th.ts` and can start immediately after Setup.

---

## Phase 3: User Story 1 - Streamlined highlights for Soft Armor (Level IIIA) pages (Priority: P1) 🎯 MVP

**Goal**: Remove the three redundant highlight bullets (fastening system, BFS measurement, generic audience line) from every Soft Armor (Level IIIA) product variant, in both languages.

**Independent Test**: Visit `/products/iiia-01`, `/iiia-02`, `/iiia-03` and their `/th/products/...` equivalents; confirm the three specified highlight lines are gone and the remaining highlights still render.

### Implementation for User Story 1

- [X] T002 [P] [US1] In `src/data/armor-info.ts`, remove the "Hook-and-loop fastening system...", "Backface Signature (BFS) less than 44 mm...", and "Designed for military, law enforcement, and private security applications." lines from `highlightItems` on the `iiia-01`, `iiia-02`, and `iiia-03` entries
- [X] T003 [P] [US1] In `src/data/armor-info.th.ts`, remove the equivalent three Thai highlight lines from `softArmorSpec.highlightItems` (applies to all three Soft Armor IIIA variants via the shared spread)

**Checkpoint**: Soft Armor (Level IIIA) highlights are streamlined in both languages; deliverable as a standalone increment.

---

## Phase 4: User Story 2 - Streamlined highlights for Quick-Release Level III+++ pages (Priority: P1)

**Goal**: Remove the two redundant highlight bullets (ergonomic shoulder/waist straps, single-curved SAPI plate design) from every Quick-Release Level III+++ product variant, in both languages.

**Independent Test**: Visit `/products/quick-release-iii-01` through `-05` and their `/th/products/...` equivalents; confirm the two specified highlight lines are gone and the remaining highlights still render.

### Implementation for User Story 2

- [X] T004 [P] [US2] In `src/data/armor-info.ts`, remove the "Ergonomic Adjustable Design: Fully adjustable shoulder and waist straps..." and "Single-Curved SAPI Plate Design..." lines from `highlightItems` on the `quick-release-iii-01` through `quick-release-iii-05` entries
- [X] T005 [P] [US2] In `src/data/armor-info.th.ts`, remove the equivalent two Thai highlight lines from `quickReleaseSpec.highlightItems` (applies to all five Quick-Release III+++ variants via the shared spread)

**Checkpoint**: Both P1 stories (Soft Armor IIIA, Quick-Release III+++) are complete and independently verifiable — full P1 scope delivered.

---

## Phase 5: User Story 3 - Streamlined highlights for Ballistic and Fragmentation Armor page (Priority: P2)

**Goal**: Remove the two redundant highlight bullets (ergonomic shoulder/waist system, generic audience line) from the Ballistic and Fragmentation Armor product, in both languages.

**Independent Test**: Visit `/products/fragmentation` and `/th/products/fragmentation`; confirm the two specified highlight lines are gone and the remaining highlights still render.

### Implementation for User Story 3

- [X] T006 [P] [US3] In `src/data/armor-info.ts`, remove the "Ergonomic Adjustable Design: Fully adjustable shoulder and waist system..." and "Designed for military, law enforcement, special operations, and high-risk security applications." lines from `highlightItems` on the `fragmentation` entry
- [X] T007 [P] [US3] In `src/data/armor-info.th.ts`, remove the equivalent two Thai highlight lines from the `fragmentation` entry's `highlightItems`

**Checkpoint**: All three redundant-highlight-removal stories (US1–US3) are complete in both languages.

---

## Phase 6: User Story 4 - Concise highlights and intro description across all armor products (Priority: P2)

**Goal**: Rewrite every remaining "Product Highlights" bullet and each product's `productDesc` intro paragraph, across all armor products, into shorter single-idea sentences/paragraphs that preserve the original claims — in both languages.

**Independent Test**: Visit every armor product page (all 9 slugs, both languages) and confirm each remaining highlight bullet is one concise sentence and the intro paragraph is a single short paragraph, per quickstart.md scenario 5.

**Depends on**: US1, US2, US3 (the redundant lines must already be removed before condensing what remains, so the same arrays aren't edited twice for overlapping content)

### Implementation for User Story 4

- [X] T008 [US4] In `src/data/armor-info.ts`, condense the remaining `highlightItems` entries and the `productDesc` paragraph for all armor products (`iiia-01/02/03`, `fragmentation`, `quick-release-iii-01..05`) into shorter single-sentence bullets / a single concise paragraph, preserving each original claim (depends on T002, T004, T006)
- [X] T009 [US4] In `src/data/armor-info.th.ts`, condense the remaining `highlightItems` entries (in `softArmorSpec`, `quickReleaseSpec`, and the `fragmentation` entry) and every `productDesc` paragraph to match the condensed English meaning (depends on T003, T005, T007)

**Checkpoint**: All armor product pages show streamlined, concise highlights and intro descriptions in both languages — full feature scope delivered.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T010 Run the `quickstart.md` validation scenarios via `npm run dev`, checking every affected `/products/{slug}` and `/th/products/{slug}` page plus one out-of-scope helmet/plate page for regressions (spec SC-001–SC-006)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Empty — no blocking prerequisites beyond Setup
- **User Stories 1–3 (Phases 3–5)**: Each depends only on Setup; independent of each other (different array entries, though sharing the same two files)
- **User Story 4 (Phase 6)**: Depends on User Stories 1, 2, and 3 being complete (condenses what US1–3 leave behind)
- **Polish (Phase 7)**: Depends on all user stories being complete

### Within Each Phase

- T002/T003, T004/T005, T006/T007, and T008/T009 are each an EN/TH pair touching two different files — safe to parallelize within the pair
- Do not run tasks from different user story phases concurrently against the same file (e.g., T002 and T004 both edit `src/data/armor-info.ts`) — complete each story phase before starting the next to avoid edit conflicts

### Parallel Opportunities

- T002 and T003 (US1) — different files
- T004 and T005 (US2) — different files
- T006 and T007 (US3) — different files
- T008 and T009 (US4) — different files

---

## Parallel Example: User Story 1

```bash
# Launch both locale edits for User Story 1 together (different files):
Task: "Remove specified highlight lines from iiia-01/02/03 in src/data/armor-info.ts"
Task: "Remove specified highlight lines from softArmorSpec.highlightItems in src/data/armor-info.th.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (remove dormant markup)
2. Complete Phase 3: User Story 1 (Soft Armor Level IIIA highlight cleanup)
3. **STOP and VALIDATE**: Check `/products/iiia-01` (and siblings, EN+TH) per quickstart.md scenario 2
4. This alone ships a smaller, complete content fix

### Incremental Delivery

1. Setup → Phase 1 done
2. Add User Story 1 → validate → smallest complete increment
3. Add User Story 2 → validate → both P1 stories done (full P1 scope)
4. Add User Story 3 → validate → all redundant-highlight removals done
5. Add User Story 4 → validate → full feature (concise copy everywhere) complete
6. Polish (Phase 7) → run full quickstart.md pass

---

## Notes

- [P] tasks touch different files (English vs. Thai data file) with no dependency between them
- [Story] label maps each task to its spec.md user story for traceability
- No tests are generated — none were requested and the project has no test framework (constitution Development Workflow)
- Commit after each phase/checkpoint, not after every individual task, consistent with this being a small content-edit feature
