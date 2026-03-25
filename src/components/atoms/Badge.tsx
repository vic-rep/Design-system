"use client";

import React from "react";

/**
 * Badge — Atom
 * Small status indicator using design system CSS variables.
 *
 * Variants map to DS color tokens.
 */

export type BadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--primary-200)] text-[var(--primary-900)]",
  accent: "bg-[var(--accent-100)] text-[var(--accent-800)]",
  success: "bg-[var(--success-100)] text-[var(--success-700)]",
  warning: "bg-[var(--warning-100)] text-[var(--warning-600)]",
  error: "bg-[var(--destructive-100)] text-[var(--destructive-600)]",
  info: "bg-[var(--accent-100)] text-[var(--accent-700)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-[var(--xs)] py-[1px] text-[10px]",
  md: "px-[var(--s)] py-[var(--xxs)] text-[12px]",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => (
  <span
    className={[
      "inline-flex items-center font-medium rounded-[var(--xs)]",
      "font-['Source_Sans_3',sans-serif] leading-[1.2] whitespace-nowrap",
      variantStyles[variant],
      sizeStyles[size],
      className,
    ].join(" ")}
    {...props}
  >
    {children}
  </span>
);

Badge.displayName = "Badge";
