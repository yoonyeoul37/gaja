export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: 'general' | 'gosiwon-business' | 'roomshare-business' | 'admin'
  content: string
  type: 'text' | 'image' | 'file'
  timestamp: string
  isRead: boolean
  attachments?: {
    url: string
    name: string
    type: string
    size: number
  }[]
}

export interface ChatRoom {
  id: string
  name: string
  participants: {
    id: string
    name: string
    role: 'general' | 'gosiwon-business' | 'roomshare-business' | 'admin'
    avatar?: string
  }[]
  lastMessage?: ChatMessage
  unreadCount: number
  createdAt: string
  updatedAt: string
  gosiwonId?: string
  gosiwonName?: string
  reservationId?: string
}

export interface ChatState {
  rooms: ChatRoom[]
  currentRoom: ChatRoom | null
  messages: ChatMessage[]
  isLoading: boolean
  isTyping: boolean
  typingUsers: string[]
}

// 모의 채팅방 데이터
export const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: '강남역 고시원 문의',
    participants: [
      { id: '1', name: '김철수', role: 'general' },
      { id: '2', name: '강남역 고시원', role: 'gosiwon-business' }
    ],
    lastMessage: {
      id: 'msg1',
      senderId: '2',
      senderName: '강남역 고시원',
      senderRole: 'gosiwon-business',
      content: '네, 확인했습니다. 입주 가능합니다.',
      type: 'text',
      timestamp: '2024-01-20T15:30:00Z',
      isRead: true
    },
    unreadCount: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    gosiwonId: '1',
    gosiwonName: '강남역 프리미엄 고시원',
    reservationId: '1'
  },
  {
    id: '2',
    name: '홍대 고시원 문의',
    participants: [
      { id: '1', name: '김철수', role: 'general' },
      { id: '3', name: '홍대 고시원', role: 'gosiwon-business' }
    ],
    lastMessage: {
      id: 'msg2',
      senderId: '1',
      senderName: '김철수',
      senderRole: 'general',
      content: '창가 쪽 방으로 부탁드립니다.',
      type: 'text',
      timestamp: '2024-01-19T14:20:00Z',
      isRead: false
    },
    unreadCount: 1,
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-19T14:20:00Z',
    gosiwonId: '2',
    gosiwonName: '홍대입구 스튜디오 고시원',
    reservationId: '2'
  }
]

// 모의 메시지 데이터
export const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: 'msg1_1',
      senderId: '1',
      senderName: '김철수',
      senderRole: 'general',
      content: '안녕하세요! 강남역 고시원 예약 문의드립니다.',
      type: 'text',
      timestamp: '2024-01-15T10:00:00Z',
      isRead: true
    },
    {
      id: 'msg1_2',
      senderId: '2',
      senderName: '강남역 고시원',
      senderRole: 'gosiwon-business',
      content: '안녕하세요! 어떤 방을 찾고 계신가요?',
      type: 'text',
      timestamp: '2024-01-15T10:05:00Z',
      isRead: true
    },
    {
      id: 'msg1_3',
      senderId: '1',
      senderName: '김철수',
      senderRole: 'general',
      content: '1인실로 2월 1일부터 3개월 예약하고 싶습니다.',
      type: 'text',
      timestamp: '2024-01-15T10:10:00Z',
      isRead: true
    },
    {
      id: 'msg1_4',
      senderId: '2',
      senderName: '강남역 고시원',
      senderRole: 'gosiwon-business',
      content: '네, 확인했습니다. 입주 가능합니다.',
      type: 'text',
      timestamp: '2024-01-20T15:30:00Z',
      isRead: true
    }
  ],
  '2': [
    {
      id: 'msg2_1',
      senderId: '1',
      senderName: '김철수',
      senderRole: 'general',
      content: '홍대 고시원 예약 관련해서 문의드립니다.',
      type: 'text',
      timestamp: '2024-01-18T09:00:00Z',
      isRead: true
    },
    {
      id: 'msg2_2',
      senderId: '3',
      senderName: '홍대 고시원',
      senderRole: 'gosiwon-business',
      content: '안녕하세요! 어떤 도움이 필요하신가요?',
      type: 'text',
      timestamp: '2024-01-18T09:15:00Z',
      isRead: true
    },
    {
      id: 'msg2_3',
      senderId: '1',
      senderName: '김철수',
      senderRole: 'general',
      content: '창가 쪽 방으로 부탁드립니다.',
      type: 'text',
      timestamp: '2024-01-19T14:20:00Z',
      isRead: false
    }
  ]
}

export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  } else if (diffInHours < 48) {
    return '어제'
  } else {
    return date.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric' 
    })
  }
}

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

export const isToday = (timestamp: string): boolean => {
  const date = new Date(timestamp)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export const isYesterday = (timestamp: string): boolean => {
  const date = new Date(timestamp)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toDateString() === yesterday.toDateString()
} 