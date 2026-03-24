# Documentation Templates Per Atomic Level

These templates define the exact output structure for each level. **All templates share the
same core sections** in the same order. Design specs (tokens, typography, spacing, colors,
border radius) are documented in the Figma file itself and are NOT duplicated here.
Every field must be filled — use `⚠️ NOT SPECIFIED` for unknown values and `⚠️ ASSUMED`
for inferred values.

## Shared core sections (all levels)

Every component document — Foundation, Atom, Molecule, Organism, Template — uses these
sections in this exact order:

1. **Component Name & Type** — name, atomic level badge
2. **Purpose** — what it does, when to use, when not to use
3. **Usage Rules** — Do's and Don'ts
4. **States & Variants** — all visual/behavioral variations
5. **Responsive Behavior** — behavior per breakpoint
6. **Interaction & Motion** — every transition in the standard table format (ASK the user if not defined)
7. **Accessibility** — ARIA, keyboard, screen reader, contrast

Higher levels then add their specific sections after the core.

---

## Foundation Documentation Template

Foundations are the design tokens and primitives that components consume — typography
scales, color palettes, spacing systems, elevation, and icon libraries.

```markdown
# [Foundation Name]

| Type |
|---|
| 🏗 Foundation |

> [One-line description: what design decisions this foundation governs]

---

## Purpose

[Why this foundation exists. What consistency problem does it solve?]

### When to use
- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

### When NOT to use
- [Anti-pattern 1] → Use [alternative] instead
- [Anti-pattern 2] → Use [alternative] instead

---

## Usage Rules

### ✅ Do
- [Rule 1]
- [Rule 2]
- [Rule 3]

### ❌ Don't
- [Anti-pattern 1] → Instead, [correct approach]
- [Anti-pattern 2] → Instead, [correct approach]

---

## States & Variants

[Describe the foundation's variants — e.g., light/dark mode for colors, responsive
scale steps for spacing, weight variants for typography. For elevation, document the
levels and their intended usage.]

| Variant / Level | Usage | Notes |
|---|---|---|
| [Level 1] | [Cards, raised surfaces] | [Subtle lift] |
| [Level 2] | [Dropdowns, popovers] | [Mid-level overlay] |
| [Level 3] | [Modals, dialogs] | [High-level overlay] |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | [How this foundation adapts] |
| Tablet (768–1023px) | [Changes] |
| Desktop (≥ 1024px) | [Default behavior] |

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing | Notes |
|---|---|---|---|---|---|
| [Token transition] | [Theme switch / mode toggle] | [Affected properties] | [ms] | [easing] | [Notes] |

> Foundations rarely have direct interactions. If none exist, state: "No direct
> interactions — tokens are consumed by components which handle their own transitions."

---

## Accessibility

- [Contrast ratios for color tokens — which pairs meet WCAG AA/AAA]
- [Minimum type sizes for readability]
- [Spacing minimums for touch targets]
- [High-contrast mode considerations for elevation/shadow tokens]
```

---

## Atom Documentation Template

```markdown
# [Component Name]

| Type |
|---|
| ⚛️ Atom |

> [One-line description of what this component is and its primary purpose]

---

## Purpose

[1-2 sentences: what UI problem does this atom solve?]

### When to use
- [Scenario 1 — be specific, not generic]
- [Scenario 2]
- [Scenario 3]

### When NOT to use
- [Anti-pattern 1] → Use [alternative] instead
- [Anti-pattern 2] → Use [alternative] instead

---

## Usage Rules

### ✅ Do
- [Guideline 1 — with rationale]
- [Guideline 2 — with rationale]
- [Guideline 3 — with rationale]

### ❌ Don't
- [Anti-pattern 1 — with rationale] → Instead, [correct approach]
- [Anti-pattern 2 — with rationale] → Instead, [correct approach]

---

## States & Variants

### Variants

| Variant | Description | When to use |
|---|---|---|
| [Primary] | [Visual description] | [Scenario] |
| [Secondary] | [Visual description] | [Scenario] |
| [Ghost/Tertiary] | [Visual description] | [Scenario] |

### States

| State | Visual change | Trigger |
|---|---|---|
| Default | [description] | — |
| Hover | [description] | Pointer enters |
| Active/Pressed | [description] | Pointer down |
| Focused | [description] | Tab / programmatic focus |
| Disabled | [description] | `disabled` prop |
| Loading | [description] | Async action in progress |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | [changes] |
| Tablet (768–1023px) | [changes] |
| Desktop (≥ 1024px) | [default behavior] |

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing | Notes |
|---|---|---|---|---|---|
| Hover in | pointerenter | [property] | [ms] | [easing] | |
| Hover out | pointerleave | [property] | [ms] | [easing] | |
| Press | pointerdown | [property] | [ms] | [easing] | |
| Focus ring | focus-visible | [property] | [ms] | [easing] | |

Reduced motion: [what changes when prefers-reduced-motion is active]

> **If interaction specs are not defined in the Figma file, ASK the user:**
> - What should happen visually on hover? (elevation change, color shift, scale?)
> - What is the transition duration and easing? (suggest 200ms ease-out as default)
> - Is there a loading animation? (spinner, pulse, skeleton?)
> - Should animations be disabled for prefers-reduced-motion?

---

## Accessibility

| Attribute | Value | Notes |
|---|---|---|
| Role | [button / link / checkbox / etc.] | |
| aria-label | [value or "from content"] | Required when [condition] |

### Keyboard
| Key | Action |
|---|---|
| Tab | Move focus to/from component |
| Enter | [activate / submit] |
| Space | [activate / toggle] |
| Escape | [dismiss / cancel] (if applicable) |

### Screen reader
- Announces: "[what the screen reader says]"
- State changes announced via: [aria-live region / role change / aria-pressed]
```

---

## Molecule Documentation Template

Uses all Atom sections above (same structure, same order). No additional sections.
Molecules are documented identically to atoms — the distinction is classification only.

---

## Organism Documentation Template

Uses all Atom sections above (same structure, same order). No additional sections.
Organisms are documented identically to atoms — the distinction is classification only.

---

## Template Documentation Template

Uses all Atom sections above (same structure, same order), plus this additional section
inserted after Accessibility:

```markdown

---

## Layout

### Layout method
This template uses [flexbox / CSS grid / combination] for its overall structure.

| Region | Layout type | Direction | Wrap | Gap | Alignment | Notes |
|---|---|---|---|---|---|---|
| [Page wrapper] | [flex] | [column] | [no] | [token] | [stretch] | [Main stack] |
| [Content area] | [grid] | — | — | [token] | — | [e.g., auto-fill, minmax(300px, 1fr)] |

### Slot regions

| Slot name | Position | Accepted components | Required | Sizing |
|---|---|---|---|---|
| [header] | Top, full width | [Header organism] | Yes | [auto] |
| [sidebar] | Leading side | [Navigation organism] | No | [280px fixed] |
| [main] | Fill remaining | [Any content organism] | Yes | [flex: 1] |

### Responsive layout shifts
| Breakpoint | Change |
|---|---|
| < 768px | [How layout restructures for mobile] |
| 768–1023px | [Tablet adaptations] |
| ≥ 1024px | [Default desktop layout] |

### Sticky / Fixed elements
- [Element]: [behavior, z-index]

### Scroll behavior
- [Region]: [scroll behavior description]
```
