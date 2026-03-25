"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const localeLabels = { zh: "中文", en: "English" } as const;
  const locales = ["zh", "en"] as const;

  const isHome = pathname === "/";
  // If we are on the homepage we use anchor links, else we navigate to /#section
  const navLinks = [
    { href: isHome ? "#about" : "/#about", label: t.nav.home },
    { href: isHome ? "#projects" : "/#projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/resume", label: t.nav.resume },
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
        
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="text-xs font-medium px-2 py-1 rounded transition-colors text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            {localeLabels[locale as keyof typeof localeLabels]}
          </button>
          {showLanguageMenu && (
            <div
              className="absolute top-full right-0 mt-2 min-w-max rounded-md shadow-sm z-10 bg-[var(--background)] border border-[var(--border)] overflow-hidden"
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className="block w-full text-left px-4 py-2 text-xs hover:bg-[var(--card-bg)] transition-colors"
                  style={{
                    color: locale === loc ? "var(--accent)" : "var(--foreground)",
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
      </nav>
    </header>
  );
}
