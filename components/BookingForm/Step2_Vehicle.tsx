"use client";

import type { VehicleType } from "@/lib/pricing";

interface Step2Props {
  vehicle: VehicleType | "";
  departureDate: string;
  departureTime: string;
  passengers: number;
  onChange: (
    field: "vehicle" | "departureDate" | "departureTime" | "passengers",
    value: string | number
  ) => void;
  errors: Record<string, string>;
}

const VEHICLES: {
  id: VehicleType;
  image: string;
  name: string;
  capacity: string;
  desc: string;
}[] = [
  {
    id: "eco",
    image: "/cars/eco.png",
    name: "Éco",
    capacity: "Max 3 passagers",
    desc: "Berline confortable, idéale pour petits groupes ou voyageurs d'affaires",
  },
  {
    id: "confort",
    image: "/cars/confort.png",
    name: "Confort",
    capacity: "Max 7 passagers",
    desc: "SUV spacieux avec plus de confort, parfait pour familles",
  },
  {
    id: "van",
    image: "/cars/van.png",
    name: "Van",
    capacity: "8 à 12+ passagers",
    desc: "Minibus idéal pour grands groupes ou bagages volumineux",
  },
];

const MAX_PASSENGERS: Record<VehicleType, number> = {
  eco: 3,
  confort: 7,
  van: 12,
};

// Get today's date in YYYY-MM-DD for the min attribute
const today = new Date().toISOString().split("T")[0];

export default function Step2Vehicle({
  vehicle,
  departureDate,
  departureTime,
  passengers,
  onChange,
  errors,
}: Step2Props) {
  const maxPax = vehicle ? MAX_PASSENGERS[vehicle as VehicleType] : 12;

  return (
    <div className="animate-fadeup">
      <div className="step-header">
        <h2>🚗 Véhicule & date</h2>
        <p>Choisissez le type de véhicule adapté à votre groupe</p>
      </div>

      {/* Vehicle selector */}
      <div className="section-title">Type de véhicule</div>
      <div className="vehicle-grid" style={{ marginBottom: 24 }}>
        {VEHICLES.map((v) => (
          <div
            key={v.id}
            className={`vehicle-card ${vehicle === v.id ? "selected" : ""}`}
            style={{ padding: 0, overflow: "hidden" }}
            onClick={() => onChange("vehicle", v.id)}
          >
            <div className="check" style={{ top: 12, right: 12, zIndex: 10 }}>
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4l3 3 5-6"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ position: "relative", height: "140px", width: "100%", background: "#f3f4f6" }}>
              <img 
                src={v.image} 
                alt={v.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
              <div style={{ position: "absolute", inset: 0, background: vehicle === v.id ? "rgba(124,58,237,0.1)" : "rgba(0,0,0,0.03)" }} />
            </div>
            <div style={{ padding: "16px" }}>
              <div className="vehicle-name" style={{ fontSize: "18px", marginBottom: "4px" }}>{v.name}</div>
              <div className="vehicle-cap" style={{ background: "var(--purple-50)", color: "var(--purple-700)", display: "inline-block", padding: "2px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, marginBottom: "8px" }}>{v.capacity}</div>
              <div className="vehicle-desc" style={{ fontSize: "13px", color: "var(--gray-600)", lineHeight: 1.4 }}>{v.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {errors.vehicle && (
        <span className="form-error" style={{ marginBottom: 16, display: "flex" }}>
          ⚠️ {errors.vehicle}
        </span>
      )}

      {/* Date & Time */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Date de départ <span className="required">*</span>
          </label>
          <input
            type="date"
            className={`form-input ${errors.departureDate ? "error" : ""}`}
            value={departureDate}
            min={today}
            onChange={(e) => onChange("departureDate", e.target.value)}
          />
          {errors.departureDate && (
            <span className="form-error">⚠️ {errors.departureDate}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Heure de prise en charge <span className="required">*</span>
          </label>
          <input
            type="time"
            className={`form-input ${errors.departureTime ? "error" : ""}`}
            value={departureTime}
            onChange={(e) => onChange("departureTime", e.target.value)}
          />
          {errors.departureTime && (
            <span className="form-error">⚠️ {errors.departureTime}</span>
          )}
        </div>
      </div>

      {/* Passengers */}
      <div className="form-group">
        <label className="form-label">
          Nombre de passagers <span className="required">*</span>
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: 48, height: 48, padding: 0, borderRadius: "50%", flexShrink: 0 }}
            onClick={() => onChange("passengers", Math.max(1, passengers - 1))}
            disabled={passengers <= 1}
          >
            −
          </button>
          <div
            style={{
              flex: 1,
              height: 48,
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--primary)",
            }}
          >
            {passengers} {passengers === 1 ? "passager" : "passagers"}
          </div>
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: 48, height: 48, padding: 0, borderRadius: "50%", flexShrink: 0 }}
            onClick={() => onChange("passengers", Math.min(maxPax, passengers + 1))}
            disabled={passengers >= maxPax}
          >
            +
          </button>
        </div>
        {vehicle && (
          <span className="form-hint">
            Maximum {maxPax} passagers pour le véhicule {vehicle === "eco" ? "Éco" : vehicle === "confort" ? "Confort" : "Van"}
          </span>
        )}
      </div>
    </div>
  );
}
