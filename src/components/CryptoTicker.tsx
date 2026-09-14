'use client'
import { useEffect, useState } from 'react'

type Price = { symbol: string; price: string; change: number }

const COINS = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'ripple', symbol: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'avalanche-2', symbol: 'AVAX' },
]

async function fetchPrices(): Promise<Price[]> {
  const ids = COINS.map(c => c.id).join(',')
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return COINS.map(coin => {
    const d = data[coin.id]
    if (!d) return { symbol: coin.symbol, price: '—', change: 0 }
    const price = d.usd < 1
      ? d.usd.toFixed(4)
      : d.usd < 100
        ? d.usd.toFixed(2)
        : Math.round(d.usd).toLocaleString()
    return { symbol: coin.symbol, price: `$${price}`, change: d.usd_24h_change || 0 }
  })
}

export default function CryptoTicker() {
  const [prices, setPrices] = useState<Price[]>([])

  useEffect(() => {
    fetchPrices().then(setPrices)
    const interval = setInterval(() => fetchPrices().then(setPrices), 60000)
    return () => clearInterval(interval)
  }, [])

  if (!prices.length) return null

  const doubled = [...prices, ...prices]

  return (
    <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', overflow: 'hidden', padding: '8px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--blue2)', letterSpacing: '0.5px', whiteSpace: 'nowrap', flexShrink: 0 }}>MARKETS</span>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div className="ticker-track" style={{ display: 'flex', gap: 28, width: 'max-content' }}>
              {doubled.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{p.symbol}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{p.price}</span>
                  <span style={{ fontSize: 11, color: p.change >= 0 ? '#10B981' : '#EF4444' }}>
                    {p.change >= 0 ? '+' : ''}{p.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
