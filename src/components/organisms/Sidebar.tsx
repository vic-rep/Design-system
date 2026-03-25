"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";

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
            <Typography variant="caption" as="h3" color="muted" bold className="mb-2 px-6 uppercase tracking-widest">
              {section.title}
            </Typography>

            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <Typography
                      variant="textSm"
                      as="a"
                      color={isActive ? "accent" : "muted"}
                      bold={isActive}
                      className={[
                        "block px-6 py-1.5 transition-colors",
                        isActive
                          ? "border-l-2 border-primary"
                          : "border-l-2 border-transparent hover:text-on-surface",
                      ].join(" ")}
                      {...{
                        href: item.href,
                        onClick: (e: React.MouseEvent) => {
                          if (onNavigate) {
                            e.preventDefault();
                            onNavigate(item.id, item.href);
                          }
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
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
