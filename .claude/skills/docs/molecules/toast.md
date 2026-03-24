# Toast

| Type |
|---|
| 🧪 Molecule |

> Temporary notification that appears and auto-dismisses.

**Figma:** Page `2434:9541`
**Code:** `src/components/molecules/Toast/`

---

## Purpose

Toasts provide brief, non-blocking feedback for completed actions. They appear, then disappear automatically.

### When to use
- Confirmation of non-critical actions (saved, uploaded, sent)
- Brief system status updates

### When NOT to use
- Persistent messages → Use Alert
- Error states requiring action → Use Alert (destructive)
- Confirmation before action → Use Modal

---

## States & Variants

| Variant | Background | Text |
|---|---|---|
| `info` | Primary-900 | White |
| `success` | Success-800 | White |
| `warning` | Warning-600 | Black |
| `destructive` | Destructive-600 | White |

Auto-dismiss after 5s (configurable). Optional action button + dismiss button.

---

## Interaction & Motion

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Enter | opacity + translateY | 200ms | ease |
| Exit | opacity + translateY | 200ms | ease |

---

## Accessibility

`role="status"`, `aria-live="polite"`. Dismiss button: `aria-label="Dismiss"`.
