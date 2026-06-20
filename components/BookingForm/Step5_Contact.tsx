"use client";

interface Step5Props {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  onChange: (field: "clientName" | "clientEmail" | "clientPhone", value: string) => void;
  errors: Record<string, string>;
}

export default function Step5Contact({
  clientName,
  clientEmail,
  clientPhone,
  onChange,
  errors,
}: Step5Props) {
  return (
    <div className="animate-fadeup">
      <div className="step-header">
        <h2>👤 Vos coordonnées</h2>
        <p>
          Vous recevrez une confirmation de réservation par email avec votre
          référence
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">
          Nom complet <span className="required">*</span>
        </label>
        <input
          type="text"
          className={`form-input ${errors.clientName ? "error" : ""}`}
          placeholder="Ex: Ahmed Ben Salah"
          value={clientName}
          onChange={(e) => onChange("clientName", e.target.value)}
          autoComplete="name"
        />
        {errors.clientName && (
          <span className="form-error">⚠️ {errors.clientName}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Adresse email <span className="required">*</span>
        </label>
        <input
          type="email"
          className={`form-input ${errors.clientEmail ? "error" : ""}`}
          placeholder="ex: ahmed@email.com"
          value={clientEmail}
          onChange={(e) => onChange("clientEmail", e.target.value)}
          autoComplete="email"
        />
        {errors.clientEmail && (
          <span className="form-error">⚠️ {errors.clientEmail}</span>
        )}
        <span className="form-hint">
          La confirmation de réservation sera envoyée à cette adresse
        </span>
      </div>

      <div className="form-group">
        <label className="form-label">
          Numéro de téléphone <span className="required">*</span>
        </label>
        <input
          type="tel"
          className={`form-input ${errors.clientPhone ? "error" : ""}`}
          placeholder="Ex: +216 98 123 456"
          value={clientPhone}
          onChange={(e) => onChange("clientPhone", e.target.value)}
          autoComplete="tel"
        />
        {errors.clientPhone && (
          <span className="form-error">⚠️ {errors.clientPhone}</span>
        )}
      </div>

      <div
        style={{
          background: "var(--purple-50)",
          border: "1px solid var(--purple-200)",
          borderRadius: "var(--radius)",
          padding: "16px 18px",
          marginTop: 8,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
        <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.6 }}>
          Vos données personnelles sont utilisées uniquement pour la gestion de
          votre réservation. Aucune information n'est partagée avec des tiers.
        </p>
      </div>
    </div>
  );
}
