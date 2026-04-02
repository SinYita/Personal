"use client";

import { useMemo } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  return (
    <button
      onClick={() => {
        const nextTheme = isDark ? "light" : "dark";
        setTheme(nextTheme);
      }}
      className="text-sm font-medium px-3 py-2 rounded-full transition-colors text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] inline-flex items-center gap-2"
      aria-label="Toggle theme"
      title="Follow system theme by default; click to override"
    >
      {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
