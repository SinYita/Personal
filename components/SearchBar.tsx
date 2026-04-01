export default function SearchBar() {
  return (
    <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--code-bg)]/80 px-4 py-2 text-sm text-[var(--muted)] shadow-sm backdrop-blur">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        placeholder="Search..."
        aria-label="Search"
        className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
      />
    </label>
  );
}
