---
name: design-system-docs
description: >
  Write comprehensive design system documentation for UI components following atomic design methodology.
  Use this skill whenever the user shares a Figma link, design file, or component and asks to
  "document this component", "write design docs", "create component specs", "document my design system",
  "write usage guidelines", "create component documentation", "add docs for this button/card/modal/etc.",
  or any variation of documenting UI components. Also trigger when the user asks to audit a component
  for missing states, review design completeness, generate developer handoff notes, or write
  accessibility documentation. Also trigger on "export design system variables", "extract design tokens",
  "map the design system", "inventory the components", or when uploading a Figma REST API JSON export.
  Covers all atomic design levels — atoms, molecules, organisms, templates, pages — and produces
  universal documentation for any design system regardless of framework or tooling.
---

# Design System Documentation Skill

Write production-grade design system documentation for any UI component, following atomic design
principles. The output is universal — not tied to any specific design system, framework, or platform.

This skill works in two phases: first it **audits** the component for completeness (missing states,
unclear interactions, accessibility gaps), then it **documents** the component fully. The audit
step is interactive — Claude asks the user targeted questions before writing final documentation.

**Before writing any documentation**, read `references/design-philosophy.md` for the governing
design principles, token-first rules, anti-patterns, and brand voice guidelines. Every doc
produced by this skill must align with the philosophy.

**The `docs/` directory contains a complete library** of existing component documentation for
the Trusti design system (Figma file `nG8PGu5CclffafrfZuMG9G`). When the user asks about a
component that already has documentation, read the existing doc first and update it rather than
writing from scratch. When documenting a new component, use existing docs as tone and depth
reference alongside the `examples/` directory.

---

## How to classify a component's atomic level

Classification is **always derived from the Figma file structure first**. Most design systems
organize their Figma files with pages named after atomic levels (e.g., "Atoms", "Molecules",
"Organisms", "Templates", "Pages"). This is the authoritative source of truth — if a component
lives on the "Atoms" page, it's an atom, period. Don't second-guess the designer's classification.

**Classification priority order:**
1. **Figma page name** — parse the page structure (see Step 0). If the page is named "Atoms",
   "Molecules", etc., that's the classification. Accept common variations: "Atom", "Atoms",
   "⚛ Atoms", "01 - Atoms", "Foundation / Atoms", etc.
2. **Figma section name** — some files use sections within a page instead of separate pages.
   Same logic applies: a section named "Molecules" classifies its children.
3. **User declaration** — if the user says "this is a molecule", trust them.
4. **Heuristic fallback** — only if none of the above are available, use the classification
   guide in `references/atomic-levels.md` to make a best guess, and confirm with the user.

Read `references/atomic-levels.md` for the full classification guide when the heuristic
fallback is needed. Here's the quick reference:

| Level | What it is | Examples |
|---|---|---|
| Atom | Indivisible UI element, single responsibility | Button, Icon, Badge, Input, Label, Divider |
| Molecule | Small group of atoms functioning as a unit | Search bar (input + button), Form field (label + input + helper) |
| Organism | Complex, distinct section of UI | Navigation bar, Card with actions, Data table, Modal dialog |
| Template | Page-level layout with placeholder content | Dashboard layout, Settings page layout, Auth page layout |

The classification matters because each level has different documentation requirements.
Atoms need exhaustive state and token coverage. Pages need journey context and data binding notes.

**Foundation pages (Grids, Typography, Colors, Icons, Spacing, Elevation):**
Some design systems have pages that define design tokens and foundations rather than components.
These are not atoms in the strict sense — they are the **design tokens and primitives** that
atoms consume. When you encounter these pages, document them as a separate "Foundations" section
using the foundation-specific template in `references/doc-templates.md`. Don't try to force them
into the atom template.

---

## Step 0 — Read the Figma file and parse structure

**MCP call budget matters.** Figma MCP tools have a **global rate limit shared across ALL
Figma tools** (`get_metadata`, `get_design_context`, `get_variable_defs`, etc.). The limit
is tied to the user's Figma plan, not to individual tool types. Every failed call still counts.

**Figma plan limits:**
- **Starter plan / View or Collab seats:** 6 tool calls **per month**. This is a hard cap.
  Once exhausted, no Figma MCP tools will work until the next monthly reset.
- **Pro/Org/Enterprise with Full or Dev seat:** Per-minute rate limits (much more generous).
  The file must also be stored in the team associated with the upgraded plan.

Key constraints:
- **Every call costs quota regardless of success or failure.** A 404 on a bad node ID burns
  quota the same as a successful call. Never probe or guess node IDs.
- **On Starter plans, 6 calls is the entire monthly budget.** Plan calls carefully:
  1 for discovery (`get_metadata` on root) + 1-2 per component (`get_design_context` +
  optional `get_variable_defs`). A full design system inventory + 2 components = ~5 calls.
- **On rate limit: tell the user, don't retry.** If any Figma call returns a rate-limit error,
  say so plainly. Explain the plan limit. Do NOT attempt alternative Figma tools — they share
  the same limit. Suggest: (a) wait for the monthly reset, (b) upgrade the Figma plan, or
  (c) provide the structure manually via screenshot or text.
- **Ideal budget: 1 call for discovery + 1-2 calls per component for documentation.**

### 0a. Discover file structure — build the component inventory

Use ONE of these strategies, in priority order. Stop as soon as one succeeds.

**Strategy 1 — REST API JSON export (0 MCP calls, full file map)**

This is the **preferred strategy** for large files or when MCP calls timeout/fail. It uses the
Figma REST API directly (via a standalone HTML tool the user runs in their browser) to export
the complete file structure, published styles, and component inventory in a single JSON file.

Read `references/figma-rest-api-export.md` for the full workflow, HTML tool template, and
JSON parsing instructions.

**When to use this strategy first:**
- The file is large (60+ pages, complex component sets)
- A previous `get_metadata` call on `0:1` timed out or failed
- You want the full file map upfront without burning MCP call budget
- The user has a Figma Personal Access Token available

**What it returns (in a single JSON file):**
- `fileStructure.pages[]` — every page with ID, name, type, and nested children (nodes,
  frames, components) down to the configured depth (2–4 levels)
- `publishedStyles[]` — all published text, color, grid, and effect styles with node IDs
- `componentInventory[]` — every COMPONENT and COMPONENT_SET with ID, name, and description
- `variables` — if the token has `file_variables:read` scope, all local variable collections
  with modes and values. If not, this field is `null` — fall back to MCP `get_variable_defs`
  per node for variable values.

**How to use the JSON output:**
1. Parse `fileStructure.pages` to build the page → level → component inventory (same as
   Strategy 2 output, but with zero MCP calls)
2. Use `componentInventory` to identify all documentable components and their node IDs
3. Use `publishedStyles` to cross-reference style node IDs with component documentation
4. For variable values: call MCP `get_variable_defs` on specific foundation page nodes
   (e.g., the Typography section, Colors section) using the node IDs from the JSON

**Scope limitations:** The Figma REST API requires a Personal Access Token. If the user's
token is missing the `file_variables:read` scope (common for older tokens), the variables
endpoint returns a 403. The file structure and styles endpoints work with default scopes.
Advise the user to regenerate their token with `file_variables:read` if they need a full
variable export, otherwise use MCP `get_variable_defs` per node as a fallback.

**If the user already has a JSON export from a previous session**, check the `_export.exportedAt`
timestamp. If it's recent (within the last few days), use it directly. If stale, suggest
re-running the export tool.

**If Strategy 1 is not feasible** (user can't generate a token, doesn't want to run the tool),
proceed to Strategy 2.

**Strategy 2 — Single `get_metadata` call on the URL node (1 MCP call)**

Extract the `node-id` from the user's Figma URL. Call `get_metadata` with that exact node ID.

- `node-id=0-1` (i.e., `0:1`) is the document root. It often returns the full page tree with
  every page name and its top-level children. However, it can also fail or return an error on
  some files. **This is still the correct first call** — just don't retry if it fails.
- If the node is a PAGE or top-level SECTION, its children reveal the component list.
- If the node is a specific COMPONENT, you already have your target — skip to 0b.
- Parse the returned XML for child node names, IDs, and types.

**If Strategy 2 fails → do NOT try other node IDs.** Move directly to Strategy 3.

**Strategy 3 — Ask the user for specific page node IDs (0 wasted calls)**

If both Strategy 1 and 2 fail, ask the user to provide page-level links from Figma. Say:

> "The root node didn't return the file structure. Could you right-click each page in the
> Figma sidebar and 'Copy link to page', then paste those links here? I'll read each page
> in a single call."

Each page link contains a valid node ID. Then call `get_metadata` once per page — these are
guaranteed valid targets, so no wasted calls.

**Strategy 4 — User provides structure directly (0 calls)**

If MCP is rate-limited or the user prefers, they can provide the structure themselves:

> "Could you list the page names and the components on each page? Or share a screenshot of
> the Figma sidebar — I'll extract the structure from that."

Also check: has the user already shared a screenshot of the sidebar earlier in this conversation?
If so, extract the structure from that image. Acknowledge that the screenshot may be stale and
offer to verify via MCP when the limit resets.

**Strategy 5 — User provides specific component node IDs (0 calls for discovery)**

If the user shares direct links to specific components (URLs with `node-id`), skip discovery
entirely. Ask the user for the atomic level classification directly.

### After discovery — parse and classify

Once you have the page/section structure (from MCP or from the user), parse page names for
atomic level keywords. Match case-insensitively against:
- `atoms`, `atom`, `⚛`, `foundation`, `primitives`, `base elements`
- `molecules`, `molecule`
- `organisms`, `organism`
- `templates`, `template`, `layouts`
- `pages`, `page`, `screens`
- Numbered/prefixed: `01 - Atoms`, `02_Molecules`, `L1 Atoms`, etc.
- Emoji prefixed: `⚛ Atoms`, `🧬 Molecules`, `🏗 Organisms`, etc.
- Foundation sub-pages: `Grids`, `Typography`, `Colors`, `Icons`, `Spacings`,
  `Spacing & Sizing`, `Elevation`, `Shadows`

Build and present the inventory table:

```
📄 Page "Atoms" → Level: Atom
   - Grids                    (Foundation)
   - Typography               (Foundation)
   - Colors                   (Foundation)
   - Icons                    (Atom)
   - Spacings & Sizing        (Foundation)
   - Elevation                (Foundation)

📄 Page "Molecules" → Level: Molecule
   - Alerts                   (Molecule)
   - Buttons                  (Molecule)
   - Checkbox                 (Molecule)
   ...
```

Ask the user to confirm before proceeding. If the file doesn't use atomic naming conventions,
fall back to `references/atomic-levels.md` heuristics and present suggested classifications.

### 0b. Extract component data (only when documenting)

Do NOT call these tools during the inventory/discovery phase. Only call them when the user
has confirmed which specific component(s) to document.

**Call budget per component: 1-2 calls maximum.**

1. **Call `get_design_context` on the target component node (1 call).** This is the primary
   tool — it returns reference code, a screenshot, and contextual metadata including:
   - Layer names and hierarchy
   - Component type (COMPONENT, COMPONENT_SET, INSTANCE)
   - Variant properties and values
   - Component properties (boolean, enum, string, instance swap) with defaults
   - Auto-layout settings (direction, padding per side, gap, alignment)
   - Sizing mode (fixed, hug, fill) and dimensions
   - Corner radius, fill/stroke colors, typography
   - Prototype interactions
   - Existing description text
   - Child node structure (for anatomy and composition)

2. **Call `get_variable_defs` on the same node (1 call) — only if token names are needed.**
   This maps raw hex values to token names (e.g., `icon/default/secondary → #949494`).
   Skip this call if the `get_design_context` response already includes token references,
   or if the user has provided a separate token reference document.

**Do NOT call `get_metadata` on child nodes individually.** The `get_design_context` response
already includes child structure. Only call `get_metadata` if `get_design_context` returns a
section/frame with unexpanded children and you need their IDs — and even then, make one call
on the parent frame, not separate calls per child.

**If the user provides non-Figma inputs** (screenshots, descriptions, code), skip MCP entirely.
Work from what they give and ask for what's missing.

**What counts as a "Foundation" vs an "Atom":**
When the Atoms page contains items like Grids, Typography, Colors, Spacing, and Elevation,
these define the design token layer — the raw materials. They're documented differently from
interactive components. Icons sit in a gray area: an icon library is a foundation asset, but
an individual Icon component (with size variants, color props) is an atom. When in doubt,
check if the Figma node is a COMPONENT or COMPONENT_SET (→ atom) vs a frame of static
swatches or specimens (→ foundation).

---

## Step 1 — Audit the component (interactive)

This is the critical differentiator of this skill. Before writing documentation, **audit the
component for gaps and ask the user about them**. This step produces better documentation and
catches design issues early.

### 1a. Confirm the atomic level

The atomic level was already determined in Step 0a from the Figma page structure. Remind the
user of the classification. If Step 0 used the heuristic fallback (no atomic page naming in the
file), present your classification with rationale and ask the user to confirm.

If the component sits on a page whose name doesn't match any atomic keyword, and the user
hasn't told you, ask directly: "What level is this component in your design system?"

### 1b. Run the completeness checklists

Read `references/audit-checklists.md` for the full checklists. Run them in this order:

**First: Design Handoff Readiness** (file hygiene — run on every component before anything else):
- Does the component use auto layout? (no fixed positioning)
- Are gap/padding values from the token library? (no manual values)
- Are all layers named descriptively? (no "Frame 1", "Frame 2", "Frame 3")
- Are groups avoided in favor of auto layout frames?
- Is the component built on the latest design system library version?
- Are there any detached instances?
- Are all error states designed (not just described)?
- Is it truly ready for dev? (no WIP elements left)

**Then: Component completeness** (design quality — varies by atomic level):

**For ALL components:**
- Are all interactive states defined? (default, hover, active/pressed, focused, disabled, loading)
- Is there a clear visual distinction between states?
- Are error and empty states accounted for?
- Is keyboard navigation behavior defined?
- Is screen reader behavior specified? (role, label, live region)
- Are touch targets at least 44×44px for mobile?
- Is color contrast sufficient (WCAG AA minimum: 4.5:1 text, 3:1 large text/UI)?
- Are design tokens used instead of hard-coded values?
- Is responsive behavior defined across breakpoints?
- Is the component documented for RTL/LTR support?

**For Molecules and above, also check:**
- Are the sub-components (atoms) within this molecule individually documented?
- Is the composition rule clear? (which atoms are required vs optional)
- Is spacing between child elements tokenized?

**For Organisms and above, also check:**
- Is the data model or content structure defined?
- Are loading, error, and empty states defined for the whole organism?
- Is the interaction flow between sub-components documented?

**For Templates, also check:**
- Is the flex/grid layout behavior defined?
- Are slot/placeholder regions clearly marked?
- Is the navigation flow between templates documented?
- Are real data edge cases covered? (very long strings, missing images, zero results)

### 1c. Ask the user

Present your findings as a structured list of questions grouped by severity:

**🔴 Blockers** — Missing states or behaviors that would cause implementation ambiguity:
  Example: "Your button has Default and Hover variants but no Disabled or Loading state.
  Should I document expected behavior for these, or are they intentionally excluded?"

**🟡 Recommendations** — Things that would improve the component but aren't strictly required:
  Example: "There's no animation defined for the dropdown open/close. I'd suggest a 200ms
  ease-out slide-down. Want me to include that in the docs?"

**🔵 Clarifications** — Ambiguities that could go either way:
  Example: "The icon in this button — is it always required, or optional?
  I see variants with and without it but the rule isn't clear."

Wait for the user to respond before proceeding. Incorporate their answers into the documentation.
If the user says "just go ahead" or wants to skip this step, proceed with sensible defaults and
flag every assumption with ⚠️ ASSUMED in the output.

---

## Step 2 — Write the documentation

After the audit is resolved, write the full documentation. The structure depends on the atomic
level. Read `references/doc-templates.md` for the complete template per level.

### Unified section structure (all levels)

Every component document — Foundation, Atom, Molecule, Organism, Template — follows these
**7 core sections** in this exact order:

```
1. COMPONENT NAME & TYPE
   - Name, atomic level badge

2. PURPOSE
   - What UI problem this solves
   - When to use (3-5 specific scenarios)
   - When NOT to use (2-3 anti-patterns + what to use instead)

3. USAGE RULES
   - ✅ Do (3-5 rules with rationale)
   - ❌ Don't (3-5 anti-patterns with correct alternatives)

4. STATES & VARIANTS
   - Every variant with: name, visual description, when to use
   - Every interactive state with: visual change, trigger

5. RESPONSIVE BEHAVIOR
   - Behavior per breakpoint (mobile, tablet, desktop)

6. INTERACTION & MOTION (standard table format for every transition)
   - Interaction | Trigger | Property | Duration | Easing | Notes
   - If not defined in Figma: ASK the user before documenting
   - Reduced motion behavior

7. ACCESSIBILITY
   - ARIA role and attributes
   - Keyboard navigation
   - Screen reader announcement text
```

**Templates only** add a Layout section after the core 7 (slots, responsive shifts, sticky elements).

**What is NOT documented here** — these live in the Figma file's design specs:
- Token values (colors, spacing, typography, border radius)
- Exact pixel dimensions and padding
- Font families, sizes, and weights

The one exception is **elevation** — document which elevation level each state uses
(e.g., "Level 1 at rest, Level 2 on hover") because this describes behavior, not raw specs.

See `references/doc-templates.md` for the full fillable template per level.

### Content rules

- Base every claim on actual design data — what you see in the file or what the user confirmed
- Never invent specs. If a value isn't available, write `⚠️ NOT SPECIFIED`
- Flag anything you inferred (not directly read from the file) with `⚠️ ASSUMED`
- Write in present tense, imperative mood for guidelines
- Keep descriptions concrete and actionable — no vague language
- **For Interaction & Motion:** if specs are not defined in the Figma file, do NOT assume
  values. Instead, ask the user specific questions about the intended behavior. Present
  your questions with suggested defaults they can accept or modify.

---

## Step 3 — Choose output format

Ask the user how they want the documentation delivered unless they've already specified:

- **Markdown file (.md)** — default, works everywhere, easy to maintain in version control
- **Word document (.docx)** — for teams that use Word-based workflows
  → If chosen, read `/mnt/skills/public/docx/SKILL.md` before generating
- **Figma frames** — documentation placed directly in the Figma file
  → If chosen, read the figma-component-docs skill for the plugin workflow
- **HTML page** — styled, shareable documentation page
- **Structured JSON** — machine-readable, for integration with docs sites or Storybook

For Markdown (default), use the template structure from Step 2. Write the full document as a
single .md file per component, or a single file for a batch of related atoms.

---

## Step 4 — Review and iterate

After delivering documentation, proactively offer:

1. "Want me to document any related components?" — suggest connected atoms if you documented
   a molecule, or the template if you documented several organisms
2. "Should I create a component index?" — a table of all documented components with their
   level, status, and links
3. "Want to run the audit on another component?" — quick access to the Step 1 checklist

---

## Working with batches

When the user shares a full design system or a Figma file with many components:

1. **Step 0a already built the inventory.** Present the full page → level → component map
   from the file structure parsing. The user has already confirmed it.
2. Ask the user which components or levels to document first, or offer to do the full system.
3. Document in bottom-up order: foundations first, then atoms, molecules, organisms, etc.
   This ensures you can reference child component docs from parent docs, and that token
   documentation exists before component docs reference those tokens.
4. Create cross-references between related components (e.g., Button docs reference Icon atom,
   FormField molecule references Label and Input atoms).
5. At the end, generate a **component index** — a master table of all documented components
   with their level, status, page location, and links to their docs.

---

## Reference files

The `references/` directory contains detailed checklists, templates, and governing principles.
Read the relevant file before writing documentation:

- `references/design-philosophy.md` — **Read first.** Brand identity, voice, core design
  principles, token-first rules, component state requirements, accessibility minimums,
  responsive breakpoints, composition rules, and anti-patterns to avoid. This is the
  governing document for all design system work.
- `references/atomic-levels.md` — Deep classification guide with edge cases and examples
- `references/audit-checklists.md` — Full audit checklists per atomic level
- `references/doc-templates.md` — Complete documentation templates per level
- `references/figma-rest-api-export.md` — REST API export strategy: HTML tool template,
  JSON schema, parsing instructions, and the variable-extraction fallback workflow

## Example documentation

The `examples/` directory contains completed component documentation that demonstrates
the expected output quality and format:

- `examples/offers-list-item.md` — A fully documented Molecule (Offer List Item) with
  confirmed interaction specs, elevation usage, accordion behavior, and accessibility.
- `examples/typography-foundation.md` — A fully documented Foundation (Typography) with
  complete Desktop/Mobile token tables, font stack, responsive breakpoint rules, OpenType
  feature handling, WCAG contrast analysis, and semantic HTML mapping.

Use these as the reference standard for tone, structure, and level of detail.

## Component documentation library

The `docs/` directory contains the complete documentation for the Trusti design system,
organized by atomic level. **Read existing docs before writing new ones** — update rather
than duplicate. When documenting a new component, use these as tone and depth reference.

```
docs/
├── foundations/       6 files — design token documentation
│   ├── typography.md    (Figma 1:34, node 78:9146)
│   ├── colors.md        (Figma 1:42, node 78:9147)
│   ├── spacing.md       (Figma 1:50, node 56:164)
│   ├── elevation.md     (Figma 60:298, nodes 60:339–60:348)
│   ├── grids.md         (Figma 1:29 — container system, no column grid)
│   └── icons.md         (Figma 1:46, node 56:3)
│
├── molecules/         16 files — interactive component documentation
│   ├── button.md        (Figma 45:5)
│   ├── alert.md         (Figma 45:13)
│   ├── checkbox.md      (Figma 45:6)
│   ├── radio.md         (Figma 102:1630)
│   ├── input.md         (Figma 45:8)
│   ├── toggle.md        (Figma 74:39)
│   ├── tooltip.md       (Figma 97:1419)
│   ├── pill.md          (Figma 74:11)
│   ├── tag.md           (Figma 3101:360)
│   ├── toast.md         (Figma 2434:9541)
│   ├── tabs.md          (Figma 45:9)
│   ├── pagination.md    (Figma 70:40)
│   ├── progress-bar.md  (Figma 45:11)
│   ├── slider.md        (Figma 493:5220)
│   ├── context-menu.md  (Figma 45:10)
│   └── logo.md          (Figma 2165:2)
│
├── organisms/         4 files — complex section-level components
│   ├── modal.md         (Figma 448:2624)
│   ├── drawer.md        (Figma 448:5219)
│   ├── accordion.md     (Figma 624:17)
│   └── offers-list.md   (Figma 147:1690 — 41 variant frames)
│
└── templates/         6 files — page-level layout components
    ├── navigation.md    (Figma 448:5218)
    ├── footer.md        (Figma 2025:563)
    ├── vehicle-details-card.md (Figma 2275:74)
    ├── cart.md          (Figma 2313:29)
    ├── faq.md           (Figma 3046:9774)
    └── carousel.md      (Figma 3206:390)
```

### How to use the docs library

- **Updating existing docs:** Read the existing doc, then apply changes from new Figma data
  or user feedback. Preserve the existing structure; don't rewrite from scratch unless the
  component has fundamentally changed.
- **Adding new components:** Create a new `.md` file in the appropriate `docs/{level}/`
  directory. Follow the template from `references/doc-templates.md`. Include the Figma
  page ID in the header for traceability.
- **Cross-referencing:** When a component references another (e.g., FAQ references Accordion),
  use relative links: `See [Accordion](../organisms/accordion.md)`.
- **Design philosophy alignment:** Every doc should align with the principles in
  `references/design-philosophy.md`. Specifically: token-first values, all 6 states for
  interactive components, WCAG AA accessibility, and the anti-patterns list.
