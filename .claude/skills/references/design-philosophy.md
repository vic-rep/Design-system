# Design Philosophy & Rules

> The governing principles, constraints, and decision framework for the Trusti design system.

---

## Brand Identity

Trusti is an online insurance comparison broker serving the Italian and Bulgarian markets. The 2026 rebrand positions Trusti as a **calm, trustworthy digital alternative** to traditional brick-and-mortar insurance brokers. Every design decision reinforces this positioning.

### Voice

**Calm confidence.** The visual language is quiet, not loud. It earns trust through clarity, not through persuasion tactics. The interface should feel like a knowledgeable friend who happens to know everything about insurance — approachable, unhurried, direct.

### Core Principles

1. **Transparency first** — No hidden fees, no buried terms. Surface cost breakdowns early. Transparency messaging around pricing was the strongest trust signal in user research.

2. **Value before data** — Never ask for personal information before explaining what the user gets in return. Premature data requests were the top trust-killer in Italian focus groups.

3. **Technology serves, not leads** — AI and automation power the product but should be invisible to users. Leading with AI features created anxiety in research. Users want the result, not the mechanism.

4. **Restraint over decoration** — Every element earns its place. Remove anything that doesn't help the user make a decision. White space is a feature, not wasted space.

5. **Accessible by default** — WCAG AA minimum across all components. The insurance audience spans all demographics and ability levels.

---

## Design Tokens — Rules of Use

### Token-first mandate

**Never hard-code values.** Every color, font size, spacing value, shadow, and border radius must reference a design token — either via CSS custom property (`var(--color-accent-600)`) or TypeScript constant (`accent[600]`). Hard-coded values create drift, make theming impossible, and break dark mode (when introduced).

### Color usage

- **One primary CTA color per visible area.** The accent-600 orange is high-contrast and attention-grabbing. Using it on multiple competing elements dilutes its power.
- **Semantic colors mean what they say.** Green = success/positive. Amber = caution/attention. Red = error/destructive/irreversible. Never use red for a non-destructive action, even if it "looks nice."
- **Surface layering creates depth.** Surface (page background) → Surface Adjacent (cards) → Surface Adjacent 2 (nested elements). This layering replaces heavy shadows for most depth cues.
- **Text hierarchy via the neutral scale.** Primary-900 for headings and primary content. Primary-600 for secondary text. Primary-500 for tertiary. Primary-400 for disabled. Don't invent in-between values.

### Typography usage

- **Semantic heading order matters.** H1 is the page title — one per page. H2 for major sections. Don't skip levels for visual effect; use the correct heading level and adjust visually with a different token if needed.
- **Two emphasis weights only.** Regular (400) for body text. Medium (500) for emphasis within body text. SemiBold (600) reserved for headings H1–H4 only. Don't use 600 for labels or buttons-within-paragraphs.
- **768px is the single typography breakpoint.** Below = mobile scale. Above = desktop scale. No intermediate tablet-specific type sizes.
- **Line-height 1.2 everywhere** except Mobile/Text Small (1.3) and Mobile/Caption (1.3). Don't override per-component.
- **Use spacing tokens for all typography-related spacing.** Heading margin-bottom, paragraph spacing, label-to-input gaps — all must use tokens from the Spacing foundation (M for heading-to-body, L for paragraph-to-paragraph, XS for label-to-input). See `docs/foundations/typography.md` for the full spacing table.

### Icon usage

- **Font Awesome is the icon library.** Loaded via licensed kit embed:
  ```html
  <script src="https://kit.fontawesome.com/5414e64bc6.js" crossorigin="anonymous"></script>
  ```
- **Use Solid style by default.** Regular only when lighter visual weight is explicitly needed.
- **Don't mix icon libraries.** No Lucide, Material, or custom SVG icons alongside Font Awesome.
- **Decorative icons get `aria-hidden="true"`.** Functional icons get `role="img"` + `aria-label`.

### Spacing usage

- **T-shirt sizes communicate intent.** Say "L padding" in design reviews, not "16px padding." The naming convention bridges design and engineering vocabulary.
- **Consistent internal/external rhythm.** Components use S (8px) or M (12px) for internal gaps. L (16px) or XL (20px) between sibling components. XXL+ (24px–64px) for section-level spacing.
- **The 2px grid is sacred.** Every spacing value is a multiple of 2. If a layout requires 6px, use XS (4px) or S (8px) — never introduce off-grid values.

### Elevation usage

- **Level matches interaction context:**

| Level | Context | Example |
|---|---|---|
| Level 1 | Resting raised elements | Cards, table rows on hover |
| Level 2 | Interactive overlays | Dropdowns, context menus, hover cards |
| Level 3 | Attention-requiring overlays | Toasts, popovers, tooltips |
| Level 4 | Focused overlays | Modals, dialogs |
| Level 5 | Full takeovers | Drawers, mobile navigation |

- **Don't combine adjacent levels.** A modal (L4) containing a dropdown (L2) is fine — they're separated by the modal backdrop. But two L2 elements overlapping each other creates visual confusion.

---

## Component Design Rules

### States — every interactive component needs all six

1. **Default** — how it looks at rest
2. **Hover** — pointer enters (desktop only; skip on touch)
3. **Active / Pressed** — pointer down or touch active
4. **Focused** — keyboard focus via Tab (must use `:focus-visible`, never `:focus`)
5. **Disabled** — not interactive; always 50% opacity of default state
6. **Loading** — async action in progress; show spinner or skeleton, set `aria-busy`

If a state is intentionally omitted, document it with `⚠️ INTENTIONALLY EXCLUDED` and rationale.

### Accessibility — non-negotiable minimums

- **Contrast:** 4.5:1 for normal text (<24px), 3:1 for large text (≥24px or ≥18.66px bold), 3:1 for UI components and graphical objects
- **Touch targets:** 44×44px minimum on mobile
- **Keyboard:** Every interactive element reachable via Tab. Activation via Enter and/or Space. Escape to dismiss overlays.
- **Screen readers:** Every interactive element has a programmatically accessible name (visible label, `aria-label`, or `aria-labelledby`). State changes announced via appropriate ARIA attributes.
- **Motion:** Respect `prefers-reduced-motion`. When active: disable animations, transitions complete instantly, auto-play pauses.

### Responsive — the container system

There is no CSS Grid column system. Layout uses a simple container with fluid margins.

| Breakpoint | Name | Container | Behavior |
|---|---|---|---|
| 0–767px | Mobile | Fluid, 20px margins | Single-column layouts. Touch-first. Stacked navigation. |
| 768–1023px | Tablet Portrait | Fluid, 20px margins | Layout adapts per-component (some go 2-column, others stay stacked). |
| 1024–1279px | Tablet Landscape | Fluid, 20px margins | Components may use wider layouts. Navigation expanded. |
| 1280px+ | Desktop | Max 1200px, centered | Fixed max-width, full experience. |

Tablet layouts are not prescribed at the system level — each component decides its own
tablet behavior. Document this in the component's own responsive section.

**Mobile-first CSS.** Write base styles for mobile, then add complexity at wider breakpoints.

---

## Component Composition Rules

### Atoms build Molecules

Molecules are 2–4 atoms with a single focused purpose. The rule: if you can describe it as "[Atom A] + [Atom B] doing [one thing]," it's a molecule. If it does more than one thing, it's an organism.

### Molecules build Organisms

Organisms are self-contained UI sections. They own their data model, their loading/error/empty states, and their internal interaction flows. A molecule delegates all of this to its parent.

### Templates define layout, not content

Templates are page-level layout shells with named slot regions. They accept organisms and molecules as children but never render content directly. A template with hard-coded content is a page, not a template.

---

## Anti-Patterns to Avoid

1. **The rainbow card** — Don't use a different accent color per card/section to create "visual variety." Use the neutral scale for structure, accent for the one element that matters most.

2. **The social proof carpet bomb** — Repeating Google review ratings on every surface undermines trust (confirmed in Italian focus groups). Use social proof once, prominently, then let the product speak.

3. **The data gate** — Asking for email/phone/personal details before showing any value. Always show what the user gets first: quotes, comparisons, savings estimates. Then ask for data to finalize.

4. **The AI badge** — Labeling features as "AI-powered" or "Smart" creates user anxiety, not excitement. The AI should be invisible — users see fast, accurate results, not the technology behind them.

5. **The overloaded modal** — Modals are for focused decisions (confirm, cancel, choose one thing). If a modal needs scrolling, it should probably be a page. If it has more than 2 actions, rethink the flow.

---

## File Naming & Organization

| Type | Directory | File naming |
|---|---|---|
| Foundation docs | `docs/foundations/` | `typography.md`, `colors.md`, etc. |
| Molecule docs | `docs/molecules/` | `button.md`, `alert.md`, etc. |
| Organism docs | `docs/organisms/` | `modal.md`, `accordion.md`, etc. |
| Template docs | `docs/templates/` | `navigation.md`, `footer.md`, etc. |
| Component code | `src/components/{level}/{Name}/` | `index.tsx` + `styles.module.css` |
| Token code | `src/tokens/` | `colors.ts`, `typography.ts`, etc. |
| CSS tokens | `src/styles/` | `tokens.css`, `global.css`, `reset.css` |
