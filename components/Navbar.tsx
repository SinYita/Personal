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
      label: "BLOG",
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
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 w-full lg:w-64 bg-[var(--background)]/95 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-[var(--border)] transition-colors duration-300">
      <div className="flex h-full flex-col items-center px-5 py-8 lg:px-5 lg:py-12 text-center">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 pb-8 lg:pb-12">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--border)] flex items-center justify-center text-2xl font-semibold text-white border-2 border-[var(--border)] transition-transform duration-300 hover:scale-110 cursor-pointer">
            SN
          </div>
          <div>
            <h1 className="text-[2rem] font-bold text-[var(--foreground)] leading-none">SinYita</h1>
            <p className="text-sm text-[var(--muted)] mt-1">Full-stack Developer</p>
          </div>
        </div>

        <nav className="flex-1 w-full flex flex-col items-center">
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-6 text-xs font-semibold tracking-widest uppercase text-[var(--muted)] w-full lg:w-auto">
            {navLinks.map((link) => (
              <li key={link.href} className="lg:w-full">
                {link.children ? (
                  <div className="relative w-full">
                    <Link
                      href={link.href}
                      className={`block w-full lg:px-1 py-2 transition-colors rounded-sm hover:text-[var(--foreground)] text-center ${
                        isActive(link.href)
                          ? "text-[var(--foreground)] border-b-2 border-[var(--accent)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Toggle ${link.label} submenu`}
                      onClick={() => toggleMenu(link.href)}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 px-1 py-2 transition-colors rounded-sm hover:text-[var(--foreground)] ${
                        isActive(link.href)
                          ? "text-[var(--foreground)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      <IoChevronDown
                        className={`transition-transform duration-200 text-xs ${
                          expandedMenu === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block w-full lg:px-1 py-2 transition-colors rounded-sm hover:text-[var(--foreground)] text-center ${
                      isActive(link.href)
                        ? "text-[var(--foreground)] border-b-2 border-[var(--accent)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
                {link.children && expandedMenu === link.href && (
                  <ul className="mt-2 space-y-1 text-xs tracking-[0.12em] normal-case">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-2 py-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-center"
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

        <div className="flex items-center justify-center gap-4 pt-6 lg:pt-8 text-[var(--muted)] w-full">
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
    </aside>
  );
}
