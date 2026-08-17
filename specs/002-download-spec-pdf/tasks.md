---

description: "Task list for Download Spec PDF Button"
---

# Tasks: Download Spec PDF Button

**Input**: Design documents from `/specs/002-download-spec-pdf/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/product-intro-section.md, quickstart.md

**Tests**: Not included — no test framework is configured for this repo (per CLAUDE.md/constitution Development Workflow); correctness is verified manually via `npm run dev` and the scenarios in `quickstart.md`.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every task description

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: The shared component change every user story depends on. Nothing below is a separate "Setup" phase — this feature adds no new dependency or scaffolding, just one prop on one existing component and its two pass-through wiring points.

**⚠️ CRITICAL**: No user story can be demonstrated until this phase is complete.

- [X] T001 Add an optional `specPdfUrl?: string` prop to `ProductInfoProps` in `src/components/ProductIntroSection.astro`, and render a "Download Spec" `<a href={specPdfUrl} download target="_blank" rel="noopener">` link above `productName` only when `specPdfUrl` is truthy (no button, no gap, when absent — FR-002/FR-009). Style it in the component's existing scoped `<style>` block: kebab-case block class, `rem` units, brand CSS variables, mobile-first with `min-width` breakpoints at 768px/1024px, per the Component Authoring Standard.
- [X] T002 [P] Pass `specPdfUrl={productInfo.specPdfUrl}` through to `<ProductIntroSection>` in `src/components/HelmetInfo.astro` (depends on T001)
- [X] T003 [P] Pass `specPdfUrl={productInfo.specPdfUrl}` through to `<ProductIntroSection>` in `src/components/ArmourInfo.astro` (depends on T001)

**Checkpoint**: The button code path exists and is wired end-to-end, but no product has PDF data yet — every page still renders exactly as before.

---

## Phase 2: User Story 1 - Download a product's spec sheet (Priority: P1) 🎯 MVP

**Goal**: A visitor on a configured product page can click "Download Spec" and get the correct, language-matched PDF, with zero bytes transferred before the click.

**Independent Test**: Visit a helmet product page with a PDF configured, confirm the button appears above the title, confirm DevTools shows no PDF request until click, then click and confirm the correct PDF downloads.

- [X] T004 [US1] Add `specPdfUrl: "/specs/helmets/fast-helmet-en.pdf"` to the `"fast"` product entry in `src/data/helmet-info.ts`, and add the matching PDF file at `public/specs/helmets/fast-helmet-en.pdf`
- [X] T005 [US1] Add `specPdfUrl: "/specs/helmets/fast-helmet-th.pdf"` to the `"fast"` product entry in `src/data/helmet-info.th.ts`, and add the matching PDF file at `public/specs/helmets/fast-helmet-th.pdf` — confirms FR-008 (independent per-language config) and, per `quickstart.md` section 4a, that the Thai page was correctly showing no button before this task and downloads the Thai file (not the English one) after it (depends on T004 for the paired before/after comparison)

**Checkpoint**: User Story 1 is fully functional and independently testable in both English and Thai for the `"fast"` helmet.

---

## Phase 3: User Story 2 - Button hidden when no spec PDF exists (Priority: P2)

**Goal**: Product pages without a configured spec PDF render exactly as before — no dead button, no layout gap.

**Independent Test**: Visit a helmet product page whose entry has no `specPdfUrl` (e.g. `"ballistic-i"`) and confirm no button renders and no gap is left.

- [X] T006 [US2] Verify per `specs/002-download-spec-pdf/quickstart.md` section 4 that a helmet product left without `specPdfUrl` in `src/data/helmet-info.ts` (e.g. `"ballistic-i"`) renders with no "Download Spec" button and no layout gap; no code or data change expected — this confirms T001's conditional render already satisfies FR-002 by construction

**Checkpoint**: User Stories 1 AND 2 both verified working independently.

---

## Phase 4: User Story 3 - Reusable across product pages (Priority: P3)

**Goal**: A different product line (ballistic plates/armor) gets the same button by supplying data only — no component code changes.

**Independent Test**: Add `specPdfUrl` to an armor product and confirm the button appears on that armor page, with zero edits to `ProductIntroSection.astro`, `HelmetInfo.astro`, or `ArmourInfo.astro`.

- [X] T007 [P] [US3] Add `specPdfUrl: "/specs/armor/iiia-01-en.pdf"` to the `"iiia-01"` product entry in `src/data/armor-info.ts`, and add the matching PDF file at `public/specs/armor/iiia-01-en.pdf`

**Checkpoint**: All three user stories independently functional; feature proven reusable across product lines.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation spanning all stories.

- [X] T008 Run the remaining `specs/002-download-spec-pdf/quickstart.md` checks: mobile-viewport button placement (section 6) and a production build/preview sanity check via `npm run build` && `npm run preview` confirming the PDFs are present under `dist/specs/...` and resolve correctly (section 7)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies — start immediately. BLOCKS all user stories.
- **User Story 1 (Phase 2)**: Depends on Phase 1 only.
- **User Story 2 (Phase 3)**: Depends on Phase 1 only — independent of Phase 2 (can run in parallel with it).
- **User Story 3 (Phase 4)**: Depends on Phase 1 only — independent of Phases 2 and 3 (different data file).
- **Polish (Phase 5)**: Depends on at least Phase 2 (needs a real configured PDF to validate against); best run after Phases 2–4.

### Within Phase 1

- T001 before T002 and T003 (both need the prop to exist on `ProductIntroSection.astro` first).
- T002 and T003 touch different files — safe to run in parallel.

### Within Phase 2

- T004 before T005 (T005's verification narrative compares against T004's already-added English entry for the same product).

---

## Parallel Example: Phase 1 (Foundational)

```bash
# After T001 completes, launch the two pass-through wiring tasks together:
Task: "Pass specPdfUrl={productInfo.specPdfUrl} through in src/components/HelmetInfo.astro"
Task: "Pass specPdfUrl={productInfo.specPdfUrl} through in src/components/ArmourInfo.astro"
```

## Parallel Example: Cross-Story

```bash
# Once Phase 1 is complete, these can run in parallel (different files, independent stories):
Task: "T006 — verify button-hidden behavior (US2, no file changes)"
Task: "T007 — add armor product spec PDF data (US3, src/data/armor-info.ts)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundational.
2. Complete Phase 2: User Story 1 (English + Thai for one helmet product).
3. **STOP and VALIDATE**: Confirm the button appears, downloads on click with zero preload bytes, and respects the per-language no-fallback rule.
4. Deploy/demo if ready — this alone delivers the feature's core value.

### Incremental Delivery

1. Phase 1 (Foundational) → foundation ready, no visible change yet.
2. Phase 2 (US1) → MVP: one helmet product downloadable in both languages.
3. Phase 3 (US2) → confirms the rest of the catalog stays clean (no code change, just verification).
4. Phase 4 (US3) → extend to a second product line (armor) purely via data.
5. Phase 5 (Polish) → mobile + production-build sanity pass.

---

## Notes

- No test tasks are included — this repo has no configured test framework (constitution Development Workflow); verification is manual via `quickstart.md`.
- [P] tasks touch different files and have no unmet dependencies.
- Content-authoring tasks (T004, T005, T007) intentionally bundle "add the data field" + "add the matching PDF file" into one task each, per the constitution's Spec-Kit Workflow Efficiency principle (minimize task count; one task per file/product, not per sub-step).
- Commit after each task or logical group, per repository git hygiene norms (no Claude co-author trailer).
