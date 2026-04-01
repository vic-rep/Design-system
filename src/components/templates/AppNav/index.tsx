"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import "./appNav.css";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface NavChild {
  id: string;
  label: string;
  badge?: number;
  href?: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** FA icon name, e.g. "fa-browser" */
  icon: string;
  badge?: number;
  href?: string;
  /** Inline-expandable children — renders below item with nesting indicator */
  children?: NavChild[];
}

export interface AppNavProps {
  items: NavItem[];
  /** Currently active item id */
  activeId?: string;
  /** Section header label shown above items, e.g. "NAVIGATE" */
  sectionLabel?: string;
  /** Items that start expanded (applies to items with children) */
  defaultOpenIds?: string[];
  onNavigate?: (id: string) => void;
  className?: string;
}

/* ─── Badge pill ─────────────────────────────────────────────────────────── */

function Badge({ count }: { count: number }) {
  return <span className="app-nav__badge">{count}</span>;
}

/* ─── Child row ──────────────────────────────────────────────────────────── */

function ChildRow({
  child,
  isActive,
  onClick,
}: {
  child: NavChild;
  isActive: boolean;
  onClick: () => void;
}) {
  const Tag = child.href ? "a" : "button";
  return (
    <Tag
      href={child.href}
      className={`app-nav__child-item${isActive ? " app-nav__child-item--active" : ""}`}
      onClick={onClick}
      type={Tag === "button" ? "button" : undefined}
    >
      <span className="app-nav__child-label">{child.label}</span>
      {child.badge !== undefined && <Badge count={child.badge} />}
    </Tag>
  );
}

/* ─── Top-level row ──────────────────────────────────────────────────────── */

function NavRow({
  item,
  isActive,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasChildren = !!item.children?.length;
  const hasArrow = hasChildren || (!item.badge && item.href);
  const Tag = !hasChildren && item.href ? "a" : "button";

  return (
    <Tag
      href={!hasChildren ? item.href : undefined}
      type={Tag === "button" ? "button" : undefined}
      className={`app-nav__item${isActive ? " app-nav__item--active" : ""}`}
      onClick={onToggle}
      aria-expanded={hasChildren ? isOpen : undefined}
    >
      <span className="app-nav__icon">
        <Icon name={item.icon} size="md" />
      </span>
      <span className="app-nav__label">{item.label}</span>
      {item.badge !== undefined && <Badge count={item.badge} />}
      {hasArrow && (
        <span className={`app-nav__chevron${isOpen ? " app-nav__chevron--open" : ""}`}>
          <Icon name="fa-chevron-right" size="xs" />
        </span>
      )}
    </Tag>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function AppNav({
  items,
  activeId,
  sectionLabel,
  defaultOpenIds = [],
  onNavigate,
  className = "",
}: AppNavProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));
  const [localActive, setLocalActive] = useState<string | undefined>(activeId);

  const active = activeId ?? localActive;

  function handleToggle(item: NavItem) {
    if (item.children?.length) {
      setOpenIds((prev) => {
        const next = new Set(prev);
        next.has(item.id) ? next.delete(item.id) : next.add(item.id);
        return next;
      });
    } else {
      setLocalActive(item.id);
      onNavigate?.(item.id);
    }
  }

  function handleChildClick(child: NavChild) {
    setLocalActive(child.id);
    onNavigate?.(child.id);
  }

  return (
    <nav className={`app-nav ${className}`} aria-label={sectionLabel}>
      {sectionLabel && (
        <span className="app-nav__section-label">{sectionLabel}</span>
      )}

      <ul className="app-nav__list">
        {items.map((item) => {
          const isOpen = openIds.has(item.id);
          const isActive = active === item.id;

          return (
            <li key={item.id} className="app-nav__group">
              <NavRow
                item={item}
                isActive={isActive}
                isOpen={isOpen}
                onToggle={() => handleToggle(item)}
              />

              {item.children?.length && isOpen && (
                <div className="app-nav__children" role="list">
                  {item.children.map((child) => (
                    <div key={child.id} role="listitem">
                      <ChildRow
                        child={child}
                        isActive={active === child.id}
                        onClick={() => handleChildClick(child)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

AppNav.displayName = "AppNav";
