"use client";

import React, { useId } from "react";

/**
 * Checkbox — Molecule (binary selection with label)
 * Figma: Page 45:6 → Section 98:1621
 * Doc: .claude/skills/docs/molecules/checkbox.md
 *
 * States: unchecked, checked (Accent-600 fill + white checkmark), disabled, error, focused
 * Motion: Check/uncheck 150ms ease on background/border
 */

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  id?: string;
  className?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  error = false,
  label,
  id: externalId,
  className = "",
}: CheckboxProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <div className={`inline-flex items-start gap-[var(--space-s)] ${className}`}>
      <div className="relative flex items-center justify-center mt-[2px]">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={error || undefined}
          className="sr-only peer"
        />
        <div
          onClick={handleChange}
          className={[
            "w-[20px] h-[20px] rounded-[var(--radius-sm)] border-2 flex items-center justify-center",
            "transition-all duration-150 ease-in-out cursor-pointer",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--accent-600)] peer-focus-visible:outline-offset-2",
            checked
              ? "bg-[var(--accent-600)] border-[var(--accent-600)]"
              : error
                ? "bg-transparent border-[var(--destructive-550)]"
                : "bg-transparent border-[var(--primary-300)]",
            disabled ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {checked && (
            <i
              className="fa-solid fa-check text-[var(--constant-white)] text-[12px]"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={[
            "text-[16px] text-[var(--primary-900)] select-none leading-[1.2]",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
        >
          {label}
        </label>
      )}
    </div>
  );
}
