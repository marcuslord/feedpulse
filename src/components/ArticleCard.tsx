'use client'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Article } from '@/lib/supabase'
import { CATEGORY_META } from '@/lib/feeds'

type Props = {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: Props) {
  const meta = CATEGORY_META[article.category as keyof typeof CATEGORY_META]
  const timeAgo = formatDistanceToNow(new Date(article.published_at), { addSuffix: true })

  return (
    <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
      <div
        className="article-card"
        style={{
          background: featured ? 'var(--card2)' : 'var(--card)',
          border: featured ? '1px solid rgba(59,130,246,0.3)' : '1px solid var(--border)',
          borderRadius: 12,
          padding: featured ? 24 : 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          cursor: 'pointer',
          height: '100%',
        }}
      >
        {featured && article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 4 }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: 4,
            background: meta?.bg || 'rgba(255,255,255,0.1)',
            color: meta?.color || '#fff',
          }}>
            {meta?.label || article.category}
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo}</span>
        </div>

        <h2 style={{
          fontFamily: featured ? 'Manrope, sans-serif' : 'Inter, sans-serif',
          fontSize: featured ? 22 : 15,
          fontWeight: featured ? 800 : 600,
          lineHeight: 1.3,
          color: '#fff',
          letterSpacing: featured ? '-0.3px' : 0,
          margin: 0,
        }}>
          {article.title}
        </h2>

        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
          {article.description.slice(0, 120)}{article.description.length > 120 ? '…' : ''}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid var(--border)',
          marginTop: 'auto',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>{article.source_name}</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {article.views.toLocaleString()} views
          </span>
        </div>
      </div>
    </Link>
  )
}