"use client";

import React, { useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationProps {
  logoText?: string;
  links: NavLink[];
  actions?: React.ReactNode;
  className?: string;
}

export function Navigation({
  logoText = "Trusti",
  links,
  actions,
  className = "",
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className={[
        "sticky top-0 z-50 h-[64px] bg-[var(--surface-adjacent)] border-b border-[var(--primary-200)]",
        className,
      ].join(" ")}
    >
      <div className="max-w-[1200px] mx-auto h-full px-[var(--xxl)] flex items-center">
        {/* Logo */}
        <a href="/" className="shrink-0">
          <Typography variant="h6" as="span" color="accent">
            {logoText}
          </Typography>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-[var(--xxl)]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={[
                "transition-colors duration-150",
                link.active
                  ? "text-[var(--accent-600)]"
                  : "text-[var(--primary-600)] hover:text-[var(--primary-900)]",
              ].join(" ")}
            >
              <Typography variant="textM" as="span" color="inherit" bold={link.active}>
                {link.label}
              </Typography>
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-[var(--m)] shrink-0">
          {actions}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="md:hidden ml-auto w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] hover:bg-[var(--primary-100)] transition-colors duration-150 cursor-pointer"
        >
          <Icon
            name={menuOpen ? "fa-xmark" : "fa-bars"}
            size="lg"
            weight="solid"
            className="text-[var(--primary-900)]"
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--surface-adjacent)] border-b border-[var(--primary-200)] px-[var(--xxl)] py-[var(--m)]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={[
                "block py-[var(--s)]",
                link.active
                  ? "text-[var(--accent-600)]"
                  : "text-[var(--primary-600)]",
              ].join(" ")}
            >
              <Typography variant="text" as="span" color="inherit" bold={link.active}>
                {link.label}
              </Typography>
            </a>
          ))}
          {actions && <div className="pt-[var(--m)] border-t border-[var(--primary-200)] mt-[var(--s)]">{actions}</div>}
        </div>
      )}
    </nav>
  );
}

Navigation.displayName = "Navigation";
