"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

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
          <Typography variant="textLg" as="h4" bold className="text-[var(--primary-900)] leading-[1.2]">
            {vehicle.make} {vehicle.model}
          </Typography>
          <Typography variant="textM" as="span" className="text-[var(--primary-500)]">{vehicle.year}</Typography>
        </div>
        <div className="flex items-center gap-[var(--s)]">
          {vehicle.verified && (
            <span className="inline-flex items-center gap-[var(--xxs)] px-[var(--s)] py-[var(--xxs)] rounded-[var(--xs)] bg-[var(--success-100)] text-[var(--success-700)] text-[12px] font-medium">
              <Icon name="fa-check" size="xs" weight="solid" />
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
            <Typography variant="textSm" as="p" className="text-[var(--primary-500)] mb-[var(--xxs)]">License Plate</Typography>
            <Typography variant="textM" as="p" bold className="text-[var(--primary-900)]">{vehicle.plate}</Typography>
          </div>
        )}
        {vehicle.talonNumber && (
          <div>
            <Typography variant="textSm" as="p" className="text-[var(--primary-500)] mb-[var(--xxs)]">Talon Number</Typography>
            <Typography variant="textM" as="p" bold className="text-[var(--primary-900)]">{vehicle.talonNumber}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

VehicleDetailsCard.displayName = "VehicleDetailsCard";
