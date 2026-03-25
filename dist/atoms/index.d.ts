import React from 'react';

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type InputVariant = "default" | "filled" | "outline";
type InputSize = "sm" | "md" | "lg";
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    helperText?: string;
    error?: string;
    variant?: InputVariant;
    inputSize?: InputSize;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Badge — Atom
 * Small status indicator using design system CSS variables.
 *
 * Variants map to DS color tokens.
 */
type BadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
}
declare const Badge: React.FC<BadgeProps>;

type ToggleSize = "sm" | "md";
interface ToggleProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: ToggleSize;
    label?: string;
    disabled?: boolean;
    id?: string;
    className?: string;
}
declare const Toggle: React.FC<ToggleProps>;

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
type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "textLg" | "text" | "textM" | "textSm" | "caption";
/** Common color presets (use className for full override) */
type TypographyColor = "primary" | "secondary" | "muted" | "subtle" | "accent" | "success" | "error" | "white" | "inherit";
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    /** Typography scale variant */
    variant?: TypographyVariant;
    /** Override the rendered HTML element */
    as?: React.ElementType;
    /** Color preset */
    color?: TypographyColor;
    /** Bold override (applies font-bold regardless of variant weight) */
    bold?: boolean;
}
declare const Typography: React.FC<TypographyProps>;

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
type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
type IconWeight = "solid" | "regular";
interface IconProps extends React.HTMLAttributes<HTMLElement> {
    /** Font Awesome icon name (e.g. "fa-chevron-down", "fa-star") */
    name: string;
    /** Icon size preset */
    size?: IconSize;
    /** Font Awesome weight: solid (default) or regular */
    weight?: IconWeight;
    /** Accessible label — if provided, icon is functional (role="img"); otherwise decorative (aria-hidden) */
    label?: string;
}
declare const Icon: React.FC<IconProps>;

export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Icon, type IconProps, type IconSize, type IconWeight, Input, type InputProps, type InputSize, type InputVariant, Toggle, type ToggleProps, type ToggleSize, Typography, type TypographyColor, type TypographyProps, type TypographyVariant };
