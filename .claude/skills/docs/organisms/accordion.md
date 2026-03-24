# Accordion

| Type |
|---|
| 🐿 Organism |

> Collapsible content sections with animated expand/collapse.

**Figma:** Page `624:17` → COMPONENT_SET `648:1547`
**Code:** `src/components/organisms/Accordion/`

---

## Purpose

Accordions organize content into collapsible sections, reducing visual complexity while keeping all content accessible.

### When to use
- FAQ sections, settings groups, progressive disclosure of details

### When NOT to use
- Content users need to see simultaneously → Use stacked sections
- Navigation between views → Use Tabs

---

## States & Variants

Single-open (default) or multi-open (`allowMultiple`). Chevron rotates 90° on open.

| State | Visual |
|---|---|
| Collapsed | Chevron → right, content hidden (max-height: 0) |
| Expanded | Chevron → down (rotated 90°), content revealed |
| Hover | Background Primary-100 on trigger |
| Disabled | 50% opacity, not interactive |

---

## Interaction & Motion

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Expand/collapse | max-height | 200ms | ease |
| Chevron rotate | transform | 200ms | ease |

---

## Accessibility

Trigger: `aria-expanded`. Content: `role="region"`, `aria-controls`. Keyboard: Enter/Space toggles.
