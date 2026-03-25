"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";

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
          <Typography variant="h5" as="h1" className="text-on-surface">{title}</Typography>
          {subtitle && <Typography variant="textSm" as="p" className="mt-2 text-on-surface-muted">{subtitle}</Typography>}
        </div>
        {children}
      </div>
    </div>
  );
};
