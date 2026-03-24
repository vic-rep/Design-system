# Component Audit Checklists

Run these checklists during Step 1 of the documentation process. Every item that fails
becomes a question for the user. Group failures by severity: 🔴 Blocker, 🟡 Recommendation, 🔵 Clarification.

---

## Design Handoff Readiness (run first, all levels)

These checks verify that the Figma file itself is structured correctly before evaluating
the component's design completeness. A component can be perfectly designed but fail handoff
if the file is messy. Run these checks on the Figma node structure returned by MCP.

### Page organisation
- [ ] Component lives on the correct page matching its atomic level
- [ ] File follows the project template structure (not ad-hoc page naming)

Severity: Misplaced component → 🔵 Clarification

### Auto layout
- [ ] Component uses auto layout (not fixed positioning or manual placement)
- [ ] Gap and padding values come from the token library, not manual values
- [ ] No generic frame names like "Frame 1", "Frame 2", "Frame 3" — all layers are named
      descriptively (e.g., "icon-container", "label-wrapper", "action-row")
- [ ] Groups are avoided — auto layout frames used instead. Groups only as a last resort.

Severity guide:
- No auto layout at all → 🔴 Blocker (breaks responsive behavior and dev handoff)
- Generic frame names ("Frame 1") → 🟡 Recommendation (causes confusion in dev inspection)
- Groups used where auto layout would work → 🟡 Recommendation

### Alignment with design system guidelines
- [ ] Component uses values from the Design System token library (not custom one-off values)
- [ ] Only Radius, Gap, Padding, Colors, and Typography tokens are used to build the component
- [ ] No hard-coded values that bypass the token system

Severity guide:
- Custom values that bypass tokens → 🔴 Blocker
- Minor deviation from token system → 🟡 Recommendation

### Component library usage
- [ ] Component is built using the latest version of the design system library
- [ ] No detached instances — all sub-components still linked to their library source
- [ ] If this is a new component or a modification, it should be developed in a branch
      and synced with the design and front-end team before merging

Severity guide:
- Detached instances → 🔴 Blocker
- Outdated library version → 🟡 Recommendation
- No branch workflow for changes → 🔵 Clarification

### Responsive
- [ ] Component is responsive according to its auto-layout settings (flex/grid) at each breakpoint
- [ ] Auto layout constraints are set correctly for resize behavior

Severity: No responsive behavior → 🟡 Recommendation

### Error messages
- [ ] All error handling and edge cases are covered with designs
- [ ] Error states are not just text descriptions — they have designed visual states

Severity: Missing error state designs → 🔴 Blocker

### Dev readiness
- [ ] Component is marked "Ready for Dev" only when all updates are complete
- [ ] No work-in-progress elements left in the component frame
- [ ] All variants and states are finalized (not placeholder or draft)

Severity: Marked ready but incomplete → 🔴 Blocker

---

## Universal Checklist (all atomic levels)

### States & Variants
- [ ] Default/resting state exists and is clearly defined
- [ ] Hover state exists (for pointer devices)
- [ ] Active/pressed state exists
- [ ] Focused state exists with visible focus ring (not just browser default)
- [ ] Disabled state exists with clear visual distinction (not just opacity)
- [ ] Loading state exists (if the component can trigger async operations)
- [ ] Error state exists (if the component accepts input or can fail)
- [ ] Empty state exists (if the component displays data)
- [ ] Selected/active state exists (if the component is selectable)
- [ ] Read-only state exists (if the component has an editable mode)
- [ ] States are visually distinguishable from each other — no two states look identical
- [ ] State transitions are defined (what triggers each state change)

Severity guide:
- Missing default, hover, focus, disabled → 🔴 Blocker
- Missing loading, error, empty → 🟡 Recommendation (unless critical path)
- Unclear state transitions → 🔵 Clarification

### Accessibility
- [ ] ARIA role is appropriate (not generic `role="presentation"` on interactive elements)
- [ ] ARIA label or labelledby is specified for non-text elements
- [ ] Keyboard operable: can reach via Tab, activate via Enter/Space
- [ ] Focus order is logical (follows visual order or explicitly overridden with reason)
- [ ] Focus trap defined for overlay components (modals, dropdowns, popovers)
- [ ] Color is not the only indicator of state (redundant shape, icon, or text cue exists)
- [ ] Text color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] Non-text contrast meets WCAG AA (3:1 for UI components and meaningful graphics)
- [ ] Touch target is at least 44×44 CSS pixels on mobile
- [ ] Screen reader announcement is specified for dynamic content changes
- [ ] Reduced motion alternative exists for animations (prefers-reduced-motion)
- [ ] Component works without color (grayscale test)

Severity guide:
- Missing keyboard access, no focus indicator, contrast failure → 🔴 Blocker
- Missing ARIA attributes, no reduced motion → 🟡 Recommendation
- Touch target slightly under 44px, focus order unclear → 🔵 Clarification

### Design Tokens
- [ ] Colors reference design tokens, not hard-coded hex values
- [ ] Spacing values reference spacing tokens
- [ ] Typography references type tokens (font, size, weight, line-height)
- [ ] Border radius references radius tokens
- [ ] Shadow/elevation references elevation tokens
- [ ] No magic numbers — every value traces to a token or has explicit rationale

Severity guide:
- Hard-coded colors on interactive states → 🟡 Recommendation
- A single magic number without rationale → 🔵 Clarification

### Responsive
- [ ] Mobile behavior defined (320px minimum)
- [ ] Tablet behavior defined (768px)
- [ ] Desktop behavior defined (1024px+)
- [ ] The component does not overflow its container at any breakpoint
- [ ] Text truncation strategy is defined for constrained widths
- [ ] Touch vs pointer interaction differences are noted

Severity guide:
- No mobile behavior at all → 🟡 Recommendation
- Unclear truncation strategy → 🔵 Clarification

### Content
- [ ] Maximum character length is defined (or explicitly "no limit")
- [ ] Behavior with very long content is defined (truncate, wrap, scroll)
- [ ] Behavior with minimal/missing content is defined
- [ ] Localization: text expansion room (some languages use 30-40% more space)
- [ ] RTL layout behavior defined (if the system supports RTL)

---

## Atom-Specific Checklist

Everything from Universal, plus:

### State completeness (exhaustive for atoms)
- [ ] Every combination of variant × state is accounted for
      Example: a button with variants (primary, secondary, ghost) × states (default, hover,
      active, focused, disabled, loading) = 18 combinations. Each must be defined or explicitly
      marked as not applicable.
- [ ] Icon variants: with icon, without icon, icon-only (if applicable)
- [ ] Size variants: all sizes defined with explicit specs per size

### Micro-interactions
- [ ] Hover transition defined (property, duration, easing)
- [ ] Active/press feedback defined (scale, color shift, ripple)
- [ ] Focus ring animation defined (if animated)
- [ ] Loading animation defined (spinner, pulse, skeleton)
- [ ] Disabled state: does it show a tooltip explaining why? Should it?

### Reusability
- [ ] Component is truly atomic — no embedded layout assumptions
- [ ] Width behavior: does it fill container, hug content, or have fixed width?
- [ ] The component works in isolation and inside any parent container

---

## Molecule-Specific Checklist

Everything from Universal + Atom, plus:

### Composition
- [ ] Each atom within the molecule is identified and named
- [ ] Required vs optional atoms are marked
- [ ] Spacing between atoms is tokenized
- [ ] Alignment rules between atoms are defined (baseline, center, stretch)
- [ ] The molecule handles missing optional atoms gracefully (layout doesn't break)
- [ ] Instance swap points are documented (e.g., icon can be swapped)

### Molecule-level states
- [ ] The molecule has its own states beyond the sum of its atom states
      Example: a search bar molecule has a "searching" state that affects both the input
      and the button simultaneously. This is different from just the button being "loading."
- [ ] Validation state is defined (if the molecule contains input atoms)
- [ ] The molecule handles conflicting atom states gracefully
      Example: what happens if the input is focused but the button is disabled?

---

## Organism-Specific Checklist

Everything from Universal + Atom + Molecule, plus:

### Data & State
- [ ] Data model / expected props interface is defined
- [ ] Loading state: skeleton or spinner pattern for the whole organism
- [ ] Empty state: what shows when there's no data (illustration, message, CTA)
- [ ] Error state: what shows when data fetch fails (retry action, fallback)
- [ ] Partial data: what shows when some fields are missing from the data
- [ ] Pagination or virtualization strategy for large datasets
- [ ] Sorting and filtering interactions (if applicable)

### Internal interactions
- [ ] Interaction flow diagram or description (how sub-components communicate)
- [ ] Event bubbling: which events propagate to parent vs are handled internally
- [ ] Selection model: single, multi, or none (if applicable)
- [ ] Drag and drop behavior (if applicable)
- [ ] Undo/redo support (if applicable)

### Performance
- [ ] Lazy loading strategy for heavy content (images, charts)
- [ ] Debounce/throttle on user inputs that trigger data operations
- [ ] Maximum recommended number of items before performance degrades

---

## Template-Specific Checklist

Everything above, plus:

### Layout
- [ ] Flex/grid layout defined (direction, wrap, gap, alignment per region)
- [ ] Slot regions are clearly marked and named
- [ ] Each slot specifies which component types are allowed
- [ ] Responsive layout shifts are defined (sidebar collapses, stack reorder)
- [ ] Minimum and maximum content dimensions per slot
- [ ] Sticky/fixed elements are identified (headers, footers, sidebars)
- [ ] Scroll behavior per region (main scrolls, sidebar fixed, etc.)

### Navigation
- [ ] Navigation between related templates is documented (breadcrumbs, back actions)
- [ ] Deep linking support (URL structure, state restoration)
- [ ] Browser back button behavior is defined
