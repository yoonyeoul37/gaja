export interface Room {
  id: string
  number: string // 방 번호 (예: "301", "A-2")
  type: 'single' | 'double' | 'studio' | 'shared' // 방 타입
  area: number // 면적 (평)
  price: number // 월세
  deposit: number // 보증금
  status: 'occupied' | 'available' | 'maintenance' | 'reserved' | 'scheduled_vacancy' // 방 상태
  occupant?: {
    name: string
    checkInDate: string
    checkOutDate: string
    contractEndDate: string
  }
  scheduledVacancy?: {
    expectedDate: string
    reason: string // 'contract_end', 'moving_out', 'graduation' 등
    isConfirmed: boolean
  }
  facilities: string[] // 방별 편의시설
  notes?: string // 특이사항
}

export interface Gosiwon {
  id: string
  name: string
  location: string
  price: number
  deposit: number
  area: number
  facilities: string[]
  images: string[]
  rating: number
  reviewCount: number
  description: string
  available: boolean
  distance: {
    subway: number
    bus: number
  }
  tags: string[]
  subwayStation: string // 지하철역
  nearbyUniversities: string[] // 근처 대학들
  // 개선된 방 관리 시스템
  rooms: Room[] // 개별 방 정보
  roomStatus: {
    totalRooms: number
    availableRooms: number
    occupiedRooms: number
    maintenanceRooms: number
    reservedRooms: number
    scheduledVacancyRooms: number // 공실예정 방 수
  }
  marketing: {
    promotion: boolean
    promotionType?: 'discount' | 'free_deposit' | 'first_month_free' | 'referral_bonus' | 'early_bird'
    promotionDescription?: string
    discountRate?: number
    originalPrice?: number
    urgencyLevel: 'low' | 'medium' | 'high' // 긴급도
    specialOffer?: string
    limitedTime?: boolean
    lastAvailableDate?: string
    // 공실예정 관련 마케팅
    scheduledVacancyPromotion?: {
      enabled: boolean
      type: 'pre_booking' | 'waitlist' | 'priority_notification'
      description: string
      discountRate?: number
    }
  }
  occupancyRate: number // 입주율 (%)
  lastUpdated: string // 마지막 업데이트 날짜
}

export const gosiwonData: Gosiwon[] = [
  {
    id: '1',
    name: '강남역 프리미엄 고시원',
    location: '서울 강남구 강남대로 123',
    price: 450000,
    deposit: 500000,
    area: 6,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 127,
    description: '강남역 도보 3분 거리의 프리미엄 고시원입니다. 깔끔한 시설과 안전한 환경을 제공합니다.',
    available: true,
    distance: {
      subway: 3,
      bus: 5
    },
    tags: ['강남역', '프리미엄', '신축'],
    subwayStation: '강남역',
    nearbyUniversities: ['서울대학교', '연세대학교', '고려대학교'],
    rooms: [
      {
        id: '1-1',
        number: '301',
        type: 'single',
        area: 6,
        price: 450000,
        deposit: 500000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '1-2',
        number: '302',
        type: 'single',
        area: 6,
        price: 450000,
        deposit: 500000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '1-3',
        number: '303',
        type: 'single',
        area: 6,
        price: 450000,
        deposit: 500000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      },
      {
        id: '1-4',
        number: '304',
        type: 'single',
        area: 6,
        price: 450000,
        deposit: 500000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '박민수',
          checkInDate: '2023-07-01',
          checkOutDate: '2024-01-31',
          contractEndDate: '2024-01-31'
        },
        scheduledVacancy: {
          expectedDate: '2024-01-31',
          reason: 'graduation',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '졸업으로 인한 퇴실'
      },
      {
        id: '1-5',
        number: '305',
        type: 'single',
        area: 6,
        price: 450000,
        deposit: 500000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '신축 방'
      }
    ],
    roomStatus: {
      totalRooms: 10,
      availableRooms: 2,
      occupiedRooms: 1,
      maintenanceRooms: 2,
      reservedRooms: 0,
      scheduledVacancyRooms: 2
    },
    marketing: {
      promotion: true,
      promotionType: 'discount',
      promotionDescription: '10% 할인 중',
      discountRate: 0.1,
      originalPrice: 500000,
      urgencyLevel: 'medium',
      specialOffer: '10% 할인 중',
      limitedTime: true,
      lastAvailableDate: '2023-12-31',
      scheduledVacancyPromotion: {
        enabled: true,
        type: 'pre_booking',
        description: '공실예정 방 사전예약 15% 할인',
        discountRate: 0.15
      }
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '2',
    name: '홍대입구 스튜디오 고시원',
    location: '서울 마포구 홍대로 456',
    price: 380000,
    deposit: 300000,
    area: 5,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '공용라운지'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 89,
    description: '홍대입구역 근처의 아늑한 고시원입니다. 예술가들이 많이 거주하는 분위기 좋은 곳입니다.',
    available: true,
    distance: {
      subway: 5,
      bus: 3
    },
    tags: ['홍대입구', '아늑함', '예술가'],
    subwayStation: '홍대입구역',
    nearbyUniversities: ['홍익대학교', '서강대학교', '연세대학교'],
    rooms: [
      {
        id: '2-1',
        number: 'A-1',
        type: 'studio',
        area: 5,
        price: 380000,
        deposit: 300000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고', '주방'],
        notes: '스튜디오형, 창가 방'
      },
      {
        id: '2-2',
        number: 'A-2',
        type: 'studio',
        area: 5,
        price: 380000,
        deposit: 300000,
        status: 'occupied',
        occupant: {
          name: '최예술',
          checkInDate: '2023-10-01',
          checkOutDate: '2024-04-01',
          contractEndDate: '2024-04-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고', '주방'],
        notes: '예술가 거주'
      },
      {
        id: '2-3',
        number: 'A-3',
        type: 'studio',
        area: 5,
        price: 380000,
        deposit: 300000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '김디자인',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-01-20',
          contractEndDate: '2024-01-20'
        },
        scheduledVacancy: {
          expectedDate: '2024-01-20',
          reason: 'moving_out',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고', '주방'],
        notes: '1월 20일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 8,
      availableRooms: 1,
      occupiedRooms: 1,
      maintenanceRooms: 2,
      reservedRooms: 0,
      scheduledVacancyRooms: 1
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '3',
    name: '신촌역 경제형 고시원',
    location: '서울 서대문구 신촌로 789',
    price: 320000,
    deposit: 200000,
    area: 4,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.3,
    reviewCount: 156,
    description: '신촌역 근처의 경제적인 고시원입니다. 학생들이 많이 이용하는 합리적인 가격의 숙소입니다.',
    available: true,
    distance: {
      subway: 7,
      bus: 2
    },
    tags: ['신촌역', '경제적', '학생'],
    subwayStation: '신촌역',
    nearbyUniversities: ['연세대학교', '서강대학교', '이화여자대학교'],
    rooms: [
      {
        id: '3-1',
        number: '401',
        type: 'single',
        area: 4,
        price: 320000,
        deposit: 200000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '3-2',
        number: '402',
        type: 'single',
        area: 4,
        price: 320000,
        deposit: 200000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '3-3',
        number: '403',
        type: 'single',
        area: 4,
        price: 320000,
        deposit: 200000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 6,
      availableRooms: 3,
      occupiedRooms: 2,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '4',
    name: '잠실역 럭셔리 고시원',
    location: '서울 송파구 올림픽로 321',
    price: 550000,
    deposit: 1000000,
    area: 8,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '헬스장', '독서실'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 203,
    description: '잠실역 근처의 럭셔리 고시원입니다. 최고급 시설과 서비스를 제공하는 프리미엄 숙소입니다.',
    available: false,
    distance: {
      subway: 4,
      bus: 6
    },
    tags: ['잠실역', '럭셔리', '프리미엄'],
    subwayStation: '잠실역',
    nearbyUniversities: ['한양대학교', '건국대학교', '서울대학교'],
    rooms: [
      {
        id: '4-1',
        number: '501',
        type: 'single',
        area: 8,
        price: 550000,
        deposit: 1000000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '4-2',
        number: '502',
        type: 'single',
        area: 8,
        price: 550000,
        deposit: 1000000,
        status: 'occupied',
        occupant: {
          name: '최예술',
          checkInDate: '2023-10-01',
          checkOutDate: '2024-04-01',
          contractEndDate: '2024-04-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '예술가 거주'
      },
      {
        id: '4-3',
        number: '503',
        type: 'single',
        area: 8,
        price: 550000,
        deposit: 1000000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '김디자인',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-01-20',
          contractEndDate: '2024-01-20'
        },
        scheduledVacancy: {
          expectedDate: '2024-01-20',
          reason: 'moving_out',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '1월 20일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 12,
      availableRooms: 2,
      occupiedRooms: 8,
      maintenanceRooms: 2,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: true,
      promotionType: 'discount',
      promotionDescription: '15% 할인 중',
      discountRate: 0.15,
      originalPrice: 600000,
      urgencyLevel: 'high',
      specialOffer: '15% 할인 중',
      limitedTime: true,
      lastAvailableDate: '2023-12-31'
    },
    occupancyRate: 17,
    lastUpdated: '2023-11-15'
  },
  {
    id: '5',
    name: '건대입구 편의시설 고시원',
    location: '서울 광진구 능동로 654',
    price: 420000,
    deposit: 400000,
    area: 6,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '편의점', '카페'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 178,
    description: '건대입구역 근처의 편의시설이 잘 갖춰진 고시원입니다. 생활하기 편리한 환경을 제공합니다.',
    available: true,
    distance: {
      subway: 6,
      bus: 4
    },
    tags: ['건대입구', '편의시설', '편리함'],
    subwayStation: '건대입구역',
    nearbyUniversities: ['건국대학교', '한양대학교', '세종대학교'],
    rooms: [
      {
        id: '5-1',
        number: '601',
        type: 'single',
        area: 6,
        price: 420000,
        deposit: 400000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '5-2',
        number: '602',
        type: 'single',
        area: 6,
        price: 420000,
        deposit: 400000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '5-3',
        number: '603',
        type: 'single',
        area: 6,
        price: 420000,
        deposit: 400000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 8,
      availableRooms: 4,
      occupiedRooms: 3,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '6',
    name: '역삼역 조용한 고시원',
    location: '서울 강남구 테헤란로 987',
    price: 480000,
    deposit: 600000,
    area: 7,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '독서실'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.5,
    reviewCount: 92,
    description: '역삼역 근처의 조용하고 학습하기 좋은 고시원입니다. 시험 준비생들이 선호하는 분위기입니다.',
    available: true,
    distance: {
      subway: 8,
      bus: 3
    },
    tags: ['역삼역', '조용함', '학습'],
    subwayStation: '역삼역',
    nearbyUniversities: ['서울대학교', '연세대학교', '고려대학교'],
    rooms: [
      {
        id: '6-1',
        number: '701',
        type: 'single',
        area: 7,
        price: 480000,
        deposit: 600000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '6-2',
        number: '702',
        type: 'single',
        area: 7,
        price: 480000,
        deposit: 600000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '6-3',
        number: '703',
        type: 'single',
        area: 7,
        price: 480000,
        deposit: 600000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 10,
      availableRooms: 5,
      occupiedRooms: 4,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '7',
    name: '서울대입구 학생 고시원',
    location: '서울 관악구 관악로 123',
    price: 350000,
    deposit: 300000,
    area: 5,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '독서실'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.4,
    reviewCount: 234,
    description: '서울대입구역 근처의 학생 전용 고시원입니다. 서울대학교 학생들이 많이 이용하는 합리적인 가격의 숙소입니다.',
    available: true,
    distance: {
      subway: 5,
      bus: 3
    },
    tags: ['서울대입구', '학생', '경제적'],
    subwayStation: '서울대입구역',
    nearbyUniversities: ['서울대학교', '서울여자대학교'],
    rooms: [
      {
        id: '7-1',
        number: '801',
        type: 'single',
        area: 5,
        price: 350000,
        deposit: 300000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '7-2',
        number: '802',
        type: 'single',
        area: 5,
        price: 350000,
        deposit: 300000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '7-3',
        number: '803',
        type: 'single',
        area: 5,
        price: 350000,
        deposit: 300000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 6,
      availableRooms: 3,
      occupiedRooms: 2,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '8',
    name: '고려대역 프리미엄 고시원',
    location: '서울 성북구 안암로 456',
    price: 520000,
    deposit: 800000,
    area: 7,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '헬스장', '카페'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 167,
    description: '고려대역 근처의 프리미엄 고시원입니다. 고려대학교 학생들을 위한 최고급 시설을 제공합니다.',
    available: true,
    distance: {
      subway: 3,
      bus: 2
    },
    tags: ['고려대역', '프리미엄', '고려대'],
    subwayStation: '고려대역',
    nearbyUniversities: ['고려대학교', '성신여자대학교'],
    rooms: [
      {
        id: '8-1',
        number: '901',
        type: 'single',
        area: 7,
        price: 520000,
        deposit: 800000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '8-2',
        number: '902',
        type: 'single',
        area: 7,
        price: 520000,
        deposit: 800000,
        status: 'occupied',
        occupant: {
          name: '최예술',
          checkInDate: '2023-10-01',
          checkOutDate: '2024-04-01',
          contractEndDate: '2024-04-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '예술가 거주'
      },
      {
        id: '8-3',
        number: '903',
        type: 'single',
        area: 7,
        price: 520000,
        deposit: 800000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '김디자인',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-01-20',
          contractEndDate: '2024-01-20'
        },
        scheduledVacancy: {
          expectedDate: '2024-01-20',
          reason: 'moving_out',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '1월 20일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 12,
      availableRooms: 4,
      occupiedRooms: 7,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: true,
      promotionType: 'free_deposit',
      promotionDescription: '보증금 무료',
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: 'low',
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 33,
    lastUpdated: '2023-11-15'
  },
  {
    id: '9',
    name: '연세대역 아늑한 고시원',
    location: '서울 서대문구 연세로 789',
    price: 400000,
    deposit: 400000,
    area: 6,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '공용라운지'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 145,
    description: '연세대역 근처의 아늑한 고시원입니다. 연세대학교 학생들이 선호하는 분위기 좋은 숙소입니다.',
    available: true,
    distance: {
      subway: 4,
      bus: 3
    },
    tags: ['연세대역', '아늑함', '연세대'],
    subwayStation: '연세대역',
    nearbyUniversities: ['연세대학교', '서강대학교', '이화여자대학교'],
    rooms: [
      {
        id: '9-1',
        number: '1001',
        type: 'single',
        area: 6,
        price: 400000,
        deposit: 400000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '9-2',
        number: '1002',
        type: 'single',
        area: 6,
        price: 400000,
        deposit: 400000,
        status: 'occupied',
        occupant: {
          name: '최예술',
          checkInDate: '2023-10-01',
          checkOutDate: '2024-04-01',
          contractEndDate: '2024-04-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '예술가 거주'
      },
      {
        id: '9-3',
        number: '1003',
        type: 'single',
        area: 6,
        price: 400000,
        deposit: 400000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '김디자인',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-01-20',
          contractEndDate: '2024-01-20'
        },
        scheduledVacancy: {
          expectedDate: '2024-01-20',
          reason: 'moving_out',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '1월 20일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 8,
      availableRooms: 4,
      occupiedRooms: 3,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '10',
    name: '한양대역 편리한 고시원',
    location: '서울 성동구 왕십리로 321',
    price: 380000,
    deposit: 350000,
    area: 5,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '편의점'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.3,
    reviewCount: 98,
    description: '한양대역 근처의 편리한 고시원입니다. 한양대학교 학생들을 위한 합리적인 가격의 숙소입니다.',
    available: true,
    distance: {
      subway: 6,
      bus: 4
    },
    tags: ['한양대역', '편리함', '한양대'],
    subwayStation: '한양대역',
    nearbyUniversities: ['한양대학교', '성신여자대학교'],
    rooms: [
      {
        id: '10-1',
        number: '1101',
        type: 'single',
        area: 5,
        price: 380000,
        deposit: 350000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '10-2',
        number: '1102',
        type: 'single',
        area: 5,
        price: 380000,
        deposit: 350000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '10-3',
        number: '1103',
        type: 'single',
        area: 5,
        price: 380000,
        deposit: 350000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 6,
      availableRooms: 3,
      occupiedRooms: 2,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '11',
    name: '이대역 여학생 고시원',
    location: '서울 서대문구 이화여대길 654',
    price: 420000,
    deposit: 500000,
    area: 6,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '독서실', '카페'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 189,
    description: '이대역 근처의 여학생 전용 고시원입니다. 이화여자대학교 학생들을 위한 안전하고 편리한 숙소입니다.',
    available: true,
    distance: {
      subway: 5,
      bus: 2
    },
    tags: ['이대역', '여학생', '이화여대'],
    subwayStation: '이대역',
    nearbyUniversities: ['이화여자대학교', '연세대학교', '서강대학교'],
    rooms: [
      {
        id: '11-1',
        number: '1201',
        type: 'single',
        area: 6,
        price: 420000,
        deposit: 500000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '11-2',
        number: '1202',
        type: 'single',
        area: 6,
        price: 420000,
        deposit: 500000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '11-3',
        number: '1203',
        type: 'single',
        area: 6,
        price: 420000,
        deposit: 500000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 8,
      availableRooms: 4,
      occupiedRooms: 3,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '12',
    name: '서강대역 스튜디오 고시원',
    location: '서울 마포구 백범로 987',
    price: 450000,
    deposit: 600000,
    area: 7,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '공용라운지', '헬스장'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 156,
    description: '서강대역 근처의 스튜디오형 고시원입니다. 서강대학교 학생들을 위한 모던한 시설을 제공합니다.',
    available: true,
    distance: {
      subway: 4,
      bus: 3
    },
    tags: ['서강대역', '스튜디오', '서강대'],
    subwayStation: '서강대역',
    nearbyUniversities: ['서강대학교', '연세대학교', '홍익대학교'],
    rooms: [
      {
        id: '12-1',
        number: '1301',
        type: 'studio',
        area: 7,
        price: 450000,
        deposit: 600000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고', '주방'],
        notes: '스튜디오형, 창가 방'
      },
      {
        id: '12-2',
        number: '1302',
        type: 'studio',
        area: 7,
        price: 450000,
        deposit: 600000,
        status: 'occupied',
        occupant: {
          name: '최예술',
          checkInDate: '2023-10-01',
          checkOutDate: '2024-04-01',
          contractEndDate: '2024-04-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고', '주방'],
        notes: '예술가 거주'
      },
      {
        id: '12-3',
        number: '1303',
        type: 'studio',
        area: 7,
        price: 450000,
        deposit: 600000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '김디자인',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-01-20',
          contractEndDate: '2024-01-20'
        },
        scheduledVacancy: {
          expectedDate: '2024-01-20',
          reason: 'moving_out',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고', '주방'],
        notes: '1월 20일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 10,
      availableRooms: 4,
      occupiedRooms: 5,
      maintenanceRooms: 1,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: false,
      promotionType: undefined,
      promotionDescription: undefined,
      discountRate: undefined,
      originalPrice: undefined,
      urgencyLevel: undefined,
      specialOffer: undefined,
      limitedTime: undefined,
      lastAvailableDate: undefined
    },
    occupancyRate: 50,
    lastUpdated: '2023-11-15'
  },
  {
    id: '13',
    name: '강남역 대량 빈방 고시원',
    location: '서울 강남구 강남대로 456',
    price: 350000,
    deposit: 300000,
    area: 5,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.2,
    reviewCount: 45,
    description: '강남역 근처의 새로 오픈한 고시원입니다. 많은 빈방이 있어서 특별한 혜택을 제공합니다.',
    available: true,
    distance: {
      subway: 5,
      bus: 3
    },
    tags: ['강남역', '신축', '대량빈방', '특가'],
    subwayStation: '강남역',
    nearbyUniversities: ['서울대학교', '연세대학교', '고려대학교'],
    rooms: [
      {
        id: '13-1',
        number: '1401',
        type: 'single',
        area: 5,
        price: 350000,
        deposit: 300000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '13-2',
        number: '1402',
        type: 'single',
        area: 5,
        price: 350000,
        deposit: 300000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '13-3',
        number: '1403',
        type: 'single',
        area: 5,
        price: 350000,
        deposit: 300000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 20,
      availableRooms: 15,
      occupiedRooms: 3,
      maintenanceRooms: 2,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: true,
      promotionType: 'first_month_free',
      promotionDescription: '첫달 무료',
      urgencyLevel: 'medium',
      specialOffer: '첫달 무료 + 보증금 50% 할인',
      limitedTime: true,
      lastAvailableDate: '2024-01-31'
    },
    occupancyRate: 15,
    lastUpdated: '2023-11-15'
  },
  {
    id: '14',
    name: '홍대입구 얼리버드 고시원',
    location: '서울 마포구 홍대로 789',
    price: 280000,
    deposit: 200000,
    area: 4,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    ],
    rating: 4.0,
    reviewCount: 23,
    description: '홍대입구역 근처의 경제적인 고시원입니다. 얼리버드 할인으로 더욱 합리적인 가격입니다.',
    available: true,
    distance: {
      subway: 8,
      bus: 5
    },
    tags: ['홍대입구', '경제적', '얼리버드', '학생'],
    subwayStation: '홍대입구역',
    nearbyUniversities: ['홍익대학교', '서강대학교', '연세대학교'],
    rooms: [
      {
        id: '14-1',
        number: '1501',
        type: 'single',
        area: 4,
        price: 280000,
        deposit: 200000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '14-2',
        number: '1502',
        type: 'single',
        area: 4,
        price: 280000,
        deposit: 200000,
        status: 'occupied',
        occupant: {
          name: '김철수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      },
      {
        id: '14-3',
        number: '1503',
        type: 'single',
        area: 4,
        price: 280000,
        deposit: 200000,
        status: 'scheduled_vacancy',
        occupant: {
          name: '이영희',
          checkInDate: '2023-08-01',
          checkOutDate: '2024-02-15',
          contractEndDate: '2024-02-15'
        },
        scheduledVacancy: {
          expectedDate: '2024-02-15',
          reason: 'contract_end',
          isConfirmed: true
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '2월 15일 공실예정'
      }
    ],
    roomStatus: {
      totalRooms: 12,
      availableRooms: 8,
      occupiedRooms: 2,
      maintenanceRooms: 2,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: true,
      promotionType: 'early_bird',
      promotionDescription: '얼리버드 20% 할인',
      discountRate: 0.2,
      originalPrice: 350000,
      urgencyLevel: 'high',
      specialOffer: '얼리버드 20% 할인 (선착순 10명)',
      limitedTime: true,
      lastAvailableDate: '2023-12-15'
    },
    occupancyRate: 17,
    lastUpdated: '2023-11-15'
  },
  {
    id: '15',
    name: '신촌역 추천인 보너스 고시원',
    location: '서울 서대문구 신촌로 321',
    price: 400000,
    deposit: 400000,
    area: 6,
    facilities: ['WiFi', '에어컨', '냉장고', '세탁기', '주방', '독서실'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    ],
    rating: 4.5,
    reviewCount: 67,
    description: '신촌역 근처의 프리미엄 고시원입니다. 추천인 보너스로 친구와 함께 입주하세요.',
    available: true,
    distance: {
      subway: 6,
      bus: 4
    },
    tags: ['신촌역', '프리미엄', '추천인보너스', '친구'],
    subwayStation: '신촌역',
    nearbyUniversities: ['연세대학교', '서강대학교', '이화여자대학교'],
    rooms: [
      {
        id: '15-1',
        number: '101',
        type: 'single',
        area: 6,
        price: 400000,
        deposit: 400000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '창가 방, 조망 좋음'
      },
      {
        id: '15-2',
        number: '102',
        type: 'single',
        area: 6,
        price: 400000,
        deposit: 400000,
        status: 'available',
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '신축 방'
      },
      {
        id: '15-3',
        number: '103',
        type: 'single',
        area: 6,
        price: 400000,
        deposit: 400000,
        status: 'occupied',
        occupant: {
          name: '김민수',
          checkInDate: '2023-09-01',
          checkOutDate: '2024-03-01',
          contractEndDate: '2024-03-01'
        },
        facilities: ['WiFi', '에어컨', '냉장고'],
        notes: '장기 계약자'
      }
    ],
    roomStatus: {
      totalRooms: 15,
      availableRooms: 10,
      occupiedRooms: 3,
      maintenanceRooms: 2,
      reservedRooms: 0,
      scheduledVacancyRooms: 0
    },
    marketing: {
      promotion: true,
      promotionType: 'referral_bonus',
      promotionDescription: '추천인 보너스 10만원',
      urgencyLevel: 'low',
      specialOffer: '친구 추천 시 각각 10만원 보너스',
      limitedTime: false
    },
    occupancyRate: 33,
    lastUpdated: '2023-11-15'
  }
]

// 지하철역 목록
export const subwayStations = [
  '전체',
  '강남역',
  '홍대입구역',
  '신촌역',
  '잠실역',
  '건대입구역',
  '역삼역',
  '서울대입구역',
  '고려대역',
  '연세대역',
  '한양대역',
  '이대역',
  '서강대역'
]

// 대학 목록
export const universities = [
  '전체',
  '서울대학교',
  '연세대학교',
  '고려대학교',
  '한양대학교',
  '건국대학교',
  '이화여자대학교',
  '서강대학교',
  '홍익대학교',
  '성신여자대학교',
  '서울여자대학교',
  '세종대학교'
]

export const locations = [
  '전체',
  '강남구',
  '마포구', 
  '서대문구',
  '송파구',
  '광진구',
  '관악구',
  '성북구',
  '성동구'
]

export const priceRanges = [
  { label: '전체', min: 0, max: 1000000 },
  { label: '30만원 이하', min: 0, max: 300000 },
  { label: '30-40만원', min: 300000, max: 400000 },
  { label: '40-50만원', min: 400000, max: 500000 },
  { label: '50만원 이상', min: 500000, max: 1000000 }
]

// 지하철역별 고시원 필터링 함수
export const filterBySubwayStation = (gosiwons: Gosiwon[], station: string): Gosiwon[] => {
  if (station === '전체') return gosiwons
  return gosiwons.filter(gosiwon => gosiwon.subwayStation === station)
}

// 대학별 고시원 필터링 함수
export const filterByUniversity = (gosiwons: Gosiwon[], university: string): Gosiwon[] => {
  if (university === '전체') return gosiwons
  return gosiwons.filter(gosiwon => 
    gosiwon.nearbyUniversities.some(uni => uni.includes(university))
  )
}

// 새로운 필터링 함수들
export const filterByPromotion = (gosiwons: Gosiwon[], promotionType?: string): Gosiwon[] => {
  if (!promotionType || promotionType === '전체') {
    return gosiwons.filter(gosiwon => gosiwon.marketing.promotion)
  }
  return gosiwons.filter(gosiwon => 
    gosiwon.marketing.promotion && gosiwon.marketing.promotionType === promotionType
  )
}

export const filterByAvailability = (gosiwons: Gosiwon[], availability: 'many_rooms' | 'few_rooms' | 'scheduled_vacancy' | 'urgent' | '전체'): Gosiwon[] => {
  if (availability === '전체') return gosiwons
  
  switch (availability) {
    case 'many_rooms':
      return gosiwons.filter(gosiwon => gosiwon.occupancyRate <= 30)
    case 'few_rooms':
      return gosiwons.filter(gosiwon => 
        gosiwon.roomStatus.availableRooms <= 2 && gosiwon.roomStatus.availableRooms > 0
      )
    case 'scheduled_vacancy':
      return gosiwons.filter(gosiwon => 
        gosiwon.roomStatus.scheduledVacancyRooms > 0
      )
    case 'urgent':
      return gosiwons.filter(gosiwon => 
        gosiwon.marketing.urgencyLevel === 'high'
      )
    default:
      return gosiwons
  }
}

export const sortByMarketingStrategy = (gosiwons: Gosiwon[], strategy: 'discount' | 'availability' | 'urgency' | 'rating'): Gosiwon[] => {
  const sorted = [...gosiwons]
  
  switch (strategy) {
    case 'discount':
      return sorted.sort((a, b) => {
        const aDiscount = a.marketing.discountRate || 0
        const bDiscount = b.marketing.discountRate || 0
        return bDiscount - aDiscount
      })
    case 'availability':
      return sorted.sort((a, b) => {
        const aRate = a.occupancyRate
        const bRate = b.occupancyRate
        return aRate - bRate // 낮은 입주율이 먼저 (많은 빈방)
      })
    case 'urgency':
      return sorted.sort((a, b) => {
        const urgencyLevels = { low: 1, medium: 2, high: 3 }
        const aUrgency = urgencyLevels[a.marketing.urgencyLevel || 'low']
        const bUrgency = urgencyLevels[b.marketing.urgencyLevel || 'low']
        return bUrgency - aUrgency
      })
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted
  }
}

export const getMarketingStats = (gosiwons: Gosiwon[]) => {
  const totalRooms = gosiwons.reduce((sum, g) => sum + g.roomStatus.totalRooms, 0)
  const availableRooms = gosiwons.reduce((sum, g) => sum + g.roomStatus.availableRooms, 0)
  const promotionCount = gosiwons.filter(g => g.marketing.promotion).length
  
  const promotionTypes = {
    discount: gosiwons.filter(g => g.marketing.promotionType === 'discount').length,
    free_deposit: gosiwons.filter(g => g.marketing.promotionType === 'free_deposit').length,
    first_month_free: gosiwons.filter(g => g.marketing.promotionType === 'first_month_free').length,
    referral_bonus: gosiwons.filter(g => g.marketing.promotionType === 'referral_bonus').length,
    early_bird: gosiwons.filter(g => g.marketing.promotionType === 'early_bird').length
  }
  
  return {
    totalRooms,
    availableRooms,
    occupancyRate: totalRooms > 0 ? Math.round(((totalRooms - availableRooms) / totalRooms) * 100) : 0,
    promotionCount,
    promotionTypes
  }
} 