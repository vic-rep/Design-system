# Tabs

| Type |
|---|
| 🧪 Molecule |

> Horizontal navigation between content sections.

**Figma:** Page `45:9` → Section `514:5259`
**Code:** `src/components/molecules/Tabs/`

---

## Purpose

Tabs organize content into mutually exclusive sections within the same view, avoiding full page navigation.

### When to use
- 2–6 content sections within a single page context
- When users need to compare or switch between related views

### When NOT to use
- More than 6 sections → Use sidebar navigation
- Unrelated content → Use separate pages

---

## States & Variants

| State | Visual | Trigger |
|---|---|---|
| Default | Secondary text color | — |
| Hover | Primary text color | pointerenter |
| Active | Accent color + 2px underline + bold | Selection |
| Disabled | 40% opacity | `disabled` prop |
| Focused | 2px accent outline | `:focus-visible` |

Optional icon per tab.

---

## Accessibility

Container: `role="tablist"`. Each tab: `role="tab"`, `aria-selected`. Arrow keys navigate between tabs. Tab key moves focus in/out of tab bar.
