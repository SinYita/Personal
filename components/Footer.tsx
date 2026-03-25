export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
        background: "var(--card-bg)",
      }}
      className="py-6 text-center text-sm"
    >
      <p>© {new Date().getFullYear()} My Personal Website · Built with Next.js</p>
    </footer>
  );
}
