export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: 'general' | 'gosiwon-business' | 'roomshare-business' | 'admin'
  avatar?: string
  createdAt: string
  updatedAt: string
  preferences: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    privacy: {
      profileVisible: boolean
      showPhone: boolean
    }
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  role: 'general' | 'gosiwon-business' | 'roomshare-business'
}

export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  role: 'general' | 'gosiwon-business' | 'roomshare-business'
  agreeToTerms: boolean
}

// 모의 사용자 데이터
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: '김철수',
    phone: '010-1234-5678',
    role: 'general',
    avatar: '/avatars/user1.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        profileVisible: true,
        showPhone: false
      }
    }
  },
  {
    id: '2',
    email: 'gosiwon@example.com',
    name: '이영희',
    phone: '010-9876-5432',
    role: 'gosiwon-business',
    avatar: '/avatars/gosiwon1.jpg',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      privacy: {
        profileVisible: true,
        showPhone: true
      }
    }
  },
  {
    id: '3',
    email: 'roomshare@example.com',
    name: '박민수',
    phone: '010-5555-6666',
    role: 'roomshare-business',
    avatar: '/avatars/roomshare1.jpg',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      privacy: {
        profileVisible: true,
        showPhone: true
      }
    }
  }
]

// 모의 인증 상태
export const mockAuthState: AuthState = {
  user: mockUsers[0], // 기본적으로 첫 번째 사용자로 로그인된 상태
  isAuthenticated: true,
  isLoading: false
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]-[0-9]{4}-[0-9]{4}$/
  return phoneRegex.test(phone)
}

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

// 역할별 접근 제어 유틸리티 함수들
export const hasRole = (user: User | null, roles: string[]): boolean => {
  if (!user) return false
  return roles.includes(user.role)
}

export const isGeneralUser = (user: User | null): boolean => {
  return hasRole(user, ['general'])
}

export const isGosiwonBusiness = (user: User | null): boolean => {
  return hasRole(user, ['gosiwon-business'])
}

export const isRoomshareBusiness = (user: User | null): boolean => {
  return hasRole(user, ['roomshare-business'])
}

export const isBusinessOwner = (user: User | null): boolean => {
  return hasRole(user, ['gosiwon-business', 'roomshare-business'])
}

export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, ['admin'])
}

// 역할별 메뉴 접근 권한
export const getRolePermissions = (user: User | null) => {
  return {
    canAccessGosiwon: isGeneralUser(user) || isGosiwonBusiness(user) || isAdmin(user),
    canAccessRoomshare: isGeneralUser(user) || isRoomshareBusiness(user) || isAdmin(user),
    canManageGosiwon: isGosiwonBusiness(user) || isAdmin(user),
    canManageRoomshare: isRoomshareBusiness(user) || isAdmin(user),
    canAccessBusinessDashboard: isGosiwonBusiness(user) || isAdmin(user),
    canAccessRoomshareDashboard: isRoomshareBusiness(user) || isAdmin(user),
    canAccessAdmin: isAdmin(user),
    canPostGosiwon: isGosiwonBusiness(user) || isAdmin(user),
    canPostRoomshare: isRoomshareBusiness(user) || isAdmin(user),
    canReserve: isGeneralUser(user) || isAdmin(user)
  }
}

// 역할별 표시 이름
export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case 'general':
      return '일반'
    case 'gosiwon-business':
      return '고시원사업주'
    case 'roomshare-business':
      return '룸쉐어사업주'
    case 'admin':
      return '관리자'
    default:
      return '알 수 없음'
  }
}

// 역할별 색상 클래스
export const getRoleColorClass = (role: string): string => {
  switch (role) {
    case 'general':
      return 'bg-secondary-100 text-accent-600'
    case 'gosiwon-business':
      return 'bg-accent-100 text-accent-700'
    case 'roomshare-business':
      return 'bg-blue-100 text-blue-700'
    case 'admin':
      return 'bg-purple-100 text-purple-700'
    default:
      return 'bg-gray-100 text-gray-600'
  }
} 