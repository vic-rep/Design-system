"use client";

import React, { useEffect, useRef } from "react";

/**
 * ContextMenu — Molecule
 * Figma: Page 45:10 → Node 133:379
 *
 * Dropdown list with optional left icon, right icon, and additional text.
 * Container: --surface-adjacent bg, elevation-level1 shadow, --s border-radius, --m padding
 * Items have 5 states: default, hover, active, focus, disabled
 * Hover: --primary-100 bg
 * Active: --accent-100 bg, --accent-800 text
 */

export interface ContextMenuItem {
  id: string;
  label: string;
  leftIcon?: string;
  rightIcon?: string;
  additionalText?: string;
  disabled?: boolean;
  destructive?: boolean;
  dividerAfter?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  open: boolean;
  onClose: () => void;
  onSelect?: (id: string) => void;
  className?: string;
}

export function ContextMenu({
  items,
  open,
  onClose,
  onSelect,
  className = "",
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className={[
        "flex flex-col p-[var(--s)] min-w-[200px]",
        "bg-[var(--surface-adjacent)] rounded-[var(--s)]",
        "border border-[var(--primary-200)]",
        className,
      ].join(" ")}
      style={{ boxShadow: "var(--elevation-level1)" }}
    >
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <button
            role="menuitem"
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                onSelect?.(item.id);
                onClose();
              }
            }}
            className={[
              "flex items-center gap-[var(--s)] w-full px-[var(--m)] py-[var(--s)]",
              "rounded-[var(--xs)] text-left text-[14px] leading-[1.2] font-normal",
              "transition-colors duration-100",
              "focus-visible:outline-none focus-visible:bg-[var(--primary-100)]",
              item.disabled
                ? "opacity-40 cursor-not-allowed"
                : item.destructive
                  ? "text-[var(--destructive-600)] hover:bg-[var(--destructive-100)] cursor-pointer"
                  : "text-[var(--primary-900)] hover:bg-[var(--primary-100)] active:bg-[var(--accent-100)] active:text-[var(--accent-800)] cursor-pointer",
            ].join(" ")}
          >
            {item.leftIcon && (
              <i
                className={`${item.leftIcon} w-[16px] text-center text-[14px] shrink-0`}
                aria-hidden="true"
              />
            )}
            <span className="flex-1">{item.label}</span>
            {item.additionalText && (
              <span className="text-[12px] text-[var(--primary-400)] shrink-0">
                {item.additionalText}
              </span>
            )}
            {item.rightIcon && (
              <i
                className={`${item.rightIcon} w-[16px] text-center text-[12px] text-[var(--primary-400)] shrink-0`}
                aria-hidden="true"
              />
            )}
          </button>
          {item.dividerAfter && (
            <div className="h-px bg-[var(--primary-200)] my-[var(--xs)]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

ContextMenu.displayName = "ContextMenu";
