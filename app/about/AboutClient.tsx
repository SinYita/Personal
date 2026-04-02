"use client";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { FaGraduationCap, FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import type { ResumeData } from "@/lib/resumeData";

export default function AboutClient({ resumeData }: { resumeData: ResumeData }) {
  const data = resumeData;

  return (
    <div className="flex flex-col space-y-12 pb-20">
      {/* Header */}
      <section className="space-y-4 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Hi, I&apos;m SinYita</h1>
        <div className="space-y-4 text-[var(--muted)] leading-relaxed max-w-3xl text-base">
          <p>Full-stack Developer, ML Enthusiast, and Technical Writer.</p>
          <p>
            I build practical web products with modern React and Next.js, while exploring AI/ML in real
            projects. This site is where I share my work, ideas, and technical notes.
          </p>
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

      {/* Education */}
      <Section title="Education">
        <div className="space-y-8">
          {data.education.map((edu, i) => (
            <article key={i} className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {edu.degree}, {edu.school}{edu.location ? `, ${edu.location}` : ""}.
                </h3>
                <p className="text-sm text-[var(--muted)] font-mono mt-1">{edu.duration}</p>
              </div>
              {edu.gpa ? (
                <p className="text-sm text-[var(--muted)]">
                  GPA: <span className="italic">{edu.gpa}</span>
                </p>
              ) : null}
              {edu.summary ? (
                <p className="text-sm text-[var(--muted)] leading-relaxed">{edu.summary}</p>
              ) : null}
              {edu.highlights && edu.highlights.length > 0 ? (
                <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)] leading-relaxed">
                  {edu.highlights.map((h, j) => (
                    <li key={j}>{toDisplayText(h)}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="space-y-10">
          {data.experience.map((exp, i) => (
            <article key={i} className="space-y-5">
              <div>
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {exp.title}, {exp.company}{exp.location ? `, ${exp.location}` : ""}.
                </h3>
                <p className="text-sm text-[var(--muted)] font-mono mt-1">{exp.duration}</p>
              </div>
              {exp.tools && exp.tools.length > 0 ? (
                <p className="text-sm text-[var(--muted)]">
                  Tools used: <span className="italic">{exp.tools.join(", ")}.</span>
                </p>
              ) : null}
              {exp.summary ? (
                <p className="text-sm text-[var(--muted)] leading-relaxed">{exp.summary}</p>
              ) : null}
              {exp.highlights && exp.highlights.length > 0 ? (
                <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)] leading-relaxed">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{toDisplayText(h)}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="grid sm:grid-cols-2 gap-y-6 gap-x-10">
          {data.skills.map((group, i) => (
            <div key={i} className="space-y-2 text-sm">
              <div className="font-medium text-[var(--foreground)]">{group.category}</div>
              <div className="text-[var(--muted)] leading-relaxed">
                {group.items.map((item) => toDisplayText(item)).join(", ")}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <div className="grid sm:grid-cols-2 gap-y-8 gap-x-10">
          {data.projects.map((proj, i) => (
            <div key={i} className="space-y-2">
              <div className="font-medium text-[var(--foreground)]">{proj.name}</div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{proj.desc}</p>
              <p className="text-xs text-[var(--muted)] font-mono mt-1">{proj.tech}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section title="Languages">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          {data.languages.map((l, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium text-[var(--foreground)]">{l.lang}</span>
              <span className="ml-3 text-[var(--muted)]">{l.level}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)]">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function toDisplayText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 1) {
      const [k, v] = entries[0];
      return `${k}: ${toDisplayText(v)}`;
    }
    return entries.map(([k, v]) => `${k}: ${toDisplayText(v)}`).join(", ");
  }
  return "";
}
