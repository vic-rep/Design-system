# Offers List

| Type |
|---|
| 🐿 Organism |

> List of insurance offer cards with company info, features, pricing, and selection action.

**Figma:** Page `147:1690` → Section `173:800` — 41 variant frames
**Code:** `src/components/organisms/OffersList/`

---

## Purpose

The Offers List is the core conversion component — it displays insurance quotes from multiple providers, enabling comparison and selection. This is where users make their purchase decision.

### When to use
- Displaying comparison results for MTPL, Casco, Travel, or Quick Loans products

### When NOT to use
- Single product display → Use a simpler product card
- Pricing without comparison → Use Cart

---

## Usage Rules

### ✅ Do
- Show pricing prominently with currency and period
- Mark the recommended offer with the accent badge
- Include feature checkmarks for quick comparison
- Show skeleton loading during fetch

### ❌ Don't
- Don't auto-select an offer without user action
- Don't hide pricing behind a click — transparency is the #1 trust signal

---

## States & Variants

### Product types

| Product | Figma prefix |
|---|---|
| MTPL | `Offer list item/MTPL/` |
| Casco | `Offer list item/Casco/` |
| Travel | `Offer list item/Travel/` |
| Quick Loans | `Offer list item/QuickLoans/` |

### Card states

| State | Visual | Trigger |
|---|---|---|
| Default | Level 1 elevation, default border | — |
| Hover | Level 2 elevation, darker border | pointerenter |
| Pressed | Level 1, 1px translateY | pointerdown |
| Skeleton | Pulse animation, gray blocks | `loading=true` |
| Recommended | Accent border + "Recommended" badge | `recommended` prop |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile | Full-width cards, stacked layout |
| Desktop | Full-width cards with more horizontal space for features |

---

## Accessibility

Container: `role="list"`. Cards: `role="listitem"`, `tabIndex={0}`. Keyboard: Enter selects offer.
