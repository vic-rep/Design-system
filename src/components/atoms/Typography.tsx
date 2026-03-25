"use client";

import React from "react";

/**
 * Typography — Atom
 * Foundation: Source Sans 3, responsive at 768px breakpoint
 * Doc: .claude/skills/docs/foundations/typography.md
 *
 * Desktop scale:
 *   h1: 48px/600, h2: 40px/600, h3: 36px/600, h4: 32px/600,
 *   h5: 24px/500, h6: 20px/500,
 *   textLg: 18px/400, text: 16px/400, textM: 16px/500,
 *   textSm: 14px/400, caption: 12px/400
 *
 * Mobile scale (< 768px):
 *   h1: 32px/600, h2: 28px/600, h3: 24px/600, h4: 20px/600,
 *   h5: 18px/500, h6: 16px/500,
 *   textLg: 16px/400, text: 14px/400, textM: 14px/500,
 *   textSm: 12px/400, caption: 10px/400
 */

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "textLg"
  | "text"
  | "textM"
  | "textSm"
  | "caption";

const defaultElements: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  textLg: "p",
  text: "p",
  textM: "p",
  textSm: "span",
  caption: "span",
};

/**
 * Desktop + responsive mobile styles.
 * Pattern: "desktop-classes  max-md:mobile-classes"
 * All use leading-[1.2] except mobile textSm (1.3) and caption (1.3).
 */
const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-[48px] font-semibold leading-[1.2] max-md:text-[32px]",
  h2: "text-[40px] font-semibold leading-[1.2] max-md:text-[28px]",
  h3: "text-[36px] font-semibold leading-[1.2] max-md:text-[24px]",
  h4: "text-[32px] font-semibold leading-[1.2] max-md:text-[20px]",
  h5: "text-[24px] font-medium leading-[1.2] max-md:text-[18px]",
  h6: "text-[20px] font-medium leading-[1.2] max-md:text-[16px]",
  textLg: "text-[18px] font-normal leading-[1.2] max-md:text-[16px]",
  text: "text-[16px] font-normal leading-[1.2] max-md:text-[14px]",
  textM: "text-[16px] font-medium leading-[1.2] max-md:text-[14px]",
  textSm: "text-[14px] font-normal leading-[1.2] max-md:text-[12px] max-md:leading-[1.3]",
  caption: "text-[12px] font-normal leading-[1.2] max-md:text-[10px] max-md:leading-[1.3]",
};

/** Common color presets (use className for full override) */
export type TypographyColor =
  | "primary"   // --primary-900
  | "secondary" // --primary-700
  | "muted"     // --primary-500
  | "subtle"    // --primary-400
  | "accent"    // --accent-600
  | "success"   // --success-700
  | "error"     // --destructive-550
  | "white"     // --constant-white
  | "inherit";  // inherit from parent

const colorStyles: Record<TypographyColor, string> = {
  primary: "text-[var(--primary-900)]",
  secondary: "text-[var(--primary-700)]",
  muted: "text-[var(--primary-500)]",
  subtle: "text-[var(--primary-400)]",
  accent: "text-[var(--accent-600)]",
  success: "text-[var(--success-700)]",
  error: "text-[var(--destructive-550)]",
  white: "text-[var(--constant-white)]",
  inherit: "text-inherit",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Typography scale variant */
  variant?: TypographyVariant;
  /** Override the rendered HTML element */
  as?: React.ElementType;
  /** Color preset */
  color?: TypographyColor;
  /** Bold override (applies font-bold regardless of variant weight) */
  bold?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "text",
  as,
  color = "primary",
  bold,
  className = "",
  children,
  style,
  ...props
}) => {
  const Component = as ?? defaultElements[variant];

  return (
    <Component
      className={[
        "font-['Source_Sans_3',sans-serif]",
        variantStyles[variant],
        colorStyles[color],
        bold ? "!font-bold" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};

Typography.displayName = "Typography";
