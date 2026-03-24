"use client";

import React, { useState } from "react";

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
        <a href="/" className="text-[20px] font-semibold text-[var(--accent-600)] shrink-0">
          {logoText}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-[var(--xxl)]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={[
                "text-[14px] leading-[1.2] transition-colors duration-150",
                link.active
                  ? "text-[var(--accent-600)] font-semibold"
                  : "text-[var(--primary-600)] hover:text-[var(--primary-900)] font-normal",
              ].join(" ")}
            >
              {link.label}
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
          <i
            className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-[18px] text-[var(--primary-900)]`}
            aria-hidden="true"
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
                "block py-[var(--s)] text-[16px]",
                link.active
                  ? "text-[var(--accent-600)] font-semibold"
                  : "text-[var(--primary-600)]",
              ].join(" ")}
            >
              {link.label}
            </a>
          ))}
          {actions && <div className="pt-[var(--m)] border-t border-[var(--primary-200)] mt-[var(--s)]">{actions}</div>}
        </div>
      )}
    </nav>
  );
}

Navigation.displayName = "Navigation";
