# Vehicle Details Card

| Type |
|---|
| ⛺ Template |

> Card displaying vehicle information with optional talon number and edit action.

**Figma:** Page `2275:74` → Section `2277:271` — 12 variant frames
**Code:** `src/components/templates/VehicleDetailsCard/`

---

## Purpose

Displays confirmed vehicle information during the insurance flow. Users can verify and edit their vehicle details.

---

## States & Variants

| Variant | Description |
|---|---|
| With talon | Shows talon number field |
| Without talon | Hides talon number |
| Verified | Shows "✓ Verified" badge in green |
| Unverified | No badge |
| Desktop / Mobile | Layout adjustments |

Edit button: accent color, triggers onEdit callback (typically opens a Modal).

---

## Accessibility

Semantic heading for vehicle name. Edit button: standard button a11y.
