import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'llai App',
  description: 'Created by Perla',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
