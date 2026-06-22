"use client";

export default function TripAdvisorSection({ dict }: { dict: any }) {
  const reviews = [
    {
      author: "Arqam ",
      date: "Juin 2026",
      text: "Service irréprochable ! Le chauffeur nous attendait à l'aéroport malgré notre retard. Véhicule très propre et conduite prudente. Je recommande vivement pour vos transferts en Tunisie.",
      rating: 5,
    },
    {
      author: "Lindsey H",
      date: "Mai 2026",
      text: "Excellente excursion à Carthage et Sidi Bou Saïd. Le guide était passionnant et le van très confortable. Une agence sérieuse sur laquelle on peut compter.",
      rating: 5,
    },
    {
      author: "Seyyid",
      date: "Avril 2026",
      text: "Parfait de bout en bout. Réservation facile en ligne, prix transparents, et un service client très réactif via WhatsApp. Notre transfert vers Hammamet s'est déroulé à merveille.",
      rating: 5,
    },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ 
            display: "inline-flex", alignItems: "center", gap: 12, 
            background: "#fff", padding: "12px 24px", borderRadius: 100,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: 24
          }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} style={{ 
                  width: 20, height: 20, borderRadius: "50%", 
                  background: "#34E0A1", display: "flex", alignItems: "center", justifyContent: "center" 
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              ))}
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>5.0</span>
            <span style={{ width: 1, height: 20, background: "#e5e7eb" }}></span>
            <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" style={{ height: 24 }} />
          </div>
          
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: "#111827", marginBottom: 16 }}>
            Ils nous ont fait confiance
          </h2>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 600, margin: "0 auto" }}>
            Découvrez les avis de nos voyageurs et partez l'esprit tranquille.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48, textAlign: "left" }}>
          {reviews.map((review, idx) => (
            <div key={idx} style={{ 
              background: "#fff", padding: 32, borderRadius: 20, 
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #f3f4f6" 
            }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} style={{ 
                    width: 16, height: 16, borderRadius: "50%", 
                    background: "#34E0A1", display: "flex", alignItems: "center", justifyContent: "center" 
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                ))}
              </div>
              <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.6, marginBottom: 24, fontStyle: "italic" }}>
                "{review.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ 
                  width: 40, height: 40, borderRadius: "50%", background: "var(--purple-100)", 
                  color: "var(--purple-700)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 16
                }}>
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{review.author}</div>
                  <div style={{ color: "#9ca3af", fontSize: 13 }}>{review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a 
          href="https://www.tripadvisor.fr/Attraction_Review-g297943-d32977797-Reviews-O_Transfert_Tunisie-Hammamet_Nabeul_Governorate.html" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#111827", color: "#fff", padding: "14px 32px",
            borderRadius: 100, textDecoration: "none", fontWeight: 600, fontSize: 16,
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          Voir tous les avis sur TripAdvisor
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
