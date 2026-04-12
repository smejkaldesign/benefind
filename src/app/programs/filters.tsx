"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Search, X } from "lucide-react";

interface ProgramFiltersProps {
  activeCategory?: string;
  searchQuery?: string;
  categories: Array<{ value: string; label: string }>;
}

export function ProgramFilters({
  activeCategory,
  searchQuery,
  categories,
}: ProgramFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchQuery ?? "");

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      startTransition(() => {
        router.push(`/programs?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateParams({ q: query || undefined });
    },
    [query, updateParams],
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search programs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search programs"
          className="w-full rounded-lg border border-border bg-surface-dim py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-text-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              updateParams({ q: undefined });
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Category pills */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <button
          onClick={() => updateParams({ category: undefined })}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-brand text-surface"
              : "bg-surface-bright text-text-muted hover:text-text"
          }`}
        >
          All
        </button>
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() =>
              updateParams({
                category: activeCategory === value ? undefined : value,
              })
            }
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === value
                ? "bg-brand text-surface"
                : "bg-surface-bright text-text-muted hover:text-text"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isPending && (
        <p className="text-xs text-text-subtle animate-pulse">Loading...</p>
      )}
    </div>
  );
}
