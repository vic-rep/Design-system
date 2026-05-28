"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";

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
 * Content (all text via Typography atom — responsive at 768px):
 *   Row 1 (centered): "4x" · "380,25" · "€"
 *     multiplier + currency → caption  (12px desktop / 10px mobile)
 *     euro amount           → textM    (16px desktop / 14px mobile, semibold)
 *   Row 2 (centered): "782.02 лева"
 *     bgn + currency label  → caption  (12px desktop / 10px mobile)
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
      style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
    >
      {/* Row 1: multiplier · euro amount · € */}
      <span className="flex w-full items-center justify-center gap-[var(--xs)]">
        {instalments && (
          <Typography variant="caption" as="span" color="subtle">
            {multiplier}
          </Typography>
        )}
        <Typography
          variant="textM"
          as="span"
          color="primary"
          className="!font-semibold"
        >
          {euro}
        </Typography>
        <Typography variant="caption" as="span" color="subtle">
          €
        </Typography>
      </span>

      {/* Row 2: bgn amount · currency label */}
      <span className="flex w-full items-center justify-center gap-[var(--xs)]">
        <Typography variant="caption" as="span" color="subtle">
          {bgn}
        </Typography>
        <Typography variant="caption" as="span" color="subtle">
          {currency}
        </Typography>
      </span>
    </button>
  );
}

PriceOption.displayName = "PriceOption";
