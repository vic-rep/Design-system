"use client";

import React from "react";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "overline" | "code";

const defaultElements: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  caption: "span",
  overline: "span",
  code: "code",
};

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  body: "text-base",
  caption: "text-sm",
  overline: "text-xs font-semibold uppercase tracking-widest",
  code: "font-mono text-sm bg-surface-alt px-1.5 py-0.5 rounded-sm",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  muted?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  as,
  muted = false,
  className = "",
  children,
  ...props
}) => {
  const Component = as ?? defaultElements[variant];

  return (
    <Component
      className={[
        variantStyles[variant],
        muted ? "text-on-surface-muted" : "text-on-surface",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
};
