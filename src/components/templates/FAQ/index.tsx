"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";
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
      <Typography variant="h3" as="h3" className="text-center mb-[var(--xxl)]">
        {title}
      </Typography>
      <Accordion items={accordionItems} />
    </div>
  );
}

FAQ.displayName = "FAQ";
