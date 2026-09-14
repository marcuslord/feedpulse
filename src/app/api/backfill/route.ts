import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

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
            content: 'You are a professional news writer. Write clear, factual, engaging news articles. Do not make up facts — only expand on what is provided. Write in a neutral journalistic tone.'
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

    if (!response.ok) return ''
    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  } catch {
    return ''
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getServiceClient()

  const { data: articles } = await db
    .from('articles')
    .select('id, title, description, category')
    .is('content', null)
    .limit(20)

  if (!articles || articles.length === 0) {
    return NextResponse.json({ success: true, message: 'All articles already expanded', expanded: 0 })
  }

  let expanded = 0
  let failed = 0

  for (const article of articles) {
    const content = await expandArticle(article.title, article.description, article.category)
    if (content) {
      await db
        .from('articles')
        .update({ content })
        .eq('id', article.id)
      expanded++
    } else {
      failed++
    }
    await new Promise(r => setTimeout(r, 500))
  }

  return NextResponse.json({
    success: true,
    expanded,
    failed,
    message: `Expanded ${expanded} articles. Run again to continue backfilling.`,
  })
}