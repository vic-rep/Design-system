import { jsx } from 'react/jsx-runtime';

var defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  textLg: "p",
  text: "p",
  textM: "p",
  textSm: "span",
  caption: "span"
};
var variantStyles = {
  h1: "text-[48px] font-semibold leading-[1.2] max-md:text-[32px]",
  h2: "text-[40px] font-semibold leading-[1.2] max-md:text-[28px]",
  h3: "text-[36px] font-semibold leading-[1.2] max-md:text-[24px]",
  h4: "text-[32px] font-semibold leading-[1.2] max-md:text-[20px]",
  h5: "text-[24px] font-medium leading-[1.2] max-md:text-[18px]",
  h6: "text-[20px] font-medium leading-[1.2] max-md:text-[16px]",
  textLg: "text-[18px] font-normal leading-[1.2] max-md:text-[16px]",
  text: "text-[16px] font-normal leading-[1.2] max-md:text-[14px]",
  textM: "text-[16px] font-medium leading-[1.2] max-md:text-[14px]",
  textSm: "text-[14px] font-normal leading-[1.2] max-md:text-[12px] max-md:leading-[1.3]",
  caption: "text-[12px] font-normal leading-[1.2] max-md:text-[10px] max-md:leading-[1.3]"
};
var colorStyles = {
  primary: "text-[var(--primary-900)]",
  secondary: "text-[var(--primary-700)]",
  muted: "text-[var(--primary-500)]",
  subtle: "text-[var(--primary-400)]",
  accent: "text-[var(--accent-600)]",
  success: "text-[var(--success-700)]",
  error: "text-[var(--destructive-550)]",
  white: "text-[var(--constant-white)]",
  inherit: "text-inherit"
};
var Typography = ({
  variant = "text",
  as,
  color = "primary",
  bold,
  className = "",
  children,
  style,
  ...props
}) => {
  const Component = as ?? defaultElements[variant];
  return /* @__PURE__ */ jsx(
    Component,
    {
      className: [
        "font-['Source_Sans_3',sans-serif]",
        variantStyles[variant],
        colorStyles[color],
        bold ? "!font-bold" : "",
        className
      ].filter(Boolean).join(" "),
      style,
      ...props,
      children
    }
  );
};
Typography.displayName = "Typography";
var sizeStyles = {
  xs: "text-[12px]",
  sm: "text-[14px]",
  md: "text-[16px]",
  lg: "text-[20px]",
  xl: "text-[24px]"
};
var Icon = ({
  name,
  size = "md",
  weight = "solid",
  label,
  className = "",
  ...props
}) => {
  const weightClass = weight === "regular" ? "fa-regular" : "fa-solid";
  if (label) {
    return /* @__PURE__ */ jsx(
      "i",
      {
        className: `${weightClass} ${name} ${sizeStyles[size]} ${className}`,
        role: "img",
        "aria-label": label,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "i",
    {
      className: `${weightClass} ${name} ${sizeStyles[size]} ${className}`,
      "aria-hidden": "true",
      ...props
    }
  );
};
Icon.displayName = "Icon";

export { Icon, Typography };
