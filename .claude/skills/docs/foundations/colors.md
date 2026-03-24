# Colors

| Type |
|---|
| 🏗 Foundation |

> Defines the color palette, semantic roles, and usage rules for visual hierarchy, brand identity, and accessible contrast across the design system.

**Figma:** Page `1:42` → Section `78:9147`

---

## Purpose

The Colors foundation provides a complete, role-based color system. Every color has a semantic purpose — brand identity, text hierarchy, surface layering, interactive states, and feedback. Components reference semantic aliases rather than raw hex values, enabling future theming and dark mode without component changes.

### When to use
- When applying any color to UI elements — backgrounds, text, borders, icons, interactive states
- When creating new components — always use semantic aliases (`--text-primary`, `--interactive-primary`) not palette values (`--color-accent-600`)
- When checking contrast compliance — reference this document for approved color pairings

### When NOT to use
- For illustration or marketing materials that intentionally diverge from the system palette → Discuss with design team first
- For data visualization with many categories → Define a separate data-viz palette (⚠️ NOT SPECIFIED)

---

## Usage Rules

### ✅ Do
- Use semantic aliases for component styling — `--text-primary` not `--color-primary-900`
- Maintain surface layering order: Surface (page) → Adjacent (cards) → Adjacent 2 (nested) for natural depth
- Check contrast ratios before pairing text and background colors — use the approved pairings below
- Use the accent color sparingly — one primary CTA per visible area maximum

### ❌ Don't
- Don't use destructive red for non-error/non-destructive purposes → Use accent orange for emphasis instead
- Don't use multiple bright colors competing for attention → Let the accent stand alone against the neutral scale
- Don't use raw hex values in component code → Always reference CSS custom properties or TS constants
- Don't apply brand `#FFA500` directly to UI elements → Use accent-600 `#F76803` for interactive elements; brand is for logo/identity only

---

## States & Variants

### Brand
| Token | Value | Usage |
|---|---|---|
| Brand | `#FFA500` | Logo, brand identity only. Not for UI components. |

### Accent (Orange) — interactive elements, CTAs

| Step | Value | Usage |
|---|---|---|
| 900 | `#602901` | — |
| 800 | `#923E02` | Active/pressed state |
| 700 | `#C55302` | Hover state |
| 600 | `#F76803` | **Primary interactive** — buttons, links, focus rings |
| 500 | `#FC7D21` | — |
| 400 | `#FD9A54` | — |
| 300 | `#FEB886` | — |
| 200 | `#FED5B8` | Secondary button hover background |
| 100 | `#FFF3EB` | Subtle backgrounds, hover tints |

### Primary (Neutral) — text, borders, structure

| Step | Value | Usage |
|---|---|---|
| 900 | `#191919` | Primary text, headings |
| 800 | `#333333` | — |
| 700 | `#4D4D4D` | — |
| 600 | `#666666` | Secondary text |
| 500 | `#808080` | Tertiary text |
| 400 | `#999999` | Disabled text, placeholders |
| 300 | `#CCCCCC` | Strong borders, dividers |
| 200 | `#E6E6E6` | Default borders |
| 100 | `#F0F0F0` | Hover backgrounds, subtle fills |

### Surface — background layers

| Token | Value | Usage |
|---|---|---|
| Surface | `#F3F2F0` | Page background |
| Surface Adjacent | `#FFFFFF` | Cards, panels |
| Surface Adjacent 2 | `#E1E5EB` | Nested elements on cards |

### Constants

| Token | Value | Usage |
|---|---|---|
| White | `#FFFFFF` | Inverse text, button text on dark backgrounds |
| Black | `#191919` | Same as Primary-900 |

### Success (Green)

| Step | Value | Usage |
|---|---|---|
| 800 | `#006632` | Success text on light backgrounds |
| 700 | `#009147` | **Primary success** — icons, badges |
| 600 | `#4DB27E` | — |
| 400 | `#80C8A3` | — |
| 200 | `#B3DEC8` | — |
| 100 | `#E6F4ED` | **Success background** — alerts, badges |

### Warning (Amber)

| Step | Value | Usage |
|---|---|---|
| 600 | `#B86700` | Warning text on light backgrounds |
| 500 | `#E98300` | **Primary warning** — icons, badges |
| 400 | `#FF9D1F` | — |
| 300 | `#FFB352` | — |
| 200 | `#FFC985` | — |
| 100 | `#FFE0B8` | **Warning background** — alerts, badges |

### Destructive (Red)

| Step | Value | Usage |
|---|---|---|
| 600 | `#CC001B` | Destructive hover/active |
| 550 | `#FF0022` | **Primary destructive** — errors, destructive actions |
| 500 | `#FF0022` | — |
| 400 | `#FF4D64` | — |
| 300 | `#FF8091` | — |
| 200 | `#FFCCD3` | — |
| 100 | `#FFE6E9` | **Destructive background** — alerts, badges |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| All breakpoints | Colors do not change across breakpoints. The palette is static. |

---

## Interaction & Motion

No direct interactions — color tokens are consumed by components. When a component transitions between states (e.g., hover), the color change should use `transition: background 150ms ease, color 150ms ease`.

---

## Accessibility

### Approved text-on-background pairings (WCAG AA)

| Background | Text color | Ratio | Passes |
|---|---|---|---|
| Surface `#F3F2F0` | Primary-900 `#191919` | 12.4:1 | AA + AAA |
| Surface Adjacent `#FFF` | Primary-900 `#191919` | 14.7:1 | AA + AAA |
| Surface Adjacent `#FFF` | Primary-600 `#666` | 5.7:1 | AA |
| Accent-600 `#F76803` | White `#FFF` | 3.2:1 | AA Large text only |
| Accent-100 `#FFF3EB` | Accent-800 `#923E02` | 7.1:1 | AA + AAA |
| Success-100 `#E6F4ED` | Success-800 `#006632` | 7.8:1 | AA + AAA |
| Destructive-100 `#FFE6E9` | Destructive-600 `#CC001B` | 6.3:1 | AA |

⚠️ **Accent-600 on white** passes only for large text (≥24px or ≥18.66px bold). For small text on accent backgrounds, use white text on accent-600 background instead.
