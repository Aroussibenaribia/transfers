import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transfert Tunisie — Réservez votre transfert",
  description:
    "Réservez votre transfert en Tunisie facilement : aéroports, villes, véhicules Éco, Confort ou Van. Confirmation instantanée par email.",
  keywords: "transfert tunisie, taxi tunisie, aéroport tunis, transfert aéroport, réservation voiture tunisie",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
