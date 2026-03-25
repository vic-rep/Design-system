import { Accordion } from './chunk-XQJZ2KP3.mjs';
import { Typography, Icon } from './chunk-VVBQHTUJ.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useEffect } from 'react';

var DashboardLayout = ({ sidebar, navbar, children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-surface", children: [
    navbar,
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      sidebar,
      /* @__PURE__ */ jsx("main", { className: "ml-60 flex-1 px-8 py-8", children })
    ] })
  ] });
};
var AuthLayout = ({ children, title, subtitle }) => {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-surface px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-xl border border-border bg-surface p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h5", as: "h1", className: "text-on-surface", children: title }),
      subtitle && /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "p", className: "mt-2 text-on-surface-muted", children: subtitle })
    ] }),
    children
  ] }) });
};
function Carousel({
  slides,
  autoPlay = false,
  autoPlayInterval = 5e3,
  className = ""
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef();
  const total = slides.length;
  const goTo = useCallback(
    (index) => {
      setActiveIndex((index % total + total) % total);
    },
    [total]
  );
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  useEffect(() => {
    if (autoPlay && !isHovered && total > 1) {
      timerRef.current = setInterval(next, autoPlayInterval);
      return () => clearInterval(timerRef.current);
    }
  }, [autoPlay, autoPlayInterval, isHovered, next, total]);
  if (total === 0) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-roledescription": "carousel",
      className: `relative overflow-hidden rounded-[var(--s)] ${className}`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex transition-transform duration-300 ease-in-out",
            style: { transform: `translateX(-${activeIndex * 100}%)` },
            children: slides.map((slide, i) => /* @__PURE__ */ jsx(
              "div",
              {
                role: "group",
                "aria-roledescription": "slide",
                "aria-label": `Slide ${i + 1} of ${total}`,
                className: "w-full shrink-0",
                children: slide.content
              },
              slide.id
            ))
          }
        ),
        total > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: prev,
              "aria-label": "Previous slide",
              className: "absolute left-[var(--m)] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[var(--surface-adjacent)]/90 hover:bg-[var(--surface-adjacent)] transition-all duration-150 cursor-pointer",
              style: { boxShadow: "var(--elevation-level2)" },
              children: /* @__PURE__ */ jsx(Icon, { name: "fa-chevron-left", size: "xs", weight: "solid", className: "text-[var(--primary-900)]" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: next,
              "aria-label": "Next slide",
              className: "absolute right-[var(--m)] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[var(--surface-adjacent)]/90 hover:bg-[var(--surface-adjacent)] transition-all duration-150 cursor-pointer",
              style: { boxShadow: "var(--elevation-level2)" },
              children: /* @__PURE__ */ jsx(Icon, { name: "fa-chevron-right", size: "xs", weight: "solid", className: "text-[var(--primary-900)]" })
            }
          )
        ] }),
        total > 1 && /* @__PURE__ */ jsx(
          "div",
          {
            role: "tablist",
            className: "absolute bottom-[var(--m)] left-1/2 -translate-x-1/2 flex items-center gap-[var(--xs)]",
            children: slides.map((slide, i) => /* @__PURE__ */ jsx(
              "button",
              {
                role: "tab",
                type: "button",
                "aria-selected": i === activeIndex,
                "aria-label": `Go to slide ${i + 1}`,
                onClick: () => goTo(i),
                className: [
                  "h-[8px] rounded-full transition-all duration-150 cursor-pointer",
                  i === activeIndex ? "w-[24px] bg-[var(--accent-600)]" : "w-[8px] bg-[var(--primary-300)] hover:bg-[var(--primary-400)]"
                ].join(" ")
              },
              slide.id
            ))
          }
        )
      ]
    }
  );
}
Carousel.displayName = "Carousel";
function Cart({
  items,
  currency = "\u043B\u0432.",
  onRemove,
  onCheckout,
  checkoutLabel = "Proceed to checkout",
  className = ""
}) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        "rounded-[var(--s)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] overflow-hidden",
        className
      ].join(" "),
      children: [
        /* @__PURE__ */ jsx("div", { className: "px-[var(--xxl)] py-[var(--l)] border-b border-[var(--primary-200)]", children: /* @__PURE__ */ jsx(Typography, { variant: "textLg", as: "h3", bold: true, children: "Order Summary" }) }),
        /* @__PURE__ */ jsx("div", { className: "px-[var(--xxl)] py-[var(--m)]", children: items.length === 0 ? /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "p", color: "muted", className: "py-[var(--l)] text-center", children: "No items selected" }) : /* @__PURE__ */ jsx("ul", { className: "divide-y divide-[var(--primary-200)]", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start justify-between py-[var(--m)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 mr-[var(--m)]", children: [
            /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "p", bold: true, children: item.label }),
            item.description && /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "p", color: "muted", className: "mt-[var(--xxs)]", children: item.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[var(--s)] shrink-0", children: [
            /* @__PURE__ */ jsxs(Typography, { variant: "textM", as: "span", bold: true, children: [
              item.price.toFixed(2),
              " ",
              currency
            ] }),
            item.removable !== false && onRemove && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onRemove(item.id),
                "aria-label": `Remove ${item.label}`,
                className: "w-[24px] h-[24px] flex items-center justify-center rounded-[var(--xs)] text-[var(--primary-400)] hover:text-[var(--destructive-600)] hover:bg-[var(--destructive-100)] transition-colors duration-150 cursor-pointer",
                children: /* @__PURE__ */ jsx(Icon, { name: "fa-xmark", size: "xs", weight: "solid" })
              }
            )
          ] })
        ] }, item.id)) }) }),
        items.length > 0 && /* @__PURE__ */ jsx("div", { className: "px-[var(--xxl)] py-[var(--m)] border-t-2 border-[var(--primary-900)]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "text", as: "span", bold: true, children: "Total" }),
          /* @__PURE__ */ jsxs(Typography, { variant: "h6", as: "span", bold: true, children: [
            total.toFixed(2),
            " ",
            currency
          ] })
        ] }) }),
        onCheckout && items.length > 0 && /* @__PURE__ */ jsx("div", { className: "px-[var(--xxl)] pb-[var(--xxl)]", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onCheckout,
            className: "w-full h-[44px] flex items-center justify-center rounded-[var(--s)] bg-[var(--accent-600)] text-[var(--constant-white)] text-[16px] font-semibold hover:bg-[var(--accent-700)] active:bg-[var(--accent-800)] transition-colors duration-150 cursor-pointer",
            children: checkoutLabel
          }
        ) })
      ]
    }
  );
}
Cart.displayName = "Cart";
function FAQ({
  title = "Frequently Asked Questions",
  items,
  className = ""
}) {
  const accordionItems = items.map((item, i) => ({
    id: `faq-${i}`,
    title: item.question,
    content: item.answer
  }));
  return /* @__PURE__ */ jsxs("div", { className: `max-w-[720px] mx-auto ${className}`, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h3", as: "h3", className: "text-center mb-[var(--xxl)]", children: title }),
    /* @__PURE__ */ jsx(Accordion, { items: accordionItems })
  ] });
}
FAQ.displayName = "FAQ";
function Footer({
  logoText = "Trusti",
  columns,
  socialLinks = [],
  legalText,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: `bg-[var(--primary-900)] text-[var(--primary-400)] ${className}`,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-[var(--xxl)] py-[var(--5xl)]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-[var(--5xl)]", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx(Typography, { variant: "h5", as: "span", color: "accent", children: logoText }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--xxl)]", children: columns.map((col) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "p", bold: true, color: "white", className: "mb-[var(--m)]", children: col.title }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-[var(--s)]", children: col.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              "a",
              {
                href: link.href,
                className: "hover:text-[var(--constant-white)] transition-colors duration-150",
                children: /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "span", color: "inherit", children: link.label })
              }
            ) }, link.label)) })
          ] }, col.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-[var(--5xl)] pt-[var(--xxl)] border-t border-[var(--primary-700)] flex flex-col md:flex-row items-center justify-between gap-[var(--m)]", children: [
          legalText && /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "p", color: "muted", className: "text-center md:text-left", children: legalText }),
          socialLinks.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-[var(--m)]", children: socialLinks.map((social) => /* @__PURE__ */ jsx(
            "a",
            {
              href: social.href,
              "aria-label": social.label,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-[32px] h-[32px] flex items-center justify-center rounded-full text-[var(--primary-400)] hover:text-[var(--constant-white)] hover:bg-[var(--primary-700)] transition-colors duration-150",
              children: /* @__PURE__ */ jsx(Icon, { name: social.icon, size: "md", weight: "solid" })
            },
            social.label
          )) })
        ] })
      ] })
    }
  );
}
Footer.displayName = "Footer";
function Navigation({
  logoText = "Trusti",
  links,
  actions,
  className = ""
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      "aria-label": "Main navigation",
      className: [
        "sticky top-0 z-50 h-[64px] bg-[var(--surface-adjacent)] border-b border-[var(--primary-200)]",
        className
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto h-full px-[var(--xxl)] flex items-center", children: [
          /* @__PURE__ */ jsx("a", { href: "/", className: "shrink-0", children: /* @__PURE__ */ jsx(Typography, { variant: "h6", as: "span", color: "accent", children: logoText }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex flex-1 items-center justify-center gap-[var(--xxl)]", children: links.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              className: [
                "transition-colors duration-150",
                link.active ? "text-[var(--accent-600)]" : "text-[var(--primary-600)] hover:text-[var(--primary-900)]"
              ].join(" "),
              children: /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "span", color: "inherit", bold: link.active, children: link.label })
            },
            link.label
          )) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-[var(--m)] shrink-0", children: actions }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setMenuOpen(!menuOpen),
              "aria-expanded": menuOpen,
              "aria-label": "Toggle menu",
              className: "md:hidden ml-auto w-[36px] h-[36px] flex items-center justify-center rounded-[var(--s)] hover:bg-[var(--primary-100)] transition-colors duration-150 cursor-pointer",
              children: /* @__PURE__ */ jsx(
                Icon,
                {
                  name: menuOpen ? "fa-xmark" : "fa-bars",
                  size: "lg",
                  weight: "solid",
                  className: "text-[var(--primary-900)]"
                }
              )
            }
          )
        ] }),
        menuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden bg-[var(--surface-adjacent)] border-b border-[var(--primary-200)] px-[var(--xxl)] py-[var(--m)]", children: [
          links.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              className: [
                "block py-[var(--s)]",
                link.active ? "text-[var(--accent-600)]" : "text-[var(--primary-600)]"
              ].join(" "),
              children: /* @__PURE__ */ jsx(Typography, { variant: "text", as: "span", color: "inherit", bold: link.active, children: link.label })
            },
            link.label
          )),
          actions && /* @__PURE__ */ jsx("div", { className: "pt-[var(--m)] border-t border-[var(--primary-200)] mt-[var(--s)]", children: actions })
        ] })
      ]
    }
  );
}
Navigation.displayName = "Navigation";
function VehicleDetailsCard({
  vehicle,
  onEdit,
  className = ""
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        "rounded-[var(--s)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] p-[var(--xxl)]",
        className
      ].join(" "),
      style: { boxShadow: "var(--elevation-level1)" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-[var(--l)]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Typography, { variant: "textLg", as: "h4", bold: true, className: "text-[var(--primary-900)] leading-[1.2]", children: [
              vehicle.make,
              " ",
              vehicle.model
            ] }),
            /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "span", className: "text-[var(--primary-500)]", children: vehicle.year })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[var(--s)]", children: [
            vehicle.verified && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-[var(--xxs)] px-[var(--s)] py-[var(--xxs)] rounded-[var(--xs)] bg-[var(--success-100)] text-[var(--success-700)] text-[12px] font-medium", children: [
              /* @__PURE__ */ jsx(Icon, { name: "fa-check", size: "xs", weight: "solid" }),
              "Verified"
            ] }),
            onEdit && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onEdit,
                className: "text-[14px] font-medium text-[var(--accent-600)] hover:text-[var(--accent-700)] transition-colors duration-150 cursor-pointer",
                children: "Edit"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-[var(--m)]", children: [
          vehicle.plate && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "p", className: "text-[var(--primary-500)] mb-[var(--xxs)]", children: "License Plate" }),
            /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "p", bold: true, className: "text-[var(--primary-900)]", children: vehicle.plate })
          ] }),
          vehicle.talonNumber && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "p", className: "text-[var(--primary-500)] mb-[var(--xxs)]", children: "Talon Number" }),
            /* @__PURE__ */ jsx(Typography, { variant: "textM", as: "p", bold: true, className: "text-[var(--primary-900)]", children: vehicle.talonNumber })
          ] })
        ] })
      ]
    }
  );
}
VehicleDetailsCard.displayName = "VehicleDetailsCard";

export { AuthLayout, Carousel, Cart, DashboardLayout, FAQ, Footer, Navigation, VehicleDetailsCard };
