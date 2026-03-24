"use client";

import React from "react";

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchIcon = () => (
  <svg
    className="h-4 w-4 text-on-surface-muted"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const ClearIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search components...",
  value,
  onChange,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <span className="absolute left-3 pointer-events-none">
        <SearchIcon />
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
          <ClearIcon />
        </button>
      )}
    </div>
  );
};
