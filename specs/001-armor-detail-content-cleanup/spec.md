# Feature Specification: Armor Product Detail Content Cleanup

**Feature Branch**: `001-armor-detail-content-cleanup`

**Created**: 2026-08-09

**Status**: Draft

**Input**: User description: "I want to update product detail page [src\components\ProductDetailSection.astro] remove pid-content class element; for all Ballistic Armor Level IIIA (Soft Armor, update content by remove Hook-and-loop fastening system for quick, secure, and convenient donning and doffing. Backface Signature (BFS) less than 44 mm in accordance with NIJ testing requirements. Designed for military, law enforcement, and private security applications. from highlight; for all Quick-Release Ballistic Level III+++, remove product highligh Ergonomic Adjustable Design: Fully adjustable shoulder and waist straps provide balanced weight distribution and long-duration wearing comfort. Single-Curved SAPI Plate Design: Improves ergonomics and comfort while maintaining optimal ballistic coverage. For product Ballistic and Fragmentation Armor, remove product highlight content Ergonomic Adjustable Design: Fully adjustable shoulder and waist system ensures optimal fit, balanced weight distribution, and enhanced comfort during extended missions. Designed for military, law enforcement, special operations, and high-risk security applications. Furthermore, summarize and concise all product highlight content of armor and product-intro-desc."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Streamlined highlights for Soft Armor (Level IIIA) pages (Priority: P1)

A visitor browsing any Ballistic Armor Level IIIA (Soft Armor) product page reads the "Product Highlights" panel and sees only the highlights that are distinct and non-redundant with the technical specification table — the fastening-system claim, the BFS measurement claim, and the generic "designed for military/law enforcement/private security" claim are no longer repeated there.

**Why this priority**: This is the largest content block affected (3 product variants) and directly reduces redundancy between the highlights panel and the specification table sitting right next to it.

**Independent Test**: Open each Soft Armor (Level IIIA) product detail page and confirm the three specified highlight lines are absent while the remaining highlight lines still render correctly, in both English and Thai.

**Acceptance Scenarios**:

1. **Given** a visitor is on a Ballistic Armor Level IIIA product detail page, **When** the page renders, **Then** the "Product Highlights" panel does not contain a line about the hook-and-loop fastening system, a line about the Backface Signature (BFS) measurement, or a line about being designed for military/law enforcement/private security applications.
2. **Given** the same page in the Thai locale, **When** the page renders, **Then** the equivalent three Thai highlight lines are also absent.

---

### User Story 2 - Streamlined highlights for Quick-Release Level III+++ pages (Priority: P1)

A visitor browsing any Quick-Release Ballistic Level III+++ product page reads the "Product Highlights" panel and no longer sees the ergonomic shoulder/waist strap claim or the single-curved SAPI plate design claim, both of which duplicate detail already present in the specification table.

**Why this priority**: Second-largest content block affected (5 product variants); removes highlight duplication with the specification table's "ADJUSTMENT" and "PLATE CURVATURE" rows.

**Independent Test**: Open each Quick-Release Ballistic Level III+++ product detail page and confirm the two specified highlight lines are absent while the remaining highlight lines still render correctly, in both English and Thai.

**Acceptance Scenarios**:

1. **Given** a visitor is on a Quick-Release Ballistic Level III+++ product detail page, **When** the page renders, **Then** the "Product Highlights" panel does not contain the ergonomic adjustable shoulder/waist strap line or the single-curved SAPI plate design line.
2. **Given** the same page in the Thai locale, **When** the page renders, **Then** the equivalent two Thai highlight lines are also absent.

---

### User Story 3 - Streamlined highlights for Ballistic and Fragmentation Armor page (Priority: P2)

A visitor browsing the Ballistic and Fragmentation Armor product page reads the "Product Highlights" panel and no longer sees the ergonomic shoulder/waist system claim or the generic "designed for military, law enforcement, special operations, and high-risk security" claim.

**Why this priority**: Single product line affected; still valuable for consistency with the other two cleaned-up product lines.

**Independent Test**: Open the Ballistic and Fragmentation Armor product detail page and confirm the two specified highlight lines are absent while the remaining highlight lines still render correctly, in both English and Thai.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Ballistic and Fragmentation Armor product detail page, **When** the page renders, **Then** the "Product Highlights" panel does not contain the ergonomic adjustable shoulder/waist system line or the "designed for military, law enforcement, special operations, and high-risk security applications" line.
2. **Given** the same page in the Thai locale, **When** the page renders, **Then** the equivalent two Thai highlight lines are also absent.

---

### User Story 4 - Concise highlights and intro description across all armor products (Priority: P2)

A visitor scanning any armor product detail page can read the remaining "Product Highlights" bullets and the introductory product description quickly, because each has been tightened to a short, single-idea sentence instead of a long compound sentence, without losing the core protective claim being made.

**Why this priority**: Applies across every armor product page and improves overall scannability, but depends on User Stories 1-3 having already removed the redundant lines first.

**Independent Test**: Open each armor product detail page and confirm every remaining highlight bullet and the intro description paragraph read as short, single-idea sentences that preserve the original claim's meaning, in both English and Thai.

**Acceptance Scenarios**:

1. **Given** a visitor is on any armor product detail page, **When** they read the "Product Highlights" panel, **Then** each remaining bullet is a single concise sentence with no redundant qualifiers, and still communicates the same core claim as before.
2. **Given** a visitor is on any armor product detail page, **When** they read the introductory product description near the top of the page, **Then** it is a shorter, single concise paragraph that still communicates protection level, primary material, and intended users.
3. **Given** the same pages in the Thai locale, **When** rendered, **Then** the Thai highlights and intro description are equally concise and consistent in meaning with the English content.

### Edge Cases

- What happens to product variants that already have very few highlight items after the specified lines are removed (e.g., a variant left with only 3 highlights)? The remaining highlights must still form a complete, coherent list — no placeholder or empty bullets are shown.
- How does the page look now that the previously-hidden duplicate content block is fully removed from the layout? Spacing and structure of the surrounding "Technical Specifications" and "Product Highlights" panels must be unaffected, since that block was already not visibly rendered.
- What happens on product lines where several variants currently share identical highlight/description text (e.g., all Quick-Release III+++ variants)? Every affected variant must be updated consistently so no variant is left with stale, longer, or contradictory wording compared to its siblings.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product detail page layout MUST no longer include the dormant duplicate content block (the previously disabled title/description block that repeated content already shown in the product introduction area).
- **FR-002**: Removing that dormant block MUST NOT change the visible layout, spacing, or content of the "Technical Specifications" or "Product Highlights" panels on any product detail page.
- **FR-003**: On every Ballistic Armor Level IIIA (Soft Armor) product page, the "Product Highlights" panel MUST NOT include: a hook-and-loop fastening system highlight, a Backface Signature (BFS) less-than-44mm highlight, or a "designed for military, law enforcement, and private security applications" highlight.
- **FR-004**: On every Quick-Release Ballistic Level III+++ product page, the "Product Highlights" panel MUST NOT include: an "Ergonomic Adjustable Design" highlight about shoulder/waist straps, or a "Single-Curved SAPI Plate Design" highlight.
- **FR-005**: On the Ballistic and Fragmentation Armor product page, the "Product Highlights" panel MUST NOT include: an "Ergonomic Adjustable Design" highlight about the shoulder/waist system, or a "designed for military, law enforcement, special operations, and high-risk security applications" highlight.
- **FR-006**: Every remaining "Product Highlights" bullet across all armor product pages MUST be rewritten as a single concise sentence that preserves the original claim's core meaning while removing redundant or repetitive qualifiers.
- **FR-007**: The introductory product description shown near the top of every armor product page MUST be condensed into a shorter, single concise paragraph that still conveys protection level, primary material, and intended users.
- **FR-008**: All content changes (removed highlights, condensed highlights, condensed intro description) MUST be applied consistently to both the English and Thai versions of every affected armor product page, preserving equivalent meaning between the two languages.
- **FR-009**: Product lines with multiple variants sharing the same highlight/description text (Soft Armor Level IIIA; Quick-Release Level III+++) MUST have every variant updated identically, so no variant is left with outdated or inconsistent wording.
- **FR-010**: Content outside the armor product lines (e.g., ballistic helmet or ballistic plate product pages) is out of scope and MUST remain unchanged.
- **FR-011**: The "Technical Specifications" table content on every armor product page MUST remain unchanged — only the highlights panel and the introductory description are affected.

### Key Entities

- **Armor Product**: A single armor product line shown on the site (e.g., Ballistic Armor Level IIIA, Ballistic and Fragmentation Armor, Quick-Release Ballistic Level III+++). Has one or more variants, an introductory description, a technical specification table, and a list of highlight statements. Exists in both English and Thai.
- **Product Highlight**: One bullet statement in a product's "Product Highlights" panel, making a single protective/design/usage claim about the product.
- **Product Introductory Description**: The short paragraph describing a product near the top of its detail page, summarizing protection level, material, and intended users.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Ballistic Armor Level IIIA (Soft Armor) product pages, in both languages, no longer display the three specified highlight claims (fastening system, BFS measurement, generic audience line).
- **SC-002**: 100% of Quick-Release Ballistic Level III+++ product pages, in both languages, no longer display the two specified highlight claims (ergonomic shoulder/waist straps, single-curved SAPI plate design).
- **SC-003**: 100% of the Ballistic and Fragmentation Armor product page, in both languages, no longer displays the two specified highlight claims (ergonomic shoulder/waist system, generic audience line).
- **SC-004**: Every remaining highlight bullet across all armor product pages is reduced to one concise sentence, with an average word count at least 25% shorter than the corresponding original bullet, while a reader can still identify the same core claim being made.
- **SC-005**: Every armor product's introductory description is a single paragraph that a visitor can read in under 10 seconds, while still stating the product's protection level, primary material, and intended users.
- **SC-006**: No visual layout regression (spacing, alignment, or missing content) is observable on any armor or helmet product detail page after the dormant duplicate content block is removed.

## Assumptions

- Only armor product pages (Ballistic Armor Level IIIA, Ballistic and Fragmentation Armor, Quick-Release Ballistic Level III+++) are in scope; ballistic helmet and ballistic plate product content is unaffected by this change.
- The dormant duplicate content block is safe to remove outright because it is not currently rendered/visible on any live page, so removal carries no visible-content risk — only a structural cleanup.
- "Summarize and concise" for highlights means shortening each existing bullet's wording while preserving its original claim, not merging multiple bullets into one or adding new claims.
- "Summarize and concise" for the introductory description means shortening the existing paragraph, not restructuring it into multiple paragraphs or bullet points.
- Thai-language content will be updated to stay semantically equivalent to the condensed English content, matching the tone and terminology already used in the existing Thai copy.
- The technical specification table (protection level, material, sizes, certifications, etc.) is the authoritative, unabridged source of detailed specs and does not need to be duplicated in full within the highlights panel.
