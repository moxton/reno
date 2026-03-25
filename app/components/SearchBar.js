'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/app/lib/formatters';

export default function SearchBar({ projects = [], placeholder = "Search projects... (e.g., kitchen remodel, roof replacement)" }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.keywords?.some((k) => k.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, projects]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center bg-white rounded-xl border-2 transition-all duration-200 ${
        isFocused ? 'border-accent shadow-lg shadow-accent/10' : 'border-gray-200 shadow-sm'
      }`}>
        {/* Search Icon */}
        <svg
          className="absolute left-4 w-5 h-5 text-muted-light pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full py-4 pl-12 pr-10 bg-transparent text-text text-base placeholder:text-muted-light focus:outline-none"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full text-muted-light hover:text-muted hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 search-dropdown overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.category}/${project.slug}/`}
                    onClick={() => {
                      setQuery('');
                      setIsFocused(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-text">{project.title}</p>
                      <p className="text-xs text-muted capitalize">{project.category.replace('-', ' & ').replace('hvac & energy', 'HVAC & Energy')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary tabular-nums">
                        {formatCurrency(project.nationalAverage)}
                      </p>
                      <p className="text-xs text-muted">avg. cost</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-muted">No projects found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-light mt-1">Try searching for a project type like &ldquo;kitchen&rdquo; or &ldquo;flooring&rdquo;</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
