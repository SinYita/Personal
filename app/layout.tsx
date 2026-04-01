import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SearchBar from "@/components/SearchBar";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-[var(--background)] bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="min-h-screen flex flex-col lg:pl-36">
            <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
              <div className="mx-auto flex w-full max-w-5xl justify-end px-6 py-4">
                <SearchBar />
              </div>
            </div>
            <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
