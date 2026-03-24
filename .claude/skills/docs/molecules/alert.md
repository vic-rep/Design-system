# Alert

| Type |
|---|
| 🧪 Molecule |

> Collapsible notification banner with title, description, and optional action buttons. Behaves like a single-item accordion — collapsed shows title only, expanded reveals description and actions.

**Figma:** Page `45:13` → Section `161:786` → Variants: `Type=Warning|Error|Info|Success` × `Expanded=True|False`
**Code:** `src/components/molecules/Alert/`

---

## Purpose

Alerts communicate important information, status changes, or required actions. They use a collapsible accordion pattern — the title is always visible, and users expand to read details and take action. This keeps the UI clean when multiple alerts are present while ensuring critical information is accessible.

### When to use
- To inform users of successful actions, errors, warnings, or important information
- For form validation summaries at the top of a form
- For system-wide announcements within a page section
- When multiple alerts may be present simultaneously — the collapsed state prevents visual overload

### When NOT to use
- For brief, auto-dismissing notifications → Use Toast
- For inline field-level validation → Use Input's error state
- For confirmation of destructive actions → Use Modal
- For static, non-collapsible banners → This component always has collapse behavior

---

## Usage Rules

### ✅ Do
- Include a clear, scannable title — users see this in collapsed state and decide whether to expand
- Keep description text concise and actionable — what happened, what to do next
- Use optional buttons for actions the user can take directly from the alert (e.g., "Retry", "View details")
- Use the appropriate variant for the message severity
- Default to collapsed state for non-critical alerts (info, success)
- Default to expanded state for critical alerts (error, warning)

### ❌ Don't
- Don't use alerts for success messages that could be toasts → Alerts are persistent, toasts are transient
- Don't stack more than 3 alerts — consolidate messages or use a different pattern
- Don't put long-form content in the description — keep it to 1–2 sentences
- Don't use more than 2 action buttons — one primary (Secondary button) and one link-style button maximum

---

## States & Variants

### Variants (Type)

| Variant | Background | Border | Icon (Font Awesome) | Usage |
|---|---|---|---|---|
| `warning` | Warning-100 (`#FFE0B8`) | Warning-500 (`#E98300`) | `fa-solid fa-triangle-exclamation` | Conditions needing attention, upcoming expirations |
| `error` | Destructive-100 (`#FFE6E9`) | Destructive-550 (`#FF0022`) | `fa-solid fa-circle-exclamation` | Errors demanding immediate attention |
| `info` | Primary-100 (`#F0F0F0`) | Primary-300 (`#CCCCCC`) | `fa-solid fa-circle-info` | Informational messages, tips |
| `success` | Success-100 (`#E6F4ED`) | Success-700 (`#009147`) | `fa-solid fa-circle-check` | Completion confirmations |

Icon color: Accent-600 (`#F76803`) for warning, variant's primary color for others. Title color: `#000000` (black). Description color: `#000000` (black).

### Expanded State (Expanded)

| State | Shows | Chevron |
|---|---|---|
| Collapsed (`expanded=false`) | Icon + Title + Chevron down | `fa-solid fa-chevron-down` |
| Expanded (`expanded=true`) | Icon + Title + Chevron up + Description + Buttons | `fa-solid fa-chevron-up` |

### Anatomy (expanded)

```
┌─────────────────────────────────────────────────┐
│  [icon]  Title text                    [chevron] │  ← Always visible (collapsed header)
│                                                  │
│  Description text goes here                      │  ← Visible when expanded
│                                                  │
│  [ Button text ]   Button text                   │  ← Optional buttons when expanded
│   (Secondary S)    (Link S)                      │
└─────────────────────────────────────────────────┘
```

### Button slots

| Slot | Button type | Size | Required |
|---|---|---|---|
| Primary action | Secondary (outlined) | Small (`sm`) | Optional |
| Secondary action | Link (text-only) | Small (`sm`) | Optional |

Both buttons use the existing Button component at size `sm`. The button row has `L` (16px) gap between buttons.

### Component states

| State | Visual change | Trigger |
|---|---|---|
| Collapsed | Only header row visible (icon + title + chevron-down) | Default or user collapse |
| Expanded | Full content visible (header + description + buttons + chevron-up) | User click on header |
| Hover (header) | Subtle background darkening | pointerenter on header row |
| Focused | 2px accent outline on the header trigger | `:focus-visible` |

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'warning' \| 'error' \| 'info' \| 'success'` | `'info'` | Visual style and icon |
| `title` | `string` | required | Always-visible title text |
| `description` | `string \| ReactNode` | — | Expandable body content |
| `expanded` | `boolean` | `false` | Controlled expand state |
| `defaultExpanded` | `boolean` | `false` | Uncontrolled initial state |
| `onToggle` | `(expanded: boolean) => void` | — | Callback on expand/collapse |
| `primaryAction` | `{ label: string; onClick: () => void }` | — | Secondary button in footer |
| `secondaryAction` | `{ label: string; onClick: () => void }` | — | Link button in footer |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| All breakpoints | Full-width within parent container. Text wraps naturally. Buttons stack horizontally with L gap. On very narrow screens, buttons may wrap to a second line. |

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing | Notes |
|---|---|---|---|---|---|
| Expand | Click/tap on header | max-height, opacity | 200ms | ease | Content slides down |
| Collapse | Click/tap on header | max-height, opacity | 200ms | ease | Content slides up |
| Chevron rotate | Expand/collapse | transform (rotate) | 200ms | ease | 0° collapsed → 180° expanded |
| Header hover | pointerenter | background-color | 150ms | ease | Subtle darkening |

Reduced motion: expand/collapse happens instantly (no animation). Chevron flips without transition.

---

## Accessibility

| Attribute | Value | Notes |
|---|---|---|
| Role | `alert` on the container | Live region for screen readers |
| Header button | `aria-expanded="true|false"` | Announces expand state |
| Content region | `role="region"` | Linked to header via `aria-controls` |
| Chevron icon | `aria-hidden="true"` | Decorative, state communicated via `aria-expanded` |
| Alert icon | `aria-hidden="true"` | Decorative, variant communicated via container context |

### Keyboard

| Key | Action |
|---|---|
| Tab | Focus the alert header |
| Enter / Space | Toggle expand/collapse |
| Tab (when expanded) | Move focus to action buttons inside |

### Screen reader

- On render: announces title text immediately (due to `role="alert"`)
- On expand: announces "expanded" state change
- Action buttons are announced with their labels when focused
