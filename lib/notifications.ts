export interface Notification {
  id: string
  userId: string
  type: 'reservation' | 'payment' | 'review' | 'chat' | 'system' | 'promotion'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  data?: {
    reservationId?: string
    gosiwonId?: string
    gosiwonName?: string
    amount?: number
    chatRoomId?: string
    reviewId?: string
  }
  actionUrl?: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  types: {
    reservation: boolean
    payment: boolean
    review: boolean
    chat: boolean
    system: boolean
    promotion: boolean
  }
}

// 모의 알림 데이터
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'reservation',
    title: '예약 확정',
    message: '강남역 프리미엄 고시원 예약이 확정되었습니다.',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z',
    data: {
      reservationId: '1',
      gosiwonId: '1',
      gosiwonName: '강남역 프리미엄 고시원'
    },
    actionUrl: '/my-reservations'
  },
  {
    id: '2',
    userId: '1',
    type: 'payment',
    title: '결제 완료',
    message: '보증금 500,000원이 성공적으로 결제되었습니다.',
    isRead: false,
    createdAt: '2024-01-15T10:25:00Z',
    data: {
      reservationId: '1',
      amount: 500000
    },
    actionUrl: '/my-reservations'
  },
  {
    id: '3',
    userId: '1',
    type: 'review',
    title: '리뷰 답변',
    message: '작성하신 리뷰에 답변이 달렸습니다.',
    isRead: true,
    createdAt: '2024-01-14T16:20:00Z',
    data: {
      reviewId: '1',
      gosiwonId: '1',
      gosiwonName: '강남역 프리미엄 고시원'
    },
    actionUrl: '/reviews'
  },
  {
    id: '4',
    userId: '1',
    type: 'chat',
    title: '새 메시지',
    message: '강남역 프리미엄 고시원에서 새 메시지가 도착했습니다.',
    isRead: false,
    createdAt: '2024-01-14T14:15:00Z',
    data: {
      chatRoomId: '1',
      gosiwonId: '1',
      gosiwonName: '강남역 프리미엄 고시원'
    },
    actionUrl: '/chat'
  },
  {
    id: '5',
    userId: '1',
    type: 'system',
    title: '서비스 점검 안내',
    message: '1월 16일 새벽 2시부터 4시까지 서비스 점검이 예정되어 있습니다.',
    isRead: true,
    createdAt: '2024-01-13T09:00:00Z',
    actionUrl: '/'
  },
  {
    id: '6',
    userId: '1',
    type: 'promotion',
    title: '신규 고시원 등록',
    message: '홍대입구에 새로운 고시원이 등록되었습니다. 지금 확인해보세요!',
    isRead: true,
    createdAt: '2024-01-12T11:30:00Z',
    data: {
      gosiwonId: '2',
      gosiwonName: '홍대입구 스튜디오 고시원'
    },
    actionUrl: '/'
  }
]

// 알림 타입별 아이콘과 색상
export const notificationConfig = {
  reservation: {
    icon: 'Calendar',
    color: 'success',
    bgColor: 'bg-success-50',
    textColor: 'text-success-700',
    borderColor: 'border-success-200'
  },
  payment: {
    icon: 'CreditCard',
    color: 'accent',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-700',
    borderColor: 'border-accent-200'
  },
  review: {
    icon: 'Star',
    color: 'warning',
    bgColor: 'bg-warning-50',
    textColor: 'text-warning-700',
    borderColor: 'border-warning-200'
  },
  chat: {
    icon: 'MessageCircle',
    color: 'info',
    bgColor: 'bg-info-50',
    textColor: 'text-info-700',
    borderColor: 'border-info-200'
  },
  system: {
    icon: 'Settings',
    color: 'secondary',
    bgColor: 'bg-secondary-50',
    textColor: 'text-secondary-700',
    borderColor: 'border-secondary-200'
  },
  promotion: {
    icon: 'Gift',
    color: 'accent',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-700',
    borderColor: 'border-accent-200'
  }
}

// 알림 필터링 함수
export const filterNotifications = (
  notifications: Notification[],
  filter: 'all' | 'unread' | 'read' | string
): Notification[] => {
  switch (filter) {
    case 'unread':
      return notifications.filter(n => !n.isRead)
    case 'read':
      return notifications.filter(n => n.isRead)
    case 'all':
      return notifications
    default:
      return notifications.filter(n => n.type === filter)
  }
}

// 알림 정렬 함수
export const sortNotifications = (
  notifications: Notification[],
  sortBy: 'recent' | 'oldest' = 'recent'
): Notification[] => {
  return [...notifications].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return sortBy === 'recent' ? dateB - dateA : dateA - dateB
  })
}

// 읽지 않은 알림 개수 계산
export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.isRead).length
}

// 날짜 포맷 함수
export const formatNotificationDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) {
    return '방금 전'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`
  } else {
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    })
  }
}

// 알림 설정 기본값
export const defaultNotificationSettings: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  types: {
    reservation: true,
    payment: true,
    review: true,
    chat: true,
    system: true,
    promotion: false
  }
} 