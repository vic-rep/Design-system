# Context Menu

| Type |
|---|
| 🧪 Molecule |

> Dropdown menu with action items, optional icons, dividers, and destructive items.

**Figma:** Page `45:10` → Section `133:134`
**Code:** `src/components/molecules/ContextMenu/`

---

## Purpose

Context menus present a list of actions for a specific item or context.

### When to use
- Right-click or overflow ("...") menus on list items, cards, table rows

### When NOT to use
- Form selection → Use a select/dropdown input
- Navigation → Use Navigation or Tabs

---

## States & Variants

Card background, Primary-200 border, Level 2 elevation. Items: hover highlight, optional icon, optional divider. Destructive items in red. Disabled items at 40% opacity.

---

## Accessibility

Container: `role="menu"`. Items: `role="menuitem"`. Keyboard: arrow keys navigate, Enter selects, Escape closes.
