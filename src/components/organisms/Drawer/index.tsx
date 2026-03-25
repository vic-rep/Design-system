"use client";

import React, { useEffect, useRef } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

/**
 * Drawer — Organism (slide-in panel replacing modals)
 * Figma: Node 4032:12225
 *
 * Types:
 *   info   — Informative, read-only content. Right-slide on all screens.
 *   action — Actionable content (forms, selections). Bottom-slide on mobile, right-slide on desktop.
 *
 * Mobile info: right→left, 300px max-width, full height, X close, 20px padding, 480ms
 * Mobile action: bottom→top, 600px max-width, content-hugged height, optional notch, 480ms open / 240ms close
 * Desktop: right→left, 480px width, header + X + content + footer, 24px padding, 600ms
 *
 * Overlay: #191919 at 25% opacity
 * Easing: cubic-bezier(0.32, 0.72, 0, 1)
 */

export type DrawerType = "info" | "action";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  type?: DrawerType;
  title?: string;
  /** Show drag handle notch (mobile action only) */
  notch?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const SHADOW =
  "0px -2px 4px 0px rgba(0,0,0,0.04), 0px -8px 8px 0px rgba(0,0,0,0.03), 0px -17px 10px 0px rgba(0,0,0,0.02), 0px -31px 12px 0px rgba(0,0,0,0.01), 0px -48px 13px 0px rgba(0,0,0,0)";

export function Drawer({
  open,
  onClose,
  type = "info",
  title,
  notch = false,
  footer,
  children,
  className = "",
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onClose]);

  const isInfo = type === "info";

  return (
    <>
      {/* Overlay — #191919 at 25% opacity */}
      <div
        className={[
          "fixed inset-0 z-50 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{
          backgroundColor: "rgba(25, 25, 25, 0.25)",
          transitionDuration: open ? "480ms" : "240ms",
          transitionTimingFunction: EASING,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Mobile Info: right-slide, 300px ── */}
      {isInfo && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={[
            "fixed z-50 top-0 right-0 h-full flex flex-col",
            "bg-[var(--surface-adjacent)] overflow-y-auto",
            "w-[300px] max-w-[300px]",
            "md:w-[480px] md:max-w-[480px]",
            "p-[20px] md:p-[24px]",
            className,
          ].join(" ")}
          style={{
            transform: open ? "translateX(0)" : "translateX(100%)",
            transitionProperty: "transform",
            transitionDuration: open ? "480ms" : "480ms",
            transitionTimingFunction: EASING,
            boxShadow: SHADOW,
          }}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center gap-[var(--l)] shrink-0 mb-[var(--xl)]">
              <Typography variant="h6" as="h2" className="flex-1 max-md:!text-[18px]">
                {title}
              </Typography>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer shrink-0"
              >
                <Icon name="fa-xmark" size="md" weight="regular" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="shrink-0 mt-[var(--xl)] pt-[var(--xl)] border-t border-[var(--primary-200)]">
              {footer}
            </div>
          )}
        </div>
      )}

      {/* ── Mobile Action: bottom-slide (mobile), right-slide (desktop) ── */}
      {!isInfo && (
        <>
          {/* Mobile: bottom slide */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={[
              "fixed z-50 bottom-0 left-0 right-0 flex flex-col items-center",
              "bg-[var(--surface-adjacent)] overflow-y-auto",
              "max-h-[600px] w-full max-w-[600px] mx-auto",
              notch ? "pt-[var(--xs)] pb-[var(--xl)] px-[20px]" : "p-[20px]",
              "md:hidden",
              className,
            ].join(" ")}
            style={{
              transform: open ? "translateY(0)" : "translateY(100%)",
              transitionProperty: "transform",
              transitionDuration: open ? "480ms" : "240ms",
              transitionTimingFunction: EASING,
              boxShadow: SHADOW,
              borderRadius: "var(--s) var(--s) 0 0",
            }}
          >
            {/* Notch */}
            {notch && (
              <div className="w-[30px] h-[3px] rounded-[10px] bg-[var(--surface-adjacent-2)] shrink-0 mb-[var(--xs)]" />
            )}

            {/* Content */}
            <div className="flex-1 w-full">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="shrink-0 w-full mt-[var(--xl)] pt-[var(--xl)] border-t border-[var(--primary-200)]">
                {footer}
              </div>
            )}
          </div>

          {/* Desktop: right slide */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={[
              "fixed z-50 top-0 right-0 h-full flex-col",
              "bg-[var(--surface-adjacent)] overflow-y-auto",
              "w-[480px] p-[24px]",
              "hidden md:flex",
              className,
            ].join(" ")}
            style={{
              transform: open ? "translateX(0)" : "translateX(100%)",
              transitionProperty: "transform",
              transitionDuration: "600ms",
              transitionTimingFunction: EASING,
              boxShadow: SHADOW,
            }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center gap-[var(--l)] shrink-0 mb-[var(--xl)]">
                <Typography variant="h5" as="h2" className="flex-1">
                  {title}
                </Typography>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer shrink-0"
                >
                  <Icon name="fa-xmark" size="md" weight="regular" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="shrink-0 mt-[var(--xl)] pt-[var(--xl)] border-t border-[var(--primary-200)]">
                {footer}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

Drawer.displayName = "Drawer";
