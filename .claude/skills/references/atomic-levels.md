# Atomic Design Levels — Classification Guide

This reference helps you classify UI components into atomic design levels. It is used as a
**heuristic fallback** when the Figma file structure doesn't declare the classification.

**Primary classification is always from the file structure.** Most design system Figma files
organize pages by atomic level (e.g., a page named "Atoms" contains all atoms). When this
structure exists, it is authoritative. Only use this guide when:
- The Figma file doesn't use atomic naming conventions
- The user provides screenshots or descriptions without file structure context
- A component's placement seems wrong and you want to suggest reclassification

---

## Atom

**Definition:** The smallest functional UI element that cannot be broken down further without
losing its meaning. Atoms have a single responsibility.

**Key test:** If you removed any part of this component, would it stop making sense as a
standalone UI element? If yes, it's an atom.

**Common atoms:**
- Button (all variants: primary, secondary, ghost, icon-only, etc.)
- Text input / Text area
- Checkbox / Radio button / Toggle switch
- Label / Helper text / Error text
- Icon
- Badge / Tag / Chip
- Avatar (image or initials)
- Divider / Separator
- Tooltip (the floating element itself, not the trigger)
- Progress bar / Spinner / Skeleton loader
- Link (styled anchor)
- Slider / Range input
- Color swatch / Token preview

**Edge cases:**
- A "Button with icon" is still an atom if the icon is a fixed part of the button component,
  not a separately composed element. If the icon and label are separate components placed
  together by the consumer, it's a molecule.
- A "Chip with close button" is a molecule (chip atom + icon-button atom), not an atom.
  Unless the close button is inseparable from the chip design.
- A "Toggle" is an atom. A "Toggle with label" is a molecule.

**Documentation depth for atoms:**
Atoms need the most exhaustive state and spec documentation because they are the foundation.
Every pixel, every token, every state must be documented. Atom docs are referenced by every
higher-level component that uses them.

Required sections: Header, Overview, Anatomy, Variants & States (exhaustive), Properties/API,
Design Specs (exhaustive), Responsive Behavior, Interaction & Motion, Accessibility (exhaustive),
Content Guidelines, Do's and Don'ts, Developer Notes.

---

## Molecule

**Definition:** A small group of atoms that function together as a unit. Molecules have a
specific, focused purpose that emerges from the combination.

**Key test:** Is this a recognizable UI pattern made of 2-4 atoms working together?
Could you describe it as "[Atom A] + [Atom B] doing [one thing]"?

**Common molecules:**
- Search bar (input + button)
- Form field (label + input + helper text + error message)
- Breadcrumb item (link + separator icon)
- Menu item (icon + label + shortcut hint)
- List item (avatar + text + action button)
- Stat card (label + value + trend indicator)
- Notification toast (icon + message + close button)
- Stepper control (decrement button + value + increment button)
- Tab item (icon + label + badge)
- Pagination control (prev button + page numbers + next button)
- Social proof item (avatar + name + rating)
- File upload dropzone (icon + text + button)

**Edge cases:**
- A "Card" with just a title and image might be a molecule. A card with title, image,
  description, tags, and action buttons is an organism.
- A "Dropdown" (trigger button + floating list) is a molecule if the list contains only
  simple text items. If the list contains complex items with icons, descriptions, and
  nested submenus, it's an organism.
- "Form field" is a molecule. "Form" (multiple form fields + submit) is an organism.

**Documentation depth for molecules:**
Molecules need clear composition rules — which atoms are required vs optional, how they
relate to each other, and what the molecule provides that individual atoms don't.

Required sections: Everything from Atom, plus Composition Rules.
Emphasis on: how atoms connect, spacing between children, composition variants.

---

## Organism

**Definition:** A complex, self-contained UI section made of molecules and/or atoms.
Organisms form distinct, recognizable sections of an interface.

**Key test:** Could this be a distinct, nameable section if you drew a box around it
on a screenshot? Does it handle its own data, state, or interaction flow?

**Common organisms:**
- Navigation bar (logo + nav links + search bar + user menu)
- Header / Hero section
- Data table (column headers + rows + pagination + bulk actions + filters)
- Modal / Dialog (overlay + header + content + footer actions)
- Sidebar / Drawer (nav items + sections + collapse control)
- Card grid / Card list (multiple card molecules in layout)
- Comment thread (multiple comment molecules + reply input)
- Shopping cart (item list + summary + checkout button)
- Calendar / Date picker (month grid + navigation + selected state)
- Media player (video + controls + progress + volume)
- Accordion / Collapsible section group
- Form (multiple form fields + validation + submit)
- Footer (links + social + legal + newsletter signup)
- Dashboard widget (header + chart + summary stats + actions)
- Onboarding wizard (steps + content + navigation)

**Edge cases:**
- A "Navbar" is always an organism — it contains multiple molecules (logo link, search bar,
  nav items) and manages its own interaction state (mobile menu toggle, active route).
- A "Dropdown menu" that contains complex items with icons, descriptions, keyboard navigation,
  and nested submenus is an organism. A simple select with text-only options is a molecule.
- A "Toast container" (manages multiple toast molecules with stacking and auto-dismiss)
  is an organism even though each individual toast is a molecule.

**Documentation depth for organisms:**
Organisms need data model documentation, internal interaction flows, and loading/error/empty
states for the organism as a whole (not just the sub-components).

Required sections: Everything from Molecule, plus Data & Content Model.
Emphasis on: data flow, internal interactions, composite states, skeleton loading.

---

## Template

**Definition:** A page-level layout that defines the structure and slot regions where
organisms and molecules are placed. Templates use placeholder content.

**Key test:** Is this a wireframe-level layout that could be filled with different
content while maintaining the same structure?

**Common templates:**
- Dashboard layout (sidebar + header + main content grid + widgets area)
- Settings page layout (navigation tabs + content panel + save bar)
- Authentication layout (centered card + background + branding)
- List/detail layout (filterable list on left + detail panel on right)
- E-commerce product page layout (gallery + info + reviews + related)
- Blog post layout (header + content + sidebar + comments)
- Search results layout (filters + results grid + pagination)
- Landing page layout (hero + features + testimonials + CTA + footer)
- Profile page layout (header + tabs + content area)
- Checkout flow layout (steps + form area + summary sidebar)

**Documentation depth for templates:**
Templates need grid/layout specs, slot definitions, responsive behavior at the layout level,
and rules for which organisms can go where.

Required sections: Everything from Organism, plus Layout & Slot Definitions.
Emphasis on: flex/grid layout, slot regions, responsive layout shifts, content priority.
