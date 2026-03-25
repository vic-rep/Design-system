"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";

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
      <Typography variant="textSm" as="label" className="!font-medium text-on-surface">
        {label}
        {required && <Typography variant="textSm" as="span" color="error" className="ml-0.5">*</Typography>}
      </Typography>
      {children}
      {error && <Typography variant="textSm" as="p" color="error">{error}</Typography>}
      {!error && helperText && (
        <Typography variant="textSm" as="p" color="muted">{helperText}</Typography>
      )}
    </div>
  );
};
