"use client";

import React, { useState } from "react";

/**
 * OffersList — Organism (horizontal row-based offer items)
 * Figma: Page 147:1690 → Section 173:800 → Node 2847:11012
 *
 * Product types:
 *   MTPL / Casco / Travel — Logo + optional best-price pill + installment + total + chevron CTA
 *   QuickLoans            — Checkbox + logo + duration text
 *   Fines                 — Title + date + price(€) + status pill + expand link
 *   CarLeasing            — Checkbox + logo + installment info
 *
 * Shared: Level 2 elevation, surface-adjacent bg, rounded-s, px-m py-s
 */

/* ── Figma Elevation / Level 2 (exact 5-layer) ── */
const ELEVATION_L2 = [
  "0px 2px 4px 0px rgba(0,0,0,0.05)",
  "0px 7px 7px 0px rgba(0,0,0,0.04)",
  "0px 15px 9px 0px rgba(0,0,0,0.03)",
  "0px 27px 11px 0px rgba(0,0,0,0.01)",
  "0px 42px 12px 0px rgba(0,0,0,0)",
].join(", ");

const ELEVATION_L1 = [
  "0px 1px 2px 0px rgba(0,0,0,0.06)",
  "0px 1px 3px 0px rgba(0,0,0,0.10)",
].join(", ");

const fontFeature = {
  fontFeatureSettings: "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
};

/* ── Types ── */

export type OfferProductType =
  | "mtpl"
  | "casco"
  | "travel"
  | "quickLoans"
  | "fines"
  | "carLeasing";

export interface OfferPrice {
  amount: number;
  currency?: string;
  euroEquivalent?: number;
}

/** MTPL / Casco / Travel offer */
export interface InsuranceOffer {
  id: string;
  type: "mtpl" | "casco" | "travel";
  companyName: string;
  companyLogo?: string;
  recommended?: boolean;
  showInstallments?: boolean;
  installmentLabel?: string;
  installmentPrice: OfferPrice;
  totalLabel?: string;
  totalPrice: OfferPrice;
}

/** QuickLoans offer */
export interface QuickLoanOffer {
  id: string;
  type: "quickLoans";
  companyName: string;
  companyLogo?: string;
  duration: string;
  selected?: boolean;
}

/** Fines offer */
export interface FineOffer {
  id: string;
  type: "fines";
  title: string;
  date: string;
  price: OfferPrice;
  status: string;
  statusIcon?: string;
}

/** Car Leasing offer */
export interface CarLeasingOffer {
  id: string;
  type: "carLeasing";
  companyName: string;
  companyLogo?: string;
  installmentLabel?: string;
  installmentPrice: OfferPrice;
  selected?: boolean;
}

export type Offer =
  | InsuranceOffer
  | QuickLoanOffer
  | FineOffer
  | CarLeasingOffer;

export interface OffersListProps {
  offers: Offer[];
  loading?: boolean;
  onSelect?: (offerId: string) => void;
  onToggle?: (offerId: string, selected: boolean) => void;
  className?: string;
}

/* ── Shared card wrapper ── */
function CardWrapper({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.();
      }}
      onClick={onClick}
      className={[
        "rounded-[var(--s)] bg-[var(--surface-adjacent)]",
        "px-[var(--m)] py-[var(--s)]",
        "transition-all duration-150",
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ boxShadow: ELEVATION_L2 }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = ELEVATION_L1;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = ELEVATION_L2;
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = ELEVATION_L2;
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

/* ── Logo display ── */
function CompanyLogo({
  name,
  logo,
}: {
  name: string;
  logo?: string;
}) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="h-[32px] w-auto object-contain shrink-0"
      />
    );
  }
  return (
    <span
      className="text-[16px] font-semibold text-[var(--primary-900)] shrink-0"
      style={fontFeature}
    >
      {name}
    </span>
  );
}

/* ── Checkbox (matches Figma: 24px, rounded-xs, white bg, primary-800 border) ── */
function OfferCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className="relative shrink-0 w-[24px] h-[24px] rounded-[var(--xs)] border border-[var(--primary-800)] bg-[var(--constant-white)] cursor-pointer flex items-center justify-center"
    >
      {checked && (
        <i
          className="fa-solid fa-check text-[12px] text-[var(--primary-900)]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

/* ── Best-price pill (Figma: green-700 bg, white text, rounded-xxl, star icon) ── */
function BestPricePill() {
  return (
    <span
      className="inline-flex items-center gap-[var(--s)] px-[var(--l)] py-[var(--s)] rounded-[var(--xxl)] shrink-0 whitespace-nowrap"
      style={{ backgroundColor: "var(--success-700, #009147)" }}
    >
      <i
        className="fa-solid fa-star text-[12px] text-[var(--surface-adjacent)]"
        aria-hidden="true"
      />
      <span
        className="text-[14px] font-medium leading-[1.2] text-[var(--surface-adjacent)]"
        style={fontFeature}
      >
        Най-добра цена
      </span>
    </span>
  );
}

/* ── Insurance row (MTPL / Casco / Travel) ── */
function InsuranceOfferRow({
  offer,
  onSelect,
}: {
  offer: InsuranceOffer;
  onSelect?: (id: string) => void;
}) {
  const showInstallments = offer.showInstallments !== false;

  return (
    <CardWrapper onClick={() => onSelect?.(offer.id)}>
      <div className="flex items-center justify-between">
        {/* Left: Logo + pill */}
        <div className="flex flex-1 items-center gap-[var(--4xl)] min-w-0">
          <CompanyLogo name={offer.companyName} logo={offer.companyLogo} />
          {offer.recommended && <BestPricePill />}
        </div>

        {/* Right: Prices + chevron */}
        <div className="flex items-center gap-[var(--4xl)] shrink-0">
          <div className="flex items-center gap-[var(--4xl)]">
            {/* Installment price column */}
            {showInstallments && (
              <div className="flex flex-col items-start gap-0">
                <span
                  className="text-[12px] font-normal leading-[1.2] text-[var(--primary-700)] whitespace-nowrap"
                  style={fontFeature}
                >
                  {offer.installmentLabel ?? "Първа вноска"}
                </span>
                <span className="h-[23px] flex items-center" style={fontFeature}>
                  <span className="text-[18px] font-bold leading-[1.2] text-[var(--primary-900)]">
                    {offer.installmentPrice.amount.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-[18px] font-normal leading-[1.2] text-[var(--primary-400)]">
                    {" "}лв
                  </span>
                </span>
                {offer.installmentPrice.euroEquivalent != null && (
                  <span
                    className="text-[12px] font-normal leading-[1.2] text-[var(--primary-400)] whitespace-nowrap"
                    style={fontFeature}
                  >
                    {offer.installmentPrice.euroEquivalent.toFixed(2).replace(".", ",")} euro
                  </span>
                )}
              </div>
            )}

            {/* Total price column */}
            <div className="flex flex-col items-start gap-0 w-[70px]">
              <span
                className="text-[12px] font-normal leading-[1.2] text-[var(--primary-700)] whitespace-nowrap"
                style={fontFeature}
              >
                {offer.totalLabel ?? "Общо"}
              </span>
              <span className="h-[23px] flex items-center" style={fontFeature}>
                <span className="text-[16px] font-bold leading-[1.2] text-[var(--primary-900)]">
                  {offer.totalPrice.amount.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-[16px] font-normal leading-[1.2] text-[var(--primary-400)]">
                  {" "}лв
                </span>
              </span>
              {offer.totalPrice.euroEquivalent != null && (
                <span
                  className="text-[12px] font-normal leading-[1.2] text-[var(--primary-400)] whitespace-nowrap"
                  style={fontFeature}
                >
                  {offer.totalPrice.euroEquivalent.toFixed(2).replace(".", ",")} euro
                </span>
              )}
            </div>
          </div>

          {/* Chevron CTA button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(offer.id);
            }}
            aria-label={`Select ${offer.companyName}`}
            className="flex items-center justify-center w-[24px] h-[24px] p-[10px] shrink-0 cursor-pointer rounded-[100px]"
          >
            <i
              className="fa-regular fa-chevron-right text-[12px] text-[var(--primary-900)]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </CardWrapper>
  );
}

/* ── QuickLoans row ── */
function QuickLoanOfferRow({
  offer,
  onToggle,
}: {
  offer: QuickLoanOffer;
  onToggle?: (id: string, selected: boolean) => void;
}) {
  return (
    <CardWrapper>
      <div className="flex items-center justify-between">
        {/* Left: Checkbox + Logo */}
        <div className="flex flex-1 items-center min-w-0">
          <div className="flex items-center gap-[var(--l)] shrink-0">
            <OfferCheckbox
              checked={offer.selected ?? false}
              onChange={(checked) => onToggle?.(offer.id, checked)}
              label={`Select ${offer.companyName}`}
            />
            <CompanyLogo name={offer.companyName} logo={offer.companyLogo} />
          </div>
        </div>

        {/* Right: Duration */}
        <span
          className="text-[16px] font-medium leading-[1.2] text-[var(--primary-900)] shrink-0 whitespace-nowrap"
          style={fontFeature}
        >
          {offer.duration}
        </span>
      </div>
    </CardWrapper>
  );
}

/* ── Fines row ── */
function FineOfferRow({
  offer,
  onSelect,
}: {
  offer: FineOffer;
  onSelect?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardWrapper className="p-[var(--m)]">
      <div className="flex flex-col gap-[var(--l)]">
        {/* Top section */}
        <div className="flex gap-[16px] items-start w-full">
          {/* Title + date */}
          <div className="flex flex-1 flex-col gap-[var(--xs)] min-w-0">
            <p
              className="text-[20px] font-medium leading-[1.2] text-[var(--primary-900)]"
              style={fontFeature}
            >
              {offer.title}
            </p>
            <div className="flex items-center gap-[var(--xs)]">
              <i
                className="fa-regular fa-calendar-lines-pen text-[12px] text-[var(--primary-600)]"
                aria-hidden="true"
              />
              <span
                className="text-[14px] font-normal leading-[1.2] text-[var(--primary-600)]"
                style={fontFeature}
              >
                {offer.date}
              </span>
            </div>
          </div>

          {/* Price (in €, with лв as secondary) */}
          <div className="flex flex-col items-end shrink-0 w-[70px]">
            <span className="flex items-center" style={fontFeature}>
              <span className="text-[16px] font-bold leading-[1.2] text-[var(--primary-900)]">
                {offer.price.amount.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-[16px] font-normal leading-[1.2] text-[var(--primary-400)]">
                {" "}{offer.price.currency ?? "€"}
              </span>
            </span>
            {offer.price.euroEquivalent != null && (
              <span
                className="text-[12px] font-normal leading-[1.2] text-[var(--primary-400)] whitespace-nowrap"
                style={fontFeature}
              >
                {offer.price.euroEquivalent.toFixed(2).replace(".", ",")} лв.
              </span>
            )}
          </div>
        </div>

        {/* Bottom: Status pill + expand link */}
        <div className="flex items-center justify-between w-full">
          {/* Status pill */}
          <span className="inline-flex items-center gap-[var(--s)] px-[var(--s)] py-[var(--xs)] rounded-[var(--xxl)] bg-[var(--primary-200)]">
            {offer.statusIcon && (
              <i
                className={`fa-regular ${offer.statusIcon} text-[12px] text-[var(--primary-900)]`}
                aria-hidden="true"
              />
            )}
            <span
              className="text-[14px] font-normal leading-[1.2] text-[var(--primary-900)] whitespace-nowrap"
              style={fontFeature}
            >
              {offer.status}
            </span>
          </span>

          {/* Expand link */}
          <button
            type="button"
            onClick={() => {
              setExpanded(!expanded);
              onSelect?.(offer.id);
            }}
            className="inline-flex items-center gap-[var(--m)] cursor-pointer"
          >
            <span
              className="text-[14px] font-medium leading-[1.2] text-[var(--primary-900)] whitespace-nowrap"
              style={fontFeature}
            >
              Вижте повече
            </span>
            <i
              className={`fa-regular ${expanded ? "fa-chevron-up" : "fa-chevron-down"} text-[16px] text-[var(--accent-600)]`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </CardWrapper>
  );
}

/* ── Car Leasing row ── */
function CarLeasingOfferRow({
  offer,
  onToggle,
}: {
  offer: CarLeasingOffer;
  onToggle?: (id: string, selected: boolean) => void;
}) {
  return (
    <CardWrapper>
      <div className="flex items-center justify-between">
        {/* Left: Checkbox + Logo */}
        <div className="flex items-center gap-[var(--s)] shrink-0">
          <OfferCheckbox
            checked={offer.selected ?? false}
            onChange={(checked) => onToggle?.(offer.id, checked)}
            label={`Select ${offer.companyName}`}
          />
          <CompanyLogo name={offer.companyName} logo={offer.companyLogo} />
        </div>

        {/* Right: Installment price */}
        <div className="flex items-center gap-[var(--m)] shrink-0">
          <div className="flex flex-col items-start gap-0">
            <span
              className="text-[10px] font-normal leading-[1.3] text-[var(--primary-700)] whitespace-nowrap"
              style={fontFeature}
            >
              {offer.installmentLabel ?? "Вноска"}
            </span>
            <span className="h-[23px] flex items-center w-[70px]" style={fontFeature}>
              <span className="text-[16px] font-bold leading-[1.2] text-[var(--primary-900)]">
                {offer.installmentPrice.amount.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-[16px] font-normal leading-[1.2] text-[var(--primary-400)]">
                {" "}лв
              </span>
            </span>
            {offer.installmentPrice.euroEquivalent != null && (
              <span
                className="text-[10px] font-normal leading-[1.3] text-[var(--primary-400)] whitespace-nowrap"
                style={fontFeature}
              >
                {offer.installmentPrice.euroEquivalent.toFixed(2).replace(".", ",")} euro
              </span>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}

/* ── Skeleton ── */
function SkeletonRow() {
  return (
    <div
      className="rounded-[var(--s)] bg-[var(--surface-adjacent)] px-[var(--m)] py-[var(--s)] animate-pulse"
      style={{ boxShadow: ELEVATION_L2 }}
    >
      <div className="flex items-center justify-between">
        <div className="w-[84px] h-[32px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="flex-1" />
        <div className="flex items-center gap-[var(--4xl)]">
          <div className="w-[70px] h-[40px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
          <div className="w-[70px] h-[40px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
          <div className="w-[24px] h-[24px] rounded-full bg-[var(--primary-200)]" />
        </div>
      </div>
    </div>
  );
}

/* ── Offer item router ── */
function OfferItem({
  offer,
  onSelect,
  onToggle,
}: {
  offer: Offer;
  onSelect?: (id: string) => void;
  onToggle?: (id: string, selected: boolean) => void;
}) {
  switch (offer.type) {
    case "mtpl":
    case "casco":
    case "travel":
      return <InsuranceOfferRow offer={offer} onSelect={onSelect} />;
    case "quickLoans":
      return <QuickLoanOfferRow offer={offer} onToggle={onToggle} />;
    case "fines":
      return <FineOfferRow offer={offer} onSelect={onSelect} />;
    case "carLeasing":
      return <CarLeasingOfferRow offer={offer} onToggle={onToggle} />;
    default:
      return null;
  }
}

/* ── Main list ── */
export function OffersList({
  offers,
  loading = false,
  onSelect,
  onToggle,
  className = "",
}: OffersListProps) {
  if (loading) {
    return (
      <div
        className={`space-y-[var(--s)] ${className}`}
        role="list"
        aria-busy="true"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-[var(--s)] ${className}`} role="list">
      {offers.map((offer) => (
        <OfferItem
          key={offer.id}
          offer={offer}
          onSelect={onSelect}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

OffersList.displayName = "OffersList";
