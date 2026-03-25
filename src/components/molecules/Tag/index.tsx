"use client";

import React from "react";

/**
 * Tag — Molecule (compact removable label)
 * Figma: Node 3101:727
 * Doc: .claude/skills/docs/molecules/tag.md
 *
 * Sizes: xs, s, m, l
 * Border: surface-adjacent-2 (#e1e5eb)
 * Border radius: var(--xs) (4px)
 * Optional left icon (FA solid)
 * Right icon is always close/remove button
 */

export type TagSize = "xs" | "s" | "m" | "l";

export interface TagProps {
  children: React.ReactNode;
  size?: TagSize;
  leftIcon?: string;
  onRemove?: () => void;
  className?: string;
}

const sizePadding: Record<TagSize, string> = {
  xs: "gap-[var(--s)] px-[var(--s)] py-[var(--xs)]",
  s: "gap-[var(--s)] px-[var(--m)] py-[var(--xs)]",
  m: "gap-[var(--m)] px-[var(--l)] py-[var(--s)]",
  l: "gap-[var(--m)] px-[var(--l)] py-[var(--s)]",
};

const sizeText: Record<TagSize, string> = {
  xs: "text-[12px] leading-[1.3]",
  s: "text-[14px] leading-[1.2]",
  m: "text-[14px] leading-[1.2]",
  l: "text-[18px] leading-[1.2]",
};

const sizeIcon: Record<TagSize, string> = {
  xs: "text-[12px] w-[12px] h-[12px]",
  s: "text-[12px] w-[12px] h-[12px]",
  m: "text-[12px] w-[12px] h-[12px]",
  l: "text-[16px] w-[16px] h-[16px]",
};

export function Tag({
  children,
  size = "xs",
  leftIcon,
  onRemove,
  className = "",
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-[var(--xs)]",
        "border border-[var(--surface-adjacent-2)] text-[var(--primary-900)]",
        "font-normal",
        sizePadding[size],
        sizeText[size],
        className,
      ].join(" ")}
      style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
    >
      {leftIcon && (
        <i
          className={`fa-solid ${leftIcon} ${sizeIcon[size]} shrink-0 text-[var(--primary-900)]`}
          aria-hidden="true"
        />
      )}
      <span className="whitespace-nowrap">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
          className={`flex items-center justify-center shrink-0 cursor-pointer hover:opacity-60 transition-opacity duration-100 ${sizeIcon[size]}`}
        >
          <i
            className={`fa-solid fa-xmark ${sizeIcon[size]} text-[var(--primary-900)]`}
            aria-hidden="true"
          />
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";
