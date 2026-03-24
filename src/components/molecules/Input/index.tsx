"use client";

import React, { forwardRef, useId } from "react";

/**
 * Input — Molecule
 * Figma: Page 45:8 → Section 158:247
 * Doc: .claude/skills/docs/molecules/input.md
 *
 * Sizes: sm (32px), md (40px), lg (48px)
 * States: default, focused, error, disabled
 */

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: InputSize;
  leftIcon?: string;
  rightIcon?: string;
}

const sizeStyles: Record<InputSize, { input: string; text: string }> = {
  sm: {
    input: "h-[32px] px-[var(--space-s)] text-[14px]",
    text: "text-[12px]",
  },
  md: {
    input: "h-[40px] px-[var(--space-m)] text-[16px]",
    text: "text-[14px]",
  },
  lg: {
    input: "h-[48px] px-[var(--space-l)] text-[16px]",
    text: "text-[14px]",
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      inputSize = "md",
      leftIcon,
      rightIcon,
      disabled,
      id: externalId,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText && !error ? `${id}-helper` : undefined;
    const describedBy = errorId ?? helperId;
    const hasError = Boolean(error);

    return (
      <div className={`flex flex-col gap-[var(--space-xs)] ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className={`font-medium ${sizeStyles[inputSize].text} text-[var(--primary-900)]`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <i
              className={`fa-solid ${leftIcon} absolute left-[var(--space-m)] top-1/2 -translate-y-1/2 text-[var(--primary-400)]`}
              aria-hidden="true"
            />
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={[
              "w-full rounded-[var(--radius-lg)] border bg-[var(--surface-adjacent)]",
              "font-[var(--font-sans)] text-[var(--primary-900)]",
              "placeholder:text-[var(--primary-400)]",
              "transition-[border-color] duration-150 ease-in-out",
              "focus-visible:outline-none focus-visible:border-[var(--accent-600)] focus-visible:ring-2 focus-visible:ring-[var(--accent-600)]/20",
              sizeStyles[inputSize].input,
              leftIcon ? "pl-[var(--space-5xl)]" : "",
              rightIcon ? "pr-[var(--space-5xl)]" : "",
              hasError
                ? "border-[var(--destructive-550)] focus-visible:border-[var(--destructive-550)] focus-visible:ring-[var(--destructive-550)]/20"
                : "border-[var(--primary-200)]",
              disabled ? "opacity-50 cursor-not-allowed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />
          {rightIcon && (
            <i
              className={`fa-solid ${rightIcon} absolute right-[var(--space-m)] top-1/2 -translate-y-1/2 text-[var(--primary-400)]`}
              aria-hidden="true"
            />
          )}
        </div>
        {error && (
          <span id={errorId} className={`${sizeStyles[inputSize].text} text-[var(--destructive-550)]`} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className={`${sizeStyles[inputSize].text} text-[var(--primary-500)]`}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
