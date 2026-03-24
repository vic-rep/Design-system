"use client";

import React from "react";

export interface CartItem {
  id: string;
  label: string;
  description?: string;
  price: number;
  removable?: boolean;
}

export interface CartProps {
  items: CartItem[];
  currency?: string;
  onRemove?: (itemId: string) => void;
  onCheckout?: () => void;
  checkoutLabel?: string;
  className?: string;
}

export function Cart({
  items,
  currency = "лв.",
  onRemove,
  onCheckout,
  checkoutLabel = "Proceed to checkout",
  className = "",
}: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className={[
        "rounded-[var(--s)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="px-[var(--xxl)] py-[var(--l)] border-b border-[var(--primary-200)]">
        <h3 className="text-[18px] font-semibold text-[var(--primary-900)]">Order Summary</h3>
      </div>

      {/* Items */}
      <div className="px-[var(--xxl)] py-[var(--m)]">
        {items.length === 0 ? (
          <p className="text-[14px] text-[var(--primary-500)] py-[var(--l)] text-center">
            No items selected
          </p>
        ) : (
          <ul className="divide-y divide-[var(--primary-200)]">
            {items.map((item) => (
              <li key={item.id} className="flex items-start justify-between py-[var(--m)]">
                <div className="flex-1 mr-[var(--m)]">
                  <p className="text-[14px] font-medium text-[var(--primary-900)]">{item.label}</p>
                  {item.description && (
                    <p className="text-[12px] text-[var(--primary-500)] mt-[var(--xxs)]">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-[var(--s)] shrink-0">
                  <span className="text-[14px] font-medium text-[var(--primary-900)]">
                    {item.price.toFixed(2)} {currency}
                  </span>
                  {item.removable !== false && onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.label}`}
                      className="w-[24px] h-[24px] flex items-center justify-center rounded-[var(--xs)] text-[var(--primary-400)] hover:text-[var(--destructive-600)] hover:bg-[var(--destructive-100)] transition-colors duration-150 cursor-pointer"
                    >
                      <i className="fa-solid fa-xmark text-[11px]" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total */}
      {items.length > 0 && (
        <div className="px-[var(--xxl)] py-[var(--m)] border-t-2 border-[var(--primary-900)]">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[var(--primary-900)]">Total</span>
            <span className="text-[20px] font-semibold text-[var(--primary-900)]">
              {total.toFixed(2)} {currency}
            </span>
          </div>
        </div>
      )}

      {/* CTA */}
      {onCheckout && items.length > 0 && (
        <div className="px-[var(--xxl)] pb-[var(--xxl)]">
          <button
            type="button"
            onClick={onCheckout}
            className="w-full h-[44px] flex items-center justify-center rounded-[var(--s)] bg-[var(--accent-600)] text-[var(--constant-white)] text-[16px] font-semibold hover:bg-[var(--accent-700)] active:bg-[var(--accent-800)] transition-colors duration-150 cursor-pointer"
          >
            {checkoutLabel}
          </button>
        </div>
      )}
    </div>
  );
}

Cart.displayName = "Cart";
