"use client";

import React from "react";

/**
 * ProgressBar — Molecule (stepper / progress indicator)
 * Figma: Node 2474:42 (web) & 815:144 (mobile)
 * Doc: .claude/skills/docs/molecules/progress-bar.md
 *
 * Web: back button ("Назад") + step label on right + full-width progress track
 * Mobile: chevron-left back button + step label + progress track
 * Track: primary-300 bg, xs height, rounded-[1000px]
 * Fill: accent-600 (animated width)
 */

export interface ProgressBarProps {
  /** Current step (1-based) */
  currentStep: number;
  /** Total steps */
  totalSteps: number;
  /** Label for current step */
  stepLabel?: string;
  /** Back button label (web only) */
  backLabel?: string;
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
  backLabel = "Назад",
  showBack = true,
  onBack,
  className = "",
}: ProgressBarProps) {
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop layout */}
      <div className="hidden md:flex flex-col gap-[var(--m)]">
        <div className="flex items-center justify-between">
          {/* Back button */}
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-[var(--s)] py-[8px] rounded-[24px] cursor-pointer shrink-0"
            >
              <span className="flex items-center justify-center w-[24px] h-[24px] rounded-full">
                <i
                  className="fa-regular fa-chevron-left text-[16px] text-[var(--primary-900)]"
                  aria-hidden="true"
                />
              </span>
              <span
                className="text-[16px] font-normal text-[var(--primary-900)] leading-[1.2] whitespace-nowrap"
                style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
              >
                {backLabel}
              </span>
            </button>
          )}
          {/* Step label */}
          {stepLabel && (
            <span
              className="text-[16px] font-normal text-[var(--primary-900)] leading-[1.2] whitespace-nowrap"
              style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
            >
              {stepLabel}
            </span>
          )}
        </div>

        {/* Track */}
        <div
          className="w-full h-[var(--xs)] bg-[var(--primary-300)] rounded-[1000px] overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={stepLabel ?? `Step ${currentStep} of ${totalSteps}`}
        >
          <div
            className="h-full bg-[var(--accent-600)] rounded-[1000px] transition-[width] duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col gap-[12px]">
        <button
          type="button"
          onClick={showBack ? onBack : undefined}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          {showBack && (
            <span className="flex items-center justify-center w-[28px] h-[28px] rounded-full">
              <i
                className="fa-regular fa-chevron-left text-[20px] text-[var(--primary-900)]"
                aria-hidden="true"
              />
            </span>
          )}
          {stepLabel && (
            <span
              className="text-[14px] font-normal text-[var(--primary-900)] leading-[1.2] whitespace-nowrap"
              style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
            >
              {stepLabel}
            </span>
          )}
        </button>

        {/* Track */}
        <div
          className="w-full h-[var(--xs)] bg-[var(--primary-300)] rounded-[1000px] overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={stepLabel ?? `Step ${currentStep} of ${totalSteps}`}
        >
          <div
            className="h-full bg-[var(--accent-600)] rounded-[1000px] transition-[width] duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

ProgressBar.displayName = "ProgressBar";
