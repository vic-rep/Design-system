"use client";

import React from "react";

export type TagVariant = "default" | "accent";

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  default: "bg-[var(--primary-100)] text-[var(--primary-900)]",
  accent: "bg-[var(--accent-100)] text-[var(--accent-800)]",
};

export function Tag({
  children,
  variant = "default",
  onRemove,
  className = "",
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-[var(--xs)] px-[var(--s)] py-[var(--xxs)] rounded-[var(--xs)]",
        "text-[12px] font-medium leading-[1.2]",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
          className="flex items-center justify-center w-[14px] h-[14px] rounded-full hover:bg-black/10 transition-colors duration-100 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-[8px]" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";
