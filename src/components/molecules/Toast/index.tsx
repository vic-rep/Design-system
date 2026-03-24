"use client";

import React, { useEffect, useState } from "react";

export type ToastVariant = "info" | "success" | "warning" | "destructive";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
  onDismiss: () => void;
  className?: string;
}

const variantStyles: Record<ToastVariant, string> = {
  info: "bg-[var(--primary-900)] text-[var(--constant-white)]",
  success: "bg-[var(--success-800)] text-[var(--constant-white)]",
  warning: "bg-[var(--warning-600)] text-[var(--constant-black)]",
  destructive: "bg-[var(--destructive-600)] text-[var(--constant-white)]",
};

const iconMap: Record<ToastVariant, string> = {
  info: "fa-solid fa-circle-info",
  success: "fa-solid fa-circle-check",
  warning: "fa-solid fa-triangle-exclamation",
  destructive: "fa-solid fa-circle-exclamation",
};

export function Toast({
  message,
  variant = "info",
  duration = 5000,
  action,
  onDismiss,
  className = "",
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 200);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 200);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex items-center gap-[var(--m)] px-[var(--l)] py-[var(--m)] rounded-[var(--s)] min-w-[300px] max-w-[480px]",
        "transition-all duration-200 ease-in-out",
        variantStyles[variant],
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]",
        className,
      ].join(" ")}
      style={{ boxShadow: "var(--elevation-level3)" }}
    >
      <i className={`${iconMap[variant]} text-[16px] shrink-0`} aria-hidden="true" />
      <span className="flex-1 text-[14px] leading-[1.3]">{message}</span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="text-[14px] font-semibold underline shrink-0 cursor-pointer"
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="flex items-center justify-center w-[20px] h-[20px] shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <i className="fa-solid fa-xmark text-[12px]" aria-hidden="true" />
      </button>
    </div>
  );
}

Toast.displayName = "Toast";
