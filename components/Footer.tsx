export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-sm text-[var(--muted)] mt-auto bg-transparent">
      <p>© {year} SinYita · Built with Next.js</p>
    </footer>
  );
}
