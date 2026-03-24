"use client";

import React, { forwardRef, useId } from "react";

export type InputVariant = "default" | "filled" | "outline";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
}

const variantStyles: Record<InputVariant, string> = {
  default: "bg-surface border border-border",
  filled: "bg-surface-alt border border-transparent",
  outline: "bg-transparent border border-border",
};

const sizeStyles: Record<InputSize, string> = {
  sm: "px-2 py-1 text-sm rounded-sm",
  md: "px-3 py-2 text-sm rounded-md",
  lg: "px-4 py-3 text-base rounded-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, variant = "default", inputSize = "md", className = "", id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full text-on-surface placeholder:text-on-surface-muted transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            variantStyles[variant],
            sizeStyles[inputSize],
            error ? "border-error focus-visible:ring-error" : "",
            className,
          ].join(" ")}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-on-surface-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
