# Navigation

| Type |
|---|
| ⛺ Template |

> Sticky top navigation bar with logo, links, and action area.

**Figma:** Page `448:5218` → Sections `2014:340`, `3429:12607`
**Code:** `src/components/templates/Navigation/`

---

## Purpose

The Navigation bar is the persistent wayfinding element across all pages.

---

## States & Variants

Desktop: horizontal links + actions. Mobile (<768px): burger menu, links stack vertically. Active link: accent color + bold weight.

---

## Layout

Flexbox row. Logo (shrink-0) → Links (flex-1) → Actions (shrink-0). `position: sticky; top: 0; z-index: 50`. Max width 1200px. Height: 64px.

### Responsive

| Breakpoint | Change |
|---|---|
| < 768px | Burger menu replaces horizontal links. Links in vertical dropdown. Actions hidden. |
| ≥ 768px | Full horizontal layout. |

---

## Accessibility

`<nav aria-label="Main navigation">`. Burger: `aria-expanded`, `aria-label="Toggle menu"`.
