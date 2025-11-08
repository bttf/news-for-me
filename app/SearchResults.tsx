"use client";
import { useEffect, useState } from "react";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface PublicationResults {
  publication: string;
  results: SearchResult[];
}

interface SearchResultsProps {
  query: string;
  publications: string[];
}

export default function SearchResults({
  query,
  publications,
}: SearchResultsProps) {
  const [results, setResults] = useState<PublicationResults[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    // Only search if both query and publications are provided
    if (!query.trim() || publications.length === 0) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, publications }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Search failed");
        }

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, publications]);

  const toggleSection = (publication: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(publication)) {
        next.delete(publication);
      } else {
        next.add(publication);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-600">Loading search results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-300 bg-red-50 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!query.trim() || publications.length === 0) {
    return (
      <div className="text-gray-500 text-sm py-4">
        Enter a search query and select at least one publication to see results.
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-gray-500 text-sm py-4">
        No results found. Try a different query or select more publications.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((pubResults) => (
        <div key={pubResults.publication} className="border border-gray-300 rounded">
          <button
            onClick={() => toggleSection(pubResults.publication)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">
                {pubResults.publication}
              </span>
              <span className="text-sm text-gray-500">
                ({pubResults.results.length} result
                {pubResults.results.length !== 1 ? "s" : ""})
              </span>
            </div>
            <span className="text-gray-500">
              {collapsedSections.has(pubResults.publication) ? "▼" : "▲"}
            </span>
          </button>

          {!collapsedSections.has(pubResults.publication) && (
            <div className="border-t border-gray-300">
              {pubResults.results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No results from this publication
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {pubResults.results.map((result, idx) => (
                    <li key={idx} className="px-4 py-3 hover:bg-gray-50">
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h3 className="text-blue-600 hover:underline font-medium mb-1">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {result.snippet}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {result.link}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
