"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isHome = pathname === "/";
  const navLinks = [
    { href: isHome ? "#about" : "/#about", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
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
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sm font-medium px-2 py-1 rounded transition-colors text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Toggle theme"
          >
            Theme
          </button>
        </div>
      </nav>
    </header>
  );
}
