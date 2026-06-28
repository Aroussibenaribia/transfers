import BookingForm from "@/components/BookingForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/dictionaries";
import HomeHero from "@/components/HomeHero";
import TripAdvisorSection from "@/components/TripAdvisorSection";
import ContactSection from "@/components/ContactSection";
import CustomerVideosSection from "@/components/CustomerVideosSection";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar" style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        padding: "0 5%",
        height: "76px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)"
      }}>
        <a href={`/${lang}`} className="navbar-logo" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Transfert Tunisie Logo" style={{ height: 48, width: "auto", objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href={`/${lang}/excursions`} style={{ color: "var(--purple-700)", fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s" }}>
            🗺️ <span>Excursions</span>
          </a>
          <span className="badge badge-green" style={{ display: "none" }}>✓ {dict.navbar.available}</span>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>

      {/* Hero */}
      <HomeHero dict={dict} />

      {/* Booking Form */}
      <BookingForm />

      {/* Customer Videos */}
      <CustomerVideosSection />

      {/* Excursions Teaser */}
      <section style={{ padding: "72px 24px", background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/excursions/hero-2.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#e9d5ff", padding: "6px 18px", borderRadius: "100px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Découvrez la Tunisie</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: 12 }}>Nos Excursions Touristiques</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>Explorez les merveilles de la Tunisie avec nos chauffeurs professionnels et guides experts</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
            {[
              { name: "Grand Tunis", desc: "Carthage, Sidi Bou Saïd & Médina", img: "/excursions/grand-tunis.jpg", price: "55€" },
              { name: "El Jem", desc: "Kairouan & Colossée romain", img: "/excursions/eljem.jpg", price: "60€" },
              { name: "Cap Bon", desc: "Hammamet, Nabeul & Kélibia", img: "/excursions/cap-bon.jpg", price: "45€" },
            ].map(exc => (
              <a key={exc.name} href={`/${lang}/excursions`} style={{ textDecoration: "none", display: "block", borderRadius: "16px", overflow: "hidden", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", transition: "transform 0.3s", backdropFilter: "blur(10px)" }}>
                <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                  <img src={exc.img} alt={exc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(124,58,237,0.9)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: 13, fontWeight: 700 }}>À partir de {exc.price}</div>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: "0 0 6px 0" }}>{exc.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0 }}>{exc.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href={`/${lang}/excursions`} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#7c3aed", padding: "14px 36px", borderRadius: "100px", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transition: "all 0.2s" }}>
              Voir toutes nos excursions →
            </a>
          </div>
        </div>
      </section>

      {/* TripAdvisor Reviews */}
      <TripAdvisorSection dict={dict} />

      {/* Contact Info */}
      <ContactSection />



      {/* Footer */}
      <footer
        style={{
          background: "var(--gray-900)",
          color: "rgba(255,255,255,.6)",
          padding: "32px 24px",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        <div style={{ marginBottom: 8, color: "#fff", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 24, height: 24, objectFit: "contain", filter: "brightness(0) invert(1)" }} /> 
          Transfert Tunisie
        </div>
        <p>{dict.footer.desc}</p>
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 8 }}>Scannez pour visiter notre site</p>
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent("https://transfert-tunisie.com")}`} 
            alt="Site QR Code" 
            style={{ borderRadius: 6, background: "#fff", padding: 4 }} 
          />
        </div>
        <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.35)" }}>
          © {new Date().getFullYear()} Transfert Tunisie. {dict.footer.rights}
        </p>
      </footer>
    </div>
  );
}
