import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FeedPulse — Live News Across Crypto, Stocks, Gaming, Tech, AI & More',
  description: 'FeedPulse delivers real-time trending news across crypto, stocks, forex, gaming, tech, AI, world news, and the YouTube creator economy.',
  keywords: 'crypto news, stock market news, gaming news, AI news, tech news, forex news, youtube news, trending news',
  openGraph: {
    title: 'FeedPulse',
    description: 'Real-time trending news across every category',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="uWnyXNN2L8P3wP8VDDQQRpAtYXSHVWLkFxaJTUz9uJU" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1057278110445019"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}