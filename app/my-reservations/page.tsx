import MyReservations from '@/components/MyReservations'
import { mockReservations } from '@/lib/reservation'

export default function MyReservationsPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <MyReservations reservations={mockReservations} />
        </div>
      </div>
    </div>
  )
} 