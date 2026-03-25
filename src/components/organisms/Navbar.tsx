"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

export const Navbar: React.FC<NavbarProps> = ({ title, onThemeToggle, isDark = false }) => {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-surface px-6 border-b border-border">
      <Typography variant="textLg" as="span" color="inherit" bold className="text-on-surface">{title}</Typography>

      {onThemeToggle && (
        <button
          type="button"
          onClick={onThemeToggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex items-center justify-center rounded-md p-2 text-on-surface-muted transition-colors hover:bg-surface-alt hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isDark ? <Icon name="fa-sun" size="lg" label="Sun icon" /> : <Icon name="fa-moon" size="lg" label="Moon icon" />}
        </button>
      )}
    </header>
  );
};
