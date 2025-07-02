export interface GosiwonRegistration {
  id: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  businessLicense: string
  status: 'pending' | 'approved' | 'rejected' | 'draft'
  submittedAt?: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
  
  // 고시원 정보
  name: string
  location: string
  address: string
  description: string
  price: number
  deposit: number
  area: number
  capacity: number
  
  // 시설 정보
  facilities: string[]
  amenities: string[]
  rules: string[]
  
  // 이미지
  images: string[]
  documents: string[]
  
  // 운영 정보
  checkInTime: string
  checkOutTime: string
  contactPhone: string
  contactEmail: string
  
  // 위치 정보
  latitude?: number
  longitude?: number
  subwayStations: string[]
  busStations: string[]
  
  // 추가 정보
  tags: string[]
  specialFeatures: string[]
  notes?: string
}

export interface RegistrationStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

// 모의 등록 데이터
export const mockRegistrations: GosiwonRegistration[] = [
  {
    id: '1',
    ownerId: 'owner1',
    ownerName: '이영희',
    ownerEmail: 'lee@example.com',
    ownerPhone: '010-1234-5678',
    businessLicense: '123-45-67890',
    status: 'pending',
    submittedAt: '2024-01-15T10:00:00Z',
    
    name: '강남역 프리미엄 고시원',
    location: '서울 강남구 강남대로 123',
    address: '서울 강남구 강남대로 123, 4층',
    description: '강남역 도보 3분 거리의 프리미엄 고시원입니다. 깔끔한 시설과 안전한 환경을 제공합니다.',
    price: 450000,
    deposit: 500000,
    area: 6,
    capacity: 20,
    
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '독서실'],
    amenities: ['24시간 보안', 'CCTV', '공용 주방', '세탁실'],
    rules: ['흡연 금지', '음주 금지', '방문객 제한'],
    
    images: [
      '/gosiwons/registration1_1.jpg',
      '/gosiwons/registration1_2.jpg',
      '/gosiwons/registration1_3.jpg'
    ],
    documents: [
      '/documents/business_license_1.pdf',
      '/documents/floor_plan_1.pdf'
    ],
    
    checkInTime: '14:00',
    checkOutTime: '11:00',
    contactPhone: '02-1234-5678',
    contactEmail: 'gangnam@gosiwon.com',
    
    subwayStations: ['강남역'],
    busStations: ['강남역 버스정류장'],
    tags: ['강남역', '프리미엄', '신축'],
    specialFeatures: ['에어컨', 'WiFi', '주방']
  },
  {
    id: '2',
    ownerId: 'owner2',
    ownerName: '김사장',
    ownerEmail: 'kim@example.com',
    ownerPhone: '010-2345-6789',
    businessLicense: '234-56-78901',
    status: 'approved',
    submittedAt: '2024-01-10T14:30:00Z',
    reviewedAt: '2024-01-12T09:15:00Z',
    reviewedBy: 'admin1',
    
    name: '홍대입구 스튜디오 고시원',
    location: '서울 마포구 홍대로 456',
    address: '서울 마포구 홍대로 456, 2층',
    description: '홍대입구역 근처의 아늑한 고시원입니다. 예술가들이 많이 거주하는 분위기 좋은 곳입니다.',
    price: 380000,
    deposit: 300000,
    area: 5,
    capacity: 15,
    
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '공용라운지'],
    amenities: ['공용 주방', '세탁실', '공용 라운지'],
    rules: ['흡연 금지', '음주 금지', '방문객 제한'],
    
    images: [
      '/gosiwons/registration2_1.jpg',
      '/gosiwons/registration2_2.jpg'
    ],
    documents: [
      '/documents/business_license_2.pdf'
    ],
    
    checkInTime: '15:00',
    checkOutTime: '12:00',
    contactPhone: '02-2345-6789',
    contactEmail: 'hongdae@gosiwon.com',
    
    subwayStations: ['홍대입구역'],
    busStations: ['홍대입구 버스정류장'],
    tags: ['홍대입구', '아늑함', '예술가'],
    specialFeatures: ['공용라운지', 'WiFi', '주방']
  },
  {
    id: '3',
    ownerId: 'owner3',
    ownerName: '박사장',
    ownerEmail: 'park@example.com',
    ownerPhone: '010-3456-7890',
    businessLicense: '345-67-89012',
    status: 'rejected',
    submittedAt: '2024-01-08T16:20:00Z',
    reviewedAt: '2024-01-10T11:30:00Z',
    reviewedBy: 'admin1',
    rejectionReason: '사업자등록증이 만료되었습니다. 새로운 사업자등록증을 제출해주세요.',
    
    name: '신촌역 경제형 고시원',
    location: '서울 서대문구 신촌로 789',
    address: '서울 서대문구 신촌로 789, 3층',
    description: '신촌역 근처의 경제적인 고시원입니다. 학생들이 많이 이용하는 합리적인 가격의 숙소입니다.',
    price: 320000,
    deposit: 200000,
    area: 4,
    capacity: 25,
    
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기'],
    amenities: ['공용 주방', '세탁실'],
    rules: ['흡연 금지', '음주 금지', '방문객 제한'],
    
    images: [
      '/gosiwons/registration3_1.jpg'
    ],
    documents: [
      '/documents/business_license_3.pdf'
    ],
    
    checkInTime: '14:00',
    checkOutTime: '11:00',
    contactPhone: '02-3456-7890',
    contactEmail: 'sinchon@gosiwon.com',
    
    subwayStations: ['신촌역'],
    busStations: ['신촌역 버스정류장'],
    tags: ['신촌역', '경제적', '학생'],
    specialFeatures: ['경제적', 'WiFi', '에어컨']
  }
]

// 등록 단계 정의
export const registrationSteps: RegistrationStep[] = [
  {
    id: 'basic',
    title: '기본 정보',
    description: '사업자 정보와 고시원 기본 정보를 입력합니다.',
    isCompleted: false,
    isActive: true
  },
  {
    id: 'details',
    title: '상세 정보',
    description: '고시원의 상세 정보와 시설을 입력합니다.',
    isCompleted: false,
    isActive: false
  },
  {
    id: 'images',
    title: '이미지 및 문서',
    description: '고시원 사진과 필요한 문서를 업로드합니다.',
    isCompleted: false,
    isActive: false
  },
  {
    id: 'review',
    title: '검토 및 제출',
    description: '입력한 정보를 검토하고 최종 제출합니다.',
    isCompleted: false,
    isActive: false
  }
]

// 시설 옵션
export const facilityOptions = [
  'WiFi',
  '에어컨',
  '냉장고',
  '세탁기',
  '주방',
  '독서실',
  '헬스장',
  '공용라운지',
  '편의점',
  '카페',
  '주차장',
  '엘리베이터'
]

// 편의시설 옵션
export const amenityOptions = [
  '24시간 보안',
  'CCTV',
  '공용 주방',
  '세탁실',
  '공용 라운지',
  '독서실',
  '헬스장',
  '편의점',
  '카페',
  '주차장',
  '엘리베이터',
  '공용 화장실'
]

// 규칙 옵션
export const ruleOptions = [
  '흡연 금지',
  '음주 금지',
  '방문객 제한',
  '반려동물 금지',
  '음식 반입 금지',
  '소음 금지',
  '외출 시간 제한',
  '세탁 시간 제한'
]

// 태그 옵션
export const tagOptions = [
  '강남역',
  '홍대입구',
  '신촌역',
  '프리미엄',
  '경제적',
  '신축',
  '아늑함',
  '학생',
  '직장인',
  '여성전용',
  '남성전용',
  '혼성'
]

// 상태별 색상
export const statusColors = {
  pending: 'text-warning-600 bg-warning-50',
  approved: 'text-success-600 bg-success-50',
  rejected: 'text-error-600 bg-error-50',
  draft: 'text-secondary-600 bg-secondary-50'
}

// 상태별 라벨
export const statusLabels = {
  pending: '검토 대기',
  approved: '승인됨',
  rejected: '거절됨',
  draft: '임시저장'
}

// 날짜 포맷 함수
export const formatRegistrationDate = (dateString: string): string => {
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
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
} 