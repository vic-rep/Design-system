"use client";

import React from "react";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-alt text-on-surface",
  primary: "bg-primary text-on-primary",
  success: "bg-success text-white",
  warning: "bg-warning text-black",
  error: "bg-error text-white",
  info: "bg-info text-white",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
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
      "inline-flex items-center font-medium rounded-sm whitespace-nowrap",
      variantStyles[variant],
      sizeStyles[size],
      className,
    ].join(" ")}
    {...props}
  >
    {children}
  </span>
);
