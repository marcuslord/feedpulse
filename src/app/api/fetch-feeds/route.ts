import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'
import slugify from 'slugify'
import { getServiceClient } from '@/lib/supabase'
import { FEEDS } from '@/lib/feeds'

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['dc:creator', 'creator'],
    ],
  },
})

function extractImage(item: any): string | null {
  if (item.mediaContent?.$.url) return item.mediaContent.$.url
  if (item.mediaThumbnail?.$.url) return item.mediaThumbnail.$.url
  if (item.enclosure?.url) return item.enclosure.url
  const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/i)
  if (imgMatch) return imgMatch[1]
  return null
}

function makeSlug(title: string, date: string): string {
  const base = slugify(title, { lower: true, strict: true, trim: true }).slice(0, 80)
  const timestamp = new Date(date).getTime()
  return `${base}-${timestamp}`
}

async function expandArticle(title: string, description: string, category: string): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a professional news writer. Write clear, factual, engaging news articles. Do not make up facts — only expand on what is provided. Write in a neutral journalistic tone.`
          },
          {
            role: 'user',
            content: `Write a 350-400 word news article based on this headline and summary. Do not add fake quotes or invented facts. Just expand naturally on the information provided.

Headline: ${title}
Summary: ${description}
Category: ${category}

Write the article body only, no headline, no byline.`
          }
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    })

    if (!response.ok) return description
    const data = await response.json()
    return data.choices?.[0]?.message?.content || description
  } catch {
    return description
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getServiceClient()
  let totalInserted = 0
  let totalSkipped = 0
  const errors: string[] = []

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url)

      for (const item of parsed.items.slice(0, 20)) {
        if (!item.title || !item.link) continue

        const title = item.title.trim()
        const description = item.contentSnippet || item.summary || item.content?.replace(/<[^>]+>/g, '').slice(0, 300) || ''
        const publishedAt = item.pubDate || item.isoDate || new Date().toISOString()
        const slug = makeSlug(title, publishedAt)
        const imageUrl = extractImage(item)
        const author = (item as any).creator || (item as any).author || null

        const { data: existing } = await db
          .from('articles')
          .select('id')
          .eq('slug', slug)
          .single()

        if (existing) {
          totalSkipped++
          continue
        }

        // Expand article with Groq
        const expandedContent = await expandArticle(title, description, feed.category)

        const { error } = await db.from('articles').insert({
          slug,
          title,
          description: description.slice(0, 500),
          content: expandedContent,
          image_url: imageUrl,
          source_name: feed.name,
          source_url: item.link,
          category: feed.category,
          author,
          published_at: new Date(publishedAt).toISOString(),
        })

        if (error) {
          if (error.code !== '23505') {
            errors.push(`${feed.name}: ${error.message}`)
          }
        } else {
          totalInserted++
        }
      }
    } catch (err: any) {
      errors.push(`Failed to fetch ${feed.name}: ${err.message}`)
    }
  }

  return NextResponse.json({
    success: true,
    inserted: totalInserted,
    skipped: totalSkipped,
    errors,
    timestamp: new Date().toISOString(),
  })
}