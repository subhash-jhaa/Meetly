'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type SearchResult = {
  meetingId: string;
  title: string | null;
  startedAt: string;
  snippet: string;
  keyDecisions: string[];
  actionItems: string[];
};

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce — won't hammer the DB on every keystroke

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className="relative w-full max-w-lg">

      {/* Input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search meeting summaries..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg
                     pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500
                     focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2
                          w-3.5 h-3.5 border-2 border-indigo-500
                          border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-2 w-full
                        bg-gray-900 border border-gray-700 rounded-xl
                        shadow-2xl overflow-hidden">
          {results.map(r => (
            <button
              key={r.meetingId}
              onMouseDown={() => router.push(`/meetings/${r.meetingId}/summary`)}
              className="w-full text-left px-4 py-3 hover:bg-gray-800
                         border-b border-gray-800 last:border-0 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">
                  {r.title ?? 'Untitled meeting'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(r.startedAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric',
                  })}
                </span>
              </div>
              {/* ts_headline wraps matched words in <b> tags */}
              <p
                className="text-xs text-gray-400 line-clamp-2 [&>b]:text-indigo-400 [&>b]:font-medium"
                dangerouslySetInnerHTML={{ __html: r.snippet }}
              />
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {open && !loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 top-full mt-2 w-full
                        bg-gray-900 border border-gray-700 rounded-xl
                        shadow-2xl px-4 py-6 text-center">
          <p className="text-sm text-gray-500">No summaries found for "{query}"</p>
        </div>
      )}
    </div>
  );
}