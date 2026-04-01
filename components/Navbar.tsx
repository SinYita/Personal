"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { GitBranch, Link as LinkIcon, Mail, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 w-full lg:w-72 bg-[var(--background)]/95 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-[var(--border)] transition-colors duration-300">
      <div className="flex h-full flex-col px-5 py-5 lg:px-6 lg:py-8">
        <div className="flex items-center gap-4 pb-6 lg:pb-10">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--border)] flex items-center justify-center text-lg font-semibold text-white shadow-lg">
            SN
          </div>
          <div>
            <div className="text-xl font-semibold leading-none">SinYita</div>
            <div className="text-sm text-[var(--muted)] mt-1">Full-stack Developer</div>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--muted)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 transition-colors border border-transparent ${
                    isActive(link.href)
                      ? "bg-[var(--code-bg)] text-[var(--foreground)] border-[var(--border)]"
                      : "hover:bg-[var(--code-bg)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-4 pt-6 lg:pt-8">
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <a href="https://github.com/SinYita" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--foreground)] transition-colors">
              <GitBranch className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--foreground)] transition-colors">
              <LinkIcon className="h-5 w-5" />
            </a>
            <a href="mailto:contact@example.com" aria-label="Email" className="hover:text-[var(--foreground)] transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sm font-medium px-3 py-2 rounded-full transition-colors text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] inline-flex items-center gap-2"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </aside>
  );
}
