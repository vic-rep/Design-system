# Checkbox

| Type |
|---|
| 🧪 Molecule |

> Binary selection control with label and optional helper text.

**Figma:** Page `45:6` → Section `98:1621`
**Code:** `src/components/molecules/Checkbox/`

---

## Purpose

Checkboxes allow users to select one or more options from a set, or toggle a single boolean value.

### When to use
- Multiple selections from a list (e.g., coverage options)
- Single boolean toggle with a visible label (e.g., "I agree to terms")

### When NOT to use
- Mutually exclusive options → Use Radio
- Simple on/off without label → Use Toggle

---

## Usage Rules

### ✅ Do
- Always provide a visible text label
- Group related checkboxes with a fieldset and legend
- Use error state + helper text for validation

### ❌ Don't
- Don't use for mutually exclusive choices → Use Radio
- Don't pre-check optional checkboxes without user consent context

---

## States & Variants

| State | Visual | Trigger |
|---|---|---|
| Unchecked | Empty box, Primary-300 border | Default |
| Checked | Accent-600 fill + white checkmark | User click/tap |
| Indeterminate | ⚠️ NOT SPECIFIED | — |
| Disabled | 50% opacity | `disabled` prop |
| Error | Destructive-550 border | `error` prop |
| Focused | 2px accent outline | `:focus-visible` |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| All | Touch target includes label area. Minimum 44px tap zone on mobile. |

---

## Interaction & Motion

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Check/uncheck | background, border | 150ms | ease |

---

## Accessibility

Native `<input type="checkbox">` with `<label>`. `aria-invalid` on error. Helper text via `aria-describedby`.

| Key | Action |
|---|---|
| Tab | Focus |
| Space | Toggle |
