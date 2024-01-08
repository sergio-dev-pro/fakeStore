import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import {Logo} from '@/components/Logo'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fake store',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <header><Logo/></header>
        <main>{children}</main>
      </body>
    </html>
  )
}
