import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '가자고시원 - 당신의 새로운 시작',
  description: '편안하고 따뜻한 고시원 정보 플랫폼',
  keywords: '고시원, 숙소, 사업주전용, 구인구직, 고시원스토리',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-secondary-200 via-secondary-100 to-primary-200">
          {children}
        </div>
      </body>
    </html>
  )
} 