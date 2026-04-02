"use client";

import { useEffect, useMemo, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

const THEME_MODE_KEY = "themeMode";

function getBerlinTheme(): "light" | "dark" {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  return hour >= 18 || hour < 7 ? "dark" : "light";
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    const mode = window.localStorage.getItem(THEME_MODE_KEY);
    if (mode === "manual") {
      setManualMode(true);
    }
  }, []);

  useEffect(() => {
    if (manualMode) return;

    const syncTheme = () => {
      setTheme(getBerlinTheme());
    };

    syncTheme();
    const timer = window.setInterval(syncTheme, 60 * 1000);
    return () => window.clearInterval(timer);
  }, [manualMode, setTheme]);

  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  return (
    <button
      onClick={() => {
        const nextTheme = isDark ? "light" : "dark";
        setManualMode(true);
        window.localStorage.setItem(THEME_MODE_KEY, "manual");
        setTheme(nextTheme);
      }}
      className="text-sm font-medium px-3 py-2 rounded-full transition-colors text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] inline-flex items-center gap-2"
      aria-label="Toggle theme"
      title="Auto sync: Berlin time day/night until manually toggled"
    >
      {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
