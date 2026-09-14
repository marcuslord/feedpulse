'use client'

type AdSlotProps = {
  slot: 'banner' | 'inline' | 'sidebar'
}

// Replace the placeholder divs below with your actual AdSense ad units
// after your site is approved. Each slot type maps to a different ad size.
export default function AdSlot({ slot }: AdSlotProps) {
  const styles: Record<string, React.CSSProperties> = {
    banner: {
      width: '100%',
      height: 90,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    inline: {
      width: '100%',
      height: 90,
      background: 'var(--card2)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 0',
    },
    sidebar: {
      width: '100%',
      height: 280,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
  }

  return (
    <div style={styles[slot]}>
      <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.5px' }}>ADVERTISEMENT</span>
      {/* 
        REPLACE THIS DIV WITH YOUR ADSENSE CODE:
        
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
    </div>
  )
}
