"use client";

import React from "react";

/**
 * Icon — Atom
 * Foundation: Font Awesome (loaded via kit script)
 * Doc: .claude/skills/docs/foundations/icons.md
 *
 * Wraps Font Awesome <i> elements with consistent sizing and accessibility.
 *
 * Usage:
 *   <Icon name="fa-chevron-down" />                  — solid 16px (default)
 *   <Icon name="fa-xmark" size="lg" />               — solid 24px
 *   <Icon name="fa-chevron-right" weight="regular" /> — regular weight
 *   <Icon name="fa-star" className="text-[var(--accent-600)]" /> — custom color
 */

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconWeight = "solid" | "regular";

const sizeStyles: Record<IconSize, string> = {
  xs: "text-[12px]",
  sm: "text-[14px]",
  md: "text-[16px]",
  lg: "text-[20px]",
  xl: "text-[24px]",
};

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** Font Awesome icon name (e.g. "fa-chevron-down", "fa-star") */
  name: string;
  /** Icon size preset */
  size?: IconSize;
  /** Font Awesome weight: solid (default) or regular */
  weight?: IconWeight;
  /** Accessible label — if provided, icon is functional (role="img"); otherwise decorative (aria-hidden) */
  label?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  weight = "solid",
  label,
  className = "",
  ...props
}) => {
  const weightClass = weight === "regular" ? "fa-regular" : "fa-solid";

  if (label) {
    return (
      <i
        className={`${weightClass} ${name} ${sizeStyles[size]} ${className}`}
        role="img"
        aria-label={label}
        {...props}
      />
    );
  }

  return (
    <i
      className={`${weightClass} ${name} ${sizeStyles[size]} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
};

Icon.displayName = "Icon";
