"use client";

import React from "react";

export interface OfferFeature {
  label: string;
  included: boolean;
}

export interface Offer {
  id: string;
  companyName: string;
  companyLogo?: string;
  price: number;
  currency?: string;
  period?: string;
  features: OfferFeature[];
  recommended?: boolean;
}

export interface OffersListProps {
  offers: Offer[];
  loading?: boolean;
  onSelect?: (offerId: string) => void;
  className?: string;
}

function SkeletonCard() {
  return (
    <div className="rounded-[var(--s)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] p-[var(--xxl)] animate-pulse">
      <div className="flex items-center justify-between mb-[var(--l)]">
        <div className="w-[120px] h-[24px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="w-[80px] h-[28px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
      </div>
      <div className="space-y-[var(--s)]">
        <div className="w-full h-[14px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="w-3/4 h-[14px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
        <div className="w-5/6 h-[14px] rounded-[var(--xs)] bg-[var(--primary-200)]" />
      </div>
      <div className="mt-[var(--l)] w-full h-[40px] rounded-[var(--s)] bg-[var(--primary-200)]" />
    </div>
  );
}

function OfferCard({
  offer,
  onSelect,
}: {
  offer: Offer;
  onSelect?: (id: string) => void;
}) {
  const currency = offer.currency ?? "лв.";
  const period = offer.period ?? "/год.";

  return (
    <div
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect?.(offer.id);
      }}
      className={[
        "rounded-[var(--s)] border bg-[var(--surface-adjacent)] p-[var(--xxl)]",
        "transition-all duration-150 cursor-pointer",
        "hover:border-[var(--primary-400)]",
        "active:translate-y-[1px]",
        offer.recommended
          ? "border-[var(--accent-600)] border-2"
          : "border-[var(--primary-200)]",
      ].join(" ")}
      style={{
        boxShadow: "var(--elevation-level1)",
      }}
      onClick={() => onSelect?.(offer.id)}
    >
      {/* Recommended badge */}
      {offer.recommended && (
        <div className="mb-[var(--m)]">
          <span className="inline-flex items-center px-[var(--s)] py-[var(--xxs)] rounded-[var(--xs)] bg-[var(--accent-100)] text-[var(--accent-800)] text-[12px] font-semibold">
            <i className="fa-solid fa-star text-[10px] mr-[var(--xs)]" aria-hidden="true" />
            Recommended
          </span>
        </div>
      )}

      {/* Header: company + price */}
      <div className="flex items-center justify-between mb-[var(--l)]">
        <div className="flex items-center gap-[var(--m)]">
          {offer.companyLogo ? (
            <img
              src={offer.companyLogo}
              alt={offer.companyName}
              className="h-[28px] w-auto object-contain"
            />
          ) : (
            <span className="text-[16px] font-semibold text-[var(--primary-900)]">
              {offer.companyName}
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-[24px] font-semibold text-[var(--primary-900)]">
            {offer.price.toFixed(2)}
          </span>
          <span className="text-[14px] text-[var(--primary-500)] ml-[var(--xxs)]">
            {currency}{period}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-[var(--xs)] mb-[var(--l)]">
        {offer.features.map((f, i) => (
          <div key={i} className="flex items-center gap-[var(--s)]">
            <i
              className={`fa-solid ${f.included ? "fa-check text-[var(--success-700)]" : "fa-xmark text-[var(--primary-400)]"} text-[12px] w-[14px] text-center`}
              aria-hidden="true"
            />
            <span
              className={`text-[14px] leading-[1.3] ${f.included ? "text-[var(--primary-900)]" : "text-[var(--primary-400)]"}`}
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(offer.id);
        }}
        className="w-full h-[40px] flex items-center justify-center rounded-[var(--s)] bg-[var(--accent-600)] text-[var(--constant-white)] text-[14px] font-semibold hover:bg-[var(--accent-700)] active:bg-[var(--accent-800)] transition-colors duration-150 cursor-pointer"
      >
        Select offer
      </button>
    </div>
  );
}

export function OffersList({
  offers,
  loading = false,
  onSelect,
  className = "",
}: OffersListProps) {
  if (loading) {
    return (
      <div className={`space-y-[var(--m)] ${className}`} role="list" aria-busy="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-[var(--m)] ${className}`} role="list">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} onSelect={onSelect} />
      ))}
    </div>
  );
}

OffersList.displayName = "OffersList";
