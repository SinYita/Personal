"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const localeLabels = { zh: "中文", en: "EN" } as const;
  const locales = ["zh", "en"] as const;

  // Prevent hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  const isHome = pathname === "/";
  const navLinks = [
    { href: isHome ? "#about" : "/#about", label: t.nav.home },
    { href: isHome ? "#projects" : "/#projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
      <nav className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <ul className="flex gap-4 sm:gap-6 text-sm font-medium text-[var(--muted)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[var(--foreground)] transition-colors pb-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-sm font-medium px-2 py-1 rounded transition-colors text-[var(--muted)] hover:text-[var(--foreground)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="text-sm font-medium px-2 py-1 rounded transition-colors text-[var(--muted)] hover:text-[var(--foreground)] lowercase"
            >
              {localeLabels[locale as keyof typeof localeLabels]}
            </button>
            {showLanguageMenu && (
              <div className="absolute top-full right-0 mt-2 min-w-max rounded-md shadow-sm z-10 bg-[var(--background)] border border-[var(--border)] overflow-hidden">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-[var(--code-bg)] transition-colors lowercase"
                    style={{
                      color: locale === loc ? "var(--foreground)" : "var(--muted)",
                      fontWeight: locale === loc ? 600 : 400
                    }}
                    onClick={() => {
                      setLocale(loc);
                      setShowLanguageMenu(false);
                    }}
                  >
                    {localeLabels[loc as keyof typeof localeLabels]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
