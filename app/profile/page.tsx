import UserProfile from '@/components/UserProfile'
import { mockUsers } from '@/lib/auth'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <UserProfile user={mockUsers[0]} />
      </div>
    </div>
  )
} 