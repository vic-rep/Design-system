"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/molecules/Input";
import { getLogoSrc } from "./logos";
import "./vehicleDetailsCard.css";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export type ServiceStatus = "valid" | "warning" | "expired" | "locked";

export interface VehicleService {
  id: "civil-liability" | "kasko" | "vignette" | "fines" | "reverse-leasing";
  label: string;
  status: ServiceStatus;
  href?: string;
  /** Show the info (circle-info) icon after the label */
  showInfo?: boolean;
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

/* ─── Default services shown when talon=false and no services prop given ──── */

const DEFAULT_SERVICES: VehicleService[] = [
  { id: "fines",           label: "Имате 2 глоби неплатени глоби", status: "warning", showInfo: true },
  { id: "civil-liability", label: "Гражданска отговорност",        status: "locked" },
  { id: "kasko",           label: "Каско",                         status: "locked", href: "#kasko" },
  { id: "vignette",        label: "Винетка",                       status: "locked" },
];

/* ─── Error messages ─────────────────────────────────────────────────────── */

const TALON_ERROR_MESSAGES: Record<NonNullable<TalonError>, string> = {
  "invalid-format": "Невалиден формат — очакван формат: XXXXXXXXX",
  "plate-mismatch": "Талонът не съответства на регистрационния номер",
};

/* ─── Status icon ─────────────────────────────────────────────────────────── */
/* Figma: locked → fa-circle-question (#808080), warning → fa-warning (#FF9D1F) */

function StatusIcon({ status }: { status: ServiceStatus }) {
  const map: Record<ServiceStatus, { name: string; mod: string }> = {
    valid:   { name: "fa-circle-check",         mod: "vdc__service-status-icon--valid" },
    warning: { name: "fa-triangle-exclamation", mod: "vdc__service-status-icon--warning" },
    expired: { name: "fa-circle-xmark",         mod: "vdc__service-status-icon--expired" },
    locked:  { name: "fa-circle-question",      mod: "vdc__service-status-icon--locked" },
  };
  const { name, mod } = map[status];
  return (
    <span className={`vdc__service-status-icon ${mod}`}>
      <Icon name={name} size="md" />
    </span>
  );
}

/* ─── Service row ─────────────────────────────────────────────────────────── */

function ServiceRow({ service }: { service: VehicleService }) {
  const hasLink = !!service.href;

  const content = (
    <>
      <div className="vdc__service-row__left">
        <StatusIcon status={service.status} />
        <span className="vdc__service-label">{service.label}</span>
        {service.showInfo && (
          <span className="vdc__service-info-icon">
            <Icon name="fa-circle-info" size="xs" />
          </span>
        )}
      </div>
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
        {content}
      </a>
    );
  }

  return <div className="vdc__service-row">{content}</div>;
}

/* ─── Skeleton rows ───────────────────────────────────────────────────────── */

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
    vehicle.plate                              ? { text: vehicle.plate,   icon: "fa-car" }             : null,
    vehicle.fuel                               ? { text: vehicle.fuel,    icon: "fa-gas-pump" }        : null,
    vehicle.engine                             ? { text: vehicle.engine,  icon: "fa-engine" }          : null,
    vehicle.power                              ? { text: vehicle.power,   icon: "fa-horse" }           : null,
    vehicle.drive                              ? { text: vehicle.drive,   icon: "fa-steering-wheel" }  : null,
    vehicle.isTaxi || vehicle.isLeasing        ? { text: "Такси или отдаване под наем", icon: "fa-taxi" } : null,
  ].filter(Boolean) as { text: string; icon: string }[];

  return (
    <div className="vdc__pills">
      {pills.map((p) => (
        <span key={p.text} className="vdc__pill">
          <Icon name={p.icon} size="xs" className="vdc__pill-icon" />
          {p.text}
        </span>
      ))}
    </div>
  );
}

/* ─── Talon input section ─────────────────────────────────────────────────── */

function TalonInput({ onSubmit, error }: { onSubmit: (v: string) => void; error?: TalonError }) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  }

  return (
    <div className="vdc__talon-section">
      {/* Promo row */}
      <div className="vdc__talon-promo">
        <div className="vdc__talon-promo-icon">
          <Icon name="fa-shield-halved" size="sm" />
        </div>
        <p className="vdc__talon-promo-text">
          Проверете всички задължения свързани с автомобила си с Trusti AI Брокер.
        </p>
      </div>

      {/* Input + button */}
      <form onSubmit={handleSubmit}>
        <div className="vdc__talon-form">
          <div className="vdc__talon-input-wrap">
            <Input
              inputType="text"
              placeholder="Номер на талон"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              error={error ? TALON_ERROR_MESSAGES[error] : undefined}
              className="vdc__talon-input"
            />
          </div>
          <button
            type="submit"
            className="vdc__talon-submit"
            disabled={!value.trim()}
          >
            Въведи
          </button>
        </div>
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

  /* ── No-talon state ────────────────────────────────────────────────────── */

  if (!talon) {
    const rows = services ?? DEFAULT_SERVICES;
    const isGrid = rows.length >= 2; /* 2-col on desktop, 1-col on mobile via CSS */

    return (
      <div className={`vdc ${className}`}>
        {/* Dark top section */}
        <div className="vdc__dark">
          <div className="vdc__header">
            <h3 className="vdc__header-title">Резултати от проверката</h3>
            <span className="vdc__plate-badge">
              <i className="fa-solid fa-car vdc__plate-badge-icon" aria-hidden="true" />
              {vehicle.plate}
            </span>
          </div>

          <div className={`vdc__services-list${isGrid ? " vdc__services-list--grid" : ""}`}>
            {rows.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* Light bottom section — talon input */}
        <TalonInput onSubmit={onTalonSubmit} error={talonError} />
      </div>
    );
  }

  /* ── With-talon state ──────────────────────────────────────────────────── */

  return (
    <div className={`vdc ${className}`}>
      <div className="vdc__body">
        {/* Left: vehicle info */}
        <div className="vdc__vehicle-col">
          <div className="vdc__vehicle-header">
            {logoSrc && (
              <img src={logoSrc} alt={vehicle.make} className="vdc__vehicle-logo" />
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
              <ServiceRow key={s.id} service={s} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

VehicleDetailsCard.displayName = "VehicleDetailsCard";
