# Typography

| Type |
|---|
| 🏗 Foundation |

> Defines the type scale, font families, weights, and responsive sizing rules that all text-rendering components consume across the design system.

**Figma:** Page `1:34` → Section `78:8370` → Variables node `78:9146`

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
- Always reference typography tokens by their semantic name (`Desktop/H1`, `Mobile/Text Default`) — never hard-code font-size, weight, or line-height values directly
- Apply the full token — family, size, weight, line-height, letter-spacing together as a unit. Partial overrides create drift.
- Use heading levels (H1–H6) in correct semantic order for accessibility — H1 is the page title, H2 for major sections. Do not skip levels for visual effect.
- Switch from the Desktop scale to the Mobile scale at the `768px` breakpoint — this is the single, system-wide responsive trigger for typography
- **Use spacing tokens for all typography-related spacing** — margin-bottom on headings, paragraph spacing, gap between heading and body text. Never use arbitrary pixel values for text spacing.

### ❌ Don't
- Don't mix font weights outside of what the token defines → Each style has a single canonical weight. If you need emphasis within body text, use `Text Default M` (Medium) rather than inventing a bold variant.
- Don't override line-height per-component → The token line-height is the source of truth. If it looks wrong in context, escalate to the design system team to update the token, not the component.
- Don't apply heading tokens (H1–H6) to non-heading elements for visual sizing → Use body text tokens for non-heading content.
- Don't use `Nunito Sans` in product UI → It appears in the Figma frame as a section label font only and is **not** part of the product type scale.
- Don't use hard-coded px values for spacing between text elements → Always use spacing tokens from the Spacing & Sizing foundation.

---

## Typography Spacing

All vertical spacing between typographic elements uses tokens from the Spacing & Sizing
foundation. This ensures typography rhythm stays consistent with component spacing.

### Recommended spacing between elements

| Context | Spacing token | Value | Usage |
|---|---|---|---|
| Heading to body text | `M` | 12px | Gap between a heading and the paragraph/content below it |
| Between paragraphs | `L` | 16px | Space between consecutive `<p>` elements |
| Between sections | `XL`–`XXL` | 20–24px | Space between a section's last element and the next section heading |
| Label to input | `XS` | 4px | Space between form label and its input field |
| Helper text to input | `XS` | 4px | Space between input and helper/error text below |
| Heading to subheading | `S` | 8px | Gap between H2 and a subtitle or description line |
| List item spacing | `S` | 8px | Gap between items in a text list |
| Caption to element | `XS` | 4px | Space between an image/figure and its caption |

### CSS implementation

```css
h1, h2, h3, h4, h5, h6 {
  margin-bottom: var(--space-m); /* 12px to following content */
}

p + p {
  margin-top: var(--space-l); /* 16px between paragraphs */
}

section + section {
  margin-top: var(--space-xxl); /* 24px between sections */
}
```

---

## States & Variants

### Font Stack

| Property | Value |
|---|---|
| Primary font | `Source Sans 3` |
| Fallback stack | `system-ui, sans-serif` |
| CSS declaration | `font-family: 'Source Sans 3', system-ui, sans-serif;` |

### Font Weights in Use

| Weight name | CSS `font-weight` | Used by |
|---|---|---|
| Regular | `400` | Text Large, Text Default, Text Small, Caption |
| Medium | `500` | H5, H6, Text Default M |
| SemiBold | `600` | H1, H2, H3, H4 |

### Desktop Type Scale (≥ 768px)

| Token | Font size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| `Desktop/H1` | 48px | 600 | 1.2 | 0 |
| `Desktop/H2` | 40px | 600 | 1.2 | 0 |
| `Desktop/H3` | 36px | 600 | 1.2 | 0 |
| `Desktop/H4` | 32px | 600 | 1.2 | 0 |
| `Desktop/H5` | 24px | 500 | 1.2 | 0 |
| `Desktop/H6` | 20px | 500 | 1.2 | 0 |
| `Desktop/Text Large` | 18px | 400 | 1.2 | 0 |
| `Desktop/Text Default` | 16px | 400 | 1.2 | 0 |
| `Desktop/Text Default M` | 16px | 500 | 1.2 | 0 |
| `Desktop/Text Small` | 14px | 400 | 1.2 | 0 |
| `Desktop/Caption` | 12px | 400 | 1.2 | 0 |

### Mobile Type Scale (< 768px)

| Token | Font size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| `Mobile/H1` | 32px | 600 | 1.2 | 0 |
| `Mobile/H2` | 28px | 600 | 1.2 | 0 |
| `Mobile/H3` | 24px | 600 | 1.2 | 0 |
| `Mobile/H4` | 20px | 600 | 1.2 | 0 |
| `Mobile/H5` | 18px | 500 | 1.2 | 0 |
| `Mobile/H6` | 16px | 500 ⚠️ | 1.2 | 0 |
| `Mobile/Text Large` | 16px | 400 | 1.2 | 0 |
| `Mobile/Text Default` | 14px | 400 | 1.2 | 0 |
| `Mobile/Text Default M` | 14px | 500 | 1.2 | 0 |
| `Mobile/Text Small` | 12px | 400 | 1.3 | 0 |
| `Mobile/Caption` | 10px | 400 | 1.3 | 0 |

### OpenType Feature Settings

**⛔ EXCLUDED FROM IMPLEMENTATION** — The Figma file contains OpenType character variant features (`cv12`, `cv13`, `cv14`, `cv15`, `cv16`) on body text nodes. These are **not to be implemented** until the design team verifies their visual effect and explicitly approves them.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Mobile type scale applies. All 11 tokens switch to their smaller mobile values. Line-height shifts to 1.3 for Text Small and Caption. |
| Desktop (≥ 768px) | Desktop type scale applies. All 11 tokens use their larger desktop values. Line-height is 1.2 across the full scale. |

No intermediate tablet breakpoint for typography. The switch is binary at 768px.

---

## Interaction & Motion

No direct interactions — typography tokens are consumed by components which handle their own transitions. When text content changes dynamically (e.g., a counter updating), the transition should be handled by the parent component's motion spec.

---

## Accessibility

### Minimum sizes
- The smallest text is `Mobile/Caption` at 10px — meets WCAG only for supplementary, non-essential information. Critical content must use `Text Small` (12px mobile) or larger.
- Body text (`Text Default`) is 14px on mobile and 16px on desktop — both meet standard readability thresholds.

### Contrast
- All text must meet WCAG AA minimums: **4.5:1** for normal text (<24px), **3:1** for large text (24px+ / 18.66px+ bold).
- At Desktop scale: H1–H5 qualify as large text under WCAG (3:1 minimum). All body text tokens require 4.5:1 contrast at both breakpoints.

### Semantic HTML mapping

| Token | HTML element | Notes |
|---|---|---|
| H1 | `<h1>` | One per page |
| H2 | `<h2>` | Major sections |
| H3–H6 | `<h3>`–`<h6>` | Sub-sections |
| Text Large | `<p>`, `<span>` | Lead paragraphs |
| Text Default | `<p>`, `<span>`, `<li>` | Standard body |
| Text Default M | `<strong>`, `<span>` | Emphasized body, labels |
| Text Small | `<small>`, `<span>` | Secondary info, helper text |
| Caption | `<figcaption>`, `<span>` | Captions, timestamps |

---

## Audit Notes

⚠️ **Mobile/H6 weight mismatch** — Figma returns 600 (SemiBold), design intent is 500 (Medium). Implement as 500 until Figma is corrected.
⚠️ **Stray `XL: 20` variable** in typography node — spacing token, not typography. Should be moved to Spacing foundation.
