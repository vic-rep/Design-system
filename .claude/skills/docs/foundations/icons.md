# Icons

| Type |
|---|
| 🏗 Foundation |

> Icon library powered by Font Awesome, providing consistent iconography across the design system.

**Figma:** Page `1:46` → Section `56:3`

---

## Purpose

Icons provide visual shortcuts for actions, status indicators, and navigation. The system uses **Font Awesome** as the icon library, loaded via a licensed kit embed.

### When to use
- As visual reinforcement alongside text labels in buttons, navigation, alerts
- As status indicators (checkmark, warning triangle, error circle, info circle)
- In icon-only contexts only when the meaning is universally understood (close, menu, search)

### When NOT to use
- As the sole means of communication → Always pair with text or `aria-label`
- For decorative purposes with no functional meaning → Use `aria-hidden="true"`
- For custom illustrations or brand marks → Use the Logo component or SVG assets

---

## Usage Rules

### ✅ Do
- Load Font Awesome via the licensed kit embed in the document `<head>`:
  ```html
  <script src="https://kit.fontawesome.com/5414e64bc6.js" crossorigin="anonymous"></script>
  ```
- Use Font Awesome class syntax: `<i class="fa-solid fa-triangle-exclamation"></i>`
- Always provide an accessible name — visible text label, `aria-label`, or `aria-labelledby`
- Use consistent sizing across contexts: 16px inline, 20px in buttons, 24px standalone
- Match icon color to adjacent text color using CSS `color` inheritance or explicit token

### ❌ Don't
- Don't use a CDN link other than the licensed kit above — it includes the correct Pro subset
- Don't mix Font Awesome with other icon libraries (Lucide, Material, etc.) in the same view
- Don't scale icons below 14px — they become unreadable
- Don't use color alone to convey meaning through icons → Pair with shape differences
- Don't install Font Awesome via npm as a separate dependency — the kit script handles loading

---

## States & Variants

### Sizes

| Size | Value | Class modifier | Usage |
|---|---|---|---|
| Small | 14px | `fa-sm` | Inline with small text, badges |
| Default | 16px | (none) | Inline with body text, form labels, alerts |
| Large | 20px | `fa-lg` | Buttons, navigation items |
| XL | 24px | `fa-xl` | Standalone icons, section headers, empty states |

### Styles

| Style | Class prefix | Usage |
|---|---|---|
| Solid | `fa-solid` | Default for most UI icons — filled, high contrast |
| Regular | `fa-regular` | Lighter alternative for less emphasis |

Use **Solid** as the default. Regular only when a lighter visual weight is explicitly needed.

### Common icons in the design system

| Context | Icon | Class |
|---|---|---|
| Warning alert | Triangle exclamation | `fa-solid fa-triangle-exclamation` |
| Error alert | Circle exclamation | `fa-solid fa-circle-exclamation` |
| Success alert | Circle check | `fa-solid fa-circle-check` |
| Info alert | Circle info | `fa-solid fa-circle-info` |
| Close / dismiss | Xmark | `fa-solid fa-xmark` |
| Chevron expand | Chevron down | `fa-solid fa-chevron-down` |
| Chevron collapse | Chevron up | `fa-solid fa-chevron-up` |
| Navigation menu | Bars | `fa-solid fa-bars` |
| Search | Magnifying glass | `fa-solid fa-magnifying-glass` |
| External link | Arrow up right | `fa-solid fa-arrow-up-right-from-square` |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| All | Icon sizes are constant across breakpoints. The font loads once via the kit script. |

---

## Interaction & Motion

Icons inherit transitions from their parent component. No icon-specific animations are defined. For loading spinners, use `fa-solid fa-spinner fa-spin`.

---

## Accessibility

- **Decorative icons** (paired with text): Add `aria-hidden="true"` to the `<i>` element
  ```html
  <i class="fa-solid fa-check" aria-hidden="true"></i> Success
  ```
- **Functional icons** (standalone, no text): Add `role="img"` and `aria-label`
  ```html
  <i class="fa-solid fa-xmark" role="img" aria-label="Close"></i>
  ```
- **Icon-only buttons**: The `<button>` gets the `aria-label`, the icon gets `aria-hidden="true"`
  ```html
  <button aria-label="Close dialog">
    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
  </button>
  ```
