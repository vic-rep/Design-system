"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/lib/theme";
import { getFigmaUrl } from "@/lib/figma";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Badge } from "@/components/atoms/Badge";
import { Toggle } from "@/components/atoms/Toggle";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

import { SearchBar } from "@/components/molecules/SearchBar";
import { FormField } from "@/components/molecules/FormField";
import { Card } from "@/components/molecules/Card";
import { Tooltip } from "@/components/molecules/Tooltip";

import { Navbar } from "@/components/organisms/Navbar";
import { Sidebar, SidebarSection } from "@/components/organisms/Sidebar";
import { DataTable } from "@/components/organisms/DataTable";
import { Modal } from "@/components/organisms/Modal";

import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { AuthLayout } from "@/components/templates/AuthLayout";

// Navigation sections built from the atomic design structure
const navSections: SidebarSection[] = [
  {
    title: "Atoms",
    items: [
      { id: "button", label: "Button", href: "#button" },
      { id: "input", label: "Input", href: "#input" },
      { id: "badge", label: "Badge", href: "#badge" },
      { id: "toggle", label: "Toggle", href: "#toggle" },
      { id: "typography", label: "Typography", href: "#typography" },
      { id: "icon", label: "Icon", href: "#icon" },
    ],
  },
  {
    title: "Molecules",
    items: [
      { id: "searchbar", label: "SearchBar", href: "#searchbar" },
      { id: "formfield", label: "FormField", href: "#formfield" },
      { id: "card", label: "Card", href: "#card" },
      { id: "tooltip", label: "Tooltip", href: "#tooltip" },
    ],
  },
  {
    title: "Organisms",
    items: [
      { id: "navbar", label: "Navbar", href: "#navbar" },
      { id: "sidebar", label: "Sidebar", href: "#sidebar" },
      { id: "datatable", label: "DataTable", href: "#datatable" },
      { id: "modal", label: "Modal", href: "#modal" },
    ],
  },
  {
    title: "Templates",
    items: [
      { id: "dashboardlayout", label: "DashboardLayout", href: "#dashboardlayout" },
      { id: "authlayout", label: "AuthLayout", href: "#authlayout" },
    ],
  },
];

// ─── Section wrapper ───────────────────────────────────────────
function Section({
  id,
  title,
  figmaNode,
  children,
}: {
  id: string;
  title: string;
  figmaNode?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-xl font-semibold text-on-surface">{title}</h2>
        {figmaNode && (
          <a
            href={getFigmaUrl(figmaNode)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-on-surface-muted hover:text-primary transition-colors"
          >
            <Icon name="figma" size="sm" />
            Figma
            <Icon name="external-link" size="sm" />
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

function PreviewBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border p-6 ${className}`}>{children}</div>
  );
}

// ─── Component preview sections ────────────────────────────────

function ButtonPreview() {
  return (
    <Section id="button" title="Button" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">
        Primary action element with multiple variants, sizes, and states.
      </p>
      <PreviewBox>
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-on-surface-muted">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-on-surface-muted">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-on-surface-muted">States</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>
      </PreviewBox>
    </Section>
  );
}

function InputPreview() {
  const [value, setValue] = useState("");
  return (
    <Section id="input" title="Input" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">
        Text input with label, error state, and helper text support.
      </p>
      <PreviewBox>
        <div className="max-w-sm space-y-4">
          <Input label="Default" placeholder="Enter text..." value={value} onChange={(e) => setValue(e.target.value)} />
          <Input label="With helper" placeholder="Email" helperText="We'll never share your email." />
          <Input label="Error state" placeholder="Username" error="This field is required" />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
      </PreviewBox>
    </Section>
  );
}

function BadgePreview() {
  return (
    <Section id="badge" title="Badge" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Inline status indicators.</p>
      <PreviewBox>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </PreviewBox>
    </Section>
  );
}

function TogglePreview() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  return (
    <Section id="toggle" title="Toggle" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Switch control with smooth animation.</p>
      <PreviewBox>
        <div className="space-y-4">
          <Toggle checked={checked1} onChange={setChecked1} label="Notifications" />
          <Toggle checked={checked2} onChange={setChecked2} label="Dark mode" />
          <Toggle checked={false} onChange={() => {}} disabled label="Disabled" />
        </div>
      </PreviewBox>
    </Section>
  );
}

function TypographyPreview() {
  return (
    <Section id="typography" title="Typography" figmaNode="1:23">
      <p className="mb-4 text-sm text-on-surface-muted">Type scale using Poppins font family.</p>
      <PreviewBox>
        <div className="space-y-3">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="body">Body text — The quick brown fox jumps over the lazy dog.</Typography>
          <Typography variant="caption">Caption text</Typography>
          <Typography variant="overline">Overline text</Typography>
          <Typography variant="code">const x = 42;</Typography>
          <Typography variant="body" muted>Muted body text</Typography>
        </div>
      </PreviewBox>
    </Section>
  );
}

function IconPreview() {
  const icons = [
    "chevron-down", "chevron-right", "search", "sun", "moon", "menu",
    "x", "check", "alert", "info", "copy", "external-link", "github", "figma",
  ] as const;
  return (
    <Section id="icon" title="Icon" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">SVG icons using Feather style. Uses currentColor.</p>
      <PreviewBox>
        <div className="grid grid-cols-7 gap-4">
          {icons.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Icon name={name} size="lg" />
              <span className="text-[10px] text-on-surface-muted">{name}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-on-surface-muted">Sizes</p>
          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
              <Icon name="check" size="sm" />
              <span className="text-[10px] text-on-surface-muted">sm</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon name="check" size="md" />
              <span className="text-[10px] text-on-surface-muted">md</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon name="check" size="lg" />
              <span className="text-[10px] text-on-surface-muted">lg</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon name="check" size="xl" />
              <span className="text-[10px] text-on-surface-muted">xl</span>
            </div>
          </div>
        </div>
      </PreviewBox>
    </Section>
  );
}

function SearchBarPreview() {
  const [search, setSearch] = useState("");
  return (
    <Section id="searchbar" title="SearchBar" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Input with search icon and real-time filtering.</p>
      <PreviewBox>
        <div className="max-w-sm">
          <SearchBar value={search} onChange={setSearch} placeholder="Search components..." />
          {search && (
            <p className="mt-3 text-sm text-on-surface-muted">
              Filtering for: <span className="text-on-surface font-medium">{search}</span>
            </p>
          )}
        </div>
      </PreviewBox>
    </Section>
  );
}

function FormFieldPreview() {
  return (
    <Section id="formfield" title="FormField" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Wrapper for form inputs with label, required, and error states.</p>
      <PreviewBox>
        <div className="max-w-sm space-y-4">
          <FormField label="Email" required helperText="We'll send a confirmation.">
            <Input placeholder="you@example.com" />
          </FormField>
          <FormField label="Password" required error="Password must be 8+ characters">
            <Input type="password" placeholder="Enter password" />
          </FormField>
        </div>
      </PreviewBox>
    </Section>
  );
}

function CardPreview() {
  return (
    <Section id="card" title="Card" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Container with optional header and footer.</p>
      <PreviewBox>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="default" header={<span className="text-sm font-medium">Default</span>}>
            <p className="text-sm text-on-surface-muted">Subtle border, minimal style.</p>
          </Card>
          <Card variant="outlined" header={<span className="text-sm font-medium">Outlined</span>}>
            <p className="text-sm text-on-surface-muted">Visible border emphasis.</p>
          </Card>
          <Card
            variant="elevated"
            header={<span className="text-sm font-medium">Elevated</span>}
            footer={<Button size="sm" variant="ghost">Action</Button>}
          >
            <p className="text-sm text-on-surface-muted">With shadow and footer.</p>
          </Card>
        </div>
      </PreviewBox>
    </Section>
  );
}

function TooltipPreview() {
  return (
    <Section id="tooltip" title="Tooltip" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Hover tooltip with configurable position.</p>
      <PreviewBox>
        <div className="flex gap-6 items-center justify-center py-8">
          <Tooltip content="Top tooltip" position="top">
            <Button variant="secondary" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button variant="secondary" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <Button variant="secondary" size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <Button variant="secondary" size="sm">Right</Button>
          </Tooltip>
        </div>
      </PreviewBox>
    </Section>
  );
}

function NavbarPreview() {
  return (
    <Section id="navbar" title="Navbar" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Sticky top bar with theme toggle.</p>
      <PreviewBox className="!p-0 overflow-hidden">
        <Navbar title="Preview App" onThemeToggle={() => {}} isDark={false} />
      </PreviewBox>
    </Section>
  );
}

function SidebarPreview() {
  return (
    <Section id="sidebar" title="Sidebar" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">
        Navigation sidebar with atomic design categories. Currently active in the app layout.
      </p>
      <PreviewBox>
        <p className="text-sm text-on-surface-muted">
          The sidebar is rendered as the left navigation of this app. It uses anchor links organized by atomic design categories (Atoms, Molecules, Organisms, Templates).
        </p>
      </PreviewBox>
    </Section>
  );
}

function DataTablePreview() {
  const columns = [
    { key: "name", label: "Component" },
    { key: "category", label: "Category" },
    { key: "variants", label: "Variants" },
    { key: "status", label: "Status" },
  ];
  const rows = [
    { name: "Button", category: "Atoms", variants: "5", status: "Stable" },
    { name: "Input", category: "Atoms", variants: "3", status: "Stable" },
    { name: "Card", category: "Molecules", variants: "3", status: "Stable" },
    { name: "Modal", category: "Organisms", variants: "3", status: "Beta" },
    { name: "DataTable", category: "Organisms", variants: "1", status: "Beta" },
  ];
  return (
    <Section id="datatable" title="DataTable" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Sortable data table with alternating rows.</p>
      <PreviewBox className="!p-0 overflow-hidden">
        <DataTable columns={columns} rows={rows} sortable />
      </PreviewBox>
    </Section>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="modal" title="Modal" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Centered overlay with backdrop and keyboard support.</p>
      <PreviewBox>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Example Modal"
          footer={
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p className="text-sm text-on-surface-muted">
            This modal supports Escape to close, backdrop click, and animated transitions.
          </p>
        </Modal>
      </PreviewBox>
    </Section>
  );
}

function DashboardLayoutPreview() {
  return (
    <Section id="dashboardlayout" title="DashboardLayout" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Full-page layout template with sidebar, navbar, and content area.</p>
      <PreviewBox>
        <div className="rounded-md border border-border overflow-hidden h-48">
          <div className="flex h-full">
            <div className="w-16 border-r border-border bg-surface-alt p-2">
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-border" />
                <div className="h-2 w-full rounded bg-border" />
                <div className="h-2 w-full rounded bg-border" />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-8 border-b border-border flex items-center px-3">
                <div className="h-2 w-20 rounded bg-border" />
              </div>
              <div className="flex-1 p-3">
                <div className="h-2 w-3/4 rounded bg-border mb-2" />
                <div className="h-2 w-1/2 rounded bg-border" />
              </div>
            </div>
          </div>
        </div>
      </PreviewBox>
    </Section>
  );
}

function AuthLayoutPreview() {
  return (
    <Section id="authlayout" title="AuthLayout" figmaNode="1:2">
      <p className="mb-4 text-sm text-on-surface-muted">Centered auth card template for login/register flows.</p>
      <PreviewBox>
        <div className="rounded-md border border-border overflow-hidden h-48 flex items-center justify-center bg-surface-alt">
          <div className="w-48 rounded-lg border border-border bg-surface p-4">
            <div className="mb-3 text-center">
              <div className="mx-auto h-2 w-16 rounded bg-border mb-1" />
              <div className="mx-auto h-1.5 w-24 rounded bg-border" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-full rounded border border-border" />
              <div className="h-6 w-full rounded border border-border" />
              <div className="h-6 w-full rounded bg-primary" />
            </div>
          </div>
        </div>
      </PreviewBox>
    </Section>
  );
}

// ─── Main page ────────────────────────────────────────────────

export default function Home() {
  const { toggleTheme, isDark } = useTheme();
  const [activeId, setActiveId] = useState("button");
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

  const handleNavigate = useCallback((id: string, href: string) => {
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
    <div className="min-h-screen bg-surface">
      <Navbar title="Design System" onThemeToggle={toggleTheme} isDark={isDark} />
      <div className="flex">
        <div className="fixed left-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] w-60 flex-col bg-surface py-4">
          <div className="px-4 pb-4">
            <SearchBar value={search} onChange={setSearch} placeholder="Search..." />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar sections={filteredSections} activeId={activeId} onNavigate={handleNavigate} />
          </div>
        </div>
        <main className="ml-60 flex-1 px-10 py-8 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-on-surface">Design System</h1>
            <p className="mt-2 text-sm text-on-surface-muted">
              Component library preview &middot; Built from skill documentation &middot; v1.0.0
            </p>
          </div>

          {visibleIds.has("button") && <ButtonPreview />}
          {visibleIds.has("input") && <InputPreview />}
          {visibleIds.has("badge") && <BadgePreview />}
          {visibleIds.has("toggle") && <TogglePreview />}
          {visibleIds.has("typography") && <TypographyPreview />}
          {visibleIds.has("icon") && <IconPreview />}
          {visibleIds.has("searchbar") && <SearchBarPreview />}
          {visibleIds.has("formfield") && <FormFieldPreview />}
          {visibleIds.has("card") && <CardPreview />}
          {visibleIds.has("tooltip") && <TooltipPreview />}
          {visibleIds.has("navbar") && <NavbarPreview />}
          {visibleIds.has("sidebar") && <SidebarPreview />}
          {visibleIds.has("datatable") && <DataTablePreview />}
          {visibleIds.has("modal") && <ModalPreview />}
          {visibleIds.has("dashboardlayout") && <DashboardLayoutPreview />}
          {visibleIds.has("authlayout") && <AuthLayoutPreview />}
        </main>
      </div>
    </div>
  );
}
