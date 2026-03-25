"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { resumeData } from "@/lib/resumeData";

export default function ResumeClient() {
  const { t, locale } = useLanguage();
  const data = resumeData;

  const getLocalized = (field: string | { zh: string; en: string }) => {
    if (typeof field === "string") return field;
    return field[locale];
  };

  return (
    <div className="flex flex-col space-y-16 pb-20">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{data.name}</h1>
          <p className="text-lg text-[var(--muted)]">
            {getLocalized(data.title)}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-[var(--muted)] font-mono">
            <a href={`mailto:${data.email}`} className="hover:text-[var(--foreground)] transition-colors">
              {data.email}
            </a>
            <span>{getLocalized(data.location)}</span>
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              {data.github}
            </a>
          </div>
        </div>
        <a
          href="/resume.pdf"
          className="shrink-0 px-4 py-2 text-sm font-medium border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300"
        >
          {t.resumePage.download}
        </a>
      </section>

      {/* Summary */}
      <Section title={t.resumePage.summary}>
        <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">
          {getLocalized(data.summary)}
        </p>
      </Section>

      {/* Education */}
      <Section title={t.resumePage.edu}>
        <div className="space-y-8">
          {data.education.map((edu, i) => (
            <div key={i} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="font-medium text-[var(--foreground)]">
                  {getLocalized(edu.school)}, {getLocalized(edu.degree)}
                </div>
                <span className="text-sm text-[var(--muted)] font-mono">{edu.duration}</span>
              </div>
              <p className="text-sm text-[var(--muted)]">GPA: {edu.gpa}</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)]">
                {(locale === "zh" ? edu.highlights.zh : edu.highlights.en).map((h, j) => (
                  <li key={j} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title={t.resumePage.exp}>
        <div className="space-y-10">
          {data.experience.map((exp, i) => (
            <div key={i} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="font-medium text-[var(--foreground)]">
                  {getLocalized(exp.title)} <span className="text-[var(--muted)] mx-2">@</span> {getLocalized(exp.company)}
                </div>
                <span className="text-sm text-[var(--muted)] font-mono">{exp.duration}</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted)]">
                {(locale === "zh" ? exp.highlights.zh : exp.highlights.en).map((h, j) => (
                  <li key={j} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title={t.resumePage.skills}>
        <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
          {data.skills.map((group, i) => (
            <div key={i} className="space-y-2 text-sm">
              <div className="font-medium text-[var(--foreground)]">{getLocalized(group.category)}</div>
              <div className="text-[var(--muted)] leading-relaxed">
                {group.items.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title={t.resumePage.proj}>
        <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12">
          {data.projects.map((proj, i) => (
            <div key={i} className="space-y-2">
              <div className="font-medium text-[var(--foreground)]">{getLocalized(proj.name)}</div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{getLocalized(proj.desc)}</p>
              <p className="text-xs text-[var(--muted)] font-mono mt-1">{proj.tech}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section title={t.resumePage.lang}>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          {data.languages.map((l, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium text-[var(--foreground)]">{getLocalized(l.lang)}</span>
              <span className="ml-3 text-[var(--muted)]">{getLocalized(l.level)}</span>
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
