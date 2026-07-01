import { MetadataRoute } from "next";

const BASE_URL = "https://www.o-transfert.com";
const LOCALES = ["fr", "en", "de", "ar", "it"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home pages per language
  const homePages = LOCALES.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Excursion pages per language
  const excursionPages = LOCALES.map((lang) => ({
    url: `${BASE_URL}/${lang}/excursions`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Individual excursion anchors (still same page but listed for crawlers)
  const excursionIds = ["tunis-carthage", "monastir-sousse", "kairouan-eljem", "cap-bon", "dougga", "deux-jours-desert"];
  const excursionDetailPages = LOCALES.flatMap((lang) =>
    excursionIds.map((id) => ({
      url: `${BASE_URL}/${lang}/excursions#${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...homePages, ...excursionPages, ...excursionDetailPages];
}
