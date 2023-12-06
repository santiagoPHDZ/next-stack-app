import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import '@/styles/globals.css'
import { cookies } from "next/headers";

// Clerk Auth
import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from '@/trpc/trpc-provider';
import { ThemeProvider } from '@/components/theme-provider';

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
        <TRPCReactProvider cookies={cookies().toString()}>
          <body className={GeistSans.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </TRPCReactProvider>
      </html>
    </ClerkProvider>
  )
}
