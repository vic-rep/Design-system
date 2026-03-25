"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  legend?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  className = "",
}: RadioGroupProps) {
  return (
    <fieldset className={`flex flex-col gap-[var(--m)] ${className}`}>
      {legend && (
        <Typography variant="textSm" as="legend" className="!font-medium mb-[var(--xs)]">
          {legend}
        </Typography>
      )}
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <label
            key={opt.value}
            className={[
              "inline-flex items-center gap-[var(--s)] cursor-pointer",
              opt.disabled ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
          >
            <span className="relative flex items-center justify-center w-[20px] h-[20px]">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={opt.disabled}
                onChange={() => onChange?.(opt.value)}
                className="peer sr-only"
              />
              <span
                className={[
                  "w-[20px] h-[20px] rounded-full border-2 transition-colors duration-150",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-600)] peer-focus-visible:ring-offset-2",
                  isSelected
                    ? "border-[var(--accent-600)]"
                    : "border-[var(--primary-300)]",
                ].join(" ")}
              />
              {isSelected && (
                <span className="absolute w-[10px] h-[10px] rounded-full bg-[var(--accent-600)]" />
              )}
            </span>
            <Typography variant="textSm" as="span">
              {opt.label}
            </Typography>
          </label>
        );
      })}
    </fieldset>
  );
}

RadioGroup.displayName = "RadioGroup";
