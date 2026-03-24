# Modal

| Type |
|---|
| 🐿 Organism |

> Overlay dialog for focused content or actions requiring user attention.

**Figma:** Page `448:2624` → Section `2451:1439`
**Code:** `src/components/organisms/Modal/`

---

## Purpose

Modals interrupt the user flow to present focused content — confirmations, forms, or critical information that requires acknowledgment before proceeding.

### When to use
- Confirmation of destructive or irreversible actions
- Short forms that don't warrant a full page (e.g., edit vehicle details)
- Critical alerts requiring explicit user response

### When NOT to use
- Long forms or multi-step flows → Use a full page
- Non-blocking notifications → Use Toast
- Content that needs scrolling extensively → Consider Drawer or full page

---

## Usage Rules

### ✅ Do
- Keep modals focused — one decision, 2 actions maximum (confirm + cancel)
- Trap focus inside the modal while open
- Restore focus to the trigger element on close

### ❌ Don't
- Don't nest modals — if a modal needs to open another modal, rethink the flow
- Don't use modals for content the user needs to reference alongside other page content
- Don't auto-open modals on page load without user action (except critical errors)

---

## States & Variants

### Sizes

| Size | Width | Use case |
|---|---|---|
| `sm` | 400px | Simple confirmations |
| `md` | 560px | Short forms, standard dialogs |
| `lg` | 780px | Complex forms, detailed content |
| `fullscreen` | 100vw/vh | Mobile full-takeover, immersive flows |

### Anatomy

Header (title + close button) → Body (scrollable content) → Footer (action buttons, right-aligned). All sections optional except body.

---

## Interaction & Motion

| Interaction | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Backdrop fade-in | Open | opacity | 200ms | ease |
| Close | Escape / overlay click / close button | opacity | 150ms | ease |

---

## Accessibility

Native `<dialog>` with `showModal()`. `aria-modal="true"`. Escape closes. Focus trap automatic. Previous focus restored on close.
