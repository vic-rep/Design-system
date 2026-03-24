# Pagination

| Type |
|---|
| 🧪 Molecule |

> Page navigation with numbered pages and prev/next arrows.

**Figma:** Page `70:40` → Section `167:7840`
**Code:** `src/components/molecules/Pagination/`

---

## Purpose

Pagination breaks large datasets into navigable pages.

### When to use
- Lists with 20+ items (offer results, blog posts, search results)

### When NOT to use
- Infinite scroll contexts
- Small lists that fit on one page

---

## States & Variants

Shows up to 7 page numbers with ellipsis for gaps. Current page: accent fill, white text. Arrows disabled at boundaries.

---

## Accessibility

`<nav aria-label="Pagination">`. Current page: `aria-current="page"`. Arrow buttons: `aria-label="Previous/Next page"`.
