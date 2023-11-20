import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '../src/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" })

export const metadata: Metadata = {
  title: 'Reseter',
  description: 'We handle all the heavy lifting of resetting passwords so you can move fast with confidence. all while staying fully GDPR compliant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
          "bg-background text-foreground font-sans antialiased",
          inter.variable
        )}>{children}</body>
    </html>
  )
}
