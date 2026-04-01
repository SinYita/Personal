"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { Project } from "@/lib/projects";
import type { PostMeta } from "@/lib/posts";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { FaGraduationCap, FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function HomeClient({ recentPosts, projects }: { recentPosts: PostMeta[], projects: Project[] }) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex flex-col space-y-24 py-16 pb-32">
      {/* Hero Section */}
      <section id="about" className="scroll-mt-32">
        <h1 className="text-2xl font-semibold mb-6">{t.home.heroTitle}</h1>
        <div className="space-y-4 max-w-2xl text-[var(--muted)] leading-relaxed">
          {t.home.heroDesc.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
          <div className="flex gap-5 pt-6 text-[var(--muted)] items-center">
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-8">{t.home.featuredProjects}</h2>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {projects.filter(p => p.featured).map((project) => (
            <div key={project.id} className="group flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <Link 
                  href={project.demo || project.github || "#"} 
                  target={project.demo || project.github ? "_blank" : undefined}
                  className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                >
                  {typeof project.title === 'string' ? project.title : project.title[locale]}
                </Link>
                {project.date && (
                  <span className="text-xs text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                    {project.date}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow">
                {project.description[locale]}
              </p>
              <div className="flex gap-2 flex-wrap text-sm text-[var(--muted)] pt-1">
                {project.techStack.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Writing Section */}
      <section id="blog" className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-8">{t.home.recentBlog}</h2>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
             <div key={post.slug} className="group">
               <Link href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between transition-colors">
                 <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                   {post.title}
                 </span>
                 <span className="text-sm text-[var(--muted)] mt-1 sm:mt-0">{post.date}</span>
               </Link>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
