"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

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
            <Typography variant="h5" as="span" color="accent">
              {logoText}
            </Typography>
          </div>

          {/* Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--xxl)]">
            {columns.map((col) => (
              <div key={col.title}>
                <Typography variant="textM" as="p" bold color="white" className="mb-[var(--m)]">
                  {col.title}
                </Typography>
                <ul className="space-y-[var(--s)]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-[var(--constant-white)] transition-colors duration-150"
                      >
                        <Typography variant="textM" as="span" color="inherit">
                          {link.label}
                        </Typography>
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
            <Typography variant="textSm" as="p" color="muted" className="text-center md:text-left">
              {legalText}
            </Typography>
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
                  <Icon name={social.icon} size="md" weight="solid" />
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
