"use client";

import React from "react";

export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, navbar, children }) => {
  return (
    <div className="min-h-screen bg-surface">
      {navbar}
      <div className="flex">
        {sidebar}
        <main className="ml-60 flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
};
