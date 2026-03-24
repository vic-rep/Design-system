# Pill

| Type |
|---|
| 🧪 Molecule |

> Small label for filtering, categories, or status indication.

**Figma:** Page `74:11` → Section `135:913`
**Code:** `src/components/molecules/Pill/`

---

## Purpose

Pills are compact labels indicating status, category, or filter state. They can be static or interactive (clickable for filtering).

### When to use
- Filter controls, category labels, status badges

### When NOT to use
- Removable selections → Use Tag
- Navigation → Use Tabs

---

## States & Variants

| Variant | Background | Text |
|---|---|---|
| `default` | Primary-100 | Primary-900 |
| `accent` | Accent-100 | Accent-800 |
| `success` | Success-100 | Success-800 |
| `warning` | Warning-100 | Warning-600 |
| `destructive` | Destructive-100 | Destructive-600 |

`selected` state: adds border emphasis. `onClick` → becomes interactive with `role="button"`.

---

## Accessibility

Interactive pills: `role="button"`, `tabIndex={0}`, Enter/Space activates.
