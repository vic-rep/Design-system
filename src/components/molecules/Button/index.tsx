"use client";

import React, { forwardRef } from "react";

/**
 * Button — Molecule
 * Figma: Page 45:5 → Sections 81:880, 108:2693
 * Doc: .claude/skills/docs/molecules/button.md
 *
 * Variants: Primary, Secondary, Ghost, Destructive
 * Sizes: sm (32px), md (40px), lg (48px)
 * States: default, hover, active, focused, disabled, loading
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--accent-600)] text-[var(--constant-white)]",
    "hover:bg-[var(--accent-700)]",
    "active:bg-[var(--accent-800)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-[var(--accent-600)] border border-[var(--accent-600)]",
    "hover:bg-[var(--accent-100)]",
    "active:bg-[var(--accent-200)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--primary-900)]",
    "hover:bg-[var(--primary-100)]",
    "active:bg-[var(--primary-200)]",
  ].join(" "),
  destructive: [
    "bg-[var(--destructive-550)] text-[var(--constant-white)]",
    "hover:bg-[var(--destructive-600)]",
    "active:bg-[var(--destructive-600)]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-[32px] px-[var(--space-s)] text-[14px] gap-[var(--space-xs)]",
  md: "h-[40px] px-[var(--space-l)] text-[16px] gap-[var(--space-s)]",
  lg: "h-[48px] px-[var(--space-xl)] text-[18px] gap-[var(--space-s)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      icon,
      iconPosition = "left",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={[
          "inline-flex items-center justify-center font-medium rounded-[var(--radius-full)]",
          "transition-[background] duration-150 ease-in-out",
          "focus-visible:outline-2 focus-visible:outline-[var(--accent-600)] focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <i
            className="fa-solid fa-spinner fa-spin"
            aria-hidden="true"
            style={{ fontSize: "inherit" }}
          />
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span aria-hidden="true">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span aria-hidden="true">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
