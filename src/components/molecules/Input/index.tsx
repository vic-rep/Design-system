"use client";

import React, { forwardRef, useId } from "react";
import { Tooltip } from "@/components/molecules/Tooltip";

/**
 * Input — Molecule
 * Figma: Page 45:8 → Node 156:1333
 *
 * States: default, focus, filled, typing, error, disabled
 * Field: 41px height, --m (12px) padding, --s (8px) border-radius
 * Label: 10px caption, --xs (4px) horizontal padding
 * Error: red bg (--destructive-100), red border (--destructive-300),
 *        error tooltip positioned top-right
 * Focus: border --primary-400 (#999)
 * Disabled: opacity 20%
 */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  showLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      showLabel = true,
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
    const hasError = Boolean(error);

    return (
      <div className={`relative flex flex-col gap-[var(--xs)] items-start ${className}`}>
        {/* Label row */}
        {showLabel && label && (
          <div className="flex items-center justify-center px-[var(--xs)] w-full">
            <label
              htmlFor={id}
              className="flex-1 font-normal text-[10px] leading-[1.3] text-[var(--primary-900)]"
            >
              {label}
            </label>
          </div>
        )}

        {/* Field */}
        <div className="relative w-full">
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={errorId}
            className={[
              "w-full h-[41px] p-[var(--m)] rounded-[var(--s)]",
              "font-normal text-[16px] leading-[1.2] text-[var(--primary-900)]",
              "placeholder:text-[var(--primary-400)]",
              "border transition-[border-color] duration-150 ease-in-out",
              "focus-visible:outline-none",
              hasError
                ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]"
                : "bg-[var(--surface-adjacent)] border-[var(--primary-300)] focus-visible:border-[var(--primary-400)]",
              disabled ? "opacity-20 cursor-not-allowed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {/* Error tooltip — positioned top-right of the input */}
          {hasError && error && (
            <div className="absolute right-0 bottom-full mb-[2px] z-10">
              <Tooltip content={error} type="error" position="bottom">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Error: ${error}`}
                  className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[var(--destructive-100)] border border-[var(--destructive-300)] text-[var(--destructive-600)] text-[10px] font-medium cursor-default"
                >
                  !
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
