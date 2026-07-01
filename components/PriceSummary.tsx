"use client";

import type { PricingBreakdown } from "@/lib/pricing";
import type { VehicleType } from "@/lib/pricing";
import { getLocationName } from "@/lib/locations";
import { useDictionary } from "@/components/DictionaryProvider";

interface PriceSummaryProps {
  departure: string;
  destination: string;
  vehicle: VehicleType | "";
  pricing: PricingBreakdown | null;
  loading: boolean;
}

const vehicleLabel: Record<VehicleType, string> = {
  eco: "Éco",
  confort: "Confort",
  van: "Van",
};

// ─── TEMPORARY: set to true to restore full price display ─────────────────────
const SHOW_PRICE = false;
// ─────────────────────────────────────────────────────────────────────────────

export default function PriceSummary({
  departure,
  destination,
  vehicle,
  pricing,
  loading,
}: PriceSummaryProps) {
  const dict = useDictionary();
  const sumDict = dict.booking.summary;

  if (!departure || !destination) {
    return (
      <div className="card-sm" style={{ background: "var(--purple-50)", border: "1px dashed var(--purple-200)", textAlign: "center", padding: "32px 16px" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🗺️</div>
        <div style={{ fontWeight: 600, color: "var(--gray-800)" }}>{sumDict.title}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Sélectionnez un départ et une destination pour voir le prix</div>
      </div>
    );
  }

  const hasRoute = departure && destination;

  return (
    <div className="price-card">
      <h3>
        <span>💳</span> Estimation du prix
      </h3>

      {/* ── TEMPORARY CONTACT MESSAGE (set SHOW_PRICE = true above to restore prices) ── */}
      {!SHOW_PRICE && hasRoute && (
        <div style={{
          textAlign: "center",
          padding: "20px 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{ fontSize: 36 }}>📧</div>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Pour confirmer le prix de votre transfert, contactez-nous à :
          </p>
          <a
            href="mailto:contact@o-transfert.com"
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.3px",
            }}
          >
            contact@o-transfert.com
          </a>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>
            Réponse rapide · Prix fixe garanti
          </p>
        </div>
      )}

      {/* ── ORIGINAL PRICE DISPLAY (active when SHOW_PRICE = true) ── */}
      {SHOW_PRICE && hasRoute && !vehicle && (
        <div className="price-placeholder">
          Sélectionnez un véhicule pour voir le prix
        </div>
      )}

      {SHOW_PRICE && hasRoute && vehicle && (
        <>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <span>{getLocationName(departure).split(" ")[0]}</span>
            <span>→</span>
            <span>{getLocationName(destination).split(" ")[0]}</span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div className="spinner" style={{ margin: "0 auto" }} />
            </div>
          ) : pricing ? (
            <>
              {pricing.distanceKm > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <span className="distance-badge">📏 ~{pricing.distanceKm} km</span>
                </div>
              )}

              <div className="price-row">
                <span>Tarif de base</span>
                <span>{pricing.basePrice}€</span>
              </div>

              {pricing.vehicleSurcharge > 0 && (
                <div className="price-row">
                  <span>Supplément {vehicleLabel[vehicle as VehicleType]}</span>
                  <span>+{pricing.vehicleSurcharge}€</span>
                </div>
              )}

              {pricing.baggageSurcharge > 0 && (
                <div className="price-row">
                  <span>Bagages sup.</span>
                  <span>+{pricing.baggageSurcharge}€</span>
                </div>
              )}

              {pricing.langSurcharge > 0 && (
                <div className="price-row">
                  <span>Chauffeur bilingue</span>
                  <span>+{pricing.langSurcharge}€</span>
                </div>
              )}

              <div className="price-row total">
                <span>Total</span>
                <span>{pricing.total}€</span>
              </div>

              <p style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>
                Prix indicatif · Règlement à bord
              </p>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
