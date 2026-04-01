"use client";
import Link from "next/link";
import Image from "next/image";
import type { ProjectMeta } from "@/lib/projects";
import type { PostMeta } from "@/lib/posts";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { FaGraduationCap, FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function HomeClient({ recentPosts, projects }: { recentPosts: PostMeta[], projects: ProjectMeta[] }) {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <div className="grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section className="space-y-16">
        <header className="space-y-6 border-b border-[var(--border)] pb-10">
          <p className="text-sm text-[var(--muted)]">
            Home <span className="px-2">›</span> Overview
          </p>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-tight">Hi, I&apos;m SinYita</h1>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                Full-stack Developer, ML enthusiast, and technical writer.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                I build practical web products with modern React and Next.js, while exploring AI/ML in real projects.
                This site is where I share my work, ideas, and technical notes.
              </p>
            </div>

            <div className="justify-self-start lg:justify-self-end">
              <div className="relative h-40 w-40 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--code-bg)] shadow-sm">
                <Image
                  src="/assets/avatar.svg"
                  alt="SinYita avatar"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-4 text-[var(--muted)]">
                <a href="https://github.com/SinYita" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors" aria-label="GitHub">
                  <FaGithub className="text-xl" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="hover:text-[#FFA116] transition-colors" aria-label="LeetCode">
                  <SiLeetcode className="text-xl" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="hover:text-[#1F8ACB] transition-colors" aria-label="Codeforces">
                  <SiCodeforces className="text-xl" />
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors" aria-label="University">
                  <FaGraduationCap className="text-2xl" />
                </a>
                <a href="mailto:contact@example.com" className="hover:text-[var(--foreground)] transition-colors" aria-label="Email">
                  <MdEmail className="text-[1.35rem]" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <section id="projects" className="scroll-mt-32 space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
            <Link href="/projects" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              View all
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.id} className="group flex flex-col space-y-3 border-t border-[var(--border)] pt-5">
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                  >
                    {project.title}
                  </Link>
                  {project.date && (
                    <span className="text-xs text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                      {project.date}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="blog" className="scroll-mt-32 space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Writing</h2>
            <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              All posts
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {recentPosts.map((post) => (
              <article key={post.slug} className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </Link>
                <span className="text-sm text-[var(--muted)] font-mono shrink-0">{post.date}</span>
              </article>
            ))}
          </div>
        </section>
      </section>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
        <section className="border-l border-[var(--border)] pl-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Profile</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Focused on building web experiences, technical writing, and practical machine learning workflows.
          </p>
        </section>

        <section className="border-l border-[var(--border)] pl-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Highlights</h2>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>• Next.js static export with GitHub Pages deployment</li>
            <li>• Pagefind-powered site search</li>
            <li>• Chirpy-inspired layout and content organization</li>
          </ul>
        </section>

        <section className="border-l border-[var(--border)] pl-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Quick Links</h2>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/projects" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Projects</Link>
            <Link href="/blog" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Blog</Link>
            <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
          </div>
        </section>
      </aside>
    </div>
  );
}
