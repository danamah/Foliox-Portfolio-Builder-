import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
 
const LanguageContext = createContext();
 
const SUPPORTED_LANGS = ["en", "ar"];
const STORAGE_KEY = "foliox-lang";
 
export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
 
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(stored) ? stored : "en";
  });
 
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, i18n]);
 
  const toggleLang = () =>
    setLang((prev) => (prev === "en" ? "ar" : "en"));
 
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
 
export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
};