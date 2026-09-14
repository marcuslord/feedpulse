export type Category = 'crypto' | 'stocks' | 'forex' | 'gaming' | 'tech' | 'ai' | 'world' | 'youtube'

export interface FeedSource {
  name: string
  url: string
  category: Category
}

export const FEEDS: FeedSource[] = [
  // Crypto
  { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss', category: 'crypto' },
  { name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss', category: 'crypto' },
  { name: 'Decrypt', url: 'https://decrypt.co/feed', category: 'crypto' },
  { name: 'The Block', url: 'https://theblock.co/rss.xml', category: 'crypto' },

  // Stocks
  { name: 'Reuters Business', url: 'https://feeds.reuters.com/reuters/businessNews', category: 'stocks' },
  { name: 'Forbes Business', url: 'https://www.forbes.com/business/feed/', category: 'stocks' },
  { name: 'BBC Business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml', category: 'stocks' },

  // Forex
  { name: 'Investing.com', url: 'https://www.investing.com/rss/news_25.rss', category: 'forex' },
  { name: 'FX Street', url: 'https://www.fxstreet.com/rss/news', category: 'forex' },
  { name: 'Bloomberg Markets', url: 'https://feeds.bloomberg.com/markets/news.rss', category: 'forex' },

  // Gaming
  { name: 'IGN', url: 'https://feeds.feedburner.com/ign/all', category: 'gaming' },
  { name: 'PC Gamer', url: 'https://www.pcgamer.com/rss/', category: 'gaming' },
  { name: 'Kotaku', url: 'https://kotaku.com/rss', category: 'gaming' },
  { name: 'The Verge Gaming', url: 'https://www.theverge.com/games/rss/index.xml', category: 'gaming' },

  // Tech / IT
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed', category: 'tech' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'tech' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: 'tech' },

  // AI
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed', category: 'ai' },
  { name: 'Wired AI', url: 'https://www.wired.com/feed/tag/ai/latest/rss', category: 'ai' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', category: 'ai' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/', category: 'ai' },

  // World
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', category: 'world' },
  { name: 'Reuters Top News', url: 'https://feeds.reuters.com/reuters/topNews', category: 'world' },
  { name: 'AP News', url: 'https://rsshub.app/apnews/topics/apf-topnews', category: 'world' },

  
  // YouTube
{ name: 'Tubefilter', url: 'https://www.tubefilter.com/feed/', category: 'youtube' },
{ name: 'Social Media Today', url: 'https://www.socialmediatoday.com/rss/', category: 'youtube' },
{ name: 'Creator Economy', url: 'https://creatoreconomy.so/feed', category: 'youtube' },
{ name: 'Influencer Marketing Hub', url: 'https://influencermarketinghub.com/feed/', category: 'youtube' },
]

export const CATEGORY_META: Record<Category, { label: string; color: string; bg: string; description: string }> = {
  crypto:  { label: 'Crypto',    color: '#F59E0B', bg: 'rgba(245,158,11,0.15)',  description: 'Bitcoin, Ethereum, DeFi and digital asset news' },
  stocks:  { label: 'Stocks',    color: '#10B981', bg: 'rgba(16,185,129,0.15)',  description: 'Stock market, earnings and equity news' },
  forex:   { label: 'Forex',     color: '#2DD4BF', bg: 'rgba(45,212,191,0.15)',  description: 'Currency markets and foreign exchange news' },
  gaming:  { label: 'Gaming',    color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)', description: 'Video game news, releases and industry updates' },
  tech:    { label: 'Tech / IT', color: '#60A5FA', bg: 'rgba(96,165,250,0.15)', description: 'Technology, cybersecurity and IT news' },
  ai:      { label: 'AI',        color: '#EC4899', bg: 'rgba(236,72,153,0.15)', description: 'Artificial intelligence, machine learning and model news' },
  world:   { label: 'World',     color: '#EF4444', bg: 'rgba(239,68,68,0.15)',  description: 'Global news and current events' },
  youtube: { label: 'YouTube',   color: '#FF0000', bg: 'rgba(255,0,0,0.12)',    description: 'Creator economy, YouTube trends and platform news' },
}

export const CATEGORIES = Object.keys(CATEGORY_META) as Category[]
