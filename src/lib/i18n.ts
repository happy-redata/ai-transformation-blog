export const locales = ['da', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'da';

export const localeNames: Record<Locale, string> = {
  da: 'Dansk',
  en: 'English',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export type Dictionary = {
  home: {
    title: string;
    subtitle: string;
    today: string;
    yesterday: string;
    listen: string;
    readMore: string;
    minutes: string;
  };
  nav: {
    signIn: string;
    signOut: string;
    hi: string;
    findStories: string;
  };
  footer: {
    copyright: string;
  };
  dates: {
    dateFormat: string;
  };
  success: {
    title: string;
    description: string;
    confirmation: string;
    whatNext: string;
    nextStep1: string;
    nextStep2: string;
    nextStep3: string;
    homeButton: string;
    loginButton: string;
  };
  values: {
    title1: string;
    desc1: string;
    title2: string;
    desc2: string;
    title3: string;
    desc3: string;
    title4: string;
    desc4: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  da: () => import('@/dictionaries/da.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale];
  if (!loader) {
    // Fallback to default locale if locale is not found
    return dictionaries[defaultLocale]();
  }
  return loader();
}

export function formatDateHeader(dateStr: string, locale: Locale, dictionary: Dictionary): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return dictionary.home.today;
  if (date.toDateString() === yesterday.toDateString()) return dictionary.home.yesterday;

  const localeCode = locale === 'da' ? 'da-DK' : 'en-US';
  return date.toLocaleDateString(localeCode, { weekday: 'long', month: 'long', day: 'numeric' });
}
