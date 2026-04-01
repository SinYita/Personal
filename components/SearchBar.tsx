"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

type SearchResult = {
  data: () => Promise<{
    url?: string;
    excerpt?: string;
    meta: Record<string, string>;
  }>;
};

type PagefindModule = {
  options: (options: { excerptLength?: number }) => Promise<void>;
  search: (term: string) => Promise<{ results: SearchResult[] }>;
  preload?: (term: string) => Promise<void>;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const loadPagefind = new Function("path", "return import(path)") as (
  path: string,
) => Promise<PagefindModule>;

export default function SearchBar() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pagefindRef = useRef<PagefindModule | null>(null);
  const debounceRef = useRef<number | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ url?: string; excerpt?: string; meta: Record<string, string> }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const pagefind = await loadPagefind(`${basePath}/pagefind/pagefind.js`);
        await pagefind.options({ excerptLength: 80 });
        if (!mounted) return;
        pagefindRef.current = pagefind;
        setIsReady(true);
      } catch (error) {
        console.error("Pagefind failed to load", error);
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
        setResults(resolved);
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
  }, [query]);

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
        <Search aria-hidden="true" className="h-4 w-4 shrink-0" />
        <input
          ref={inputRef}
          type="search"
          placeholder={isReady ? "Search..." : "Loading search..."}
          aria-label="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true);
            }
          }}
          className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
        />
      </label>

      {isOpen && query.trim() && (
        <div className="search-panel absolute right-0 top-full z-50 mt-3 w-[min(42rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="border-b border-[var(--border)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {isLoading ? "Searching..." : isReady ? "Search Results" : "Search unavailable"}
          </div>
          <div className="max-h-[min(70vh,34rem)] overflow-auto p-4">
            {!isReady ? (
              <p className="text-sm text-[var(--muted)]">Search is loading.</p>
            ) : isLoading ? (
              <p className="text-sm text-[var(--muted)]">Searching for “{query.trim()}”...</p>
            ) : results.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No results found for “{query.trim()}”.</p>
            ) : (
              <ul className="space-y-4">
                {results.map((result) => (
                  <li key={result.meta.url || result.meta.title} className="space-y-1 border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0">
                    <a
                      href={result.meta.url || result.url || "#"}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                    >
                      {result.meta.title || result.meta.url || "Untitled result"}
                    </a>
                    {result.excerpt && (
                      <p
                        className="text-sm text-[var(--muted)] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
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
