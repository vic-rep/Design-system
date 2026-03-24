"use client";

import React, { useEffect } from "react";

export type DrawerPosition = "right" | "left" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  title?: string;
  width?: string;
  children: React.ReactNode;
  className?: string;
}

const positionClasses: Record<DrawerPosition, { container: string; openTransform: string; closedTransform: string }> = {
  right: {
    container: "top-0 right-0 h-full",
    openTransform: "translateX(0)",
    closedTransform: "translateX(100%)",
  },
  left: {
    container: "top-0 left-0 h-full",
    openTransform: "translateX(0)",
    closedTransform: "translateX(-100%)",
  },
  bottom: {
    container: "bottom-0 left-0 right-0",
    openTransform: "translateY(0)",
    closedTransform: "translateY(100%)",
  },
};

export function Drawer({
  open,
  onClose,
  position = "right",
  title,
  width = "400px",
  children,
  className = "",
}: DrawerProps) {
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

  const pos = positionClasses[position];

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-50 bg-[var(--primary-900)]/50 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={[
          "fixed z-50 bg-[var(--surface-adjacent)] flex flex-col",
          "transition-transform duration-250 ease-in-out",
          pos.container,
          className,
        ].join(" ")}
        style={{
          transform: open ? pos.openTransform : pos.closedTransform,
          width: position === "bottom" ? "100%" : width,
          maxHeight: position === "bottom" ? "80vh" : "100%",
          boxShadow: "var(--elevation-level5)",
        }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-[var(--xxl)] py-[var(--l)] border-b border-[var(--primary-200)] shrink-0">
            <h2 className="text-[20px] font-semibold text-[var(--primary-900)]">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="w-[32px] h-[32px] flex items-center justify-center rounded-[var(--s)] hover:bg-[var(--primary-100)] transition-colors duration-150 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-[var(--primary-600)]" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-[var(--xxl)] py-[var(--l)]">
          {children}
        </div>
      </div>
    </>
  );
}

Drawer.displayName = "Drawer";
