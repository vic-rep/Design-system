"use client";

import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={`inline-flex items-center gap-[var(--xxs)] ${className}`}>
      {/* Prev */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] text-[var(--primary-600)] hover:bg-[var(--primary-100)] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="fa-solid fa-chevron-left text-[12px]" aria-hidden="true" />
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className="w-[36px] h-[36px] flex items-center justify-center text-[14px] text-[var(--primary-400)]"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={[
              "w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] text-[14px] font-medium transition-colors duration-150",
              page === currentPage
                ? "bg-[var(--accent-600)] text-[var(--constant-white)]"
                : "text-[var(--primary-600)] hover:bg-[var(--primary-100)]",
            ].join(" ")}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] text-[var(--primary-600)] hover:bg-[var(--primary-100)] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="fa-solid fa-chevron-right text-[12px]" aria-hidden="true" />
      </button>
    </nav>
  );
}

Pagination.displayName = "Pagination";
