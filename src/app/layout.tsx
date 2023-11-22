import type { Metadata } from 'next'
import { Poppins, Hanuman } from 'next/font/google'
import './globals.css'
import './style/style.css'
import Nav from './components/Nav/Nav'
import SessionProvider from './components/SessionProvider'
import { getServerSession } from 'next-auth'
import { ThemeProvider } from "@/app/components/theme-provider"
import Footer from './components/Footer'
import Script from 'next/script'

const inter = Poppins({ subsets: ['latin'], weight: '400' })
export const fraunces = Hanuman({ subsets: ["latin"], weight: "400"  })

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

      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9275537803067099"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q4S936TPXX"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-Q4S936TPXX');
          `}
        </Script>
      </head>

      <body className={`${inter.className} dark:bg-black min-h-screen bg-slate-50`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <div className='flex flex-col min-h-screen'>
              <Nav />
              <div className='h-20'></div>
              <main className='flex-1'>
                {children}
              </main>
              <Footer />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
