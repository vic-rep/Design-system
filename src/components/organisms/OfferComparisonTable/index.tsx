"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/molecules/Button";
import { PriceOption } from "@/components/molecules/PriceOption";
import { Drawer } from "@/components/organisms/Drawer";

/**
 * OfferComparisonTable — Organism
 * Figma: Page → Node 3173:49106 (Card device=Desktop, 768×530)
 *
 * Compares N companies across M service-tier columns. Each cell is a
 * PriceOption molecule; selection is single-pick across the whole grid
 * (one of N×M cells active at any time). Continue button is disabled
 * until a selection exists.
 *
 * Layout: header row → divider → grid → CTA.
 * Grid columns: company-name 1fr + M × 146px, 20px gaps.
 * Below the table width the wrapper allows horizontal scroll with a
 * custom scrollbar and dynamic left/right edge-fade overlays.
 *
 * Logo column uses a neutral gray placeholder box with the company name
 * — real logos are not part of this organism.
 *
 * When `trustiBenefit` is supplied on a row, a pulsating Trusti
 * pictogram appears after the company name. Hovering (desktop) or
 * tapping (mobile) the pictogram shows a portal tooltip with the
 * benefit text.
 */

export interface OfferComparisonColumn {
  id: string;
  label: string;
  /** Optional info content shown in a side drawer when the (i) icon is clicked */
  info?: React.ReactNode;
  /** Optional drawer title. Falls back to `label` when omitted */
  infoTitle?: string;
}

export interface OfferComparisonPrice {
  euro: string;
  bgn: string;
  instalments?: boolean;
  multiplier?: string;
}

export interface OfferComparisonRow {
  id: string;
  companyName: string;
  prices: Record<string, OfferComparisonPrice | undefined>;
  /**
   * When provided, a pulsating Trusti pictogram is rendered after the
   * company logo. The string is shown as a tooltip on hover / tap.
   */
  trustiBenefit?: string;
}

export interface OfferComparisonSelection {
  rowId: string;
  columnId: string;
}

export interface OfferComparisonTableProps {
  columns: OfferComparisonColumn[];
  rows: OfferComparisonRow[];
  selected?: OfferComparisonSelection | null;
  defaultSelected?: OfferComparisonSelection | null;
  onSelect?: (selection: OfferComparisonSelection) => void;
  onContinue?: (selection: OfferComparisonSelection) => void;
  continueLabel?: string;
  className?: string;
}

const PRICE_COLUMN_WIDTH = 146;
const LOGO_COLUMN_MIN = 188;
const GRID_GAP_X = 20;
const GRID_GAP_Y = 8;

/* ── Trusti SVG pictogram (inline) ── */
function TrustiSVG() {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16.061 26.6014C15.1392 27.4971 13.889 28.0002 12.5855 28.0002C11.282 28.0002 10.0318 27.4971 9.10999 26.6014L1.43846 19.1474C0.517427 18.2523 0 17.0384 0 15.7726C0 14.5069 0.517427 13.2929 1.43846 12.3979C2.35949 11.5028 3.60868 11 4.91122 11C6.21375 11 7.46294 11.5028 8.38397 12.3979L10.9194 14.8564L10.8808 14.8939C9.99764 15.7502 9.48292 16.901 9.44119 18.1127C9.39947 19.3244 9.83383 20.5061 10.6561 21.4179C11.4785 22.3296 12.627 22.903 13.8686 23.0217C15.1102 23.1404 16.3518 22.7954 17.3411 22.0568C17.5521 22.8571 17.545 23.697 17.3206 24.4939C17.0961 25.2907 16.662 26.0171 16.061 26.6014Z"
        fill="#FFA500"
      />
      <path
        d="M17.348 22.0579C16.3586 22.7964 15.1171 23.1414 13.8755 23.0227C12.6339 22.904 11.4853 22.3306 10.663 21.4189C9.8407 20.5071 9.40634 19.3254 9.44806 18.1137C9.48979 16.902 10.0045 15.7512 10.8877 14.8949L10.9263 14.8574L16.067 19.853C16.6921 20.4613 17.135 21.2235 17.348 22.0579Z"
        fill="#FC7D21"
      />
      <path
        d="M26.9404 10.816C26.9409 11.4429 26.814 12.0637 26.5671 12.6428C26.3201 13.2219 25.9579 13.748 25.5013 14.1907L17.8307 21.6448C17.6795 21.7938 17.5173 21.932 17.3455 22.0583C17.1323 21.2242 16.6895 20.4623 16.0645 19.8543L10.9229 14.8587L18.5558 7.44216C19.2428 6.77492 20.118 6.32056 21.0707 6.13653C22.0234 5.9525 23.0109 6.04708 23.9083 6.40824C24.8057 6.76941 25.5728 7.38097 26.1127 8.16567C26.6525 8.95038 26.9409 9.87297 26.9413 10.8169L26.9404 10.816Z"
        fill="#FFA500"
      />
      <path
        d="M10.8645 11.3266L7.62884 7.84389C7.20313 7.38688 6.87423 6.85283 6.66096 6.27227C6.4477 5.69171 6.35424 5.076 6.3859 4.46033C6.41756 3.84466 6.57373 3.2411 6.8455 2.6841C7.11726 2.12709 7.49928 1.62757 7.96974 1.21407C8.27138 0.946727 8.60748 0.718577 8.96959 0.535369C9.32927 0.381502 9.69742 0.247057 10.0724 0.132625C10.2267 0.0960112 10.3811 0.0718839 10.5318 0.0495583C10.9928 -0.0165194 11.4613 -0.0165194 11.9222 0.0495583C12.0753 0.0700457 12.227 0.0998502 12.3762 0.138839C13.3104 0.361266 14.1544 0.851287 14.7986 1.54536C15.6565 2.46993 16.1014 3.6878 16.0354 4.9311C15.9694 6.17439 15.3979 7.34131 14.4466 8.17517L10.8645 11.3266Z"
        fill="#191919"
      />
    </svg>
  );
}

/* ── Trusti Pill — pulsating pictogram with portal tooltip ── */
function TrustiPill({ benefit }: { benefit: string }) {
  const [visible, setVisible] = useState(false);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const capture = useCallback(() => {
    if (btnRef.current) setBtnRect(btnRef.current.getBoundingClientRect());
  }, []);

  /* Close on outside mousedown / touchstart when tapped open */
  useEffect(() => {
    if (!visible) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", close, true);
    document.addEventListener("touchstart", close, true);
    return () => {
      document.removeEventListener("mousedown", close, true);
      document.removeEventListener("touchstart", close, true);
    };
  }, [visible]);

  /* Portal tooltip — position: fixed escapes any ancestor overflow clipping */
  const tooltipPortal =
    visible && btnRect
      ? ReactDOM.createPortal(
          <div
            role="tooltip"
            className="pointer-events-none"
            style={{
              position: "fixed",
              top: btnRect.top - 6,
              left: btnRect.left + btnRect.width / 2,
              transform: "translate(-50%, -100%)",
              zIndex: 9999,
              background: "var(--primary-900)",
              color: "var(--surface-adjacent)",
              borderRadius: "var(--xs)",
              padding: "6px 10px",
              fontSize: 12,
              lineHeight: 1.4,
              fontWeight: 400,
              minWidth: 200,
              maxWidth: 280,
              whiteSpace: "normal",
              boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            }}
          >
            {benefit}
            {/* Down-pointing arrow */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: 6,
                borderColor:
                  "var(--primary-900) transparent transparent transparent",
              }}
            />
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative inline-flex shrink-0">
      <button
        ref={btnRef}
        type="button"
        aria-label="Предимство с Trusti"
        aria-expanded={visible}
        className="relative w-[28px] h-[28px] flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
        onMouseEnter={() => {
          capture();
          setVisible(true);
        }}
        onMouseLeave={() => setVisible(false)}
        onClick={(e) => {
          e.stopPropagation();
          capture();
          setVisible((v) => !v);
        }}
        onFocus={() => {
          capture();
          setVisible(true);
        }}
        onBlur={() => setVisible(false)}
      >
        {/* Pulsating ring */}
        <span aria-hidden className="trusti-ring absolute inset-0 rounded-full" />
        <TrustiSVG />
      </button>
      {tooltipPortal}
    </div>
  );
}

/* ── Logo placeholder ── */
function LogoPlaceholder({ companyName }: { companyName: string }) {
  return (
    <div className="flex items-center gap-[var(--s)] min-w-0">
      <div
        aria-hidden
        className="shrink-0 w-[40px] h-[24px] rounded-[var(--xs)] bg-[var(--primary-100)] border border-[var(--primary-200)]"
      />
      <Typography
        variant="textM"
        as="span"
        className="!font-semibold text-[var(--primary-900)] truncate"
      >
        {companyName}
      </Typography>
    </div>
  );
}

export function OfferComparisonTable({
  columns,
  rows,
  selected: controlledSelected,
  defaultSelected = null,
  onSelect,
  onContinue,
  continueLabel = "Продължи",
  className = "",
}: OfferComparisonTableProps) {
  const isControlled = controlledSelected !== undefined;
  const [uncontrolled, setUncontrolled] = useState<OfferComparisonSelection | null>(
    defaultSelected,
  );
  const selection = isControlled ? controlledSelected : uncontrolled;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [infoColumnId, setInfoColumnId] = useState<string | null>(null);
  const activeInfoColumn = columns.find((c) => c.id === infoColumnId) ?? null;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [columns.length, rows.length]);

  const handleCellClick = (rowId: string, columnId: string) => {
    const next: OfferComparisonSelection = { rowId, columnId };
    if (!isControlled) setUncontrolled(next);
    onSelect?.(next);
  };

  const handleContinue = () => {
    if (selection) onContinue?.(selection);
  };

  const gridTemplate = `minmax(${LOGO_COLUMN_MIN}px, 1fr) ${columns
    .map(() => `${PRICE_COLUMN_WIDTH}px`)
    .join(" ")}`;

  const minInnerWidth =
    LOGO_COLUMN_MIN +
    columns.length * PRICE_COLUMN_WIDTH +
    columns.length * GRID_GAP_X;

  return (
    <div
      className={[
        "bg-[var(--surface-adjacent)] rounded-[var(--m)]",
        "p-[var(--xl)]",
        "w-full max-w-[768px] mx-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto offer-comparison-scroll"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--primary-300) transparent",
          }}
        >
          <style>{`
            .offer-comparison-scroll::-webkit-scrollbar {
              height: 8px;
            }
            .offer-comparison-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .offer-comparison-scroll::-webkit-scrollbar-thumb {
              background: var(--primary-300);
              border-radius: var(--radius-full);
            }
            .offer-comparison-scroll::-webkit-scrollbar-thumb:hover {
              background: var(--primary-400);
            }
            @keyframes trusti-ring-pulse {
              0%   { transform: scale(1);    opacity: 0.55; }
              70%  { transform: scale(2.2);  opacity: 0;    }
              100% { transform: scale(2.2);  opacity: 0;    }
            }
            .trusti-ring {
              background: rgba(255, 165, 0, 0.38);
              animation: trusti-ring-pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `}</style>
          <div
            className="flex flex-col items-stretch pb-[var(--s)]"
            style={{ minWidth: `${minInnerWidth}px` }}
          >
          {/* Header row */}
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: gridTemplate,
              columnGap: `${GRID_GAP_X}px`,
            }}
          >
            <Typography
              variant="textSm"
              as="span"
              className="text-[var(--primary-900)]"
            >
              Компания
            </Typography>
            {columns.map((col) => (
              <div
                key={col.id}
                className="flex items-center justify-center gap-[var(--xs)]"
              >
                <Typography
                  variant="textSm"
                  as="span"
                  className="text-[var(--primary-900)]"
                >
                  {col.label}
                </Typography>
                {col.info && (
                  <Button
                    variant="icon"
                    size="s"
                    leadingIcon="fa-circle-info"
                    aria-label={`Информация за ${col.label}`}
                    onClick={() => setInfoColumnId(col.id)}
                    className="!text-[var(--primary-300)]"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            aria-hidden
            className="w-full h-px bg-[var(--primary-200)] mt-[var(--l)] mb-[var(--l)]"
          />

          {/* Body grid */}
          <div
            role="radiogroup"
            aria-label="Изберете оферта"
            className="grid items-center"
            style={{
              gridTemplateColumns: gridTemplate,
              columnGap: `${GRID_GAP_X}px`,
              rowGap: `${GRID_GAP_Y}px`,
            }}
          >
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <div className="flex items-center gap-[var(--xs)] h-[48px] min-w-0">
                  <LogoPlaceholder companyName={row.companyName} />
                  {row.trustiBenefit && (
                    <TrustiPill benefit={row.trustiBenefit} />
                  )}
                </div>
                {columns.map((col) => {
                  const price = row.prices[col.id];
                  if (!price) {
                    return (
                      <div
                        key={col.id}
                        aria-hidden
                        className="h-[48px]"
                      />
                    );
                  }
                  const isSelected =
                    selection?.rowId === row.id &&
                    selection?.columnId === col.id;
                  return (
                    <PriceOption
                      key={col.id}
                      euro={price.euro}
                      bgn={price.bgn}
                      instalments={price.instalments}
                      multiplier={price.multiplier}
                      selected={isSelected}
                      onClick={() => handleCellClick(row.id, col.id)}
                      ariaLabel={`${row.companyName} — ${col.label}: ${price.euro} евро`}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          </div>
        </div>

        {/* Scroll-affordance fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-full w-[var(--xxl)] transition-opacity duration-150"
          style={{
            opacity: canScrollLeft ? 1 : 0,
            background: "linear-gradient(to right, var(--surface-adjacent), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-full w-[var(--3xl)] flex items-center justify-end pr-[var(--xs)] transition-opacity duration-150"
          style={{
            opacity: canScrollRight ? 1 : 0,
            background: "linear-gradient(to left, var(--surface-adjacent), transparent)",
          }}
        >
          <Icon
            name="fa-chevron-right"
            size="sm"
            weight="regular"
            className="text-[var(--primary-500)]"
          />
        </div>
      </div>

      {/* Continue CTA */}
      <div className="flex items-center justify-center mt-[var(--xxl)]">
        <Button
          variant="primary"
          size="xl"
          trailingIcon="fa-chevron-right"
          disabled={!selection}
          onClick={handleContinue}
        >
          {continueLabel}
        </Button>
      </div>

      {/* Info drawer */}
      <Drawer
        open={!!activeInfoColumn}
        onClose={() => setInfoColumnId(null)}
        type="info"
        title={activeInfoColumn?.infoTitle ?? activeInfoColumn?.label}
      >
        {activeInfoColumn?.info}
      </Drawer>
    </div>
  );
}

OfferComparisonTable.displayName = "OfferComparisonTable";
