"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { getLogoSrc } from "./logos";
import "./vehicleDetailsCard.css";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export type ServiceStatus = "valid" | "warning" | "expired" | "locked";

export interface VehicleService {
  id: "civil-liability" | "kasko" | "vignette" | "fines" | "reverse-leasing";
  label: string;
  status: ServiceStatus;
  href?: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  plate: string;
  fuel?: string;
  engine?: string;
  power?: string;
  drive?: string;
  isTaxi?: boolean;
  isLeasing?: boolean;
}

export type TalonError = "invalid-format" | "plate-mismatch" | null;

export interface VehicleDetailsCardProps {
  vehicle: VehicleDetails;
  /** Whether the talon has been verified (authenticated state) */
  talon: boolean;
  /** Services list — undefined means skeleton loading */
  services?: VehicleService[];
  onTalonSubmit: (talon: string) => void;
  talonError?: TalonError;
  /** True while services are being fetched after talon submit */
  loading?: boolean;
  className?: string;
}

/* ─── Default services (no-talon) ────────────────────────────────────────── */

const DEFAULT_SERVICES: VehicleService[] = [
  { id: "fines",            label: "Глоби",                  status: "locked" },
  { id: "civil-liability",  label: "Гражданска отговорност", status: "locked" },
  { id: "kasko",            label: "Каско",                  status: "locked" },
  { id: "vignette",         label: "Винетка",                status: "locked" },
  { id: "reverse-leasing",  label: "Обратен лизинг",         status: "locked" },
];

/* ─── Error messages ─────────────────────────────────────────────────────── */

const TALON_ERROR_MESSAGES: Record<NonNullable<TalonError>, string> = {
  "invalid-format": "Невалиден формат — очакван формат: XXXXXXXXX",
  "plate-mismatch": "Талонът не съответства на регистрационния номер",
};

/* ─── Status icon ─────────────────────────────────────────────────────────── */

function StatusIcon({ status }: { status: ServiceStatus }) {
  const iconMap: Record<ServiceStatus, { name: string; mod: string }> = {
    valid:   { name: "fa-circle-check",         mod: "vdc__service-status-icon--valid" },
    warning: { name: "fa-triangle-exclamation", mod: "vdc__service-status-icon--warning" },
    expired: { name: "fa-circle-xmark",         mod: "vdc__service-status-icon--expired" },
    locked:  { name: "fa-lock",                 mod: "vdc__service-status-icon--locked" },
  };

  const { name, mod } = iconMap[status];

  return (
    <span className={`vdc__service-status-icon ${mod}`}>
      <Icon name={name} size="sm" />
    </span>
  );
}

/* ─── Service row ─────────────────────────────────────────────────────────── */

function ServiceRow({ service, showInfo }: { service: VehicleService; showInfo?: boolean }) {
  const isLocked = service.status === "locked";
  const hasLink  = !!service.href;

  const inner = (
    <>
      <StatusIcon status={service.status} />
      <span className={`vdc__service-label${isLocked ? " vdc__service-label--muted" : ""}`}>
        {service.label}
      </span>
      {showInfo && !isLocked && (
        <span className="vdc__service-info-icon">
          <Icon name="fa-circle-info" size="xs" />
        </span>
      )}
      {hasLink && (
        <span className="vdc__service-chevron">
          <Icon name="fa-chevron-right" size="xs" />
        </span>
      )}
    </>
  );

  if (hasLink) {
    return (
      <a
        href={service.href}
        target="_blank"
        rel="noopener noreferrer"
        className="vdc__service-row vdc__service-row--clickable"
      >
        {inner}
      </a>
    );
  }

  return <div className="vdc__service-row">{inner}</div>;
}

/* ─── Skeleton row ────────────────────────────────────────────────────────── */

function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="vdc__skeleton-row" />
      ))}
    </>
  );
}

/* ─── Vehicle pills ───────────────────────────────────────────────────────── */

function VehiclePills({ vehicle }: { vehicle: VehicleDetails }) {
  const pills = [
    vehicle.plate,
    vehicle.fuel,
    vehicle.engine,
    vehicle.power,
    vehicle.drive,
    vehicle.isTaxi || vehicle.isLeasing ? "Такси или отдаване под наем" : undefined,
  ].filter(Boolean) as string[];

  return (
    <div className="vdc__pills">
      {pills.map((p) => (
        <span key={p} className="vdc__pill">{p}</span>
      ))}
    </div>
  );
}

/* ─── Talon input ─────────────────────────────────────────────────────────── */

function TalonInput({
  onSubmit,
  error,
}: {
  onSubmit: (value: string) => void;
  error?: TalonError;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  }

  return (
    <div className="vdc__talon-section">
      <div className="vdc__talon-promo">
        <div className="vdc__talon-promo-icon">
          <Icon name="fa-robot" size="sm" />
        </div>
        <p className="vdc__talon-promo-text">
          Проверете всички задължения свързани с автомобила си с Trusti AI Брокер.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="vdc__talon-form">
          <input
            className={`vdc__talon-input${error ? " vdc__talon-input--error" : ""}`}
            type="text"
            placeholder="Номер на талон"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="vdc__talon-submit"
            disabled={!value.trim()}
          >
            Въведи
          </button>
        </div>
        {error && (
          <p className="vdc__talon-error">{TALON_ERROR_MESSAGES[error]}</p>
        )}
      </form>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */

export function VehicleDetailsCard({
  vehicle,
  talon,
  services,
  onTalonSubmit,
  talonError,
  loading = false,
  className = "",
}: VehicleDetailsCardProps) {
  const logoSrc = getLogoSrc(vehicle.make);

  /* No-talon state ────────────────────────────────────────────────────────── */

  if (!talon) {
    const rows = services ?? DEFAULT_SERVICES;

    return (
      <div className={`vdc ${className}`}>
        {/* Header */}
        <div className="vdc__header">
          <h3 className="vdc__header-title">Резултати от проверката</h3>
          <span className="vdc__plate-badge">{vehicle.plate}</span>
        </div>

        {/* Services grid */}
        <div className="vdc__services-grid">
          {rows.map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}
        </div>

        {/* Talon input footer */}
        <TalonInput onSubmit={onTalonSubmit} error={talonError} />
      </div>
    );
  }

  /* With-talon state ──────────────────────────────────────────────────────── */

  return (
    <div className={`vdc ${className}`}>
      <div className="vdc__body">
        {/* Left: vehicle info */}
        <div className="vdc__vehicle-col">
          <div className="vdc__vehicle-header">
            {logoSrc && (
              <img
                src={logoSrc}
                alt={vehicle.make}
                className="vdc__vehicle-logo"
              />
            )}
            <span className="vdc__vehicle-name">
              {vehicle.make} {vehicle.model} {vehicle.year}
            </span>
          </div>
          <VehiclePills vehicle={vehicle} />
        </div>

        {/* Divider */}
        <div className="vdc__divider" aria-hidden />

        {/* Right: services */}
        <div className="vdc__services-col">
          {loading || !services ? (
            <SkeletonRows count={5} />
          ) : (
            services.map((s) => (
              <ServiceRow key={s.id} service={s} showInfo />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

VehicleDetailsCard.displayName = "VehicleDetailsCard";
