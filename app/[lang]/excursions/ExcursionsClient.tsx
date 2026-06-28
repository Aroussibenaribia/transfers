"use client";

import { useState } from "react";
import { excursions } from "@/lib/excursions";

type Excursion = (typeof excursions)[0];
type Pack = "s" | "m" | "l";

const PACK_INFO: Record<Pack, { label: string; people: string; perPerson: boolean }> = {
  s: { label: "Pack S", people: "1 – 4 personnes", perPerson: false },
  m: { label: "Pack M", people: "4 – 8 personnes", perPerson: false },
  l: { label: "Pack L", people: "9 – 14 personnes", perPerson: true },
};

function getPrice(excursion: Excursion, pack: Pack, participants: number): number {
  if (pack === "l") return excursion.packs.l * participants;
  if (pack === "m") return excursion.packs.m;
  return excursion.packs.s;
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
interface BookingModalProps {
  excursion: Excursion;
  onClose: () => void;
}

function BookingModal({ excursion, onClose }: BookingModalProps) {
  const [pack, setPack] = useState<Pack>("s");
  const [withGuide, setWithGuide] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isPackL = pack === "l";
  const guideChecked = isPackL ? true : withGuide; // forced for L
  const totalPrice = getPrice(excursion, pack, participants);

  const handlePackChange = (p: Pack) => {
    setPack(p);
    // Reset participants to valid range for each pack
    if (p === "s") setParticipants(1);
    if (p === "m") setParticipants(4);
    if (p === "l") setParticipants(9);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/excursion-reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          excursionId: excursion.id,
          excursionName: excursion.name,
          participants,
          pack,
          withGuide: guideChecked,
          totalPrice,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setSuccess(data.reference);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "32px",
        width: "100%", maxWidth: "540px", maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
      }}>
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 24, color: "#111827", marginBottom: 8 }}>Réservation Confirmée !</h2>
            <p style={{ color: "#6b7280", marginBottom: 16 }}>Votre référence de réservation :</p>
            <div style={{
              background: "#f3e8ff", border: "2px dashed #7c3aed",
              borderRadius: "12px", padding: "16px", marginBottom: 24
            }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#7c3aed", letterSpacing: 4, display: "block", marginBottom: 12 }}>{success}</span>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`Excursion: ${success} - ${form.clientName}`)}`}
                alt="QR Code"
                style={{ borderRadius: 8, margin: "0 auto" }}
              />
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
              Notre équipe vous contactera pour confirmer les détails. Un email de confirmation vous a été envoyé.
            </p>
            <button onClick={onClose} style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", border: "none", padding: "12px 32px",
              borderRadius: "100px", cursor: "pointer", fontWeight: 600, fontSize: 16
            }}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 20, color: "#111827", margin: "0 0 4px 0" }}>Réserver l'excursion</h2>
                <p style={{ color: "#7c3aed", fontWeight: 600, margin: 0, fontSize: 13 }}>{excursion.name}</p>
              </div>
              <button onClick={onClose} style={{
                background: "#f3f4f6", border: "none", borderRadius: "50%",
                width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#6b7280",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>

              {/* ── Pack Selector ── */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
                  Choisissez votre pack *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {(["s", "m", "l"] as Pack[]).map((p) => {
                    const info = PACK_INFO[p];
                    const price = excursion.packs[p] === 0
                      ? "Sur demande"
                      : p === "l"
                      ? `${excursion.packs.l}€/pers`
                      : `${excursion.packs[p]}€`;
                    const isSelected = pack === p;
                    return (
                      <div
                        key={p}
                        onClick={() => handlePackChange(p)}
                        style={{
                          border: isSelected ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                          borderRadius: 12,
                          padding: "14px 10px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#f3e8ff" : "#fff",
                          transition: "all 0.2s",
                          position: "relative",
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            position: "absolute", top: -1, right: -1,
                            background: "#7c3aed", color: "#fff",
                            borderRadius: "0 10px 0 8px",
                            fontSize: 10, fontWeight: 700, padding: "2px 7px"
                          }}>✓</div>
                        )}
                        <div style={{ fontWeight: 800, fontSize: 15, color: isSelected ? "#7c3aed" : "#111827", marginBottom: 4 }}>
                          {info.label}
                        </div>
                        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, lineHeight: 1.3 }}>
                          {info.people}
                        </div>
                        <div style={{
                          fontWeight: 800, fontSize: 18,
                          color: isSelected ? "#7c3aed" : "#374151",
                        }}>
                          {price}
                        </div>
                        {excursion.packs[p] !== 0 && p === "l" && (
                          <div style={{ fontSize: 10, color: "#059669", fontWeight: 600, marginTop: 2 }}>
                            prix total
                          </div>
                        )}
                        {excursion.packs[p] !== 0 && p !== "l" && (
                          <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>
                            forfait groupe
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Participants (only shown for Pack L) ── */}
              {isPackL && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Nombre de participants * <span style={{ color: "#6b7280", fontWeight: 400 }}>(9 à 14)</span>
                  </label>
                  <input
                    type="number"
                    min={9}
                    max={14}
                    required
                    value={participants}
                    onChange={e => setParticipants(Number(e.target.value))}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "8px",
                      border: "1.5px solid #d1d5db", fontSize: 15, outline: "none",
                      fontFamily: "inherit", fontWeight: 600
                    }}
                  />
                </div>
              )}

              {/* ── Guide Option ── */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
                  Guide touristique
                </label>
                <div
                  onClick={() => !isPackL && setWithGuide(!withGuide)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    border: guideChecked ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                    borderRadius: 12, padding: "14px 16px",
                    background: guideChecked ? "#f3e8ff" : "#f9fafb",
                    cursor: isPackL ? "default" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 28 }}>👨‍🏫</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>
                        Guide expert multilingue
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                        {isPackL
                          ? "Inclus et obligatoire pour les groupes 9–14 personnes"
                          : "Accompagnement et explications sur les sites visités"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    {isPackL ? (
                      <span style={{
                        background: "#059669", color: "#fff",
                        fontSize: 11, fontWeight: 700, padding: "3px 10px",
                        borderRadius: "100px"
                      }}>Obligatoire</span>
                    ) : (
                      <>
                        <span style={{
                          background: guideChecked ? "#7c3aed" : "#e5e7eb",
                          color: guideChecked ? "#fff" : "#6b7280",
                          fontSize: 11, fontWeight: 700, padding: "3px 10px",
                          borderRadius: "100px", transition: "all 0.2s"
                        }}>{guideChecked ? "Sélectionné" : "Optionnel"}</span>
                        <span style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600 }}>Sur demande</span>
                      </>
                    )}
                  </div>
                </div>
                {isPackL && (
                  <p style={{ fontSize: 12, color: "#059669", marginTop: 6, fontWeight: 600 }}>
                    ✓ Le guide est inclus automatiquement pour les groupes de 9 à 14 personnes
                  </p>
                )}
              </div>

              {/* ── Contact Fields ── */}
              {[
                { label: "Nom complet *", key: "clientName", type: "text", placeholder: "Votre nom complet" },
                { label: "Email *", key: "clientEmail", type: "email", placeholder: "votre@email.com" },
                { label: "Téléphone *", key: "clientPhone", type: "tel", placeholder: "+216 XX XXX XXX" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    required
                    value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "8px",
                      border: "1.5px solid #d1d5db", fontSize: 14, outline: "none",
                      fontFamily: "inherit"
                    }}
                  />
                </div>
              ))}

              {/* Date */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Date souhaitée *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1.5px solid #d1d5db", fontSize: 14, outline: "none",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Notes / Demandes spéciales</label>
                <textarea
                  placeholder="Point de prise en charge, besoins particuliers..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1.5px solid #d1d5db", fontSize: 14, outline: "none",
                    fontFamily: "inherit", resize: "vertical"
                  }}
                />
              </div>

              {/* ── Price Summary ── */}
              <div style={{
                background: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
                borderRadius: 14, padding: "16px 20px",
                border: "1.5px solid #c4b5fd",
                marginBottom: 20
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#6b21a8", fontWeight: 600 }}>
                    {PACK_INFO[pack].label} — {PACK_INFO[pack].people}
                  </span>
                  {isPackL && excursion.packs.l !== 0 && (
                    <span style={{ fontSize: 12, color: "#7c3aed" }}>
                      {participants} × {excursion.packs.l}€
                    </span>
                  )}
                </div>
                {guideChecked && !isPackL && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7c3aed", marginBottom: 8 }}>
                    <span>+ Guide touristique</span>
                    <span>Sur demande</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #c4b5fd", paddingTop: 10 }}>
                  <span style={{ fontSize: 15, color: "#6b21a8", fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#7c3aed" }}>
                    {totalPrice === 0 ? "Sur demande" : `${totalPrice}€`}
                  </span>
                </div>
              </div>

              {error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", color: "#dc2626", fontSize: 14, marginBottom: 16 }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "14px", borderRadius: "100px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff", border: "none", fontSize: 16, fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                {loading ? "Envoi en cours..." : "✅ Confirmer la réservation"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Excursion Card ───────────────────────────────────────────────────────────
type Excursion2 = (typeof excursions)[0];

interface ExcursionCardProps {
  excursion: Excursion2;
  isExpanded: boolean;
  onToggle: () => void;
  onHeroChange: (img: string) => void;
}

function ExcursionCard({ excursion, isExpanded, onToggle, onHeroChange }: ExcursionCardProps) {
  const [booking, setBooking] = useState(false);

  return (
    <>
      <div
        style={{
          gridColumn: isExpanded ? "1 / -1" : "auto",
          borderRadius: "20px", overflow: "hidden",
          boxShadow: isExpanded ? "0 20px 40px rgba(124,58,237,0.15)" : "0 4px 16px rgba(0,0,0,0.08)",
          border: isExpanded ? "2px solid var(--purple-300)" : "2px solid transparent",
          transition: "all 0.4s ease", background: "#fff",
        }}
        onMouseEnter={() => onHeroChange(excursion.image)}
      >
        {/* Card image */}
        <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
          <img
            src={excursion.image}
            alt={excursion.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
          {/* Price badge — shows starting price */}
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(124,58,237,0.92)", color: "#fff",
            padding: "6px 14px", borderRadius: "100px",
            fontSize: 13, fontWeight: 700, backdropFilter: "blur(8px)"
          }}>
            {excursion.packs.s === 0 ? "Sur demande" : `À partir de ${excursion.packs.s}€`}
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 4px 0", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{excursion.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: 0 }}>⏱ {excursion.duration}</p>
          </div>
        </div>

        {/* Pack price strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          borderBottom: "1px solid #f3f4f6",
          background: "#fafafa",
        }}>
          {(["s", "m", "l"] as Pack[]).map((p) => (
            <div key={p} style={{ padding: "10px 8px", textAlign: "center", borderRight: p !== "l" ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>{PACK_INFO[p].label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#7c3aed" }}>
                {excursion.packs[p] === 0 ? "Sur demande" : p === "l" ? `${excursion.packs.l}€/pers` : `${excursion.packs[p]}€`}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>{PACK_INFO[p].people}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div style={{ padding: "16px 20px 0" }}>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 12px 0" }}>{excursion.tagline}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {excursion.highlights.map(h => (
              <span key={h} style={{ background: "#f3e8ff", color: "#7c3aed", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: "100px" }}>
                ✓ {h}
              </span>
            ))}
          </div>
        </div>

        {/* Expand button */}
        <div style={{ padding: "0 20px 20px" }}>
          <button
            onClick={onToggle}
            style={{
              width: "100%", padding: "10px", borderRadius: "10px",
              border: "1.5px solid var(--purple-300)", background: isExpanded ? "var(--purple-50)" : "#fff",
              color: "var(--purple-700)", fontWeight: 600, fontSize: 14,
              cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            {isExpanded ? "▲ Réduire" : "▼ En savoir plus"}
          </button>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div style={{ padding: "0 24px 28px", borderTop: "1px solid var(--gray-100)" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              marginTop: 24
            }}>
              {/* Left: Description & Videos */}
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 12 }}>📖 Description</h4>
                {excursion.description.split("\n\n").map((p, i) => (
                  <p key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 12 }}>{p}</p>
                ))}

                {excursion.videos && excursion.videos.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 12 }}>🎥 Vidéos de l'excursion</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                      {excursion.videos.map((vid: string) => (
                        <video key={vid} controls style={{ width: "100%", borderRadius: 12, border: "1px solid var(--gray-200)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                          <source src={vid} type="video/mp4" />
                          Votre navigateur ne supporte pas la vidéo.
                        </video>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Itinerary + Book button */}
              <div>
                <div style={{
                  background: "var(--purple-50)", borderRadius: "12px",
                  padding: "20px", border: "1px solid var(--purple-100)"
                }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--purple-700)", marginBottom: 16 }}>
                    📍 Itinéraire de l'excursion
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {excursion.itinerary.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 28, height: 28, minWidth: 28, background: "var(--purple-700)",
                          color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: 12, fontWeight: 700
                        }}>{i + 1}</div>
                        <span style={{ fontSize: 14, color: "#374151", paddingTop: 4, lineHeight: 1.5 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pack pricing table inside expanded */}
                <div style={{ marginTop: 20, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: "#7c3aed", padding: "10px 16px" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>💶 Tarifs par pack</h4>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Pack</th>
                        <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Groupe</th>
                        <th style={{ padding: "10px 14px", textAlign: "right", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderTop: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 700, color: "#7c3aed" }}>Pack S</td>
                        <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>1 – 4 personnes</td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 800, color: "#111827" }}>{excursion.packs.s === 0 ? "Sur demande" : `${excursion.packs.s}€`} {excursion.packs.s !== 0 && <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 400 }}>forfait</span>}</td>
                      </tr>
                      <tr style={{ borderTop: "1px solid #f3f4f6", background: "#fafafa" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 700, color: "#7c3aed" }}>Pack M</td>
                        <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>4 – 8 personnes</td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 800, color: "#111827" }}>{excursion.packs.m === 0 ? "Sur demande" : `${excursion.packs.m}€`} {excursion.packs.m !== 0 && <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 400 }}>forfait</span>}</td>
                      </tr>
                      <tr style={{ borderTop: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 700, color: "#7c3aed" }}>Pack L</td>
                        <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>9 – 14 personnes</td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 800, color: "#111827" }}>{excursion.packs.l === 0 ? "Sur demande" : `${excursion.packs.l}€`} {excursion.packs.l !== 0 && <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 400 }}>/pers · guide inclus</span>}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: 20 }}>
                  <button
                    onClick={() => setBooking(!booking)}
                    style={{
                      width: "100%", padding: "14px", borderRadius: "100px",
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff",
                      border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(124,58,237,0.3)",
                      transition: "transform 0.2s"
                    }}
                    onMouseOver={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    {booking ? "Fermer le formulaire" : "Réserver cette excursion"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {booking && <BookingModal excursion={excursion} onClose={() => setBooking(false)} />}
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ExcursionsClient() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState("/excursions/hero-1.jpg");
  const heroImages = ["/excursions/hero-1.jpg", "/excursions/hero-2.jpg", "/excursions/hero-3.jpg"];

  return (
    <>
      {/* Dynamic Hero Banner */}
      <div style={{ position: "relative", height: "70vh", minHeight: 500, overflow: "hidden" }}>
        <img
          key={heroImage}
          src={heroImage}
          alt="Excursions Tunisie"
          style={{ width: "100%", height: "100%", objectFit: "cover", animation: "fadeInHero 0.8s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px", zIndex: 2
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)", color: "#fff",
            padding: "6px 18px", borderRadius: "100px", fontSize: 13, fontWeight: 600,
            marginBottom: 20
          }}>
            🇹🇳 Excursions en Tunisie
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15, maxWidth: 700 }}>
            Découvrez la Beauté<br />de la Tunisie
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", maxWidth: 580, lineHeight: 1.6, marginBottom: 32 }}>
            Des excursions exceptionnelles avec chauffeurs professionnels multilingues,
            voitures climatisées et guides touristiques experts.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {heroImages.map((img, i) => (
              <button key={i} onClick={() => setHeroImage(img)}
                style={{
                  width: img === heroImage ? 28 : 10,
                  height: 10, borderRadius: "100px",
                  background: img === heroImage ? "#fff" : "rgba(255,255,255,0.5)",
                  border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section style={{ background: "var(--purple-50)", padding: "48px 24px", borderBottom: "1px solid var(--purple-100)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: 16, color: "#111827" }}>
            Votre partenaire de confiance pour explorer la Tunisie
          </h2>
          <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.8 }}>
            Nos chauffeurs professionnels expérimentés parlent plusieurs langues et vous accompagnent
            tout au long de votre excursion. Tarifs simples en 3 packs adaptés à la taille de votre groupe.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            {[
              { icon: "👥", label: "Pack S", sub: "1 – 4 personnes" },
              { icon: "🧑‍🤝‍🧑", label: "Pack M", sub: "4 – 8 personnes" },
              { icon: "🚌", label: "Pack L", sub: "9 – 14 personnes" },
              { icon: "👨‍🏫", label: "Guide", sub: "Sur demande / inclus Pack L" },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excursion Cards Grid */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: 12 }}>Nos Excursions</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto" }}>
              Cliquez sur une excursion pour découvrir le programme complet et réserver
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            {excursions.map(exc => (
              <ExcursionCard
                key={exc.id}
                excursion={exc}
                isExpanded={expandedId === exc.id}
                onToggle={() => setExpandedId(expandedId === exc.id ? null : exc.id)}
                onHeroChange={setHeroImage}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInHero {
          from { opacity: 0; transform: scale(1.03); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
