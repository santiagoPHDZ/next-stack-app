import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import '@/styles/globals.css'

// Clerk Auth
import { ClerkProvider } from '@clerk/nextjs'

// Metadata
export const metadata: Metadata = {
  title: 'Next Stack App',
  description: 'The best way to get started',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
