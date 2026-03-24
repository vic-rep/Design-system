"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/lib/theme";

import { Button } from "@/components/molecules/Button";
import { Input } from "@/components/molecules/Input";
import { Alert } from "@/components/molecules/Alert";
import { Toggle } from "@/components/molecules/Toggle";
import { Checkbox } from "@/components/molecules/Checkbox";
import { Tooltip } from "@/components/molecules/Tooltip";

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
    description: "Text input field with label, helper text, error state, and icon support.",
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
    items: components.map((c) => ({ id: c.id, label: c.label })),
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
      <div className="max-w-[400px] space-y-[var(--l)]">
        <Input
          label="Default"
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          label="Filled"
          placeholder="Placeholder"
          defaultValue="Fill text"
        />
        <Input
          label="Error state"
          defaultValue="Fill text"
          error="This field is required"
        />
        <Input label="Disabled" placeholder="Placeholder" disabled />
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
        </main>
      </div>
    </div>
  );
}
