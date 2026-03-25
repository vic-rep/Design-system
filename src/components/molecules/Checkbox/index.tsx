"use client";

import React, { useId } from "react";

/**
 * Checkbox — Molecule (binary selection with label)
 * Figma: Page 45:6 → Node 157:11
 * Doc: .claude/skills/docs/molecules/checkbox.md
 *
 * States: unchecked, checked (Accent-600 fill + white checkmark), disabled, error, warning
 * Motion: Check/uncheck 150ms ease on background/border
 */

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  warning?: boolean;
  label?: string;
  message?: string;
  id?: string;
  className?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  error = false,
  warning = false,
  label,
  message,
  id: externalId,
  className = "",
}: CheckboxProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const messageId = (error || warning) && message ? `${id}-message` : undefined;

  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const boxBorderClass = error
    ? "border-[var(--destructive-550)]"
    : "border-[var(--primary-800)]";

  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      {/* Checkbox + Label row */}
      <div className={`inline-flex items-center gap-[var(--s)] ${disabled ? "opacity-20" : ""}`}>
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={messageId}
            className="sr-only peer"
          />
          <div
            onClick={handleChange}
            className={[
              "w-[24px] h-[24px] rounded-[var(--xs)] border flex items-center justify-center",
              "transition-all duration-150 ease-in-out",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--accent-600)] peer-focus-visible:outline-offset-2",
              checked
                ? "bg-[var(--accent-600)] border-[var(--accent-600)]"
                : `bg-white ${boxBorderClass}`,
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {checked && (
              <i
                className="fa-solid fa-check text-white text-[12px]"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        {label && (
          <label
            htmlFor={id}
            className={[
              "text-[14px] text-[var(--primary-900)] select-none leading-[1.2]",
              "font-normal",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
            style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error / Warning message row */}
      {(error || warning) && message && (
        <div
          id={messageId}
          className="flex items-center gap-[6px] mt-[2px]"
        >
          <i
            className={`fa-solid fa-circle-exclamation text-[14px] ${
              error
                ? "text-[var(--destructive-550)]"
                : "text-[var(--warning-500)]"
            }`}
            aria-hidden="true"
          />
          <span
            className={`text-[14px] leading-[1.2] font-normal ${
              error
                ? "text-[var(--destructive-550)]"
                : "text-[var(--warning-500)]"
            }`}
            style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
          >
            {message}
          </span>
        </div>
      )}
    </div>
  );
}
