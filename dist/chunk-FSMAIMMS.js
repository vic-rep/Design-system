'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

var variantStyles = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover active:brightness-90",
  secondary: "bg-secondary text-on-surface hover:bg-secondary-hover active:brightness-90",
  ghost: "bg-transparent text-on-surface hover:bg-surface-alt active:brightness-90",
  danger: "bg-error text-white hover:brightness-110 active:brightness-90",
  outline: "bg-transparent text-on-surface border border-border hover:bg-surface-alt active:brightness-90"
};
var sizeStyles = {
  sm: "px-3 py-1 text-sm rounded-sm",
  md: "px-4 py-2 text-sm rounded-md",
  lg: "px-6 py-3 text-base rounded-lg"
};
var Spinner = () => /* @__PURE__ */ jsxRuntime.jsxs(
  "svg",
  {
    className: "animate-spin -ml-1 mr-2 h-4 w-4",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        }
      )
    ]
  }
);
var Button = react.forwardRef(
  ({ variant = "primary", size = "md", loading = false, disabled, className = "", children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      disabled: disabled || loading,
      className: [
        "inline-flex items-center justify-center font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      ].join(" "),
      ...props,
      children: [
        loading && /* @__PURE__ */ jsxRuntime.jsx(Spinner, {}),
        children
      ]
    }
  )
);
Button.displayName = "Button";
var variantStyles2 = {
  default: "bg-surface border border-border",
  filled: "bg-surface-alt border border-transparent",
  outline: "bg-transparent border border-border"
};
var sizeStyles2 = {
  sm: "px-2 py-1 text-sm rounded-sm",
  md: "px-3 py-2 text-sm rounded-md",
  lg: "px-4 py-3 text-base rounded-lg"
};
var Input = react.forwardRef(
  ({ label, helperText, error, variant = "default", inputSize = "md", className = "", id, ...props }, ref) => {
    const autoId = react.useId();
    const inputId = id ?? autoId;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-on-surface", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref,
          id: inputId,
          className: [
            "w-full text-on-surface placeholder:text-on-surface-muted transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            variantStyles2[variant],
            sizeStyles2[inputSize],
            error ? "border-error focus-visible:ring-error" : "",
            className
          ].join(" "),
          "aria-invalid": !!error,
          "aria-describedby": error ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
          ...props
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: `${inputId}-error`, className: "text-xs text-error", children: error }),
      !error && helperText && /* @__PURE__ */ jsxRuntime.jsx("p", { id: `${inputId}-helper`, className: "text-xs text-on-surface-muted", children: helperText })
    ] });
  }
);
Input.displayName = "Input";
var variantStyles3 = {
  default: "bg-[var(--primary-200)] text-[var(--primary-900)]",
  accent: "bg-[var(--accent-100)] text-[var(--accent-800)]",
  success: "bg-[var(--success-100)] text-[var(--success-700)]",
  warning: "bg-[var(--warning-100)] text-[var(--warning-600)]",
  error: "bg-[var(--destructive-100)] text-[var(--destructive-600)]",
  info: "bg-[var(--accent-100)] text-[var(--accent-700)]"
};
var sizeStyles3 = {
  sm: "px-[var(--xs)] py-[1px] text-[10px]",
  md: "px-[var(--s)] py-[var(--xxs)] text-[12px]"
};
var Badge = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "span",
  {
    className: [
      "inline-flex items-center font-medium rounded-[var(--xs)]",
      "font-['Source_Sans_3',sans-serif] leading-[1.2] whitespace-nowrap",
      variantStyles3[variant],
      sizeStyles3[size],
      className
    ].join(" "),
    ...props,
    children
  }
);
Badge.displayName = "Badge";
var trackSize = {
  sm: "w-8 h-[18px]",
  md: "w-11 h-6"
};
var thumbSize = {
  sm: { base: "h-3.5 w-3.5", translate: "translate-x-[14px]" },
  md: { base: "h-5 w-5", translate: "translate-x-5" }
};
var Toggle = ({
  checked = false,
  onChange,
  size = "md",
  label,
  disabled = false,
  id,
  className = ""
}) => {
  const autoId = react.useId();
  const toggleId = id ?? autoId;
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      if (!disabled) onChange == null ? void 0 : onChange(!checked);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `inline-flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        id: toggleId,
        role: "switch",
        type: "button",
        "aria-checked": checked,
        disabled,
        onClick: () => onChange == null ? void 0 : onChange(!checked),
        onKeyDown: handleKeyDown,
        className: [
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-xl transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          trackSize[size],
          checked ? "bg-primary" : "bg-border"
        ].join(" "),
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: [
              "pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
              thumbSize[size].base,
              checked ? thumbSize[size].translate : "translate-x-0.5"
            ].join(" ")
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsxRuntime.jsx(
      "label",
      {
        htmlFor: toggleId,
        className: `text-sm text-on-surface select-none ${disabled ? "opacity-50" : "cursor-pointer"}`,
        children: label
      }
    )
  ] });
};

exports.Badge = Badge;
exports.Button = Button;
exports.Input = Input;
exports.Toggle = Toggle;
