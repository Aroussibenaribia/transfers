import { getDictionary, Locale } from "@/lib/dictionaries";
import { DictionaryProvider } from "@/components/DictionaryProvider";
import type { Metadata } from "next";

const BASE_URL = "https://www.o-transfert.com";

const META: Record<string, { title: string; description: string; locale: string }> = {
  fr: {
    title: "O-Transfert | Transfert Aéroport & Excursions Tunisie",
    description:
      "Transfert aéroport en Tunisie depuis Tunis, Sousse, Monastir, Djerba. Excursions à Kairouan, El Jem, Dougga, Cap Bon. Chauffeurs professionnels, prix fixe garanti.",
    locale: "fr_TN",
  },
  en: {
    title: "O-Transfert | Airport Transfer & Excursions Tunisia",
    description:
      "Book your airport transfer in Tunisia from Tunis, Sousse, Monastir, Djerba. Day trips to Kairouan, El Jem, Dougga, Cap Bon. Professional drivers, fixed price.",
    locale: "en_GB",
  },
  de: {
    title: "O-Transfert | Flughafentransfer & Ausflüge Tunesien",
    description:
      "Flughafentransfer in Tunesien: Tunis, Sousse, Monastir, Djerba. Ausflüge nach Kairouan, El Jem, Dougga. Professionelle Fahrer, Festpreis.",
    locale: "de_DE",
  },
  ar: {
    title: "أو-ترانسفير | نقل المطار والرحلات السياحية في تونس",
    description:
      "احجز نقلك من مطار تونس قرطاج، المنستير، صفاقس، جربة. رحلات سياحية إلى القيروان، الجم، دقة. سائقون محترفون بأسعار ثابتة.",
    locale: "ar_TN",
  },
  it: {
    title: "O-Transfert | Trasferimento Aeroporto & Escursioni Tunisia",
    description:
      "Prenota il tuo trasferimento aeroportuale in Tunisia da Tunisi, Sousse, Monastir, Djerba. Escursioni a Kairouan, El Jem, Dougga. Autisti professionisti, prezzo fisso.",
    locale: "it_IT",
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
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        de: `${BASE_URL}/de`,
        ar: `${BASE_URL}/ar`,
        it: `${BASE_URL}/it`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${lang}`,
      locale: meta.locale,
      alternateLocale: Object.values(META)
        .map((m) => m.locale)
        .filter((l) => l !== meta.locale),
    },
  };
}

// JSON-LD Structured Data
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristInformationCenter"],
    name: "O-Transfert",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Service de transfert aéroport et d'excursions touristiques en Tunisie. Chauffeurs professionnels multilingues.",
    telephone: "+216-XX-XXX-XXX",
    email: "contact@o-transfert.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
      addressLocality: "Tunis",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.8065,
      longitude: 10.1815,
    },
    areaServed: {
      "@type": "Country",
      name: "Tunisia",
    },
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Transferts & Excursions",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Transfert Aéroport Tunis",
          description: "Transfert privé depuis/vers l'aéroport de Tunis Carthage",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            price: "25",
          },
        },
        {
          "@type": "Offer",
          name: "Excursion Kairouan & El Jem",
          description: "Excursion journée complète Kairouan et amphithéâtre d'El Jem",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            price: "120",
          },
        },
        {
          "@type": "Offer",
          name: "Excursion Dougga",
          description: "Excursion site romain UNESCO de Dougga",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            price: "130",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment réserver un transfert depuis l'aéroport de Tunis ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Réservez en ligne sur o-transfert.com : sélectionnez votre départ, destination, type de véhicule et payez un prix fixe garanti. Confirmation par email immédiate.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles excursions proposez-vous en Tunisie ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nous proposons des excursions à Kairouan & El Jem, Tunis-Carthage-Sidi Bou Saïd, Cap Bon, Monastir & Sousse, Dougga, et des aventures 2 jours dans le désert.",
        },
      },
      {
        "@type": "Question",
        name: "Les prix incluent-ils les frais de guidage ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le transport et le chauffeur professionnel sont inclus dans tous les prix. Le guide touristique est optionnel (sur demande) pour les groupes de 1 à 8 personnes, et obligatoire pour les groupes de 9 à 14 personnes.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <DictionaryProvider dictionary={dictionary}>
      <LocalBusinessSchema />
      <FAQSchema />
      {children}
    </DictionaryProvider>
  );
}
