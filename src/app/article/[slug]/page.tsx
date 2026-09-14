import { supabase } from '@/lib/supabase'
import { CATEGORY_META, Category } from '@/lib/feeds'
import Navbar from '@/components/Navbar'
import CryptoTicker from '@/components/CryptoTicker'
import AdSlot from '@/components/AdSlot'
import { notFound } from 'next/navigation'
import { formatDistanceToNow, format } from 'date-fns'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: article } = await supabase
    .from('articles')
    .select('title, description, image_url')
    .eq('slug', params.slug)
    .single()
  if (!article) return {}
  return {
    title: `${article.title} — FeedPulse`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

async function getArticle(slug: string) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getRelated(category: string, excludeId: string) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .order('published_at', { ascending: false })
    .limit(5)
  return data || []
}

async function incrementViews(id: string) {
  await supabase.rpc('increment_views', { article_id: id })
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const [related] = await Promise.all([
    getRelated(article.category, article.id),
    incrementViews(article.id),
  ])

  const meta = CATEGORY_META[article.category as Category]
  const fullDate = format(new Date(article.published_at), 'MMM d, yyyy')

  const stopWords = new Set(['the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'but', 'as', 'is', 'it', 'its'])
  const tags: string[] = article.title
    .split(/\s+/)
    .filter((w: string) => w.length > 4 && !stopWords.has(w.toLowerCase()))
    .slice(0, 6)
    .map((w: string) => w.replace(/[^a-zA-Z0-9]/g, ''))
    .filter((w: string) => Boolean(w))

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />
      <CryptoTicker />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 272px', gap: 28 }}>

          <article>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link href={`/category/${article.category}`} style={{ color: meta?.color, textDecoration: 'none' }}>
                {meta?.label}
              </Link>
              <span>›</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                {article.title}
              </span>
            </nav>

            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 10, marginBottom: 20 }}
              />
            )}

            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 4,
              background: meta?.bg || 'rgba(255,255,255,0.1)',
              color: meta?.color || '#fff',
              marginBottom: 12,
            }}>
              {meta?.label}
            </span>

            <h1 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#fff',
              letterSpacing: '-0.3px',
              marginBottom: 16,
            }}>
              {article.title}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '12px 0',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              marginBottom: 20,
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue2)' }}>{article.source_name}</span>
              {article.author && (
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>By {article.author}</span>
              )}
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{fullDate}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 'auto' }}>
                {article.views.toLocaleString()} views
              </span>
            </div>

            <AdSlot slot="banner" />

            <div className="article-body" style={{ fontFamily: 'Lora, serif', fontSize: 16, color: '#C8D4EE' }}>
              <p style={{ marginBottom: '1.25rem' }}>{article.description}</p>
              {article.content ? (
                <div>
                  {article.content.split('\n\n').map((paragraph: string, i: number) => (
                    paragraph.trim()
                      ? <p key={i} style={{ marginBottom: '1.25rem' }}>{paragraph.trim()}</p>
                      : null
                  ))}
                </div>
              ) : (
                <p>This story is developing. For the full article and latest updates, visit the original source below.</p>
              )}
            </div>

            <AdSlot slot="inline" />

            <div style={{
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 28,
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>ORIGINAL SOURCE</div>
                <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>
                  Read the full article on {article.source_name}
                </span>
              </div>
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--blue)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  borderRadius: 6,
                  padding: '6px 14px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Read full article →
              </a>
            </div>

            <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: 10 }}>
                RELATED TOPICS
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '5px 12px',
                    borderRadius: 20,
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <aside>
            <div style={{ position: 'sticky', top: 20 }}>
              <AdSlot slot="sidebar" />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
                  More articles
                </h3>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {related.map(rel => {
                  const relMeta = CATEGORY_META[rel.category as Category]
                  const relTime = formatDistanceToNow(new Date(rel.published_at), { addSuffix: true })
                  return (
                    <Link key={rel.id} href={`/article/${rel.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="article-card" style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: 12,
                        cursor: 'pointer',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '2px 7px',
                            borderRadius: 3,
                            background: relMeta?.bg || 'rgba(255,255,255,0.1)',
                            color: relMeta?.color || '#fff',
                          }}>
                            {relMeta?.label}
                          </span>
                          <span style={{ fontSize: 10, color: 'var(--muted)' }}>{relTime}</span>
                        </div>
                        <h4 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: 'var(--text)', margin: '0 0 4px' }}>
                          {rel.title}
                        </h4>
                        <p style={{ fontSize: 11, color: 'var(--muted)', margin: 0 }}>{rel.source_name}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}
