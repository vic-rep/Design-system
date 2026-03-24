"use client";

import React from "react";
import { Accordion } from "@/components/organisms/Accordion";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQ({
  title = "Frequently Asked Questions",
  items,
  className = "",
}: FAQProps) {
  const accordionItems = items.map((item, i) => ({
    id: `faq-${i}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <div className={`max-w-[720px] mx-auto ${className}`}>
      <h3 className="text-[36px] font-semibold text-[var(--primary-900)] text-center mb-[var(--xxl)] leading-[1.2]">
        {title}
      </h3>
      <Accordion items={accordionItems} />
    </div>
  );
}

FAQ.displayName = "FAQ";
