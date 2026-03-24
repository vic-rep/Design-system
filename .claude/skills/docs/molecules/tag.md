# Tag

| Type |
|---|
| 🧪 Molecule |

> Compact label with optional remove action for applied filters, selections, or metadata.

**Figma:** Page `3101:360` → Section `3101:453`
**Code:** `src/components/molecules/Tag/`

---

## Purpose

Tags represent user-applied values that can be removed (unlike Pills which are system-defined).

### When to use
- Applied filters, selected items, metadata labels

### When NOT to use
- Status indicators → Use Pill
- Non-removable categories → Use Pill

---

## States & Variants

| Variant | Background |
|---|---|
| `default` | Primary-100 |
| `accent` | Accent-100 |

Optional `onRemove` shows ✕ button. Remove button: `aria-label="Remove tag"`.

---

## Accessibility

Remove button is keyboard-focusable. `aria-label="Remove [tag name]"`.
