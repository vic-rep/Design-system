# OfferComparisonTable

**Tier:** Organism  
**Status:** Stable  
**Figma:** Node `3173-49106` — Card device=Desktop, 768×530

---

## What it does

Displays a grid comparing **N insurance companies** across **M service tiers** (e.g. Expert / Trusted / Official service). Each cell is a [`PriceOption`](../../molecules/PriceOption/README.md) molecule. The user picks exactly one cell across the entire grid (single-pick radio group), and a Continue CTA activates once a selection is made.

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Компания        │ Експертна оценка ⓘ │ Доверен сервиз ⓘ  │
│──────────────────────────────────────────────────────────────│
│  [logo] Generali ✦ │  4× 380,25 €   │   4× 380,25 €     │
│  [logo] BulIns   ✦ │  4× 280,40 €   │   4× 415,25 €     │
│  [logo] Bulstrad   │  4× 364,25 €   │   4× 280,40 €     │
│──────────────────────────────────────────────────────────────│
│                        [ Продължи › ]                        │
└─────────────────────────────────────────────────────────────┘
```

- **Outer card:** `max-w-[768px]`, `bg-[var(--surface-adjacent)]`, `rounded-[var(--m)]`, `p-[var(--xl)]`
- **Grid columns:** `minmax(188px, 1fr)` for the company column + `N × 150px` for price columns, `20px` column gap, `8px` row gap
- **Horizontal scroll:** when the viewport is narrower than the grid's minimum width, the table scrolls horizontally rather than stacking. A thin custom scrollbar (primary-300) and dynamic left/right edge-fade overlays aid discoverability.
- **Continue CTA** sits outside the scroll wrapper so it is always fully visible.

---

## Selection model

The grid acts as a single `role="radiogroup"`. Each `PriceOption` cell has `role="radio"` and `aria-checked`. Picking any cell deselects all others. The component supports both **controlled** and **uncontrolled** usage:

| Pattern | Props to use |
|---|---|
| Uncontrolled | `defaultSelected` (optional initial value) |
| Controlled | `selected` + `onSelect` |

---

## Column info drawers

Passing an `info` node on any `OfferComparisonColumn` renders a `fa-circle-info` button (primary-300) next to the column header. Clicking it opens a [`Drawer`](../Drawer/) (`type="info"`) with the provided content. Only one drawer is open at a time; `infoTitle` overrides the drawer title (falls back to `label`).

---

## Trusti pictogram

When a row has `trustiBenefit` set, a pulsating **Trusti pictogram** (orange beacon animation) appears after the company logo. It shows a tooltip with the benefit text:

- **Desktop:** hover to show, mouse-leave to hide
- **Mobile:** tap to toggle; tap outside to dismiss
- **Implementation:** the tooltip is rendered via `ReactDOM.createPortal` into `document.body` with `position: fixed`, so it is never clipped by the horizontal scroll container's overflow.

```tsx
{
  id: 'generali',
  companyName: 'Generali',
  trustiBenefit: 'С Trusti имате право на дистанционен оглед при избор на Дженерали.',
  prices: { ... }
}
```

---

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `columns` | `OfferComparisonColumn[]` | ✓ | — | Column definitions. `info` triggers the (ⓘ) drawer button. |
| `rows` | `OfferComparisonRow[]` | ✓ | — | Company rows with prices per column. `trustiBenefit` enables the Trusti pictogram tooltip. |
| `selected` | `OfferComparisonSelection \| null` | — | — | Controlled selection `{ rowId, columnId }` |
| `defaultSelected` | `OfferComparisonSelection \| null` | — | `null` | Initial selection for uncontrolled use |
| `onSelect` | `(s: OfferComparisonSelection) => void` | — | — | Fires on every cell pick |
| `onContinue` | `(s: OfferComparisonSelection) => void` | — | — | Fires when Continue is pressed (only active once a cell is selected) |
| `continueLabel` | `string` | — | `"Продължи"` | CTA button label |
| `className` | `string` | — | `""` | Extra classes on the outer card wrapper |

### `OfferComparisonColumn`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Column key — used to look up prices in each row |
| `label` | `string` | Header label |
| `info` | `React.ReactNode` | Optional drawer content; triggers the ⓘ button |
| `infoTitle` | `string` | Optional drawer title (falls back to `label`) |

### `OfferComparisonRow`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique row key |
| `companyName` | `string` | Displayed next to the logo placeholder |
| `prices` | `Record<columnId, OfferComparisonPrice \| undefined>` | Price per column; missing entries render an empty cell |
| `trustiBenefit` | `string` | Optional — enables the Trusti pictogram + tooltip |

### `OfferComparisonPrice`

| Field | Type | Description |
|---|---|---|
| `euro` | `string` | Pre-formatted euro amount, e.g. `"380,25"` |
| `bgn` | `string` | Pre-formatted BGN equivalent, e.g. `"782.02"` |
| `instalments` | `boolean` | Show `4×` multiplier prefix (default `true`) |
| `multiplier` | `string` | Multiplier label (default `"4x"`) |

---

## Usage example

```tsx
import { OfferComparisonTable } from '@/components/organisms/OfferComparisonTable'

<OfferComparisonTable
  columns={[
    { id: 'expert',   label: 'Експертна оценка', info: <p>…</p> },
    { id: 'trusted',  label: 'Доверен сервиз',   info: <p>…</p> },
    { id: 'official', label: 'Официален сервиз', info: <p>…</p> },
  ]}
  rows={[
    {
      id: 'generali',
      companyName: 'Generali',
      trustiBenefit: 'С Trusti имате право на дистанционен оглед при избор на Дженерали.',
      prices: {
        expert:   { euro: '380,25', bgn: '782.02' },
        trusted:  { euro: '380,25', bgn: '782.02' },
        official: { euro: '1 415,25', bgn: '2 768.40' },
      },
    },
    // …more rows
  ]}
  onSelect={(s) => console.log(s)}
  onContinue={(s) => router.push(`/checkout?row=${s.rowId}&col=${s.columnId}`)}
/>
```

---

## Dependencies

| Import | Used for |
|---|---|
| `Typography` (atom) | All text — responsive scale via `mobile:` breakpoint |
| `Icon` (atom) | Right-edge scroll chevron |
| `Button` (molecule) | Column info icon buttons + Continue CTA |
| `PriceOption` (molecule) | Each selectable price cell |
| `Drawer` (organism) | Column info side panels |
| `ReactDOM.createPortal` | Trusti tooltip — escapes scroll container overflow |
