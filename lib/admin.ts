export interface AdminStats {
  totalUsers: number
  totalGosiwons: number
  totalReservations: number
  totalRevenue: number
  monthlyGrowth: {
    users: number
    gosiwons: number
    reservations: number
    revenue: number
  }
  recentActivity: AdminActivity[]
}

export interface AdminActivity {
  id: string
  type: 'user_registration' | 'gosiwon_registration' | 'reservation' | 'payment' | 'review' | 'support'
  title: string
  description: string
  timestamp: string
  userId?: string
  userName?: string
  gosiwonId?: string
  gosiwonName?: string
  amount?: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'general' | 'gosiwon-business' | 'roomshare-business' | 'admin'
  status: 'active' | 'suspended' | 'pending'
  joinDate: string
  lastLogin: string
  reservationCount: number
  reviewCount: number
}

export interface AdminGosiwon {
  id: string
  name: string
  ownerName: string
  ownerEmail: string
  location: string
  status: 'active' | 'pending' | 'suspended'
  registrationDate: string
  reservationCount: number
  rating: number
  reviewCount: number
  monthlyRevenue: number
}

export interface AdminReservation {
  id: string
  gosiwonName: string
  userName: string
  checkIn: string
  checkOut: string
  amount: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  paymentStatus: 'paid' | 'pending' | 'failed'
  createdAt: string
}

// 모의 관리자 통계 데이터
export const mockAdminStats: AdminStats = {
  totalUsers: 1247,
  totalGosiwons: 89,
  totalReservations: 3421,
  totalRevenue: 125000000,
  monthlyGrowth: {
    users: 12.5,
    gosiwons: 8.3,
    reservations: 15.7,
    revenue: 22.1
  },
  recentActivity: [
    {
      id: '1',
      type: 'user_registration',
      title: '새 사용자 등록',
      description: '김철수님이 가입했습니다.',
      timestamp: '2024-01-15T10:30:00Z',
      userId: '1247',
      userName: '김철수'
    },
    {
      id: '2',
      type: 'gosiwon_registration',
      title: '새 고시원 등록',
      description: '강남역 프리미엄 고시원이 등록되었습니다.',
      timestamp: '2024-01-15T09:15:00Z',
      gosiwonId: '89',
      gosiwonName: '강남역 프리미엄 고시원'
    },
    {
      id: '3',
      type: 'reservation',
      title: '새 예약',
      description: '홍대입구 스튜디오 고시원에 예약이 들어왔습니다.',
      timestamp: '2024-01-15T08:45:00Z',
      gosiwonId: '45',
      gosiwonName: '홍대입구 스튜디오 고시원',
      amount: 380000
    },
    {
      id: '4',
      type: 'payment',
      title: '결제 완료',
      description: '보증금 500,000원이 결제되었습니다.',
      timestamp: '2024-01-15T08:30:00Z',
      amount: 500000
    },
    {
      id: '5',
      type: 'review',
      title: '새 리뷰',
      description: '강남역 프리미엄 고시원에 5점 리뷰가 등록되었습니다.',
      timestamp: '2024-01-15T07:20:00Z',
      gosiwonId: '1',
      gosiwonName: '강남역 프리미엄 고시원'
    }
  ]
}

// 모의 사용자 데이터
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    role: 'general',
    status: 'active',
    joinDate: '2024-01-01',
    lastLogin: '2024-01-15T10:30:00Z',
    reservationCount: 3,
    reviewCount: 2
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    role: 'gosiwon-business',
    status: 'active',
    joinDate: '2023-12-15',
    lastLogin: '2024-01-15T09:15:00Z',
    reservationCount: 0,
    reviewCount: 0
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    role: 'roomshare-business',
    status: 'active',
    joinDate: '2023-11-20',
    lastLogin: '2024-01-10T14:20:00Z',
    reservationCount: 0,
    reviewCount: 0
  },
  {
    id: '4',
    name: '최지영',
    email: 'choi@example.com',
    phone: '010-4567-8901',
    role: 'general',
    status: 'suspended',
    joinDate: '2023-10-15',
    lastLogin: '2024-01-08T16:45:00Z',
    reservationCount: 1,
    reviewCount: 0
  }
]

// 모의 고시원 데이터
export const mockAdminGosiwons: AdminGosiwon[] = [
  {
    id: '1',
    name: '강남역 프리미엄 고시원',
    ownerName: '이영희',
    ownerEmail: 'lee@example.com',
    location: '서울 강남구 강남대로 123',
    status: 'active',
    registrationDate: '2023-12-15',
    reservationCount: 127,
    rating: 4.8,
    reviewCount: 89,
    monthlyRevenue: 45000000
  },
  {
    id: '2',
    name: '홍대입구 스튜디오 고시원',
    ownerName: '김사장',
    ownerEmail: 'kim.business@example.com',
    location: '서울 마포구 홍대로 456',
    status: 'active',
    registrationDate: '2023-11-20',
    reservationCount: 89,
    rating: 4.6,
    reviewCount: 67,
    monthlyRevenue: 32000000
  },
  {
    id: '3',
    name: '신촌역 경제형 고시원',
    ownerName: '박사장',
    ownerEmail: 'park.business@example.com',
    location: '서울 서대문구 신촌로 789',
    status: 'pending',
    registrationDate: '2024-01-10',
    reservationCount: 0,
    rating: 0,
    reviewCount: 0,
    monthlyRevenue: 0
  }
]

// 모의 예약 데이터
export const mockAdminReservations: AdminReservation[] = [
  {
    id: '1',
    gosiwonName: '강남역 프리미엄 고시원',
    userName: '김철수',
    checkIn: '2024-02-01',
    checkOut: '2024-03-01',
    amount: 450000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    gosiwonName: '홍대입구 스튜디오 고시원',
    userName: '이영희',
    checkIn: '2024-02-15',
    checkOut: '2024-03-15',
    amount: 380000,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    gosiwonName: '신촌역 경제형 고시원',
    userName: '박민수',
    checkIn: '2024-01-20',
    checkOut: '2024-02-20',
    amount: 320000,
    status: 'cancelled',
    paymentStatus: 'failed',
    createdAt: '2024-01-14T16:45:00Z'
  }
]

// 활동 타입별 아이콘과 색상
export const activityConfig = {
  user_registration: {
    icon: 'UserPlus',
    color: 'success',
    bgColor: 'bg-success-50',
    textColor: 'text-success-700'
  },
  gosiwon_registration: {
    icon: 'Building',
    color: 'accent',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-700'
  },
  reservation: {
    icon: 'Calendar',
    color: 'info',
    bgColor: 'bg-info-50',
    textColor: 'text-info-700'
  },
  payment: {
    icon: 'CreditCard',
    color: 'warning',
    bgColor: 'bg-warning-50',
    textColor: 'text-warning-700'
  },
  review: {
    icon: 'Star',
    color: 'accent',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-700'
  },
  support: {
    icon: 'MessageCircle',
    color: 'secondary',
    bgColor: 'bg-secondary-50',
    textColor: 'text-secondary-700'
  }
}

// 상태별 색상
export const statusColors = {
  active: 'text-success-600 bg-success-50',
  pending: 'text-warning-600 bg-warning-50',
  suspended: 'text-error-600 bg-error-50',
  confirmed: 'text-success-600 bg-success-50',
  cancelled: 'text-error-600 bg-error-50',
  completed: 'text-accent-600 bg-accent-50',
  paid: 'text-success-600 bg-success-50',
  failed: 'text-error-600 bg-error-50'
}

// 날짜 포맷 함수
export const formatAdminDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 금액 포맷 함수
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원'
}

// 성장률 색상
export const getGrowthColor = (growth: number): string => {
  if (growth > 0) return 'text-success-600'
  if (growth < 0) return 'text-error-600'
  return 'text-accent-600'
} 