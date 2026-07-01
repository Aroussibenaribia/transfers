import ExcursionsClient from "./ExcursionsClient";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

const BASE_URL = "https://www.o-transfert.com";

const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Excursions Tunisie | Kairouan, Dougga, Cap Bon, El Jem — O-Transfert",
    description:
      "Excursions d'une journée en Tunisie avec chauffeur privé : Kairouan & El Jem, Tunis-Carthage, Dougga, Cap Bon, Monastir & Sousse, désert saharien. Tarifs packs groupe.",
  },
  en: {
    title: "Tunisia Excursions | Kairouan, Dougga, Cap Bon, El Jem — O-Transfert",
    description:
      "Day trips in Tunisia with private driver: Kairouan & El Jem, Tunis-Carthage, Dougga, Cap Bon, Monastir & Sousse, Sahara desert. Group pack pricing.",
  },
  de: {
    title: "Ausflüge Tunesien | Kairouan, Dougga, Cap Bon, El Jem — O-Transfert",
    description:
      "Tagesausflüge in Tunesien mit privatem Fahrer: Kairouan, El Jem, Dougga, Cap Bon, Monastir & Sousse, Sahara. Gruppenpreise.",
  },
  ar: {
    title: "رحلات سياحية في تونس | القيروان، دقة، قرقنة، الجم — أو-ترانسفير",
    description:
      "رحلات يومية في تونس مع سائق خاص: القيروان والجم، تونس قرطاج، دقة، كاب بون، المنستير وسوسة، الصحراء.",
  },
  it: {
    title: "Escursioni Tunisia | Kairouan, Dougga, Cap Bon, El Jem — O-Transfert",
    description:
      "Gite di un giorno in Tunisia con autista privato: Kairouan & El Jem, Tunisi-Cartagine, Dougga, Cap Bon, Monastir & Sousse, deserto sahariano.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = META[lang] ?? META.fr;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/excursions`,
      languages: {
        fr: `${BASE_URL}/fr/excursions`,
        en: `${BASE_URL}/en/excursions`,
        de: `${BASE_URL}/de/excursions`,
        ar: `${BASE_URL}/ar/excursions`,
        it: `${BASE_URL}/it/excursions`,
        "x-default": `${BASE_URL}/fr/excursions`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${lang}/excursions`,
      images: [{ url: "/excursions/hero-1.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ExcursionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar" style={{ position: "absolute", top: 0, left: 0, right: 0, background: "transparent", borderBottom: "none", boxShadow: "none", zIndex: 100 }}>
        <a href={`/${lang}`} className="navbar-logo">
          <img src="/logo.png" alt="O-Transfert Logo" style={{ height: 50, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
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
          <img src="/logo.png" alt="O-Transfert Logo" style={{ width: 24, height: 24, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          O-Transfert
        </div>
        <p>{dict.footer.desc}</p>
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 8 }}>Scannez pour visiter notre site</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent("https://www.o-transfert.com")}`}
            alt="O-Transfert QR Code"
            style={{ borderRadius: 6, background: "#fff", padding: 4 }}
          />
        </div>
        <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.35)" }}>
          © {new Date().getFullYear()} O-Transfert. {dict.footer.rights}
        </p>
      </footer>
    </div>
  );
}
