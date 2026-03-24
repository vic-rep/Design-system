"use client";

import React, { useId } from "react";

/**
 * Toggle — Molecule (binary on/off switch)
 * Figma: Page 74:39 → Section 176:1866
 * Doc: .claude/skills/docs/molecules/toggle.md
 *
 * States: off (Primary-300 track), on (Accent-600 track), disabled, focused
 * Motion: 150ms ease on background + transform
 */

export type ToggleSize = "sm" | "md";

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  label?: string;
  id?: string;
  className?: string;
}

const sizeConfig: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: "w-[36px] h-[20px]",
    thumb: "w-[16px] h-[16px]",
    translate: "translateX(16px)",
  },
  md: {
    track: "w-[44px] h-[24px]",
    thumb: "w-[20px] h-[20px]",
    translate: "translateX(20px)",
  },
};

export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  id: externalId,
  className = "",
}: ToggleProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const config = sizeConfig[size];

  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      handleChange();
    }
  };

  return (
    <div className={`inline-flex items-center gap-[var(--s)] ${className}`}>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        className={[
          "relative inline-flex items-center rounded-[var(--radius-full)] p-[2px]",
          "transition-[background-color] duration-150 ease-in-out",
          "focus-visible:outline-2 focus-visible:outline-[var(--accent-600)] focus-visible:outline-offset-2",
          config.track,
          checked ? "bg-[var(--accent-600)]" : "bg-[var(--primary-300)]",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={[
            "block rounded-full bg-[var(--constant-white)] shadow-sm",
            "transition-transform duration-150 ease-in-out",
            config.thumb,
          ].join(" ")}
          style={{
            transform: checked ? config.translate : "translateX(0px)",
          }}
        />
      </button>
      {label && (
        <label
          htmlFor={id}
          className={[
            "text-[14px] text-[var(--primary-900)] select-none",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
        >
          {label}
        </label>
      )}
    </div>
  );
}
