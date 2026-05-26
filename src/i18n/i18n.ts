import enTranslations from "../../locales/en.json";
import idTranslations from "../../locales/id.json";
import jaTranslations from "../../locales/ja.json";
import koTranslations from "../../locales/ko.json";
import thTranslations from "../../locales/th.json";
import zhCNTranslations from "../../locales/zh-CN.json";
import type { TranslationMap } from "../types";

export class I18n {
  private locale: string;
  private translations: Record<string, TranslationMap>;

  constructor(locale: string, customTranslations?: TranslationMap) {
    this.locale = locale;
    this.translations = {
      ja: jaTranslations as TranslationMap,
      en: enTranslations as TranslationMap,
      "zh-CN": zhCNTranslations as TranslationMap,
      ko: koTranslations as TranslationMap,
      th: thTranslations as TranslationMap,
      id: idTranslations as TranslationMap
    };

    if (customTranslations) {
      this.translations[locale] = {
        ...(this.translations[locale] ?? {}),
        ...customTranslations
      };
    }
  }

  setLocale(locale: string): void {
    this.locale = locale;
  }

  t(key: string, params: Record<string, string | number> = {}): string {
    const template =
      this.translations[this.locale]?.[key] ?? this.translations.ja[key] ?? key;

    return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
      String(params[name] ?? "")
    );
  }
}
