"use client";

import React, { useState, useRef, useEffect } from "react";
import { Typography } from "@/components/atoms/Typography";

/**
 * Tabs — Molecule
 * Figma: Page 45:9 → Node 514:5451
 *
 * Pill-style tab group in a white rounded container.
 * Active tab: --primary-900 bg, white text
 * Default tab: transparent bg, --primary-600 text
 * Hover: --primary-100 bg
 * Container: --surface-adjacent bg, --s padding, full rounded
 */

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  className = "",
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.value ?? ""
  );
  const activeValue = controlledValue ?? internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const activeButton = containerRef.current.querySelector<HTMLButtonElement>(
      `[data-tab-value="${activeValue}"]`
    );
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
      });
    }
  }, [activeValue, items]);

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={`relative inline-flex items-center bg-[var(--surface-adjacent)] rounded-[var(--4xl)] p-[var(--xs)] gap-[var(--xxs)] ${className}`}
    >
      {/* Sliding indicator */}
      <div
        className="absolute top-[var(--xs)] rounded-[var(--3xl)] bg-[var(--primary-900)] transition-all duration-200 ease-in-out z-0"
        style={indicatorStyle}
      />

      {items.map((item) => {
        const isActive = item.value === activeValue;
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            data-tab-value={item.value}
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => handleSelect(item.value)}
            className={[
              "relative z-10 px-[var(--l)] py-[var(--s)] rounded-[var(--3xl)]",
              "text-[14px] font-medium leading-[1.2] transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-600)]",
              isActive
                ? "text-[var(--constant-white)]"
                : "text-[var(--primary-600)] hover:bg-[var(--primary-100)]",
              item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Typography variant="text" as="span" className="inherit-color">
              {item.label}
            </Typography>
          </button>
        );
      })}
    </div>
  );
}

Tabs.displayName = "Tabs";
