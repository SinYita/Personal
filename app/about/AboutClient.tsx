"use client";
import type { ResumeData } from "@/lib/resumeData";

export default function AboutClient({ resumeData }: { resumeData: ResumeData }) {
  const data = resumeData;

  return (
    <div className="grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section className="space-y-14">
        <header className="space-y-4 border-b border-[var(--border)] pb-8">
          <p className="text-sm text-[var(--muted)]">
            Home <span className="px-2">›</span> About
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">{data.name}</h1>
          <p className="text-lg text-[var(--muted)]">{data.title}</p>
        </header>

        <Section title="Summary">
          <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">{data.summary}</p>
        </Section>

        <Section title="Education">
          <div className="space-y-8">
            {data.education.map((edu, i) => (
              <div key={i} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="font-medium text-[var(--foreground)]">
                    {edu.school}, {edu.degree}
                  </div>
                  <span className="text-sm text-[var(--muted)] font-mono">{edu.duration}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">GPA: {edu.gpa}</p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)]">
                  {edu.highlights.map((h, j) => (
                    <li key={j} className="leading-relaxed">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          <div className="space-y-10">
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="font-medium text-[var(--foreground)]">
                    {exp.title} <span className="text-[var(--muted)] mx-2">@</span> {exp.company}
                  </div>
                  <span className="text-sm text-[var(--muted)] font-mono">{exp.duration}</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)]">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="leading-relaxed">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
            {data.skills.map((group, i) => (
              <div key={i} className="space-y-2 text-sm">
                <div className="font-medium text-[var(--foreground)]">{group.category}</div>
                <div className="text-[var(--muted)] leading-relaxed">
                  {group.items.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12">
            {data.projects.map((proj, i) => (
              <div key={i} className="space-y-2">
                <div className="font-medium text-[var(--foreground)]">{proj.name}</div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{proj.desc}</p>
                <p className="text-xs text-[var(--muted)] font-mono mt-1">{proj.tech}</p>
              </div>
            ))}
          </div>
        </Section>

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
      </section>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
        <section className="border-l border-[var(--border)] pl-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Contact</h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <a href={`mailto:${data.email}`} className="hover:text-[var(--foreground)] transition-colors">{data.email}</a>
            <span>{data.location}</span>
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">{data.github}</a>
          </div>
        </section>

        <section className="border-l border-[var(--border)] pl-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Focus</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Building static-exportable web apps, information-rich layouts, and content systems that feel calm and readable.
          </p>
        </section>

        <section className="border-l border-[var(--border)] pl-4 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Quick Links</h2>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Home</a>
            <a href="/blog" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Blog</a>
            <a href="/projects" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Projects</a>
          </div>
        </section>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 md:gap-12 items-start">
      <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--foreground)] mt-1">
        {title}
      </h2>
      <div className="min-w-0">
        {children}
      </div>
    </section>
  );
}
