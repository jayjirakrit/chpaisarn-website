# Phase 0 Research: Armor Product Detail Content Cleanup

No unknowns remain in the Technical Context — this feature is a content and dead-markup edit inside the existing, already-adopted Astro/TS stack. The items below record the decisions confirmed by reading the current codebase rather than open research questions.

## Decision: Where the dormant block lives and whether it's safe to remove

- **Decision**: Delete the commented-out `<!-- <div class="pid-content">...</div> -->` block (and its now-unused `.pid-content` / `.pid-content-desc` scoped styles) from `src/components/ProductDetailSection.astro`.
- **Rationale**: The block is already disabled (wrapped in an HTML comment) so it renders nothing today. Both consumers of `ProductDetailSection` — `ArmourInfo.astro` and `HelmetInfo.astro` — never pass it visible output; `pidTitle`/`pidDesc` props still exist on the type and are passed through, but only reach dead markup. Removing it is a pure cleanup with zero visual risk.
- **Alternatives considered**: Leaving it commented out (rejected — it's the exact thing the user asked to remove, and dead code doesn't belong per Constitution Principle V, Minimalism).

## Decision: Scope of "product highlight" removals

- **Decision**: Apply the highlight removals from spec FR-003–005 to the `highlightItems` arrays in `src/data/armor-info.ts` (3 Soft Armor IIIA entries, 1 Fragmentation entry, 5 Quick-Release III+++ entries) and their exact-meaning counterparts in `src/data/armor-info.th.ts` (`softArmorSpec.highlightItems`, the Fragmentation entry's inline `highlightItems`, and `quickReleaseSpec.highlightItems`).
- **Rationale**: Confirmed by reading both files — English defines the six armor entries individually; Thai factors Soft Armor and Quick-Release into shared `softArmorSpec`/`quickReleaseSpec` objects spread into each variant, plus one inline Fragmentation entry. Editing the shared Thai objects once automatically keeps all sibling variants in parity (satisfies spec FR-009 for Thai). The English file has no such sharing, so each of the 3 Soft Armor and 5 Quick-Release variants needs the same edit applied individually.
- **Alternatives considered**: Refactoring `armor-info.ts` to share highlight arrays the way the Thai file does (rejected — out of scope per Constitution Principle V; the spec only asks for content changes, not a data-structure refactor, and duplicating edits across 3/5 near-identical objects is a one-time, low-risk mechanical edit).

## Decision: How "concise" is measured for the remaining highlights and intro descriptions

- **Decision**: Treat spec SC-004/SC-005 as a qualitative rewrite target (one short, single-idea sentence per highlight; one short paragraph per intro description), not a hard word-count gate enforced by tooling. Verification is manual: read the rewritten copy on each product's live dev-server page and confirm the original claim is still recognizable and each bullet reads as a single sentence.
- **Rationale**: The project has no lint/test scripts (constitution Development Workflow) and no content-linting tooling exists; adding one would be speculative work forbidden by Principle V. Manual visual/readability review via `npm run dev` is the established verification method for UI/content changes in this repo.
- **Alternatives considered**: Introducing an automated word-count or readability check (rejected — no existing tooling for this, and the constitution explicitly says not to introduce test/lint tooling as a prerequisite unless the user asks).

## Decision: Language parity mechanism

- **Decision**: Every English content change gets a matching Thai edit in the same pass, keeping the two data files as the single source of truth per locale (no shared i18n content layer introduced).
- **Rationale**: This matches the existing pattern in the repo (`armor-info.ts` / `armor-info.th.ts` as separate, hand-maintained parallel files) and avoids introducing new i18n infrastructure for a content-only feature.
- **Alternatives considered**: Building a shared content-key system across locales (rejected — far beyond this feature's scope and against Principle V).
