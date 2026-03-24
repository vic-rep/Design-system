"use client";

import React from "react";

export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  plate?: string;
  talonNumber?: string;
  verified?: boolean;
}

export interface VehicleDetailsCardProps {
  vehicle: VehicleDetails;
  onEdit?: () => void;
  className?: string;
}

export function VehicleDetailsCard({
  vehicle,
  onEdit,
  className = "",
}: VehicleDetailsCardProps) {
  return (
    <div
      className={[
        "rounded-[var(--s)] border border-[var(--primary-200)] bg-[var(--surface-adjacent)] p-[var(--xxl)]",
        className,
      ].join(" ")}
      style={{ boxShadow: "var(--elevation-level1)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-[var(--l)]">
        <div>
          <h4 className="text-[18px] font-semibold text-[var(--primary-900)] leading-[1.2]">
            {vehicle.make} {vehicle.model}
          </h4>
          <span className="text-[14px] text-[var(--primary-500)]">{vehicle.year}</span>
        </div>
        <div className="flex items-center gap-[var(--s)]">
          {vehicle.verified && (
            <span className="inline-flex items-center gap-[var(--xxs)] px-[var(--s)] py-[var(--xxs)] rounded-[var(--xs)] bg-[var(--success-100)] text-[var(--success-700)] text-[12px] font-medium">
              <i className="fa-solid fa-check text-[10px]" aria-hidden="true" />
              Verified
            </span>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="text-[14px] font-medium text-[var(--accent-600)] hover:text-[var(--accent-700)] transition-colors duration-150 cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--m)]">
        {vehicle.plate && (
          <div>
            <p className="text-[12px] text-[var(--primary-500)] mb-[var(--xxs)]">License Plate</p>
            <p className="text-[14px] font-medium text-[var(--primary-900)]">{vehicle.plate}</p>
          </div>
        )}
        {vehicle.talonNumber && (
          <div>
            <p className="text-[12px] text-[var(--primary-500)] mb-[var(--xxs)]">Talon Number</p>
            <p className="text-[14px] font-medium text-[var(--primary-900)]">{vehicle.talonNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}

VehicleDetailsCard.displayName = "VehicleDetailsCard";
