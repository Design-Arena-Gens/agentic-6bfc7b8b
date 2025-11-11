import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Calling Agent',
  description: 'Voice-enabled AI assistant that can ask and receive information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
