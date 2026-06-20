import BookingForm from "@/components/BookingForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar" style={{ position: "relative" }}>
        <a href={`/${lang}`} className="navbar-logo">
          <img src="/logo.png" alt="Transfert Tunisie Logo" style={{ height: 56, width: "auto", objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="badge badge-green">✓ {dict.navbar.available}</span>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span>🇹🇳</span> {dict.hero.badge}
          </div>
          <h1>{dict.hero.title}</h1>
          <p>{dict.hero.subtitle}</p>
        </div>
      </section>

      {/* Booking Form */}
      <BookingForm />

      {/* Features */}
      <section className="features">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: 12 }}>
            {dict.features.title}
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto" }}>
            {dict.features.subtitle}
          </p>
        </div>
        <div className="features-grid">
          {[
            {
              icon: "⚡",
              title: dict.features.f1_title,
              desc: dict.features.f1_desc,
            },
            {
              icon: "🗺️",
              title: dict.features.f2_title,
              desc: dict.features.f2_desc,
            },
            {
              icon: "🚗",
              title: dict.features.f3_title,
              desc: dict.features.f3_desc,
            },
            {
              icon: "🌍",
              title: dict.features.f4_title,
              desc: dict.features.f4_desc,
            },
            {
              icon: "💳",
              title: dict.features.f5_title,
              desc: dict.features.f5_desc,
            },
            {
              icon: "✈️",
              title: dict.features.f6_title,
              desc: dict.features.f6_desc,
            },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

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
        <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.35)" }}>
          © {new Date().getFullYear()} Transfert Tunisie. {dict.footer.rights}
        </p>
      </footer>
    </div>
  );
}
