# Phase 1 Data Model: Armor Product Detail Content Cleanup

No new data structures are introduced. This documents the existing shape of the content entities this feature edits, sourced from `src/data/armor-info.ts` and `src/data/armor-info.th.ts`.

## Armor Product

Represents one armor product line/variant, rendered by `ProductIntroSection.astro` + `ProductDetailSection.astro` via `ArmourInfo.astro`.

| Field | Type | Notes |
|---|---|---|
| `slug` | string | Route identifier (`/products/{slug}`, `/th/products/{slug}`) |
| `name` / `productName` | string | Display name, e.g. "Ballistic Armor Level IIIA" |
| `productDesc` | string | **In scope** — the "product-intro-desc" paragraph; condensed per FR-007 |
| `pidTitle` / `pidDesc` | string | Feed the now-removed dormant block; left as unused data, not deleted from the data files (no visible effect either way) |
| `specTitle` | string | Heading for the technical specification table — unchanged |
| `tableContent` | `{ label: string; value: string }[]` | Technical specification rows — explicitly out of scope (FR-011) |
| `highlightTitle` | string | "Product Highlights" panel heading — unchanged |
| `highlightItems` | string[] | **In scope** — bullets edited/removed per FR-003–006 |

**Variants in scope** (grouped by product line, per spec):
- Soft Armor (Level IIIA): `iiia-01`, `iiia-02`, `iiia-03`
- Ballistic and Fragmentation Armor: `fragmentation`
- Quick-Release Level III+++: `quick-release-iii-01` … `quick-release-iii-05`

## Product Highlight

A single string entry inside `highlightItems`. No independent identity beyond its position in the array and its text — it is not a separate record in code, but the spec treats each bullet as one claim for acceptance-testing purposes.

**Validation rules** (from spec):
- After edits, each remaining highlight must be a single, concise sentence (FR-006).
- The specific bullets named in FR-003/004/005 must not appear, in either language, for the named product lines.
- Every sibling variant within the same product line must carry identical highlight wording (FR-009) — already structurally guaranteed on the Thai side via `softArmorSpec`/`quickReleaseSpec`; must be manually kept identical across the English per-variant objects.

## Product Introductory Description

The `productDesc` string used both on the intro section and referred to in the spec as "product-intro-desc".

**Validation rules** (from spec):
- Condensed to one short paragraph (FR-007).
- Must retain: protection level, primary material, intended users.
- Shared verbatim across sibling variants today (Quick-Release III+++'s five variants, Fragmentation's single entry, Soft Armor IIIA's three variants) — condensed text must be applied identically to preserve that existing parity.

## Locale Pairing

English (`armor-info.ts`) and Thai (`armor-info.th.ts`) are independent, hand-maintained arrays with matching `slug` values. There is no shared schema/type enforcing parity — parity is a content convention this feature must uphold manually (FR-008).
