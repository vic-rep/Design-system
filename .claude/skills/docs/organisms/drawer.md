# Drawer

| Type |
|---|
| 🐿 Organism |

> Slide-in panel from screen edge for secondary content or navigation.

**Figma:** Page `448:5219`
**Code:** `src/components/organisms/Drawer/`

---

## Purpose

Drawers provide access to secondary content or navigation without leaving the current page context.

### When to use
- Mobile navigation menus
- Filters panel for search results
- Detail panels in list-detail layouts

### When NOT to use
- Primary content → Use a full page
- Quick confirmations → Use Modal
- Brief messages → Use Toast

---

## States & Variants

| Position | Animation | Use case |
|---|---|---|
| `right` | Slide from right | Default, detail panels |
| `left` | Slide from left | Navigation |
| `bottom` | Slide from bottom | Mobile actions, filters |

Level 5 elevation. Backdrop overlay. Configurable width.

---

## Interaction & Motion

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Slide in | transform | 250ms | ease |
| Backdrop fade | opacity | 200ms | ease |
| Close | Escape / overlay click | — | — |

Body scroll locked while open.

---

## Accessibility

`role="dialog"`, `aria-modal="true"`. Escape closes. Focus management on open/close.
