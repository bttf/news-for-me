"use client";
import { useState } from "react";
import PublicationsSelector from "@/app/PublicationsSelector";

export default function Home() {
  const [query, setQuery] = useState("");
  const [publications, setPublications] = useState<string[]>([]);

  return (
    <div>
      <h1>News for Me</h1>
      <PublicationsSelector
        selectedPublications={publications}
        onChange={setPublications}
      />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <hr />
      <SearchResults query={query} publications={publications} />
    </div>
  );
}
