"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/molecules/Button";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const hasFooter = primaryAction || secondaryAction;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Desktop modal */}
      <div
        ref={modalRef}
        className={[
          "hidden md:flex flex-col",
          "w-[600px] min-h-[600px]",
          "bg-[var(--surface,#f3f2f0)]",
          "rounded-[var(--m,12px)]",
          "p-[var(--l,16px)]",
          "gap-[var(--l,16px)]",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          <Typography variant="h6" as="h2" className="text-[var(--primary-900,#191919)]">
            {title}
          </Typography>
          <button
            onClick={onClose}
            className="cursor-pointer bg-transparent border-none p-0"
            aria-label="Close modal"
          >
            <Icon name="fa-xmark" size="lg" className="text-[var(--primary-900,#191919)]" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 min-h-0">
          <div className="overflow-y-auto h-full text-[16px] leading-[1.2] text-[var(--primary-900,#191919)]">
            {children}
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--surface, #f3f2f0))",
            }}
          />
        </div>

        {/* Footer */}
        {hasFooter && (
          <div className="flex items-end w-full">
            <div className="flex gap-[var(--m,12px)] ml-auto">
              {secondaryAction && (
                <Button
                  variant="secondary"
                  size="s"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="primary"
                  size="s"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile modal */}
      <div
        className={[
          "flex md:hidden flex-col",
          "w-[350px] min-h-[520px]",
          "bg-[var(--surface,#f3f2f0)]",
          "rounded-[var(--m,12px)]",
          "p-[var(--l,16px)]",
          "gap-[var(--l,16px)]",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          <Typography variant="textM" as="h2" className="!font-semibold text-[var(--primary-900,#191919)]">
            {title}
          </Typography>
          <button
            onClick={onClose}
            className="cursor-pointer bg-transparent border-none p-0"
            aria-label="Close modal"
          >
            <Icon name="fa-xmark" size="lg" className="text-[var(--primary-900,#191919)]" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 min-h-0">
          <div className="overflow-y-auto max-h-[400px] text-[14px] leading-[1.2] text-[var(--primary-900,#191919)]">
            {children}
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--surface, #f3f2f0))",
            }}
          />
        </div>

        {/* Footer */}
        {hasFooter && (
          <div className="flex items-end w-full">
            <div className="flex gap-[var(--m,12px)] ml-auto">
              {secondaryAction && (
                <Button
                  variant="secondary"
                  size="s"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="primary"
                  size="s"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";
