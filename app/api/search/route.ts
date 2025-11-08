import { NextRequest, NextResponse } from "next/server";

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

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface GroupedResults {
  publication: string;
  results: SearchResult[];
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { query, publications } = body;

    // Validate inputs
    if (!query || typeof query !== "string" || query.trim() === "") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (
      !publications ||
      !Array.isArray(publications) ||
      publications.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one publication must be selected" },
        { status: 400 }
      );
    }

    // Get API credentials
    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || !searchEngineId) {
      return NextResponse.json(
        { error: "Google API credentials not configured" },
        { status: 500 }
      );
    }

    // Perform searches for each publication
    const searchPromises = publications.map(async (pubSlug: string) => {
      const pub = PUBLICATIONS.find((p) => p.slug === pubSlug);
      if (!pub) {
        return {
          publication: pubSlug,
          results: [],
        };
      }

      const searchQuery = `${query} site:${pub.url}`;
      const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(searchQuery)}&sort=date`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(
            `Search failed for ${pub.name}: ${response.statusText}`
          );
          return {
            publication: pub.name,
            results: [],
          };
        }

        const data = await response.json();
        const results: SearchResult[] = (data.items || []).map(
          (item: any) => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
          })
        );

        return {
          publication: pub.name,
          results,
        };
      } catch (error) {
        console.error(`Search error for ${pub.name}:`, error);
        return {
          publication: pub.name,
          results: [],
        };
      }
    });

    const groupedResults = await Promise.all(searchPromises);

    return NextResponse.json({
      query,
      results: groupedResults,
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
