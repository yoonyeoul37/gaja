export interface Reservation {
  id: string
  userId: string
  gosiwonId: string
  gosiwonName: string
  userName: string
  userPhone: string
  userEmail: string
  checkInDate: string
  checkOutDate: string
  totalDays: number
  pricePerDay: number
  totalPrice: number
  deposit: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  message?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'bank' | 'mobile'
  icon: string
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: '신용카드',
    type: 'card',
    icon: '💳'
  },
  {
    id: 'bank',
    name: '계좌이체',
    type: 'bank',
    icon: '🏦'
  },
  {
    id: 'kakao',
    name: '카카오페이',
    type: 'mobile',
    icon: '💛'
  },
  {
    id: 'toss',
    name: '토스',
    type: 'mobile',
    icon: '💙'
  }
]

// 모의 예약 데이터
export const mockReservations: Reservation[] = [
  {
    id: '1',
    userId: 'user1',
    gosiwonId: '1',
    gosiwonName: '강남역 프리미엄 고시원',
    userName: '김철수',
    userPhone: '010-1234-5678',
    userEmail: 'kim@example.com',
    checkInDate: '2024-02-01',
    checkOutDate: '2024-05-01',
    totalDays: 90,
    pricePerDay: 15000,
    totalPrice: 1350000,
    deposit: 500000,
    status: 'confirmed',
    paymentStatus: 'paid',
    message: '조용한 방으로 부탁드립니다.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    gosiwonId: '2',
    gosiwonName: '홍대입구 스튜디오 고시원',
    userName: '이영희',
    userPhone: '010-9876-5432',
    userEmail: 'lee@example.com',
    checkInDate: '2024-02-15',
    checkOutDate: '2024-04-15',
    totalDays: 60,
    pricePerDay: 12667,
    totalPrice: 760000,
    deposit: 300000,
    status: 'pending',
    paymentStatus: 'pending',
    message: '창가 쪽 방이면 좋겠습니다.',
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-01-20T14:20:00Z'
  }
]

export const calculateTotalPrice = (pricePerDay: number, totalDays: number, deposit: number) => {
  return {
    dailyPrice: pricePerDay,
    totalDays,
    subtotal: pricePerDay * totalDays,
    deposit,
    total: (pricePerDay * totalDays) + deposit
  }
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price)
} 