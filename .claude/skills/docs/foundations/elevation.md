# Elevation

| Type |
|---|
| 🏗 Foundation |

> 5-level shadow system defining perceived depth and visual hierarchy. Each level uses 5 layered drop-shadows for subtle, realistic depth.

**Figma:** Page `60:298` → Section `60:299` → Level nodes `60:339`–`60:348`

---

## Purpose

Elevation creates structure, focuses attention, and visually separates interactive layers. The 5-level system maps to specific UI contexts — from resting cards (L1) to full-screen overlays (L5).

### When to use
- When a UI element needs to appear above the page surface — cards, dropdowns, modals
- When indicating interaction state changes — hover (L1→L2), active, expanded

### When NOT to use
- For purely decorative shadow effects → Use border or background color differentiation instead
- For creating depth within flat content → Use the surface layering system (Surface → Adjacent → Adjacent 2)

---

## Usage Rules

### ✅ Do
- Match elevation level to interaction context (see table below)
- Use elevation transitions on hover (L1→L2) to indicate interactivity
- Keep modal backdrops + Level 4 for focused dialogs

### ❌ Don't
- Don't use Level 5 for anything less than a full drawer/takeover
- Don't stack overlapping elements at the same elevation level
- Don't use elevation as the only way to distinguish elements — combine with borders or background color

---

## States & Variants

| Level | Context | Max y-offset | CSS variable |
|---|---|---|---|
| Level 1 | Cards, raised surfaces at rest | 17px | `--elevation-level1` |
| Level 2 | Hover states, dropdowns, context menus | 42px | `--elevation-level2` |
| Level 3 | Popovers, toasts, tooltips | 83px | `--elevation-level3` |
| Level 4 | Modals, dialogs | 125px | `--elevation-level4` |
| Level 5 | Drawers, full navigation overlays | 167px | `--elevation-level5` |

All levels use `rgba(0,0,0)` at 0.00–0.05 opacity — extremely subtle, designed for light backgrounds.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| All breakpoints | Elevation values are constant. Mobile may use fewer elevated layers (e.g., bottom sheets instead of dropdowns). |

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Card hover lift | pointerenter | box-shadow | 200ms | ease |
| Card press settle | pointerdown | box-shadow | 150ms | ease |
| Modal appear | dialog open | opacity + box-shadow | 200ms | ease |

---

## Accessibility

- Elevation alone must never be the only indicator of state — always pair with border, background, or icon changes
- In high-contrast mode, shadows are invisible — ensure all elevated elements also have a visible border (`--border-default`)
- Screen readers don't perceive elevation — use ARIA attributes for layer relationships
