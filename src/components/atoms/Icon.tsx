"use client";

import React from "react";

export type IconName =
  | "chevron-down"
  | "chevron-right"
  | "search"
  | "sun"
  | "moon"
  | "menu"
  | "x"
  | "check"
  | "alert"
  | "info"
  | "copy"
  | "external-link"
  | "github"
  | "figma";

export type IconSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<IconSize, number> = { sm: 16, md: 20, lg: 24, xl: 32 };

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
}

const paths: Record<IconName, (s: number) => React.ReactNode> = {
  "chevron-down": () => (
    <polyline points="6 9 12 15 18 9" />
  ),
  "chevron-right": () => (
    <polyline points="9 18 15 12 9 6" />
  ),
  search: () => (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  sun: () => (
    <>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </>
  ),
  moon: () => (
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  ),
  menu: () => (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  x: () => (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  check: () => (
    <polyline points="20 6 9 17 4 12" />
  ),
  alert: () => (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  info: () => (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  copy: () => (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </>
  ),
  "external-link": () => (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  github: () => (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  ),
  figma: () => (
    <>
      <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z" />
      <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" />
    </>
  ),
};

export const Icon: React.FC<IconProps> = ({ name, size = "md", className = "", ...props }) => {
  const px = sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {paths[name](px)}
    </svg>
  );
};
