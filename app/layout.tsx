import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Kandid Edit',
  description: 'Design × Storytelling studio: websites, pitch decks, and content systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
