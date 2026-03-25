"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "@/lib/theme";

import { Button } from "@/components/molecules/Button";
import { Input } from "@/components/molecules/Input";
import { Alert } from "@/components/molecules/Alert";
import { Toggle } from "@/components/molecules/Toggle";
import { Checkbox } from "@/components/molecules/Checkbox";
import { Tooltip } from "@/components/molecules/Tooltip";
import { Modal } from "@/components/molecules/Modal";
import { Tabs } from "@/components/molecules/Tabs";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { ProgressBar } from "@/components/molecules/ProgressBar";
import { Pagination } from "@/components/molecules/Pagination";
import { Pill } from "@/components/molecules/Pill";
import { RadioGroup } from "@/components/molecules/Radio";
import { RadioThumbGroup } from "@/components/molecules/RadioThumb";
import { Slider } from "@/components/molecules/Slider";
import { Tag } from "@/components/molecules/Tag";
import { Toast } from "@/components/molecules/Toast";
import { Accordion } from "@/components/organisms/Accordion";
import { Drawer } from "@/components/organisms/Drawer";
import { OffersList } from "@/components/organisms/OffersList";
import { Carousel } from "@/components/templates/Carousel";
import { Cart } from "@/components/templates/Cart";
import { FAQ } from "@/components/templates/FAQ";
import { Footer } from "@/components/templates/Footer";
import { Navigation } from "@/components/templates/Navigation";
import { VehicleDetailsCard } from "@/components/templates/VehicleDetailsCard";

// ─── Component doc metadata ───────────────────────────────────
const FIGMA_FILE = "nG8PGu5CclffafrfZuMG9G";

interface ComponentMeta {
  id: string;
  label: string;
  level: string;
  figmaNode: string;
  docPath: string;
  description: string;
}

const components: ComponentMeta[] = [
  {
    id: "button",
    label: "Button",
    level: "Molecule",
    figmaNode: "108:2107",
    docPath: ".claude/skills/docs/molecules/button.md",
    description: "Primary interactive control with Primary, Secondary, Link, and Icon types across 4 sizes.",
  },
  {
    id: "input",
    label: "Input",
    level: "Molecule",
    figmaNode: "45:8",
    docPath: ".claude/skills/docs/molecules/input.md",
    description: "Input fields with 6 types: Text, Textarea, Dropdown, Plate, Phone, Datepicker. Each with 6 states.",
  },
  {
    id: "alert",
    label: "Alert",
    level: "Molecule",
    figmaNode: "45:13",
    docPath: ".claude/skills/docs/molecules/alert.md",
    description: "Collapsible notification banner with semantic variants for feedback messages.",
  },
  {
    id: "toggle",
    label: "Toggle",
    level: "Molecule",
    figmaNode: "74:39",
    docPath: ".claude/skills/docs/molecules/toggle.md",
    description: "Binary on/off switch for instant preference changes.",
  },
  {
    id: "checkbox",
    label: "Checkbox",
    level: "Molecule",
    figmaNode: "45:6",
    docPath: ".claude/skills/docs/molecules/checkbox.md",
    description: "Binary selection control with label and error state support.",
  },
  {
    id: "tooltip",
    label: "Tooltip",
    level: "Molecule",
    figmaNode: "97:1419",
    docPath: ".claude/skills/docs/molecules/tooltip.md",
    description: "Contextual help text shown on hover/focus with configurable position.",
  },
  {
    id: "modal",
    label: "Modal",
    level: "Molecule",
    figmaNode: "448:2624",
    docPath: ".claude/skills/docs/molecules/modal.md",
    description: "Dialog overlay with header, scrollable content, and action buttons. Responsive desktop/mobile.",
  },
  {
    id: "tabs",
    label: "Tabs",
    level: "Molecule",
    figmaNode: "45:9",
    docPath: ".claude/skills/docs/molecules/tabs.md",
    description: "Pill-style tab group with sliding active indicator. Active tab uses dark bg with white text.",
  },
  {
    id: "context-menu",
    label: "Context Menu",
    level: "Molecule",
    figmaNode: "45:10",
    docPath: ".claude/skills/docs/molecules/context-menu.md",
    description: "Dropdown list with optional icons, additional text, and dividers. 5 interactive states.",
  },
  {
    id: "progress-bar",
    label: "Progress Bar",
    level: "Molecule",
    figmaNode: "45:11",
    docPath: ".claude/skills/docs/molecules/progress-bar.md",
    description: "Step progress indicator with back button, step label, and animated fill track.",
  },
  {
    id: "pagination",
    label: "Pagination",
    level: "Molecule",
    figmaNode: "70:40",
    docPath: ".claude/skills/docs/molecules/pagination.md",
    description: "Page navigation with numbered pages, ellipsis gaps, and prev/next arrows.",
  },
  {
    id: "pill",
    label: "Pill",
    level: "Molecule",
    figmaNode: "74:11",
    docPath: ".claude/skills/docs/molecules/pill.md",
    description: "Compact label for filtering, categories, or status indication with 5 semantic variants.",
  },
  {
    id: "radio",
    label: "Radio",
    level: "Molecule",
    figmaNode: "102:1630",
    docPath: ".claude/skills/docs/molecules/radio.md",
    description: "Single selection from a group of mutually exclusive options.",
  },
  {
    id: "radio-thumb",
    label: "Radio Thumb",
    level: "Molecule",
    figmaNode: "2418:32",
    docPath: "",
    description: "Thumbnail radio cards with logo/icon, label, and optional disclaimer.",
  },
  {
    id: "slider",
    label: "Slider",
    level: "Molecule",
    figmaNode: "493:5220",
    docPath: ".claude/skills/docs/molecules/slider.md",
    description: "Range input with draggable thumb for numeric value selection.",
  },
  {
    id: "tag",
    label: "Tag",
    level: "Molecule",
    figmaNode: "3101:360",
    docPath: ".claude/skills/docs/molecules/tag.md",
    description: "Compact label with optional remove action for applied filters and selections.",
  },
  {
    id: "toast",
    label: "Toast",
    level: "Molecule",
    figmaNode: "2434:9541",
    docPath: ".claude/skills/docs/molecules/toast.md",
    description: "Temporary notification that appears and auto-dismisses with 4 semantic variants.",
  },
  {
    id: "accordion",
    label: "Accordion",
    level: "Organism",
    figmaNode: "624:17",
    docPath: ".claude/skills/docs/organisms/accordion.md",
    description: "Collapsible content sections with animated expand/collapse and chevron indicator.",
  },
  {
    id: "drawer",
    label: "Drawer",
    level: "Organism",
    figmaNode: "448:5219",
    docPath: ".claude/skills/docs/organisms/drawer.md",
    description: "Slide-in panel from screen edge for secondary content or navigation.",
  },
  {
    id: "offers-list",
    label: "Offers List",
    level: "Organism",
    figmaNode: "147:1690",
    docPath: ".claude/skills/docs/organisms/offers-list.md",
    description: "Insurance offer cards with company info, features, pricing, and selection action.",
  },
  {
    id: "carousel",
    label: "Carousel",
    level: "Template",
    figmaNode: "3206:390",
    docPath: ".claude/skills/docs/templates/carousel.md",
    description: "Sliding content carousel with navigation arrows, dot indicators, and auto-play.",
  },
  {
    id: "cart",
    label: "Cart",
    level: "Template",
    figmaNode: "2313:29",
    docPath: ".claude/skills/docs/templates/cart.md",
    description: "Order summary with line items, totals, and checkout action.",
  },
  {
    id: "faq",
    label: "FAQ",
    level: "Template",
    figmaNode: "3046:9774",
    docPath: ".claude/skills/docs/templates/faq.md",
    description: "FAQ section wrapping Accordion with centered layout and title.",
  },
  {
    id: "footer",
    label: "Footer",
    level: "Template",
    figmaNode: "2025:563",
    docPath: ".claude/skills/docs/templates/footer.md",
    description: "Page footer with logo, link columns, legal text, and social links.",
  },
  {
    id: "navigation",
    label: "Navigation",
    level: "Template",
    figmaNode: "448:5218",
    docPath: ".claude/skills/docs/templates/navigation.md",
    description: "Sticky top navigation bar with logo, links, and responsive burger menu.",
  },
  {
    id: "vehicle-details-card",
    label: "Vehicle Details Card",
    level: "Template",
    figmaNode: "2275:74",
    docPath: ".claude/skills/docs/templates/vehicle-details-card.md",
    description: "Card displaying vehicle information with optional talon number and edit action.",
  },
];

const navSections = [
  {
    title: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing" },
      { id: "elevation", label: "Elevation" },
    ],
  },
  {
    title: "Molecules",
    items: components.filter((c) => c.level === "Molecule").map((c) => ({ id: c.id, label: c.label })),
  },
  {
    title: "Organisms",
    items: components.filter((c) => c.level === "Organism").map((c) => ({ id: c.id, label: c.label })),
  },
  {
    title: "Templates",
    items: components.filter((c) => c.level === "Template").map((c) => ({ id: c.id, label: c.label })),
  },
];

// ─── Doc Preview Modal ────────────────────────────────────────

function DocPreview({
  docPath,
  isOpen,
  onClose,
}: {
  docPath: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && docPath) {
      setLoading(true);
      fetch(`/api/doc?path=${encodeURIComponent(docPath)}`)
        .then((r) => r.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent("Failed to load documentation file.");
          setLoading(false);
        });
    }
  }, [isOpen, docPath]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--primary-900)]/50" />
      <div
        className="relative w-full max-w-3xl max-h-[80vh] bg-[var(--surface-adjacent)] rounded-[var(--radius-xl)] shadow-elevation-4 overflow-hidden flex flex-col"
        style={{ boxShadow: "var(--elevation-level4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[var(--xxl)] py-[var(--l)] border-b border-[var(--primary-200)]">
          <div>
            <h3 className="text-[20px] font-semibold text-[var(--primary-900)]">
              Component Documentation
            </h3>
            <p className="text-[12px] text-[var(--primary-500)] mt-[var(--xxs)]">
              {docPath}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close documentation"
            className="w-[32px] h-[32px] flex items-center justify-center rounded-[var(--radius-md)] hover:bg-[var(--primary-100)] transition-colors duration-150"
          >
            <i className="fa-solid fa-xmark text-[var(--primary-600)]" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[var(--xxl)] py-[var(--l)]">
          {loading ? (
            <div className="flex items-center gap-[var(--s)] text-[var(--primary-500)]">
              <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
              Loading...
            </div>
          ) : (
            <pre className="text-[14px] leading-[1.6] text-[var(--primary-800)] whitespace-pre-wrap font-[var(--font-sans)]">
              {content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────

function Section({
  id,
  title,
  label,
  level,
  figmaNode,
  docPath,
  description,
  children,
}: {
  id: string;
  title?: string;
  label?: string;
  level?: string;
  figmaNode?: string;
  docPath?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [showDoc, setShowDoc] = useState(false);

  return (
    <section id={id} className="mb-[var(--7xl)] scroll-mt-[80px]">
      <div className="mb-[var(--l)] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-[var(--s)]">
            <h2 className="text-[24px] font-semibold text-[var(--primary-900)]">{title ?? label}</h2>
            {level && (
              <span className="px-[var(--s)] py-[var(--xxs)] text-[12px] font-medium rounded-[var(--radius-full)] bg-[var(--accent-100)] text-[var(--accent-800)]">
                {level}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-[var(--xs)] text-[14px] text-[var(--primary-600)] max-w-[600px]">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-[var(--s)] shrink-0">
          {figmaNode && (
            <a
              href={`https://www.figma.com/design/${FIGMA_FILE}?node-id=${figmaNode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[var(--xs)] text-[12px] text-[var(--primary-500)] hover:text-[var(--accent-600)] transition-colors duration-150"
            >
              <i className="fa-brands fa-figma" aria-hidden="true" />
              Figma
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
            </a>
          )}
          {docPath && (
            <button
              onClick={() => setShowDoc(true)}
              className="inline-flex items-center gap-[var(--xs)] text-[12px] text-[var(--primary-500)] hover:text-[var(--accent-600)] transition-colors duration-150"
            >
              <i className="fa-solid fa-file-lines" aria-hidden="true" />
              Docs
            </button>
          )}
        </div>
      </div>
      <div className="rounded-[var(--radius-lg)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] p-[var(--xxl)]">
        {children}
      </div>
      {docPath && (
        <DocPreview docPath={docPath} isOpen={showDoc} onClose={() => setShowDoc(false)} />
      )}
    </section>
  );
}

function FoundationSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-[var(--7xl)] scroll-mt-[80px]">
      <h2 className="text-[24px] font-semibold text-[var(--primary-900)] mb-[var(--l)]">
        {title}
      </h2>
      <div className="rounded-[var(--radius-lg)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] p-[var(--xxl)]">
        {children}
      </div>
    </section>
  );
}

// ─── Foundation Previews ──────────────────────────────────────

function ColorsPreview() {
  const colorGroups = [
    {
      name: "Brand",
      colors: [
        { label: "Brand", var: "--brand" },
      ],
    },
    {
      name: "Accent Color (Orange)",
      colors: [
        { label: "900", var: "--accent-900" },
        { label: "800", var: "--accent-800" },
        { label: "700", var: "--accent-700" },
        { label: "600/Primary", var: "--accent-600" },
        { label: "500", var: "--accent-500" },
        { label: "400", var: "--accent-400" },
        { label: "300", var: "--accent-300" },
        { label: "200", var: "--accent-200" },
        { label: "100", var: "--accent-100" },
      ],
    },
    {
      name: "Primary Color (Neutral)",
      colors: [
        { label: "900/Primary", var: "--primary-900" },
        { label: "800", var: "--primary-800" },
        { label: "700", var: "--primary-700" },
        { label: "600", var: "--primary-600" },
        { label: "500", var: "--primary-500" },
        { label: "400", var: "--primary-400" },
        { label: "300", var: "--primary-300" },
        { label: "200", var: "--primary-200" },
        { label: "100", var: "--primary-100" },
      ],
    },
    {
      name: "Surface",
      colors: [
        { label: "Surface", var: "--surface" },
        { label: "Adjacent", var: "--surface-adjacent" },
        { label: "Adjacent 2", var: "--surface-adjacent-2" },
      ],
    },
    {
      name: "Constants",
      colors: [
        { label: "White", var: "--constant-white" },
        { label: "Black", var: "--constant-black" },
      ],
    },
    {
      name: "Success (Green)",
      colors: [
        { label: "800", var: "--success-800" },
        { label: "700/Primary", var: "--success-700" },
        { label: "600", var: "--success-600" },
        { label: "400", var: "--success-400" },
        { label: "200", var: "--success-200" },
        { label: "100/Primary", var: "--success-100" },
      ],
    },
    {
      name: "Warning",
      colors: [
        { label: "600", var: "--warning-600" },
        { label: "500/Primary", var: "--warning-500" },
        { label: "400", var: "--warning-400" },
        { label: "300", var: "--warning-300" },
        { label: "200", var: "--warning-200" },
        { label: "100", var: "--warning-100" },
      ],
    },
    {
      name: "Destructive (Red)",
      colors: [
        { label: "600", var: "--destructive-600" },
        { label: "550/Primary", var: "--destructive-550" },
        { label: "500", var: "--destructive-500" },
        { label: "400", var: "--destructive-400" },
        { label: "300", var: "--destructive-300" },
        { label: "200", var: "--destructive-200" },
        { label: "100", var: "--destructive-100" },
      ],
    },
  ];

  return (
    <div className="space-y-[var(--xxl)]">
      {colorGroups.map((group) => (
        <div key={group.name}>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            {group.name}
          </p>
          <div className="flex flex-wrap gap-[var(--s)]">
            {group.colors.map((color) => (
              <div key={color.var} className="flex flex-col items-center gap-[var(--xs)]">
                <div
                  className="w-[48px] h-[48px] rounded-[var(--radius-lg)] border border-[var(--primary-200)]"
                  style={{ backgroundColor: `var(${color.var})` }}
                />
                <span className="text-[10px] text-[var(--primary-500)]">{color.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographyPreview() {
  const desktopStyles = [
    { name: "H1", spec: "48/56 SemiBold", size: "48px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H2", spec: "40/52 SemiBold", size: "40px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H3", spec: "36/42 SemiBold", size: "36px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H4", spec: "32/34 SemiBold", size: "32px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H5", spec: "24/28 Medium", size: "24px", weight: "font-medium", lineHeight: "1.2" },
    { name: "H6", spec: "20/24 Medium", size: "20px", weight: "font-medium", lineHeight: "1.2" },
    { name: "Text Large", spec: "18/26 Regular", size: "18px", weight: "font-normal", lineHeight: "1.2" },
    { name: "Text Default", spec: "16/26 Regular", size: "16px", weight: "font-normal", lineHeight: "1.2" },
    { name: "Text Default M", spec: "16/26 Medium", size: "16px", weight: "font-medium", lineHeight: "1.2" },
    { name: "Text Small", spec: "14/24 Regular", size: "14px", weight: "font-normal", lineHeight: "1.2" },
    { name: "Caption", spec: "12/24 Regular", size: "12px", weight: "font-normal", lineHeight: "1.2" },
  ];

  const mobileStyles = [
    { name: "H1", spec: "32/40 SemiBold", size: "32px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H2", spec: "28/36 SemiBold", size: "28px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H3", spec: "24/32 SemiBold", size: "24px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H4", spec: "20/34 SemiBold", size: "20px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "H5", spec: "18/24 Medium", size: "18px", weight: "font-medium", lineHeight: "1.2" },
    { name: "H6", spec: "16/22 Medium", size: "16px", weight: "font-semibold", lineHeight: "1.2" },
    { name: "Text Large", spec: "16/24 Regular", size: "16px", weight: "font-normal", lineHeight: "1.2" },
    { name: "Text Default", spec: "14/21 Regular", size: "14px", weight: "font-normal", lineHeight: "1.2" },
    { name: "Text Default M", spec: "14/21 Medium", size: "14px", weight: "font-medium", lineHeight: "1.2" },
    { name: "Text Small", spec: "12/19.5 Regular", size: "12px", weight: "font-normal", lineHeight: "1.3" },
    { name: "Caption", spec: "10/18 Regular", size: "10px", weight: "font-normal", lineHeight: "1.3" },
  ];

  return (
    <div className="space-y-[var(--xxl)]">
      {/* Desktop scale */}
      <div>
        <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)] mb-[var(--m)]">
          Desktop (≥768px)
        </p>
        <div className="space-y-[var(--m)]">
          {desktopStyles.map((s) => (
            <div key={`d-${s.name}`} className="flex flex-col gap-[var(--xxs)]">
              <span
                className={`text-[${s.size}] ${s.weight} leading-[${s.lineHeight}] text-[var(--primary-900)]`}
                style={{ fontSize: s.size, fontWeight: s.weight === "font-semibold" ? 600 : s.weight === "font-medium" ? 500 : 400, lineHeight: s.lineHeight }}
              >
                {s.name}
              </span>
              <span className="text-[12px] text-[var(--primary-400)]">
                {s.name} &mdash; {s.spec} Source Sans 3
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile scale */}
      <div>
        <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)] mb-[var(--m)]">
          Mobile (&lt;768px)
        </p>
        <div className="space-y-[var(--m)]">
          {mobileStyles.map((s) => (
            <div key={`m-${s.name}`} className="flex flex-col gap-[var(--xxs)]">
              <span
                className="text-[var(--primary-900)]"
                style={{ fontSize: s.size, fontWeight: s.weight === "font-semibold" ? 600 : s.weight === "font-medium" ? 500 : 400, lineHeight: s.lineHeight }}
              >
                {s.name}
              </span>
              <span className="text-[12px] text-[var(--primary-400)]">
                {s.name} &mdash; {s.spec} Source Sans 3
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpacingPreview() {
  const tokens = [
    { name: "XXS", value: "2px", var: "--xxs" },
    { name: "XS", value: "4px", var: "--xs" },
    { name: "S", value: "8px", var: "--s" },
    { name: "M", value: "12px", var: "--m" },
    { name: "L", value: "16px", var: "--l" },
    { name: "XL", value: "20px", var: "--xl" },
    { name: "XXL", value: "24px", var: "--xxl" },
    { name: "3XL", value: "28px", var: "--3xl" },
    { name: "4XL", value: "32px", var: "--4xl" },
  ];

  return (
    <div className="space-y-[var(--s)]">
      <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)] mb-[var(--s)]">
        2px Base Grid — T-Shirt Sizing
      </p>
      {tokens.map((t) => (
        <div key={t.name} className="flex items-center gap-[var(--l)]">
          <span className="text-[12px] text-[var(--primary-500)] w-[40px]">{t.name}</span>
          <div
            className="h-[12px] rounded-[var(--radius-sm)] bg-[var(--accent-200)]"
            style={{ width: `var(${t.var})`, minWidth: "2px" }}
          />
          <span className="text-[12px] text-[var(--primary-400)]">{t.value}</span>
        </div>
      ))}
    </div>
  );
}

function ElevationPreview() {
  const levels = [
    { name: "Level 1", context: "Cards, raised surfaces", var: "--elevation-level1" },
    { name: "Level 2", context: "Dropdowns, hover states", var: "--elevation-level2" },
    { name: "Level 3", context: "Toasts, tooltips", var: "--elevation-level3" },
    { name: "Level 4", context: "Modals, dialogs", var: "--elevation-level4" },
    { name: "Level 5", context: "Drawers, overlays", var: "--elevation-level5" },
  ];

  return (
    <div className="flex flex-wrap gap-[var(--xxl)]">
      {levels.map((l) => (
        <div
          key={l.name}
          className="w-[140px] h-[100px] rounded-[var(--radius-lg)] bg-[var(--surface-adjacent)] flex flex-col items-center justify-center"
          style={{ boxShadow: `var(${l.var})` }}
        >
          <span className="text-[14px] font-medium text-[var(--primary-900)]">{l.name}</span>
          <span className="text-[11px] text-[var(--primary-500)] text-center mt-[var(--xxs)]">
            {l.context}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Component Previews ───────────────────────────────────────

function ButtonPreview() {
  const meta = components.find((c) => c.id === "button")!;
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Types
          </p>
          <div className="flex flex-wrap items-center gap-[var(--m)]">
            <Button variant="primary" leadingIcon="fa-house" trailingIcon="fa-chevron-right">Primary</Button>
            <Button variant="secondary" leadingIcon="fa-house" trailingIcon="fa-chevron-right">Secondary</Button>
            <Button variant="link" leadingIcon="fa-house" trailingIcon="fa-chevron-right">Link</Button>
            <Button variant="icon" leadingIcon="fa-house" />
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Sizes
          </p>
          <div className="flex flex-wrap items-end gap-[var(--m)]">
            <Button size="s">Small</Button>
            <Button size="m">Medium</Button>
            <Button size="l">Large</Button>
            <Button size="xl" leadingIcon="fa-house" trailingIcon="fa-chevron-right">XL</Button>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            States
          </p>
          <div className="flex flex-wrap items-center gap-[var(--m)]">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Secondary Variants
          </p>
          <div className="flex flex-wrap items-end gap-[var(--m)]">
            <Button variant="secondary" size="s">Small</Button>
            <Button variant="secondary" size="m">Medium</Button>
            <Button variant="secondary" size="l">Large</Button>
            <Button variant="secondary" size="xl" leadingIcon="fa-house" trailingIcon="fa-chevron-right">XL</Button>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Icon Buttons
          </p>
          <div className="flex flex-wrap items-end gap-[var(--m)]">
            <Button variant="icon" size="s" leadingIcon="fa-house" />
            <Button variant="icon" size="m" leadingIcon="fa-house" />
            <Button variant="icon" size="l" leadingIcon="fa-house" />
            <Button variant="icon" size="xl" leadingIcon="fa-house" />
            <Button variant="icon" size="l" leadingIcon="fa-house" disabled />
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Full Width
          </p>
          <Button fullWidth leadingIcon="fa-house" trailingIcon="fa-chevron-right">Full Width Button</Button>
        </div>
      </div>
    </Section>
  );
}

function InputPreview() {
  const meta = components.find((c) => c.id === "input")!;
  const [value, setValue] = useState("");
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        {/* Text */}
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Text Input
          </p>
          <div className="max-w-[400px] space-y-[var(--m)]">
            <Input label="Default" placeholder="Placeholder" value={value} onChange={(e) => setValue((e as React.ChangeEvent<HTMLInputElement>).target.value)} />
            <Input label="Filled" placeholder="Placeholder" defaultValue="Fill text" />
            <Input label="Error" defaultValue="Fill text" error="This field is required" />
            <Input label="Disabled" placeholder="Placeholder" disabled />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Text Area
          </p>
          <div className="max-w-[400px] space-y-[var(--m)]">
            <Input inputType="textarea" label="Default" placeholder="Placeholder" />
            <Input inputType="textarea" label="Error" defaultValue="Fill text" error="Field is invalid" />
          </div>
        </div>

        {/* Dropdown */}
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Dropdown
          </p>
          <div className="max-w-[400px] space-y-[var(--m)]">
            <Input
              inputType="dropdown"
              label="Default"
              placeholder="Placeholder"
              options={[
                { value: "opt1", label: "Option 1" },
                { value: "opt2", label: "Option 2" },
                { value: "opt3", label: "Option 3" },
              ]}
            />
            <Input inputType="dropdown" label="Disabled" placeholder="Placeholder" options={[]} disabled />
          </div>
        </div>

        {/* Plate */}
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            License Plate
          </p>
          <div className="max-w-[400px] space-y-[var(--m)]">
            <Input inputType="plate" placeholder="EA1234CB" />
            <Input inputType="plate" defaultValue="EA124" error="Invalid plate number" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Phone
          </p>
          <div className="max-w-[400px] space-y-[var(--m)]">
            <Input inputType="phone" placeholder="089xxxxxxxxxx" />
            <Input inputType="phone" defaultValue="089" error="Invalid phone number" />
          </div>
        </div>

        {/* Datepicker */}
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Date Picker
          </p>
          <div className="max-w-[400px] space-y-[var(--m)]">
            <Input inputType="datepicker" label="Default" placeholder="Select date" />
            <Input inputType="datepicker" label="Disabled" disabled />
          </div>
        </div>
      </div>
    </Section>
  );
}

function AlertPreview() {
  const meta = components.find((c) => c.id === "alert")!;
  return (
    <Section {...meta}>
      <div className="space-y-[var(--m)]">
        <Alert
          variant="warning"
          title="Policy expires in 30 days"
          description="Your current auto insurance policy will expire on April 23, 2026. Compare new offers to ensure continuous coverage."
          defaultExpanded
          primaryAction={{ label: "Compare offers", onClick: () => {} }}
          secondaryAction={{ label: "Remind me later", onClick: () => {} }}
        />
        <Alert
          variant="error"
          title="Payment failed"
          description="Your payment method was declined. Please update your payment information to continue."
          primaryAction={{ label: "Update payment", onClick: () => {} }}
        />
        <Alert
          variant="success"
          title="Policy activated"
          description="Your new insurance policy is now active. A confirmation email has been sent."
        />
        <Alert
          variant="info"
          title="New offers available"
          description="3 new insurance offers match your profile. Review them to find the best deal."
        />
      </div>
    </Section>
  );
}

function TogglePreview() {
  const meta = components.find((c) => c.id === "toggle")!;
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  return (
    <Section {...meta}>
      <div className="space-y-[var(--l)]">
        <Toggle checked={checked1} onChange={setChecked1} label="Email notifications" />
        <Toggle checked={checked2} onChange={setChecked2} label="SMS alerts" />
        <Toggle checked={false} onChange={() => {}} disabled label="Disabled toggle" />
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Small size
          </p>
          <Toggle checked={checked1} onChange={setChecked1} size="sm" label="Compact toggle" />
        </div>
      </div>
    </Section>
  );
}

function CheckboxPreview() {
  const meta = components.find((c) => c.id === "checkbox")!;
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(false);
  return (
    <Section {...meta}>
      <div className="space-y-[var(--m)]">
        <Checkbox checked={c1} onChange={setC1} label="I agree to the terms and conditions" />
        <Checkbox checked={c2} onChange={setC2} label="Subscribe to newsletter" />
        <Checkbox checked={c3} onChange={setC3} label="Remember my preferences" />
        <Checkbox checked={false} onChange={() => {}} disabled label="Disabled checkbox" />
        <Checkbox checked={false} onChange={() => {}} error label="Error state checkbox" />
      </div>
    </Section>
  );
}

function TooltipPreview() {
  const meta = components.find((c) => c.id === "tooltip")!;
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Info (Default)
          </p>
          <div className="flex gap-[var(--xxl)] items-center justify-center py-[var(--4xl)]">
            <Tooltip content="Tooltips and toggletips look visually similar, and both have an interactive trigger." position="top">
              <Button variant="secondary" size="s">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltips and toggletips look visually similar, and both have an interactive trigger." position="bottom">
              <Button variant="secondary" size="s">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltips and toggletips look visually similar, and both have an interactive trigger." position="left">
              <Button variant="secondary" size="s">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltips and toggletips look visually similar, and both have an interactive trigger." position="right">
              <Button variant="secondary" size="s">Right</Button>
            </Tooltip>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Error
          </p>
          <div className="flex gap-[var(--xxl)] items-center justify-center py-[var(--4xl)]">
            <Tooltip content="This field is required" type="error" position="top">
              <Button variant="secondary" size="s">Top</Button>
            </Tooltip>
            <Tooltip content="This field is required" type="error" position="bottom">
              <Button variant="secondary" size="s">Bottom</Button>
            </Tooltip>
            <Tooltip content="This field is required" type="error" position="left">
              <Button variant="secondary" size="s">Left</Button>
            </Tooltip>
            <Tooltip content="This field is required" type="error" position="right">
              <Button variant="secondary" size="s">Right</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ModalPreview() {
  const meta = components.find((c) => c.id === "modal")!;
  const [open, setOpen] = useState(false);
  return (
    <Section {...meta}>
      <Button variant="primary" size="m" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Title goes here"
        primaryAction={{ label: "Confirm", onClick: () => setOpen(false) }}
        secondaryAction={{ label: "Cancel", onClick: () => setOpen(false) }}
      >
        <p className="mb-[var(--l)]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p className="mb-[var(--l)]">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
        </p>
        <p className="mb-[var(--l)]">
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
          molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
        <p>
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
          maiores alias consequatur aut perferendis doloribus asperiores repellat.
        </p>
      </Modal>
    </Section>
  );
}

function TabsPreview() {
  const meta = components.find((c) => c.id === "tabs")!;
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Default
          </p>
          <Tabs
            items={[
              { value: "tab1", label: "Overview" },
              { value: "tab2", label: "Details" },
              { value: "tab3", label: "Reviews" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
          <p className="mt-[var(--m)] text-[14px] text-[var(--primary-600)]">
            Active: <strong>{activeTab}</strong>
          </p>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            With Disabled Tab
          </p>
          <Tabs
            items={[
              { value: "a", label: "Active" },
              { value: "b", label: "Normal" },
              { value: "c", label: "Disabled", disabled: true },
            ]}
            defaultValue="a"
          />
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Many Tabs
          </p>
          <Tabs
            items={[
              { value: "1", label: "Step 1" },
              { value: "2", label: "Step 2" },
              { value: "3", label: "Step 3" },
              { value: "4", label: "Step 4" },
              { value: "5", label: "Step 5" },
            ]}
            defaultValue="3"
          />
        </div>
      </div>
    </Section>
  );
}

function ContextMenuPreview() {
  const meta = components.find((c) => c.id === "context-menu")!;
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Default (always visible for preview)
          </p>
          <div className="inline-block">
            <ContextMenu
              open={true}
              onClose={() => {}}
              onSelect={setSelected}
              items={[
                { id: "edit", label: "Edit", leftIcon: "fa-solid fa-pen" },
                { id: "duplicate", label: "Duplicate", leftIcon: "fa-solid fa-copy", additionalText: "Ctrl+D" },
                { id: "share", label: "Share", leftIcon: "fa-solid fa-share-nodes", rightIcon: "fa-solid fa-chevron-right", dividerAfter: true },
                { id: "archive", label: "Archive", leftIcon: "fa-solid fa-box-archive" },
                { id: "disabled", label: "Unavailable", leftIcon: "fa-solid fa-lock", disabled: true, dividerAfter: true },
                { id: "delete", label: "Delete", leftIcon: "fa-solid fa-trash", destructive: true },
              ]}
            />
          </div>
          {selected && (
            <p className="mt-[var(--m)] text-[14px] text-[var(--primary-600)]">
              Selected: <strong>{selected}</strong>
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

function ProgressBarPreview() {
  const meta = components.find((c) => c.id === "progress-bar")!;
  const [step, setStep] = useState(2);
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Interactive
          </p>
          <ProgressBar
            currentStep={step}
            totalSteps={5}
            stepLabel="Vehicle Details"
            onBack={() => setStep((s) => Math.max(1, s - 1))}
          />
          <div className="flex gap-[var(--s)] mt-[var(--m)]">
            <Button variant="secondary" size="s" onClick={() => setStep((s) => Math.max(1, s - 1))}>
              Prev
            </Button>
            <Button variant="secondary" size="s" onClick={() => setStep((s) => Math.min(5, s + 1))}>
              Next
            </Button>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Steps
          </p>
          <div className="space-y-[var(--m)]">
            <ProgressBar currentStep={1} totalSteps={4} stepLabel="Step 1" showBack={false} />
            <ProgressBar currentStep={2} totalSteps={4} stepLabel="Step 2" />
            <ProgressBar currentStep={3} totalSteps={4} stepLabel="Step 3" />
            <ProgressBar currentStep={4} totalSteps={4} stepLabel="Complete" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function PaginationPreview() {
  const meta = components.find((c) => c.id === "pagination")!;
  const [page, setPage] = useState(1);
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Interactive ({page}/20)
          </p>
          <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Few Pages
          </p>
          <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
        </div>
      </div>
    </Section>
  );
}

function PillPreview() {
  const meta = components.find((c) => c.id === "pill")!;
  const [selected, setSelected] = useState("accent");
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Variants
          </p>
          <div className="flex flex-wrap gap-[var(--s)]">
            <Pill variant="default">Default</Pill>
            <Pill variant="accent">Accent</Pill>
            <Pill variant="success">Success</Pill>
            <Pill variant="warning">Warning</Pill>
            <Pill variant="destructive">Destructive</Pill>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Sizes
          </p>
          <div className="flex flex-wrap items-center gap-[var(--s)]">
            <Pill size="xs" leftIcon="fa-house" rightIcon="fa-house">XS</Pill>
            <Pill size="s" leftIcon="fa-house" rightIcon="fa-house">Small</Pill>
            <Pill size="m" leftIcon="fa-house" rightIcon="fa-house">Medium</Pill>
            <Pill size="l" leftIcon="fa-house" rightIcon="fa-house">Large</Pill>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            With Icons
          </p>
          <div className="flex flex-wrap gap-[var(--s)]">
            <Pill variant="accent" leftIcon="fa-tag">Left icon</Pill>
            <Pill variant="success" rightIcon="fa-check">Right icon</Pill>
            <Pill variant="default" leftIcon="fa-star" rightIcon="fa-chevron-right">Both icons</Pill>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Interactive (click to select)
          </p>
          <div className="flex flex-wrap gap-[var(--s)]">
            {["default", "accent", "success", "warning", "destructive"].map((v) => (
              <Pill
                key={v}
                variant={v as any}
                selected={selected === v}
                onClick={() => setSelected(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function RadioPreview() {
  const meta = components.find((c) => c.id === "radio")!;
  const [value, setValue] = useState("monthly");
  return (
    <Section {...meta}>
      <div className="max-w-[400px]">
        <RadioGroup
          name="payment"
          legend="Payment frequency"
          value={value}
          onChange={setValue}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
            { value: "annually", label: "Annually" },
            { value: "disabled", label: "Custom (unavailable)", disabled: true },
          ]}
        />
      </div>
    </Section>
  );
}

function RadioThumbPreview() {
  const meta = components.find((c) => c.id === "radio-thumb")!;
  const [iconVal, setIconVal] = useState("office");
  const [logoVal, setLogoVal] = useState("speedy");
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Icon Type
          </p>
          <RadioThumbGroup
            name="delivery-icon"
            type="icon"
            value={iconVal}
            onChange={setIconVal}
            options={[
              { value: "office", label: "Office", icon: "fa-building", disclaimer: "Free" },
              { value: "home", label: "Home", icon: "fa-house", disclaimer: "5.00 лв." },
              { value: "shop", label: "Shop", icon: "fa-shop", disclaimer: "2.00 лв." },
              { value: "disabled", label: "Unavailable", icon: "fa-ban", disclaimer: "N/A", disabled: true },
            ]}
          />
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Logo Type
          </p>
          <RadioThumbGroup
            name="carrier-logo"
            type="logo"
            value={logoVal}
            onChange={setLogoVal}
            options={[
              { value: "speedy", label: "Speedy", logo: <span className="text-[14px] font-bold">Speedy</span>, disclaimer: "2.00 лв / 1.02 €" },
              { value: "econt", label: "Econt", logo: <span className="text-[14px] font-bold">Econt</span>, disclaimer: "3.00 лв / 1.53 €" },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

function SliderPreview() {
  const meta = components.find((c) => c.id === "slider")!;
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(12);
  return (
    <Section {...meta}>
      <div className="max-w-[400px] space-y-[var(--xxl)]">
        <Slider
          label="Coverage amount"
          min={1000}
          max={50000}
          step={500}
          value={amount}
          onChange={setAmount}
          formatValue={(v) => `${v.toLocaleString()} лв.`}
        />
        <Slider
          label="Loan term"
          min={6}
          max={60}
          step={6}
          value={term}
          onChange={setTerm}
          formatValue={(v) => `${v} months`}
        />
        <Slider
          label="Disabled"
          min={0}
          max={100}
          value={50}
          onChange={() => {}}
          disabled
        />
      </div>
    </Section>
  );
}

function TagPreview() {
  const meta = components.find((c) => c.id === "tag")!;
  const [tags, setTags] = useState(["MTPL", "Casco", "Travel", "Home"]);
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Sizes with Left Icon
          </p>
          <div className="flex flex-wrap items-center gap-[var(--s)]">
            <Tag size="xs" leftIcon="fa-car" onRemove={() => {}}>EA 1234 CB</Tag>
            <Tag size="s" leftIcon="fa-car" onRemove={() => {}}>EA 1234 CB</Tag>
            <Tag size="m" leftIcon="fa-car" onRemove={() => {}}>EA 1234 CB</Tag>
            <Tag size="l" leftIcon="fa-car" onRemove={() => {}}>EA 1234 CB</Tag>
          </div>
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Removable Tags
          </p>
          <div className="flex flex-wrap gap-[var(--s)]">
            {tags.map((t) => (
              <Tag key={t} size="s" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
                {t}
              </Tag>
            ))}
            {tags.length === 0 && (
              <button
                type="button"
                onClick={() => setTags(["MTPL", "Casco", "Travel", "Home"])}
                className="text-[12px] text-[var(--accent-600)] cursor-pointer"
              >
                Reset tags
              </button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ToastPreview() {
  const meta = components.find((c) => c.id === "toast")!;
  const [toasts, setToasts] = useState<Array<{ id: number; variant: "info" | "success" | "warning" | "destructive"; message: string }>>([]);
  const nextId = useRef(0);

  const addToast = (variant: "info" | "success" | "warning" | "destructive", message: string) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, variant, message }]);
  };

  return (
    <Section {...meta}>
      <div className="space-y-[var(--m)]">
        <div className="flex flex-wrap gap-[var(--s)]">
          <Button variant="secondary" size="s" onClick={() => addToast("info", "Settings saved successfully")}>
            Info Toast
          </Button>
          <Button variant="secondary" size="s" onClick={() => addToast("success", "Payment processed")}>
            Success Toast
          </Button>
          <Button variant="secondary" size="s" onClick={() => addToast("warning", "Session expires in 5 minutes")}>
            Warning Toast
          </Button>
          <Button variant="secondary" size="s" onClick={() => addToast("destructive", "Failed to save changes")}>
            Error Toast
          </Button>
        </div>
        <div className="space-y-[var(--s)]">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              message={t.message}
              duration={5000}
              onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function AccordionPreview() {
  const meta = components.find((c) => c.id === "accordion")!;
  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Single Open (Default)
          </p>
          <Accordion
            items={[
              { id: "1", title: "What is MTPL insurance?", content: "Motor Third Party Liability insurance covers damages to third parties caused by your vehicle. It is mandatory in Bulgaria." },
              { id: "2", title: "How do I file a claim?", content: "You can file a claim through our app or by contacting our support team. You'll need your policy number and details of the incident." },
              { id: "3", title: "Can I cancel my policy?", content: "Yes, you can cancel within 14 days for a full refund. After that, a prorated refund applies." },
              { id: "4", title: "Disabled item", content: "This should not be accessible.", disabled: true },
            ]}
            defaultOpenIds={["1"]}
          />
        </div>
        <div>
          <p className="mb-[var(--s)] text-[12px] font-medium uppercase tracking-wider text-[var(--primary-500)]">
            Multiple Open
          </p>
          <Accordion
            allowMultiple
            items={[
              { id: "a", title: "Coverage details", content: "Your policy covers liability up to 10,000 лв. with optional add-ons for comprehensive coverage." },
              { id: "b", title: "Payment options", content: "We accept credit cards, bank transfer, and monthly instalments for annual policies." },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

function DrawerPreview() {
  const meta = components.find((c) => c.id === "drawer")!;
  const [openInfo, setOpenInfo] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  return (
    <Section {...meta}>
      <div className="flex flex-wrap gap-[var(--s)]">
        <Button variant="secondary" size="s" onClick={() => setOpenInfo(true)}>
          Info Drawer
        </Button>
        <Button variant="secondary" size="s" onClick={() => setOpenAction(true)}>
          Action Drawer
        </Button>
      </div>
      <Drawer open={openInfo} onClose={() => setOpenInfo(false)} type="info" title="Details">
        <div className="space-y-[var(--m)]">
          <p className="text-[14px] text-[var(--primary-900)] leading-[1.2]">
            This is an informative drawer. On mobile it slides from the right at 300px width. On desktop it is 480px wide.
          </p>
          <p className="text-[14px] text-[var(--primary-900)] leading-[1.2]">
            Press Escape or click the overlay to close.
          </p>
        </div>
      </Drawer>
      <Drawer
        open={openAction}
        onClose={() => setOpenAction(false)}
        type="action"
        title="Choose option"
        notch
        footer={
          <Button variant="primary" size="l" fullWidth onClick={() => setOpenAction(false)}>
            Confirm
          </Button>
        }
      >
        <div className="space-y-[var(--m)]">
          <p className="text-[14px] text-[var(--primary-900)] leading-[1.2]">
            This is an actionable drawer. On mobile it slides from the bottom with a notch. On desktop it slides from the right.
          </p>
        </div>
      </Drawer>
    </Section>
  );
}

function OffersListPreview() {
  const meta = components.find((c) => c.id === "offers-list")!;
  const [loading, setLoading] = useState(false);

  const sampleOffers = [
    {
      id: "1",
      companyName: "Euroins",
      price: 245.50,
      recommended: true,
      features: [
        { label: "Third party liability", included: true },
        { label: "Roadside assistance", included: true },
        { label: "Glass coverage", included: true },
        { label: "Theft protection", included: false },
      ],
    },
    {
      id: "2",
      companyName: "Lev Ins",
      price: 289.00,
      features: [
        { label: "Third party liability", included: true },
        { label: "Roadside assistance", included: true },
        { label: "Glass coverage", included: false },
        { label: "Theft protection", included: false },
      ],
    },
    {
      id: "3",
      companyName: "DZI",
      price: 312.75,
      features: [
        { label: "Third party liability", included: true },
        { label: "Roadside assistance", included: true },
        { label: "Glass coverage", included: true },
        { label: "Theft protection", included: true },
      ],
    },
  ];

  return (
    <Section {...meta}>
      <div className="space-y-[var(--xxl)]">
        <div className="flex gap-[var(--s)] mb-[var(--m)]">
          <Button
            variant="secondary"
            size="s"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            Simulate Loading
          </Button>
        </div>
        <OffersList
          offers={sampleOffers}
          loading={loading}
          onSelect={(id) => alert(`Selected offer: ${id}`)}
        />
      </div>
    </Section>
  );
}

function CarouselPreview() {
  const meta = components.find((c) => c.id === "carousel")!;
  const slides = [
    { id: "1", content: <div className="h-[200px] bg-[var(--accent-100)] flex items-center justify-center rounded-[var(--s)]"><span className="text-[24px] font-semibold text-[var(--accent-800)]">Slide 1 — Promotions</span></div> },
    { id: "2", content: <div className="h-[200px] bg-[var(--success-100)] flex items-center justify-center rounded-[var(--s)]"><span className="text-[24px] font-semibold text-[var(--success-800)]">Slide 2 — Partners</span></div> },
    { id: "3", content: <div className="h-[200px] bg-[var(--warning-100)] flex items-center justify-center rounded-[var(--s)]"><span className="text-[24px] font-semibold text-[var(--warning-600)]">Slide 3 — Testimonials</span></div> },
  ];
  return (
    <Section {...meta}>
      <Carousel slides={slides} autoPlay autoPlayInterval={4000} />
    </Section>
  );
}

function CartPreview() {
  const meta = components.find((c) => c.id === "cart")!;
  const [items, setItems] = useState([
    { id: "1", label: "MTPL Insurance", description: "Euroins — Annual policy", price: 245.50 },
    { id: "2", label: "Roadside Assistance", description: "24/7 coverage add-on", price: 35.00 },
    { id: "3", label: "Glass Coverage", description: "Windshield protection", price: 18.50 },
  ]);
  return (
    <Section {...meta}>
      <div className="max-w-[400px]">
        <Cart
          items={items}
          onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
          onCheckout={() => alert("Proceeding to checkout!")}
        />
      </div>
    </Section>
  );
}

function FAQPreview() {
  const meta = components.find((c) => c.id === "faq")!;
  return (
    <Section {...meta}>
      <FAQ
        items={[
          { question: "What documents do I need?", answer: "You'll need your ID card, vehicle registration certificate, and current insurance policy (if renewing)." },
          { question: "How long does it take?", answer: "Most policies are activated within 24 hours of payment. Some providers offer instant activation." },
          { question: "Can I compare prices?", answer: "Yes! Trusti compares offers from 10+ insurance providers to find you the best deal." },
        ]}
      />
    </Section>
  );
}

function FooterPreview() {
  const meta = components.find((c) => c.id === "footer")!;
  return (
    <Section {...meta}>
      <div className="-m-[var(--xxl)] rounded-[var(--s)] overflow-hidden">
        <Footer
          columns={[
            { title: "Products", links: [{ label: "MTPL", href: "#" }, { label: "Casco", href: "#" }, { label: "Travel", href: "#" }] },
            { title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }] },
            { title: "Legal", links: [{ label: "Terms", href: "#" }, { label: "Privacy", href: "#" }, { label: "Cookies", href: "#" }] },
          ]}
          socialLinks={[
            { icon: "fa-brands fa-facebook", href: "#", label: "Facebook" },
            { icon: "fa-brands fa-instagram", href: "#", label: "Instagram" },
            { icon: "fa-brands fa-linkedin", href: "#", label: "LinkedIn" },
          ]}
          legalText="© 2026 Trusti. All rights reserved."
        />
      </div>
    </Section>
  );
}

function NavigationPreview() {
  const meta = components.find((c) => c.id === "navigation")!;
  return (
    <Section {...meta}>
      <div className="-m-[var(--xxl)] rounded-[var(--s)] overflow-hidden">
        <div className="relative" style={{ position: "relative" }}>
          <Navigation
            links={[
              { label: "Insurance", href: "#", active: true },
              { label: "Compare", href: "#" },
              { label: "Claims", href: "#" },
              { label: "Help", href: "#" },
            ]}
            actions={
              <Button variant="primary" size="s">Get a Quote</Button>
            }
          />
        </div>
      </div>
    </Section>
  );
}

function VehicleDetailsCardPreview() {
  const meta = components.find((c) => c.id === "vehicle-details-card")!;
  return (
    <Section {...meta}>
      <div className="max-w-[500px] space-y-[var(--m)]">
        <VehicleDetailsCard
          vehicle={{
            make: "Toyota",
            model: "Corolla",
            year: 2021,
            plate: "CB 1234 AB",
            talonNumber: "TL-12345678",
            verified: true,
          }}
          onEdit={() => alert("Edit vehicle")}
        />
        <VehicleDetailsCard
          vehicle={{
            make: "BMW",
            model: "320d",
            year: 2019,
            plate: "PB 5678 CD",
          }}
          onEdit={() => alert("Edit vehicle")}
        />
      </div>
    </Section>
  );
}

// ─── Main page ────────────────────────────────────────────────

export default function Home() {
  const { toggleTheme, isDark } = useTheme();
  const [activeId, setActiveId] = useState("colors");
  const [search, setSearch] = useState("");

  // Observe which section is in view
  useEffect(() => {
    const ids = navSections.flatMap((s) => s.items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Filter sections by search
  const filteredSections = search
    ? navSections
        .map((s) => ({
          ...s,
          items: s.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
        }))
        .filter((s) => s.items.length > 0)
    : navSections;

  const visibleIds = new Set(filteredSections.flatMap((s) => s.items.map((i) => i.id)));

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 h-[64px] border-b border-[var(--primary-200)] bg-[var(--surface-adjacent)] flex items-center px-[var(--xxl)]">
        <div className="flex items-center gap-[var(--m)] flex-1">
          <span className="text-[20px] font-semibold text-[var(--accent-600)]">Trusti</span>
          <span className="text-[14px] text-[var(--primary-400)]">Design System</span>
        </div>
        <div className="flex items-center gap-[var(--l)]">
          <a
            href={`https://www.figma.com/design/${FIGMA_FILE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-[var(--primary-500)] hover:text-[var(--accent-600)] transition-colors duration-150 flex items-center gap-[var(--xs)]"
          >
            <i className="fa-brands fa-figma" aria-hidden="true" />
            Figma File
          </a>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-[var(--radius-md)] hover:bg-[var(--primary-100)] transition-colors duration-150"
          >
            <i
              className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"} text-[var(--primary-600)]`}
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-[64px] z-30 w-[240px] h-[calc(100vh-64px)] border-r border-[var(--primary-200)] bg-[var(--surface-adjacent)] flex flex-col">
          <div className="p-[var(--l)]">
            <div className="relative">
              <i
                className="fa-solid fa-magnifying-glass absolute left-[var(--m)] top-1/2 -translate-y-1/2 text-[var(--primary-400)] text-[12px]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full h-[32px] pl-[var(--4xl)] pr-[var(--s)] text-[14px] rounded-[var(--radius-lg)] border border-[var(--primary-200)] bg-[var(--surface)] text-[var(--primary-900)] placeholder:text-[var(--primary-400)] focus-visible:outline-none focus-visible:border-[var(--accent-600)]"
              />
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-[var(--s)]">
            {filteredSections.map((section) => (
              <div key={section.title} className="mb-[var(--l)]">
                <p className="px-[var(--s)] mb-[var(--xs)] text-[11px] font-medium uppercase tracking-wider text-[var(--primary-400)]">
                  {section.title}
                </p>
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={[
                      "w-full text-left px-[var(--m)] py-[var(--xs)] text-[14px] rounded-[var(--radius-md)] transition-colors duration-150 block",
                      activeId === item.id
                        ? "bg-[var(--accent-100)] text-[var(--accent-800)] font-medium"
                        : "text-[var(--primary-600)] hover:bg-[var(--primary-100)] hover:text-[var(--primary-900)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="p-[var(--l)] border-t border-[var(--primary-200)]">
            <p className="text-[11px] text-[var(--primary-400)]">v1.0.0 — Trusti 2026</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-[240px] flex-1 px-[var(--5xl)] py-[var(--4xl)] max-w-[900px]">
          <div className="mb-[var(--5xl)]">
            <h1 className="text-[48px] font-semibold text-[var(--primary-900)] leading-[1.2]">
              Trusti Design System
            </h1>
            <p className="mt-[var(--m)] text-[18px] text-[var(--primary-600)] leading-[1.4] max-w-[600px]">
              Component library for the Trusti insurance comparison platform.
              Built with atomic design methodology, Source Sans 3, and the Trusti brand identity.
            </p>
          </div>

          {/* Foundations */}
          {visibleIds.has("colors") && (
            <FoundationSection id="colors" title="Colors">
              <ColorsPreview />
            </FoundationSection>
          )}
          {visibleIds.has("typography") && (
            <FoundationSection id="typography" title="Typography">
              <TypographyPreview />
            </FoundationSection>
          )}
          {visibleIds.has("spacing") && (
            <FoundationSection id="spacing" title="Spacing">
              <SpacingPreview />
            </FoundationSection>
          )}
          {visibleIds.has("elevation") && (
            <FoundationSection id="elevation" title="Elevation">
              <ElevationPreview />
            </FoundationSection>
          )}

          {/* Molecules */}
          {visibleIds.has("button") && <ButtonPreview />}
          {visibleIds.has("input") && <InputPreview />}
          {visibleIds.has("alert") && <AlertPreview />}
          {visibleIds.has("toggle") && <TogglePreview />}
          {visibleIds.has("checkbox") && <CheckboxPreview />}
          {visibleIds.has("tooltip") && <TooltipPreview />}
          {visibleIds.has("modal") && <ModalPreview />}
          {visibleIds.has("tabs") && <TabsPreview />}
          {visibleIds.has("context-menu") && <ContextMenuPreview />}
          {visibleIds.has("progress-bar") && <ProgressBarPreview />}
          {visibleIds.has("pagination") && <PaginationPreview />}
          {visibleIds.has("pill") && <PillPreview />}
          {visibleIds.has("radio") && <RadioPreview />}
          {visibleIds.has("radio-thumb") && <RadioThumbPreview />}
          {visibleIds.has("slider") && <SliderPreview />}
          {visibleIds.has("tag") && <TagPreview />}
          {visibleIds.has("toast") && <ToastPreview />}

          {/* Organisms */}
          {visibleIds.has("accordion") && <AccordionPreview />}
          {visibleIds.has("drawer") && <DrawerPreview />}
          {visibleIds.has("offers-list") && <OffersListPreview />}

          {/* Templates */}
          {visibleIds.has("carousel") && <CarouselPreview />}
          {visibleIds.has("cart") && <CartPreview />}
          {visibleIds.has("faq") && <FAQPreview />}
          {visibleIds.has("footer") && <FooterPreview />}
          {visibleIds.has("navigation") && <NavigationPreview />}
          {visibleIds.has("vehicle-details-card") && <VehicleDetailsCardPreview />}
        </main>
      </div>
    </div>
  );
}
