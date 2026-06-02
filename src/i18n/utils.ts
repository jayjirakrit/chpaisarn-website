import { en } from "./en";
import { th } from "./th";
import type { Lang, Translations } from "./types";

const translations: Record<Lang, Translations> = { en, th };

export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale === "th" ? "th" : "en";
}

export function useTranslations(lang: Lang) {
  return function t<K extends keyof Translations>(key: K): Translations[K] {
    return translations[lang][key];
  };
}

/** Given the current pathname and lang, returns the equivalent path in the other language. */
export function getAlternateLangUrl(pathname: string, currentLang: Lang): string {
  if (currentLang === "th") {
    const stripped = pathname.replace(/^\/th/, "") || "/";
    return stripped;
  }
  return "/th" + (pathname === "/" ? "" : pathname);
}

/** Returns an absolute URL for the given lang and path. */
export function breadcrumbUrl(lang: Lang, path: string): string {
  const base = "https://ch-paisarn.com";
  if (lang === "th") {
    return base + "/th" + (path === "/" ? "" : path);
  }
  return base + path;
}
