# Offer List Item

| Type |
|---|
| 🧬 Molecule |

> A single row in the offers comparison list, displaying the insurer logo, price information, and an action trigger. Adapts its layout per insurance product type and device.

---

## Purpose

The Offer List Item is the repeating unit inside the comparison results list. Each item represents one insurance offer from one insurer, giving the user just enough information to compare and decide — insurer identity, first installment price, total price, and a "best price" badge when applicable.

### When to use
- As the repeated item inside an Offers List organism after a comparison search completes
- In saved/recent offers lists on the dashboard
- In any context where individual insurance offers need to be displayed in a scannable row format

### When NOT to use
- For displaying full offer details with coverage breakdown → Use Offer Detail organism
- For promotional banners or featured offers → Use a dedicated marketing molecule
- For non-insurance list items (articles, FAQs, settings) → Use a generic list item

---

## Usage Rules

### ✅ Do
- Always use auto layout — the component is a flex row with `space-between` alignment
- Use only tokens from the Design System Rebuild library (per design handoff checklist)
- Always show the insurer logo and total price — these are the minimum required content
- Name every layer semantically — "logo", "price-section", "installment-block" (per design handoff checklist)

### ❌ Don't
- Don't hard-code insurer logos — use the logo slot which accepts any insurer brand asset
- Don't show the installment section if the product doesn't support installments (controlled via `showInstallements` property)
- Don't show the "Най-добра цена" pill if the offer isn't the best price (controlled via `showPill` property)
- Don't use groups where auto layout frames would work (per design handoff checklist)

---

## States & Variants

### Variants (by Product property)

| Product | Description | When to use |
|---|---|---|
| MTPL | Motor Third Party Liability insurance offer | Car insurance comparison results |
| Casco | Full coverage / comprehensive car insurance offer | Casco insurance comparison results |
| Travel | Travel insurance offer | Travel insurance comparison results |
| QuickLoans | Quick loan offer | Loan comparison results |
| Fines | Traffic fines payment item | Fines payment flow — note: this variant has a taller layout (~114px desktop vs ~67px for others) |

### Variants (by Device property)

| Device | Width | Height | Notes |
|---|---|---|---|
| Desktop | 768px | 67px (114px for Fines) | Full horizontal layout with all columns visible |
| Mobile | 350px | 65px (106px for Fines) | Compact layout adapted for narrow viewports |

### States (by State property)

| State | Visual change | Trigger |
|---|---|---|
| Default | White background (`Surface Adjescent`), Elevation Level 1, rounded corners (`S`/8px) | Resting state |
| Hover | Border appears around the card — no elevation change | Pointer enters the card |
| Pressed | Elevation shifts to Level 2 — card lifts visually | Pointer down / tap |
| Skeleton | Content replaced with placeholder shapes, pulsing opacity animation | Data is loading or list is re-fetching after sort/filter change |

### Component properties

| Property | Type | Default | Description |
|---|---|---|---|
| logo | slot (React node) | LevIns logo | Insurer brand logo — swappable per offer |
| showInstallements | boolean | true | Shows/hides the "Първа вноска" (first installment) column |
| showPill | boolean | true | Shows/hides the "Най-добра цена" (best price) badge |

### Elevation usage

| State | Elevation level | Notes |
|---|---|---|
| Default | Level 1 | Subtle multi-layer shadow — card sits above surface |
| Hover | Level 1 | No elevation change — border change signals hover instead |
| Pressed | Level 2 | Deeper multi-layer shadow — card lifts on press/tap |
| Skeleton | Level 1 | Same as default — maintains spatial consistency during loading |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Uses the `Device=Mobile` variant (350px wide, 65px tall). Layout adapts to narrower viewport — same content hierarchy but tighter spacing. |
| Desktop (≥ 1024px) | Uses the `Device=Desktop` variant (768px wide, 67px tall). Full horizontal layout with logo, badge, installment price, total price, and chevron action. |

The Fines product variant is taller at both breakpoints (106px mobile, 114px desktop). Its pressed state acts as an **accordion** — expanding to reveal additional details (372px mobile, 400px desktop when expanded).

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing | Notes |
|---|---|---|---|---|---|
| Hover in | pointerenter | Border appears | 200ms | ease-out | Border signals hover — no elevation change |
| Hover out | pointerleave | Border removed | 200ms | ease-out | Returns to default borderless state |
| Press / tap | pointerdown / tap | Elevation Level 1 → Level 2 | 200ms | ease-out | Card lifts on press, then navigates to offer detail |
| Fines expand | press / tap on Fines variant | Height expands (accordion) | 300ms | ease-out | Reveals additional fine details — 67→400px desktop, 65→372px mobile |
| Fines collapse | press / tap again | Height collapses | 300ms | ease-out | Returns to default compact height |
| Skeleton pulse | Loading state active | Opacity 0.4 → 1 → 0.4 | 1.5s | ease-in-out | Infinite loop on skeleton shapes |
| List populate | Data loaded | Opacity 0 → 1, translateY | 300ms | ease-out | 50ms stagger between consecutive cards |
| Sort/filter change | User changes sort or filter | Triggers skeleton state | — | — | Full skeleton re-render, then populate animation on new results |

Reduced motion: Simplify animations — show static skeleton (no pulse), remove translateY on populate (instant opacity fade only), keep border and elevation transitions.

---

## Accessibility

| Attribute | Value | Notes |
|---|---|---|
| Role | `listitem` (inside a `list` container) | Each offer card is a list item |
| aria-label | Dynamic: "[Insurer name] — [total price] лв" | Describes the offer for screen readers |

### Keyboard

| Key | Action |
|---|---|
| Tab | Move focus to the card / to the next card |
| Enter | Navigate to offer detail (same as press/tap). For Fines variant: toggles accordion expand/collapse. |

### Screen reader
- Announces: insurer name, best-price badge (if present), first installment price, total price
- When skeleton state is active, parent list should announce "Loading offers" via `aria-busy="true"`

---

## Audit Summary

### 🔴 Blockers
- None — component has all four expected states (Default, Hover, Pressed, Skeleton) across all product variants and both device sizes.

### 🟡 Recommendations
1. Consider adding a `focus-visible` state distinct from hover — currently only Default, Hover, Pressed, and Skeleton are defined. A visible focus ring would improve keyboard accessibility.
2. The Fines accordion expand/collapse should trap focus within the expanded content when open, and return focus to the card when collapsed.
