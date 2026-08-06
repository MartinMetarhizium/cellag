/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  es: {
    nav: { capa: "CAPA", hackathon: "Hackathon", team: "Equipo", mission: "Misión", events: "Eventos", news: "Noticias", join: "Asociate" },
    headerTagline: "Agricultura celular y proteínas alternativas",
    languageLabel: "Cambiar idioma a inglés",
    footerDescription: "Organización sin fines de lucro que impulsa la agricultura celular y las proteínas alternativas.",
    contact: "Contacto",
    capa: {
      congress: "Congreso Argentino de Proteínas Alternativas",
      date: "21–23 de octubre · Buenos Aires",
      countdownLabel: "Cuenta regresiva para CAPA 2026",
      days: "días", hours: "horas", minutes: "min", seconds: "seg",
      firstCongress: "Primer congreso nacional",
      descriptionTitle: "Proteínas alternativas, ciencia e innovación en un mismo lugar",
      description: "El Congreso Argentino de Proteínas Alternativas (CAPA) es el primer congreso nacional dedicado a proteínas alternativas en Argentina, realizado por Cell Ag Argentina y The UNSAM Alt. Protein Project. Se realiza en el marco de Crossing Over LatAm Bioexpo y tendrá lugar en el Centro de Convenciones de Buenos Aires, en Recoleta, los días 21, 22 y 23 de octubre.",
      tickets: "Conseguí tu entrada", discount: "15% de descuento", discountLabel: "Código CAPAXO: 15% de descuento",
      voices: "Voces que transforman", speakers: "Speakers", previous: "Ver speakers anteriores", next: "Ver speakers siguientes", details: "Ver detalles del evento",
    },
  },
  en: {
    nav: { capa: "CAPA", hackathon: "Hackathon", team: "Team", mission: "Mission", events: "Events", news: "News", join: "Join us" },
    headerTagline: "Cellular agriculture and alternative proteins",
    languageLabel: "Switch language to Spanish",
    footerDescription: "A nonprofit organization advancing cellular agriculture and alternative proteins.",
    contact: "Contact",
    capa: {
      congress: "Argentine Alternative Protein Congress",
      date: "October 21–23 · Buenos Aires",
      countdownLabel: "Countdown to CAPA 2026",
      days: "days", hours: "hours", minutes: "min", seconds: "sec",
      firstCongress: "Argentina’s first national congress",
      descriptionTitle: "Alternative proteins, science and innovation in one place",
      description: "The Argentine Alternative Protein Congress (CAPA) is Argentina’s first national congress dedicated to alternative proteins, organized by Cell Ag Argentina and The UNSAM Alt. Protein Project. It takes place within Crossing Over LatAm Bioexpo at the Buenos Aires Convention Center in Recoleta on October 21, 22 and 23.",
      tickets: "Get your ticket", discount: "15% off", discountLabel: "CAPAXO code: 15% off",
      voices: "Voices driving change", speakers: "Speakers", previous: "View previous speakers", next: "View next speakers", details: "View event details",
    },
  },
};

const I18nContext = createContext(null);

function readPath(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem("cellag-locale") || "es");

  useEffect(() => {
    localStorage.setItem("cellag-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    toggleLocale: () => setLocale((current) => current === "es" ? "en" : "es"),
    t: (key) => readPath(translations[locale], key) ?? readPath(translations.es, key) ?? key,
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
