"use client";

import { useEffect, useRef, useState } from "react";

type SearchResult = {
  data: () => Promise<{
    url?: string;
    excerpt?: string;
    meta: Record<string, string>;
    sub_results?: Array<{
      title?: string;
      url?: string;
      excerpt?: string;
    }>;
  }>;
};

type PagefindModule = {
  options: (options: { excerptLength?: number }) => Promise<void>;
  search: (term: string) => Promise<{ results: SearchResult[] }>;
  preload?: (term: string) => Promise<void>;
};

type SearchIndexEntry = {
  url: string;
  title: string;
  kind: "blog" | "project";
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const loadPagefind = new Function("path", "return import(path)") as (
  path: string,
) => Promise<PagefindModule>;

function resolveResultUrl(url?: string) {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) {
    return url;
  }

  const absolutePath = url.startsWith("/") ? url : `/${url}`;
  if (basePath && !absolutePath.startsWith(basePath + "/") && absolutePath !== basePath) {
    return `${basePath}${absolutePath}`;
  }
  return absolutePath;
}

export default function SearchBar() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pagefindRef = useRef<PagefindModule | null>(null);
  const searchIndexRef = useRef<Map<string, SearchIndexEntry> | null>(null);
  const debounceRef = useRef<number | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{
    url: string;
    pageTitle: string;
    snippet: string;
  }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const modulePath = `${basePath}/pagefind/pagefind.js`;
        const probe = await fetch(modulePath, { method: "GET", cache: "no-store" });
        if (!probe.ok) {
          if (!mounted) return;
          setIsAvailable(false);
          setIsReady(false);
          return;
        }

        const pagefind = await loadPagefind(modulePath);
        await pagefind.options({ excerptLength: 80 });

        const indexResponse = await fetch(`${basePath}/search-index.json`, { cache: "no-store" });
        if (indexResponse.ok) {
          const entries = (await indexResponse.json()) as SearchIndexEntry[];
          searchIndexRef.current = new Map(
            entries.map((entry) => [normalizeSearchUrl(entry.url), entry])
          );
        } else {
          searchIndexRef.current = new Map();
        }

        if (!mounted) return;
        pagefindRef.current = pagefind;
        setIsReady(true);
        setIsAvailable(true);
      } catch (error) {
        if (!mounted) return;
        setIsAvailable(false);
        setIsReady(false);
      }
    }

    void init();

    return () => {
      mounted = false;
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    const term = query.trim();
    if (!isAvailable) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    if (!term) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsOpen(true);
    setIsLoading(true);

    debounceRef.current = window.setTimeout(async () => {
      const pagefind = pagefindRef.current;
      if (!pagefind) {
        setIsLoading(false);
        return;
      }

      try {
        const searchResult = await pagefind.search(term);
        const resolved = await Promise.all(
          searchResult.results.slice(0, 6).map((result) => result.data())
        );

        const normalized = resolved.map((item) => {
          const primarySubResult = item.sub_results?.[0];
          const preferredUrl = primarySubResult?.url || item.meta.url || item.url;
          const sourceExcerpt = primarySubResult?.excerpt || item.excerpt || "";
          const plainExcerpt = stripHtml(sourceExcerpt);
          const normalizedUrl = normalizeSearchUrl(preferredUrl);
          const title = searchIndexRef.current?.get(normalizedUrl)?.title;

          if (!title) return null;

          return {
            url: resolveResultUrl(preferredUrl),
            pageTitle: title,
            snippet: createSnippet(plainExcerpt, term),
          };
        }).filter((item): item is { url: string; pageTitle: string; snippet: string } => item !== null);

        setResults(normalized);
      } catch (error) {
        console.error("Pagefind search failed", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [query, isAvailable]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="search-shell relative w-full max-w-md">
      <label className="flex w-full items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--code-bg)]/80 px-4 py-2 text-sm text-[var(--muted)] shadow-sm backdrop-blur">
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
          ref={inputRef}
          type="search"
          placeholder={isAvailable ? (isReady ? "Search..." : "Loading search...") : "Search unavailable in dev"}
          aria-label="Search"
          value={query}
          disabled={!isAvailable}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (isAvailable && query.trim()) {
              setIsOpen(true);
            }
          }}
          className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
        />
      </label>

      {isOpen && query.trim() && isAvailable && (
        <div className="search-panel absolute left-0 top-full z-50 mt-3 w-[min(42rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="border-b border-[var(--border)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {isLoading ? "Searching..." : isReady ? "Search Results" : "Search unavailable"}
          </div>
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            onWheelCapture={(event) => event.stopPropagation()}
            className="max-h-[min(70vh,34rem)] overflow-auto overscroll-contain p-4"
          >
            {!isReady ? (
              <p className="text-sm text-[var(--muted)]">Search is loading.</p>
            ) : isLoading ? (
              <p className="text-sm text-[var(--muted)]">Searching for “{query.trim()}”...</p>
            ) : results.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No results found for “{query.trim()}”.</p>
            ) : (
              <ul className="space-y-4">
                {results.map((result) => (
                  <li key={result.url} className="space-y-1 border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0">
                    <a
                      href={result.url}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                    >
                      {result.pageTitle}
                    </a>
                    {result.snippet && (
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{result.snippet}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createSnippet(text: string, term: string, maxLength = 180) {
  if (!text) return "";

  const normalizedText = text.trim();
  const normalizedTerm = term.trim().toLowerCase();

  if (!normalizedTerm) {
    return normalizedText.length > maxLength
      ? `${normalizedText.slice(0, maxLength).trimEnd()}...`
      : normalizedText;
  }

  const lowerText = normalizedText.toLowerCase();
  const index = lowerText.indexOf(normalizedTerm);

  if (index === -1) {
    return normalizedText.length > maxLength
      ? `${normalizedText.slice(0, maxLength).trimEnd()}...`
      : normalizedText;
  }

  const context = Math.floor((maxLength - normalizedTerm.length) / 2);
  const start = Math.max(0, index - context);
  const end = Math.min(normalizedText.length, index + normalizedTerm.length + context);

  const prefix = start > 0 ? "..." : "";
  const suffix = end < normalizedText.length ? "..." : "";
  return `${prefix}${normalizedText.slice(start, end).trim()}${suffix}`;
}

function normalizeSearchUrl(url?: string) {
  if (!url) return "";

  let value = url;
  if (basePath && value.startsWith(basePath)) {
    value = value.slice(basePath.length);
  }

  value = value.split("#")[0].split("?")[0];
  if (value.endsWith("index.html")) {
    value = value.slice(0, -"index.html".length);
  }
  if (value.endsWith(".html")) {
    value = value.slice(0, -".html".length);
  }
  if (!value.startsWith("/")) {
    value = `/${value}`;
  }
  if (value.length > 1 && value.endsWith("/")) {
    value = value.slice(0, -1);
  }

  return value;
}
