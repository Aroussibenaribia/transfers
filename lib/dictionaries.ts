import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
  it: () => import('@/dictionaries/it.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.fr(); // fallback to French
  }
  return dictionaries[locale]();
};
