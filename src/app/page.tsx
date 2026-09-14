import { supabase } from '@/lib/supabase'
import { CATEGORIES, CATEGORY_META } from '@/lib/feeds'
import Navbar from '@/components/Navbar'
import CryptoTicker from '@/components/CryptoTicker'
import ArticleCard from '@/components/ArticleCard'
import AdSlot from '@/components/AdSlot'
import Link from 'next/link'

export const revalidate = 300 // Rebuild page every 5 minutes

async function getArticles() {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(60)
  return data || []
}

export default async function HomePage() {
  const articles = await getArticles()

  // Pick the featured article — most recent from any category
  const featured = articles[0] || null

  // Group remaining articles by category, 2 per category
  const byCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = articles.filter(a => a.category === cat && a.id !== featured?.id).slice(0, 4)
    return acc
  }, {} as Record<string, typeof articles>)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />
      <CryptoTicker />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px 60px' }}>

        {/* Featured article */}
        {featured && (
          <div style={{ marginBottom: 40 }}>
            <ArticleCard article={featured} featured />
          </div>
        )}

        <AdSlot slot="banner" />

        {/* Category sections */}
        {CATEGORIES.map(cat => {
          const catArticles = byCategory[cat]
          if (!catArticles?.length) return null
          const meta = CATEGORY_META[cat]

          return (
            <section key={cat} style={{ marginBottom: 48 }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <h2 style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}>
                  {meta.label}
                </h2>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <Link
                  href={`/category/${cat}`}
                  style={{ fontSize: 12, color: meta.color, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 }}
                >
                  See all →
                </Link>
              </div>

              {/* Article grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {catArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )
        })}

        {/* Empty state when no articles yet */}
        {articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📡</div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, color: '#fff', marginBottom: 8 }}>
              Feed is loading
            </h2>
            <p style={{ fontSize: 14 }}>
              Articles will appear here once the RSS fetcher runs.
              <br />Trigger it manually at <code style={{ color: 'var(--blue2)' }}>/api/fetch-feeds</code>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
