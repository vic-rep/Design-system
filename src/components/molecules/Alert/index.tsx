"use client";

import React, { useState, useId } from "react";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

/**
 * Alert — Molecule (collapsible notification banner)
 * Figma: Page 45:13 → Node 269:4635
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
    iconColor: "var(--accent-600)",
  },
  error: {
    bg: "var(--destructive-100)",
    border: "var(--destructive-550)",
    icon: "fa-circle-exclamation",
    iconColor: "var(--destructive-550)",
  },
  info: {
    bg: "var(--surface-adjacent)",
    border: "var(--primary-900)",
    icon: "fa-circle-info",
    iconColor: "var(--primary-900)",
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
      className={`rounded-[var(--s)] border overflow-hidden ${className}`}
      style={{ backgroundColor: config.bg, borderColor: config.border }}
    >
      {/* Header */}
      <button
        type="button"
        id={headerId}
        aria-expanded={hasExpandableContent ? isExpanded : undefined}
        aria-controls={hasExpandableContent ? contentId : undefined}
        onClick={hasExpandableContent ? handleToggle : undefined}
        className={[
          "flex items-start gap-[var(--s)] w-full p-[var(--l)]",
          "text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-600)] focus-visible:ring-inset",
          hasExpandableContent ? "cursor-pointer" : "cursor-default",
        ].join(" ")}
      >
        {/* Icon */}
        <Icon
          name={config.icon}
          size="md"
          className="shrink-0 mt-[1px]"
          style={{ color: config.iconColor }}
        />
        {/* Title */}
        <Typography variant="text" as="span" className="flex-1 !font-semibold leading-[1.2] text-black">
          {title}
        </Typography>
        {/* Chevron */}
        {hasExpandableContent && (
          <Icon
            name={isExpanded ? "fa-chevron-up" : "fa-chevron-down"}
            size="md"
            className="text-[var(--primary-900)] shrink-0 mt-[1px]"
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
              <Typography
                variant="text"
                as="p"
                className="text-black leading-[1.2] font-normal"
                style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
              >
                {description}
              </Typography>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex items-center gap-[var(--l)]">
                {primaryAction && (
                  <Button
                    variant="secondary"
                    size="s"
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    variant="link"
                    size="s"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
