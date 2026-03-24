# Typography

| Type |
|---|
| 🏗 Foundation |

> Defines the type scale, font families, weights, and responsive sizing rules that all text-rendering components consume across the design system.

---

## Purpose

The Typography foundation establishes a single, consistent type system built on **Source Sans 3**. It provides a complete scale of 11 named styles — from display headings (H1) down to captions — each with explicit Desktop and Mobile definitions. Every text element in the system references this scale rather than ad-hoc font values, ensuring visual consistency, predictable responsive behavior, and a single point of change when the type system evolves.

### When to use
- When rendering any text in the UI — headings, body copy, labels, captions, helper text
- When building or updating a component that contains text — reference these tokens for every typographic property
- When defining new text styles for edge cases — derive from the existing scale (do not invent new sizes)

### When NOT to use
- For icon sizing or icon-font rendering → Use the Icons foundation instead
- For decorative or marketing display type that intentionally breaks the system scale → Create an exception token with explicit rationale and design approval
- For code/monospace blocks → Define a separate Code typography token set (⚠️ NOT SPECIFIED in current system)

---

## Usage Rules

### ✅ Do
- Always reference typography tokens by their semantic name (e.g., `Desktop/H1`, `Mobile/Text Default`) — never hard-code font-size, weight, or line-height values directly
- Apply the full token — family, size, weight, line-height, letter-spacing, and OpenType features together as a unit. Partial overrides create drift.
- Use heading levels (H1–H6) in correct semantic order for accessibility — H1 is the page title, H2 for major sections, etc. Do not skip levels for visual effect.
- Switch from the Desktop scale to the Mobile scale at the `768px` breakpoint — this is the single, system-wide responsive trigger for typography

### ❌ Don't
- Don't mix font weights outside of what the token defines → Each style has a single canonical weight. If you need emphasis within body text, use `Text Default M` (Medium) rather than inventing a bold variant.
- Don't override line-height per-component → The token line-height is the source of truth. If it looks wrong in context, escalate to the design system team to update the token, not the component.
- Don't apply heading tokens (H1–H6) to non-heading elements for visual sizing → Use body text tokens (Text Large, Text Default, Text Small, Caption) for non-heading content, even if a heading size looks visually appealing.
- Don't use `Nunito Sans` in product UI → It appears in the Figma frame as a section label font only and is **not** part of the product type scale.

---

## Font Stack

| Property | Value |
|---|---|
| **Primary font** | `Source Sans 3` |
| **Fallback stack** | `system-ui, sans-serif` |
| **CSS declaration** | `font-family: 'Source Sans 3', system-ui, sans-serif;` |

### Font Weights in Use

| Weight name | CSS `font-weight` | Used by |
|---|---|---|
| Regular | `400` | Text Large, Text Default, Text Small, Caption |
| Medium | `500` | H5, H6, Text Default M |
| SemiBold | `600` | H1, H2, H3, H4 |

### OpenType Feature Settings

**⛔ EXCLUDED FROM IMPLEMENTATION** — The Figma file contains OpenType character variant features (`cv12`, `cv13`, `cv14`, `cv15`, `cv16`) on body text nodes (Text Large through Caption). These are **not to be implemented** until the design team verifies their visual effect and explicitly approves them.

```css
/* DO NOT INCLUDE — pending design team verification */
/* font-feature-settings: 'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1; */
```

Once verified, this section should be updated to either remove the features entirely or promote them to required status with documented visual rationale.

---

## States & Variants — Full Token Reference

### Desktop Type Scale (≥ 768px)

| Token name | Font size | Font weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| `Desktop/H1` | `48px` | `600` (SemiBold) | `1.2` (57.6px) | `0` |
| `Desktop/H2` | `40px` | `600` (SemiBold) | `1.2` (48px) | `0` |
| `Desktop/H3` | `36px` | `600` (SemiBold) | `1.2` (43.2px) | `0` |
| `Desktop/H4` | `32px` | `600` (SemiBold) | `1.2` (38.4px) | `0` |
| `Desktop/H5` | `24px` | `500` (Medium) | `1.2` (28.8px) | `0` |
| `Desktop/H6` | `20px` | `500` (Medium) | `1.2` (24px) | `0` |
| `Desktop/Text Large` | `18px` | `400` (Regular) | `1.2` (21.6px) | `0` |
| `Desktop/Text Default` | `16px` | `400` (Regular) | `1.2` (19.2px) | `0` |
| `Desktop/Text Default M` | `16px` | `500` (Medium) | `1.2` (19.2px) | `0` |
| `Desktop/Text Small` | `14px` | `400` (Regular) | `1.2` (16.8px) | `0` |
| `Desktop/Caption` | `12px` | `400` (Regular) | `1.2` (14.4px) | `0` |

### Mobile Type Scale (< 768px)

| Token name | Font size | Font weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| `Mobile/H1` | `32px` | `600` (SemiBold) | `1.2` (38.4px) | `0` |
| `Mobile/H2` | `28px` | `600` (SemiBold) | `1.2` (33.6px) | `0` |
| `Mobile/H3` | `24px` | `600` (SemiBold) | `1.2` (28.8px) | `0` |
| `Mobile/H4` | `20px` | `600` (SemiBold) | `1.2` (24px) | `0` |
| `Mobile/H5` | `18px` | `500` (Medium) | `1.2` (21.6px) | `0` |
| `Mobile/H6` | `16px` | `500` (Medium) | `1.2` (19.2px) | `0` |
| `Mobile/Text Large` | `16px` | `400` (Regular) | `1.2` (19.2px) | `0` |
| `Mobile/Text Default` | `14px` | `400` (Regular) | `1.2` (16.8px) | `0` |
| `Mobile/Text Default M` | `14px` | `500` (Medium) | `1.2` (16.8px) | `0` |
| `Mobile/Text Small` | `12px` | `400` (Regular) | `1.3` (15.6px) | `0` |
| `Mobile/Caption` | `10px` | `400` (Regular) | `1.3` (13px) | `0` |

### Desktop → Mobile Size Mapping

| Style | Desktop size | Mobile size | Scale factor |
|---|---|---|---|
| H1 | 48px | 32px | 0.667× |
| H2 | 40px | 28px | 0.700× |
| H3 | 36px | 24px | 0.667× |
| H4 | 32px | 20px | 0.625× |
| H5 | 24px | 18px | 0.750× |
| H6 | 20px | 16px | 0.800× |
| Text Large | 18px | 16px | 0.889× |
| Text Default | 16px | 14px | 0.875× |
| Text Default M | 16px | 14px | 0.875× |
| Text Small | 14px | 12px | 0.857× |
| Caption | 12px | 10px | 0.833× |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Mobile type scale applies. All 11 tokens switch to their smaller mobile values. Line-height shifts to `1.3` for Text Small and Caption (improving legibility at very small sizes). |
| Desktop (≥ 768px) | Desktop type scale applies. All 11 tokens use their larger desktop values. Line-height is `1.2` across the full scale. |

There is no intermediate tablet breakpoint — the switch is binary at `768px`. ⚠️ **No tablet-specific scale is defined.** If a tablet-optimized scale is needed in the future, it should be added as a third column to this foundation.

---

## Interaction & Motion

No direct interactions — typography tokens are consumed by components which handle their own transitions.

When text content changes dynamically (e.g., a counter updating, a label switching between states), the transition should be handled by the parent component's motion spec, not by the typography foundation itself.

---

## Accessibility

### Minimum sizes
- The smallest text in the system is `Mobile/Caption` at `10px`. This meets WCAG guidelines only when used for supplementary, non-essential information. Critical content must use `Text Small` (`12px` mobile) or larger.
- Body text (`Text Default`) is `14px` on mobile and `16px` on desktop — both meet standard readability thresholds.

### Contrast
- All text tokens use a default color of `#000000` (black) in the Figma specimens. Actual text colors are defined by the Color foundation and must meet WCAG AA minimums: **4.5:1** for normal text (below 24px / 18.66px bold) and **3:1** for large text (24px+ / 18.66px+ bold).
- At Desktop scale: H1 (48px SemiBold), H2 (40px SemiBold), H3 (36px SemiBold), H4 (32px SemiBold), and H5 (24px Medium) qualify as large text under WCAG (3:1 minimum).
- All body text tokens (Text Large, Text Default, Text Small, Caption) require 4.5:1 contrast at both breakpoints.

### Semantic HTML mapping

| Token | Recommended HTML element | Notes |
|---|---|---|
| H1 | `<h1>` | One per page |
| H2 | `<h2>` | Major sections |
| H3 | `<h3>` | Sub-sections |
| H4 | `<h4>` | Sub-sub-sections |
| H5 | `<h5>` | Minor headings |
| H6 | `<h6>` | Smallest heading level |
| Text Large | `<p>`, `<span>` | Lead paragraphs, intro text |
| Text Default | `<p>`, `<span>`, `<li>` | Standard body copy |
| Text Default M | `<strong>`, `<span>` | Emphasized body text, labels |
| Text Small | `<small>`, `<span>` | Secondary information, helper text |
| Caption | `<figcaption>`, `<span>` | Image captions, timestamps, metadata |

### Line-height for readability
- Heading line-heights (`1.2`) are appropriate for short, single- or two-line text blocks.
- Body text line-heights (`1.2`) are tighter than the commonly recommended `1.5` for paragraph-length content. This is an intentional design decision — `1.2` is the canonical value for all text styles, including multi-line body copy. No `1.5` variant is planned.

---

## Audit Summary

### 🔴 Blockers (resolved)
1. **Line-height discrepancy** — Annotation labels in the Figma frame show different line-height values (e.g., H1: 48/56, H2: 40/52, Text Default: 16/26) than the actual Figma token multipliers (1.2 and 1.3). **Resolution:** The Figma text style variable values are canonical. Annotation labels are outdated and should be updated in the Figma file.
2. **Mobile H6 weight conflict** — The Figma token resolves to SemiBold (600), but the annotation and design intent is Medium (500). **Resolution:** The Figma token for `Mobile/H6` should be corrected to `font-weight: 500` (Medium) to match the intended design.

### 🟡 Recommendations
1. **No tablet breakpoint** — Only Desktop and Mobile scales are defined. If a tablet-specific scale is needed in the future, add it as a third token set.
2. **OpenType features excluded pending verification** — The Figma file contains `cv12`–`cv16` character variants on body text nodes. These are **excluded from implementation** until the design team verifies their visual effect and explicitly approves them. See the OpenType Feature Settings section above.

### ✅ Resolved decisions
- **Letter-spacing** — Confirmed as `0` across the entire scale, including Caption at 10px mobile. No tracking adjustments.
- **Body text line-height** — Confirmed as `1.2` for all styles. No `1.5` variant for long-form copy.
- **Bold/italic body variants** — Scale is complete as-is. No additional weight or style variants planned.

### 🔵 Clarifications (for Figma file cleanup)
- The annotation labels throughout the frame need updating to match the canonical token values
- The `Mobile/H6` Figma text style should be corrected from SemiBold (600) to Medium (500)
- The `Nunito Sans` Bold font used for frame section labels ("Desktop", "Mobile") is not part of the product type system and should not be implemented
