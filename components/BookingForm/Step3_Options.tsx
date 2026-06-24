"use client";

import type { DriverLang } from "@/lib/pricing";

interface Step3Props {
  extraBaggage: boolean;
  driverLang: DriverLang;
  onChange: (field: "extraBaggage" | "driverLang", value: boolean | DriverLang) => void;
}

const LANGUAGES: { id: DriverLang; flag: string; name: string; price: string }[] = [
  { id: "ar", flag: "🇹🇳", name: "Arabe", price: "Inclus" },
  { id: "fr", flag: "🇫🇷", name: "Français", price: "Inclus" },
  { id: "en", flag: "🇬🇧", name: "Anglais", price: "Inclus" },
  { id: "de", flag: "🇩🇪", name: "Allemand", price: "Inclus" },
  { id: "it", flag: "🇮🇹", name: "Italien", price: "Inclus" },
];

export default function Step3Options({ extraBaggage, driverLang, onChange }: Step3Props) {
  return (
    <div className="animate-fadeup">
      <div className="step-header">
        <h2>⭐ Options supplémentaires</h2>
        <p>Personnalisez votre transfert selon vos besoins</p>
      </div>

      {/* Extra baggage */}
      <div className="section-title">Bagages</div>
      <div
        className={`toggle-card ${extraBaggage ? "active" : ""}`}
        onClick={() => onChange("extraBaggage", !extraBaggage)}
        style={{ marginBottom: 24 }}
      >
        <div className="toggle-card-info">
          <div className="toggle-card-icon">🧳</div>
          <div>
            <div className="toggle-card-title">Bagages supplémentaires</div>
            <div className="toggle-card-sub">
              Valises volumineuses, équipements sportifs, fauteuils roulants…
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span className="badge badge-purple">+10€</span>
          <div className="toggle-switch" />
        </div>
      </div>

      {/* Driver language */}
      <div className="section-title">Langue du chauffeur</div>
      <div className="lang-grid" style={{ marginBottom: 12 }}>
        {LANGUAGES.map((lang) => (
          <div
            key={lang.id}
            className={`lang-card ${driverLang === lang.id ? "selected" : ""}`}
            onClick={() => onChange("driverLang", lang.id)}
          >
            <span className="lang-flag">{lang.flag}</span>
            <div className="lang-name">{lang.name}</div>
            <div
              className="lang-price"
              style={{
                color: "var(--success)",
              }}
            >
              {lang.price}
            </div>
          </div>
        ))}
      </div>
      <p className="form-hint" style={{ textAlign: "center" }}>
        Tous nos chauffeurs multilingues sont inclus sans surcoût
      </p>
    </div>
  );
}
