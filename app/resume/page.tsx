import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume | SinYita",
  description: "个人简历 / Auto-localized resume",
};

export default function ResumePage() {
  return <ResumeClient />;
}
