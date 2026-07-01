import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://www.o-transfert.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "O-Transfert | Transfert Aéroport Tunisie — Excursions Tunisie",
    template: "%s | O-Transfert Tunisie",
  },
  description:
    "Transfert aéroport en Tunisie : Tunis, Sousse, Djerba, Sfax. Excursions touristiques. Chauffeurs professionnels multilingues, prix fixe, confirmation immédiate. Réservez en ligne.",
  keywords: [
    "transfert aéroport tunisie",
    "transfer airport tunisia",
    "taxi aéroport tunis",
    "transfert tunis carthage",
    "excursion tunisie",
    "excursion kairouan el jem",
    "excursion dougga",
    "excursion cap bon",
    "excursion monastir sousse",
    "chauffeur tunisie",
    "private transfer tunisia",
    "airport taxi tunisia",
    "o-transfert",
    "transfert tunisie pas cher",
  ],
  authors: [{ name: "O-Transfert", url: BASE_URL }],
  creator: "O-Transfert",
  publisher: "O-Transfert",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    alternateLocale: ["en_GB", "de_DE", "ar_TN", "it_IT"],
    url: BASE_URL,
    siteName: "O-Transfert Tunisie",
    title: "O-Transfert | Transfert & Excursions en Tunisie",
    description:
      "Réservez votre transfert aéroport ou excursion en Tunisie. Chauffeurs professionnels, prix transparents, confirmation immédiate.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "O-Transfert — Transfert et Excursions en Tunisie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O-Transfert | Transfert & Excursions Tunisie",
    description:
      "Transfert aéroport et excursions touristiques en Tunisie. Prix fixes, chauffeurs pros multilingues.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      fr: `${BASE_URL}/fr`,
      en: `${BASE_URL}/en`,
      de: `${BASE_URL}/de`,
      ar: `${BASE_URL}/ar`,
      it: `${BASE_URL}/it`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="geo.region" content="TN" />
        <meta name="geo.placename" content="Tunisie" />
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
