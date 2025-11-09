"use client";
import { useEffect } from "react";

interface Publication {
  slug: string; // alphanumeric identifier
  name: string; // human-readable name
  url: string; // website URL (to be used with google site operator, e.g. "site:example.com")
}

interface PublicationsSelectorProps {
  selectedPublications: string[];
  onChange: (selected: string[]) => void;
}

const AVAILABLE_PUBLICATIONS: Publication[] = [
  { slug: "nyt", name: "The New York Times", url: "nytimes.com" },
  { slug: "guardian", name: "The Guardian", url: "theguardian.com" },
  { slug: "bbc", name: "BBC News", url: "bbc.com/news" },
  { slug: "cnn", name: "CNN", url: "cnn.com" },
  { slug: "aljazeera", name: "Al Jazeera", url: "aljazeera.com" },
  { slug: "economist", name: "The Economist", url: "economist.com" },
  { slug: "wsj", name: "Wall Street Journal", url: "wsj.com" },
  { slug: "ft", name: "Financial Times", url: "ft.com" },
];

const STORAGE_KEY = "selected-publications";

export default function PublicationsSelector({
  selectedPublications,
  onChange,
}: PublicationsSelectorProps) {
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          onChange(parsed);
        }
      } catch (e) {
        console.error("Failed to parse stored publications:", e);
      }
    }
  }, [onChange]);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    if (selectedPublications.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPublications));
    }
  }, [selectedPublications]);

  const handleToggle = (slug: string) => {
    if (selectedPublications.includes(slug)) {
      onChange(selectedPublications.filter((s) => s !== slug));
    } else {
      onChange([...selectedPublications, slug]);
    }
  };

  const handleOpenFrontPages = () => {
    const selected = AVAILABLE_PUBLICATIONS.filter((pub) =>
      selectedPublications.includes(pub.slug)
    );
    selected.forEach((pub) => {
      window.open(`https://${pub.url}`, "_blank");
    });
  };

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 relative">
      <h2 className="text-sm font-medium mb-3">Select Publications</h2>
      <div className="flex flex-wrap gap-3">
        {AVAILABLE_PUBLICATIONS.map((pub) => (
          <label
            key={pub.slug}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedPublications.includes(pub.slug)}
              onChange={() => handleToggle(pub.slug)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm">{pub.name}</span>
          </label>
        ))}
      </div>
      {selectedPublications.length > 0 && (
        <button
          onClick={handleOpenFrontPages}
          className="absolute bottom-3 right-3 text-xs px-2.5 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          title="Open front pages"
        >
          Open Sites
        </button>
      )}
    </div>
  );
}
