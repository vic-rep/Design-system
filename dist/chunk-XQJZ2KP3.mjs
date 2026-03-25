import { Typography, Icon } from './chunk-VVBQHTUJ.mjs';
import { useState, useRef, useEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

function AccordionPanel({
  item,
  isOpen,
  onToggle
}) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);
  const triggerId = `accordion-trigger-${item.id}`;
  const panelId = `accordion-panel-${item.id}`;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col pb-[var(--4xl)]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-full h-[2px] transition-colors duration-200",
        style: {
          backgroundColor: isOpen ? "var(--accent-600)" : "var(--primary-200)"
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id: triggerId,
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        disabled: item.disabled,
        onClick: onToggle,
        className: [
          "w-full flex items-center gap-[var(--l)] px-[var(--l)] pt-[var(--l)]",
          "text-left cursor-pointer",
          item.disabled ? "opacity-50 cursor-not-allowed" : ""
        ].join(" "),
        children: [
          /* @__PURE__ */ jsx(Typography, { variant: "textLg", as: "span", className: "flex-1 !font-medium", children: item.title }),
          /* @__PURE__ */ jsx(
            Icon,
            {
              name: isOpen ? "fa-chevron-up" : "fa-chevron-down",
              size: "xs",
              weight: "regular",
              className: "shrink-0"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: panelId,
        role: "region",
        "aria-labelledby": triggerId,
        ref: contentRef,
        className: "overflow-hidden transition-[max-height] duration-200 ease-in-out",
        style: { maxHeight },
        children: /* @__PURE__ */ jsx(Typography, { variant: "textSm", as: "div", className: "px-[var(--l)] pt-[var(--l)]", children: item.content })
      }
    )
  ] });
}
function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = ""
}) {
  const [openIds, setOpenIds] = useState(new Set(defaultOpenIds));
  const handleToggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };
  return /* @__PURE__ */ jsx("div", { className: `flex flex-col ${className}`, children: items.map((item) => /* @__PURE__ */ jsx(
    AccordionPanel,
    {
      item,
      isOpen: openIds.has(item.id),
      onToggle: () => handleToggle(item.id)
    },
    item.id
  )) });
}
Accordion.displayName = "Accordion";

export { Accordion };
