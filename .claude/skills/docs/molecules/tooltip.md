# Tooltip

| Type |
|---|
| 🧪 Molecule |

> Contextual help text that appears on hover/focus.

**Figma:** Page `97:1419` → Section `176:1927`
**Code:** `src/components/molecules/Tooltip/`

---

## Purpose

Tooltips provide supplementary information for UI elements that need brief explanation.

### When to use
- To explain icon-only buttons, truncated text, or unfamiliar terms
- To show keyboard shortcuts

### When NOT to use
- For essential information the user needs to complete a task → Use inline text or Alert
- For interactive content (links, buttons) → Use a Popover (⚠️ NOT IN SYSTEM)

---

## States & Variants

| Position | Description |
|---|---|
| `top` | Above trigger, centered |
| `bottom` | Below trigger, centered |
| `left` | Left of trigger, centered |
| `right` | Right of trigger, centered |

Dark background (Primary-900), white text, small arrow pointing to trigger.

---

## Interaction & Motion

| Interaction | Trigger | Duration |
|---|---|---|
| Show | pointerenter / focus | 200ms delay |
| Hide | pointerleave / blur | Instant |

---

## Accessibility

`role="tooltip"`. Trigger via hover and focus (keyboard accessible). Not for interactive content.
