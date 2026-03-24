"use client";

import React from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface FooterProps {
  logoText?: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  legalText?: string;
  className?: string;
}

export function Footer({
  logoText = "Trusti",
  columns,
  socialLinks = [],
  legalText,
  className = "",
}: FooterProps) {
  return (
    <footer
      className={`bg-[var(--primary-900)] text-[var(--primary-400)] ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-[var(--xxl)] py-[var(--5xl)]">
        {/* Top: logo + columns */}
        <div className="flex flex-col md:flex-row gap-[var(--5xl)]">
          {/* Logo */}
          <div className="shrink-0">
            <span className="text-[24px] font-semibold text-[var(--accent-600)]">
              {logoText}
            </span>
          </div>

          {/* Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--xxl)]">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[14px] font-semibold text-[var(--constant-white)] mb-[var(--m)]">
                  {col.title}
                </p>
                <ul className="space-y-[var(--s)]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-[var(--primary-400)] hover:text-[var(--constant-white)] transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[var(--5xl)] pt-[var(--xxl)] border-t border-[var(--primary-700)] flex flex-col md:flex-row items-center justify-between gap-[var(--m)]">
          {legalText && (
            <p className="text-[12px] text-[var(--primary-500)] text-center md:text-left">
              {legalText}
            </p>
          )}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-[var(--m)]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[32px] h-[32px] flex items-center justify-center rounded-full text-[var(--primary-400)] hover:text-[var(--constant-white)] hover:bg-[var(--primary-700)] transition-colors duration-150"
                >
                  <i className={`${social.icon} text-[16px]`} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
