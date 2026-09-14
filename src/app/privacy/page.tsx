import Navbar from '@/components/Navbar'
import CryptoTicker from '@/components/CryptoTicker'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — FeedPulse',
  description: 'Privacy Policy for FeedPulse — learn how we collect and use data.',
}

export default function PrivacyPage() {
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
            Legal
          </span>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 36,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.5px',
            marginBottom: 16,
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: '#8B9BBE' }}>Last updated: September 14, 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontFamily: 'Lora, serif', fontSize: 16, color: '#C8D4EE', lineHeight: 1.8 }}>
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>1. Introduction</h2>
            <p>FeedPulse ("we", "us", or "our") operates feedpulse.world. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>2. Information We Collect</h2>
            <p>We do not collect personal information directly. However, third-party services we use may collect data:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong style={{ color: '#fff' }}>Google AdSense:</strong> May use cookies to serve relevant ads based on your browsing history.</li>
              <li><strong style={{ color: '#fff' }}>Google Analytics:</strong> May collect anonymized usage data such as pages visited, time on site, and general location.</li>
              <li><strong style={{ color: '#fff' }}>Log Data:</strong> Our servers automatically record information such as your IP address, browser type, and pages visited.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>3. Cookies</h2>
            <p>FeedPulse uses cookies to improve your experience and serve personalized advertisements through Google AdSense. You can control cookie preferences through your browser settings or through our consent management tool.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>4. Third-Party Advertising</h2>
            <p>We use Google AdSense to display advertisements. Google may use cookies and web beacons to collect data and serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" style={{ color: '#60A5FA' }}>Google Ad Settings</a>.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>5. Third-Party Links</h2>
            <p>FeedPulse contains links to third-party websites and news sources. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>6. Data Security</h2>
            <p>We implement reasonable security measures to protect any data collected through our site. However, no method of transmission over the internet is 100% secure.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>7. Children's Privacy</h2>
            <p>FeedPulse is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:marcus196494@gmail.com" style={{ color: '#60A5FA' }}>marcus196494@gmail.com</a></p>
          </div>
        </div>
      </div>
    </main>
  )
}
