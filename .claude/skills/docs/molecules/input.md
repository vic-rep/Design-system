# Input

| Type |
|---|
| 🧪 Molecule |

> Text input field with label, helper text, error states, and optional icons.

**Figma:** Page `45:8` → Section `158:247`
**Code:** `src/components/molecules/Input/`

---

## Purpose

Inputs collect user text data — names, emails, numbers, search queries. They support validation feedback and optional visual affordances (icons).

### When to use
- Single-line text entry (email, name, search, number)

### When NOT to use
- Multi-line text → Use a `<textarea>` component (⚠️ NOT IN SYSTEM)
- Selection from predefined options → Use ContextMenu/Select

---

## Usage Rules

### ✅ Do
- Always include a visible `<label>` above the input
- Show error messages below the input with red text
- Use `helperText` for format hints (e.g., "DD/MM/YYYY")
- Use left icon for input type indication (search, email), right icon for actions (clear, show/hide password)

### ❌ Don't
- Don't use placeholder text as a label replacement
- Don't show errors before the user has interacted with the field

---

## States & Variants

### Sizes

| Size | Height |
|---|---|
| `sm` | 32px |
| `md` | 40px |
| `lg` | 48px |

### States

| State | Visual | Trigger |
|---|---|---|
| Default | Primary-200 border | — |
| Focused | Accent-600 border | Focus |
| Error | Destructive-550 border + red helper text | `error` prop |
| Disabled | 50% opacity, no interaction | `disabled` |

---

## Accessibility

`<label>` linked via `htmlFor`. `aria-invalid="true"` on error. Helper/error text linked via `aria-describedby`.
