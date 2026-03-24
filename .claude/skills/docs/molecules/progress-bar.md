# Progress Bar

| Type |
|---|
| 🧪 Molecule |

> Visual indicator of completion or progress.

**Figma:** Page `45:11` → Section `161:2317`
**Code:** `src/components/molecules/ProgressBar/`

---

## Purpose

Progress bars show how far a process has advanced — file uploads, multi-step forms, coverage limits.

---

## States & Variants

| Variant | Fill color |
|---|---|
| `default` | Accent-600 |
| `success` | Success-700 |
| `warning` | Warning-500 |
| `destructive` | Destructive-550 |

Sizes: `sm` (4px), `md` (8px). Optional label and percentage display.

---

## Accessibility

`role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`.
