# Design System Documentation Skill

This skill defines the complete design system component library. It serves as the single source of truth for all component definitions, behaviors, variants, and Figma design references.

**Figma File**: `nG8PGu5CclffafrfZuMG9G`
**Figma URL Base**: `https://www.figma.com/design/nG8PGu5CclffafrfZuMG9G/Design-System-Rebuild`

## Figma REST API Method

To retrieve design specs from Figma, use the Figma REST API:

```
GET https://api.figma.com/v1/files/{fileKey}/nodes?ids={nodeId}
Headers: X-Figma-Token: <FIGMA_ACCESS_TOKEN>
```

The app includes a server-side API route at `/api/figma/[nodeId]` that proxies requests to the Figma API. Set the `FIGMA_ACCESS_TOKEN` environment variable to enable this.

### Usage in components:
```typescript
const response = await fetch(`/api/figma/${encodeURIComponent(nodeId)}`);
const data = await response.json();
// data.nodes[nodeId] contains the design spec
```

---

## Design Tokens

### Colors
| Token | Light | Dark | Figma Node |
|-------|-------|------|------------|
| --color-primary | #463FDA | #6C63FF | 1:2 |
| --color-primary-hover | #3832B0 | #7D75FF | 1:2 |
| --color-on-primary | #FFFFFF | #FFFFFF | 1:2 |
| --color-surface | #FFFFFF | #0A0A0B | - |
| --color-surface-alt | #F8F8FA | #111113 | - |
| --color-on-surface | #1A1A2E | #E4E4E7 | - |
| --color-on-surface-muted | #71717A | #A1A1AA | - |
| --color-border | #E4E4E7 | #27272A | - |
| --color-secondary | #F4F4F5 | #1C1C1F | - |
| --color-secondary-hover | #E4E4E7 | #27272A | - |
| --color-accent | #463FDA | #6C63FF | 1:2 |
| --color-success | #22C55E | #4ADE80 | - |
| --color-warning | #F59E0B | #FBBF24 | - |
| --color-error | #EF4444 | #F87171 | - |
| --color-info | #3B82F6 | #60A5FA | - |

### Typography
| Token | Value | Figma Node |
|-------|-------|------------|
| --font-sans | 'Poppins', system-ui, sans-serif | 1:23 |
| --font-mono | 'JetBrains Mono', monospace | - |
| --text-xs | 0.75rem / 1rem | - |
| --text-sm | 0.875rem / 1.25rem | - |
| --text-base | 1rem / 1.5rem | - |
| --text-lg | 1.125rem / 1.75rem | - |
| --text-xl | 1.25rem / 1.75rem | - |
| --text-2xl | 1.5rem / 2rem | - |
| --text-3xl | 1.875rem / 2.25rem | - |

### Spacing
| Token | Value |
|-------|-------|
| --space-1 | 0.25rem |
| --space-2 | 0.5rem |
| --space-3 | 0.75rem |
| --space-4 | 1rem |
| --space-6 | 1.5rem |
| --space-8 | 2rem |
| --space-12 | 3rem |
| --space-16 | 4rem |

### Border Radius
| Token | Value |
|-------|-------|
| --radius-sm | 0.25rem |
| --radius-md | 0.375rem |
| --radius-lg | 0.5rem |
| --radius-xl | 0.75rem |
| --radius-full | 9999px |

---

## Component Registry

### Atoms

#### Button
- **Figma Node**: `1:2`
- **Variants**: `primary`, `secondary`, `ghost`, `danger`, `outline`
- **Sizes**: `sm`, `md`, `lg`
- **States**: `default`, `hover`, `active`, `disabled`, `loading`
- **Props**:
  - `variant`: string (default: "primary")
  - `size`: string (default: "md")
  - `disabled`: boolean
  - `loading`: boolean
  - `icon`: ReactNode (optional leading icon)
  - `children`: ReactNode
- **Behavior**: On click triggers `onClick` handler. Loading state shows spinner and disables interaction. Focus ring on keyboard navigation.

#### Input
- **Figma Node**: `1:2`
- **Variants**: `default`, `filled`, `outline`
- **Sizes**: `sm`, `md`, `lg`
- **States**: `default`, `focus`, `error`, `disabled`
- **Props**:
  - `label`: string (optional)
  - `placeholder`: string
  - `error`: string (optional error message)
  - `helperText`: string (optional)
  - `type`: string (default: "text")
  - `disabled`: boolean
- **Behavior**: Shows label above, error message below in red, helper text in muted color. Focus ring on interaction.

#### Badge
- **Figma Node**: `1:2`
- **Variants**: `default`, `primary`, `success`, `warning`, `error`, `info`
- **Sizes**: `sm`, `md`
- **Props**:
  - `variant`: string (default: "default")
  - `size`: string (default: "sm")
  - `children`: ReactNode
- **Behavior**: Inline display, no interaction.

#### Toggle
- **Figma Node**: `1:2`
- **Sizes**: `sm`, `md`
- **States**: `on`, `off`, `disabled`
- **Props**:
  - `checked`: boolean
  - `onChange`: function
  - `disabled`: boolean
  - `size`: string (default: "md")
  - `label`: string (optional)
- **Behavior**: Click toggles state. Smooth transition animation on thumb. Keyboard accessible with Space key.

#### Typography
- **Figma Node**: `1:23`
- **Variants**: `h1`, `h2`, `h3`, `h4`, `body`, `caption`, `overline`, `code`
- **Props**:
  - `variant`: string (default: "body")
  - `as`: string (optional HTML element override)
  - `muted`: boolean
  - `children`: ReactNode
- **Behavior**: Renders appropriate HTML element based on variant. `as` prop allows element override.

#### Icon
- **Figma Node**: `1:2`
- **Sizes**: `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px)
- **Props**:
  - `name`: string (icon identifier)
  - `size`: string (default: "md")
  - `className`: string (optional)
- **Behavior**: Renders SVG icon. Uses currentColor for fill.
- **Available Icons**: `chevron-down`, `chevron-right`, `search`, `sun`, `moon`, `menu`, `x`, `check`, `alert`, `info`, `copy`, `external-link`, `github`, `figma`

### Molecules

#### SearchBar
- **Figma Node**: `1:2`
- **Props**:
  - `placeholder`: string (default: "Search components...")
  - `value`: string
  - `onChange`: function
- **Behavior**: Input with search icon. Filters component list in real-time. Clear button appears when value is non-empty.

#### FormField
- **Figma Node**: `1:2`
- **Props**:
  - `label`: string
  - `required`: boolean
  - `error`: string (optional)
  - `helperText`: string (optional)
  - `children`: ReactNode (input element)
- **Behavior**: Wraps an input with label, required indicator, error and helper text.

#### Card
- **Figma Node**: `1:2`
- **Variants**: `default`, `outlined`, `elevated`
- **Props**:
  - `variant`: string (default: "default")
  - `padding`: string (default: "md")
  - `children`: ReactNode
  - `header`: ReactNode (optional)
  - `footer`: ReactNode (optional)
- **Behavior**: Container with optional header/footer. Subtle border, no strong shadow to maintain minimalist style.

#### Tooltip
- **Figma Node**: `1:2`
- **Props**:
  - `content`: string
  - `position`: "top" | "bottom" | "left" | "right" (default: "top")
  - `children`: ReactNode (trigger element)
- **Behavior**: Shows on hover after 200ms delay. Hides on mouse leave. Positioned relative to trigger.

### Organisms

#### Navbar
- **Figma Node**: `1:2`
- **Props**:
  - `title`: string
  - `onThemeToggle`: function
  - `isDark`: boolean
- **Behavior**: Sticky top bar with title, theme toggle, and optional actions. Same background as surface (no contrast).

#### Sidebar
- **Figma Node**: `1:2`
- **Props**:
  - `sections`: Array of { title: string, items: Array of { id, label, href } }
  - `activeId`: string
  - `onNavigate`: function
- **Behavior**: Fixed left sidebar with atomic design category sections. Anchor links for navigation. Same background as content (no contrast). Active item highlighted with primary color left border.

#### DataTable
- **Figma Node**: `1:2`
- **Props**:
  - `columns`: Array of { key, label, width? }
  - `rows`: Array of Record<string, any>
  - `sortable`: boolean
  - `onSort`: function
- **Behavior**: Sortable columns with click. Alternating row tint. Responsive horizontal scroll.

#### Modal
- **Figma Node**: `1:2`
- **Sizes**: `sm`, `md`, `lg`
- **Props**:
  - `isOpen`: boolean
  - `onClose`: function
  - `title`: string
  - `size`: string (default: "md")
  - `children`: ReactNode
  - `footer`: ReactNode (optional)
- **Behavior**: Centered overlay. Backdrop click closes. Escape key closes. Focus trap inside. Animated enter/exit.

### Templates

#### DashboardLayout
- **Figma Node**: `1:2`
- **Props**:
  - `sidebar`: ReactNode
  - `navbar`: ReactNode
  - `children`: ReactNode
- **Behavior**: Full-page layout with sidebar, navbar and main content area. Responsive: sidebar collapses on mobile.

#### AuthLayout
- **Figma Node**: `1:2`
- **Props**:
  - `children`: ReactNode
  - `title`: string
  - `subtitle`: string
- **Behavior**: Centered card on a minimal background. Used for login/register flows.

---

## Atomic Design Navigation Structure

```
Atoms
├── Button
├── Input
├── Badge
├── Toggle
├── Typography
└── Icon

Molecules
├── SearchBar
├── FormField
├── Card
└── Tooltip

Organisms
├── Navbar
├── Sidebar
├── DataTable
└── Modal

Templates
├── DashboardLayout
└── AuthLayout
```

---

## Build Integration

On every build, the script at `scripts/load-design-docs.js` reads this skill file and generates:
1. `src/lib/generated/component-registry.json` — parsed component metadata
2. `src/lib/generated/design-tokens.json` — parsed design tokens

Components read from these generated files to determine their variants, props, and Figma references. This means updating THIS skill file automatically updates component behavior on the next build.

---

## Version
Current version: 1.0.0
Last updated: 2026-03-24
