"use client";

import React, { useState } from "react";

export interface DataTableColumn {
  key: string;
  label: string;
  width?: string;
}

export type SortDirection = "asc" | "desc";

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, React.ReactNode>[];
  sortable?: boolean;
  onSort?: (key: string, direction: SortDirection) => void;
}

const SortIndicator: React.FC<{ direction?: SortDirection }> = ({ direction }) => (
  <span className="ml-1 inline-block w-4 text-on-surface-muted">
    {direction === "asc" && "\u2191"}
    {direction === "desc" && "\u2193"}
    {!direction && "\u2195"}
  </span>
);

export const DataTable: React.FC<DataTableProps> = ({ columns, rows, sortable = false, onSort }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const handleSort = (key: string) => {
    if (!sortable) return;
    const nextDir: SortDirection = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(nextDir);
    onSort?.(key, nextDir);
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={[
                  "px-4 py-3 text-left font-medium text-on-surface-muted",
                  sortable ? "cursor-pointer select-none hover:text-on-surface" : "",
                ].join(" ")}
                onClick={() => handleSort(col.key)}
              >
                <span className="inline-flex items-center">
                  {col.label}
                  {sortable && <SortIndicator direction={sortKey === col.key ? sortDir : undefined} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={[
                "border-b border-border transition-colors last:border-b-0",
                idx % 2 === 1 ? "bg-surface-alt" : "bg-surface",
              ].join(" ")}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-on-surface">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-on-surface-muted">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
