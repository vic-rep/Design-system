"use client";

import React, { useId } from "react";

export type ToggleSize = "sm" | "md";

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const trackSize: Record<ToggleSize, string> = {
  sm: "w-8 h-[18px]",
  md: "w-11 h-6",
};

const thumbSize: Record<ToggleSize, { base: string; translate: string }> = {
  sm: { base: "h-3.5 w-3.5", translate: "translate-x-[14px]" },
  md: { base: "h-5 w-5", translate: "translate-x-5" },
};

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  size = "md",
  label,
  disabled = false,
  id,
  className = "",
}) => {
  const autoId = useId();
  const toggleId = id ?? autoId;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      if (!disabled) onChange?.(!checked);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        id={toggleId}
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        onKeyDown={handleKeyDown}
        className={[
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-xl transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          trackSize[size],
          checked ? "bg-primary" : "bg-border",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
            thumbSize[size].base,
            checked ? thumbSize[size].translate : "translate-x-0.5",
          ].join(" ")}
        />
      </button>
      {label && (
        <label
          htmlFor={toggleId}
          className={`text-sm text-on-surface select-none ${disabled ? "opacity-50" : "cursor-pointer"}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
