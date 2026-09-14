'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES, CATEGORY_META } from '@/lib/feeds'

export default function Navbar() {
  const pathname = usePathname()
  const activeCat = CATEGORIES.find(c => pathname === `/category/${c}`)

  return (
    <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 10px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Feed<span style={{ color: 'var(--blue)' }}>Pulse</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/about" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Contact</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 20, padding: '4px 10px' }}>
              <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: 12, color: '#10B981', fontWeight: 500 }}>Live Feed</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, paddingBottom: 0, overflowX: 'auto' }}>
          <Link href="/" style={{
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: '8px 8px 0 0',
            color: pathname === '/' ? '#fff' : 'var(--muted)',
            background: pathname === '/' ? 'var(--card)' : 'transparent',
            borderBottom: pathname === '/' ? '2px solid var(--blue)' : '2px solid transparent',
            whiteSpace: 'nowrap',
          }}>
            All
          </Link>
          {CATEGORIES.map(cat => {
            const meta = CATEGORY_META[cat]
            const isActive = activeCat === cat
            return (
              <Link key={cat} href={`/category/${cat}`} style={{
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: '8px 8px 0 0',
                color: isActive ? '#fff' : 'var(--muted)',
                background: isActive ? 'var(--card)' : 'transparent',
                borderBottom: isActive ? `2px solid ${meta.color}` : '2px solid transparent',
                whiteSpace: 'nowrap',
              }}>
                {meta.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
