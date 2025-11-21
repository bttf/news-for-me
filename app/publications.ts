export interface Publication {
  slug: string; // alphanumeric identifier
  name: string; // human-readable name
  url: string; // website URL (to be used with google site operator, e.g. "site:example.com")
  description: string;
  annualCost: number; // annual subscription cost in USD (0 for free)
}

export const AVAILABLE_PUBLICATIONS: Publication[] = [
  {
    slug: "nyt",
    name: "The New York Times",
    url: "nytimes.com",
    description:
      "Founded in 1851 in New York City, the Times has become one of the most widely read newspapers globally with approximately 10 million digital subscribers. Known for its center-left, liberal editorial stance, it offers comprehensive coverage of national and international news. Access requires a subscription at $25/month ($300/year) with a metered paywall that allows several free articles.",
    annualCost: 300,
  },
  {
    slug: "guardian",
    name: "The Guardian",
    url: "theguardian.com",
    description:
      "Established in 1821 in Manchester, UK, the Guardian is a center-left to left-wing progressive publication that reaches approximately 150 million monthly readers worldwide. Uniquely, it operates on a donation-supported model, making all content free to read while encouraging voluntary contributions from readers who value independent journalism.",
    annualCost: 0,
  },
  {
    slug: "bbc",
    name: "BBC News",
    url: "bbc.com/news",
    description:
      "The BBC was established in 1922 as Britain's public service broadcaster and maintains an impartial, centrist position by charter obligation. With roughly 500 million weekly global audience members across all platforms, it's one of the world's most trusted news sources. Content is free internationally, while domestic UK service is funded through TV license fees.",
    annualCost: 0,
  },
  {
    slug: "cnn",
    name: "CNN",
    url: "cnn.com",
    description:
      "Launched in 1980 as the first 24-hour cable news network, CNN maintains a center to center-left editorial position and attracts approximately 120 million monthly digital visitors. Online content is free to access, while live TV streaming requires a cable or streaming service subscription.",
    annualCost: 0,
  },
  {
    slug: "aljazeera",
    name: "Al Jazeera",
    url: "aljazeera.com",
    description:
      "Founded in 1996 in Doha, Qatar, Al Jazeera has grown to reach approximately 430 million people monthly across all platforms. Its political stance varies by region but generally maintains a centrist position with particular focus on Global South perspectives. All content is free to access online.",
    annualCost: 0,
  },
  {
    slug: "economist",
    name: "The Economist",
    url: "economist.com",
    description:
      "Founded in 1843 in London, the Economist espouses classical liberal values—pro-market economics combined with socially progressive positions. With approximately 1.5 million print and digital subscribers, it's known for in-depth analysis and distinctive writing style. Access requires a subscription at roughly $17/month ($200/year) behind a strict paywall.",
    annualCost: 200,
  },
  {
    slug: "bloomberg",
    name: "Bloomberg",
    url: "bloomberg.com",
    description:
      "Founded in 1990 by Michael Bloomberg, Bloomberg News is a global business and financial news leader reaching approximately 72 million monthly visitors. It maintains a centrist, pro-business editorial position focused on comprehensive coverage of markets, economy, and business news. Access requires a subscription at roughly $40/month with a metered paywall allowing limited free articles.",
    annualCost: 480,
  },
  {
    slug: "wsj",
    name: "Wall Street Journal",
    url: "wsj.com",
    description:
      "Founded in 1889 as the flagship publication of Dow Jones & Company, the WSJ is the leading business publication with approximately 3 million digital subscribers. While its editorial page leans center-right, news coverage maintains a centrist approach. Subscription costs around $40/month ($480/year) with a strict paywall.",
    annualCost: 480,
  },
  {
    slug: "ft",
    name: "Financial Times",
    url: "ft.com",
    description:
      "The Financial Times was founded in 1888 in London and holds a center to center-right, pro-business, globalist editorial position. With approximately 1 million digital subscribers, it's renowned for international business and financial coverage. Access requires a premium subscription at roughly $75/month ($900/year) with a metered paywall.",
    annualCost: 900,
  },
  {
    slug: "hn",
    name: "Hacker News",
    url: "news.ycombinator.com",
    description:
      "Founded in 2007 by Paul Graham and Y Combinator, Hacker News is a community-driven social news website focused on computer science, entrepreneurship, and technology. With millions of monthly visitors, it features user-submitted stories ranked by community votes and discussion quality. The platform maintains a tech-centric, intellectually curious culture. All content is completely free to access.",
    annualCost: 0,
  },
];
