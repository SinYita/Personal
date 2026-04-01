import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { getResumeData } from "@/lib/resumeData";

export const metadata: Metadata = {
  title: "About | SinYita",
  description: "About me / resume",
};

export default function AboutPage() {
  const resumeData = getResumeData();
  return <AboutClient resumeData={resumeData} />;
}
