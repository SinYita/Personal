export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
        background: "var(--card-bg)",
      }}
      className="py-8 text-center text-sm"
    >
      <p>© {year} SinYita · Built with Next.js & React</p>
    </footer>
  );
}
