# Slider

| Type |
|---|
| 🧪 Molecule |

> Range input with draggable thumb for numeric value selection.

**Figma:** Page `493:5220` → COMPONENT_SET `594:468`
**Code:** `src/components/molecules/Slider/`

---

## Purpose

Sliders let users select a value from a continuous range (coverage amount, loan term, price range).

---

## States & Variants

| State | Visual | Trigger |
|---|---|---|
| Default | Accent fill up to thumb, Primary-200 remaining | — |
| Hover | Elevated thumb shadow (L2) | pointerenter on thumb |
| Dragging | Active drag | pointerdown + move |
| Disabled | 50% opacity | `disabled` |
| Focused | 2px accent outline on thumb | `:focus-visible` |

Optional label and value display.

---

## Accessibility

Native `<input type="range">`. Label via `htmlFor`. Keyboard: arrow keys adjust value.
