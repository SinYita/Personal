"use client";

import { useEffect, useMemo } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

function getUtc2Theme(): "light" | "dark" {
  const utc2Now = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const hour = utc2Now.getUTCHours();
  return hour >= 18 || hour < 7 ? "dark" : "light";
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getUtc2Theme());
    };

    syncTheme();
    const timer = window.setInterval(syncTheme, 60 * 1000);
    return () => window.clearInterval(timer);
  }, [setTheme]);

  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-sm font-medium px-3 py-2 rounded-full transition-colors text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] inline-flex items-center gap-2"
      aria-label="Toggle theme"
      title="Auto sync: UTC+2 day/night"
    >
      {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
