# FAQ

| Type |
|---|
| ⛺ Template |

> FAQ section wrapping the Accordion organism with centered layout and title.

**Figma:** Page `3046:9774` → Section `3046:9779`
**Code:** `src/components/templates/FAQ/`

---

## Purpose

Displays frequently asked questions in a scannable, collapsible format.

---

## Layout

Max-width 720px, centered. Title (H3, centered) → Accordion. Consumes `FAQItem[]` (question + answer pairs) mapped to AccordionItem format.

---

## Accessibility

Inherits all Accordion accessibility (aria-expanded, role="region", keyboard navigation).
