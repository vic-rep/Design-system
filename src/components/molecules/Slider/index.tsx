"use client";

import React from "react";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  formatValue,
  disabled = false,
  className = "",
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : String(value);
  const id = React.useId();

  return (
    <div className={`flex flex-col gap-[var(--s)] ${disabled ? "opacity-50" : ""} ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-[14px] font-medium text-[var(--primary-900)] leading-[1.2]">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-[14px] font-medium text-[var(--primary-900)]">
              {displayValue}
            </span>
          )}
        </div>
      )}
      <div className="relative w-full h-[20px] flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-[4px] rounded-full bg-[var(--primary-200)]" />
        {/* Active fill */}
        <div
          className="absolute left-0 h-[4px] rounded-full bg-[var(--accent-600)]"
          style={{ width: `${percent}%` }}
        />
        {/* Native range input */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          style={{ zIndex: 2 }}
        />
        {/* Thumb visual */}
        <div
          className="absolute w-[20px] h-[20px] rounded-full bg-[var(--constant-white)] border-2 border-[var(--accent-600)] pointer-events-none transition-shadow duration-150"
          style={{
            left: `calc(${percent}% - 10px)`,
            boxShadow: "var(--elevation-level1)",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

Slider.displayName = "Slider";
