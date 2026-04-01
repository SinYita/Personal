"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    {
      href: "/blog",
      label: "Blog",
      children: [
        { href: "/blog?topic=technical", label: "Technical" },
        { href: "/blog?topic=solutions", label: "Solutions" },
      ],
    },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === "/blog") return pathname.startsWith("/blog");
    return pathname === href;
  };

  const toggleMenu = (href: string) => {
    setExpandedMenu(expandedMenu === href ? null : href);
  };

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
                {link.children ? (
                  <button
                    onClick={() => toggleMenu(link.href)}
                    className={`w-full text-left flex items-center justify-between rounded-xl px-4 py-3 transition-colors border border-transparent ${
                      isActive(link.href)
                        ? "bg-[var(--code-bg)] text-[var(--foreground)] border-[var(--border)]"
                        : "hover:bg-[var(--code-bg)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <IoChevronDown
                      className={`ml-2 transition-transform duration-200 ${
                        expandedMenu === link.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
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
                )}
                {link.children && expandedMenu === link.href && (
                  <ul className="mt-2 ml-4 space-y-1 text-xs tracking-[0.12em] uppercase">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--code-bg)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 pt-6 lg:pt-8">
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <a href="https://github.com/SinYita" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--foreground)] transition-colors">
              <FaGithub className="text-lg" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--foreground)] transition-colors">
              <FaLinkedin className="text-lg" />
            </a>
            <a href="mailto:contact@example.com" aria-label="Email" className="hover:text-[var(--foreground)] transition-colors">
              <MdEmail className="text-[1.1rem]" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
