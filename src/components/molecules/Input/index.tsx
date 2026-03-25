"use client";

import React, { forwardRef, useId, useState, useRef, useEffect } from "react";

/**
 * Input — Molecule
 * Figma: Page 45:8 → Node 156:1333
 *
 * Types: text, textarea, dropdown, plate, phone, datepicker
 * States: default, filled, focus, typing, error, disabled
 * Shared field: 41px height (60px textarea), --m padding, --s border-radius
 * Label: 10px caption, --xs horizontal padding
 * Error: bg --destructive-100, border --destructive-300, error tooltip top-right
 * Focus: border --primary-400
 * Disabled: opacity-20
 */

export type InputType = "text" | "textarea" | "dropdown" | "plate" | "phone" | "datepicker";

export interface InputOption {
  value: string;
  label: string;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, "size" | "type"> {
  inputType?: InputType;
  label?: string;
  error?: string;
  showLabel?: boolean;
  options?: InputOption[];
  countryCode?: string;
  countryFlag?: string;
}

/* ── Shared field classes ─────────────────────────────────── */

function fieldClasses(hasError: boolean, disabled?: boolean) {
  return [
    "w-full p-[var(--m)] rounded-[var(--s)]",
    "font-normal text-[16px] leading-[1.2] text-[var(--primary-900)]",
    "placeholder:text-[var(--primary-400)]",
    "border transition-[border-color] duration-150 ease-in-out",
    "focus-visible:outline-none",
    hasError
      ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]"
      : "bg-[var(--surface-adjacent)] border-[var(--primary-300)] focus-visible:border-[var(--primary-400)]",
    disabled ? "opacity-20 cursor-not-allowed" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/* ── Chevron SVG (dropdown/phone) ─────────────────────────── */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="4"
      viewBox="0 0 6 4"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 4L0.401924 0.25L5.59808 0.25L3 4Z" fill="var(--primary-900)" />
    </svg>
  );
}

/* ── Error tooltip (always visible above input on error) ──── */

function ErrorBadge({ error }: { error: string }) {
  return (
    <div className="absolute right-0 bottom-full mb-[2px] z-10">
      <div
        role="tooltip"
        className="relative p-[var(--s)] rounded-[var(--xs)] text-[12px] leading-[1.3] font-normal max-w-[320px] min-w-[120px] bg-[var(--primary-100)] border border-[var(--destructive-200)] text-[var(--destructive-600)]"
      >
        {error}
        {/* Arrow pointing down toward the input */}
        <span
          className="absolute w-0 h-0 border-solid border-[6px]"
          style={{
            top: "100%",
            right: "var(--s)",
            borderColor: "var(--destructive-200) transparent transparent transparent",
          }}
          aria-hidden="true"
        />
        <span
          className="absolute w-0 h-0 border-solid border-[6px]"
          style={{
            top: "100%",
            right: "var(--s)",
            borderColor: "var(--primary-100) transparent transparent transparent",
            marginTop: "-1px",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(
  (
    {
      inputType = "text",
      label,
      error,
      showLabel = true,
      disabled,
      options = [],
      countryCode = "+359",
      countryFlag = "🇧🇬",
      id: externalId,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = error ? `${id}-error` : undefined;
    const hasError = Boolean(error);

    return (
      <div className={`relative flex flex-col gap-[var(--xs)] items-start ${className}`}>
        {/* Label */}
        {showLabel && label && inputType !== "plate" && inputType !== "phone" && (
          <div className="flex items-center justify-center px-[var(--xs)] w-full">
            <label
              htmlFor={id}
              className="flex-1 font-normal text-[10px] leading-[1.3] text-[var(--primary-900)]"
            >
              {label}
            </label>
          </div>
        )}

        {/* Field area */}
        <div className="relative w-full">
          {inputType === "text" && (
            <TextInput
              id={id}
              ref={ref as React.Ref<HTMLInputElement>}
              hasError={hasError}
              disabled={disabled}
              errorId={errorId}
              {...props}
            />
          )}
          {inputType === "textarea" && (
            <TextareaInput
              id={id}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              hasError={hasError}
              disabled={disabled}
              errorId={errorId}
              {...props}
            />
          )}
          {inputType === "dropdown" && (
            <DropdownInput
              id={id}
              ref={ref as React.Ref<HTMLSelectElement>}
              hasError={hasError}
              disabled={disabled}
              errorId={errorId}
              options={options}
              {...props}
            />
          )}
          {inputType === "plate" && (
            <PlateInput
              id={id}
              ref={ref as React.Ref<HTMLInputElement>}
              hasError={hasError}
              disabled={disabled}
              errorId={errorId}
              {...props}
            />
          )}
          {inputType === "phone" && (
            <PhoneInput
              id={id}
              ref={ref as React.Ref<HTMLInputElement>}
              hasError={hasError}
              disabled={disabled}
              errorId={errorId}
              countryCode={countryCode}
              countryFlag={countryFlag}
              {...props}
            />
          )}
          {inputType === "datepicker" && (
            <DatepickerInput
              id={id}
              ref={ref as React.Ref<HTMLInputElement>}
              hasError={hasError}
              disabled={disabled}
              errorId={errorId}
              {...props}
            />
          )}

          {/* Error tooltip */}
          {hasError && error && <ErrorBadge error={error} />}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

/* ── Type: Text ──────────────────────────────────────────── */

type FieldProps = {
  id: string;
  hasError: boolean;
  disabled?: boolean;
  errorId?: string;
} & Record<string, any>;

const TextInput = forwardRef<HTMLInputElement, FieldProps>(
  ({ id, hasError, disabled, errorId, ...props }, ref) => (
    <input
      ref={ref}
      id={id}
      type="text"
      disabled={disabled}
      aria-invalid={hasError || undefined}
      aria-describedby={errorId}
      className={`h-[41px] ${fieldClasses(hasError, disabled)}`}
      {...props}
    />
  )
);
TextInput.displayName = "TextInput";

/* ── Type: Textarea ──────────────────────────────────────── */

const TextareaInput = forwardRef<HTMLTextAreaElement, FieldProps>(
  ({ id, hasError, disabled, errorId, ...props }, ref) => (
    <textarea
      ref={ref}
      id={id}
      disabled={disabled}
      aria-invalid={hasError || undefined}
      aria-describedby={errorId}
      className={`h-[60px] resize-y items-start ${fieldClasses(hasError, disabled)}`}
      {...props}
    />
  )
);
TextareaInput.displayName = "TextareaInput";

/* ── Type: Dropdown ──────────────────────────────────────── */

type DropdownFieldProps = FieldProps & {
  options: InputOption[];
};

const DropdownInput = forwardRef<HTMLSelectElement, DropdownFieldProps>(
  ({ id, hasError, disabled, errorId, options, placeholder, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={errorId}
        className={`h-[41px] appearance-none pr-[var(--xxl)] ${fieldClasses(hasError, disabled)}`}
        defaultValue=""
        {...props}
      >
        {(placeholder as string | undefined) && (
          <option value="" disabled>
            {placeholder as string}
          </option>
        )}
        {options.map((o: InputOption) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-[var(--m)] top-1/2 -translate-y-1/2">
        <ChevronDown />
      </div>
    </div>
  )
);
DropdownInput.displayName = "DropdownInput";

/* ── Type: Plate (license plate) ─────────────────────────── */

const PlateInput = forwardRef<HTMLInputElement, FieldProps>(
  ({ id, hasError, disabled, errorId, ...props }, ref) => (
    <div className={`flex items-start ${disabled ? "opacity-20 cursor-not-allowed" : ""}`}>
      {/* EU badge */}
      <div
        className="flex items-center justify-center w-[38px] h-[41px] rounded-l-[var(--s)] shrink-0"
        style={{ backgroundColor: "#003399" }}
      >
        <span className="text-[10px] text-white font-medium leading-none">BG</span>
      </div>
      {/* Field */}
      <input
        ref={ref}
        id={id}
        type="text"
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={errorId}
        className={[
          "flex-1 h-[41px] p-[var(--m)]",
          "rounded-r-[var(--s)] rounded-l-none border-l-0",
          "font-normal text-[16px] leading-[1.2] text-[var(--primary-900)]",
          "placeholder:text-[var(--primary-400)]",
          "border transition-[border-color] duration-150 ease-in-out",
          "focus-visible:outline-none",
          hasError
            ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]"
            : "bg-[var(--surface-adjacent)] border-[var(--primary-300)] focus-visible:border-[var(--primary-400)]",
        ]
          .filter(Boolean)
          .join(" ")}
        placeholder="EA1234CB"
        {...props}
      />
    </div>
  )
);
PlateInput.displayName = "PlateInput";

/* ── Type: Phone ─────────────────────────────────────────── */

type PhoneFieldProps = FieldProps & {
  countryCode: string;
  countryFlag: string;
};

const PhoneInput = forwardRef<HTMLInputElement, PhoneFieldProps>(
  ({ id, hasError, disabled, errorId, countryCode, countryFlag, ...props }, ref) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
      <div
        ref={wrapperRef}
        className={`flex items-center h-[41px] rounded-[var(--s)] border p-[var(--m)] gap-[var(--s)] ${
          hasError
            ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]"
            : "bg-[var(--surface-adjacent)] border-[var(--primary-300)]"
        } ${disabled ? "opacity-20 cursor-not-allowed" : ""}`}
      >
        {/* Country selector */}
        <button
          type="button"
          disabled={disabled}
          className="flex items-center gap-[var(--s)] shrink-0 h-full border-none bg-transparent cursor-pointer p-0"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="Select country"
        >
          <span className="text-[14px] leading-none">{countryFlag}</span>
          <ChevronDown />
        </button>

        {/* Phone number */}
        <input
          ref={ref}
          id={id}
          type="tel"
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={errorId}
          className="flex-1 border-none bg-transparent outline-none font-normal text-[16px] leading-[1.2] text-[var(--primary-900)] placeholder:text-[var(--primary-400)] p-0 min-w-0"
          placeholder="089xxxxxxxxxx"
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

/* ── Type: Datepicker ────────────────────────────────────── */

const DatepickerInput = forwardRef<HTMLInputElement, FieldProps>(
  ({ id, hasError, disabled, errorId, ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        id={id}
        type="date"
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={errorId}
        className={`h-[41px] pr-[var(--xxl)] ${fieldClasses(hasError, disabled)}`}
        {...props}
      />
      <div className="pointer-events-none absolute right-[var(--m)] top-1/2 -translate-y-1/2">
        <i
          className="fa-regular fa-calendar text-[16px] text-[var(--primary-900)]"
          aria-hidden="true"
        />
      </div>
    </div>
  )
);
DatepickerInput.displayName = "DatepickerInput";
