"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 w-full lg:w-36 bg-[var(--background)]/95 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-[var(--border)] transition-colors duration-300">
      <div className="flex h-full flex-col px-4 py-4 lg:px-3 lg:py-5">
        <div className="flex items-center gap-3 pb-5 lg:pb-8">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--border)] flex items-center justify-center text-sm font-semibold text-white shadow-lg">
            SN
          </div>
          <div>
            <div className="text-base font-semibold leading-none">SinYita</div>
            <div className="text-[11px] text-[var(--muted)] mt-1 leading-tight">Full-stack Developer</div>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--muted)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2.5 transition-colors border border-transparent ${
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
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <a href="https://github.com/SinYita" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--foreground)] transition-colors">
              <FaGithub className="text-base" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--foreground)] transition-colors">
              <FaLinkedin className="text-base" />
            </a>
            <a href="mailto:contact@example.com" aria-label="Email" className="hover:text-[var(--foreground)] transition-colors">
              <MdEmail className="text-base" />
            </a>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-[11px] font-medium px-2.5 py-2 rounded-full transition-colors text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </aside>
  );
}
