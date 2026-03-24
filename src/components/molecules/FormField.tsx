"use client";

import React from "react";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helperText,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-on-surface">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-error">{error}</p>}
      {!error && helperText && (
        <p className="text-sm text-on-surface-muted">{helperText}</p>
      )}
    </div>
  );
};
