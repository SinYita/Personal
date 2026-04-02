"use client";
import type { ResumeData } from "@/lib/resumeData";

export default function AboutClient({ resumeData }: { resumeData: ResumeData }) {
  const data = resumeData;

  return (
    <div className="flex flex-col space-y-16 pb-20">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{data.name}</h1>
          <p className="text-lg text-[var(--muted)]">
            {data.title}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-[var(--muted)] font-mono">
            <a href={`mailto:${data.email}`} className="hover:text-[var(--foreground)] transition-colors">
              {data.email}
            </a>
            <span>{data.location}</span>
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              {data.github}
            </a>
          </div>
        </div>
      </section>

      {/* Summary */}
      <Section title="Summary">
        <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">
          {data.summary}
        </p>
      </Section>

      {/* Education */}
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
                  <li key={j} className="leading-relaxed">{toDisplayText(h)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
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
                  <li key={j} className="leading-relaxed">{toDisplayText(h)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
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
