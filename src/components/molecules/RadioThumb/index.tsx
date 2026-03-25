"use client";

import React from "react";
import { Icon } from "@/components/atoms/Icon";
import { Typography } from "@/components/atoms/Typography";

/**
 * RadioThumb — Molecule (thumbnail radio selection card)
 * Figma: Node 2418:32
 *
 * Types: Logo (custom ReactNode) or Icon (FA icon)
 * States: Default, Hover, Active, Disabled
 * Card: 96px wide, rounded-s, padding-s
 * Default: primary-100 bg, primary-300 border
 * Hover: accent-100 bg, accent-300 border
 * Active: accent-100 bg, accent-400 border
 * Disabled: opacity-20
 * Label: 10px caption, centered
 * Optional disclaimer text below card
 */

export type RadioThumbType = "logo" | "icon";

export interface RadioThumbOption {
  value: string;
  label: string;
  /** FA icon class for type="icon" (e.g. "fa-shop") */
  icon?: string;
  /** Custom ReactNode for type="logo" */
  logo?: React.ReactNode;
  /** Disclaimer text shown below the card */
  disclaimer?: string;
  disabled?: boolean;
}

export interface RadioThumbGroupProps {
  name: string;
  type?: RadioThumbType;
  options: RadioThumbOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioThumbGroup({
  name,
  type = "icon",
  options,
  value,
  onChange,
  className = "",
}: RadioThumbGroupProps) {
  return (
    <fieldset className={`flex gap-[var(--m)] flex-wrap ${className}`}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        const isDisabled = opt.disabled ?? false;

        return (
          <label
            key={opt.value}
            className={[
              "flex flex-col items-center gap-[var(--s)]",
              isDisabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {/* Hidden native radio */}
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isActive}
              disabled={isDisabled}
              onChange={() => onChange?.(opt.value)}
              className="sr-only peer"
            />

            {/* Thumb card */}
            <div
              className={[
                "flex flex-col items-center justify-center gap-[var(--xs)] w-[96px]",
                "p-[var(--s)] rounded-[var(--s)] border",
                "transition-all duration-150",
                isActive
                  ? "bg-[var(--accent-100)] border-[var(--accent-400)]"
                  : "bg-[var(--primary-100)] border-[var(--primary-300)]",
                !isDisabled && !isActive
                  ? "hover:bg-[var(--accent-100)] hover:border-[var(--accent-300)]"
                  : "",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-600)] peer-focus-visible:ring-offset-2",
              ].join(" ")}
            >
              {/* Logo or Icon */}
              {type === "logo" && opt.logo ? (
                <div className="flex items-center justify-center h-[24px] w-[64px] overflow-hidden">
                  {opt.logo}
                </div>
              ) : (
                <Icon
                  name={opt.icon || "fa-house"}
                  weight="regular"
                  size="xl"
                  className="text-[var(--primary-900)]"
                />
              )}

              {/* Label */}
              <Typography
                variant="caption"
                as="span"
                className="!text-[10px] !leading-[1.3] text-center w-full"
                style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
              >
                {opt.label}
              </Typography>
            </div>

            {/* Disclaimer */}
            {opt.disclaimer && (
              <Typography
                variant="caption"
                as="span"
                className="!text-[10px] !leading-[1.3] whitespace-nowrap"
                style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
              >
                {opt.disclaimer}
              </Typography>
            )}
          </label>
        );
      })}
    </fieldset>
  );
}

RadioThumbGroup.displayName = "RadioThumbGroup";
