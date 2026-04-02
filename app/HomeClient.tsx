"use client";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";
import type { PostMeta } from "@/lib/posts";
import type { ResumeData } from "@/lib/resumeData";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { FaGraduationCap, FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function toHttps(url: string) {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) return url;
  return `https://${url}`;
}

export default function HomeClient({
  recentPosts,
  projects,
  resumeData,
}: {
  recentPosts: PostMeta[];
  projects: ProjectMeta[];
  resumeData: ResumeData;
}) {
  return (
    <div className="flex flex-col space-y-24 py-16 pb-32">
      {/* Hero Section */}
      <section id="about" className="scroll-mt-32">
        <div className="space-y-6 max-w-3xl pb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{resumeData.homeHeading}</h1>
            <p>{resumeData.homeSubtitle}</p>
          </div>
          <div className="space-y-4 text-[var(--muted)] leading-relaxed">
            <p>{resumeData.homeSummary}</p>
            <div className="flex gap-5 pt-6 text-[var(--muted)] items-center">
              <a href={toHttps(resumeData.github)} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors" aria-label="GitHub">
                <FaGithub className="text-xl" />
              </a>
              <a href={toHttps(resumeData.linkedin || "")} target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="text-xl" />
              </a>
              <a href={toHttps(resumeData.leetcode || "")} target="_blank" rel="noreferrer" className="hover:text-[#FFA116] transition-colors" aria-label="LeetCode">
                <SiLeetcode className="text-xl" />
              </a>
              <a href={toHttps(resumeData.codeforces || "")} target="_blank" rel="noreferrer" className="hover:text-[#1F8ACB] transition-colors" aria-label="Codeforces">
                <SiCodeforces className="text-xl" />
              </a>
              <a href={toHttps(resumeData.universityLink || "")} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors" aria-label="University">
                <FaGraduationCap className="text-2xl" />
              </a>
              <a href={`mailto:${resumeData.email}`} className="hover:text-[var(--foreground)] transition-colors" aria-label="Email">
                <MdEmail className="text-[1.35rem]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-32">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Featured Projects</h2>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {projects.filter(p => p.featured).map((project) => (
            <article
              key={project.id}
              className="group flex flex-col space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]/30 p-5 sm:p-6 transition-colors hover:border-[var(--accent)]/30"
            >
              <div className="flex items-center gap-3 flex-wrap">
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
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(project.tags.map((tag) => tag.replace(/^#+/, "").trim()).filter(Boolean))).map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                >
                  View Project →
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Writing Section */}
      <section id="blog" className="scroll-mt-32">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Recent Writing</h2>
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
