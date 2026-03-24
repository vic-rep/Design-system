# Logo

| Type |
|---|
| 🧪 Molecule |

> Image component for company, partner, car, payment, and delivery logos.

**Figma:** Page `2165:2` — Company Logos, Delivery logos, Payment logos, Car Logos, Partnership Logos
**Code:** `src/components/molecules/Logo/`

---

## Purpose

Logos display partner and company brand marks at consistent sizes with proper aspect ratio handling.

---

## States & Variants

| Size | Height |
|---|---|
| `sm` | 24px |
| `md` | 36px |
| `lg` | 48px |

`object-fit: contain`. Lazy loading via `loading="lazy"`.

---

## Accessibility

`alt` text is required — describes the company name, not "logo." Example: `alt="DZI Insurance"` not `alt="company logo"`.
