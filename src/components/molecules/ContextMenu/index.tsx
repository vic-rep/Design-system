"use client";

import React, { useEffect, useRef } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Typography } from "@/components/atoms/Typography";

/**
 * ContextMenu — Molecule
 * Figma: Page 45:10 → Node 133:379
 * Doc: .claude/skills/docs/molecules/context-menu.md
 *
 * Container: surface-adjacent bg, primary-100 border, elevation-level1, rounded-s, p-m
 * Item: p-m, rounded-xs, 16px text, optional left icon (accent-600), additional text, right icon
 * States: Default, Hover (primary-100), Focus (accent-700 border), Pressed (primary-200), Disabled (opacity-20)
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
        "flex flex-col p-[var(--m)] min-w-[188px]",
        "bg-[var(--surface-adjacent)] rounded-[var(--s)]",
        "border border-[var(--primary-100)]",
        className,
      ].join(" ")}
      style={{
        boxShadow:
          "0px 1px 1px 0px rgba(0,0,0,0.05), 0px 3px 3px 0px rgba(0,0,0,0.04), 0px 6px 4px 0px rgba(0,0,0,0.03), 0px 11px 4px 0px rgba(0,0,0,0.01), 0px 17px 5px 0px rgba(0,0,0,0)",
      }}
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
              "flex items-center w-full p-[var(--m)]",
              "rounded-[var(--xs)] text-left text-[16px] leading-[1.2] font-normal",
              "transition-colors duration-100",
              "focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[var(--accent-700)]",
              item.disabled
                ? "opacity-20 cursor-not-allowed"
                : item.destructive
                  ? "text-[var(--destructive-600)] hover:bg-[var(--destructive-100)] active:bg-[var(--primary-200)] cursor-pointer"
                  : "text-[var(--primary-900)] hover:bg-[var(--primary-100)] active:bg-[var(--primary-200)] cursor-pointer",
            ].join(" ")}
            style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
          >
            <div className="flex flex-1 items-center justify-between">
              {/* Left side: icon + label */}
              <div className="flex flex-1 items-center gap-[var(--s)]">
                {item.leftIcon && (
                  <Icon name={item.leftIcon} size="xs" weight="regular" className="w-[12px] text-center text-[var(--accent-600)] shrink-0" />
                )}
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {/* Right side: additional text + icon */}
              {(item.additionalText || item.rightIcon) && (
                <div className="flex items-center gap-[var(--xs)] shrink-0">
                  {item.additionalText && (
                    <Typography
                      variant="caption"
                      as="span"
                      color="muted"
                      className="leading-[1.2]"
                      style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
                    >
                      {item.additionalText}
                    </Typography>
                  )}
                  {item.rightIcon && (
                    <Icon name={item.rightIcon} size="xs" weight="regular" className="w-[12px] text-center text-[var(--primary-900)] shrink-0" />
                  )}
                </div>
              )}
            </div>
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
