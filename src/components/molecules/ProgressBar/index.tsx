"use client";

import React from "react";

/**
 * ProgressBar — Molecule
 * Figma: Page 45:11 → Nodes 2474:43 (web) & 815:144 (mobile)
 *
 * Web: full-width with back button + step label + progress line
 * Mobile: compact with smaller text
 * Track: --primary-300 bg, --xs height, fully rounded
 * Fill: --accent-600 (brand orange), animated width
 * Back button: fa-arrow-left icon
 */

export interface ProgressBarProps {
  /** Current step (1-based) */
  currentStep: number;
  /** Total steps */
  totalSteps: number;
  /** Label for current step */
  stepLabel?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back button handler */
  onBack?: () => void;
  className?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  stepLabel,
  showBack = true,
  onBack,
  className = "",
}: ProgressBarProps) {
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop layout */}
      <div className="hidden md:flex flex-col gap-[var(--m)]">
        <div className="flex items-center gap-[var(--m)]">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex items-center justify-center w-[32px] h-[32px] rounded-[var(--s)] hover:bg-[var(--primary-100)] transition-colors duration-150 cursor-pointer shrink-0"
            >
              <i
                className="fa-solid fa-arrow-left text-[16px] text-[var(--primary-900)]"
                aria-hidden="true"
              />
            </button>
          )}
          <div className="flex-1 flex items-center gap-[var(--s)]">
            {stepLabel && (
              <span className="text-[16px] font-medium text-[var(--primary-900)] leading-[1.2]">
                {stepLabel}
              </span>
            )}
            <span className="text-[14px] text-[var(--primary-400)] leading-[1.2]">
              {currentStep}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Track */}
        <div
          className="w-full h-[var(--xs)] bg-[var(--primary-300)] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={stepLabel ?? `Step ${currentStep} of ${totalSteps}`}
        >
          <div
            className="h-full bg-[var(--accent-600)] rounded-full transition-[width] duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col gap-[var(--s)] px-[var(--xl)]">
        <div className="flex items-center gap-[var(--s)]">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex items-center justify-center w-[28px] h-[28px] rounded-[var(--s)] hover:bg-[var(--primary-100)] transition-colors duration-150 cursor-pointer shrink-0"
            >
              <i
                className="fa-solid fa-arrow-left text-[14px] text-[var(--primary-900)]"
                aria-hidden="true"
              />
            </button>
          )}
          <div className="flex-1 flex items-center gap-[var(--xs)]">
            {stepLabel && (
              <span className="text-[14px] font-medium text-[var(--primary-900)] leading-[1.2]">
                {stepLabel}
              </span>
            )}
            <span className="text-[12px] text-[var(--primary-400)] leading-[1.2]">
              {currentStep}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Track */}
        <div
          className="w-full h-[var(--xs)] bg-[var(--primary-300)] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={stepLabel ?? `Step ${currentStep} of ${totalSteps}`}
        >
          <div
            className="h-full bg-[var(--accent-600)] rounded-full transition-[width] duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

ProgressBar.displayName = "ProgressBar";
