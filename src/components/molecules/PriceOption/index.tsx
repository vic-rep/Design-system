"use client";

import React from "react";

/**
 * PriceOption — Molecule (selectable price cell)
 * Figma: Page 3124:20861 "Price" → 4 variants
 *   State=Default,  Hover=False (3124:20860)
 *   State=Default,  Hover=True  (3124:20859)
 *   State=Selected, Hover=False (3124:20857)
 *   State=Selected, Hover=True  (3124:20858)
 *
 * Used inside OfferComparisonTable cells.
 *
 * Visual:
 *   Default:  white bg, primary-200 border
 *   Hover:    surface bg tint
 *   Selected: accent-100 bg, accent-600 border
 *
 * Content:
 *   Row 1 (centered): "4x" · "380,25" · "€"   — instalments toggle hides "4x"
 *   Row 2 (centered): "782.02 лева"
 */

export interface PriceOptionProps {
  euro: string;
  bgn: string;
  currency?: string;
  instalments?: boolean;
  multiplier?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

const fontFeature = {
  fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
};

export function PriceOption({
  euro,
  bgn,
  currency = "лева",
  instalments = true,
  multiplier = "4x",
  selected = false,
  disabled = false,
  onClick,
  ariaLabel,
  className = "",
}: PriceOptionProps) {
  const interactive = !!onClick && !disabled;

  const stateClasses = selected
    ? "bg-[var(--accent-100)] border-[var(--accent-600)]"
    : "bg-[var(--surface-adjacent)] border-[var(--primary-200)]";

  const hoverClasses = interactive
    ? selected
      ? "hover:bg-[var(--accent-200)]"
      : "hover:bg-[var(--surface)] hover:border-[var(--primary-300)]"
    : "";

  return (
    <button
      type="button"
      role={interactive ? "radio" : undefined}
      aria-checked={interactive ? selected : undefined}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex flex-col items-stretch w-full",
        "rounded-[var(--xs)] border border-solid",
        "px-[var(--m)] py-[var(--s)]",
        "transition-colors duration-150 ease-in-out",
        "focus-visible:outline-2 focus-visible:outline-[var(--accent-600)] focus-visible:outline-offset-2",
        stateClasses,
        hoverClasses,
        interactive ? "cursor-pointer" : "cursor-default",
        disabled ? "opacity-40 cursor-not-allowed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={fontFeature}
    >
      <span className="flex w-full items-center justify-center gap-[var(--xs)]">
        {instalments && (
          <span className="text-[10px] leading-[1.3] font-normal text-[var(--primary-400)]">
            {multiplier}
          </span>
        )}
        <span className="text-[16px] leading-[1.2] font-semibold text-[var(--primary-900)]">
          {euro}
        </span>
        <span className="text-[10px] leading-[1.3] font-normal text-[var(--primary-400)]">
          €
        </span>
      </span>
      <span className="flex w-full items-start justify-center gap-[var(--xs)] text-[10px] leading-[1.3] font-normal text-[var(--primary-400)]">
        <span>{bgn}</span>
        <span>{currency}</span>
      </span>
    </button>
  );
}

PriceOption.displayName = "PriceOption";
