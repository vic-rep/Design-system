"use client";

import React from "react";

export type CardVariant = "default" | "outlined" | "elevated";
export type CardPadding = "sm" | "md" | "lg";

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: "border border-border/50 bg-surface-adjacent",
  outlined: "border border-border bg-surface-adjacent",
  elevated: "bg-surface-adjacent shadow-md",
};

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

const headerFooterPadding: Record<CardPadding, string> = {
  sm: "px-3 py-3",
  md: "px-5 py-3",
  lg: "px-8 py-4",
};

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  header,
  footer,
  children,
  className = "",
}) => {
  return (
    <div
      className={[
        "rounded-lg overflow-hidden",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {header && (
        <div className={`border-b border-border ${headerFooterPadding[padding]}`}>
          {header}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
      {footer && (
        <div className={`border-t border-border ${headerFooterPadding[padding]}`}>
          {footer}
        </div>
      )}
    </div>
  );
};
