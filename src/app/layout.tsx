import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './navbar'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chicago Crime Analysis',
  description: 'Created by Arvind!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
