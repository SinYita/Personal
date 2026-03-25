import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "SinYita",
  description: "Personal website showcasing projects, and blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased selection:bg-[var(--accent)] selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
