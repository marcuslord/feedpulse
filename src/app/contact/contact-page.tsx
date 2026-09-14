import Navbar from '@/components/Navbar'
import CryptoTicker from '@/components/CryptoTicker'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — FeedPulse',
  description: 'Get in touch with the FeedPulse team.',
}

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />
      <CryptoTicker />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 40 }}>
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
            Contact
          </span>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 36,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.5px',
            marginBottom: 16,
          }}>
            Get in touch
          </h1>
          <p style={{ fontSize: 18, color: '#8B9BBE', lineHeight: 1.6 }}>
            Have a question, tip, or want to advertise on FeedPulse? We'd love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '✉️', title: 'General Inquiries', desc: 'Questions about FeedPulse or how it works', email: 'marcus196494@gmail.com' },
            { icon: '📢', title: 'Advertising', desc: 'Interested in advertising on FeedPulse', email: 'marcus196494@gmail.com' },
            { icon: '📰', title: 'News Tips', desc: 'Have a story or tip you want covered', email: 'marcus196494@gmail.com' },
            { icon: '🛠️', title: 'Technical Issues', desc: 'Report bugs or technical problems', email: 'marcus196494@gmail.com' },
          ].map(item => (
            <div key={item.title} style={{
              background: '#111827',
              border: '1px solid rgba(59,130,246,0.15)',
              borderRadius: 12,
              padding: 20,
            }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: '#8B9BBE', marginBottom: 12, lineHeight: 1.5 }}>{item.desc}</p>
              <a href={`mailto:${item.email}`} style={{ fontSize: 13, color: '#60A5FA', textDecoration: 'none', fontWeight: 500 }}>{item.email}</a>
            </div>
          ))}
        </div>

        <div style={{
          background: '#111827',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 12,
          padding: 28,
          textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Response Time</h2>
          <p style={{ fontSize: 15, color: '#8B9BBE', lineHeight: 1.6 }}>We typically respond within 24-48 hours. For urgent matters please include "URGENT" in your subject line.</p>
        </div>
      </div>
    </main>
  )
}
