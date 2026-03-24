"use client";

import React from "react";

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  activeId?: string;
  onNavigate?: (id: string, href: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeId, onNavigate }) => {
  return (
    <aside className="flex w-full flex-col overflow-y-auto bg-surface pr-2">
      <nav>
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 px-6 text-[11px] font-semibold uppercase tracking-widest text-on-surface-muted">
              {section.title}
            </h3>

            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate(item.id, item.href);
                        }
                      }}
                      className={[
                        "block px-6 py-1.5 text-sm transition-colors",
                        isActive
                          ? "border-l-2 border-primary font-medium text-primary"
                          : "border-l-2 border-transparent text-on-surface-muted hover:text-on-surface",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};
