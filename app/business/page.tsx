import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BusinessDashboard from '@/components/business/BusinessDashboard'

export default function BusinessPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BusinessDashboard />
      <Footer />
    </main>
  )
} 