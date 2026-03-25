"use client";

import React, { useState } from "react";

/**
 * OffersList — Organism (horizontal row-based offer items)
 * Figma: Page 147:1690 → Section 173:800
 *
 * Product types:
 *   MTPL / Casco / Travel — Logo + optional best-price pill + installment + total + chevron CTA
 *   QuickLoans            — Checkbox + logo + duration text
 *   Fines                 — Title + date + price + status pill + expand link
 *   CarLeasing            — Checkbox + logo + installment info
 *
 * Shared: Level 2 elevation, surface-adjacent bg, rounded-s, px-m py-s
 */

/* ── Elevation shadow ── */
const SHADOW_L1 =
  "0px 1px 2px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.10)";
const SHADOW_L2 =
  "0px 4px 6px -1px rgba(0,0,0,0.10), 0px 2px 4px -2px rgba(0,0,0,0.10)";

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
const cardBase = [
  "rounded-[var(--s)] bg-[var(--surface-adjacent)]",
  "px-[var(--m)] py-[var(--s)]",
  "transition-shadow duration-150",
].join(" ");

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
        cardBase,
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
      style={{ boxShadow: SHADOW_L2 }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_L2;
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_L1;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_L2;
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_L2;
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

/* ── Price display helper ── */
function PriceColumn({
  label,
  price,
  bold = false,
}: {
  label: string;
  price: OfferPrice;
  bold?: boolean;
}) {
  const currency = price.currency ?? "лв.";
  return (
    <div className="flex flex-col items-end">
      <span
        className="text-[12px] leading-[1.3] text-[var(--primary-500)]"
        style={{
          fontFeatureSettings:
            "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
        }}
      >
        {label}
      </span>
      <span
        className={[
          "text-[18px] leading-[1.2] text-[var(--primary-900)]",
          bold ? "font-semibold" : "font-normal",
        ].join(" ")}
      >
        {price.amount.toFixed(2)} {currency}
      </span>
      {price.euroEquivalent != null && (
        <span
          className="text-[12px] leading-[1.3] text-[var(--primary-500)]"
          style={{
            fontFeatureSettings:
              "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
          }}
        >
          {price.euroEquivalent.toFixed(2)} €
        </span>
      )}
    </div>
  );
}

/* ── Best-price pill ── */
function BestPricePill() {
  return (
    <span className="inline-flex items-center gap-[var(--xs)] px-[var(--s)] py-[2px] rounded-[var(--xs)] bg-[var(--success-100)] text-[var(--success-700)] text-[12px] font-medium leading-[1.3] whitespace-nowrap">
      <i className="fa-solid fa-star text-[10px]" aria-hidden="true" />
      Най-добра цена
    </span>
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
    <span className="text-[16px] font-semibold text-[var(--primary-900)] shrink-0">
      {name}
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
  return (
    <CardWrapper onClick={() => onSelect?.(offer.id)}>
      <div className="flex items-center gap-[var(--m)]">
        {/* Logo + pill */}
        <div className="flex items-center gap-[var(--m)] flex-1 min-w-0">
          <CompanyLogo name={offer.companyName} logo={offer.companyLogo} />
          {offer.recommended && <BestPricePill />}
        </div>

        {/* Prices */}
        <div className="flex items-center gap-[var(--xl)] shrink-0">
          <PriceColumn
            label={offer.installmentLabel ?? "Първа вноска"}
            price={offer.installmentPrice}
            bold
          />
          <PriceColumn
            label={offer.totalLabel ?? "Общо"}
            price={offer.totalPrice}
            bold
          />
        </div>

        {/* Chevron CTA */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(offer.id);
          }}
          aria-label={`Select ${offer.companyName}`}
          className="flex items-center justify-center w-[32px] h-[32px] shrink-0 cursor-pointer rounded-full hover:bg-[var(--primary-100)] transition-colors duration-100"
        >
          <i
            className="fa-regular fa-chevron-right text-[14px] text-[var(--primary-900)]"
            aria-hidden="true"
          />
        </button>
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
      <div className="flex items-center gap-[var(--m)]">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={offer.selected ?? false}
          onChange={(e) => onToggle?.(offer.id, e.target.checked)}
          className="w-[20px] h-[20px] shrink-0 cursor-pointer accent-[var(--accent-600)]"
          aria-label={`Select ${offer.companyName}`}
        />

        {/* Logo */}
        <div className="flex-1 min-w-0">
          <CompanyLogo name={offer.companyName} logo={offer.companyLogo} />
        </div>

        {/* Duration */}
        <span
          className="text-[14px] leading-[1.2] text-[var(--primary-900)] shrink-0"
          style={{
            fontFeatureSettings:
              "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
          }}
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
  const currency = offer.price.currency ?? "лв.";

  return (
    <CardWrapper>
      <div className="flex flex-col gap-[var(--s)]">
        {/* Top row: title + price + status */}
        <div className="flex items-start gap-[var(--m)]">
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] font-medium leading-[1.2] text-[var(--primary-900)]">
              {offer.title}
            </h3>
            {/* Date row */}
            <div className="flex items-center gap-[var(--xs)] mt-[var(--xs)]">
              <i
                className="fa-regular fa-calendar text-[14px] text-[var(--primary-600)]"
                aria-hidden="true"
              />
              <span
                className="text-[14px] leading-[1.2] text-[var(--primary-600)]"
                style={{
                  fontFeatureSettings:
                    "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
                }}
              >
                {offer.date}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[18px] font-semibold leading-[1.2] text-[var(--primary-900)]">
              {offer.price.amount.toFixed(2)} {currency}
            </span>
            {offer.price.euroEquivalent != null && (
              <span
                className="text-[12px] leading-[1.3] text-[var(--primary-500)]"
                style={{
                  fontFeatureSettings:
                    "'cv12' 1, 'cv13' 1, 'cv14' 1, 'cv15' 1, 'cv16' 1",
                }}
              >
                {offer.price.euroEquivalent.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Status pill */}
          <span className="inline-flex items-center px-[var(--s)] py-[2px] rounded-[var(--xs)] bg-[var(--primary-200)] text-[var(--primary-900)] text-[12px] font-medium leading-[1.3] shrink-0 whitespace-nowrap">
            {offer.status}
          </span>
        </div>

        {/* Expand link */}
        <button
          type="button"
          onClick={() => {
            setExpanded(!expanded);
            onSelect?.(offer.id);
          }}
          className="inline-flex items-center gap-[var(--xs)] text-[14px] font-medium text-[var(--accent-600)] cursor-pointer hover:underline self-start"
        >
          Вижте повече
          <i
            className={`fa-regular ${expanded ? "fa-chevron-up" : "fa-chevron-down"} text-[12px] text-[var(--accent-600)]`}
            aria-hidden="true"
          />
        </button>
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
      <div className="flex items-center gap-[var(--m)]">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={offer.selected ?? false}
          onChange={(e) => onToggle?.(offer.id, e.target.checked)}
          className="w-[20px] h-[20px] shrink-0 cursor-pointer accent-[var(--accent-600)]"
          aria-label={`Select ${offer.companyName}`}
        />

        {/* Logo */}
        <div className="flex-1 min-w-0">
          <CompanyLogo name={offer.companyName} logo={offer.companyLogo} />
        </div>

        {/* Installment price */}
        <PriceColumn
          label={offer.installmentLabel ?? "Вноска"}
          price={offer.installmentPrice}
          bold
        />
      </div>
    </CardWrapper>
  );
}

/* ── Skeleton ── */
function SkeletonRow() {
  return (
    <div
      className={[cardBase, "animate-pulse"].join(" ")}
      style={{ boxShadow: SHADOW_L2 }}
    >
      <div className="flex items-center gap-[var(--m)]">
        <div className="w-[80px] h-[32px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="flex-1" />
        <div className="w-[80px] h-[20px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="w-[80px] h-[20px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="w-[32px] h-[32px] rounded-full bg-[var(--primary-200)]" />
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
