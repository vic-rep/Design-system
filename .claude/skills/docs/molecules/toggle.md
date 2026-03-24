# Toggle

| Type |
|---|
| 🧪 Molecule |

> Binary on/off switch control.

**Figma:** Page `74:39` → Section `176:1866`
**Code:** `src/components/molecules/Toggle/`

---

## Purpose

Toggles represent an immediate on/off state change — the effect happens instantly, not on form submit.

### When to use
- Instant preference switches (notifications, dark mode, feature flags)

### When NOT to use
- Form submission context → Use Checkbox
- Multiple selections → Use Checkbox group

---

## States & Variants

| State | Track | Thumb | Trigger |
|---|---|---|---|
| Off | Primary-300 | Left position | Default |
| On | Accent-600 | Right position (translateX 20px) | User toggle |
| Disabled | 50% opacity | — | `disabled` prop |
| Focused | 2px accent outline on track | — | `:focus-visible` |

---

## Interaction & Motion

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Toggle on/off | background + transform | 150ms | ease |

---

## Accessibility

`role="switch"` on native `<input type="checkbox">`. Keyboard: Space toggles.
