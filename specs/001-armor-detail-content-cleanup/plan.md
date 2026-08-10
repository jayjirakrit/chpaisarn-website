# Implementation Plan: Armor Product Detail Content Cleanup

**Branch**: `001-armor-detail-content-cleanup` | **Date**: 2026-08-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-armor-detail-content-cleanup/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Remove the dormant `pid-content` markup block from `ProductDetailSection.astro`, then edit the armor product content data (English and Thai) so that specified redundant "Product Highlights" bullets are removed for Soft Armor (Level IIIA), Quick-Release Level III+++, and Ballistic and Fragmentation Armor, and every remaining highlight bullet plus each product's intro description is condensed to a single concise sentence/paragraph. Purely a content and dead-markup edit against the existing Astro data-driven page pattern — no new components, dependencies, or architecture.

## Technical Context

**Language/Version**: TypeScript / Astro 5 (existing project stack, no change)

**Primary Dependencies**: Astro 5, React 19, Tailwind CSS v4 (existing; none added)

**Storage**: N/A — content lives as literal data in `src/data/armor-info.ts` and `src/data/armor-info.th.ts`

**Testing**: None configured for this project (per CLAUDE.md / constitution Development Workflow); validated via `npm run dev` + manual browser check

**Target Platform**: Static site (Astro, deployed to Vercel)

**Project Type**: Web (Astro marketing/product-catalog site) — content + markup edit only

**Performance Goals**: N/A — no runtime behavior change, content-only edit

**Constraints**: Must not change the visible layout/spacing of `ProductDetailSection.astro`; must keep English/Thai content in parity; must not touch the technical specification table or non-armor product pages

**Scale/Scope**: 2 files edited for markup (`ProductDetailSection.astro` dead-block removal) + content edits across 9 armor product entries × 2 locales (`armor-info.ts`, `armor-info.th.ts`) = 3 Soft Armor (Level IIIA) variants, 5 Quick-Release Level III+++ variants, 1 Ballistic and Fragmentation Armor product

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Stack Discipline**: PASS — no new dependency, framework, or DOM-interaction pattern introduced; edits stay within existing Astro/TS files.
- **II. Page → Component Pattern**: PASS — `ProductDetailSection.astro` remains a presentational, props-only component; all content stays owned by the data files consumed by `ArmourInfo.astro`/page components, no content is pushed into the section component.
- **III. Component Authoring Standard**: PASS — the only markup change is deleting an already-disabled block; no new styles, spacing units, or breakpoints are introduced, so no authoring-standard rules are implicated.
- **IV. SEO Consistency**: PASS — no page metadata, breadcrumbs, or JSON-LD are touched; `productDesc`/highlight copy changes do not alter `title`/`description`/`keywords` props.
- **V. Minimalism / No Speculative Work**: PASS — this feature *is* a minimalism cleanup (dead markup removal, redundant content removal, conciseness); no new abstractions added.
- **VI. Git Hygiene**: PASS — no commit authored yet; standing repo policy (no Claude co-author trailer) applies at commit time, not plan time.
- **Spec-Kit Workflow Efficiency**: PASS — this plan and the upcoming tasks.md will stay content-edit-scoped; tasks will be consolidated per data file / per component rather than per bullet or per variant.

No violations — Complexity Tracking table is not needed.

**Post-Phase 1 re-check**: research.md and data-model.md confirmed no new entities, dependencies, or architecture beyond what's listed above (no `contracts/` needed — no external interface exposed). All gates above still PASS unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/001-armor-detail-content-cleanup/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Skipped — no external interface (API/CLI/schema) is exposed;
│                         this feature only edits internal page content and dead markup
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── ProductDetailSection.astro   # remove dormant pid-content markup block
├── data/
│   ├── armor-info.ts                # English armor content (highlights + productDesc edits)
│   └── armor-info.th.ts             # Thai armor content (highlights + productDesc edits)
└── pages/
    ├── products/[name].astro        # renders English armor product pages (no edit needed)
    └── th/products/[name].astro     # renders Thai armor product pages (no edit needed)
```

**Structure Decision**: Existing single-project Astro site structure (Option 1 style, web content site). No new directories — this feature only edits the one section component and the two armor data files listed above; the dynamic `[name].astro` route pages already consume `armor-info.ts`/`armor-info.th.ts` and need no changes.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations — table intentionally omitted.
