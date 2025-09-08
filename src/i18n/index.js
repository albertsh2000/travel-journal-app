import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const languageResources = {
  en: () => import("./en.json"),
  ru: () => import("./ru.json"),
  hy: () => import("./hy.json"),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {},
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

const currentLanguage = i18n.language || "en";

languageResources[currentLanguage]().then((translations) => {
  i18n.addResourceBundle(
    currentLanguage,
    "translation",
    translations.default || translations
  );
  i18n.changeLanguage(currentLanguage);
});

export const changeAppLanguage = async (lng) => {
  if (!i18n.hasResourceBundle(lng, "translation")) {
    const translations = await languageResources[lng]();
    i18n.addResourceBundle(
      lng,
      "translation",
      translations.default || translations
    );
  }
  await i18n.changeLanguage(lng);
};

export default i18n;
