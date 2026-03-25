"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/resume", label: "简历" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{ background: "var(--card-bg)", borderBottom: "1px solid var(--border)" }}
      className="sticky top-0 z-50"
    >
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold"
          style={{ color: "var(--accent)" }}
        >
          个人主页
        </Link>
        <ul className="flex gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium transition-colors px-3 py-1.5 rounded-md"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--foreground)",
                    background: isActive ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
