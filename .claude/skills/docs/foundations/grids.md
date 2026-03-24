# Layout & Container

| Type |
|---|
| 🏗 Foundation |

> Defines the container system for page-level content width and responsive margins. There is no column grid — layout is handled per-component using flexbox and auto-layout.

**Figma:** Page `1:29` → Section `56:118`

---

## Purpose

The layout system provides a simple container model: a fixed max-width on desktop and fluid margins on mobile. Individual components handle their own internal layout using flexbox. There is no CSS Grid column system.

### When to use
- For wrapping page-level content in a centered, max-width container
- For setting consistent horizontal margins across breakpoints

### When NOT to use
- For component-internal layout → Use flexbox with spacing tokens
- For complex multi-column layouts → Build with flexbox per-component, not a grid system

---

## Usage Rules

### ✅ Do
- Use the container class/component for all page-level content
- Use 20px horizontal margin on mobile for breathing room
- Center the container with `max-width: 1200px; margin: 0 auto` on desktop
- Let components define their own internal column structure using flexbox

### ❌ Don't
- Don't use CSS Grid `grid-template-columns` for page layout — there is no grid system
- Don't hard-code container widths per-component — always use the container wrapper
- Don't apply fixed widths on mobile — the container is fluid

---

## States & Variants

### Container

| Breakpoint | Max width | Horizontal margin | Behavior |
|---|---|---|---|
| Mobile (< 768px) | None (fluid) | 20px | Full-width minus margins. No max-width constraint. |
| Tablet (768px–1279px) | None (fluid) | 20px | Full-width minus margins. Component structure adapts per-component. |
| Desktop (≥ 1280px) | 1200px | auto (centered) | Fixed max-width, horizontally centered. |

### CSS Implementation

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-xl);  /* 20px */
  padding-right: var(--space-xl); /* 20px */
}
```

No media queries needed — `max-width` naturally kicks in only when the viewport exceeds 1200px + 40px padding = 1240px. Below that, the container is fluid with 20px margins.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Fluid container, 20px horizontal margins. Components stack vertically. |
| Tablet (768–1279px) | Fluid container, 20px horizontal margins. Tablet layouts are determined per-component — some go 2-column, others stay stacked. There is no system-level tablet grid. |
| Desktop (≥ 1280px) | Container caps at 1200px, centered. Components use their full allocated width. |

### Tablet layout note

There is no prescribed tablet column count. Each component decides its own tablet behavior:
- **Navigation**: full horizontal layout (same as desktop)
- **Offers list**: single-column cards (same as mobile)
- **Footer**: columns may wrap to 2×2 instead of 4-across
- **Forms**: may go 2-column for related fields

Document tablet behavior per-component in each component's doc, not here.

---

## Interaction & Motion

No direct interactions — the container is a static layout wrapper.

---

## Accessibility

- Content reflow: all content must be accessible at 320px width minimum (WCAG 1.4.10 Reflow)
- 20px margins ensure content doesn't touch screen edges on small devices
