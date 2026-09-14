import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A0F1E',
        card: '#111827',
        card2: '#1a2235',
        pulse: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
