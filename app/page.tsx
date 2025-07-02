import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import SearchSection from '@/components/SearchSection'
import AvailableRoomsSection from '@/components/AvailableRoomsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <SearchSection />
      <AvailableRoomsSection />
      <Footer />
    </main>
  )
} 