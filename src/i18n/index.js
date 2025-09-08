import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const languageResources = {
  en: () => import("./en.json"),
  ru: () => import("./ru.json"),
  hy: () => import("./hy.json"),
};

const setupI18n = async () => {
  const detectedLng =
    localStorage.getItem("i18nextLng") ||
    navigator.language?.split("-")[0] ||
    "en";
  const currentLanguage = Object.keys(languageResources).includes(detectedLng)
    ? detectedLng
    : "en";

  const translations = await languageResources[currentLanguage]();

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        [currentLanguage]: {
          translation: translations.default || translations,
        },
      },
      fallbackLng: "en",
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

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

export const i18nInstance = i18n;
export default setupI18n;
