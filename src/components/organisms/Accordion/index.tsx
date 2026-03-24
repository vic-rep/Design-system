"use client";

import React, { useState, useRef, useEffect } from "react";

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
    <div className="border-b border-[var(--primary-200)] last:border-b-0">
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={onToggle}
        className={[
          "w-full flex items-center justify-between px-[var(--l)] py-[var(--m)]",
          "text-left text-[16px] font-medium text-[var(--primary-900)] leading-[1.3]",
          "transition-colors duration-150 rounded-[var(--xs)]",
          item.disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[var(--primary-100)] cursor-pointer",
        ].join(" ")}
      >
        <span>{item.title}</span>
        <i
          className={[
            "fa-solid fa-chevron-right text-[12px] text-[var(--primary-500)]",
            "transition-transform duration-200 ease-in-out shrink-0 ml-[var(--m)]",
            isOpen ? "rotate-90" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
        style={{ maxHeight }}
      >
        <div className="px-[var(--l)] pb-[var(--l)] text-[14px] text-[var(--primary-600)] leading-[1.5]">
          {item.content}
        </div>
      </div>
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
    <div
      className={[
        "rounded-[var(--s)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] overflow-hidden",
        className,
      ].join(" ")}
    >
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
