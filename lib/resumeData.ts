import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface ResumeData {
  name: string;
  email: string;
  github: string;
  title: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
  education: Array<{
    degree: LocalizedText;
    school: LocalizedText;
    duration: string;
    gpa: string;
    highlights: { zh: string[]; en: string[] };
  }>;
  experience: Array<{
    title: LocalizedText;
    company: LocalizedText;
    duration: string;
    highlights: { zh: string[]; en: string[] };
  }>;
  skills: Array<{
    category: LocalizedText;
    items: string[];
  }>;
  projects: Array<{
    name: LocalizedText;
    desc: LocalizedText;
    tech: string;
  }>;
  languages: Array<{
    lang: LocalizedText;
    level: LocalizedText;
  }>;
}

const resumeFilePath = path.join(process.cwd(), "content/resume.md");

export function getResumeData(): ResumeData {
  if (!fs.existsSync(resumeFilePath)) {
    throw new Error("Missing content/resume.md");
  }

  const raw = fs.readFileSync(resumeFilePath, "utf-8");
  const { data } = matter(raw);
  return data as ResumeData;
}
