import { supabase } from '@/lib/supabase'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://feedpulse-six.vercel.app'

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, published_at')
    .order('published_at', { ascending: false })
    .limit(1000)

  const articleUrls = (articles || []).map(article => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.published_at),
    changeFrequency: 'never' as const,
    priority: 0.7,
  }))

  const categories = ['crypto', 'stocks', 'forex', 'gaming', 'tech', 'ai', 'world', 'youtube']

  const categoryUrls = categories.map(cat => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    ...categoryUrls,
    ...articleUrls,
  ]
}