"use client";

import React, { useState, useRef, useCallback } from "react";
import { Typography } from "@/components/atoms/Typography";

/**
 * Tooltip — Molecule (contextual help on hover/focus)
 * Figma: Page 97:1419 → Node 176:2062
 *
 * Types: info (default), error
 * Positions: top, bottom, left, right
 * Info: Primary-900 bg, white text, dark arrow
 * Error: Primary-100 bg, destructive-200 border, destructive-600 text, matching arrow
 * Show: 200ms delay on hover/focus; hide instant
 */

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipType = "info" | "error";

export interface TooltipProps {
  content: string;
  type?: TooltipType;
  position?: TooltipPosition;
  children: React.ReactElement;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-[2px]",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-[2px]",
  left: "right-full top-1/2 -translate-y-1/2 mr-[2px]",
  right: "left-full top-1/2 -translate-y-1/2 ml-[2px]",
};

/* CSS-triangle arrows — 6×6 to match Figma's arrow dimensions */
const arrowBase = "absolute w-0 h-0 border-solid border-[6px]";

function arrowClasses(position: TooltipPosition, type: TooltipType) {
  const color =
    type === "error" ? "var(--primary-100)" : "var(--primary-900)";
  const borderColor =
    type === "error" ? "var(--destructive-200)" : "transparent";

  // Arrow points TOWARD the trigger, sits on the tooltip body edge
  const shared: Record<TooltipPosition, React.CSSProperties> = {
    top: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `${color} transparent transparent transparent`,
      borderTopColor: color,
    },
    bottom: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `transparent transparent ${color} transparent`,
      borderBottomColor: color,
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent transparent transparent ${color}`,
      borderLeftColor: color,
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent ${color} transparent transparent`,
      borderRightColor: color,
    },
  };

  // For error type we also need an outer border arrow
  const outerShared: Record<TooltipPosition, React.CSSProperties> = {
    top: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `${borderColor} transparent transparent transparent`,
      marginTop: "1px",
    },
    bottom: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `transparent transparent ${borderColor} transparent`,
      marginBottom: "1px",
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent transparent transparent ${borderColor}`,
      marginLeft: "1px",
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent ${borderColor} transparent transparent`,
      marginRight: "1px",
    },
  };

  return { inner: shared[position], outer: outerShared[position] };
}

export function Tooltip({
  content,
  type = "info",
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

  const isError = type === "error";
  const arrows = arrowClasses(position, type);

  const bodyClasses = [
    "absolute z-50 pointer-events-none",
    "p-[var(--s)] rounded-[var(--xs)]",
    "text-[12px] leading-[1.3] font-normal",
    "max-w-[320px] min-w-[200px]",
    "animate-[fadeIn_150ms_ease-in-out]",
    isError
      ? "bg-[var(--primary-100)] border border-[var(--destructive-200)] text-[var(--destructive-600)]"
      : "bg-[var(--primary-900)] text-[var(--surface-adjacent)]",
    positionStyles[position],
  ].join(" ");

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
        <div role="tooltip" className={bodyClasses}>
          <Typography variant="textSm" as="span" color="inherit">
            {content}
          </Typography>
          {/* Border arrow (error only) */}
          {isError && (
            <span
              className={`${arrowBase}`}
              style={arrows.outer}
              aria-hidden="true"
            />
          )}
          {/* Fill arrow */}
          <span
            className={`${arrowBase}`}
            style={arrows.inner}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
