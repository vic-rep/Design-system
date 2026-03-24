"use client";

import React from "react";

export type PillVariant = "default" | "accent" | "success" | "warning" | "destructive";

export interface PillProps {
  children: React.ReactNode;
  variant?: PillVariant;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<PillVariant, string> = {
  default: "bg-[var(--primary-100)] text-[var(--primary-900)]",
  accent: "bg-[var(--accent-100)] text-[var(--accent-800)]",
  success: "bg-[var(--success-100)] text-[var(--success-800)]",
  warning: "bg-[var(--warning-100)] text-[var(--warning-600)]",
  destructive: "bg-[var(--destructive-100)] text-[var(--destructive-600)]",
};

const selectedBorders: Record<PillVariant, string> = {
  default: "ring-1 ring-[var(--primary-400)]",
  accent: "ring-1 ring-[var(--accent-600)]",
  success: "ring-1 ring-[var(--success-700)]",
  warning: "ring-1 ring-[var(--warning-500)]",
  destructive: "ring-1 ring-[var(--destructive-550)]",
};

export function Pill({
  children,
  variant = "default",
  selected = false,
  onClick,
  className = "",
}: PillProps) {
  const isInteractive = !!onClick;
  const Tag = isInteractive ? "button" : "span";

  return (
    <Tag
      {...(isInteractive ? { type: "button", role: "button", onClick, tabIndex: 0 } : {})}
      className={[
        "inline-flex items-center px-[var(--m)] py-[var(--xs)] rounded-[var(--4xl)]",
        "text-[12px] font-medium leading-[1.2] transition-all duration-150",
        variantStyles[variant],
        selected ? selectedBorders[variant] : "",
        isInteractive ? "cursor-pointer hover:opacity-80" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

Pill.displayName = "Pill";
