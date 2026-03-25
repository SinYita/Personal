import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | SinYita",
  description: "About me / resume",
};

export default function AboutPage() {
  return <AboutClient />;
}
