# Button

| Type |
|---|
| 🧪 Molecule |

> Primary interactive control for triggering actions, submitting forms, and navigating flows.

**Figma:** Page `45:5` → Sections `81:880`, `108:2693`
**Code:** `src/components/molecules/Button/`

---

## Purpose

Buttons initiate actions. Each variant communicates a different level of emphasis and intent.

### When to use
- To trigger an action (submit, save, delete, navigate)
- As the primary CTA on a page or within a card
- For form submission and confirmation dialogs

### When NOT to use
- For navigation to another page → Use a link (`<a>`)
- For toggling state → Use Toggle or Checkbox
- For selecting from options → Use Radio, Checkbox, or Pill

---

## Usage Rules

### ✅ Do
- Use only one Primary button per visible area
- Include a visible text label — icon-only buttons need `aria-label`
- Use `loading` state during async operations to prevent double-submission

### ❌ Don't
- Don't stack multiple Primary buttons — use Primary + Secondary for paired actions
- Don't use Ghost for critical actions — too subtle
- Don't use Destructive for "Cancel" — Destructive is for irreversible actions like "Delete policy"

---

## States & Variants

### Variants

| Variant | Background | Text | When to use |
|---|---|---|---|
| Primary | Accent-600 | White | Main CTA, one per area |
| Secondary | Transparent, accent border | Accent-600 | Paired with Primary |
| Ghost | Transparent | Primary-900 | Tertiary/inline actions |
| Destructive | Destructive-550 | White | Irreversible actions |

### Sizes

| Size | Height | Font size |
|---|---|---|
| `sm` | 32px | 14px |
| `md` | 40px | 16px |
| `lg` | 48px | 18px |

### States

| State | Visual change | Trigger |
|---|---|---|
| Default | Variant base | — |
| Hover | Darker background | pointerenter |
| Active | Darkest background | pointerdown |
| Focused | 2px accent outline | `:focus-visible` |
| Disabled | 50% opacity | `disabled` prop |
| Loading | Spinner replaces content | `loading` prop |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Consider `fullWidth` for primary actions. Touch target minimum 48px (`lg`). |
| Desktop (≥ 768px) | Inline at natural width. `md` is default. |

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Hover | pointerenter | background | 150ms | ease |
| Press | pointerdown | background | 100ms | ease |
| Focus ring | focus-visible | outline | 0ms | instant |
| Loading spin | loading=true | transform | 600ms | linear infinite |

Reduced motion: spinner stops, replaced with static indicator.

---

## Accessibility

| Attribute | Value |
|---|---|
| Role | `button` (native) |
| `aria-busy` | `true` when loading |
| `aria-label` | Required for icon-only |

### Keyboard
| Key | Action |
|---|---|
| Tab | Focus |
| Enter / Space | Activate |
