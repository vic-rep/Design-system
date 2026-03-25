import { Icon, Typography } from './chunk-VVBQHTUJ.mjs';
import React9, { forwardRef, useId, useState, useRef, useEffect, useCallback } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

var typeStyles = {
  primary: [
    "bg-[var(--accent-600,#f76803)] text-white",
    "hover:bg-[var(--accent-500,#fc7d21)]",
    "active:bg-[var(--accent-500,#fc7d21)]",
    "focus-visible:bg-[var(--accent-600,#f76803)] focus-visible:border focus-visible:border-[var(--accent-700,#c55302)]",
    "disabled:bg-[var(--surface-adjacent-2,#e1e5eb)] disabled:text-white"
  ].join(" "),
  secondary: [
    "bg-white text-[var(--primary-900,#191919)] border border-[var(--primary-900,#191919)]",
    "hover:bg-[var(--surface,#f3f2f0)]",
    "active:bg-[var(--surface,#f3f2f0)]",
    "focus-visible:border-[var(--accent-700,#c55302)]",
    "disabled:bg-[var(--surface-adjacent-2,#e1e5eb)] disabled:opacity-20"
  ].join(" "),
  link: [
    "bg-transparent text-[var(--primary-900,#191919)]",
    "hover:text-[var(--accent-600,#f76803)]",
    "active:text-[var(--accent-600,#f76803)]",
    "disabled:opacity-20"
  ].join(" "),
  icon: [
    "bg-transparent text-[var(--primary-900,#191919)] rounded-full",
    "hover:bg-[var(--surface-adjacent-2,#e1e5eb)]",
    "active:bg-[var(--surface-adjacent-2,#e1e5eb)]",
    "focus-visible:border focus-visible:border-[var(--accent-700,#c55302)]",
    "disabled:opacity-20"
  ].join(" ")
};
var sizeStyles = {
  primary: {
    s: "px-[var(--s,8px)] py-[var(--xs,4px)] text-[14px]",
    m: "p-[var(--s,8px)] text-[14px]",
    l: "px-[var(--l,16px)] py-[var(--s,8px)] text-[14px]",
    xl: "px-[var(--xl,20px)] py-[var(--m,12px)] text-[14px]"
  },
  secondary: {
    s: "px-[var(--s,8px)] py-[var(--xs,4px)] text-[14px]",
    m: "p-[var(--s,8px)] text-[14px]",
    l: "px-[var(--l,16px)] py-[var(--s,8px)] text-[14px]",
    xl: "px-[var(--xl,20px)] py-[var(--m,12px)] text-[14px]"
  },
  link: {
    s: "text-[14px]",
    m: "text-[14px]",
    l: "text-[14px]",
    xl: "text-[14px]"
  },
  icon: {
    s: "p-[10px] w-[24px] h-[24px]",
    m: "p-[10px] w-[28px] h-[28px]",
    l: "p-[10px] w-[32px] h-[32px]",
    xl: "p-[10px] w-[40px] h-[40px]"
  }
};
var iconSizeMap = {
  s: "xs",
  m: "xs",
  l: "xs",
  xl: "md"
};
var iconExtraClasses = {
  s: "w-[12px] h-[12px]",
  m: "w-[12px] h-[12px]",
  l: "w-[12px] h-[12px]",
  xl: "w-[16px] h-[16px]"
};
var iconOnlySizeMap = {
  s: "xs",
  m: "xs",
  l: "md",
  xl: "lg"
};
var Button = forwardRef(
  ({
    variant = "primary",
    size = "l",
    loading = false,
    fullWidth = false,
    disabled,
    leadingIcon,
    trailingIcon,
    children,
    className = "",
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    const isIcon = variant === "icon";
    const isLink = variant === "link";
    const baseRadius = isIcon ? "" : "rounded-[var(--radius-md,8px)]";
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        disabled: isDisabled,
        "aria-busy": loading || void 0,
        className: [
          "inline-flex items-center justify-center font-medium",
          "font-['Source_Sans_3',sans-serif]",
          "transition-all duration-150 ease-in-out",
          "focus-visible:outline-none",
          baseRadius,
          typeStyles[variant],
          sizeStyles[variant][size],
          isDisabled ? "cursor-not-allowed pointer-events-none" : "cursor-pointer",
          fullWidth ? "w-full" : "",
          className
        ].filter(Boolean).join(" "),
        style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
        ...props,
        children: loading ? /* @__PURE__ */ jsx(
          Icon,
          {
            name: "fa-spinner",
            className: "fa-spin",
            style: { fontSize: "inherit" }
          }
        ) : isIcon ? /* @__PURE__ */ jsx(
          Icon,
          {
            name: leadingIcon || "fa-house",
            size: iconOnlySizeMap[size]
          }
        ) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-[12px]", children: [
          leadingIcon && /* @__PURE__ */ jsx(
            Icon,
            {
              name: leadingIcon,
              size: iconSizeMap[size],
              className: `${iconExtraClasses[size]} ${isLink ? "text-[var(--accent-600,#f76803)]" : ""}`
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "leading-[1.2] whitespace-nowrap", children }),
          trailingIcon && /* @__PURE__ */ jsx(
            Icon,
            {
              name: trailingIcon,
              size: iconSizeMap[size],
              className: `${iconExtraClasses[size]} ${isLink ? "text-[var(--accent-600,#f76803)]" : ""}`
            }
          )
        ] })
      }
    );
  }
);
Button.displayName = "Button";
function fieldClasses(hasError, disabled) {
  return [
    "w-full p-[var(--m)] rounded-[var(--s)]",
    "font-normal text-[16px] leading-[1.2] text-[var(--primary-900)]",
    "placeholder:text-[var(--primary-400)]",
    "border transition-[border-color] duration-150 ease-in-out",
    "focus-visible:outline-none",
    hasError ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]" : "bg-[var(--surface-adjacent)] border-[var(--primary-300)] focus-visible:border-[var(--primary-400)]",
    disabled ? "opacity-20 cursor-not-allowed" : ""
  ].filter(Boolean).join(" ");
}
function ChevronDown({ className }) {
  return /* @__PURE__ */ jsx(
    Icon,
    {
      name: "fa-chevron-down",
      size: "xs",
      className: `text-[var(--primary-900)] ${className ?? ""}`
    }
  );
}
function ErrorBadge({ error }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-full mb-[2px] z-10", children: /* @__PURE__ */ jsxs(
    "div",
    {
      role: "tooltip",
      className: "relative flex items-start gap-[var(--xs)] p-[var(--s)] rounded-[var(--xs)] text-[12px] leading-[1.3] font-normal max-w-[320px] min-w-[200px] bg-[var(--primary-100)] border border-[var(--destructive-200)] text-[var(--destructive-600)]",
      children: [
        /* @__PURE__ */ jsx(Icon, { name: "fa-circle-exclamation", size: "xs", className: "text-[var(--destructive-600)] shrink-0 mt-[1px]" }),
        error,
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute w-0 h-0 border-solid border-[6px]",
            style: {
              top: "100%",
              right: "var(--s)",
              borderColor: "var(--destructive-200) transparent transparent transparent"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute w-0 h-0 border-solid border-[6px]",
            style: {
              top: "100%",
              right: "var(--s)",
              borderColor: "var(--primary-100) transparent transparent transparent",
              marginTop: "-1px"
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  ) });
}
var Input = forwardRef(
  ({
    inputType = "text",
    label,
    error,
    showLabel = true,
    disabled,
    options = [],
    countryCode = "+359",
    countryFlag = "\u{1F1E7}\u{1F1EC}",
    id: externalId,
    className = "",
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = error ? `${id}-error` : void 0;
    const hasError = Boolean(error);
    return /* @__PURE__ */ jsxs("div", { className: `relative flex flex-col gap-[var(--xs)] items-start ${className}`, children: [
      showLabel && label && inputType !== "plate" && inputType !== "phone" && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center px-[var(--xs)] w-full", children: /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: id,
          className: "flex-1 font-normal text-[10px] leading-[1.3] text-[var(--primary-900)]",
          children: label
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
        inputType === "text" && /* @__PURE__ */ jsx(
          TextInput,
          {
            id,
            ref,
            hasError,
            disabled,
            errorId,
            ...props
          }
        ),
        inputType === "textarea" && /* @__PURE__ */ jsx(
          TextareaInput,
          {
            id,
            ref,
            hasError,
            disabled,
            errorId,
            ...props
          }
        ),
        inputType === "dropdown" && /* @__PURE__ */ jsx(
          DropdownInput,
          {
            id,
            ref,
            hasError,
            disabled,
            errorId,
            options,
            ...props
          }
        ),
        inputType === "plate" && /* @__PURE__ */ jsx(
          PlateInput,
          {
            id,
            ref,
            hasError,
            disabled,
            errorId,
            ...props
          }
        ),
        inputType === "phone" && /* @__PURE__ */ jsx(
          PhoneInput,
          {
            id,
            ref,
            hasError,
            disabled,
            errorId,
            countryCode,
            countryFlag,
            ...props
          }
        ),
        inputType === "datepicker" && /* @__PURE__ */ jsx(
          DatepickerInput,
          {
            id,
            ref,
            hasError,
            disabled,
            errorId,
            ...props
          }
        ),
        hasError && error && /* @__PURE__ */ jsx(ErrorBadge, { error })
      ] })
    ] });
  }
);
Input.displayName = "Input";
var TextInput = forwardRef(
  ({ id, hasError, disabled, errorId, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      id,
      type: "text",
      disabled,
      "aria-invalid": hasError || void 0,
      "aria-describedby": errorId,
      className: `h-[41px] ${fieldClasses(hasError, disabled)}`,
      ...props
    }
  )
);
TextInput.displayName = "TextInput";
var TextareaInput = forwardRef(
  ({ id, hasError, disabled, errorId, ...props }, ref) => /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      id,
      disabled,
      "aria-invalid": hasError || void 0,
      "aria-describedby": errorId,
      className: `h-[60px] resize-y items-start ${fieldClasses(hasError, disabled)}`,
      ...props
    }
  )
);
TextareaInput.displayName = "TextareaInput";
var DropdownInput = forwardRef(
  ({ id, hasError, disabled, errorId, options, placeholder, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        ref,
        id,
        disabled,
        "aria-invalid": hasError || void 0,
        "aria-describedby": errorId,
        className: `h-[41px] appearance-none pr-[var(--xxl)] ${fieldClasses(hasError, disabled)}`,
        defaultValue: "",
        ...props,
        children: [
          placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: placeholder }),
          options.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-[var(--m)] top-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx(ChevronDown, {}) })
  ] })
);
DropdownInput.displayName = "DropdownInput";
var PlateInput = forwardRef(
  ({ id, hasError, disabled, errorId, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: `flex items-start ${disabled ? "opacity-20 cursor-not-allowed" : ""}`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex items-center justify-center w-[38px] h-[41px] rounded-l-[var(--s)] shrink-0",
        style: { backgroundColor: "#003399" },
        children: /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white font-medium leading-none", children: "BG" })
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        id,
        type: "text",
        disabled,
        "aria-invalid": hasError || void 0,
        "aria-describedby": errorId,
        className: [
          "flex-1 h-[41px] p-[var(--m)]",
          "rounded-r-[var(--s)] rounded-l-none border-l-0",
          "font-normal text-[16px] leading-[1.2] text-[var(--primary-900)]",
          "placeholder:text-[var(--primary-400)]",
          "border transition-[border-color] duration-150 ease-in-out",
          "focus-visible:outline-none",
          hasError ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]" : "bg-[var(--surface-adjacent)] border-[var(--primary-300)] focus-visible:border-[var(--primary-400)]"
        ].filter(Boolean).join(" "),
        placeholder: "EA1234CB",
        ...props
      }
    )
  ] })
);
PlateInput.displayName = "PlateInput";
var PhoneInput = forwardRef(
  ({ id, hasError, disabled, errorId, countryCode, countryFlag, ...props }, ref) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
      const handleClick = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: wrapperRef,
        className: `flex items-center h-[41px] rounded-[var(--s)] border p-[var(--m)] gap-[var(--s)] ${hasError ? "bg-[var(--destructive-100)] border-[var(--destructive-300)]" : "bg-[var(--surface-adjacent)] border-[var(--primary-300)]"} ${disabled ? "opacity-20 cursor-not-allowed" : ""}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              disabled,
              className: "flex items-center gap-[var(--s)] shrink-0 h-full border-none bg-transparent cursor-pointer p-0",
              onClick: () => setDropdownOpen(!dropdownOpen),
              "aria-label": "Select country",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-[14px] leading-none", children: countryFlag }),
                /* @__PURE__ */ jsx(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              id,
              type: "tel",
              disabled,
              "aria-invalid": hasError || void 0,
              "aria-describedby": errorId,
              className: "flex-1 border-none bg-transparent outline-none font-normal text-[16px] leading-[1.2] text-[var(--primary-900)] placeholder:text-[var(--primary-400)] p-0 min-w-0",
              placeholder: "089xxxxxxxxxx",
              ...props
            }
          )
        ]
      }
    );
  }
);
PhoneInput.displayName = "PhoneInput";
var DatepickerInput = forwardRef(
  ({ id, hasError, disabled, errorId, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      id,
      type: "date",
      disabled,
      "aria-invalid": hasError || void 0,
      "aria-describedby": errorId,
      className: `h-[41px] ${fieldClasses(hasError, disabled)}`,
      ...props
    }
  )
);
DatepickerInput.displayName = "DatepickerInput";
var variantConfig = {
  warning: {
    bg: "var(--warning-100)",
    border: "var(--warning-500)",
    icon: "fa-triangle-exclamation",
    iconColor: "var(--accent-600)"
  },
  error: {
    bg: "var(--destructive-100)",
    border: "var(--destructive-550)",
    icon: "fa-circle-exclamation",
    iconColor: "var(--destructive-550)"
  },
  info: {
    bg: "var(--surface-adjacent)",
    border: "var(--primary-900)",
    icon: "fa-circle-info",
    iconColor: "var(--primary-900)"
  },
  success: {
    bg: "var(--success-100)",
    border: "var(--success-700)",
    icon: "fa-circle-check",
    iconColor: "var(--success-700)"
  }
};
function Alert({
  variant = "info",
  title,
  description,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  primaryAction,
  secondaryAction,
  className = ""
}) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? internalExpanded;
  const config = variantConfig[variant];
  const contentId = useId();
  const headerId = useId();
  const hasExpandableContent = Boolean(description || primaryAction || secondaryAction);
  const handleToggle = () => {
    const next = !isExpanded;
    setInternalExpanded(next);
    onToggle == null ? void 0 : onToggle(next);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "alert",
      className: `rounded-[var(--s)] border overflow-hidden ${className}`,
      style: { backgroundColor: config.bg, borderColor: config.border },
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            id: headerId,
            "aria-expanded": hasExpandableContent ? isExpanded : void 0,
            "aria-controls": hasExpandableContent ? contentId : void 0,
            onClick: hasExpandableContent ? handleToggle : void 0,
            className: [
              "flex items-start gap-[var(--s)] w-full p-[var(--l)]",
              "text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-600)] focus-visible:ring-inset",
              hasExpandableContent ? "cursor-pointer" : "cursor-default"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsx(
                Icon,
                {
                  name: config.icon,
                  size: "md",
                  className: "shrink-0 mt-[1px]",
                  style: { color: config.iconColor }
                }
              ),
              /* @__PURE__ */ jsx(Typography, { variant: "text", as: "span", className: "flex-1 !font-semibold leading-[1.2] text-black", children: title }),
              hasExpandableContent && /* @__PURE__ */ jsx(
                Icon,
                {
                  name: isExpanded ? "fa-chevron-up" : "fa-chevron-down",
                  size: "md",
                  className: "text-[var(--primary-900)] shrink-0 mt-[1px]"
                }
              )
            ]
          }
        ),
        hasExpandableContent && /* @__PURE__ */ jsx(
          "div",
          {
            id: contentId,
            role: "region",
            "aria-labelledby": headerId,
            className: "overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out",
            style: {
              maxHeight: isExpanded ? "500px" : "0px",
              opacity: isExpanded ? 1 : 0
            },
            children: /* @__PURE__ */ jsxs("div", { className: "px-[var(--l)] pb-[var(--l)] flex flex-col gap-[var(--m)]", children: [
              description && /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "text",
                  as: "p",
                  className: "text-black leading-[1.2] font-normal",
                  style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
                  children: description
                }
              ),
              (primaryAction || secondaryAction) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[var(--l)]", children: [
                primaryAction && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "secondary",
                    size: "s",
                    onClick: primaryAction.onClick,
                    children: primaryAction.label
                  }
                ),
                secondaryAction && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "link",
                    size: "s",
                    onClick: secondaryAction.onClick,
                    children: secondaryAction.label
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
var sizeConfig = {
  sm: {
    track: "w-[36px] h-[20px]",
    thumb: "w-[16px] h-[16px]",
    translate: "translateX(16px)"
  },
  md: {
    track: "w-[44px] h-[24px]",
    thumb: "w-[20px] h-[20px]",
    translate: "translateX(20px)"
  }
};
function Toggle({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  id: externalId,
  className = ""
}) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const config = sizeConfig[size];
  const handleChange = () => {
    if (!disabled) {
      onChange == null ? void 0 : onChange(!checked);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      handleChange();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-[var(--s)] ${className}`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        id,
        role: "switch",
        "aria-checked": checked,
        disabled,
        onClick: handleChange,
        onKeyDown: handleKeyDown,
        className: [
          "relative inline-flex items-center rounded-[var(--radius-full)] p-[2px]",
          "transition-[background-color] duration-150 ease-in-out",
          "focus-visible:outline-2 focus-visible:outline-[var(--accent-600)] focus-visible:outline-offset-2",
          config.track,
          checked ? "bg-[var(--accent-600)]" : "bg-[var(--primary-300)]",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        ].join(" "),
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: [
              "block rounded-full bg-[var(--constant-white)] shadow-sm",
              "transition-transform duration-150 ease-in-out",
              config.thumb
            ].join(" "),
            style: {
              transform: checked ? config.translate : "translateX(0px)"
            }
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsx(
      Typography,
      {
        variant: "textSm",
        as: "label",
        className: [
          "text-[var(--primary-900)] select-none",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        ].join(" "),
        ...{ htmlFor: id },
        children: label
      }
    )
  ] });
}
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  error = false,
  warning = false,
  label,
  message,
  id: externalId,
  className = ""
}) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const messageId = (error || warning) && message ? `${id}-message` : void 0;
  const handleChange = () => {
    if (!disabled) {
      onChange == null ? void 0 : onChange(!checked);
    }
  };
  const boxBorderClass = error ? "border-[var(--destructive-550)]" : "border-[var(--primary-800)]";
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-0 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-[var(--s)] ${disabled ? "opacity-20" : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id,
            checked,
            onChange: handleChange,
            disabled,
            "aria-invalid": error || void 0,
            "aria-describedby": messageId,
            className: "sr-only peer"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: handleChange,
            className: [
              "w-[24px] h-[24px] rounded-[var(--xs)] border flex items-center justify-center",
              "transition-all duration-150 ease-in-out",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--accent-600)] peer-focus-visible:outline-offset-2",
              checked ? "bg-[var(--accent-600)] border-[var(--accent-600)]" : `bg-white ${boxBorderClass}`,
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            ].join(" "),
            children: checked && /* @__PURE__ */ jsx(Icon, { name: "fa-check", size: "xs", className: "text-white" })
          }
        )
      ] }),
      label && /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: id,
          className: [
            "select-none leading-[1.2]",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          ].join(" "),
          children: /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "textSm",
              as: "span",
              className: "font-normal",
              style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
              children: label
            }
          )
        }
      )
    ] }),
    (error || warning) && message && /* @__PURE__ */ jsxs(
      "div",
      {
        id: messageId,
        className: "flex items-center gap-[6px] mt-[2px]",
        children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              name: "fa-circle-exclamation",
              size: "sm",
              className: error ? "text-[var(--destructive-550)]" : "text-[var(--warning-500)]"
            }
          ),
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "textSm",
              as: "span",
              className: `leading-[1.2] font-normal ${error ? "text-[var(--destructive-550)]" : "text-[var(--warning-500)]"}`,
              style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
              children: message
            }
          )
        ]
      }
    )
  ] });
}
var positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-[2px]",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-[2px]",
  left: "right-full top-1/2 -translate-y-1/2 mr-[2px]",
  right: "left-full top-1/2 -translate-y-1/2 ml-[2px]"
};
var arrowBase = "absolute w-0 h-0 border-solid border-[6px]";
function arrowClasses(position, type) {
  const color = type === "error" ? "var(--primary-100)" : "var(--primary-900)";
  const borderColor = type === "error" ? "var(--destructive-200)" : "transparent";
  const shared = {
    top: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `${color} transparent transparent transparent`,
      borderTopColor: color
    },
    bottom: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `transparent transparent ${color} transparent`,
      borderBottomColor: color
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent transparent transparent ${color}`,
      borderLeftColor: color
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent ${color} transparent transparent`,
      borderRightColor: color
    }
  };
  const outerShared = {
    top: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `${borderColor} transparent transparent transparent`,
      marginTop: "1px"
    },
    bottom: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderColor: `transparent transparent ${borderColor} transparent`,
      marginBottom: "1px"
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent transparent transparent ${borderColor}`,
      marginLeft: "1px"
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderColor: `transparent ${borderColor} transparent transparent`,
      marginRight: "1px"
    }
  };
  return { inner: shared[position], outer: outerShared[position] };
}
function Tooltip({
  content,
  type = "info",
  position = "top",
  children
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), 200);
  }, []);
  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);
  const isError = type === "error";
  const arrows = arrowClasses(position, type);
  const bodyClasses = [
    "absolute z-50 pointer-events-none",
    "p-[var(--s)] rounded-[var(--xs)]",
    "text-[12px] leading-[1.3] font-normal",
    "max-w-[320px] min-w-[200px]",
    "animate-[fadeIn_150ms_ease-in-out]",
    isError ? "bg-[var(--primary-100)] border border-[var(--destructive-200)] text-[var(--destructive-600)]" : "bg-[var(--primary-900)] text-[var(--surface-adjacent)]",
    positionStyles[position]
  ].join(" ");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative inline-flex",
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      children: [
        children,
        visible && /* @__PURE__ */ jsxs("div", { role: "tooltip", className: bodyClasses, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "span", color: "inherit", children: content }),
          isError && /* @__PURE__ */ jsx(
            "span",
            {
              className: `${arrowBase}`,
              style: arrows.outer,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `${arrowBase}`,
              style: arrows.inner,
              "aria-hidden": "true"
            }
          )
        ] })
      ]
    }
  );
}
var Modal = ({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  const hasFooter = primaryAction || secondaryAction;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: modalRef,
            className: [
              "hidden md:flex flex-col",
              "w-[600px] min-h-[600px]",
              "bg-[var(--surface,#f3f2f0)]",
              "rounded-[var(--m,12px)]",
              "p-[var(--l,16px)]",
              "gap-[var(--l,16px)]"
            ].join(" "),
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center", children: [
                /* @__PURE__ */ jsx(Typography, { variant: "h6", as: "h2", className: "text-[var(--primary-900,#191919)]", children: title }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "cursor-pointer bg-transparent border-none p-0",
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ jsx(Icon, { name: "fa-xmark", size: "lg", className: "text-[var(--primary-900,#191919)]" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-h-0", children: [
                /* @__PURE__ */ jsx("div", { className: "overflow-y-auto h-full text-[16px] leading-[1.2] text-[var(--primary-900,#191919)]", children }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "pointer-events-none absolute bottom-0 left-0 right-0 h-[40px]",
                    style: {
                      background: "linear-gradient(to bottom, transparent, var(--surface, #f3f2f0))"
                    }
                  }
                )
              ] }),
              hasFooter && /* @__PURE__ */ jsx("div", { className: "flex items-end w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[var(--m,12px)] ml-auto", children: [
                secondaryAction && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "secondary",
                    size: "s",
                    onClick: secondaryAction.onClick,
                    children: secondaryAction.label
                  }
                ),
                primaryAction && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "primary",
                    size: "s",
                    onClick: primaryAction.onClick,
                    children: primaryAction.label
                  }
                )
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: [
              "flex md:hidden flex-col",
              "w-[350px] min-h-[520px]",
              "bg-[var(--surface,#f3f2f0)]",
              "rounded-[var(--m,12px)]",
              "p-[var(--l,16px)]",
              "gap-[var(--l,16px)]"
            ].join(" "),
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center", children: [
                /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "h2", className: "!font-semibold text-[var(--primary-900,#191919)]", children: title }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "cursor-pointer bg-transparent border-none p-0",
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ jsx(Icon, { name: "fa-xmark", size: "lg", className: "text-[var(--primary-900,#191919)]" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-h-0", children: [
                /* @__PURE__ */ jsx("div", { className: "overflow-y-auto max-h-[400px] text-[14px] leading-[1.2] text-[var(--primary-900,#191919)]", children }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "pointer-events-none absolute bottom-0 left-0 right-0 h-[40px]",
                    style: {
                      background: "linear-gradient(to bottom, transparent, var(--surface, #f3f2f0))"
                    }
                  }
                )
              ] }),
              hasFooter && /* @__PURE__ */ jsx("div", { className: "flex items-end w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[var(--m,12px)] ml-auto", children: [
                secondaryAction && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "secondary",
                    size: "s",
                    onClick: secondaryAction.onClick,
                    children: secondaryAction.label
                  }
                ),
                primaryAction && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "primary",
                    size: "s",
                    onClick: primaryAction.onClick,
                    children: primaryAction.label
                  }
                )
              ] }) })
            ]
          }
        )
      ]
    }
  );
};
Modal.displayName = "Modal";
function Tabs({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  className = ""
}) {
  var _a;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? ((_a = items[0]) == null ? void 0 : _a.value) ?? ""
  );
  const activeValue = controlledValue ?? internalValue;
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  useEffect(() => {
    if (!containerRef.current) return;
    const activeButton = containerRef.current.querySelector(
      `[data-tab-value="${activeValue}"]`
    );
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight
      });
    }
  }, [activeValue, items]);
  const handleSelect = (val) => {
    if (controlledValue === void 0) setInternalValue(val);
    onChange == null ? void 0 : onChange(val);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      role: "tablist",
      className: `relative inline-flex items-center bg-[var(--surface-adjacent)] rounded-[var(--4xl)] p-[var(--xs)] gap-[var(--xxs)] ${className}`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-[var(--xs)] rounded-[var(--3xl)] bg-[var(--primary-900)] transition-all duration-200 ease-in-out z-0",
            style: indicatorStyle
          }
        ),
        items.map((item) => {
          const isActive = item.value === activeValue;
          return /* @__PURE__ */ jsx(
            "button",
            {
              role: "tab",
              type: "button",
              "data-tab-value": item.value,
              "aria-selected": isActive,
              disabled: item.disabled,
              onClick: () => handleSelect(item.value),
              className: [
                "relative z-10 px-[var(--l)] py-[var(--s)] rounded-[var(--3xl)]",
                "text-[14px] font-medium leading-[1.2] transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-600)]",
                isActive ? "text-[var(--constant-white)]" : "text-[var(--primary-600)] hover:bg-[var(--primary-100)]",
                item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              ].filter(Boolean).join(" "),
              children: /* @__PURE__ */ jsx(Typography, { variant: "text", as: "span", className: "inherit-color", children: item.label })
            },
            item.value
          );
        })
      ]
    }
  );
}
Tabs.displayName = "Tabs";
function ContextMenu({
  items,
  open,
  onClose,
  onSelect,
  className = ""
}) {
  const menuRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: menuRef,
      role: "menu",
      className: [
        "flex flex-col p-[var(--m)] min-w-[188px]",
        "bg-[var(--surface-adjacent)] rounded-[var(--s)]",
        "border border-[var(--primary-100)]",
        className
      ].join(" "),
      style: {
        boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.05), 0px 3px 3px 0px rgba(0,0,0,0.04), 0px 6px 4px 0px rgba(0,0,0,0.03), 0px 11px 4px 0px rgba(0,0,0,0.01), 0px 17px 5px 0px rgba(0,0,0,0)"
      },
      children: items.map((item) => /* @__PURE__ */ jsxs(React9.Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            role: "menuitem",
            type: "button",
            disabled: item.disabled,
            onClick: () => {
              if (!item.disabled) {
                onSelect == null ? void 0 : onSelect(item.id);
                onClose();
              }
            },
            className: [
              "flex items-center w-full p-[var(--m)]",
              "rounded-[var(--xs)] text-left text-[16px] leading-[1.2] font-normal",
              "transition-colors duration-100",
              "focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[var(--accent-700)]",
              item.disabled ? "opacity-20 cursor-not-allowed" : item.destructive ? "text-[var(--destructive-600)] hover:bg-[var(--destructive-100)] active:bg-[var(--primary-200)] cursor-pointer" : "text-[var(--primary-900)] hover:bg-[var(--primary-100)] active:bg-[var(--primary-200)] cursor-pointer"
            ].join(" "),
            style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-[var(--s)]", children: [
                item.leftIcon && /* @__PURE__ */ jsx(Icon, { name: item.leftIcon, size: "xs", weight: "regular", className: "w-[12px] text-center text-[var(--accent-600)] shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: item.label })
              ] }),
              (item.additionalText || item.rightIcon) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[var(--xs)] shrink-0", children: [
                item.additionalText && /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "caption",
                    as: "span",
                    color: "muted",
                    className: "leading-[1.2]",
                    style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
                    children: item.additionalText
                  }
                ),
                item.rightIcon && /* @__PURE__ */ jsx(Icon, { name: item.rightIcon, size: "xs", weight: "regular", className: "w-[12px] text-center text-[var(--primary-900)] shrink-0" })
              ] })
            ] })
          }
        ),
        item.dividerAfter && /* @__PURE__ */ jsx("div", { className: "h-px bg-[var(--primary-200)] my-[var(--xs)]" })
      ] }, item.id))
    }
  );
}
ContextMenu.displayName = "ContextMenu";
function ProgressBar({
  currentStep,
  totalSteps,
  stepLabel,
  backLabel = "\u041D\u0430\u0437\u0430\u0434",
  showBack = true,
  onBack,
  className = ""
}) {
  const progress = Math.min(Math.max(currentStep / totalSteps * 100, 0), 100);
  return /* @__PURE__ */ jsxs("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col gap-[var(--m)]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        showBack && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "flex items-center gap-[var(--s)] py-[8px] rounded-[24px] cursor-pointer shrink-0",
            children: [
              /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center w-[24px] h-[24px] rounded-full", children: /* @__PURE__ */ jsx(Icon, { name: "fa-chevron-left", size: "md", weight: "regular" }) }),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "text",
                  as: "span",
                  className: "whitespace-nowrap",
                  style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
                  children: backLabel
                }
              )
            ]
          }
        ),
        stepLabel && /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "text",
            as: "span",
            className: "whitespace-nowrap",
            style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
            children: stepLabel
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-full h-[var(--xs)] bg-[var(--primary-300)] rounded-[1000px] overflow-hidden",
          role: "progressbar",
          "aria-valuenow": currentStep,
          "aria-valuemin": 0,
          "aria-valuemax": totalSteps,
          "aria-label": stepLabel ?? `Step ${currentStep} of ${totalSteps}`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-[var(--accent-600)] rounded-[1000px] transition-[width] duration-300 ease-in-out",
              style: { width: `${progress}%` }
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex md:hidden flex-col gap-[12px]", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: showBack ? onBack : void 0,
          className: "flex items-center justify-between w-full cursor-pointer",
          children: [
            showBack && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center w-[28px] h-[28px] rounded-full", children: /* @__PURE__ */ jsx(Icon, { name: "fa-chevron-left", size: "lg", weight: "regular" }) }),
            stepLabel && /* @__PURE__ */ jsx(
              Typography,
              {
                variant: "textSm",
                as: "span",
                className: "whitespace-nowrap",
                style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
                children: stepLabel
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-full h-[var(--xs)] bg-[var(--primary-300)] rounded-[1000px] overflow-hidden",
          role: "progressbar",
          "aria-valuenow": currentStep,
          "aria-valuemin": 0,
          "aria-valuemax": totalSteps,
          "aria-label": stepLabel ?? `Step ${currentStep} of ${totalSteps}`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-[var(--accent-600)] rounded-[1000px] transition-[width] duration-300 ease-in-out",
              style: { width: `${progress}%` }
            }
          )
        }
      )
    ] })
  ] });
}
ProgressBar.displayName = "ProgressBar";
function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) {
  const pages = getPageNumbers(currentPage, totalPages);
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Pagination", className: `inline-flex items-center gap-[var(--xxs)] ${className}`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        disabled: currentPage <= 1,
        onClick: () => onPageChange(currentPage - 1),
        "aria-label": "Previous page",
        className: "w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] text-[var(--primary-600)] hover:bg-[var(--primary-100)] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed",
        children: /* @__PURE__ */ jsx(Icon, { name: "fa-chevron-left", size: "xs" })
      }
    ),
    pages.map(
      (page, i) => page === "ellipsis" ? /* @__PURE__ */ jsx(
        "span",
        {
          className: "w-[36px] h-[36px] flex items-center justify-center text-[var(--primary-400)]",
          children: /* @__PURE__ */ jsx(Typography, { variant: "text", as: "span", color: "inherit", children: "..." })
        },
        `e-${i}`
      ) : /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onPageChange(page),
          "aria-current": page === currentPage ? "page" : void 0,
          className: [
            "w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] text-[14px] font-medium transition-colors duration-150",
            page === currentPage ? "bg-[var(--accent-600)] text-[var(--constant-white)]" : "text-[var(--primary-600)] hover:bg-[var(--primary-100)]"
          ].join(" "),
          children: /* @__PURE__ */ jsx(Typography, { variant: "text", as: "span", color: "inherit", children: page })
        },
        page
      )
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        disabled: currentPage >= totalPages,
        onClick: () => onPageChange(currentPage + 1),
        "aria-label": "Next page",
        className: "w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] text-[var(--primary-600)] hover:bg-[var(--primary-100)] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed",
        children: /* @__PURE__ */ jsx(Icon, { name: "fa-chevron-right", size: "xs" })
      }
    )
  ] });
}
Pagination.displayName = "Pagination";
var variantStyles = {
  default: "bg-[var(--surface-adjacent)] border border-[var(--primary-300)] text-[var(--primary-900)]",
  accent: "bg-[var(--accent-100)] border border-[var(--accent-300)] text-[var(--accent-800)]",
  success: "bg-[var(--success-100)] border border-[var(--success-300)] text-[var(--success-800)]",
  warning: "bg-[var(--warning-100)] border border-[var(--warning-300)] text-[var(--warning-600)]",
  destructive: "bg-[var(--destructive-100)] border border-[var(--destructive-300)] text-[var(--destructive-600)]"
};
var selectedStyles = {
  default: "border-[var(--primary-900)]",
  accent: "border-[var(--accent-600)]",
  success: "border-[var(--success-700)]",
  warning: "border-[var(--warning-500)]",
  destructive: "border-[var(--destructive-550)]"
};
var sizePadding = {
  xs: "px-[var(--s)] py-[var(--xs)]",
  s: "px-[var(--m)] py-[var(--xs)]",
  m: "px-[var(--l)] py-[var(--s)]",
  l: "px-[var(--l)] py-[var(--s)]"
};
var sizeText = {
  xs: "text-[12px] leading-[1.3] font-normal",
  s: "text-[14px] leading-[1.2] font-normal",
  m: "text-[14px] leading-[1.2] font-medium",
  l: "text-[16px] leading-[1.2] font-normal"
};
function Pill({
  children,
  variant = "default",
  size = "xs",
  selected = false,
  onClick,
  leftIcon,
  rightIcon,
  className = ""
}) {
  const isInteractive = !!onClick;
  const Tag2 = isInteractive ? "button" : "span";
  return /* @__PURE__ */ jsxs(
    Tag2,
    {
      ...isInteractive ? { type: "button", role: "button", onClick, tabIndex: 0 } : {},
      className: [
        "inline-flex items-center justify-center gap-[var(--s)] rounded-[var(--xxl)]",
        "transition-all duration-150",
        sizePadding[size],
        sizeText[size],
        variantStyles[variant],
        selected ? selectedStyles[variant] : "",
        isInteractive ? "cursor-pointer hover:opacity-80" : "",
        className
      ].filter(Boolean).join(" "),
      style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
      children: [
        leftIcon && /* @__PURE__ */ jsx(Icon, { name: leftIcon, size: size === "l" ? "md" : "xs", weight: "regular", className: "shrink-0" }),
        /* @__PURE__ */ jsx("span", { children }),
        rightIcon && /* @__PURE__ */ jsx(Icon, { name: rightIcon, size: size === "l" ? "md" : "xs", weight: "regular", className: "shrink-0" })
      ]
    }
  );
}
Pill.displayName = "Pill";
function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("fieldset", { className: `flex flex-col gap-[var(--m)] ${className}`, children: [
    legend && /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "legend", className: "!font-medium mb-[var(--xs)]", children: legend }),
    options.map((opt) => {
      const isSelected = opt.value === value;
      return /* @__PURE__ */ jsxs(
        "label",
        {
          className: [
            "inline-flex items-center gap-[var(--s)] cursor-pointer",
            opt.disabled ? "opacity-50 cursor-not-allowed" : ""
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex items-center justify-center w-[20px] h-[20px]", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name,
                  value: opt.value,
                  checked: isSelected,
                  disabled: opt.disabled,
                  onChange: () => onChange == null ? void 0 : onChange(opt.value),
                  className: "peer sr-only"
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: [
                    "w-[20px] h-[20px] rounded-full border-2 transition-colors duration-150",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-600)] peer-focus-visible:ring-offset-2",
                    isSelected ? "border-[var(--accent-600)]" : "border-[var(--primary-300)]"
                  ].join(" ")
                }
              ),
              isSelected && /* @__PURE__ */ jsx("span", { className: "absolute w-[10px] h-[10px] rounded-full bg-[var(--accent-600)]" })
            ] }),
            /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "span", children: opt.label })
          ]
        },
        opt.value
      );
    })
  ] });
}
RadioGroup.displayName = "RadioGroup";
function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  formatValue,
  disabled = false,
  className = ""
}) {
  const percent = (value - min) / (max - min) * 100;
  const displayValue = formatValue ? formatValue(value) : String(value);
  const id = React9.useId();
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-[var(--s)] ${disabled ? "opacity-50" : ""} ${className}`, children: [
    (label || showValue) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      label && /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "label", className: "!font-medium text-[var(--primary-900)]", ...{ htmlFor: id }, children: label }),
      showValue && /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "span", className: "!font-medium text-[var(--primary-900)]", children: displayValue })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[20px] flex items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 h-[4px] rounded-full bg-[var(--primary-200)]" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute left-0 h-[4px] rounded-full bg-[var(--accent-600)]",
          style: { width: `${percent}%` }
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          id,
          type: "range",
          min,
          max,
          step,
          value,
          disabled,
          onChange: (e) => onChange(Number(e.target.value)),
          className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed",
          style: { zIndex: 2 }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute w-[20px] h-[20px] rounded-full bg-[var(--constant-white)] border-2 border-[var(--accent-600)] pointer-events-none transition-shadow duration-150",
          style: {
            left: `calc(${percent}% - 10px)`,
            boxShadow: "var(--elevation-level1)",
            zIndex: 1
          }
        }
      )
    ] })
  ] });
}
Slider.displayName = "Slider";
var sizePadding2 = {
  xs: "gap-[var(--s)] px-[var(--s)] py-[var(--xs)]",
  s: "gap-[var(--s)] px-[var(--m)] py-[var(--xs)]",
  m: "gap-[var(--m)] px-[var(--l)] py-[var(--s)]",
  l: "gap-[var(--m)] px-[var(--l)] py-[var(--s)]"
};
var sizeText2 = {
  xs: "text-[12px] leading-[1.3]",
  s: "text-[14px] leading-[1.2]",
  m: "text-[14px] leading-[1.2]",
  l: "text-[18px] leading-[1.2]"
};
var sizeIcon = {
  xs: "text-[12px] w-[12px] h-[12px]",
  s: "text-[12px] w-[12px] h-[12px]",
  m: "text-[12px] w-[12px] h-[12px]",
  l: "text-[16px] w-[16px] h-[16px]"
};
function Tag({
  children,
  size = "xs",
  leftIcon,
  onRemove,
  className = ""
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: [
        "inline-flex items-center rounded-[var(--xs)]",
        "border border-[var(--surface-adjacent-2)] text-[var(--primary-900)]",
        "font-normal",
        sizePadding2[size],
        sizeText2[size],
        className
      ].join(" "),
      style: { fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1" },
      children: [
        leftIcon && /* @__PURE__ */ jsx(Icon, { name: leftIcon, size: size === "l" ? "md" : "xs", className: "shrink-0 text-[var(--primary-900)]" }),
        /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children }),
        onRemove && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            "aria-label": `Remove ${typeof children === "string" ? children : "tag"}`,
            className: `flex items-center justify-center shrink-0 cursor-pointer hover:opacity-60 transition-opacity duration-100 ${sizeIcon[size]}`,
            children: /* @__PURE__ */ jsx(Icon, { name: "fa-xmark", size: size === "l" ? "md" : "xs", className: "text-[var(--primary-900)]" })
          }
        )
      ]
    }
  );
}
Tag.displayName = "Tag";
var variantStyles2 = {
  info: "bg-[var(--primary-900)] text-[var(--constant-white)]",
  success: "bg-[var(--success-800)] text-[var(--constant-white)]",
  warning: "bg-[var(--warning-600)] text-[var(--constant-black)]",
  destructive: "bg-[var(--destructive-600)] text-[var(--constant-white)]"
};
var iconMap = {
  info: "fa-circle-info",
  success: "fa-circle-check",
  warning: "fa-triangle-exclamation",
  destructive: "fa-circle-exclamation"
};
function Toast({
  message,
  variant = "info",
  duration = 5e3,
  action,
  onDismiss,
  className = ""
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 200);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);
  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 200);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: [
        "flex items-center gap-[var(--m)] px-[var(--l)] py-[var(--m)] rounded-[var(--s)] min-w-[300px] max-w-[480px]",
        "transition-all duration-200 ease-in-out",
        variantStyles2[variant],
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]",
        className
      ].join(" "),
      style: { boxShadow: "var(--elevation-level3)" },
      children: [
        /* @__PURE__ */ jsx(Icon, { name: iconMap[variant], size: "md", className: "shrink-0" }),
        /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "span", color: "inherit", className: "flex-1 leading-[1.3]", children: message }),
        action && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: action.onClick,
            className: "text-[14px] font-semibold underline shrink-0 cursor-pointer",
            children: action.label
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            "aria-label": "Dismiss",
            className: "flex items-center justify-center w-[20px] h-[20px] shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer",
            children: /* @__PURE__ */ jsx(Icon, { name: "fa-xmark", size: "xs" })
          }
        )
      ]
    }
  );
}
Toast.displayName = "Toast";

export { Alert, Button, Checkbox, ContextMenu, Input, Modal, Pagination, Pill, ProgressBar, RadioGroup, Slider, Tabs, Tag, Toast, Toggle, Tooltip };
