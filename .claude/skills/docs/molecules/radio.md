# Radio

| Type |
|---|
| 🧪 Molecule |

> Single selection from a group of mutually exclusive options.

**Figma:** Page `102:1630` → Section `105:1244`
**Code:** `src/components/molecules/Radio/`

---

## Purpose

Radio buttons let users select exactly one option from a group.

### When to use
- Mutually exclusive choices (payment frequency, coverage tier)

### When NOT to use
- Multiple selections → Use Checkbox
- Binary on/off → Use Toggle

---

## Usage Rules

### ✅ Do
- Always group radios in a `<fieldset>` with a `<legend>`
- Pre-select a default option when appropriate
- Provide a visible label for each radio

### ❌ Don't
- Don't use a single radio button alone — always 2+ options
- Don't use for toggleable states → Use Toggle

---

## States & Variants

| State | Visual | Trigger |
|---|---|---|
| Unselected | Empty circle, Primary-300 border | Default |
| Selected | Accent-600 border + filled dot | User selection |
| Disabled | 50% opacity | `disabled` prop |
| Focused | 2px accent outline | `:focus-visible` |

---

## Accessibility

Native `<input type="radio">` with `<label>`. Arrow keys navigate within group. Tab moves to/from group.
