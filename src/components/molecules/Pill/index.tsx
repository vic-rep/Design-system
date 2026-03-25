"use client";

import React from "react";

/**
 * Pill — Molecule (compact label / filter chip)
 * Figma: Page 74:11 → Node 409:3053
 * Doc: .claude/skills/docs/molecules/pill.md
 *
 * Sizes: XS, S, M, L (with size-specific padding, text, icon sizes)
 * Variants: default, accent, success, warning, destructive
 * Features: border/stroke, optional leading/trailing FA icons
 */

export type PillVariant = "default" | "accent" | "success" | "warning" | "destructive";
export type PillSize = "xs" | "s" | "m" | "l";

export interface PillProps {
  children: React.ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  selected?: boolean;
  onClick?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
}

/* Fill + stroke per variant */
const variantStyles: Record<PillVariant, string> = {
  default: "bg-[var(--surface-adjacent)] border border-[var(--primary-300)] text-[var(--primary-900)]",
  accent: "bg-[var(--accent-100)] border border-[var(--accent-300)] text-[var(--accent-800)]",
  success: "bg-[var(--success-100)] border border-[var(--success-300)] text-[var(--success-800)]",
  warning: "bg-[var(--warning-100)] border border-[var(--warning-300)] text-[var(--warning-600)]",
  destructive: "bg-[var(--destructive-100)] border border-[var(--destructive-300)] text-[var(--destructive-600)]",
};

/* Selected: stronger border */
const selectedStyles: Record<PillVariant, string> = {
  default: "border-[var(--primary-900)]",
  accent: "border-[var(--accent-600)]",
  success: "border-[var(--success-700)]",
  warning: "border-[var(--warning-500)]",
  destructive: "border-[var(--destructive-550)]",
};

/* Padding per size */
const sizePadding: Record<PillSize, string> = {
  xs: "px-[var(--s)] py-[var(--xs)]",
  s: "px-[var(--m)] py-[var(--xs)]",
  m: "px-[var(--l)] py-[var(--s)]",
  l: "px-[var(--l)] py-[var(--s)]",
};

/* Typography per size */
const sizeText: Record<PillSize, string> = {
  xs: "text-[12px] leading-[1.3] font-normal",
  s: "text-[14px] leading-[1.2] font-normal",
  m: "text-[14px] leading-[1.2] font-medium",
  l: "text-[16px] leading-[1.2] font-normal",
};

/* Icon sizing per pill size — S/M/XS use 12px, L uses 16px */
const sizeIcon: Record<PillSize, string> = {
  xs: "text-[12px] w-[12px] h-[12px]",
  s: "text-[12px] w-[12px] h-[12px]",
  m: "text-[12px] w-[12px] h-[12px]",
  l: "text-[16px] w-[16px] h-[16px]",
};

export function Pill({
  children,
  variant = "default",
  size = "xs",
  selected = false,
  onClick,
  leftIcon,
  rightIcon,
  className = "",
}: PillProps) {
  const isInteractive = !!onClick;
  const Tag = isInteractive ? "button" : "span";

  return (
    <Tag
      {...(isInteractive ? { type: "button" as const, role: "button" as const, onClick, tabIndex: 0 } : {})}
      className={[
        "inline-flex items-center justify-center gap-[var(--s)] rounded-[var(--xxl)]",
        "transition-all duration-150",
        sizePadding[size],
        sizeText[size],
        variantStyles[variant],
        selected ? selectedStyles[variant] : "",
        isInteractive ? "cursor-pointer hover:opacity-80" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
    >
      {leftIcon && (
        <i
          className={`fa-regular ${leftIcon} ${sizeIcon[size]} shrink-0`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {rightIcon && (
        <i
          className={`fa-regular ${rightIcon} ${sizeIcon[size]} shrink-0`}
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}

Pill.displayName = "Pill";
