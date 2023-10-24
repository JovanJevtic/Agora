import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './style/style.css'
import Nav from './components/Nav/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agora',
  description: 'Agora portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div style={{height: '10vh'}}></div>
        <main className='container'>
          {children}
        </main>
      </body>
    </html>
  )
}
