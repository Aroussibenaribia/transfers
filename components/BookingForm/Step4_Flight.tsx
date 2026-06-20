"use client";

import { AIRPORTS } from "@/lib/locations";

interface Step4Props {
  flightNumber: string;
  flightOrigin: string;
  flightTime: string;
  hasFlightInfo: boolean;
  onChange: (
    field: "flightNumber" | "flightOrigin" | "flightTime" | "hasFlightInfo",
    value: string | boolean
  ) => void;
}

export default function Step4Flight({
  flightNumber,
  flightOrigin,
  flightTime,
  hasFlightInfo,
  onChange,
}: Step4Props) {
  return (
    <div className="animate-fadeup">
      <div className="step-header">
        <h2>✈️ Informations de vol</h2>
        <p>
          Si votre trajet est lié à un vol, ces informations nous permettent de
          surveiller les retards
        </p>
      </div>

      {/* Toggle */}
      <div
        className={`toggle-card ${hasFlightInfo ? "active" : ""}`}
        onClick={() => onChange("hasFlightInfo", !hasFlightInfo)}
        style={{ marginBottom: 24 }}
      >
        <div className="toggle-card-info">
          <div className="toggle-card-icon">✈️</div>
          <div>
            <div className="toggle-card-title">J'ai un vol à indiquer</div>
            <div className="toggle-card-sub">
              Arrivée ou départ d'un aéroport tunisien
            </div>
          </div>
        </div>
        <div className="toggle-switch" />
      </div>

      {hasFlightInfo && (
        <div className="animate-fadeup">
          <div className="info-tip">
            <span>ℹ️</span>
            <span>
              Ces informations sont optionnelles mais permettent à votre chauffeur de
              s'adapter en cas de retard.
            </span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Numéro de vol</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: TU 102, AF 1234"
                value={flightNumber}
                onChange={(e) => onChange("flightNumber", e.target.value.toUpperCase())}
                maxLength={10}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Heure d'arrivée / décollage</label>
              <input
                type="time"
                className="form-input"
                value={flightTime}
                onChange={(e) => onChange("flightTime", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Aéroport de provenance / destination</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Paris CDG, Lyon Saint-Exupéry, Marseille..."
              value={flightOrigin}
              onChange={(e) => onChange("flightOrigin", e.target.value)}
            />
          </div>
        </div>
      )}

      {!hasFlightInfo && (
        <div
          style={{
            textAlign: "center",
            padding: "32px 20px",
            color: "var(--text-muted)",
            fontSize: 14,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>✈️</div>
          <p>
            Pas de vol à indiquer ? Continuez directement à l'étape suivante.
          </p>
        </div>
      )}
    </div>
  );
}
