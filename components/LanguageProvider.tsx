"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Locale = "zh" | "en";

type Dictionary = {
  nav: {
    title: string;
    home: string;
    resume: string;
    projects: string;
    blog: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  zh: {
    nav: {
      title: "SinYita",
      home: "首页",
      resume: "简历",
      projects: "项目",
      blog: "博客",
    },
  },
  en: {
    nav: {
      title: "SinYita",
      home: "Home",
      resume: "Resume",
      projects: "Projects",
      blog: "Blog",
    },
  },
};

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "zh" || saved === "en") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem("locale", nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
