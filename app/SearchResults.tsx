"use client";
import { useEffect, useState } from "react";

interface Publication {
  slug: string;
  name: string;
  url: string;
}

const PUBLICATIONS: Publication[] = [
  { slug: "nyt", name: "The New York Times", url: "nytimes.com" },
  { slug: "guardian", name: "The Guardian", url: "theguardian.com" },
  { slug: "bbc", name: "BBC News", url: "bbc.com/news" },
  { slug: "cnn", name: "CNN", url: "cnn.com" },
  { slug: "aljazeera", name: "Al Jazeera", url: "aljazeera.com" },
  { slug: "economist", name: "The Economist", url: "economist.com" },
  { slug: "wsj", name: "Wall Street Journal", url: "wsj.com" },
  { slug: "ft", name: "Financial Times", url: "ft.com" },
];

interface SearchResultsProps {
  query: string;
  publications: string[];
}

export default function SearchResults({
  query,
  publications,
}: SearchResultsProps) {
  const [lastSearch, setLastSearch] = useState<string>("");
  const [tabsOpened, setTabsOpened] = useState<number>(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!query.trim() || publications.length === 0) {
      return;
    }

    // Only open tabs if this is a new search
    if (query === lastSearch) {
      return;
    }

    setLastSearch(query);
    setBlocked(false);
    let successCount = 0;

    // Open a Google search tab for each selected publication
    publications.forEach((pubSlug) => {
      const pub = PUBLICATIONS.find((p) => p.slug === pubSlug);
      if (pub) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:${pub.url}`;
        const newWindow = window.open(searchUrl, "_blank");

        if (newWindow) {
          successCount++;
        }
      }
    });

    setTabsOpened(successCount);

    // If no tabs opened, likely popup blocked
    if (successCount === 0 && publications.length > 0) {
      setBlocked(true);
    }
  }, [query, publications, lastSearch]);

  if (!query.trim() || publications.length === 0) {
    return (
      <div className="text-gray-500 text-sm py-4">
        Enter a search query and select at least one publication, then press Enter.
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="border border-yellow-300 bg-yellow-50 text-yellow-800 px-4 py-3 rounded">
        <strong>Popup blocked!</strong> Your browser blocked the search tabs. Please allow popups for this site and try again.
      </div>
    );
  }

  if (tabsOpened > 0) {
    return (
      <div className="border border-green-300 bg-green-50 text-green-800 px-4 py-3 rounded">
        ✓ Opened {tabsOpened} search tab{tabsOpened !== 1 ? "s" : ""} for: <strong>{query}</strong>
      </div>
    );
  }

  return null;
}
