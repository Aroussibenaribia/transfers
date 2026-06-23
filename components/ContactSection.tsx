"use client";

export default function ContactSection() {
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: "#111827", marginBottom: 16 }}>
            Contactez-nous
          </h2>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 600, margin: "0 auto" }}>
            Notre équipe est à votre disposition pour toute demande d'information, de réservation sur mesure ou d'assistance.
          </p>
        </div>

        <div style={{ 
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: 32, alignItems: "center", background: "#f9fafb", padding: 40, borderRadius: 24,
          border: "1px solid #e5e7eb"
        }}>
          
          {/* Info Text */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Nos Coordonnées</h3>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--purple-100)", color: "var(--purple-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  📞
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>+216 55936 028</div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--purple-100)", color: "var(--purple-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  ✉️
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>commercial@smart-tunisia-taxi.com</div>
              </div>
            </div>
            
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Réseaux Sociaux</h3>
              <p style={{ color: "#4b5563", fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>
                Découvrez plus de photos et <strong>d'autres vidéos exclusives</strong> de nos excursions directement sur notre page Instagram !
              </p>
              <a 
                href="https://www.instagram.com/otransfertcommercial/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  color: "#fff", padding: "10px 24px", borderRadius: 100,
                  textDecoration: "none", fontWeight: 600, fontSize: 15,
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                📸 Visitez notre Instagram
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              background: "#fff", padding: 24, borderRadius: 20, 
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)", display: "inline-block" 
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 16px 0" }}>Scannez pour WhatsApp</h4>
              <img 
                src="/qr whatsup.jpg" 
                alt="WhatsApp QR Code" 
                style={{ width: 200, height: 200, objectFit: "contain", borderRadius: 12, border: "1px solid #e5e7eb" }} 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
