import { supabase } from '@/lib/supabase'
import { CATEGORIES, CATEGORY_META, Category } from '@/lib/feeds'
import Navbar from '@/components/Navbar'
import CryptoTicker from '@/components/CryptoTicker'
import ArticleCard from '@/components/ArticleCard'
import AdSlot from '@/components/AdSlot'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 300

type Props = { params: { cat: string } }

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = CATEGORY_META[params.cat as Category]
  if (!meta) return {}
  return {
    title: `${meta.label} News — FeedPulse`,
    description: meta.description,
  }
}

async function getCategoryArticles(cat: string) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('category', cat)
    .order('published_at', { ascending: false })
    .limit(40)
  return data || []
}

export default async function CategoryPage({ params }: Props) {
  if (!CATEGORIES.includes(params.cat as Category)) notFound()

  const cat = params.cat as Category
  const meta = CATEGORY_META[cat]
  const articles = await getCategoryArticles(cat)
  const featured = articles[0] || null
  const rest = articles.slice(1)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />
      <CryptoTicker />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px 60px' }}>

        {/* Category header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 4,
              background: meta.bg,
              color: meta.color,
            }}>
              {meta.label}
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.5px',
            margin: 0,
          }}>
            {meta.label} News
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6 }}>{meta.description}</p>
        </div>

        {/* Featured */}
        {featured && (
          <div style={{ marginBottom: 32 }}>
            <ArticleCard article={featured} featured />
          </div>
        )}

        <AdSlot slot="banner" />

        {/* Article grid */}
        {rest.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {rest.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            <p>No articles yet — check back soon.</p>
          </div>
        )}
      </div>
    </main>
  )
}
