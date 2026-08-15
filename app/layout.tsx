import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const display = Barlow_Condensed({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'] })
const mono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-technical', weight: ['400', '500'] })

export const metadata: Metadata = {
  title: 'Anshuman Pandey — Cybersecurity / Creative Technology',
  description: 'Portfolio of Anshuman Pandey, an aspiring cybersecurity and SOC professional building digital experiences, security systems and things that should not look boring.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`bg-background ${display.variable} ${mono.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
