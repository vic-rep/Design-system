# Carousel

| Type |
|---|
| ⛺ Template |

> Sliding content carousel with navigation arrows, dot indicators, and optional auto-play.

**Figma:** Page `3206:390` → Sections `3206:392`, `3210:1199`
**Code:** `src/components/templates/Carousel/`

---

## Purpose

Carousels present multiple content items (promotions, partner highlights, testimonials) in a space-efficient rotating format.

### When to use
- 3–8 items of equal importance that benefit from visual browsing

### When NOT to use
- Critical content that every user must see → Display all items statically
- More than 8 items → Use a grid or list

---

## States & Variants

CSS transform slide transition (300ms). Arrow buttons: prev/next, circular navigation. Dot indicators: active state is pill-shaped (24px wide). Optional auto-play with configurable interval (default 5s).

---

## Interaction & Motion

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Slide transition | transform | 300ms | ease |
| Dot activation | width + background | 150ms | ease |
| Arrow hover | box-shadow | 150ms | ease |

Auto-play pauses on hover and respects `prefers-reduced-motion`.

---

## Accessibility

Container: `aria-roledescription="carousel"`. Slides: `aria-roledescription="slide"`, `aria-label="Slide N of M"`. Dots: `role="tablist"` + `role="tab"`, `aria-selected`.
