export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  region: string;
  category: "Anti-trafficking" | "Migration governance" | "Route risk";
  publishedAt: string;
  url: string;
};

const fallbackNews: NewsItem[] = [
  {
    id: "interpol-global-chain",
    title: "Global enforcement action identifies trafficking victims and launches new investigations",
    summary: "INTERPOL reports coordinated action across 59 countries, highlighting how trafficking networks adapt across borders and exploit vulnerable people.",
    source: "INTERPOL",
    region: "Global",
    category: "Anti-trafficking",
    publishedAt: "2026-07-06T00:00:00.000Z",
    url: "https://www.interpol.int/en/News-and-Events/News/2026/Over-1-000-arrested-in-global-crackdown-on-human-trafficking-networks",
  },
  {
    id: "iom-global-news",
    title: "IOM Global News",
    summary: "Follow official updates on safe migration, displacement, humanitarian response, and protection from the International Organization for Migration.",
    source: "IOM",
    region: "Global",
    category: "Migration governance",
    publishedAt: new Date().toISOString(),
    url: "https://www.iom.int/news",
  },
  {
    id: "un-migration-focus",
    title: "Refugees and migrants: official global coverage",
    summary: "UN News tracks displacement, refugee protection, migrant rights, and international responses across the world.",
    source: "UN News",
    region: "Global",
    category: "Migration governance",
    publishedAt: new Date().toISOString(),
    url: "https://news.un.org/en/focus-topic/refugees-and-migrants",
  },
];

let cache: { expiresAt: number; items: NewsItem[] } | null = null;

function clean(value: string) {
  return value.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

function tag(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return match ? clean(match[1]) : "";
}

async function fetchUnNews(): Promise<NewsItem[]> {
  const response = await fetch("https://news.un.org/feed/subscribe/en/news/all/rss.xml", { signal: AbortSignal.timeout(9000), headers: { "User-Agent": "Project Safe Passage News Monitor/1.0" } });
  if (!response.ok) throw new Error(`UN News responded ${response.status}`);
  const xml = await response.text();
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  const keywords = /(migration|migrant|refugee|traffick|displacement|asylum|smuggl|border)/i;
  return blocks.map((block, index) => {
    const title = tag(block, "title");
    const description = tag(block, "description");
    const url = tag(block, "link");
    const publishedAt = tag(block, "pubDate");
    return { id: `un-${index}-${title.slice(0, 18)}`, title, summary: description, source: "UN News", region: "Global", category: /(traffick|smuggl)/i.test(`${title} ${description}`) ? "Anti-trafficking" : /(border|route|displacement)/i.test(`${title} ${description}`) ? "Route risk" : "Migration governance", publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(), url } satisfies NewsItem;
  }).filter((item) => item.title && item.url && keywords.test(`${item.title} ${item.summary}`));
}

export async function fetchLiveNews(): Promise<NewsItem[]> {
  if (cache && cache.expiresAt > Date.now()) return cache.items;
  try {
    const live = await fetchUnNews();
    const combined = [...live, ...fallbackNews].filter((item, index, array) => array.findIndex((candidate) => candidate.title === item.title) === index).slice(0, 12);
    cache = { expiresAt: Date.now() + 5 * 60 * 1000, items: combined };
    return combined;
  } catch (error) {
    console.warn("[News] Live source unavailable, using official fallback links:", error);
    cache = { expiresAt: Date.now() + 60 * 1000, items: fallbackNews };
    return fallbackNews;
  }
}
