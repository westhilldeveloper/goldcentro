import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gold Centro - Buy & Sell Gold | Live Gold Rates',
  description: 'Trusted gold buying and selling platform with live gold rates. Sell gold, release gold, and find nearest branches.',
  keywords: 'gold, buy gold, sell gold, gold rates, gold investment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#f3ff4cff',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}