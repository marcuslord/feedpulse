import Navbar from '@/components/Navbar'
import CryptoTicker from '@/components/CryptoTicker'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — FeedPulse',
  description: 'FeedPulse is a real-time news aggregator covering crypto, stocks, forex, gaming, tech, AI, world news, and the YouTube creator economy.',
}

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />
      <CryptoTicker />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 4,
            background: 'rgba(59,130,246,0.15)',
            color: '#60A5FA',
            marginBottom: 16,
            display: 'inline-block',
          }}>
            About
          </span>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 36,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.5px',
            marginBottom: 16,
          }}>
            About FeedPulse
          </h1>
          <p style={{ fontSize: 18, color: '#8B9BBE', lineHeight: 1.6 }}>
            Real-time news across every category that matters.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'Lora, serif', fontSize: 16, color: '#C8D4EE', lineHeight: 1.8 }}>
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>What is FeedPulse?</h2>
            <p>FeedPulse is a real-time news aggregator that pulls the latest headlines from trusted sources across crypto, stocks, forex, gaming, tech, AI, world news, and the YouTube creator economy — all in one place.</p>
            <p style={{ marginTop: 12 }}>We built FeedPulse because staying on top of fast-moving news across multiple categories meant jumping between dozens of websites. FeedPulse brings it all together in a clean, fast, distraction-free experience.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Our Sources</h2>
            <p>FeedPulse aggregates content from leading publications including CoinDesk, CoinTelegraph, Bloomberg, TechCrunch, The Verge, Ars Technica, IGN, PC Gamer, BBC News, and many more. We credit every source and link directly to original articles.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>How It Works</h2>
            <p>Our system continuously monitors RSS feeds from top publications across every category. New articles are pulled in automatically, summarized, and published to FeedPulse — giving you a live pulse on what's happening right now without the noise.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Categories We Cover</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Crypto — Bitcoin, Ethereum, DeFi, and digital asset news', 'Stocks — Market movements, earnings, and equity news', 'Forex — Currency markets and foreign exchange', 'Gaming — Video game releases, industry news, and esports', 'Tech / IT — Technology, cybersecurity, and software', 'AI — Artificial intelligence, machine learning, and model releases', 'World — Global news and current events', 'YouTube — Creator economy and platform news'].map(item => (
                <li key={item} style={{ color: '#C8D4EE' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#111827',
            border: '1px solid rgba(59,130,246,0.15)',
            borderRadius: 12,
            padding: 24,
          }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Contact Us</h2>
            <p>Have a question, suggestion, or want to advertise on FeedPulse? Reach out at <a href="mailto:marcus196494@gmail.com" style={{ color: '#60A5FA' }}>marcus196494@gmail.com</a></p>
          </div>
        </div>
      </div>
    </main>
  )
}
