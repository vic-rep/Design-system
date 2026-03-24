"use client";

import React, { forwardRef } from "react";

/**
 * Button — Molecule
 * Figma: nG8PGu5CclffafrfZuMG9G node 108:2107
 * Doc: .claude/skills/docs/molecules/button.md
 *
 * Types: Primary, Secondary, Link, Icon
 * Sizes: S, M, L, XL
 * States: Default, Hover, Active, Focus, Disabled
 */

export type ButtonType = "primary" | "secondary" | "link" | "icon";
export type ButtonSize = "s" | "m" | "l" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
}

const typeStyles: Record<ButtonType, string> = {
  primary: [
    "bg-[var(--accent-600,#f76803)] text-white",
    "hover:bg-[var(--accent-500,#fc7d21)]",
    "active:bg-[var(--accent-500,#fc7d21)]",
    "focus-visible:bg-[var(--accent-600,#f76803)] focus-visible:border focus-visible:border-[var(--accent-700,#c55302)]",
    "disabled:bg-[var(--surface-adjacent-2,#e1e5eb)] disabled:text-white",
  ].join(" "),
  secondary: [
    "bg-white text-[var(--primary-900,#191919)] border border-[var(--primary-900,#191919)]",
    "hover:bg-[var(--surface,#f3f2f0)]",
    "active:bg-[var(--surface,#f3f2f0)]",
    "focus-visible:border-[var(--accent-700,#c55302)]",
    "disabled:bg-[var(--surface-adjacent-2,#e1e5eb)] disabled:opacity-20",
  ].join(" "),
  link: [
    "bg-transparent text-[var(--primary-900,#191919)]",
    "hover:text-[var(--accent-600,#f76803)]",
    "active:text-[var(--accent-600,#f76803)]",
    "disabled:opacity-20",
  ].join(" "),
  icon: [
    "bg-transparent text-[var(--primary-900,#191919)] rounded-full",
    "hover:bg-[var(--surface-adjacent-2,#e1e5eb)]",
    "active:bg-[var(--surface-adjacent-2,#e1e5eb)]",
    "focus-visible:border focus-visible:border-[var(--accent-700,#c55302)]",
    "disabled:opacity-20",
  ].join(" "),
};

const sizeStyles: Record<ButtonType, Record<ButtonSize, string>> = {
  primary: {
    s: "px-[var(--space-s,8px)] py-[var(--space-xs,4px)] text-[14px]",
    m: "p-[var(--space-s,8px)] text-[14px]",
    l: "px-[var(--space-l,16px)] py-[var(--space-s,8px)] text-[14px]",
    xl: "px-[var(--space-xl,20px)] py-[var(--space-m,12px)] text-[14px]",
  },
  secondary: {
    s: "px-[var(--space-s,8px)] py-[var(--space-xs,4px)] text-[14px]",
    m: "p-[var(--space-s,8px)] text-[14px]",
    l: "px-[var(--space-l,16px)] py-[var(--space-s,8px)] text-[14px]",
    xl: "px-[var(--space-xl,20px)] py-[var(--space-m,12px)] text-[14px]",
  },
  link: {
    s: "text-[14px]",
    m: "text-[14px]",
    l: "text-[14px]",
    xl: "text-[14px]",
  },
  icon: {
    s: "p-[10px] w-[24px] h-[24px]",
    m: "p-[10px] w-[28px] h-[28px]",
    l: "p-[10px] w-[32px] h-[32px]",
    xl: "p-[10px] w-[40px] h-[40px]",
  },
};

const iconSizes: Record<ButtonSize, string> = {
  s: "text-[12px] w-[12px] h-[12px]",
  m: "text-[12px] w-[12px] h-[12px]",
  l: "text-[12px] w-[12px] h-[12px]",
  xl: "text-[16px] w-[16px] h-[16px]",
};

const iconOnlySizes: Record<ButtonSize, string> = {
  s: "text-[12px]",
  m: "text-[12px]",
  l: "text-[16px]",
  xl: "text-[20px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "l",
      loading = false,
      fullWidth = false,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isIcon = variant === "icon";
    const isLink = variant === "link";

    const baseRadius = isIcon ? "" : "rounded-[var(--radius-md,8px)]";

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={[
          "inline-flex items-center justify-center font-medium",
          "font-['Source_Sans_3',sans-serif]",
          "transition-all duration-150 ease-in-out",
          "focus-visible:outline-none",
          baseRadius,
          typeStyles[variant],
          sizeStyles[variant][size],
          isDisabled ? "cursor-not-allowed pointer-events-none" : "cursor-pointer",
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
        {...props}
      >
        {loading ? (
          <i
            className="fa-solid fa-spinner fa-spin"
            aria-hidden="true"
            style={{ fontSize: "inherit" }}
          />
        ) : isIcon ? (
          <i
            className={`fa-solid ${leadingIcon || "fa-house"} ${iconOnlySizes[size]}`}
            aria-hidden="true"
          />
        ) : (
          <span className="flex items-center gap-[12px]">
            {leadingIcon && (
              <i
                className={`fa-solid ${leadingIcon} ${iconSizes[size]} ${
                  isLink ? "text-[var(--accent-600,#f76803)]" : ""
                }`}
                aria-hidden="true"
              />
            )}
            <span className="leading-[1.2] whitespace-nowrap">{children}</span>
            {trailingIcon && (
              <i
                className={`fa-solid ${trailingIcon} ${iconSizes[size]} ${
                  isLink ? "text-[var(--accent-600,#f76803)]" : ""
                }`}
                aria-hidden="true"
              />
            )}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
