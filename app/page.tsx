"use client";
import { useState } from "react";
import PublicationsSelector from "@/app/PublicationsSelector";
import SearchResults from "@/app/SearchResults";

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [publications, setPublications] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSubmittedQuery(query);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">News for Me</h1>
      <PublicationsSelector
        selectedPublications={publications}
        onChange={setPublications}
      />
      <input
        type="text"
        placeholder="Search (press Enter to search)"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SearchResults query={submittedQuery} publications={publications} />
    </div>
  );
}
