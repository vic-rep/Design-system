'use strict';

var chunkDHJCEE3D_js = require('./chunk-DHJCEE3D.js');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

function AccordionPanel({
  item,
  isOpen,
  onToggle
}) {
  const contentRef = react.useRef(null);
  const [maxHeight, setMaxHeight] = react.useState("0px");
  react.useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);
  const triggerId = `accordion-trigger-${item.id}`;
  const panelId = `accordion-panel-${item.id}`;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col pb-[var(--4xl)]", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "w-full h-[2px] transition-colors duration-200",
        style: {
          backgroundColor: isOpen ? "var(--accent-600)" : "var(--primary-200)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
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
          /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textLg", as: "span", className: "flex-1 !font-medium", children: item.title }),
          /* @__PURE__ */ jsxRuntime.jsx(
            chunkDHJCEE3D_js.Icon,
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
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        id: panelId,
        role: "region",
        "aria-labelledby": triggerId,
        ref: contentRef,
        className: "overflow-hidden transition-[max-height] duration-200 ease-in-out",
        style: { maxHeight },
        children: /* @__PURE__ */ jsxRuntime.jsx(chunkDHJCEE3D_js.Typography, { variant: "textSm", as: "div", className: "px-[var(--l)] pt-[var(--l)]", children: item.content })
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
  const [openIds, setOpenIds] = react.useState(new Set(defaultOpenIds));
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: `flex flex-col ${className}`, children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
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

exports.Accordion = Accordion;
