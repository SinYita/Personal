type TagChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  withHash?: boolean;
  count?: number;
  className?: string;
};

const baseClassName =
  "rounded-full border px-2.5 py-1 text-xs leading-none transition-colors";

export default function TagChip({
  label,
  selected = false,
  onClick,
  withHash = false,
  count,
  className = "",
}: TagChipProps) {
  const text = withHash ? `#${label}` : label;
  const displayText = typeof count === "number" ? `${text} (${count})` : text;

  if (onClick) {
    const stateClassName = selected
      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
      : "border-[var(--border)] bg-[var(--code-bg)] text-[var(--muted)] hover:border-[var(--accent)]";

    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClassName} cursor-pointer ${stateClassName} ${className}`.trim()}
      >
        {displayText}
      </button>
    );
  }

  return (
    <span className={`${baseClassName} border-[var(--border)] bg-[var(--code-bg)] text-[var(--muted)] ${className}`.trim()}>
      {displayText}
    </span>
  );
}
