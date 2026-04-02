export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-sm text-[var(--muted)] mt-auto bg-transparent">
      <p>© {year} Weiyuan · Built with Next.js and assistance from Copilot, also Effort</p>
    </footer>
  );
}
