"use client";

import React from "react";

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-on-surface">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-on-surface-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
