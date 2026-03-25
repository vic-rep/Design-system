"use client";

import React from "react";
import { Icon } from "@/components/atoms/Icon";

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search components...",
  value,
  onChange,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <span className="absolute left-3 pointer-events-none">
        <Icon name="fa-magnifying-glass" size="sm" className="text-on-surface-muted" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full pl-10 pr-9 py-2 text-sm rounded-md",
          "bg-surface text-on-surface border border-border",
          "placeholder:text-on-surface-muted",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-surface",
          "transition-colors",
        ].join(" ")}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 p-0.5 rounded-sm text-on-surface-muted hover:text-on-surface transition-colors"
          aria-label="Clear search"
        >
          <Icon name="fa-xmark" size="sm" />
        </button>
      )}
    </div>
  );
};
