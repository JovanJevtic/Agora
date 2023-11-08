import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import './style/style.css'
import Nav from './components/Nav/Nav'
import SessionProvider from './components/SessionProvider'
import { getServerSession } from 'next-auth'
import { ThemeProvider } from "@/app/components/theme-provider"

const inter = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Agora',
  description: 'Agora portal',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <Nav />
            <div style={{height: '10vh'}}></div>
            <main className='container'>
              {children}
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
