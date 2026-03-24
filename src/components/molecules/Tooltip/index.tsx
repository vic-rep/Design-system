"use client";

import React, { useState, useRef, useCallback } from "react";

/**
 * Tooltip — Molecule (contextual help on hover/focus)
 * Figma: Page 97:1419 → Section 176:1927
 * Doc: .claude/skills/docs/molecules/tooltip.md
 *
 * Positions: top, bottom, left, right
 * Style: Primary-900 bg, white text, small arrow
 * Show: 200ms delay on hover/focus; hide instant
 */

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: React.ReactElement;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-[var(--s)]",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-[var(--s)]",
  left: "right-full top-1/2 -translate-y-1/2 mr-[var(--s)]",
  right: "left-full top-1/2 -translate-y-1/2 ml-[var(--s)]",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-[var(--primary-900)] border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[var(--primary-900)] border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-[var(--primary-900)] border-y-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-[var(--primary-900)] border-y-transparent border-l-transparent",
};

export function Tooltip({
  content,
  position = "top",
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), 200);
  }, []);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={[
            "absolute z-50 pointer-events-none",
            "px-[var(--s)] py-[var(--xs)]",
            "bg-[var(--primary-900)] text-[var(--constant-white)]",
            "text-[12px] leading-[1.2] font-normal",
            "rounded-[var(--radius-md)] whitespace-nowrap",
            "animate-[fadeIn_150ms_ease-in-out]",
            positionStyles[position],
          ].join(" ")}
        >
          {content}
          <span
            className={`absolute border-[4px] ${arrowStyles[position]}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
