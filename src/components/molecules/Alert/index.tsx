"use client";

import React, { useState, useId } from "react";

/**
 * Alert — Molecule (collapsible notification banner)
 * Figma: Page 45:13 → Section 161:786
 * Doc: .claude/skills/docs/molecules/alert.md
 *
 * Variants: warning, error, info, success
 * Pattern: Single-item accordion — collapsed shows title, expanded shows description + buttons
 */

export type AlertVariant = "warning" | "error" | "info" | "success";

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { bg: string; border: string; icon: string; iconColor: string }
> = {
  warning: {
    bg: "var(--warning-100)",
    border: "var(--warning-500)",
    icon: "fa-triangle-exclamation",
    iconColor: "var(--warning-500)",
  },
  error: {
    bg: "var(--destructive-100)",
    border: "var(--destructive-550)",
    icon: "fa-circle-exclamation",
    iconColor: "var(--destructive-550)",
  },
  info: {
    bg: "var(--primary-100)",
    border: "var(--primary-300)",
    icon: "fa-circle-info",
    iconColor: "var(--primary-600)",
  },
  success: {
    bg: "var(--success-100)",
    border: "var(--success-700)",
    icon: "fa-circle-check",
    iconColor: "var(--success-700)",
  },
};

export function Alert({
  variant = "info",
  title,
  description,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  primaryAction,
  secondaryAction,
  className = "",
}: AlertProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? internalExpanded;
  const config = variantConfig[variant];
  const contentId = useId();
  const headerId = useId();

  const hasExpandableContent = Boolean(description || primaryAction || secondaryAction);

  const handleToggle = () => {
    const next = !isExpanded;
    setInternalExpanded(next);
    onToggle?.(next);
  };

  return (
    <div
      role="alert"
      className={`rounded-[var(--radius-lg)] border-l-4 overflow-hidden ${className}`}
      style={{ backgroundColor: config.bg, borderLeftColor: config.border }}
    >
      {/* Header */}
      <button
        type="button"
        id={headerId}
        aria-expanded={hasExpandableContent ? isExpanded : undefined}
        aria-controls={hasExpandableContent ? contentId : undefined}
        onClick={hasExpandableContent ? handleToggle : undefined}
        className={[
          "flex items-center gap-[var(--m)] w-full px-[var(--l)] py-[var(--m)]",
          "text-left text-[var(--primary-900)] font-medium text-[16px]",
          hasExpandableContent ? "cursor-pointer hover:brightness-95 transition-[filter] duration-150" : "cursor-default",
        ].join(" ")}
      >
        <i
          className={`fa-solid ${config.icon}`}
          aria-hidden="true"
          style={{ color: config.iconColor }}
        />
        <span className="flex-1">{title}</span>
        {hasExpandableContent && (
          <i
            className="fa-solid fa-chevron-down transition-transform duration-200 ease-in-out text-[var(--primary-500)]"
            aria-hidden="true"
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </button>

      {/* Expandable content */}
      {hasExpandableContent && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          className="overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out"
          style={{
            maxHeight: isExpanded ? "500px" : "0px",
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="px-[var(--l)] pb-[var(--l)] flex flex-col gap-[var(--m)]">
            {description && (
              <p className="text-[14px] text-[var(--primary-700)] leading-[1.4]">
                {description}
              </p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex items-center gap-[var(--l)]">
                {primaryAction && (
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    className="text-[14px] font-medium text-[var(--accent-600)] hover:text-[var(--accent-700)] transition-colors duration-150"
                  >
                    {primaryAction.label}
                  </button>
                )}
                {secondaryAction && (
                  <button
                    type="button"
                    onClick={secondaryAction.onClick}
                    className="text-[14px] text-[var(--primary-600)] hover:text-[var(--primary-900)] underline transition-colors duration-150"
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
