import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import UtcClock from "@/components/UtcClock";
import SmoothScroll from "@/components/SmoothScroll";
import { getResumeData } from "@/lib/resumeData";

export const metadata: Metadata = {
  title: "SinYita",
  description: "Personal website showcasing projects, and blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resumeData = getResumeData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-[var(--background)] bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll />
          <Navbar profile={resumeData} />
          <div className="min-h-screen flex flex-col lg:pl-64">
            <div className="sticky top-0 z-40 bg-[var(--background)]/85 backdrop-blur-md">
              <div className="mx-auto flex w-full max-w-5xl items-center justify-end gap-3 px-6 py-4">
                <SearchBar />
                <UtcClock />
                <ThemeToggle />
              </div>
            </div>
            <main data-pagefind-body className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
