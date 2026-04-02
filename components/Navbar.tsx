"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "BLOGS" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === "/blog" || href === "/gallery") return pathname.startsWith(href);
    return pathname === href;
  };

  return (
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 w-full lg:w-64 bg-[var(--background)]/95 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-full flex-col items-center px-5 py-8 lg:px-5 lg:py-12 text-center">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 pb-8 lg:pb-12">
          <Link
            href="/"
            aria-label="Go to home"
            className="h-20 w-20 overflow-hidden rounded-full border-2 border-[var(--border)] transition-transform duration-300 hover:scale-110"
          >
            <Image
              src={`${basePath}/assets/profile.jpg`}
              alt="SinYita avatar"
              width={80}
              height={80}
              className="h-full w-full object-cover"
              priority
            />
          </Link>
          <div>
            <h1 className="text-[2rem] font-bold text-[var(--foreground)] leading-none">Weiyuan Du</h1>
            <p className="text-sm text-[var(--muted)] mt-1">Full-stack Developer</p>
          </div>
        </div>

        <nav className="flex-1 w-full flex flex-col items-center">
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-6 text-xs font-semibold tracking-widest uppercase text-[var(--muted)] w-full lg:w-auto">
            {navLinks.map((link) => (
              <li key={link.href} className="relative lg:w-full">
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-active-slider"
                    transition={{ type: "spring", stiffness: 460, damping: 36, mass: 0.7 }}
                    className="absolute inset-0 rounded-sm bg-[var(--accent)]/10"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={link.href}
                  className={`relative z-10 block w-full lg:px-1 py-2 transition-colors rounded-sm hover:text-[var(--foreground)] text-center ${
                    isActive(link.href) ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </Link>
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
