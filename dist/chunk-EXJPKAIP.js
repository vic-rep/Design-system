'use strict';

var chunkDHJCEE3D_js = require('./chunk-DHJCEE3D.js');
var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var reactDom = require('react-dom');

var Navbar = ({ title, onThemeToggle, isDark = false }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "sticky top-0 z-40 flex h-14 items-center justify-between bg-surface px-6 border-b border-border", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textLg", as: "span", color: "inherit", bold: true, className: "text-on-surface", children: title }),
    onThemeToggle && /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        onClick: onThemeToggle,
        "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
        className: "inline-flex items-center justify-center rounded-md p-2 text-on-surface-muted transition-colors hover:bg-surface-alt hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        children: isDark ? /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-sun", size: "lg", label: "Sun icon" }) : /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-moon", size: "lg", label: "Moon icon" })
      }
    )
  ] });
};
var Sidebar = ({ sections, activeId, onNavigate }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("aside", { className: "flex w-full flex-col overflow-y-auto bg-surface pr-2", children: /* @__PURE__ */ jsxRuntime.jsx("nav", { children: sections.map((section) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "h3", color: "muted", bold: true, className: "mb-2 px-6 uppercase tracking-widest", children: section.title }),
    /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "space-y-0.5", children: section.items.map((item) => {
      const isActive = item.id === activeId;
      return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
        chunkDHJCEE3D_js.Typography,
        {
          variant: "textSm",
          as: "a",
          color: isActive ? "accent" : "muted",
          bold: isActive,
          className: [
            "block px-6 py-1.5 transition-colors",
            isActive ? "border-l-2 border-primary" : "border-l-2 border-transparent hover:text-on-surface"
          ].join(" "),
          ...{
            href: item.href,
            onClick: (e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(item.id, item.href);
              }
            }
          },
          children: item.label
        }
      ) }, item.id);
    }) })
  ] }, section.title)) }) });
};
var SortIndicator = ({ direction }) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ml-1 inline-flex w-4 items-center text-on-surface-muted", children: [
  direction === "asc" && /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-sort-up", size: "sm" }),
  direction === "desc" && /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-sort-down", size: "sm" }),
  !direction && /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-sort", size: "sm" })
] });
var DataTable = ({ columns, rows, sortable = false, onSort }) => {
  const [sortKey, setSortKey] = react.useState(null);
  const [sortDir, setSortDir] = react.useState("asc");
  const handleSort = (key) => {
    if (!sortable) return;
    const nextDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(nextDir);
    onSort == null ? void 0 : onSort(key, nextDir);
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-full overflow-x-auto rounded-md border border-border", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full min-w-[600px] border-collapse text-sm", children: [
    /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsx("tr", { className: "border-b border-border bg-surface", children: columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx(
      "th",
      {
        style: col.width ? { width: col.width } : void 0,
        className: [
          "px-4 py-3 text-left font-medium text-on-surface-muted",
          sortable ? "cursor-pointer select-none hover:text-on-surface" : ""
        ].join(" "),
        onClick: () => handleSort(col.key),
        children: /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "textSm", as: "span", color: "inherit", bold: true, className: "inline-flex items-center", children: [
          col.label,
          sortable && /* @__PURE__ */ jsxRuntime.jsx(SortIndicator, { direction: sortKey === col.key ? sortDir : void 0 })
        ] })
      },
      col.key
    )) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("tbody", { children: [
      rows.map((row, idx) => /* @__PURE__ */ jsxRuntime.jsx(
        "tr",
        {
          className: [
            "border-b border-border transition-colors last:border-b-0",
            idx % 2 === 1 ? "bg-surface-alt" : "bg-surface"
          ].join(" "),
          children: columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx("td", { className: "px-4 py-3 text-on-surface", children: row[col.key] }, col.key))
        },
        idx
      )),
      rows.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: columns.length, className: "px-4 py-8 text-center text-on-surface-muted", children: "No data" }) })
    ] })
  ] }) });
};
var sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl"
};
var Modal = ({ isOpen, onClose, title, size = "md", children, footer }) => {
  const overlayRef = react.useRef(null);
  const handleKeyDown = react.useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  react.useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };
  if (!isOpen) return null;
  const modal = /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: overlayRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
      onClick: handleBackdropClick,
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150",
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: [
            "w-full rounded-lg bg-surface shadow-lg animate-in zoom-in-95 duration-150",
            sizeStyles[size]
          ].join(" "),
          children: [
            title && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-4", children: [
              /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "h6", as: "h2", color: "inherit", className: "text-on-surface", children: title }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": "Close",
                  className: "inline-flex items-center justify-center rounded-md p-1 text-on-surface-muted transition-colors hover:bg-surface-alt hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  children: /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-xmark", size: "lg", label: "Close" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-6 py-4 text-on-surface", children }),
            footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-end gap-2 border-t border-border px-6 py-4", children: footer })
          ]
        }
      )
    }
  );
  if (typeof document !== "undefined") {
    return reactDom.createPortal(modal, document.body);
  }
  return modal;
};
var EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
var SHADOW = "0px -2px 4px 0px rgba(0,0,0,0.04), 0px -8px 8px 0px rgba(0,0,0,0.03), 0px -17px 10px 0px rgba(0,0,0,0.02), 0px -31px 12px 0px rgba(0,0,0,0.01), 0px -48px 13px 0px rgba(0,0,0,0)";
function Drawer({
  open,
  onClose,
  type = "info",
  title,
  notch = false,
  footer,
  children,
  className = ""
}) {
  const panelRef = react.useRef(null);
  react.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onClose]);
  const isInfo = type === "info";
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: [
          "fixed inset-0 z-50 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        ].join(" "),
        style: {
          backgroundColor: "rgba(25, 25, 25, 0.25)",
          transitionDuration: open ? "480ms" : "240ms",
          transitionTimingFunction: EASING
        },
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    isInfo && /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref: panelRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        className: [
          "fixed z-50 top-0 right-0 h-full flex flex-col",
          "bg-[var(--surface-adjacent)] overflow-y-auto",
          "w-[300px] max-w-[300px]",
          "md:w-[480px] md:max-w-[480px]",
          "p-[20px] md:p-[24px]",
          className
        ].join(" "),
        style: {
          transform: open ? "translateX(0)" : "translateX(100%)",
          transitionProperty: "transform",
          transitionDuration: open ? "480ms" : "480ms",
          transitionTimingFunction: EASING,
          boxShadow: SHADOW
        },
        children: [
          title && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--l)] shrink-0 mb-[var(--xl)]", children: [
            /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "h6", as: "h2", className: "flex-1 max-md:!text-[18px]", children: title }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close drawer",
                className: "flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer shrink-0",
                children: /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-xmark", size: "md", weight: "regular" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children }),
          footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0 mt-[var(--xl)] pt-[var(--xl)] border-t border-[var(--primary-200)]", children: footer })
        ]
      }
    ),
    !isInfo && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: [
            "fixed z-50 bottom-0 left-0 right-0 flex flex-col items-center",
            "bg-[var(--surface-adjacent)] overflow-y-auto",
            "max-h-[600px] w-full max-w-[600px] mx-auto",
            notch ? "pt-[var(--xs)] pb-[var(--xl)] px-[20px]" : "p-[20px]",
            "md:hidden",
            className
          ].join(" "),
          style: {
            transform: open ? "translateY(0)" : "translateY(100%)",
            transitionProperty: "transform",
            transitionDuration: open ? "480ms" : "240ms",
            transitionTimingFunction: EASING,
            boxShadow: SHADOW,
            borderRadius: "var(--s) var(--s) 0 0"
          },
          children: [
            notch && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[30px] h-[3px] rounded-[10px] bg-[var(--surface-adjacent-2)] shrink-0 mb-[var(--xs)]" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 w-full", children }),
            footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0 w-full mt-[var(--xl)] pt-[var(--xl)] border-t border-[var(--primary-200)]", children: footer })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: [
            "fixed z-50 top-0 right-0 h-full flex-col",
            "bg-[var(--surface-adjacent)] overflow-y-auto",
            "w-[480px] p-[24px]",
            "hidden md:flex",
            className
          ].join(" "),
          style: {
            transform: open ? "translateX(0)" : "translateX(100%)",
            transitionProperty: "transform",
            transitionDuration: "600ms",
            transitionTimingFunction: EASING,
            boxShadow: SHADOW
          },
          children: [
            title && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--l)] shrink-0 mb-[var(--xl)]", children: [
              /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "h5", as: "h2", className: "flex-1", children: title }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": "Close drawer",
                  className: "flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer shrink-0",
                  children: /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-xmark", size: "md", weight: "regular" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children }),
            footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0 mt-[var(--xl)] pt-[var(--xl)] border-t border-[var(--primary-200)]", children: footer })
          ]
        }
      )
    ] })
  ] });
}
Drawer.displayName = "Drawer";
var ELEVATION_L2 = [
  "0px 2px 4px 0px rgba(0,0,0,0.05)",
  "0px 7px 7px 0px rgba(0,0,0,0.04)",
  "0px 15px 9px 0px rgba(0,0,0,0.03)",
  "0px 27px 11px 0px rgba(0,0,0,0.01)",
  "0px 42px 12px 0px rgba(0,0,0,0)"
].join(", ");
var ELEVATION_L1 = [
  "0px 1px 2px 0px rgba(0,0,0,0.06)",
  "0px 1px 3px 0px rgba(0,0,0,0.10)"
].join(", ");
function CardWrapper({
  children,
  onClick,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "listitem",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter") onClick == null ? void 0 : onClick();
      },
      onClick,
      className: [
        "rounded-[var(--s)] bg-[var(--surface-adjacent)]",
        "px-[var(--m)] py-[var(--s)]",
        "transition-all duration-150",
        onClick ? "cursor-pointer" : "",
        className
      ].filter(Boolean).join(" "),
      style: { boxShadow: ELEVATION_L2 },
      onMouseDown: (e) => {
        e.currentTarget.style.boxShadow = ELEVATION_L1;
        e.currentTarget.style.transform = "translateY(1px)";
      },
      onMouseUp: (e) => {
        e.currentTarget.style.boxShadow = ELEVATION_L2;
        e.currentTarget.style.transform = "";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.boxShadow = ELEVATION_L2;
        e.currentTarget.style.transform = "";
      },
      children
    }
  );
}
function CompanyLogo({
  name,
  logo
}) {
  if (logo) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: logo,
        alt: name,
        className: "h-[32px] w-auto object-contain shrink-0"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", className: "shrink-0 !font-semibold", children: name });
}
function OfferCheckbox({
  checked,
  onChange,
  label
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      role: "checkbox",
      "aria-checked": checked,
      "aria-label": label,
      onClick: (e) => {
        e.stopPropagation();
        onChange(!checked);
      },
      className: "relative shrink-0 w-[24px] h-[24px] rounded-[var(--xs)] border border-[var(--primary-800)] bg-[var(--constant-white)] cursor-pointer flex items-center justify-center",
      children: checked && /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-check", size: "xs", className: "text-[var(--primary-900)]" })
    }
  );
}
function BestPricePill() {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-[var(--s)] px-[var(--l)] py-[var(--s)] rounded-[var(--xxl)] shrink-0 whitespace-nowrap",
      style: { backgroundColor: "var(--success-700, #009147)" },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-star", size: "xs", className: "text-[var(--surface-adjacent)]" }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textSm", as: "span", color: "white", className: "!font-medium", children: "\u041D\u0430\u0439-\u0434\u043E\u0431\u0440\u0430 \u0446\u0435\u043D\u0430" })
      ]
    }
  );
}
function InsuranceOfferRow({
  offer,
  onSelect
}) {
  const showInstallments = offer.showInstallments !== false;
  return /* @__PURE__ */ jsxRuntime.jsx(CardWrapper, { onClick: () => onSelect == null ? void 0 : onSelect(offer.id), children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 items-center gap-[var(--4xl)] min-w-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx(CompanyLogo, { name: offer.companyName, logo: offer.companyLogo }),
      offer.recommended && /* @__PURE__ */ jsxRuntime.jsx(BestPricePill, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--4xl)] shrink-0", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--4xl)]", children: [
        showInstallments && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-start gap-0", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "secondary", className: "whitespace-nowrap", children: offer.installmentLabel ?? "\u041F\u044A\u0440\u0432\u0430 \u0432\u043D\u043E\u0441\u043A\u0430" }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "h-[23px] flex items-center", children: [
            /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textLg", as: "span", bold: true, children: offer.installmentPrice.amount.toFixed(2).replace(".", ",") }),
            /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "textLg", as: "span", color: "subtle", children: [
              " ",
              "\u043B\u0432"
            ] })
          ] }),
          offer.installmentPrice.euroEquivalent != null && /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "subtle", className: "whitespace-nowrap", children: [
            offer.installmentPrice.euroEquivalent.toFixed(2).replace(".", ","),
            " euro"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-start gap-0 w-[70px]", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "secondary", className: "whitespace-nowrap", children: offer.totalLabel ?? "\u041E\u0431\u0449\u043E" }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "h-[23px] flex items-center", children: [
            /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", bold: true, children: offer.totalPrice.amount.toFixed(2).replace(".", ",") }),
            /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", color: "subtle", children: [
              " ",
              "\u043B\u0432"
            ] })
          ] }),
          offer.totalPrice.euroEquivalent != null && /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "subtle", className: "whitespace-nowrap", children: [
            offer.totalPrice.euroEquivalent.toFixed(2).replace(".", ","),
            " euro"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            onSelect == null ? void 0 : onSelect(offer.id);
          },
          "aria-label": `Select ${offer.companyName}`,
          className: "flex items-center justify-center w-[24px] h-[24px] p-[10px] shrink-0 cursor-pointer rounded-[100px]",
          children: /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-chevron-right", size: "xs", weight: "regular" })
        }
      )
    ] })
  ] }) });
}
function QuickLoanOfferRow({
  offer,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardWrapper, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-1 items-center min-w-0", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--l)] shrink-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        OfferCheckbox,
        {
          checked: offer.selected ?? false,
          onChange: (checked) => onToggle == null ? void 0 : onToggle(offer.id, checked),
          label: `Select ${offer.companyName}`
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(CompanyLogo, { name: offer.companyName, logo: offer.companyLogo })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textM", as: "span", className: "shrink-0 whitespace-nowrap", children: offer.duration })
  ] }) });
}
function FineOfferRow({
  offer,
  onSelect
}) {
  const [expanded, setExpanded] = react.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx(CardWrapper, { className: "p-[var(--m)]", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-[var(--l)]", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-[16px] items-start w-full", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 flex-col gap-[var(--xs)] min-w-0", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "h6", children: offer.title }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--xs)]", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: "fa-calendar-lines-pen", size: "xs", weight: "regular", className: "text-[var(--primary-600)]" }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textSm", as: "span", className: "text-[var(--primary-600)]", children: offer.date })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-end shrink-0 w-[70px]", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", bold: true, children: offer.price.amount.toFixed(2).replace(".", ",") }),
          /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", color: "subtle", children: [
            " ",
            offer.price.currency ?? "\u20AC"
          ] })
        ] }),
        offer.price.euroEquivalent != null && /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "subtle", className: "whitespace-nowrap", children: [
          offer.price.euroEquivalent.toFixed(2).replace(".", ","),
          " \u043B\u0432."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-[var(--s)] px-[var(--s)] py-[var(--xs)] rounded-[var(--xxl)] bg-[var(--primary-200)]", children: [
        offer.statusIcon && /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: offer.statusIcon, size: "xs", weight: "regular" }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textSm", as: "span", className: "whitespace-nowrap", children: offer.status })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setExpanded(!expanded);
            onSelect == null ? void 0 : onSelect(offer.id);
          },
          className: "inline-flex items-center gap-[var(--m)] cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textSm", as: "span", className: "whitespace-nowrap !font-medium", children: "\u0412\u0438\u0436\u0442\u0435 \u043F\u043E\u0432\u0435\u0447\u0435" }),
            /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Icon, { name: expanded ? "fa-chevron-up" : "fa-chevron-down", size: "md", weight: "regular", className: "text-[var(--accent-600)]" })
          ]
        }
      )
    ] })
  ] }) });
}
function CarLeasingOfferRow({
  offer,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardWrapper, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--s)] shrink-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        OfferCheckbox,
        {
          checked: offer.selected ?? false,
          onChange: (checked) => onToggle == null ? void 0 : onToggle(offer.id, checked),
          label: `Select ${offer.companyName}`
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(CompanyLogo, { name: offer.companyName, logo: offer.companyLogo })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-[var(--m)] shrink-0", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-start gap-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "secondary", className: "whitespace-nowrap", children: offer.installmentLabel ?? "\u0412\u043D\u043E\u0441\u043A\u0430" }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "h-[23px] flex items-center w-[70px]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", bold: true, children: offer.installmentPrice.amount.toFixed(2).replace(".", ",") }),
        /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "text", as: "span", color: "subtle", children: [
          " ",
          "\u043B\u0432"
        ] })
      ] }),
      offer.installmentPrice.euroEquivalent != null && /* @__PURE__ */ jsxRuntime.jsxs(chunkDHJCEE3D_js.Typography, { variant: "caption", as: "span", color: "subtle", className: "whitespace-nowrap", children: [
        offer.installmentPrice.euroEquivalent.toFixed(2).replace(".", ","),
        " euro"
      ] })
    ] }) })
  ] }) });
}
function SkeletonRow() {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "rounded-[var(--s)] bg-[var(--surface-adjacent)] px-[var(--m)] py-[var(--s)] animate-pulse",
      style: { boxShadow: ELEVATION_L2 },
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[84px] h-[32px] rounded-[var(--xs)] bg-[var(--primary-200)]" }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[var(--4xl)]", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[70px] h-[40px] rounded-[var(--xs)] bg-[var(--primary-200)]" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[70px] h-[40px] rounded-[var(--xs)] bg-[var(--primary-200)]" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[24px] h-[24px] rounded-full bg-[var(--primary-200)]" })
        ] })
      ] })
    }
  );
}
function OfferItem({
  offer,
  onSelect,
  onToggle
}) {
  switch (offer.type) {
    case "mtpl":
    case "casco":
    case "travel":
      return /* @__PURE__ */ jsxRuntime.jsx(InsuranceOfferRow, { offer, onSelect });
    case "quickLoans":
      return /* @__PURE__ */ jsxRuntime.jsx(QuickLoanOfferRow, { offer, onToggle });
    case "fines":
      return /* @__PURE__ */ jsxRuntime.jsx(FineOfferRow, { offer, onSelect });
    case "carLeasing":
      return /* @__PURE__ */ jsxRuntime.jsx(CarLeasingOfferRow, { offer, onToggle });
    default:
      return null;
  }
}
function OffersList({
  offers,
  loading = false,
  onSelect,
  onToggle,
  className = ""
}) {
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: `space-y-[var(--s)] ${className}`,
        role: "list",
        "aria-busy": "true",
        children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(SkeletonRow, {}, i))
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: `space-y-[var(--s)] ${className}`, role: "list", children: offers.map((offer) => /* @__PURE__ */ jsxRuntime.jsx(
    OfferItem,
    {
      offer,
      onSelect,
      onToggle
    },
    offer.id
  )) });
}
OffersList.displayName = "OffersList";

exports.DataTable = DataTable;
exports.Drawer = Drawer;
exports.Modal = Modal;
exports.Navbar = Navbar;
exports.OffersList = OffersList;
exports.Sidebar = Sidebar;
