# Spacing & Sizing

| Type |
|---|
| 🏗 Foundation |

> 2-point base scale with T-shirt size naming for consistent rhythm and pixel-perfect alignment across all layouts, components, and viewports.

**Figma:** Page `1:50` → Section `56:164`

---

## Purpose

Every spacing value is a multiple of 2px, ensuring a clean visual rhythm. T-shirt sizes (XS, S, M, L, XL) make it easier for designers and developers to communicate intent without worrying about raw pixel values.

### When to use
- For all padding, margin, gap, and dimensional values in component internals and layout
- When defining new component specs — always use a token from this scale

### When NOT to use
- For font sizes → Use the Typography foundation
- For icon sizes → Use the Icons foundation sizing conventions
- For values not on the 2px grid → Don't. Find the nearest token.

---

## Usage Rules

### ✅ Do
- Reference tokens by T-shirt name in design reviews and code comments — "L padding" not "16px padding"
- Use S (8px) or M (12px) for component-internal spacing
- Use L (16px) or XL (20px) between sibling components
- Use XXL+ (24px–64px) for section-level spacing

### ❌ Don't
- Don't introduce off-grid values (e.g., 6px, 10px, 15px) → Use the nearest token
- Don't use Max (128px) for component-internal spacing → It's for page-level margins only
- Don't mix raw px values with token references in the same component

---

## States & Variants

| Token | Value | Typical usage |
|---|---|---|
| None | 0px | Reset, flush elements |
| XXS | 2px | Hairline gaps, icon-to-text micro-spacing |
| XS | 4px | Tight internal padding, pill padding-y |
| S | 8px | Standard internal gap, input padding |
| M | 12px | Medium internal padding, card internal gap |
| L | 16px | Standard component padding, gutter |
| XL | 20px | Generous component padding |
| XXL | 24px | Section padding, modal body padding |
| 3XL | 28px | — |
| 4XL | 32px | Large section spacing |
| 5XL | 40px | Page section margins |
| 6XL | 48px | Footer padding |
| 7XL | 64px | Large page section margins |
| 8XL | 80px | Hero section spacing |
| Max | 128px | Maximum page-level margin |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| All breakpoints | Spacing tokens are constant across breakpoints. Responsive adjustments are made by choosing a different token for each breakpoint, not by scaling token values. |

---

## Interaction & Motion

No direct interactions — spacing tokens are static values consumed by layout.

---

## Accessibility

- Touch targets must be at least 44×44px (≥ 4XL × 4XL) on mobile
- Interactive elements should have sufficient spacing to prevent accidental taps — minimum S (8px) gap between adjacent touch targets
