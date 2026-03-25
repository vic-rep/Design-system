"use client";

import React, { useState, useRef, useEffect } from "react";

/**
 * Accordion — Organism
 * Figma: Node 648:1547
 *
 * Flat list with divider lines (top/bottom borders per item).
 * Expanded: accent-colored top line, title (18px medium) + chevron-up, content (14px)
 * Collapsed: title (18px medium) + chevron-down
 * Chevron: 12px fa-regular, no rotation animation — just swaps up/down
 * Padding: px-l for title and content, gap-l between title and content
 * Bottom padding: pb-4xl below each expanded item
 */

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const triggerId = `accordion-trigger-${item.id}`;
  const panelId = `accordion-panel-${item.id}`;

  return (
    <div className="flex flex-col pb-[var(--4xl)]">
      {/* Top divider line — accent color when open, primary-200 when closed */}
      <div
        className="w-full h-[2px] transition-colors duration-200"
        style={{
          backgroundColor: isOpen ? "var(--accent-600)" : "var(--primary-200)",
        }}
      />

      {/* Title button */}
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={onToggle}
        className={[
          "w-full flex items-center gap-[var(--l)] px-[var(--l)] pt-[var(--l)]",
          "text-left cursor-pointer",
          item.disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <span
          className="flex-1 text-[18px] font-medium leading-[1.2] text-[var(--primary-900)]"
        >
          {item.title}
        </span>
        <i
          className={`fa-regular ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-[12px] text-[var(--primary-900)] shrink-0`}
          aria-hidden="true"
        />
      </button>

      {/* Expandable content */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
        style={{ maxHeight }}
      >
        <div
          className="px-[var(--l)] pt-[var(--l)] text-[14px] text-[var(--primary-900)] leading-[1.2] font-normal"
          style={{ fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" }}
        >
          {item.content}
        </div>
      </div>

      {/* Bottom divider line */}
      <div
        className="w-full h-[1px] mt-[var(--l)]"
        style={{ backgroundColor: "var(--primary-200)" }}
      />
    </div>
  );
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}

Accordion.displayName = "Accordion";
