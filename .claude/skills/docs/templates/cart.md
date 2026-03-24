# Cart

| Type |
|---|
| ⛺ Template |

> Order summary sidebar with line items, totals, and checkout action.

**Figma:** Page `2313:29` → Section `2313:503`
**Code:** `src/components/templates/Cart/`

---

## Purpose

The Cart summarizes the user's insurance selection with pricing breakdown before checkout.

---

## States & Variants

Line items with label, description, price. Optional remove action per item. Total calculation with bold emphasis. Checkout CTA button (full-width Primary).

Currency: defaults to лв. (Bulgarian lev).

---

## Accessibility

Semantic list for items. Remove buttons: `aria-label="Remove [item name]"`. Total row visually separated with 2px border.
