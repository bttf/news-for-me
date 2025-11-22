"use client";
import { useEffect, useState } from "react";
import { AVAILABLE_PUBLICATIONS } from "./publications";

interface PublicationsSelectorProps {
  selectedPublications: string[];
  onChange: (selected: string[]) => void;
}

const STORAGE_KEY = "selected-publications";

export default function PublicationsSelector({
  selectedPublications,
  onChange,
}: PublicationsSelectorProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const handleMouseEnter = (slug: string) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setHoveredSlug(slug);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredSlug(null);
    }, 300); // 300ms delay before hiding
    setHideTimeout(timeout);
  };

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

  const totalAnnualCost = AVAILABLE_PUBLICATIONS.filter((pub) =>
    selectedPublications.includes(pub.slug)
  ).reduce((sum, pub) => sum + pub.annualCost, 0);

  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <h2 className="text-sm font-medium mb-3">Select Publications</h2>
      <div className="flex flex-wrap gap-3">
        {AVAILABLE_PUBLICATIONS.map((pub) => (
          <label
            key={pub.slug}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded transition-colors relative"
            onMouseEnter={() => handleMouseEnter(pub.slug)}
            onMouseLeave={handleMouseLeave}
          >
            <input
              type="checkbox"
              checked={selectedPublications.includes(pub.slug)}
              onChange={() => handleToggle(pub.slug)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm">{pub.name}</span>
            {hoveredSlug === pub.slug && (
              <div
                className="absolute z-10 bg-background border border-foreground/10 rounded-lg shadow-lg p-5 w-96 left-full ml-2 top-0"
                onMouseEnter={() => handleMouseEnter(pub.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="font-semibold text-base mb-3 tracking-wide">
                  {pub.name}
                </h3>
                <p className="text-sm leading-relaxed tracking-wide mb-3">
                  {pub.description}
                </p>
                <a
                  href={`https://${pub.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Visit {pub.name} →
                </a>
              </div>
            )}
          </label>
        ))}
      </div>
      {selectedPublications.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Total annual cost: ${totalAnnualCost.toLocaleString()}
          </div>
          <button
            onClick={handleOpenFrontPages}
            className="text-xs px-2.5 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Open front pages"
          >
            Open Sites
          </button>
        </div>
      )}
    </div>
  );
}
