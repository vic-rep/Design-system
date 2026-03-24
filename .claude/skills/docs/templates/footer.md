# Footer

| Type |
|---|
| ⛺ Template |

> Page footer with logo, link columns, legal text, and social links.

**Figma:** Page `2025:563` → Frame `2036:821`
**Code:** `src/components/templates/Footer/`

---

## Purpose

The Footer provides secondary navigation, legal information, and social links at the bottom of every page.

---

## Layout

Dark background (Primary-900). Flexbox: logo + column groups. Configurable FooterColumn array. Bottom bar with legal text + social icons, separated by border.

### Responsive

| Breakpoint | Change |
|---|---|
| < 768px | Stacked vertically. Centered bottom bar. |
| ≥ 768px | Horizontal layout with gap. |

---

## Accessibility

Links use sufficient contrast on dark background (Primary-400 on Primary-900 = 4.2:1, borderline AA). Social links: `aria-label` required.
