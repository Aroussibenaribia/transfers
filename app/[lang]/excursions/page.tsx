import ExcursionsClient from "./ExcursionsClient";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/dictionaries";

export default async function ExcursionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar" style={{ position: "absolute", top: 0, left: 0, right: 0, background: "transparent", borderBottom: "none", boxShadow: "none", zIndex: 100 }}>
        <a href={`/${lang}`} className="navbar-logo">
          <img src="/logo.png" alt="Logo" style={{ height: 50, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={`/${lang}/excursions`} style={{ color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", background: "rgba(255,255,255,0.2)", padding: "6px 14px", borderRadius: "100px" }}>
            Excursions
          </a>
          <a href={`/${lang}`} style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            ← Réservation transfert
          </a>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>

      <ExcursionsClient />

      {/* Footer */}
      <footer style={{ background: "var(--gray-900)", color: "rgba(255,255,255,.6)", padding: "32px 24px", textAlign: "center", fontSize: 14 }}>
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
