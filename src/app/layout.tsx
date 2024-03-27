import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import '@/styles/globals.css'
import { cookies } from "next/headers";

import { TRPCReactProvider } from '@/trpc/trpc-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

// Metadata
export const metadata: Metadata = {
  title: 'FUTURA',
  description: 'We build the future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <TRPCReactProvider cookies={cookies().toString()}>
        <body className={cn(GeistSans.className, "overflow-y-hidden overflow-x-hidden")}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </TRPCReactProvider>
      </html>
  )
}
